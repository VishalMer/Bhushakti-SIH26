# BHUSHAKTI Frontend

React + Vite + Tailwind CSS v4 frontend for the **BHUSHAKTI — AI-Powered Landslide Intelligence & Early Warning Network**.

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- **React 19** — UI framework
- **Vite 7** — Build tool and dev server
- **Tailwind CSS v4** — Utility-first styling (via `@tailwindcss/vite` plugin)
- **React Router DOM v7** — Client-side routing
- **React-Leaflet** — Interactive GIS map with ESRI satellite imagery
- **Recharts** — Data visualization charts
- **Lucide React** — Icon library
- **Axios** — HTTP client (for future API integration)

## Project Structure

```
src/
├── data/
│   └── mockData.js          # Centralized mock data (swap point for API)
├── App.jsx                  # Router configuration
├── Layout.jsx               # Sidebar + Outlet shell
├── Sidebar.jsx              # Navigation sidebar
├── ErrorBoundary.jsx        # Error boundary wrapper
├── CommandCenter.jsx        # GIS map dashboard (/)
├── ActiveAlerts.jsx         # Alert table + SMS dispatch (/alerts)
├── FieldReports.jsx         # CV image card gallery (/reports)
├── SensorTelemetry.jsx      # Recharts telemetry dashboard (/telemetry)
├── NotFound.jsx             # 404 page
├── index.css                # Tailwind + Leaflet CSS imports
└── main.jsx                 # App entry point
```

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `CommandCenter` | Interactive satellite map with risk zones |
| `/alerts` | `ActiveAlerts` | Emergency alert table with dispatch simulation |
| `/reports` | `FieldReports` | AI computer vision field report cards |
| `/telemetry` | `SensorTelemetry` | Sensor data charts (rainfall, displacement, battery) |
| `*` | `NotFound` | 404 catch-all |
