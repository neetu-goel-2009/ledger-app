from statistics import mode
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from sql_app.users import crud, models, schemas
from sql_app.database import get_db, engine
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from utils.jwt_helper import create_jwt_token, create_refresh_token, verify_jwt_token
import requests
from pydantic import BaseModel
from typing import Optional

from utils.jwt_helper import create_jwt_token, create_refresh_token

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

class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    mode: str
    token: str
    refresh_token: str
    token_type: str
    user: schemas.User

# Update user endpoint - partial updates supported
class UpdateUserRequest(BaseModel):
    email: Optional[str] = None
    name: Optional[str] = None
    picture: Optional[str] = None
    mobile: Optional[str] = None
    misc: Optional[dict] = None

class RefreshTokenRequest(BaseModel):
    refresh_token: str

# Helper function to generate token response
def generate_token_response(db_user, mode: str):
    # Create access and refresh tokens
    user_data = {
        "sub": str(db_user.id),
        "email": db_user.email,
        "name": db_user.name,
        "type": "access"
    }
    access_token = create_jwt_token(user_data)
    refresh_token = create_refresh_token(db_user.id)
    
    return TokenResponse(
        mode=mode,
        token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
        user=db_user
    )

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
@router.post("/google-login", response_model=TokenResponse)
def google_login(payload: GoogleLoginRequest, db: Session = Depends(get_db)):
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
        # return db_user
    else:
        # Create new user
        user_in = schemas.UserCreate(email=email, name=name, picture=picture, mobile=mobile, misc=misc)
        db_user = crud.create_user(db, user=user_in)

    # Create access and refresh tokens
    return generate_token_response(db_user, mode="google")

# Login endpoint
@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    # Check if user exists
    db_user = crud.get_user_by_email(db, email=payload.email)
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid email")
    
    # Check if user has a password (might be a social login only user)
    if not db_user.misc or "register_mode" not in db_user.misc or db_user.misc["register_mode"] != "form":
        raise HTTPException(status_code=401, detail="Invalid email")

    # Check if user has a password (might be a social login only user)
    if not db_user.hashed_password:
        raise HTTPException(status_code=401, detail="Account exists but no password set")
    
    # Verify password
    import hashlib
    hashed_password = hashlib.md5(payload.password.encode()).hexdigest()

    if db_user.hashed_password != hashed_password:
        raise HTTPException(status_code=401, detail="Invalid password")
    
    # Create access and refresh tokens
    return generate_token_response(db_user, mode="form")

# Facebook login endpoint
@router.post("/facebook-login", response_model=TokenResponse)
def facebook_login(payload: FacebookLoginRequest, db: Session = Depends(get_db)):
    access_token = payload.access_token
    user_data = payload.user_data
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
        # return db_user
    else:
        user_in = schemas.UserCreate(email=email, name=name, picture=picture, mobile=mobile, misc=misc)
        db_user = crud.create_user(db, user=user_in)

    # Create access and refresh tokens
    return generate_token_response(db_user, mode="facebook")

# Update user endpoint - partial updates supported
@router.put("/{user_id}", response_model=schemas.User)
def update_user(user_id: int, payload: UpdateUserRequest, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    # If email is changing, ensure uniqueness
    if payload.email and payload.email != db_user.email:
        existing = crud.get_user_by_email(db, email=payload.email)
        if existing and existing.id != db_user.id:
            raise HTTPException(status_code=400, detail="Email already registered")

    # Build kwargs only for provided fields
    update_kwargs = {k: v for k, v in payload.dict().items() if v is not None}
    if not update_kwargs:
        return db_user

    updated = crud.update_user(db, db_user, **update_kwargs)
    return updated

# Create user endpoint
@router.post("/", response_model=TokenResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    # Update misc dictionary in user object
    user.misc = user.misc or {}
    user.misc.update({"register_mode": "form"})
    db_user = crud.create_user(db, user=user)
    # Create access and refresh tokens
    return generate_token_response(db_user, mode="form")

# Read users endpoint
@router.get("/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

# Read single user endpoint
@router.get("/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# Refresh token endpoint
@router.post("/refresh-token", response_model=TokenResponse)
def refresh_token(payload: RefreshTokenRequest, db: Session = Depends(get_db)):
    try:
        # Verify the refresh token
        token_data = verify_jwt_token(payload.refresh_token)
        if not token_data:
            raise HTTPException(status_code=401, detail="Invalid refresh token")
        
        # Check if it's actually a refresh token
        if token_data.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
        
        # Get the user
        user_id = int(token_data.get("sub"))
        db_user = crud.get_user(db, user_id=user_id)
        if not db_user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Create new access token
        return generate_token_response(db_user, mode=db_user.misc.get("register_mode", "form"))
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Token refresh failed: {str(e)}")

# Verify token endpoint
@router.post("/verify-token")
def verify_token(payload: VerifyTokenRequest, db: Session = Depends(get_db)):
    """
    Verify a JWT token (access or refresh). Returns decoded payload and user info when available.
    """
    token = payload.token
    # Verify JWT token
    token_data = verify_jwt_token(token)
    if not token_data:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    result = {"valid": True, "token_data": token_data}

    # If token contains a subject (user id), try to fetch the user
    sub = token_data.get("sub")
    if sub:
        try:
            user_id = int(sub)
            db_user = crud.get_user(db, user_id=user_id)
            if db_user:
                result["user"] = db_user
        except Exception:
            # ignore user lookup errors; just return token data
            pass

    return result

