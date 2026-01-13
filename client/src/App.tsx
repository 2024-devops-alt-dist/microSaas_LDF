import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MyCirclesView from './features/circles/UI/MyCirclesView';
import ApiHealth from './pages/ApiHealth';
import AvailableCirclesView from './features/circles/UI/AvailableCirclesView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyCirclesView />} />
        <Route path="/explore" element={<AvailableCirclesView />} />
        <Route path="/health" element={<ApiHealth />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
