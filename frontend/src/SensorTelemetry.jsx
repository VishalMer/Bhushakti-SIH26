import { useEffect } from 'react';
import { Radio, Activity, Droplets, Zap, Signal } from 'lucide-react';
import { 
  ComposedChart, LineChart, AreaChart, 
  Bar, Line, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import { rainfallMoistureData, displacementData, healthData } from './data/mockData';

export default function SensorTelemetry() {
  useEffect(() => { document.title = 'Sensor Telemetry — BHUSHAKTI'; }, []);
  const tooltipStyle = { backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' };
  const axisColor = "#475569";

  return (
    <div className="p-8 text-slate-100 font-sans w-full max-w-7xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Radio className="text-blue-500" size={32} /> Sensor Telemetry
          </h1>
          <p className="text-slate-400 mt-2">Real-time data feeds from field sensors and IoT devices.</p>
        </div>
      </div>

      {/* Top Row Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-md">
          <div className="flex justify-between items-start mb-2">
            <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">Avg Soil Moisture</div>
            <Droplets size={20} className="text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-slate-100">72%</div>
          <div className="text-xs text-red-400 mt-2 font-medium">↑ Rising (+15% in 24h)</div>
        </div>

        {/* Card 2 */}
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-md">
          <div className="flex justify-between items-start mb-2">
            <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">Ground Shift (Max)</div>
            <Activity size={20} className="text-orange-400" />
          </div>
          <div className="text-3xl font-bold text-slate-100">2.5<span className="text-lg text-slate-400 ml-1">mm</span></div>
          <div className="text-xs text-orange-400 mt-2 font-medium">⚠ Warning Threshold</div>
        </div>

        {/* Card 3 */}
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-md">
          <div className="flex justify-between items-start mb-2">
            <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">Active Sensors</div>
            <Signal size={20} className="text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-slate-100">128<span className="text-lg text-slate-400 ml-1">/ 135</span></div>
          <div className="text-xs text-emerald-400 mt-2 font-medium">94.8% Network Uptime</div>
        </div>

        {/* Card 4 */}
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-md">
          <div className="flex justify-between items-start mb-2">
            <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">Avg Battery Health</div>
            <Zap size={20} className="text-yellow-400" />
          </div>
          <div className="text-3xl font-bold text-slate-100">82%</div>
          <div className="text-xs text-yellow-400 mt-2 font-medium">3 nodes &lt; 30%</div>
        </div>
      </div>

      {/* Main Wide Chart (ComposedChart) */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
        <h3 className="text-lg font-bold text-slate-200 mb-6">48-Hour Rainfall & Soil Saturation</h3>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={rainfallMoistureData} margin={{ top: 20, right: 20, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={axisColor} vertical={false} />
              <XAxis dataKey="time" stroke={axisColor} tick={{ fill: '#94a3b8' }} />
              <YAxis yAxisId="left" stroke={axisColor} tick={{ fill: '#94a3b8' }} label={{ value: 'Rainfall (mm)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
              <YAxis yAxisId="right" orientation="right" stroke={axisColor} tick={{ fill: '#94a3b8' }} domain={[0, 100]} label={{ value: 'Moisture (%)', angle: 90, position: 'insideRight', fill: '#94a3b8' }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar yAxisId="left" dataKey="rainfall" name="Rainfall Intensity" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="moisture" name="Soil Moisture" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }} />
              <ReferenceLine yAxisId="right" y={80} stroke="#ef4444" strokeDasharray="5 5" label={{ position: 'top', value: 'Critical Saturation (80%)', fill: '#ef4444', fontSize: 12 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Smaller Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 2: Ground Displacement */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <h3 className="text-lg font-bold text-slate-200 mb-6">Inclinometer Displacement (7 Days)</h3>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={displacementData} margin={{ top: 20, right: 20, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={axisColor} vertical={false} />
                <XAxis dataKey="day" stroke={axisColor} tick={{ fill: '#94a3b8' }} />
                <YAxis stroke={axisColor} tick={{ fill: '#94a3b8' }} label={{ value: 'Movement (mm)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Line type="monotone" dataKey="x" name="X-Axis" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="y" name="Y-Axis" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="z" name="Z-Axis" stroke="#eab308" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Network Uptime & Battery Health */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <h3 className="text-lg font-bold text-slate-200 mb-6">Regional Network & Battery Status</h3>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={healthData} margin={{ top: 20, right: 20, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={axisColor} vertical={false} />
                <XAxis dataKey="sector" stroke={axisColor} tick={{ fill: '#94a3b8' }} />
                <YAxis stroke={axisColor} tick={{ fill: '#94a3b8' }} domain={[0, 100]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Area type="monotone" dataKey="uptime" name="Network Uptime (%)" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={2} />
                <Area type="monotone" dataKey="battery" name="Battery Health (%)" stroke="#a855f7" fill="#a855f7" fillOpacity={0.2} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
