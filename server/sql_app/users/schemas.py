from pydantic import BaseModel
from sql_app.documents.schemas import Document



class UserBase(BaseModel):
    email: str
    name: str | None = None
    picture: str | None = None
    mobile: str | None = None
    misc: dict | None = None

class UserCreate(UserBase):
    password: str | None = None

class User(UserBase):
    id: int
    is_active: bool
    items: list[Document] = []

    class Config:
        from_attributes = True
