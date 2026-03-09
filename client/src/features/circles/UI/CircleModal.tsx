import { useState } from 'react';
import { useJoinRequest } from '../../requests/hooks/useJoinRequests';
import { RequestRole, type RequestRoleType } from '../../requests/types';
import { useAuth } from '../../auth/model/auth.context';
import logoImg from '../../../assets/logo.png';
import type { Circle } from '../types';

interface CircleModalProps {
  isOpen: boolean;
  onClose: () => void;
  circles: Circle[];
  loading: boolean;
}

export const CircleModal = ({
  isOpen,
  onClose,
  circles,
  loading,
}: CircleModalProps) => {
  const { user } = useAuth();
  const [step, setStep] = useState<'list' | 'request'>('list');
  const [selectedCircle, setSelectedCircle] = useState<Circle | null>(null);

  const [role, setRole] = useState<RequestRoleType>(RequestRole.LEARNER);
  const [selectedLang, setSelectedLang] = useState('');

  const {
    sendJoinRequest,
    isLoading: sending,
    error: apiError,
    resetError,
  } = useJoinRequest();

  if (!isOpen) return null;

  const handleJoinClick = (circle: Circle) => {
    resetError();
    setSelectedCircle(circle);
    const defaultLang =
      circle.type === 'practice' ? circle.language : circle.languages[0];
    setSelectedLang(defaultLang);
    setStep('request');
  };
  const handleBack = () => {
    resetError();
    setStep('list');
  };

  const handleConfirmRequest = async () => {
    if (!selectedCircle || !user) return;

    const isNative = user.nativeLanguages?.includes(selectedLang) ?? false;

    const targetLang = user.targetLanguages?.find(
      (t) => t.language.toUpperCase() === selectedLang.toUpperCase(),
    );

    const userLevel = isNative ? 'NATIVE' : targetLang?.level || 'BEGINNER';

    const isPractice = selectedCircle.type.toLowerCase() === 'practice';
    const finalRole = isPractice ? RequestRole.LEARNER : role;

    const result = await sendJoinRequest(selectedCircle._id, {
      role: finalRole,
      language: selectedLang,
      level: userLevel,
    });

    if (result.success) {
      onClose();
      setStep('list');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-cyan-950/20 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-[3rem] p-8 shadow-2xl animate-in slide-in-from-bottom duration-300 flex flex-col max-h-[90vh]">
        {/* HEADER MODAL */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-cyan-900">
            {step === 'list' ? 'Available Circles' : 'Join Request'}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto pr-2 custom-scrollbar">
          {step === 'list' ? (
            /* STEP 1: CIRCLE LIST */
            <div className="space-y-4">
              {loading ? (
                <p className="text-center py-10 opacity-50 italic">
                  Fetching circles...
                </p>
              ) : (
                circles.map((circle) => (
                  <div
                    key={circle._id}
                    className="flex items-center justify-between p-4 bg-cyan-50/50 rounded-[2rem] border border-cyan-100/50"
                  >
                    <div className="flex items-center gap-4 overflow-hidden text-left">
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-white border border-cyan-100 flex items-center justify-center p-2 shadow-sm flex-shrink-0">
                        <img
                          src={logoImg}
                          className="w-full h-full object-contain"
                          alt="Circle"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-base text-cyan-950 truncate">
                          {circle.name}
                        </span>
                        <span className="text-[11px] text-cyan-600 font-medium uppercase tracking-wider">
                          {circle.level} • {circle.type}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleJoinClick(circle)}
                      className="text-[11px] font-black uppercase text-white bg-cyan-600 px-5 py-2 rounded-full hover:bg-cyan-700 transition-colors"
                    >
                      Join
                    </button>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* STEP 2: FORM */
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-cyan-50 p-4 rounded-2xl border border-cyan-100 text-left">
                <p className="text-sm text-cyan-800 font-bold">
                  Applying for: {selectedCircle?.name}
                </p>
                <p className="text-xs text-cyan-600 italic">
                  Type: {selectedCircle?.type} • Level: {selectedCircle?.level}
                </p>
              </div>

              {/* ROLE SELECTION */}
              {selectedCircle?.type.toLowerCase() !== 'practice' && (
                <div className="text-left animate-in fade-in duration-300">
                  <label className="text-xs font-black uppercase text-cyan-700 ml-2">
                    I want to join as:
                  </label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => setRole(RequestRole.LEARNER)}
                      className={`py-3 rounded-2xl font-bold text-sm transition-all ${role === RequestRole.LEARNER ? 'bg-cyan-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}
                    >
                      Learner
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole(RequestRole.MENTOR)}
                      className={`py-3 rounded-2xl font-bold text-sm transition-all ${role === RequestRole.MENTOR ? 'bg-cyan-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}
                    >
                      Mentor
                    </button>
                  </div>
                </div>
              )}

              {/* LANGUAGE SELECTION */}
              <div className="text-left">
                <label className="text-xs font-black uppercase text-cyan-700 ml-2">
                  Language:
                </label>
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="w-full mt-2 p-3 rounded-2xl bg-gray-50 border border-gray-100 text-cyan-900 font-bold text-sm focus:outline-none focus:ring-2 ring-cyan-500"
                >
                  {selectedCircle?.type === 'practice' ? (
                    <option value={selectedCircle.language}>
                      {selectedCircle.language}
                    </option>
                  ) : (
                    selectedCircle?.languages.map((l: string) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {apiError && (
                <p className="text-xs text-red-500 font-bold text-center bg-red-50 p-2 rounded-lg border border-red-100">
                  {apiError}
                </p>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => handleBack()}
                  className="flex-1 py-4 rounded-full font-black uppercase text-xs text-gray-400 bg-gray-100"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirmRequest}
                  disabled={sending}
                  className="flex-[2] py-4 rounded-full font-black uppercase text-xs text-white bg-cyan-600 shadow-xl shadow-cyan-600/30 disabled:opacity-50"
                >
                  {sending ? 'Sending...' : 'Confirm Request'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
