import { useState } from 'react';
import { useAuth } from '../features/auth/model/auth.context';
import { Header } from '../shared/UI/Header';
import { BottomNavbar } from '../shared/UI/BottomNavbar';
import { useCircles } from '../features/circles/hooks/useCircles';
import { useExchangePartners } from '../features/users/hooks/useExchangePartners';
import { CircleModal } from '../features/circles/UI/CircleModal';
import circleImg from '../assets/circle_illustration.png';
import logoImg from '../assets/logo.png';
import { PartnerModal } from '@/features/users/UI/PartnerModal';

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
                          {partner.targetLanguages
                            ?.map((tl) =>
                              typeof tl === 'object' ? tl.language : tl,
                            )
                            .join(', ') || 'Any'}
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
        <PartnerModal
          key={isPartnerModalOpen ? 'p-open' : 'p-closed'}
          isOpen={isPartnerModalOpen}
          onClose={() => setIsPartnerModalOpen(false)}
        />
      )}

      {/* CIRCLE MODAL */}
      {isCircleModalOpen && (
        <CircleModal
          key={isCircleModalOpen ? 'open' : 'closed'}
          isOpen={isCircleModalOpen}
          onClose={() => setIsCircleModalOpen(false)}
          circles={circles}
          loading={loadingCircles}
        />
      )}

      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};
