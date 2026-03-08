import { useState } from 'react';
import { useAuth } from '../features/auth/model/auth.context';
import { Header } from '../shared/UI/Header';
import { BottomNavbar } from '../shared/UI/BottomNavbar';
import { useCircles } from '../features/circles/hooks/useCircles';
import { useExchangePartners } from '../features/users/hooks/useExchangePartners';
import circleImg from '../assets/circle_illustration.png';
import logoImg from '../assets/logo.png';

export const HomePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  const [isCircleModalOpen, setIsCircleModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  const { circles, loading: loadingCircles } = useCircles();
  const { partners, loading: loadingPartners } = useExchangePartners();

  return (
    <div className="relative min-h-screen grid grid-rows-[auto_1fr] overflow-x-hidden bg-[#F0F7F8]">
      <div className="relative z-20 p-6 pb-2">
        <Header
          name={user?.name}
          avatar={user?.avatar || logoImg}
          timezone={user?.timezone?.split('/').pop()?.replace('_', ' ')}
        />
      </div>

      <div className="relative">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none border-t border-white/20"
          style={{ backgroundImage: "url('/background.jpg')", opacity: 0.3 }}
        />

        <main className="relative z-10 p-6 pt-4 space-y-6">
          {/* FIND A PARTNER */}
          <section className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-6 shadow-xl shadow-cyan-900/5 border border-white w-full overflow-hidden">
            <div
              className="flex justify-between items-center mb-4 cursor-pointer"
              onClick={() => setIsPartnerModalOpen(true)}
            >
              <h2 className="text-xl font-bold text-[#004D57]">
                Find an exchange partner!
              </h2>
              <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest">
                See all
              </span>
            </div>

            {/* CONTAINER OF THE SCROLL */}
            <div className="flex flex-nowrap gap-4 overflow-x-auto pb-4 no-scrollbar snap-x w-full max-w-[calc(100vw-6rem)]">
              {loadingPartners ? (
                <div className="w-full h-24 flex items-center justify-center text-cyan-200 italic">
                  Searching...
                </div>
              ) : (
                partners.map((partner) => (
                  <div
                    key={partner._id}
                    className="flex-shrink-0 w-[240px] bg-white/60 rounded-3xl p-4 border border-cyan-100/50 flex items-center gap-3 snap-center shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-white border border-cyan-100 flex items-center justify-center p-2">
                      <img
                        src={partner.avatarUrl || logoImg}
                        className="w-full h-full object-contain"
                        alt={partner.name}
                      />
                    </div>
                    <div className="flex flex-col text-left overflow-hidden">
                      <span className="font-bold text-sm text-cyan-950 truncate">
                        {partner.name}
                      </span>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        Learns:{' '}
                        <span className="text-orange-500 font-bold">
                          {partner.learningLanguage}
                        </span>
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* FIND A CIRCLE */}
          <section
            onClick={() => setIsCircleModalOpen(true)}
            className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-6 shadow-xl shadow-cyan-900/5 border border-white cursor-pointer transition-transform active:scale-[0.98]"
          >
            <div className="flex justify-between items-center gap-4">
              <div className="text-left">
                <h2 className="text-xl font-bold text-[#004D57]">
                  Find a circle
                </h2>
                <p className="text-xs text-[#004D57]/70 italic mt-1 leading-snug">
                  Use our game changing circle feature to exchange in a safe and
                  fun environment!
                </p>
              </div>
              <div className="w-20 h-20 flex-shrink-0">
                <img
                  src={circleImg}
                  className="w-full h-full object-contain"
                  alt="Circles"
                />
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* PARTNER MODAL */}
      {isPartnerModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-cyan-950/20 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-[3rem] p-8 shadow-2xl animate-in slide-in-from-bottom duration-300 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-cyan-900">All Partners</h2>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPartnerModalOpen(false);
                }}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold hover:bg-gray-200 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar h-[440px]">
              {partners.map((p) => (
                <div
                  key={p._id}
                  className="flex items-center justify-between p-4 bg-cyan-50/50 rounded-[2.5rem] border border-cyan-100/50 hover:bg-cyan-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* CONTENEDOR DE AVATAR CON ESCALA */}
                    <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-white border border-cyan-100 flex items-center justify-center p-2 shadow-sm">
                      <img
                        src={p.avatarUrl || logoImg}
                        // Si no hay avatar real, usamos object-contain para el logo
                        className={`w-full h-full ${p.avatarUrl ? 'object-cover' : 'object-contain'}`}
                        alt={p.name}
                      />
                    </div>

                    <div className="text-left">
                      <p className="font-bold text-lg text-cyan-950 leading-tight">
                        {p.name}
                      </p>
                      <p className="text-[10px] text-cyan-600 font-black uppercase tracking-widest mt-0.5">
                        Learns:{' '}
                        <span className="text-orange-500">
                          {p.learningLanguage}
                        </span>
                      </p>
                    </div>
                  </div>

                  <button className="text-[11px] font-black uppercase text-white bg-cyan-600 px-6 py-2.5 rounded-full shadow-lg shadow-cyan-600/20 active:scale-95 transition-transform">
                    Chat
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CIRCLE MODAL */}
      {isCircleModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-cyan-950/20 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-[3rem] p-8 shadow-2xl animate-in slide-in-from-bottom duration-300 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-cyan-900">
                Available Circles
              </h2>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCircleModalOpen(false);
                }}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar h-[440px]">
              {loadingCircles ? (
                <p className="text-center py-10 opacity-50 italic">
                  Fetching circles...
                </p>
              ) : (
                circles.map((circle) => (
                  <div
                    key={circle._id}
                    className="flex items-center justify-between p-4 bg-cyan-50/50 rounded-[2rem] border border-cyan-100/50"
                  >
                    <div className="flex items-center gap-4 overflow-hidden text-left">
                      <div className="w-12 h-12 rounded-full bg-cyan-600 flex items-center justify-center text-white text-[10px] font-black uppercase flex-shrink-0">
                        {circle.type === 'practice' ? (
                          <span>{circle.language?.substring(0, 2)}</span>
                        ) : (
                          <span>
                            {circle.languages?.[0]?.substring(0, 2)}/
                            {circle.languages?.[1]?.substring(0, 2)}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-base text-cyan-950 truncate">
                          {circle.name}
                        </span>
                        <span className="text-[11px] text-cyan-600 font-medium uppercase tracking-wider">
                          {circle.level} • {circle.type}
                        </span>
                      </div>
                    </div>
                    <button className="text-[11px] font-black uppercase text-white bg-cyan-600 px-5 py-2 rounded-full hover:bg-cyan-700 transition-colors">
                      Join
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};
