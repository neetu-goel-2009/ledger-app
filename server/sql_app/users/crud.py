from sqlalchemy.orm import Session
from pprint import pprint
from . import models, schemas


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()



def create_user(db: Session, user: schemas.UserCreate):
    # For Google users, password may be None
    fake_hashed_password = (user.password + "notreallyhashed") if user.password else None
    db_user = models.User(
        email=user.email,
        mobile=user.mobile,
        misc=user.misc,
        hashed_password=fake_hashed_password,
        name=getattr(user, "name", None),
        picture=getattr(user, "picture", None),
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(db: Session, db_user: models.User, **kwargs):
    """Update given user instance with kwargs and commit. Returns refreshed instance."""
    for k, v in kwargs.items():
        if hasattr(db_user, k):
            setattr(db_user, k, v)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

