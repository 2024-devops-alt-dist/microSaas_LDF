import { useState } from 'react';
import { useAuth } from '../features/auth/model/auth.context';
import { Header } from '../shared/UI/Header';
import { BottomNavbar } from '../shared/UI/BottomNavbar';

export const HomePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  return (
    /* Cambiamos flex por grid para crear dos filas independientes */
    <div className="relative min-h-screen grid grid-rows-[auto_1fr] overflow-x-hidden bg-[#F0F7F8]">
      {/* 1. FILA DEL HEADER (Zona Sólida) */}
      {/* El padding pb-2 asegura que no se pegue al fondo */}
      <div className="relative z-20 p-6 pb-2">
        <Header
          name={user?.name}
          avatar={user?.avatar}
          timezone={user?.timezone?.split('/').pop()?.replace('_', ' ')}
        />
      </div>

      {/* 2. FILA DEL CONTENIDO (Zona Paisaje) */}
      <div className="relative">
        {/* El fondo ahora ocupa exactamente el espacio restante sin pisar al Header */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none border-t border-white/20"
          style={{
            backgroundImage: "url('/background.jpg')",
            opacity: 0.3,
          }}
        />

        {/* El MAIN con scroll propio si fuera necesario */}
        <main className="relative z-10 p-6 pt-4 space-y-6">
          {/* Tarjeta: Find a partner */}
          <section className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-6 shadow-xl shadow-cyan-900/5 border border-white">
            <h2 className="text-xl font-bold text-[#004D57] mb-4">
              Find a partner
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
              {/* Aquí irán los usuarios de la API */}
            </div>
          </section>

          {/* Tarjeta: Find a circle */}
          <section className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-6 shadow-xl shadow-cyan-900/5 border border-white">
            <h2 className="text-xl font-bold text-[#004D57] mb-2">
              Find a circle
            </h2>
            <div className="flex justify-between items-center gap-4">
              <p className="text-sm text-[#004D57] italic leading-snug">
                Use our game changing circle feature to exchange in a safe and
                fun environment!
              </p>
              <div className="w-20 h-20 flex-shrink-0">
                <img
                  src="/assets/circle-illustration.png"
                  className="w-full h-full object-contain"
                  alt="Circles"
                />
              </div>
            </div>
          </section>
        </main>
      </div>

      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};
