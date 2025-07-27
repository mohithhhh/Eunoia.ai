# app/api/endpoints/auth.py
from fastapi import APIRouter, HTTPException
from datetime import datetime

from ... import schemas, security
from ...db.database import users_collection

router = APIRouter()

@router.post("/register", response_model=schemas.Token)
async def register(user: schemas.UserCreate):
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = security.get_password_hash(user.password)
    user_dict = user.dict()
    user_dict["password"] = hashed_password
    user_dict["created_at"] = datetime.utcnow()
    
    result = await users_collection.insert_one(user_dict)
    
    access_token = security.create_access_token(data={"sub": str(result.inserted_id)})
    return {
        "access_token": access_token, 
        "token_type": "bearer", 
        "user_id": str(result.inserted_id)
    }

@router.post("/login", response_model=schemas.Token)
async def login(user: schemas.UserLogin):
    db_user = await users_collection.find_one({"email": user.email})
    if not db_user or not security.verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    access_token = security.create_access_token(data={"sub": str(db_user["_id"])})
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user_id": str(db_user["_id"])
    }