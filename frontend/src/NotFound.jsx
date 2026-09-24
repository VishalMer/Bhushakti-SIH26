import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

export default function NotFound() {
  useEffect(() => { document.title = '404 — BHUSHAKTI'; }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <AlertTriangle className="text-yellow-500 mb-6" size={64} />
      <h1 className="text-5xl font-bold text-slate-100 mb-3">404</h1>
      <p className="text-lg text-slate-400 mb-8">This page doesn't exist or has been moved.</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        <Home size={18} /> Back to Command Center
      </Link>
    </div>
  );
}
