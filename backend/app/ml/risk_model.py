"""
BHUSHAKTI XGBoost Risk Engine — Model Training & Inference.

This module trains an XGBoost regressor to predict landslide risk scores
(0-100) from environmental sensor inputs, and classifies them into
operational status levels for the SDMA dashboard.

Features (8 inputs):
  1. rainfall_24h      — 24-hour cumulative rainfall (mm)
  2. soil_moisture      — Volumetric soil moisture (%)
  3. slope_angle        — Terrain slope gradient (degrees)
  4. seismic_activity   — Micro-tremor index (0-1 normalized)
  5. vegetation_cover   — NDVI-derived vegetation density (%)
  6. drainage_density   — Stream network density (km/km²)
  7. antecedent_rainfall_7d — Prior 7-day cumulative rainfall (mm)
  8. elevation          — Altitude above sea level (m)

Output:
  - risk_score: 0-100 continuous probability score
  - status: Normal (<25) | Watch (25-49) | Warning (50-74) | Critical (≥75)
"""

import os
import logging
import joblib
import numpy as np
import pandas as pd
from xgboost import XGBRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

logger = logging.getLogger(__name__)

MODEL_DIR = os.path.join(os.path.dirname(__file__), "models")
MODEL_PATH = os.path.join(MODEL_DIR, "risk_model.pkl")
DATA_PATH = os.path.join(os.path.dirname(__file__), "data", "training_data.csv")

FEATURE_COLUMNS = [
    "rainfall_24h", "soil_moisture", "slope_angle", "seismic_activity",
    "vegetation_cover", "drainage_density", "antecedent_rainfall_7d", "elevation"
]

TARGET_COLUMN = "risk_score"


def classify_status(score: float) -> str:
    """Convert a 0-100 risk score into an operational status label."""
    if score >= 75:
        return "Critical"
    elif score >= 50:
        return "Warning"
    elif score >= 25:
        return "Watch"
    return "Normal"


def train_model() -> dict:
    """
    Train the XGBoost risk model from the synthetic dataset.
    Returns a dict of evaluation metrics.
    """
    logger.info(f"Loading training data from {DATA_PATH}...")
    
    if not os.path.exists(DATA_PATH):
        # Auto-generate if missing
        from app.ml.generate_data import generate_dataset
        generate_dataset(1000)
    
    df = pd.read_csv(DATA_PATH)
    
    X = df[FEATURE_COLUMNS]
    y = df[TARGET_COLUMN]
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    logger.info(f"Training on {len(X_train)} samples, testing on {len(X_test)}...")
    
    model = XGBRegressor(
        n_estimators=200,
        max_depth=6,
        learning_rate=0.1,
        subsample=0.8,
        colsample_bytree=0.8,
        min_child_weight=3,
        reg_alpha=0.1,
        reg_lambda=1.0,
        random_state=42,
        verbosity=0
    )
    
    model.fit(
        X_train, y_train,
        eval_set=[(X_test, y_test)],
        verbose=False
    )
    
    # Evaluate
    y_pred = model.predict(X_test)
    y_pred_clipped = np.clip(y_pred, 0, 100)
    
    metrics = {
        "mae": round(float(mean_absolute_error(y_test, y_pred_clipped)), 2),
        "rmse": round(float(np.sqrt(mean_squared_error(y_test, y_pred_clipped))), 2),
        "r2": round(float(r2_score(y_test, y_pred_clipped)), 4),
        "train_samples": len(X_train),
        "test_samples": len(X_test)
    }
    
    # Feature importance
    importance = dict(zip(FEATURE_COLUMNS, [round(float(x), 4) for x in model.feature_importances_]))
    metrics["feature_importance"] = importance
    
    # Save model
    os.makedirs(MODEL_DIR, exist_ok=True)
    joblib.dump(model, MODEL_PATH)
    logger.info(f"Model saved to {MODEL_PATH}")
    logger.info(f"Metrics: MAE={metrics['mae']}, RMSE={metrics['rmse']}, R²={metrics['r2']}")
    
    return metrics


# Lazy-loaded model singleton
_model = None

def _load_model():
    """Load the trained model from disk (lazy singleton)."""
    global _model
    if _model is None:
        if not os.path.exists(MODEL_PATH):
            logger.warning("No trained model found. Training now...")
            train_model()
        _model = joblib.load(MODEL_PATH)
        logger.info("Risk model loaded into memory.")
    return _model


def predict_risk(
    rainfall_24h: float,
    soil_moisture: float,
    slope_angle: float,
    seismic_activity: float = 0.0,
    vegetation_cover: float = 50.0,
    drainage_density: float = 2.0,
    antecedent_rainfall_7d: float = 0.0,
    elevation: float = 1000.0
) -> dict:
    """
    Predict landslide risk from environmental sensor readings.
    
    Returns:
        {
            "risk_score": 82,
            "status": "Critical",
            "confidence": "high",
            "features_used": {...}
        }
    """
    model = _load_model()
    
    features = np.array([[
        rainfall_24h, soil_moisture, slope_angle, seismic_activity,
        vegetation_cover, drainage_density, antecedent_rainfall_7d, elevation
    ]])
    
    raw_score = float(model.predict(features)[0])
    risk_score = int(np.clip(round(raw_score), 0, 100))
    status = classify_status(risk_score)
    
    # Confidence based on how extreme/clear the prediction is
    distance_from_boundary = min(
        abs(risk_score - 25), abs(risk_score - 50), abs(risk_score - 75)
    )
    if distance_from_boundary > 15:
        confidence = "high"
    elif distance_from_boundary > 5:
        confidence = "medium"
    else:
        confidence = "low"
    
    return {
        "risk_score": risk_score,
        "status": status,
        "confidence": confidence,
        "features_used": {
            "rainfall_24h": rainfall_24h,
            "soil_moisture": soil_moisture,
            "slope_angle": slope_angle,
            "seismic_activity": seismic_activity,
            "vegetation_cover": vegetation_cover,
            "drainage_density": drainage_density,
            "antecedent_rainfall_7d": antecedent_rainfall_7d,
            "elevation": elevation
        }
    }
