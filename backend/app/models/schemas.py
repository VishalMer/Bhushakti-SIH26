from pydantic import BaseModel, Field, ConfigDict
from typing import Literal, List, Optional
from datetime import datetime, timezone

class Point(BaseModel):
    """
    GeoJSON Point schema for spatial indexing.
    """
    type: Literal["Point"] = "Point"
    coordinates: List[float] # [longitude, latitude]

class HazardZoneBase(BaseModel):
    zone_name: str
    location: Point
    district: str
    risk_score: int = Field(..., ge=0, le=100)
    status: Literal["Normal", "Watch", "Warning", "Critical"]
    primary_driver: str
    rainfall_24h: float
    soil_moisture: float
    slope_angle: float
    last_updated: datetime
    assigned_officer: Optional[str] = None

class HazardZoneInDB(HazardZoneBase):
    id: str = Field(..., alias="_id")
    
    model_config = ConfigDict(populate_by_name=True)

class FieldReportCreate(BaseModel):
    report_id: str
    reporter_name: str
    location: Point
    hazard_type: str
    severity: Literal["Low", "Medium", "High"]
    notes: str
    image_url: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class FieldReportInDB(FieldReportCreate):
    id: str = Field(..., alias="_id")
    
    model_config = ConfigDict(populate_by_name=True)
