/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCircleDetail } from '../hooks/useCircleDetail';
import { useAuth } from '../../auth/model/auth.context';
import { Send, Plus, Smile, ChevronLeft } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import logoImg from '../../../assets/logo.png';

export const CircleChatPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user: currentUser, isLoading: authLoading } = useAuth();
  const { circle, loading: circleLoading } = useCircleDetail(id);
  const { messages, sendMessage } = useChat(id);
  const [messageInput, setMessageInput] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!messageInput.trim()) return;

    sendMessage(messageInput);
    setMessageInput('');
  };

  if (authLoading || circleLoading)
    return (
      <div className="h-screen flex items-center justify-center bg-[#F0F7F8]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#007A85]"></div>
      </div>
    );

  return (
    <div className="h-screen bg-[#F0F7F8] flex flex-col overflow-hidden">
      {/* HEADER */}
      <header className="bg-white/90 backdrop-blur-md p-4 flex items-center gap-3 border-b border-gray-100 shadow-sm z-30">
        <button
          onClick={() => navigate('/circles')}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="text-cyan-900" size={28} />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-black text-cyan-900 truncate leading-tight">
            {circle?.name}
          </h1>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <p className="text-[10px] font-bold text-cyan-600/70 uppercase tracking-wider">
              {circle?.members?.length || 0} members active
            </p>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex overflow-hidden relative">
        <aside className="w-20 bg-white/30 backdrop-blur-md border-r border-gray-200/50 overflow-y-auto no-scrollbar flex flex-col items-center py-4 gap-5">
          <p className="text-[8px] font-black text-cyan-900/30 uppercase tracking-widest">
            Online
          </p>
          {circle?.members?.map((m: any, idx: number) => (
            <div
              key={m.userId || idx}
              className="flex flex-col items-center gap-1"
            >
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-white p-1 shadow-sm border border-cyan-100/50">
                  <img
                    src={logoImg}
                    className="w-full h-full object-contain opacity-80"
                    alt={m.name}
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
              </div>
              <span className="text-[8px] font-bold text-cyan-900 truncate w-14 text-center opacity-70">
                {m.name?.split(' ')[0]}
              </span>
            </div>
          ))}
        </aside>

        {/* CHAT BUBBLES AREA */}
        <main
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-white/20"
        >
          {messages.map((msg, index) => {
            const msgSenderId = msg.senderId?._id || msg.senderId;
            const myId = currentUser?.userId;

            const isMe =
              String(msgSenderId).trim().toLowerCase() ===
              String(myId).trim().toLowerCase();

            return (
              <div
                key={msg._id || index}
                className={`flex items-end gap-2 max-w-[85%] ${
                  isMe ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`p-3 rounded-2xl shadow-sm ${
                    isMe
                      ? 'bg-[#007A85] text-white rounded-br-none'
                      : 'bg-white text-cyan-950 rounded-bl-none border border-cyan-50'
                  }`}
                >
                  {!isMe && (
                    <p className="text-[10px] font-black text-cyan-600 mb-1 leading-none">
                      {msg.senderId?.name || msg.senderName || 'User'}
                    </p>
                  )}
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  <span
                    className={`text-[8px] block text-right mt-1 ${
                      isMe ? 'text-white/60' : 'text-gray-400'
                    }`}
                  >
                    {msg.createdAt
                      ? new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : '...'}
                  </span>
                </div>
              </div>
            );
          })}
        </main>
      </div>

      {/* INPUT */}
      <div className="px-4 py-3 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-30">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-2xl border border-gray-100"
        >
          <button
            type="button"
            className="p-2 text-cyan-600 hover:bg-white rounded-xl transition-all"
          >
            <Plus size={22} />
          </button>
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Write your message..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-1 text-cyan-950 placeholder:text-gray-400"
          />
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-cyan-600 transition-colors"
          >
            <Smile size={22} />
          </button>
          <button
            type="submit"
            disabled={!messageInput.trim()}
            className={`p-2.5 rounded-xl transition-all shadow-md ${messageInput.trim() ? 'bg-[#007A85] text-white scale-100 active:scale-95' : 'bg-gray-200 text-gray-400'}`}
          >
            <Send
              size={20}
              fill={messageInput.trim() ? 'currentColor' : 'none'}
            />
          </button>
        </form>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        input:focus { outline: none; }
      `}</style>
    </div>
  );
};
