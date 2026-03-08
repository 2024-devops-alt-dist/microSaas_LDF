import React, { useState } from 'react'; // 1. Importa useState
import { Header } from './Header';
import { BottomNavbar } from './BottomNavbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="h-[100dvh] w-full relative flex flex-col font-sans overflow-hidden bg-base-100">
      {/* 1. BACKGROUND GLOBAL */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/background.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-base-100 to-transparent"></div>
      </div>

      {/* 2. HEADER */}
      <div className="relative z-10 shrink-0 w-full max-w-md mx-auto px-5 pt-8">
        <Header />
      </div>

      {/* 3. SCROLL ZONE */}
      <main className="relative z-10 flex-1 overflow-y-auto w-full max-w-md mx-auto px-5 pb-6 scrollbar-hide">
        {children}
      </main>

      <div className="relative z-50 shrink-0 w-full max-w-md mx-auto">
        <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};
