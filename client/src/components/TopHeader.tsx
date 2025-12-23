import React from 'react';

export const TopHeader: React.FC = () => {
  return (
    <header className="flex justify-between items-start mb-8 w-full">
      <div className="flex flex-col">
        <div className="avatar mb-3">
          <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src="https://ui-avatars.com/api/?name=User+Name&background=006D77&color=fff"
              alt="Me"
            />
          </div>
        </div>
        <h1 className="text-2xl font-title font-bold text-primary tracking-tight">
          Hi, Username!
        </h1>
      </div>
      <div className="badge badge-ghost bg-base-200/70 backdrop-blur border border-white/50 p-3 gap-2 shadow-sm mt-1 tracking-tight">
        <span className="text-xs font-mono text-neutral/70">
          Jun 3 • 14:36 UTC
        </span>
        <span>🇮🇹</span>
      </div>
    </header>
  );
};
