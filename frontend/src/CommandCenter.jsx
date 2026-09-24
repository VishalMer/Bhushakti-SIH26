import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { Activity, AlertTriangle } from 'lucide-react';
import { mockHazardData, mockFieldReports, getRiskColor } from './data/mockData';

export default function CommandCenter() {
  useEffect(() => { document.title = 'Command Center — BHUSHAKTI'; }, []);

  return (
    <div className="flex w-full flex-1">
      {/* CENTER MAP AREA */}
      <div className="flex-1 flex flex-col bg-slate-900 relative p-4">
        <div className="h-full w-full rounded-xl overflow-hidden border border-slate-700 shadow-2xl relative z-0">
          <MapContainer
            center={[27.3312, 88.6139]}
            zoom={11}
            className="h-full w-full"
            zoomControl={false}
          >
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            />
            {mockHazardData.map((zone) => (
              <CircleMarker
                key={zone.id}
                center={zone.coordinates}
                radius={zone.risk_score > 75 ? 24 : 16}
                pathOptions={{
                  color: getRiskColor(zone.risk_score),
                  fillColor: getRiskColor(zone.risk_score),
                  fillOpacity: 0.4
                }}
              >
                <Popup>
                  <div className="p-1 font-sans">
                    <h3 className="font-bold">{zone.zone_name}</h3>
                    <p className="text-sm mt-1">Risk Score: <strong style={{ color: getRiskColor(zone.risk_score) }}>{zone.risk_score}%</strong></p>
                    <p className="text-sm">Driver: {zone.primary_driver}</p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-80 bg-slate-800 border-l border-slate-700 flex flex-col shrink-0 h-full">
        <div className="p-5 border-b border-slate-700 bg-slate-800/80">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Activity className="text-emerald-400" size={20} /> Top Priorities
          </h2>
        </div>

        <div className="p-4 space-y-4 flex-1 overflow-y-auto">
          {mockHazardData.filter(z => z.risk_score >= 60).sort((a, b) => b.risk_score - a.risk_score).map(zone => (
            <div key={zone.id} className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-slate-100">{zone.zone_name}</h3>
                <span className={`px-2 py-1 rounded text-xs font-bold ${zone.risk_score >= 75 ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'}`}>
                  {zone.risk_score}% {zone.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong className="text-slate-300">Driver:</strong> {zone.primary_driver}
              </p>
            </div>
          ))}

          <h2 className="text-lg font-bold flex items-center gap-2 pt-6 pb-2">
            <AlertTriangle className="text-yellow-400" size={20} /> Field Reports
          </h2>

          {mockFieldReports.map(report => (
            <div key={report.id} className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-slate-200">{report.type}</span>
                <span className="text-xs text-slate-400">{report.time}</span>
              </div>
              <p className="text-xs text-slate-400">Reporter: {report.reporter}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${report.severity === 'High' ? 'bg-red-500' : report.severity === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                <span className="text-xs text-slate-300">Severity: {report.severity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
