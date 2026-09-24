// Centralized mock data for all components.
// When the backend API is ready, replace these exports with fetch calls.

export const mockHazardData = [
  { id: 1, zone_name: "NH-10 Sector A", coordinates: [27.3312, 88.6139], risk_score: 87, primary_driver: "Extreme Rainfall & Soil Saturation", status: "Critical" },
  { id: 2, zone_name: "Sikkim Valley Route", coordinates: [27.3502, 88.6215], risk_score: 64, primary_driver: "Ground Movement Detected", status: "Warning" },
  { id: 3, zone_name: "Gangtok Approach", coordinates: [27.3200, 88.6000], risk_score: 42, primary_driver: "Moderate Rainfall", status: "Watch" },
  { id: 4, zone_name: "Mangan Highway", coordinates: [27.3900, 88.5400], risk_score: 12, primary_driver: "Stable Conditions", status: "Normal" }
];

export const mockFieldReports = [
  { id: 101, reporter: "Bhaveshbhai Patel", type: "Ground Crack", severity: "High", time: "10:15 AM" },
  { id: 102, reporter: "Jigneshbhai Joshi", type: "Water Accumulation", severity: "Medium", time: "09:42 AM" },
  { id: 103, reporter: "Rajubhai Bhatt", type: "Minor Rockfall", severity: "Low", time: "08:10 AM" }
];

export const mockAlerts = [
  { id: 1, zoneName: "Tawang Route", riskScore: 88, hazardDriver: "Extreme Rainfall & Soil Saturation", assignedOfficer: "Jigneshbhai Desai", status: "Evacuation Advised" },
  { id: 2, zoneName: "Sikkim Valley", riskScore: 78, hazardDriver: "Ground Movement Detected", assignedOfficer: "Alpesh Parmar", status: "Evacuation Advised" },
  { id: 3, zoneName: "Mangan Highway", riskScore: 65, hazardDriver: "Moderate Rainfall", assignedOfficer: "Maheshbhai Patel", status: "Monitor" },
  { id: 4, zoneName: "NH-10 Sector A", riskScore: 55, hazardDriver: "Minor Rockfall", assignedOfficer: "Kiran Mehta", status: "Monitor" },
  { id: 5, zoneName: "Gangtok Approach", riskScore: 45, hazardDriver: "Water Accumulation", assignedOfficer: "Sanjaybhai Patel", status: "Watch" },
  { id: 6, zoneName: "Teesta River Bridge", riskScore: 35, hazardDriver: "Stable Conditions", assignedOfficer: "Rajeshbhai Joshi", status: "Clear" }
];

export const mockCVReports = [
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

export const rainfallMoistureData = [
  { time: '00:00', rainfall: 0, moisture: 45 },
  { time: '04:00', rainfall: 2, moisture: 46 },
  { time: '08:00', rainfall: 15, moisture: 52 },
  { time: '12:00', rainfall: 45, moisture: 68 },
  { time: '16:00', rainfall: 30, moisture: 75 },
  { time: '20:00', rainfall: 10, moisture: 82 },
  { time: '24:00', rainfall: 0, moisture: 85 },
  { time: '28:00', rainfall: 0, moisture: 84 },
  { time: '32:00', rainfall: 5, moisture: 83 },
  { time: '36:00', rainfall: 25, moisture: 87 },
  { time: '40:00', rainfall: 15, moisture: 89 },
  { time: '44:00', rainfall: 0, moisture: 88 },
  { time: '48:00', rainfall: 0, moisture: 86 },
];

export const displacementData = [
  { day: 'Day 1', x: 0.2, y: 0.1, z: 0.5 },
  { day: 'Day 2', x: 0.3, y: 0.1, z: 0.6 },
  { day: 'Day 3', x: 0.3, y: 0.2, z: 0.6 },
  { day: 'Day 4', x: 0.5, y: 0.4, z: 0.8 },
  { day: 'Day 5', x: 1.2, y: 0.8, z: 1.5 },
  { day: 'Day 6', x: 1.8, y: 1.2, z: 2.1 },
  { day: 'Day 7', x: 2.1, y: 1.5, z: 2.5 },
];

export const healthData = [
  { sector: 'Sector Alpha', uptime: 99.9, battery: 85 },
  { sector: 'Sector Beta', uptime: 98.5, battery: 72 },
  { sector: 'Sector Gamma', uptime: 95.0, battery: 45 },
  { sector: 'Sector Delta', uptime: 99.0, battery: 90 },
  { sector: 'Sector Echo', uptime: 92.5, battery: 30 },
];

export function getRiskColor(score) {
  if (score >= 75) return "#ef4444";
  if (score >= 60) return "#f97316";
  if (score >= 40) return "#eab308";
  return "#22c55e";
}
