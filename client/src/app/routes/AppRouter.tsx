import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WelcomePage } from '@/pages/WelcomePage';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { RegisterPage } from '@/features/auth/pages/RegisterPage';
import { MyCirclesPage } from '@/pages/MyCirclesPage';
import { CircleChatPage } from '@/features/circles/UI/CircleChatPage';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/circles" element={<MyCirclesPage />} />
        <Route path="/circles/:id" element={<CircleChatPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        {/* <Route path="/circles/:id/chat" element={<ChatPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
