# 🏔️ BHUSHAKTI
**AI-Powered Landslide Intelligence & Early Warning Network**  
*Developed by Team TECH TITANS for Smart India Hackathon (SIH) 2026*

[![SIH 2026](https://img.shields.io/badge/SIH-2026-orange?style=for-the-badge)](https://sih.gov.in)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

BHUSHAKTI is a proactive disaster intelligence platform designed to transition landslide management in the North Eastern Region (NER) from reactive reporting to predictive early warning. It fuses live environmental sensors, geospatial data, and machine learning to calculate real-time landslide probabilities and trigger automated, cascading emergency alerts.

---

## 🎯 Problem Statement (SIH26001)
**Theme:** Disaster Management  
**Organization:** Ministry of Development of North Eastern Region (MDoNER)  
**Objective:** Develop an AI-Based Early Warning and Landslide Risk Monitoring System capable of continuous monitoring, dynamic risk assessment, GIS visualization, and automated alert dispatch for vulnerable roads and settlements in the NER.

---

## ✨ Core Features
* **🌍 Multi-Source GIS Dashboard:** Interactive map built with React-Leaflet visualizing live risk zones, vulnerable infrastructure, and active sensors.
* **🧠 ML Risk Engine:** XGBoost model that processes rainfall intensity, soil moisture, and slope gradient to generate a dynamic 0-100% landslide probability score.
* **📸 Computer Vision Assessment:** OpenCV-powered backend that analyzes citizen-uploaded field photos to detect physical hazards like ground cracks and debris.
* **🚨 Cascading Emergency Prioritization:** Automatically ranks hazard zones based on risk level and exposed population, advising Disaster Management Authorities (SDMA) on where to deploy resources first.
* **📱 Multilingual Alert Dispatcher:** Automated SMS and Push Notifications sent to local communities and field officers before a critical failure occurs.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend & GIS** | React.js, Vite, Tailwind CSS, React-Leaflet |
| **Backend API** | Python, FastAPI, Uvicorn |
| **AI & Modeling** | Scikit-Learn, XGBoost, OpenCV, Pandas |
| **Geospatial Database** | MongoDB Atlas (Native GeoJSON / 2dsphere indexing) |

---

## 🏗️ System Architecture

```mermaid
graph TD
    A[IMD Weather APIs] --> D(Data Ingestion Layer)
    B[IoT Soil/Rain Sensors] --> D
    C[Field Reports / CV] --> D
    D --> E{AI Risk Engine - XGBoost}
    E -->|Normal / Watch| F[MongoDB Atlas]
    E -->|High / Critical Risk| G[Alert Dispatcher]
    F --> H[React GIS Dashboard]
    G --> I[SMS / Field Worker App]
    H --> J[SDMA Decision Support]