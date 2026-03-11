import { Home, Globe, MessageSquare, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BottomNavbar = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (t: string) => void;
}) => {
  const navigate = useNavigate();

  const menu = [
    { id: 'home', icon: Home, label: 'Home', path: '/' },
    { id: 'circles', icon: Globe, label: 'My circle(s)', path: '/circles' },
    {
      id: 'messages',
      icon: MessageSquare,
      label: 'Message',
      path: '/messages',
    },
    { id: 'account', icon: User, label: 'Account', path: '/profile' },
  ];

  const handleNavigation = (id: string, path: string) => {
    setActiveTab(id);
    navigate(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#007A85] p-4 pb-6 flex justify-around items-center rounded-t-[32px] shadow-2xl z-50">
      {menu.map((item) => (
        <button
          key={item.id}
          onClick={() => handleNavigation(item.id, item.path)}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === item.id ? 'text-white scale-110' : 'text-white/50'
          }`}
        >
          <item.icon size={24} />
          <span className="text-[10px] font-medium">{item.label}</span>
          {activeTab === item.id && (
            <div className="w-1 h-1 bg-white rounded-full mt-1" />
          )}
        </button>
      ))}
    </nav>
  );
};
