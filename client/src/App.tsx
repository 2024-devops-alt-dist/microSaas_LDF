import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MyCirclesView from './features/circles/components/MyCirclesView';
import ApiHealth from './pages/ApiHealth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyCirclesView />} />
        <Route path="/health" element={<ApiHealth />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
