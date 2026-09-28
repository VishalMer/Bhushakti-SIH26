"""
Synthetic Landslide Risk Dataset Generator for NER India.

Generates physically realistic training data based on documented landslide
triggers in the North Eastern Region:
  - High rainfall (>100mm/24h) + saturated soil (>80%) on steep slopes (>35°) → Critical
  - Moderate rainfall on moderate slopes → Watch/Warning
  - Low rainfall, dry soil, gentle slopes → Normal

Reference thresholds from:
  - GSI (Geological Survey of India) landslide susceptibility guidelines
  - IMD rainfall intensity classifications
  - NDMA vulnerability scoring framework
"""

import csv
import random
import os

OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "data", "training_data.csv")

def generate_dataset(n_samples: int = 1000, seed: int = 42) -> str:
    """Generate a synthetic NER landslide dataset and write to CSV."""
    random.seed(seed)
    
    rows = []
    
    for _ in range(n_samples):
        # Decide the scenario first, then generate features that match
        scenario = random.choices(
            ["critical", "warning", "watch", "normal"],
            weights=[0.15, 0.20, 0.25, 0.40],
            k=1
        )[0]
        
        if scenario == "critical":
            rainfall_24h = random.uniform(100, 250)      # Heavy to extreme rainfall (mm)
            soil_moisture = random.uniform(78, 98)         # Near-saturated (%)
            slope_angle = random.uniform(30, 55)           # Steep slopes (degrees)
            seismic_activity = random.uniform(0.3, 1.0)    # Micro-tremor index (0-1)
            vegetation_cover = random.uniform(5, 35)       # Low cover (%)
            drainage_density = random.uniform(3.0, 6.0)    # High drainage (km/km²)
            antecedent_rainfall_7d = random.uniform(150, 400)  # Heavy prior week (mm)
            elevation = random.uniform(1500, 4000)         # High altitude (m)
            risk_score = random.randint(75, 100)
            
        elif scenario == "warning":
            rainfall_24h = random.uniform(50, 120)
            soil_moisture = random.uniform(60, 85)
            slope_angle = random.uniform(25, 45)
            seismic_activity = random.uniform(0.1, 0.6)
            vegetation_cover = random.uniform(20, 50)
            drainage_density = random.uniform(2.0, 4.5)
            antecedent_rainfall_7d = random.uniform(80, 200)
            elevation = random.uniform(800, 2500)
            risk_score = random.randint(50, 74)
            
        elif scenario == "watch":
            rainfall_24h = random.uniform(20, 70)
            soil_moisture = random.uniform(40, 70)
            slope_angle = random.uniform(15, 35)
            seismic_activity = random.uniform(0.0, 0.4)
            vegetation_cover = random.uniform(30, 65)
            drainage_density = random.uniform(1.5, 3.5)
            antecedent_rainfall_7d = random.uniform(30, 120)
            elevation = random.uniform(500, 1800)
            risk_score = random.randint(25, 49)
            
        else:  # normal
            rainfall_24h = random.uniform(0, 35)
            soil_moisture = random.uniform(15, 50)
            slope_angle = random.uniform(5, 25)
            seismic_activity = random.uniform(0.0, 0.2)
            vegetation_cover = random.uniform(50, 90)
            drainage_density = random.uniform(0.5, 2.5)
            antecedent_rainfall_7d = random.uniform(0, 60)
            elevation = random.uniform(200, 1200)
            risk_score = random.randint(0, 24)
        
        # Add controlled noise to blur boundaries (realistic overlap)
        risk_score = max(0, min(100, risk_score + random.randint(-5, 5)))
        
        rows.append({
            "rainfall_24h": round(rainfall_24h, 1),
            "soil_moisture": round(soil_moisture, 1),
            "slope_angle": round(slope_angle, 1),
            "seismic_activity": round(seismic_activity, 3),
            "vegetation_cover": round(vegetation_cover, 1),
            "drainage_density": round(drainage_density, 2),
            "antecedent_rainfall_7d": round(antecedent_rainfall_7d, 1),
            "elevation": round(elevation, 0),
            "risk_score": risk_score
        })
    
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    
    fieldnames = [
        "rainfall_24h", "soil_moisture", "slope_angle", "seismic_activity",
        "vegetation_cover", "drainage_density", "antecedent_rainfall_7d",
        "elevation", "risk_score"
    ]
    
    with open(OUTPUT_PATH, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
    
    return OUTPUT_PATH


if __name__ == "__main__":
    path = generate_dataset(1000)
    print(f"Generated 1000 training samples → {path}")
