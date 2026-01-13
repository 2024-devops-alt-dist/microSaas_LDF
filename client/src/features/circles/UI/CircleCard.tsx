import React from 'react';
import type { Circle, UserProfile } from '../types';

const getAvatar = (user: UserProfile) => {
  if (user.avatarUrl) return user.avatarUrl;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&rounded=true&bold=true`;
};

const AvatarItem = ({ user }: { user: UserProfile }) => (
  <div className="flex flex-col items-center w-[50px]">
    <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm flex items-center justify-center overflow-hidden bg-gray-200">
      <img
        src={getAvatar(user)}
        alt={user.name}
        className="w-full h-full object-cover"
      />
    </div>
    <span className="text-[10px] text-[#006D77] font-sans font-medium mt-1 text-center truncate w-full px-1">
      {user.name.split(' ')[0]}
    </span>
  </div>
);

interface CircleCardProps {
  circle: Circle;
  onRequestJoin?: (circleId: string) => void | Promise<void>;
  isJoining?: boolean;
}

export const CircleCard: React.FC<CircleCardProps> = ({
  circle,
  onRequestJoin,
  isJoining = false,
}) => {
  const isPractice = circle.type?.toUpperCase() === 'PRACTICE';
  const title = isPractice ? 'Practice Circle' : 'Exchange Circle';

  const mentors = !isPractice
    ? circle.members.filter((m) => m.role === 'mentor')
    : [];

  const learners = !isPractice
    ? circle.members.filter((m) => m.role === 'member')
    : [];

  return (
    <div className="card bg-[#EDF6F9] shadow-[0_4px_12px_rgba(0,109,119,0.1)] border border-[#006D77]/30 w-full rounded-2xl overflow-hidden">
      <div className="card-body p-4 gap-1">
        {/* Header */}
        <div className="flex justify-between items-end mb-2">
          <h3 className="font-title text-[#006D77] font-bold text-lg leading-none">
            {title}
          </h3>
          {circle.type === 'exchange' && (
            <span className="font-serif text-2xl italic font-light text-[#006D77] lowercase leading-none">
              {circle.level}
            </span>
          )}
        </div>

        <div className="bg-[#83C5BE]/30 px-3 py-1.5 rounded-md mb-3 flex items-center gap-2">
          <span className="text-[#006D77] font-sans font-medium text-sm">
            Language{circle.type === 'exchange' ? 's' : ''}:
          </span>
          <span className="text-[#006D77]/80 text-sm italic font-light font-serif flex items-center gap-1">
            {circle.type === 'practice' ? (
              <>{circle.language} 🇬🇧</>
            ) : (
              <>
                {circle.languages[0]} 🇬🇧{' '}
                <span className="text-[#006D77] font-bold text-xs mx-1 font-sans">
                  ⇄
                </span>{' '}
                {circle.languages[1]} 🇪🇸
              </>
            )}
          </span>
        </div>

        <div className="mt-1 mb-2">
          {circle.type === 'practice' ? (
            <div className="flex flex-wrap gap-x-2 gap-y-3">
              {circle.members.map((m) => (
                <AvatarItem key={m.user._id} user={m.user} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {mentors.length > 0 && (
                <div className="flex items-start gap-x-2">
                  <span className="text-[#006D77] italic font-serif font-light text-sm w-16 pt-2 shrink-0">
                    Mentors:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {mentors.map((m) => (
                      <AvatarItem key={m.user._id} user={m.user} />
                    ))}
                  </div>
                </div>
              )}
              {learners.length > 0 && (
                <div className="flex items-start gap-x-2">
                  <span className="text-[#006D77] italic font-serif font-light text-sm w-16 pt-2 shrink-0">
                    Learners:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {learners.map((l) => (
                      <AvatarItem key={l.user._id} user={l.user} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {onRequestJoin && (
          <div className="mt-4 pt-4 border-t border-[#006D77]/10">
            <button
              onClick={() => void onRequestJoin(circle._id)}
              disabled={isJoining}
              style={{
                backgroundColor: '#006D77',
                color: '#FFFFFF',
              }}
              className="w-full py-3 px-6 rounded-xl font-bold tracking-wide 
                         flex items-center justify-center gap-2
                         shadow-[0_8px_16px_-4px_rgba(0,109,119,0.5)] 
                         hover:shadow-[0_12px_20px_-4px_rgba(0,109,119,0.6)] 
                         transition-all duration-200 transform hover:-translate-y-0.5
                         hover:brightness-110
                         disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isJoining ? (
                <>
                  <svg
                    className="animate-spin"
                    style={{
                      width: '20px',
                      height: '20px',
                      color: '#FFFFFF',
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>

                  <span style={{ color: '#FFFFFF' }}>Requesting...</span>
                </>
              ) : (
                <span style={{ color: '#FFFFFF' }}>Request to Join</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
