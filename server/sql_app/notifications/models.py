from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func

from ..database import Base


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)
    title = Column(String(255), nullable=True)
    message = Column(Text, nullable=True)
    status = Column(String(50), nullable=True)
    notification_id = Column(String(200), nullable=True, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class DeviceToken(Base):
    __tablename__ = "device_tokens"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)
    device_token = Column(String(500), nullable=False, unique=False, index=True)
    platform = Column(String(50), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
