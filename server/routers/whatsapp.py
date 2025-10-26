from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.orm import Session
import time
import threading
import logging

from sql_app.database import get_db
from utils import whatsapp_utils
from sql_app.whatsapp import crud as whatsapp_crud

router = APIRouter()
logger = logging.getLogger("whatsapp.router")

# Simple in-process rate limiter (per-process)
_rate_lock = threading.Lock()
_rate_state = {"last_reset": time.time(), "count": 0}
RATE_LIMIT = int( (1) )  # messages per second; keep conservative default


def _throttle():
    with _rate_lock:
        now = time.time()
        if now - _rate_state["last_reset"] >= 1:
            _rate_state["last_reset"] = now
            _rate_state["count"] = 0
        if _rate_state["count"] >= RATE_LIMIT:
            raise HTTPException(status_code=429, detail="Rate limit exceeded")
        _rate_state["count"] += 1


class SendRequest(BaseModel):
    to: str
    message: str
    templateId: Optional[str] = None
    mediaUrl: Optional[str] = None


class SendTemplateRequest(BaseModel):
    to: str
    templateId: str
    parameters: Optional[list] = None


@router.post("/whatsapp/send")
def send_whatsapp(req: SendRequest, db: Session = Depends(get_db)):
    _throttle()
    # Basic validation
    if not req.to:
        raise HTTPException(status_code=400, detail="'to' is required")

    result = whatsapp_utils.sendWhatsAppMessage(db, req.to, req.message, templateId=req.templateId, mediaUrl=req.mediaUrl)
    if not result.get("success"):
        raise HTTPException(status_code=500, detail=result.get("error", "send failed"))

    return {"success": True, "messageId": result.get("messageId"), "raw": result.get("raw")}


@router.post("/whatsapp/send-template")
def send_template(req: SendTemplateRequest, db: Session = Depends(get_db)):
    _throttle()
    if not req.to or not req.templateId:
        raise HTTPException(status_code=400, detail="'to' and 'templateId' are required")

    # Build a simple fallback message using parameters
    fallback = " "
    if req.parameters:
        fallback = " ".join(map(str, req.parameters))

    result = whatsapp_utils.sendWhatsAppMessage(db, req.to, fallback, templateId=req.templateId)
    if not result.get("success"):
        raise HTTPException(status_code=500, detail=result.get("error", "send failed"))

    return {"success": True, "messageId": result.get("messageId"), "raw": result.get("raw")}


@router.get("/whatsapp/status/{message_id}")
def get_status(message_id: str, db: Session = Depends(get_db)):
    obj = whatsapp_crud.get_by_message_id(db, message_id)
    if not obj:
        raise HTTPException(status_code=404, detail="message not found")
    return {"messageId": obj.message_id, "status": obj.status, "to": obj.to_number, "created_at": obj.created_at}
