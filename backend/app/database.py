import pymongo
import logging
from motor.motor_asyncio import AsyncIOMotorDatabase, AsyncIOMotorClient

logger = logging.getLogger(__name__)

class DatabaseManager:
    client: AsyncIOMotorClient = None
    db: AsyncIOMotorDatabase = None

db_instance = DatabaseManager()

def get_db() -> AsyncIOMotorDatabase:
    """Dependency to retrieve the db connection for routes."""
    return db_instance.db

async def ensure_indexes():
    """
    Ensure spatial and other indexes exist.
    """
    if db_instance.db is None:
        logger.error("DB not initialized, cannot create indexes.")
        return
        
    logger.info("Ensuring 2dsphere indexes for spatial queries...")
    db = db_instance.db
    
    # Create 2dsphere index on 'location' for both collections
    await db.hazard_zones.create_index([("location", pymongo.GEOSPHERE)])
    await db.field_reports.create_index([("location", pymongo.GEOSPHERE)])
    logger.info("Spatial indexes verified.")
