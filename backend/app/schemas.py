# app/schemas.py
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

# User Schemas
class UserCreate(BaseModel):
    firstName: str
    lastName: str
    email: str
    password: str
    phoneNumber: str
    location: str
    gender: str
    age: int

class UserLogin(BaseModel):
    email: str
    password: str

class UserInDB(UserCreate):
    hashed_password: str

class UserProfile(BaseModel):
    id: str = Field(..., alias="_id")
    firstName: str
    lastName: str
    email: str
    
# Token Schema
class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: str

# AI & Assessment Schemas
class TextAnalysisRequest(BaseModel):
    text: str
    user_id: str

class BehavioralDataRequest(BaseModel):
    user_id: str
    social_media_posts: List[str] = []
    sleep_hours: Optional[float] = None
    activity_level: Optional[int] = None
    mood_rating: Optional[int] = None
    stress_level: Optional[int] = None

class RiskAssessmentResponse(BaseModel):
    risk_score: float
    risk_level: str
    factors: dict
    recommendations: List[str]
    timestamp: datetime