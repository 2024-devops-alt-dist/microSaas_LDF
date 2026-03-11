import { useNavigate } from 'react-router-dom';
import { useMyCircles } from '../features/circles/hooks/useMyCircles';
import logoImg from '/src/assets/logo.png';

export const MyCirclesPage = () => {
  const navigate = useNavigate();
  const { circles, loading } = useMyCircles();

  return (
    <div className="min-h-screen bg-[#F0F7F8] p-6 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/home', { replace: true })}
          className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-cyan-900 font-bold"
        >
          ←
        </button>
        <h1 className="text-2xl font-black text-cyan-900">My Circles</h1>
      </div>

      {/* List Container */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
            <div className="w-8 h-8 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-bold text-cyan-900 italic">
              Loading your circles...
            </p>
          </div>
        ) : circles.length === 0 ? (
          <div className="bg-white/50 border-2 border-dashed border-cyan-200 rounded-[2.5rem] p-12 text-center">
            <p className="text-cyan-900/50 font-medium mb-4">
              You haven't joined any circles yet.
            </p>
            <button
              onClick={() => navigate('/')}
              className="text-cyan-600 font-black uppercase text-xs tracking-widest underline"
            >
              Discover Circles
            </button>
          </div>
        ) : (
          circles.map((circle) => (
            <div
              key={circle._id}
              onClick={() => navigate(`/circles/${circle._id}`)}
              className="bg-white/90 backdrop-blur-md rounded-[2rem] p-5 shadow-lg shadow-cyan-900/5 border border-white flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-4">
                {/* Logo del Círculo en lugar de Emojis */}
                <div className="w-14 h-14 rounded-2xl bg-white border border-cyan-50 flex items-center justify-center p-2 shadow-inner">
                  <img
                    src={logoImg}
                    alt="Circle Logo"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="text-left">
                  <h3 className="font-bold text-cyan-950 text-lg leading-tight">
                    {circle.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] font-black uppercase text-cyan-600/60 bg-cyan-50 px-2 py-0.5 rounded">
                      {circle.level}
                    </span>
                    <span className="text-[9px] font-black uppercase text-orange-500">
                      {circle.type === 'practice'
                        ? circle.language
                        : 'Exchange'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-cyan-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
