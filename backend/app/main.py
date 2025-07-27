# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .api.router import api_router
from .ml.analysis import load_ai_models
from .db.database import ping_db

app = FastAPI(title=settings.PROJECT_NAME)

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    print("🚀 Application starting up...")
    if await ping_db():
        print("✅ MongoDB connection successful!")
    else:
        print("❌ MongoDB connection failed!")
    await load_ai_models()

# Include the main router
app.include_router(api_router)

@app.get("/")
def read_root():
    return {"message": f"Welcome to {settings.PROJECT_NAME}", "status": "running"}