from pydantic import BaseModel, Field
from typing import Literal, Dict, Optional


class RiskPredictionRequest(BaseModel):
    """Input payload for the risk prediction endpoint."""
    rainfall_24h: float = Field(..., ge=0, le=500, description="24-hour cumulative rainfall in mm")
    soil_moisture: float = Field(..., ge=0, le=100, description="Volumetric soil moisture %")
    slope_angle: float = Field(..., ge=0, le=90, description="Terrain slope in degrees")
    seismic_activity: float = Field(0.0, ge=0, le=1.0, description="Micro-tremor index (0-1)")
    vegetation_cover: float = Field(50.0, ge=0, le=100, description="NDVI vegetation density %")
    drainage_density: float = Field(2.0, ge=0, le=10, description="Stream density km/km²")
    antecedent_rainfall_7d: float = Field(0.0, ge=0, le=1000, description="Prior 7-day rainfall mm")
    elevation: float = Field(1000.0, ge=0, le=9000, description="Altitude in meters")

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "rainfall_24h": 145.5,
                    "soil_moisture": 89.2,
                    "slope_angle": 42.5,
                    "seismic_activity": 0.45,
                    "vegetation_cover": 15.0,
                    "drainage_density": 4.2,
                    "antecedent_rainfall_7d": 220.0,
                    "elevation": 2400.0
                }
            ]
        }
    }


class RiskPredictionResponse(BaseModel):
    """Output payload from the risk prediction endpoint."""
    risk_score: int = Field(..., ge=0, le=100)
    status: Literal["Normal", "Watch", "Warning", "Critical"]
    confidence: Literal["low", "medium", "high"]
    features_used: Dict[str, float]


class TrainResponse(BaseModel):
    """Response from the model training endpoint."""
    message: str
    mae: float
    rmse: float
    r2: float
    train_samples: int
    test_samples: int
    feature_importance: Dict[str, float]
