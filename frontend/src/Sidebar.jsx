import { NavLink } from 'react-router-dom';
import { Brain, Map as MapIcon, ShieldAlert, Camera, Radio } from 'lucide-react';

export default function Sidebar() {
  const navLinkClass = ({ isActive }) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
      isActive
        ? 'bg-slate-700 text-emerald-400 border-r-4 border-emerald-500'
        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
    }`;

  return (
    <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col shrink-0 h-full">
      <div className="p-6 flex items-center gap-3 border-b border-slate-700">
        <Brain className="text-emerald-400" size={32} />
        <h1 className="text-xl font-bold tracking-wider text-emerald-400">BHUSHAKTI</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavLink to="/" end className={navLinkClass}>
          <MapIcon size={20} /> Command Center
        </NavLink>
        <NavLink to="/alerts" className={navLinkClass}>
          <ShieldAlert size={20} /> Active Alerts
        </NavLink>
        <NavLink to="/reports" className={navLinkClass}>
          <Camera size={20} /> Field Reports
        </NavLink>
        <NavLink to="/telemetry" className={navLinkClass}>
          <Radio size={20} /> Sensor Telemetry
        </NavLink>
      </nav>

      <div className="p-6 border-t border-slate-700">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Map Layers</h3>
        <div className="space-y-3">
          {['Rainfall Intensity', 'Soil Moisture', 'Ground Movement', 'Vulnerable Roads'].map((layer) => (
            <label key={layer} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-emerald-500 bg-slate-700 border-slate-600 rounded" />
              <span className="text-sm text-slate-300">{layer}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
