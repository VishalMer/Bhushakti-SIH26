import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex h-screen w-full bg-slate-900 overflow-hidden text-slate-100 font-sans">
      <Sidebar />
      <div className="flex-1 overflow-y-auto flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
