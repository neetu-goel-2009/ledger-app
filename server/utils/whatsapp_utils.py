import os
import time
import logging
from typing import Optional, Dict, Any
import requests

from sqlalchemy.orm import Session

from ..sql_app.whatsapp import crud as whatsapp_crud

logger = logging.getLogger("whatsapp_utils")
logger.setLevel(logging.INFO)

# Environment-driven configuration
WHATSAPP_PROVIDER = os.getenv("WHATSAPP_PROVIDER", "mock").lower()
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_WHATSAPP_FROM = os.getenv("TWILIO_WHATSAPP_FROM")
META_WHATSAPP_TOKEN = os.getenv("META_WHATSAPP_TOKEN")
META_PHONE_NUMBER_ID = os.getenv("META_PHONE_NUMBER_ID")

DEFAULT_RETRIES = int(os.getenv("WHATSAPP_RETRIES", "3"))
DEFAULT_BACKOFF = float(os.getenv("WHATSAPP_BACKOFF", "0.5"))


def _send_via_twilio(to: str, message: str, media_url: Optional[str] = None) -> Dict[str, Any]:
    if not (TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN and TWILIO_WHATSAPP_FROM):
        raise RuntimeError("Twilio credentials not configured")

    url = f"https://api.twilio.com/2010-04-01/Accounts/{TWILIO_ACCOUNT_SID}/Messages.json"
    data = {
        "To": f"whatsapp:{to}",
        "From": f"whatsapp:{TWILIO_WHATSAPP_FROM}",
        "Body": message,
    }
    if media_url:
        data["MediaUrl"] = media_url

    resp = requests.post(url, data=data, auth=(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN), timeout=10)
    resp.raise_for_status()
    return resp.json()


def _send_via_meta(to: str, message: str, template_id: Optional[str] = None, media_url: Optional[str] = None) -> Dict[str, Any]:
    if not (META_WHATSAPP_TOKEN and META_PHONE_NUMBER_ID):
        raise RuntimeError("Meta WhatsApp credentials not configured")

    url = f"https://graph.facebook.com/v17.0/{META_PHONE_NUMBER_ID}/messages"
    headers = {"Authorization": f"Bearer {META_WHATSAPP_TOKEN}", "Content-Type": "application/json"}

    if template_id:
        payload = {
            "messaging_product": "whatsapp",
            "to": to,
            "type": "template",
            "template": {"name": template_id, "language": {"code": "en_US"}},
        }
    else:
        payload = {
            "messaging_product": "whatsapp",
            "to": to,
            "type": "text",
            "text": {"body": message},
        }
        if media_url:
            # Meta expects media messages as separate object types; for simplicity we attach as document
            payload = {
                "messaging_product": "whatsapp",
                "to": to,
                "type": "document",
                "document": {"link": media_url, "caption": message},
            }

    resp = requests.post(url, json=payload, headers=headers, timeout=10)
    resp.raise_for_status()
    return resp.json()


def _send_mock(to: str, message: str, template_id: Optional[str] = None, media_url: Optional[str] = None) -> Dict[str, Any]:
    logger.info("[MOCK] Sending WhatsApp message to %s: %s", to, message)
    # return a predictable shape
    return {"sid": f"mock-{int(time.time()*1000)}", "status": "sent"}


def sendWhatsAppMessage(db: Optional[Session], to: str, message: str, templateId: Optional[str] = None, mediaUrl: Optional[str] = None) -> Dict[str, Any]:
    """Send a WhatsApp message using configured provider.

    Args:
        db: optional SQLAlchemy Session to log the message
        to: recipient phone number in international format (e.g. +911234...)
        message: message body or template fallback text
        templateId: optional template id (for Meta)
        mediaUrl: optional media url

    Returns:
        dict with keys: success (bool), message_id (str), raw_response (dict)
    """
    last_exc = None
    for attempt in range(1, DEFAULT_RETRIES + 1):
        try:
            if WHATSAPP_PROVIDER == "twilio":
                resp = _send_via_twilio(to, message, mediaUrl)
                message_id = resp.get("sid") or resp.get("message_sid") or resp.get("id")
                status = resp.get("status", "sent")
            elif WHATSAPP_PROVIDER == "meta":
                resp = _send_via_meta(to, message, templateId, mediaUrl)
                # Meta returns messages array
                message_id = None
                if isinstance(resp, dict):
                    if resp.get("messages"):
                        message_id = resp["messages"][0].get("id")
                status = "sent"
            else:
                resp = _send_mock(to, message, templateId, mediaUrl)
                message_id = resp.get("sid")
                status = resp.get("status", "sent")

            # store log if db provided
            if db is not None:
                whatsapp_crud.create_whatsapp_message(db, to_number=to, message=message, status=status, message_id=message_id)

            return {"success": True, "messageId": message_id, "raw": resp}

        except Exception as exc:
            logger.exception("Error sending whatsapp message (attempt %s): %s", attempt, exc)
            last_exc = exc
            # retry with backoff
            time.sleep(DEFAULT_BACKOFF * attempt)

    # all retries failed
    if db is not None:
        try:
            whatsapp_crud.create_whatsapp_message(db, to_number=to, message=message, status="failed", message_id=None)
        except Exception:
            logger.exception("Failed to log failed message")

    return {"success": False, "error": str(last_exc)}


def notifyClientEvent(db: Optional[Session], clientId: str, messageType: str, data: dict) -> Dict[str, Any]:
    """High-level notification helper that maps messageType to templates/text and calls sendWhatsAppMessage.

    This is intentionally simple and should be adapted to your templates and business logic.
    """
    # Example mapping
    if messageType == "invoice_created":
        to = data.get("to")
        invoice_no = data.get("invoice_no")
        amount = data.get("amount")
        due = data.get("due_date")
        text = f"Invoice {invoice_no} created for {amount}. Due {due}."
        return sendWhatsAppMessage(db, to, text, templateId=None)
    elif messageType == "payment_reminder":
        to = data.get("to")
        amount = data.get("amount")
        text = f"Reminder: please pay {amount}."
        return sendWhatsAppMessage(db, to, text, templateId=None)
    else:
        to = data.get("to")
        text = data.get("message", "Notification")
        return sendWhatsAppMessage(db, to, text)
