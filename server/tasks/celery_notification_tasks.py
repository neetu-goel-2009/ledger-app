"""
Celery tasks for mobile push notifications.

This module defines the Celery app and notification tasks that are processed
by Celery workers. Tasks create their own DB sessions for thread safety.
"""
from celery import Celery
import os
from utils import notification_utils
from sql_app.database import SessionLocal

# Initialize Celery app with Redis as broker and backend
celery_app = Celery(
    "tallyxpert",
    broker=os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0"),
    backend=os.getenv("CELERY_RESULT_BACKEND", "redis://localhost:6379/0"),
)
celery_app.config_from_object("server.celeryconfig")


@celery_app.task(bind=True, name="send_mobile_notification")
def send_mobile_notification(self, user_id, title, body, data=None):
    """
    Send mobile push notification to a user.
    
    Args:
        user_id: User ID to send notification to
        title: Notification title
        body: Notification body text
        data: Optional dict of additional data
        
    Returns:
        Result dict with success status and message details
    """
    db = SessionLocal()
    try:
        res = notification_utils.sendMobileNotification(db, user_id, title, body, data or {})
        return res
    finally:
        db.close()
