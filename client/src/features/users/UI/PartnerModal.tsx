import { useExchangePartners } from '../hooks/useExchangePartners';
import logoImg from '../../../assets/logo.png';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerModal = ({ isOpen, onClose }: PartnerModalProps) => {
  const { partners, loading } = useExchangePartners();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-cyan-950/20 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-[3rem] p-8 shadow-2xl animate-in slide-in-from-bottom duration-300 flex flex-col h-[600px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-left">
            <h2 className="text-2xl font-bold text-cyan-900 leading-tight">
              All Partners
            </h2>
            <p className="text-xs text-cyan-600/60 font-medium">
              Find someone to practice with
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold hover:bg-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* LIST OF PARTNERS */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center space-y-3 opacity-60">
              <div className="w-8 h-8 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-cyan-900 font-bold italic text-sm">
                Searching partners...
              </p>
            </div>
          ) : partners.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400 italic">
              No partners available at the moment.
            </div>
          ) : (
            partners.map((p) => (
              <div
                key={p._id}
                className="flex items-center justify-between p-4 bg-cyan-50/50 rounded-[2.5rem] border border-cyan-100/50 hover:bg-cyan-50 transition-all hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-white border border-cyan-100 flex items-center justify-center p-2 shadow-sm">
                    <img
                      src={p.avatarUrl || logoImg}
                      className={`w-full h-full ${p.avatarUrl ? 'object-cover' : 'object-contain'}`}
                      alt={p.name}
                    />
                  </div>

                  <div className="text-left">
                    <p className="font-bold text-lg text-cyan-950 leading-tight">
                      {p.name}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <span className="text-[9px] text-cyan-600 font-black uppercase tracking-widest">
                        Learns:
                      </span>
                      <span className="text-[10px] text-orange-600 font-bold bg-orange-50 px-2 rounded-full border border-orange-100">
                        {p.targetLanguages
                          ?.map((tl) => tl.language)
                          .join(', ') || 'Any'}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="text-[11px] font-black uppercase text-white bg-cyan-600 px-6 py-2.5 rounded-full shadow-lg shadow-cyan-600/20 active:scale-95 transition-transform">
                  Chat
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
