"""
Notifications API router.

Handles device token registration and mobile push notification sending.
All send operations are enqueued to Celery for async processing.
"""
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any

from ..sql_app.database import get_db
from ..sql_app.notifications import crud as notifications_crud
from ..utils import notification_utils
from ..utils import queue as task_queue

router = APIRouter()


class SendNotificationRequest(BaseModel):
    """Request model for sending push notifications."""
    userId: int
    title: str
    body: str
    data: Optional[Dict[str, Any]] = None


class RegisterDeviceRequest(BaseModel):
    """Request model for registering device tokens."""
    userId: int
    deviceToken: str
    platform: Optional[str] = None


@router.post("/notifications/register-device")
def register_device(req: RegisterDeviceRequest, db=Depends(get_db)):
    """Register a device token for push notifications."""
    if not req.userId or not req.deviceToken:
        raise HTTPException(status_code=400, detail="userId and deviceToken required")
    obj = notifications_crud.create_device_token(
        db, user_id=req.userId, device_token=req.deviceToken, platform=req.platform
    )
    return {"success": True, "deviceId": obj.id}


def _background_send(db, userId, title, body, data):
    """Fallback function for synchronous notification sending."""
    try:
        notification_utils.sendMobileNotification(db, userId, title, body, data)
    except Exception:
        pass  # Ensure exceptions don't crash the worker


@router.post("/notifications/send")
def send_notification(req: SendNotificationRequest, db=Depends(get_db)):
    """
    Send push notification (enqueued to Celery).
    
    Creates a pending notification record and enqueues task to Celery.
    Falls back to synchronous execution if Celery is unavailable.
    """
    # Create pending notification log
    notif = notifications_crud.create_notification(
        db, user_id=req.userId, title=req.title, 
        message=req.body, status="pending", notification_id=None
    )
    
    # Always enqueue the Celery task
    try:
        task_queue.enqueue_task(
            "send_mobile_notification", 
            args=(req.userId, req.title, req.body, req.data or {})
        )
    except Exception:
        # Fallback: synchronous execution
        _background_send(db, req.userId, req.title, req.body, req.data or {})

    return {"success": True, "notificationId": notif.id}


@router.get("/notifications/status/{notification_id}")
def get_status(notification_id: int, db=Depends(get_db)):
    """Get notification status by ID."""
    obj = notifications_crud.get_notification(db, notification_id)
    if not obj:
        raise HTTPException(status_code=404, detail="notification not found")
    return {
        "id": obj.id, 
        "status": obj.status, 
        "notification_id": obj.notification_id, 
        "created_at": obj.created_at
    }
