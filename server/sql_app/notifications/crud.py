from sqlalchemy.orm import Session
from ..notifications import models


def create_notification(db: Session, user_id: int, title: str = None, message: str = None, status: str = None, notification_id: str = None):
    db_obj = models.Notification(
        user_id=user_id,
        title=title,
        message=message,
        status=status,
        notification_id=notification_id,
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj


def get_notification(db: Session, notification_id: int):
    return db.query(models.Notification).filter(models.Notification.id == notification_id).first()


def get_by_external_id(db: Session, external_id: str):
    return db.query(models.Notification).filter(models.Notification.notification_id == external_id).first()


def create_device_token(db: Session, user_id: int, device_token: str, platform: str = None):
    db_obj = models.DeviceToken(
        user_id=user_id,
        device_token=device_token,
        platform=platform,
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj


def get_tokens_for_user(db: Session, user_id: int):
    return db.query(models.DeviceToken).filter(models.DeviceToken.user_id == user_id).all()
