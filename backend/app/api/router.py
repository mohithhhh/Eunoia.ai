# app/api/router.py
from fastapi import APIRouter
from .endpoints import auth, ai #, users

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(ai.router, prefix="/ai", tags=["ai"])
# api_router.include_router(users.router, prefix="/users", tags=["users"]) # Uncomment when users.py is made