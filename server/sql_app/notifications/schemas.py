from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class NotificationCreate(BaseModel):
    user_id: int
    title: Optional[str]
    message: Optional[str]
    status: Optional[str]
    notification_id: Optional[str]


class Notification(BaseModel):
    id: int
    user_id: int
    title: Optional[str]
    message: Optional[str]
    status: Optional[str]
    notification_id: Optional[str]
    created_at: datetime

    class Config:
        orm_mode = True


class DeviceTokenCreate(BaseModel):
    user_id: int
    device_token: str
    platform: Optional[str]


class DeviceToken(BaseModel):
    id: int
    user_id: int
    device_token: str
    platform: Optional[str]
    created_at: datetime

    class Config:
        orm_mode = True
