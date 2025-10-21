from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from sql_app.users import crud, models, schemas
from sql_app.database import get_db, engine
import requests
from pydantic import BaseModel

models.Base.metadata.create_all(bind=engine)

router = APIRouter(
    prefix="/users",
    tags=["users"],
    # dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)


# Pydantic model for Google login request
class GoogleLoginRequest(BaseModel):
    id_token: str


# Pydantic model for token verification POST body
class VerifyTokenRequest(BaseModel):
    token: str


class FacebookUserData(BaseModel):
    id: str
    name: str
    email: str | None = None

class FacebookLoginRequest(BaseModel):
    access_token: str
    user_data: FacebookUserData

# Helper to verify Google ID token
def verify_google_token(id_token: str):
    # Google's tokeninfo endpoint
    resp = requests.get(f"https://oauth2.googleapis.com/tokeninfo?id_token={id_token}")
    if resp.status_code != 200:
        return None
    data = resp.json()
    # Basic checks (audience, etc. can be added)
    if 'email' not in data:
        return None
    return data

# Google login endpoint
@router.post("/google-login", response_model=schemas.User)
def google_login(payload: GoogleLoginRequest, db: Session = Depends(get_db)):
    print("111111111111111", payload.id_token)
    token_info = verify_google_token(payload.id_token)
    if not token_info:
        raise HTTPException(status_code=401, detail="Invalid Google token")
    email = token_info.get("email")
    name = token_info.get("name", "")
    picture = token_info.get("picture", "")
    mobile = None  # Google does not provide mobile number by default
    misc = {"register_mode": "google", "google_id": token_info.get("sub")}
    # Upsert user using the same db session
    db_user = crud.get_user_by_email(db, email=email)
    if db_user:
        # Use update helper to persist changes in this session
        db_user = crud.update_user(db, db_user, name=name, picture=picture, mobile=mobile, misc=misc)
        return db_user
    # Create new user
    user_in = schemas.UserCreate(email=email, name=name, picture=picture, mobile=mobile, misc=misc)
    return crud.create_user(db, user=user_in)


# Facebook login endpoint
@router.post("/facebook-login", response_model=schemas.User)
def facebook_login(payload: FacebookLoginRequest, db: Session = Depends(get_db)):
    access_token = payload.access_token
    user_data = payload.user_data
    print("22222222222222", access_token, user_data)
    # Verify the token is valid with Facebook
    resp = requests.get(
        "https://graph.facebook.com/me",
        params={
            "access_token": access_token,
            "fields": "id"  # Minimal check, we already have user data
        },
    )
    print("Facebook token verification response:", resp.status_code, resp.text)
    if resp.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid Facebook token")
    
    # Verify the user ID matches the token
    token_data = resp.json()
    if token_data.get("id") != user_data.id:
        raise HTTPException(status_code=401, detail="Token user ID mismatch")
    
    email = user_data.email
    name = user_data.name
    picture = None  # Could add picture URL from Graph API if needed
    mobile = None  # Facebook does not provide mobile number by default
    misc = {"facebook_id": user_data.id, "register_mode": "facebook"}

    if not email:
        # Facebook may not return email if user didn't permit; handle gracefully
        raise HTTPException(status_code=400, detail="Email permission required")

    db_user = crud.get_user_by_email(db, email=email)
    if db_user:
        db_user = crud.update_user(db, db_user, name=name, picture=picture, mobile=mobile, misc=misc)
        return db_user

    user_in = schemas.UserCreate(email=email, name=name, picture=picture, mobile=mobile, misc=misc)
    return crud.create_user(db, user=user_in)


@router.post("/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db, user=user)


@router.get("/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@router.get("/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.post("/verify-token")
def verify_token(payload: VerifyTokenRequest, db: Session = Depends(get_db)):
    token = payload.token
    token_info = verify_google_token(token)
    if not token_info:
        raise HTTPException(status_code=401, detail="Invalid token")
    return {"valid": True, "user": token_info}

