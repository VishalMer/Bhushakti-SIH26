import { useState } from 'react';
import { AlertTriangle, Check, Loader2, Send } from 'lucide-react';

const mockAlerts = [
  { id: 1, zoneName: "Tawang Route", riskScore: 88, hazardDriver: "Extreme Rainfall & Soil Saturation", assignedOfficer: "Jigneshbhai Desai", status: "Evacuation Advised" },
  { id: 2, zoneName: "Sikkim Valley", riskScore: 78, hazardDriver: "Ground Movement Detected", assignedOfficer: "Alpesh Parmar", status: "Evacuation Advised" },
  { id: 3, zoneName: "Mangan Highway", riskScore: 65, hazardDriver: "Moderate Rainfall", assignedOfficer: "Maheshbhai Patel", status: "Monitor" },
  { id: 4, zoneName: "NH-10 Sector A", riskScore: 55, hazardDriver: "Minor Rockfall", assignedOfficer: "Kiran Mehta", status: "Monitor" },
  { id: 5, zoneName: "Gangtok Approach", riskScore: 45, hazardDriver: "Water Accumulation", assignedOfficer: "Sanjaybhai Patel", status: "Watch" },
  { id: 6, zoneName: "Teesta River Bridge", riskScore: 35, hazardDriver: "Stable Conditions", assignedOfficer: "Rajeshbhai Joshi", status: "Clear" }
];

export default function ActiveAlerts() {
  const [dispatchStatus, setDispatchStatus] = useState({});

  const handleDispatch = (id) => {
    setDispatchStatus(prev => ({ ...prev, [id]: 'sending' }));
    setTimeout(() => {
      setDispatchStatus(prev => ({ ...prev, [id]: 'dispatched' }));
    }, 1500);
  };

  const getRiskColor = (score) => {
    if (score > 75) return "bg-red-500";
    if (score >= 50) return "bg-orange-500";
    return "bg-yellow-500";
  };

  const getStatusBadge = (status) => {
    if (status === 'Evacuation Advised') return 'bg-red-500/20 text-red-400 border border-red-500/50';
    if (status === 'Monitor') return 'bg-orange-500/20 text-orange-400 border border-orange-500/50';
    if (status === 'Watch') return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50';
    return 'bg-green-500/20 text-green-400 border border-green-500/50';
  };

  return (
    <div className="p-8 text-slate-100 font-sans w-full max-w-7xl mx-auto flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <AlertTriangle className="text-red-500" size={32} /> Active Emergency Alerts
          </h1>
          <p className="text-slate-400 mt-2">Real-time hazard monitoring and response dispatch.</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-md">
          <div className="text-slate-400 text-sm font-medium mb-1 uppercase tracking-wider">Total Active</div>
          <div className="text-4xl font-bold text-slate-100">14</div>
        </div>
        <div className="bg-slate-800 p-5 rounded-xl border border-red-500/30 shadow-md relative overflow-hidden">
          <div className="absolute inset-0 bg-red-500/5 z-0"></div>
          <div className="relative z-10">
            <div className="text-red-400 text-sm font-medium mb-1 uppercase tracking-wider">Critical</div>
            <div className="text-4xl font-bold text-red-400">2</div>
          </div>
        </div>
        <div className="bg-slate-800 p-5 rounded-xl border border-yellow-500/30 shadow-md relative overflow-hidden">
          <div className="absolute inset-0 bg-yellow-500/5 z-0"></div>
          <div className="relative z-10">
            <div className="text-yellow-400 text-sm font-medium mb-1 uppercase tracking-wider">Watch</div>
            <div className="text-4xl font-bold text-yellow-400">5</div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-lg mt-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800/80">
                <th className="py-4 px-6 text-slate-400 uppercase text-xs font-bold tracking-wider">Zone Name</th>
                <th className="py-4 px-6 text-slate-400 uppercase text-xs font-bold tracking-wider w-48">Risk Score</th>
                <th className="py-4 px-6 text-slate-400 uppercase text-xs font-bold tracking-wider">Primary Hazard Driver</th>
                <th className="py-4 px-6 text-slate-400 uppercase text-xs font-bold tracking-wider">Assigned Officer</th>
                <th className="py-4 px-6 text-slate-400 uppercase text-xs font-bold tracking-wider">Status Badge</th>
                <th className="py-4 px-6 text-slate-400 uppercase text-xs font-bold tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {mockAlerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-slate-700/50 transition-colors group">
                  <td className="py-4 px-6 font-semibold text-slate-200">{alert.zoneName}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold w-8 text-right">{alert.riskScore}%</span>
                      <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${getRiskColor(alert.riskScore)}`} 
                          style={{ width: `${alert.riskScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-300">{alert.hazardDriver}</td>
                  <td className="py-4 px-6 text-slate-300 font-medium">{alert.assignedOfficer}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${getStatusBadge(alert.status)}`}>
                      {alert.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleDispatch(alert.id)}
                      disabled={dispatchStatus[alert.id] === 'sending' || dispatchStatus[alert.id] === 'dispatched'}
                      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all w-36 shadow-sm ${
                        dispatchStatus[alert.id] === 'dispatched'
                          ? 'bg-green-500/20 text-green-400 cursor-default border border-green-500/50'
                          : dispatchStatus[alert.id] === 'sending'
                          ? 'bg-slate-700 text-slate-300 cursor-not-allowed border border-slate-600'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500'
                      }`}
                    >
                      {dispatchStatus[alert.id] === 'dispatched' ? (
                        <><Check size={16} strokeWidth={3} /> Dispatched</>
                      ) : dispatchStatus[alert.id] === 'sending' ? (
                        <><Loader2 size={16} className="animate-spin" /> Sending...</>
                      ) : (
                        <><Send size={16} /> Dispatch SMS</>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
