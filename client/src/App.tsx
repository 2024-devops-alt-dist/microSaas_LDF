import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ApiHealth from './pages/ApiHealth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/health" element={<ApiHealth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
