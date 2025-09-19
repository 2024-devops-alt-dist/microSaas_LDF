import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [apiStatus, setApiStatus] = useState({ status: 'idle', message: '' });

  const testApiConnection = async () => {
    setApiStatus({ status: 'pending', message: 'Testing connection...' });
    try {
      const response = await axios.get('http://localhost:3000/health');
      setApiStatus({
        status: 'success',
        message: response.data.message || 'API connected to database!',
      });
    } catch (error) {
      console.error('API connection failed:', error);
      setApiStatus({
        status: 'error',
        message: 'Database connection failed.',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return '#006D77'; // Verde oscuro
      case 'error':
        return '#E29578'; // Coral
      case 'pending':
        return '#83C5BE'; // Verde suave
      default:
        return '#FFDDD2'; // Rosa pálido
    }
  };

  return (
    <div className="container">
      <h1>API Health Check</h1>
      <button
        className="test-button"
        onClick={testApiConnection}
        style={{ backgroundColor: getStatusColor(apiStatus.status) }}
      >
        Test API Connection
      </button>

      {apiStatus.status !== 'idle' && (
        <div className="status-box">
          <p>
            Status:{' '}
            <span style={{ color: getStatusColor(apiStatus.status) }}>
              {apiStatus.status}
            </span>
          </p>
          <p>Message: {apiStatus.message}</p>
        </div>
      )}
    </div>
  );
}

export default App;
