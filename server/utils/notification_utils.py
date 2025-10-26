import os
import time
import logging
from typing import Optional, Dict, Any, List
import requests

from sqlalchemy.orm import Session

from ..sql_app.notifications import crud as notifications_crud

logger = logging.getLogger("notification_utils")
logger.setLevel(logging.INFO)

# Config via environment
NOTIFICATION_PROVIDER = os.getenv("NOTIFICATION_PROVIDER", "mock").lower()
FCM_SERVER_KEY = os.getenv("FCM_SERVER_KEY")
DEFAULT_RETRIES = int(os.getenv("NOTIFICATION_RETRIES", "3"))
DEFAULT_BACKOFF = float(os.getenv("NOTIFICATION_BACKOFF", "0.5"))


def _send_via_fcm(token: str, title: str, body: str, data: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    if not FCM_SERVER_KEY:
        raise RuntimeError("FCM_SERVER_KEY not configured")

    url = "https://fcm.googleapis.com/fcm/send"
    headers = {
        "Authorization": f"key={FCM_SERVER_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "to": token,
        "notification": {"title": title, "body": body},
        "data": data or {},
    }
    resp = requests.post(url, json=payload, headers=headers, timeout=10)
    resp.raise_for_status()
    return resp.json()


def _send_mock(token: str, title: str, body: str, data: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    logger.info("[MOCK] Sending notification to %s: %s - %s", token, title, body)
    return {"success": True, "message_id": f"mock-{int(time.time()*1000)}"}


def sendMobileNotification(db: Optional[Session], userId: int, title: str, body: str, data: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """Send push notification to all device tokens for a user.

    If db is provided, logs will be stored in notifications table and device tokens looked up from DB.
    Returns a summary dict.
    """
    tokens: List[str] = []
    if db is not None:
        tokens = [t.device_token for t in notifications_crud.get_tokens_for_user(db, userId)]

    if not tokens:
        logger.info("No device tokens for user %s", userId)
        return {"success": False, "error": "no_device_tokens"}

    results = []
    last_exc = None
    for token in tokens:
        for attempt in range(1, DEFAULT_RETRIES + 1):
            try:
                if NOTIFICATION_PROVIDER == "fcm":
                    resp = _send_via_fcm(token, title, body, data)
                    # FCM legacy returns 'message_id' or 'success'
                    message_id = resp.get("message_id") or resp.get("results", [{}])[0].get("message_id")
                    status = "sent"
                else:
                    resp = _send_mock(token, title, body, data)
                    message_id = resp.get("message_id")
                    status = "sent"

                # store notification log
                if db is not None:
                    notifications_crud.create_notification(db, user_id=userId, title=title, message=body, status=status, notification_id=message_id)

                results.append({"token": token, "success": True, "message_id": message_id, "raw": resp})
                break
            except Exception as exc:
                logger.exception("Error sending notification to %s (attempt %s): %s", token, attempt, exc)
                last_exc = exc
                time.sleep(DEFAULT_BACKOFF * attempt)
        else:
            # all attempts failed for this token
            if db is not None:
                try:
                    notifications_crud.create_notification(db, user_id=userId, title=title, message=body, status="failed", notification_id=None)
                except Exception:
                    logger.exception("Failed to log failed notification")
            results.append({"token": token, "success": False, "error": str(last_exc)})

    overall_success = all(r.get("success") for r in results)
    return {"success": overall_success, "results": results}


def notifyAppEvent(db: Optional[Session], userId: int, eventType: str, data: dict) -> Dict[str, Any]:
    """Map application events to notification text and call sendMobileNotification.

    Example eventTypes: invoice_created, payment_received
    """
    if eventType == "invoice_created":
        title = "New Invoice Created"
        body = data.get("message") or f"Invoice {data.get('invoice_no')} created for {data.get('amount')}"
    elif eventType == "payment_received":
        title = "Payment Received"
        body = data.get("message") or f"Payment of {data.get('amount')} received. Thank you!"
    else:
        title = data.get("title", "Notification")
        body = data.get("message", "You have a new notification")

    return sendMobileNotification(db, userId, title, body, data)
