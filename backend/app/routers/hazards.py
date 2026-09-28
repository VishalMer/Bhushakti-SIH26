from fastapi import APIRouter, Depends, HTTPException
from typing import List
from datetime import datetime, timezone
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId

from app.database import get_db
from app.models.schemas import HazardZoneInDB

router = APIRouter(prefix="/api/v1/hazards", tags=["Hazards"])

@router.get("/zones", response_model=List[HazardZoneInDB])
async def get_zones(db: AsyncIOMotorDatabase = Depends(get_db)):
    """
    Retrieve all monitored hazard zones.
    Formatted for Leaflet frontend maps.
    """
    cursor = db.hazard_zones.find({})
    zones = await cursor.to_list(length=100)
    
    # Map _id to string representation for Pydantic
    for z in zones:
        z["_id"] = str(z["_id"])
    return zones

@router.get("/zones/{zone_id}", response_model=HazardZoneInDB)
async def get_zone(zone_id: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    """
    Retrieve details for a specific hazard zone.
    """
    try:
        obj_id = ObjectId(zone_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid Zone ID format")
        
    zone = await db.hazard_zones.find_one({"_id": obj_id})
    if not zone:
        raise HTTPException(status_code=404, detail="Zone not found")
        
    zone["_id"] = str(zone["_id"])
    return zone

@router.post("/seed")
async def seed_zones(db: AsyncIOMotorDatabase = Depends(get_db)):
    """
    Populate database with 4-6 realistic North Eastern Region zones 
    if the collection is empty.
    """
    count = await db.hazard_zones.count_documents({})
    if count > 0:
        return {"message": "Collection already has data, skipping seed.", "count": count}
        
    now = datetime.now(timezone.utc)
    
    dummy_zones = [
        {
            "zone_name": "NH-10 Sector A",
            "location": {"type": "Point", "coordinates": [88.6139, 27.3312]}, # lon, lat
            "district": "East Sikkim",
            "risk_score": 87,
            "status": "Critical",
            "primary_driver": "Extreme Rainfall & Soil Saturation",
            "rainfall_24h": 145.5,
            "soil_moisture": 89.2,
            "slope_angle": 42.5,
            "last_updated": now,
            "assigned_officer": "Jigneshbhai Desai"
        },
        {
            "zone_name": "Gangtok Approach",
            "location": {"type": "Point", "coordinates": [88.6000, 27.3200]},
            "district": "East Sikkim",
            "risk_score": 45,
            "status": "Watch",
            "primary_driver": "Moderate Rainfall",
            "rainfall_24h": 35.0,
            "soil_moisture": 60.1,
            "slope_angle": 28.0,
            "last_updated": now,
            "assigned_officer": "Rajeshbhai Mehta"
        },
        {
            "zone_name": "Mangan Highway",
            "location": {"type": "Point", "coordinates": [88.5400, 27.3900]},
            "district": "North Sikkim",
            "risk_score": 12,
            "status": "Normal",
            "primary_driver": "Stable Conditions",
            "rainfall_24h": 5.0,
            "soil_moisture": 35.0,
            "slope_angle": 22.5,
            "last_updated": now,
            "assigned_officer": "Bhaveshbhai Patel"
        },
        {
            "zone_name": "Tawang Route",
            "location": {"type": "Point", "coordinates": [91.8677, 27.5860]},
            "district": "Tawang",
            "risk_score": 78,
            "status": "Warning",
            "primary_driver": "Ground Movement Detected",
            "rainfall_24h": 85.0,
            "soil_moisture": 75.5,
            "slope_angle": 38.0,
            "last_updated": now,
            "assigned_officer": "Kamleshbhai Joshi"
        },
        {
            "zone_name": "Teesta River Bridge",
            "location": {"type": "Point", "coordinates": [88.5200, 27.2000]},
            "district": "Kalimpong",
            "risk_score": 65,
            "status": "Warning",
            "primary_driver": "River Scouring & Bank Erosion",
            "rainfall_24h": 70.0,
            "soil_moisture": 80.0,
            "slope_angle": 15.0,
            "last_updated": now,
            "assigned_officer": "Alpesh Parmar"
        }
    ]
    
    result = await db.hazard_zones.insert_many(dummy_zones)
    
    return {
        "message": f"Successfully seeded {len(result.inserted_ids)} hazard zones.",
        "inserted_ids": [str(x) for x in result.inserted_ids]
    }
