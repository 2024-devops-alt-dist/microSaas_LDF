import { useState } from 'react';
import axios from 'axios';
import '../App.css';

interface HealthResponse {
  message?: string;
}

const ApiHealth = () => {
  const [apiStatus, setApiStatus] = useState({ status: 'idle', message: '' });

  const testApiConnection = async () => {
    setApiStatus({ status: 'pending', message: 'Testing connection...' });
    try {
      const response = await axios.get<HealthResponse>(
        'http://localhost:3000/health',
      );
      setApiStatus({
        status: 'success',
        message: response.data.message || 'API connected!',
      });
    } catch (error) {
      console.error(error);
      setApiStatus({
        status: 'error',
        message: 'Connection failed.',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return '#006D77';
      case 'error':
        return '#E29578';
      case 'pending':
        return '#83C5BE';
      default:
        return '#9CA3AF'; // Gris
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold text-teal-900 mb-6">🛠 API Health</h1>

        <button
          onClick={() => void testApiConnection()}
          style={{ backgroundColor: getStatusColor(apiStatus.status) }}
          className="px-6 py-3 text-white font-bold rounded-lg shadow transition-all hover:brightness-110 w-full mb-4"
        >
          {apiStatus.status === 'pending' ? 'Testing...' : 'Test Connection'}
        </button>

        {apiStatus.status !== 'idle' && (
          <div
            className={`p-3 rounded-lg border text-sm ${
              apiStatus.status === 'error'
                ? 'bg-red-50 border-red-200 text-red-700'
                : 'bg-teal-50 border-teal-200 text-teal-800'
            }`}
          >
            <p className="font-bold uppercase text-xs mb-1">
              {apiStatus.status}
            </p>
            <p>{apiStatus.message}</p>
          </div>
        )}

        {/* Un enlace para volver a la app principal */}
        <a
          href="/"
          className="block mt-6 text-slate-400 text-sm hover:text-teal-600 underline"
        >
          ← Back to App
        </a>
      </div>
    </div>
  );
};

export default ApiHealth;
