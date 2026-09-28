from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "BHUSHAKTI API"
    MONGO_URI: str = "mongodb://localhost:27017"  # Or your Atlas placeholder
    DB_NAME: str = "bhushakti_db"
    
    # Defaults to React frontend local ports
    ALLOWED_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]

    # This allows overriding variables via a .env file
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
