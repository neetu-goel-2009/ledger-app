from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class WhatsAppMessageCreate(BaseModel):
    to_number: str
    message: Optional[str]
    status: Optional[str]
    message_id: Optional[str]


class WhatsAppMessage(BaseModel):
    id: int
    to_number: str
    message: Optional[str]
    status: Optional[str]
    message_id: Optional[str]
    created_at: datetime

    class Config:
        orm_mode = True
