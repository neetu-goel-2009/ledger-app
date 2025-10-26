from typing import Annotated, Optional

from fastapi import Header, HTTPException, Request
from fastapi import Depends

from utils.jwt_helper import verify_jwt_token


async def get_token_header(x_token: Annotated[str, Header()]):
    if x_token != "fake-super-secret-token":
        raise HTTPException(status_code=400, detail="X-Token header invalid")


async def get_query_token(token: str):
    if token != "jessica":
        raise HTTPException(status_code=400, detail="No Jessica token provided")


async def require_auth(authorization: Annotated[Optional[str], Header()] = None):
    """
    Validates the Authorization: Bearer <token> header and returns token claims.
    Raises 401 if missing/invalid. Attach this as a dependency on protected routes.
    """
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization header")

    parts = authorization.split()
    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise HTTPException(status_code=401, detail="Invalid Authorization header")

    token = parts[1]
    payload = verify_jwt_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return payload
