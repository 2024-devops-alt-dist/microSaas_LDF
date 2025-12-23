import React from 'react';
import type { Circle, Member } from '../types';

const getAvatar = (member: Member & { avatarUrl?: string }) => {
  if (member.avatarUrl) return member.avatarUrl;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&color=fff&rounded=true&bold=true`;
};

const AvatarItem = ({ member }: { member: Member }) => (
  <div className="flex flex-col items-center w-[50px]">
    <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm flex items-center justify-center overflow-hidden bg-gray-200">
      <img
        src={getAvatar(member)}
        alt={member.name}
        className="w-full h-full object-cover"
      />
    </div>
    <span className="text-[10px] text-[#006D77] font-sans font-medium mt-1 text-center truncate w-full px-1">
      {member.name.split(' ')[0]}
    </span>
  </div>
);

interface CircleCardProps {
  circle: Circle;
}

export const CircleCard: React.FC<CircleCardProps> = ({ circle }) => {
  const isPractice = circle.type === 'practice';
  const title = isPractice ? 'Practice Circle' : 'Exchange Circle';

  return (
    <div className="card bg-[#EDF6F9] shadow-[0_4px_12px_rgba(0,109,119,0.1)] border border-[#006D77]/30 w-full rounded-2xl overflow-hidden">
      <div className="card-body p-4 gap-1">
        {/* --- HEADER --- */}
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

        {/* --- BARRA DE IDIOMA --- */}
        <div className="bg-[#83C5BE]/30 px-3 py-1.5 rounded-md mb-3 flex items-center gap-2">
          <span className="text-[#006D77] font-sans font-medium text-sm">
            Language{circle.type === 'exchange' ? 's' : ''}:
          </span>

          <span className="text-[#006D77]/80 text-sm italic font-light font-serif flex items-center gap-1">
            {circle.type === 'practice' ? (
              <>{circle.language} 🇬🇧</>
            ) : (
              <>
                {circle.languages[0]} 🇬🇧
                <span className="text-[#006D77] font-bold text-xs mx-1 font-sans">
                  ⇄
                </span>
                {circle.languages[1]} 🇪🇸
              </>
            )}
          </span>
        </div>

        {/* --- MIEMBROS --- */}
        <div className="mt-1">
          {circle.type === 'practice' ? (
            <div className="flex flex-wrap gap-x-2 gap-y-3">
              {circle.members.map((m, i) => (
                <AvatarItem key={i} member={m} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {/* Mentors */}
              <div className="flex items-start gap-x-2">
                <span className="text-[#006D77] italic font-serif font-light text-sm w-16 pt-2 shrink-0">
                  Mentors:
                </span>
                <div className="flex flex-wrap gap-2">
                  {circle.mentors.map((m, i) => (
                    <AvatarItem key={i} member={m} />
                  ))}
                </div>
              </div>

              {/* Learners */}
              <div className="flex items-start gap-x-2">
                <span className="text-[#006D77] italic font-serif font-light text-sm w-16 pt-2 shrink-0">
                  Learners:
                </span>
                <div className="flex flex-wrap gap-2">
                  {circle.learners.map((l, i) => (
                    <AvatarItem key={i} member={l} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
