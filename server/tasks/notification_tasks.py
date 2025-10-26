from typing import Dict, Any
import logging

from ..sql_app.database import SessionLocal
from ..utils import notification_utils

logger = logging.getLogger("notification_tasks")


def process_send_notification(user_id: int, title: str, body: str, data: Dict[str, Any]):
    """Worker task: create a DB session and send notification."""
    db = SessionLocal()
    try:
        res = notification_utils.sendMobileNotification(db, user_id, title, body, data)
        logger.info("Processed notification for user %s: %s", user_id, res)
        return res
    finally:
        db.close()
