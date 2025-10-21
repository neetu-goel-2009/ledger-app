from sqlalchemy import Boolean, Column, Integer, String, JSON
from sqlalchemy.orm import relationship

from sql_app.database import Base



class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    name = Column(String, nullable=True)
    picture = Column(String, nullable=True)
    mobile = Column(String, nullable=True)
    misc = Column(JSON, nullable=True)
    # documents = relationship("Document", back_populates="owner")

