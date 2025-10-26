from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from ..database import Base


class WhatsAppMessage(Base):
    __tablename__ = "whatsapp_messages"

    id = Column(Integer, primary_key=True, index=True)
    to_number = Column(String(50), nullable=False, index=True)
    message = Column(Text, nullable=True)
    status = Column(String(50), nullable=True)
    message_id = Column(String(200), nullable=True, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
