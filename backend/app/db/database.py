# app/db/database.py
import motor.motor_asyncio
from ..core.config import settings

print(f"🔗 Connecting to MongoDB at {settings.MONGODB_URL[:50]}...")

try:
    client = motor.motor_asyncio.AsyncIOMotorClient(settings.MONGODB_URL)
    db = client[settings.DB_NAME]

    # Collections
    users_collection = db.users
    assessments_collection = db.assessments
    behavioral_data_collection = db.behavioral_data
    
    print("✅ MongoDB client initialized.")

except Exception as e:
    print(f"❌ Failed to initialize MongoDB client: {e}")
    client = None
    db = None

async def ping_db():
    if client:
        try:
            await client.admin.command('ping')
            return True
        except Exception as e:
            print(f"❌ MongoDB connection ping failed: {e}")
            return False
    return False