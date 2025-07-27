# app/core/config.py
import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Eunoia AI Backend"
    API_V1_STR: str = "/api/v1"
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "a4a2383b432108480b5ec480ac2d1eeda36d95c42cc543689c57c9c9cec7eb93")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_HOURS: int = 24

    # Database
    MONGODB_URL: str = os.getenv("MONGODB_URL", "mongodb+srv://mohithog7:9zmDXfnEXoGMID3Q@eunoia.wanb8gr.mongodb.net/?retryWrites=true&w=majority&appName=eunoia")
    DB_NAME: str = "eunoia_ai"

    # CORS
    ALLOWED_ORIGINS: list[str] = ["http://localhost:5173", "http://localhost:3000"]

    class Config:
        case_sensitive = True

settings = Settings()