import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import CommandCenter from './CommandCenter';
import ActiveAlerts from './ActiveAlerts';
import FieldReports from './FieldReports';
import SensorTelemetry from './SensorTelemetry';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CommandCenter />} />
          <Route path="alerts" element={<ActiveAlerts />} />
          <Route path="reports" element={<FieldReports />} />
          <Route path="telemetry" element={<SensorTelemetry />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}