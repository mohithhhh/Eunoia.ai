# app/api/endpoints/users.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/me")
async def read_users_me():
    return {"username": "current_user"}