import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './app/providers/AppProvider';
import { AppRouter } from './app/routes/AppRouter';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <AppRouter />
    </AppProvider>
  </React.StrictMode>,
);
