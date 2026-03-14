/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCircleDetail } from '../hooks/useCircleDetail';
import { Header } from '../../../shared/UI/Header';
import { BottomNavbar } from '../../../shared/UI/BottomNavbar';
import { useAuth } from '../../auth/model/auth.context';
import logoImg from '../../../assets/logo.png';

export const CircleDashboard = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const { circle, loading, error } = useCircleDetail(id);

  const [activeTab, setActiveTab] = useState('circles');

  const getLanguagesDisplay = () => {
    if (!circle) return '';
    if (circle.type === 'practice') {
      return circle.language;
    }
    const langs = (circle as any).languages || [];
    return langs.length >= 2
      ? `${langs[0]} ↔ ${langs[1]}`
      : langs[0] || 'Language not set';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F7F8]">
        <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !circle) {
    return (
      <div className="min-h-screen p-6 bg-[#F0F7F8] flex flex-col items-center justify-center text-center">
        <p className="text-red-500 font-bold mb-4">
          {error || 'Circle not found'}
        </p>
        <button
          onClick={() => navigate('/home')}
          className="text-cyan-600 font-bold underline"
        >
          Go back home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F7F8] pb-32 relative">
      {/* 1. HEADER */}
      <div className="p-6 pb-2">
        <Header
          name={currentUser?.name}
          avatar={logoImg}
          timezone={currentUser?.timezone?.split('/').pop()?.replace('_', ' ')}
        />
      </div>

      <div className="p-6 pt-0">
        {/* 2. NAVIGATION BAR */}
        <div className="flex items-center gap-4 mt-4 mb-6">
          <button
            onClick={() => navigate('/circles')}
            className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-cyan-900 font-bold active:scale-90 transition-transform"
          >
            ←
          </button>
          <h1 className="text-2xl font-black text-cyan-900 truncate">
            {circle.name}
          </h1>
        </div>

        <div className="space-y-6">
          {/* INFO CARD */}
          <section className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-8 shadow-xl shadow-cyan-900/5 border border-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-600">
                  {circle.type} Circle
                </span>
                <h2 className="text-xl font-bold text-cyan-950 mt-1">
                  {getLanguagesDisplay()}
                </h2>
              </div>
              <div className="bg-orange-50 text-orange-600 text-[10px] font-black px-4 py-1.5 rounded-full border border-orange-100 uppercase">
                {circle.level}
              </div>
            </div>

            <button
              onClick={() => navigate(`/circles/${id}/chat`)}
              className="w-full py-5 bg-cyan-600 text-white rounded-[1.5rem] font-black uppercase text-sm shadow-lg shadow-cyan-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              <span>Enter Group Chat</span>
              <span className="text-xl">💬</span>
            </button>
          </section>

          {/* MEMBERS LIST */}
          <section className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-8 shadow-xl shadow-cyan-900/5 border border-white">
            <h3 className="text-lg font-bold text-cyan-900 mb-6 flex items-center justify-between">
              Members
              <span className="text-sm font-medium text-cyan-600/60 bg-cyan-50 px-3 py-1 rounded-full">
                {circle.members?.length || 0}
              </span>
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {circle.members?.map((member: any, index: number) => (
                <div
                  key={member.userId || index}
                  className="flex items-center justify-between bg-cyan-50/30 p-3 rounded-3xl border border-cyan-100/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-white border border-cyan-100 p-1">
                      <img
                        src={logoImg}
                        className="w-full h-full object-cover"
                        alt={member.name || 'Member'}
                      />
                    </div>
                    <div>
                      <p className="font-bold text-cyan-950 text-sm">
                        {member.name || 'Anonymous'}{' '}
                        {member.userId === currentUser?.userId && '(You)'}
                      </p>
                      <p className="text-[10px] font-bold text-cyan-600/60 uppercase tracking-widest">
                        {member.role}{' '}
                        {member.language ? `• ${member.language}` : ''}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* FOOTER NAVBAR */}
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};
