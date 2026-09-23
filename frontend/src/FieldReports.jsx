import { useState } from 'react';
import { Filter, MapPin, Clock, Camera } from 'lucide-react';

const mockReports = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1541888081622-2db10c0ea91b?auto=format&fit=crop&q=80&w=800",
    bbox: { top: '25%', left: '30%', width: '45%', height: '50%' },
    label: "Deep Crack: 94%",
    timestamp: "2026-09-23 08:15 AM",
    gps: "27.3312° N, 88.6139° E",
    hazardType: "Tension Crack",
    reporter: "Rajubhai Bhatt",
    severity: "Critical"
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=800",
    bbox: { top: '40%', left: '20%', width: '35%', height: '35%' },
    label: "Wall Bulge: 88%",
    timestamp: "2026-09-23 09:30 AM",
    gps: "27.3502° N, 88.6215° E",
    hazardType: "Retaining Wall Bulge",
    reporter: "Bhaveshbhai Mer",
    severity: "High"
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&q=80&w=800",
    bbox: { top: '50%', left: '40%', width: '25%', height: '20%' },
    label: "Erosion: 75%",
    timestamp: "2026-09-23 10:45 AM",
    gps: "27.3200° N, 88.6000° E",
    hazardType: "Soil Erosion",
    reporter: "Kamleshbhai Patel",
    severity: "Moderate"
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1585250007802-95f87b322a36?auto=format&fit=crop&q=80&w=800",
    bbox: { top: '15%', left: '55%', width: '35%', height: '40%' },
    label: "Rockfall: 91%",
    timestamp: "2026-09-23 11:20 AM",
    gps: "27.3900° N, 88.5400° E",
    hazardType: "Active Rockfall",
    reporter: "Hiteshbhai Desai",
    severity: "Critical"
  },
  {
    id: 5,
    imageUrl: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&q=80&w=800",
    bbox: { top: '65%', left: '15%', width: '45%', height: '25%' },
    label: "Sinkhole: 82%",
    timestamp: "2026-09-23 12:15 PM",
    gps: "27.3350° N, 88.6100° E",
    hazardType: "Road Subsidence",
    reporter: "Alpesh Parmar",
    severity: "High"
  },
  {
    id: 6,
    imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=800",
    bbox: { top: '35%', left: '65%', width: '25%', height: '55%' },
    label: "Seepage: 79%",
    timestamp: "2026-09-23 01:05 PM",
    gps: "27.3450° N, 88.6050° E",
    hazardType: "Water Seepage",
    reporter: "Jigneshbhai Joshi",
    severity: "Moderate"
  }
];

export default function FieldReports() {
  const [filter, setFilter] = useState('All');

  const filteredReports = filter === 'All' 
    ? mockReports 
    : mockReports.filter(report => report.severity === filter);

  return (
    <div className="p-8 text-slate-100 font-sans w-full max-w-7xl mx-auto flex flex-col gap-8">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-md">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Camera className="text-emerald-500" size={28} /> AI Field Reports
          </h1>
          <p className="text-slate-400 mt-1 text-sm">Computer vision analysis of uploaded ground imagery.</p>
        </div>
        <div className="flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-lg border border-slate-700">
          <Filter size={18} className="text-slate-400" />
          <span className="text-sm font-medium text-slate-300">Filter by Severity:</span>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent text-emerald-400 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="All" className="bg-slate-800">All</option>
            <option value="Critical" className="bg-slate-800 text-red-400">Critical</option>
            <option value="High" className="bg-slate-800 text-orange-400">High</option>
            <option value="Moderate" className="bg-slate-800 text-yellow-400">Moderate</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-lg flex flex-col hover:border-slate-500 transition-colors group">
            {/* Image with CV Bounding Box */}
            <div className="relative w-full h-56 bg-slate-900 overflow-hidden">
              <img 
                src={report.imageUrl} 
                alt={report.hazardType}
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              {/* Bounding Box */}
              <div 
                className="absolute border-2 border-dashed border-red-500 bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.5)] pointer-events-none"
                style={{ 
                  top: report.bbox.top, 
                  left: report.bbox.left, 
                  width: report.bbox.width, 
                  height: report.bbox.height 
                }}
              >
                {/* Floating Label */}
                <div className="absolute -top-7 left-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                  {report.label}
                </div>
              </div>
            </div>

            {/* Card Metadata */}
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg text-slate-100 leading-tight">{report.hazardType}</h3>
                <span className={`px-2 py-1 rounded text-xs font-bold border shrink-0 ${
                  report.severity === 'Critical' ? 'bg-red-500/20 text-red-400 border-red-500/50' :
                  report.severity === 'High' ? 'bg-orange-500/20 text-orange-400 border-orange-500/50' :
                  'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
                }`}>
                  {report.severity}
                </span>
              </div>
              
              <div className="space-y-2 mt-auto">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Clock size={16} className="text-slate-500 shrink-0" />
                  <span className="truncate">{report.timestamp}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <MapPin size={16} className="text-slate-500 shrink-0" />
                  <span className="truncate">{report.gps}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center">
                <div className="text-sm">
                  <span className="text-slate-500 block text-[11px] uppercase tracking-wider font-semibold">Reported By</span>
                  <span className="font-medium text-slate-300">{report.reporter}</span>
                </div>
                <button className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-1.5 rounded transition-colors font-semibold shadow-sm border border-slate-600">
                  View Data
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {filteredReports.length === 0 && (
          <div className="col-span-full py-16 text-center bg-slate-800/50 rounded-xl border border-slate-700 border-dashed">
            <p className="text-slate-400 font-medium">No reports found for the selected severity.</p>
          </div>
        )}
      </div>
    </div>
  );
}
