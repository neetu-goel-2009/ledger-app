from datetime import datetime, timedelta
import jwt
from typing import Dict, Optional

# Configuration
SECRET_KEY = "your-secret-key-here"  # In production, use a secure secret key from environment variables
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 30  # 30 days
REFRESH_TOKEN_EXPIRE_DAYS = 90  # 90 days

def create_jwt_token(data: Dict) -> str:
    """
    Create a JWT token from the given dictionary data
    
    Args:
        data (Dict): The data to encode in the token
        
    Returns:
        str: The encoded JWT token
    """
    to_encode = data.copy()
    # Add expiration time
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    
    # Create the JWT token
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_jwt_token(token: str) -> Optional[Dict]:
    """
    Verify and decode a JWT token
    
    Args:
        token (str): The JWT token to verify and decode
        
    Returns:
        Optional[Dict]: The decoded token data if valid, None if invalid
    """
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return decoded_token
    except jwt.ExpiredSignatureError:
        # Token has expired
        return None
    except jwt.JWTError:
        # Token is invalid
        return None

def create_refresh_token(user_id: int) -> str:
    """
    Create a refresh token for the given user ID
    
    Args:
        user_id (int): The user ID to create a refresh token for
        
    Returns:
        str: The encoded refresh token
    """
    expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)  # Refresh tokens typically last longer
    to_encode = {
        "sub": str(user_id),
        "type": "refresh",
        "exp": expire
    }
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_token_data(token: str) -> Optional[Dict]:
    """
    Get data from a token without verifying expiration
    
    Args:
        token (str): The JWT token to decode
        
    Returns:
        Optional[Dict]: The decoded token data if valid format, None if invalid
    """
    try:
        # Decode without verification to get the payload
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return decoded_token
    except Exception:
        return None