from sqlalchemy.orm import Session
from ..whatsapp import models


def create_whatsapp_message(db: Session, to_number: str, message: str = None, status: str = None, message_id: str = None):
    db_obj = models.WhatsAppMessage(
        to_number=to_number,
        message=message,
        status=status,
        message_id=message_id,
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj


def get_by_message_id(db: Session, message_id: str):
    return db.query(models.WhatsAppMessage).filter(models.WhatsAppMessage.message_id == message_id).first()


def list_messages(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.WhatsAppMessage).offset(skip).limit(limit).all()
