import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-900 text-slate-100">
          <AlertTriangle className="text-red-500 mb-6" size={64} />
          <h1 className="text-3xl font-bold mb-3">Something went wrong</h1>
          <p className="text-slate-400 mb-6 max-w-md">
            An unexpected error occurred. Try refreshing the page.
          </p>
          <pre className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-sm text-red-400 max-w-lg overflow-x-auto mb-6">
            {this.state.error?.message}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
