import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

from app.config import settings
from app.database import db_instance, ensure_indexes
from app.routers import hazards, predict

# Setup basic logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan event handler for FastAPI.
    Connects to MongoDB on startup and closes the connection on shutdown.
    """
    logger.info(f"Connecting to MongoDB at {settings.MONGO_URI}...")
    try:
        # Initialize Motor client
        client = AsyncIOMotorClient(settings.MONGO_URI)
        
        # Ping the server to verify connection
        await client.admin.command('ping')
        logger.info("Successfully connected to MongoDB!")
        
        # Store client and db instances for app-wide use
        db_instance.client = client
        db_instance.db = client[settings.DB_NAME]
        
        # Ensure MongoDB spatial indexes exist
        await ensure_indexes()
        
    except Exception as e:
        logger.error(f"Error connecting to MongoDB: {e}")
    
    yield
    
    # Shutdown logic
    logger.info("Closing MongoDB connection...")
    if db_instance.client:
        db_instance.client.close()
        logger.info("MongoDB connection closed.")


# Initialize FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    lifespan=lifespan
)

# Configure CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(hazards.router)
app.include_router(predict.router)

@app.get("/health")
async def health_check():
    """
    Basic health check route.
    """
    return {
        "status": "online",
        "system": "BHUSHAKTI Early Warning Engine",
        "version": "1.0.0"
    }
