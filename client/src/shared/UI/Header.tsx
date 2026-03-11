import { useState, useEffect } from 'react';

interface HeaderProps {
  name?: string;
  avatar?: string;
  timezone?: string;
}

export const Header = ({ name, avatar, timezone }: HeaderProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = time.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const isPlaceholder =
    !avatar || avatar.includes('logo') || avatar.includes('assets');

  return (
    <header className="flex justify-between items-start w-full">
      <div className="flex flex-col">
        <div
          className={`w-12 h-12 rounded-full overflow-hidden mb-2 bg-white shadow-sm border border-cyan-100 flex items-center justify-center ${isPlaceholder ? 'p-2' : ''}`}
        >
          <img
            src={avatar || '/avatar-placeholder.png'}
            className={`w-full h-full ${isPlaceholder ? 'object-contain' : 'object-cover'}`}
            alt="Profile"
          />
        </div>

        <h1 className="text-2xl font-bold text-cyan-900 leading-tight text-left">
          Hi, {name}!
        </h1>
      </div>

      <div className="text-right text-[11px] font-bold text-cyan-900 mt-2 opacity-80 whitespace-nowrap uppercase tracking-tighter">
        <span>
          {formattedDate} • {formattedTime} {timezone || 'UTC'}
        </span>
      </div>
    </header>
  );
};
