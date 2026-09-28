from fastapi import APIRouter, HTTPException
from app.models.ml_schemas import RiskPredictionRequest, RiskPredictionResponse, TrainResponse
from app.ml.risk_model import predict_risk, train_model

router = APIRouter(prefix="/api/v1/predict", tags=["ML Risk Engine"])


@router.post("/risk", response_model=RiskPredictionResponse)
async def predict_landslide_risk(payload: RiskPredictionRequest):
    """
    🧠 **AI Risk Prediction Endpoint**
    
    Accepts environmental sensor readings and returns a predicted
    landslide risk score (0-100) with a status classification.
    
    The XGBoost model was trained on 1000+ synthetic samples
    modeled after NER (North Eastern Region) landslide triggers.
    
    **Input features:**
    - `rainfall_24h` — 24h cumulative rainfall (mm)
    - `soil_moisture` — Volumetric soil moisture (%)
    - `slope_angle` — Terrain slope gradient (°)
    - `seismic_activity` — Micro-tremor index (0-1)
    - `vegetation_cover` — NDVI vegetation density (%)
    - `drainage_density` — Stream network density (km/km²)
    - `antecedent_rainfall_7d` — Prior 7-day rainfall (mm)
    - `elevation` — Altitude above sea level (m)
    
    **Output:** `risk_score`, `status` (Normal/Watch/Warning/Critical), `confidence`
    """
    try:
        result = predict_risk(
            rainfall_24h=payload.rainfall_24h,
            soil_moisture=payload.soil_moisture,
            slope_angle=payload.slope_angle,
            seismic_activity=payload.seismic_activity,
            vegetation_cover=payload.vegetation_cover,
            drainage_density=payload.drainage_density,
            antecedent_rainfall_7d=payload.antecedent_rainfall_7d,
            elevation=payload.elevation
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


@router.post("/train", response_model=TrainResponse)
async def retrain_model():
    """
    🔄 **Retrain the XGBoost risk model.**
    
    Regenerates the synthetic training dataset (1000 samples)
    and retrains the model from scratch. Returns evaluation metrics.
    
    Useful for demo purposes or after updating the data generator.
    """
    try:
        # Regenerate training data first
        from app.ml.generate_data import generate_dataset
        generate_dataset(1000)
        
        metrics = train_model()
        
        return {
            "message": "Model retrained successfully.",
            **metrics
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Training failed: {str(e)}")


@router.get("/status")
async def model_status():
    """
    Check if the risk model is loaded and ready for predictions.
    """
    import os
    from app.ml.risk_model import MODEL_PATH
    
    model_exists = os.path.exists(MODEL_PATH)
    model_size = os.path.getsize(MODEL_PATH) if model_exists else 0
    
    return {
        "model_ready": model_exists,
        "model_path": MODEL_PATH,
        "model_size_kb": round(model_size / 1024, 1) if model_exists else 0,
        "features": [
            "rainfall_24h", "soil_moisture", "slope_angle", "seismic_activity",
            "vegetation_cover", "drainage_density", "antecedent_rainfall_7d", "elevation"
        ]
    }
