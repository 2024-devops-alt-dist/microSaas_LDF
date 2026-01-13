import React from 'react';

export const BottomNavbar: React.FC = () => {
  return (
    <div className="btm-nav btm-nav-lg relative bg-primary text-primary-content rounded-t-2xl shadow-2xl w-full">
      <button>
        <span className="text-xl">🏠</span>
        <span className="btm-nav-label text-[10px]">Home</span>
      </button>
      <button className="active bg-white/10 border-t-2 border-white">
        <span className="text-xl">🌍</span>
        <span className="btm-nav-label text-[10px] font-bold">
          My circle(s)
        </span>
      </button>
      <button>
        <span className="text-xl">💬</span>
        <span className="btm-nav-label text-[10px]">Message</span>
      </button>
      <button>
        <span className="text-xl">👤</span>
        <span className="btm-nav-label text-[10px]">Account</span>
      </button>
    </div>
  );
};
