import React, { useState } from 'react';
import { Button } from '@/shared/UI/Button';
import { Input } from '@/shared/UI/Input';
import { X, Check, ArrowRight, Plus, Trash2 } from 'lucide-react';
import { LANGUAGES } from '@/constants/languages';

export interface TargetLangState {
  language: string;
  level: string;
}

export interface OnboardingData {
  name: string;
  birthDate: string;
  timeZone: string;
  nativeLanguages: string[];
  targetLanguages: TargetLangState[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: OnboardingData) => void;
  isLoading: boolean;
}

export const OnboardingModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}) => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  // Estado Principal
  const [data, setData] = useState<OnboardingData>({
    name: '',
    birthDate: '',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    nativeLanguages: [],
    targetLanguages: [],
  });

  const [tempNative, setTempNative] = useState(LANGUAGES[0].code);
  const [tempTarget, setTempTarget] = useState(LANGUAGES[0].code);
  const [tempLevel, setTempLevel] = useState('BEGINNER');

  if (!isOpen) return null;

  // --- HANDLERS ---

  const handleNext = () => {
    if (!data.name || !data.birthDate) {
      setError('Please complete all fields');
      return;
    }
    setError('');
    setStep(2);
  };

  const addNative = () => {
    if (!data.nativeLanguages.includes(tempNative)) {
      setData((prev) => ({
        ...prev,
        nativeLanguages: [...prev.nativeLanguages, tempNative],
      }));
    }
  };

  const removeNative = (code: string) => {
    setData((prev) => ({
      ...prev,
      nativeLanguages: prev.nativeLanguages.filter((c) => c !== code),
    }));
  };

  const addTarget = () => {
    const exists = data.targetLanguages.some((t) => t.language === tempTarget);
    if (!exists) {
      setData((prev) => ({
        ...prev,
        targetLanguages: [
          ...prev.targetLanguages,
          { language: tempTarget, level: tempLevel },
        ],
      }));
    }
  };

  const removeTarget = (code: string) => {
    setData((prev) => ({
      ...prev,
      targetLanguages: prev.targetLanguages.filter((t) => t.language !== code),
    }));
  };

  const handleSubmit = () => {
    if (data.nativeLanguages.length === 0) {
      setError('Please add at least one native language');
      return;
    }
    if (data.targetLanguages.length === 0) {
      setError('Please add at least one target language');
      return;
    }
    setError('');
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-title font-bold text-brand-dark">
            {step === 1 ? 'Tell us about you' : 'Language Goals'}
          </h2>
          <div className="flex justify-center gap-2 mt-2">
            <div
              className={`h-1.5 rounded-full transition-all ${step === 1 ? 'w-8 bg-brand-dark' : 'w-2 bg-gray-200'}`}
            />
            <div
              className={`h-1.5 rounded-full transition-all ${step === 2 ? 'w-8 bg-brand-dark' : 'w-2 bg-gray-200'}`}
            />
          </div>
        </div>

        {/* --- STEP 1 --- */}
        {step === 1 && (
          <div className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Maria Garcia"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              labelStyle="text-brand-dark font-normal"
            />
            <Input
              label="Date of Birth"
              type="date"
              value={data.birthDate}
              onChange={(e) => setData({ ...data, birthDate: e.target.value })}
              labelStyle="text-brand-dark font-normal"
            />

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button
              fullWidth
              onClick={handleNext}
              className="bg-brand-dark mt-4"
            >
              Next Step <ArrowRight size={18} />
            </Button>
          </div>
        )}

        {/* --- STEP 2 --- */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-brand-dark mb-2 block">
                My Native Languages
              </label>
              <div className="flex gap-2 mb-2">
                <select
                  className="select select-bordered flex-1 bg-gray-50"
                  value={tempNative}
                  onChange={(e) => setTempNative(e.target.value)}
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={addNative}
                  className="btn btn-square bg-brand-dark text-white hover:bg-brand-dark/90"
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {data.nativeLanguages.map((code) => (
                  <div
                    key={code}
                    className="badge badge-lg gap-2 bg-gray-100 border-gray-300 p-3"
                  >
                    {LANGUAGES.find((l) => l.code === code)?.name || code}
                    <X
                      size={14}
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => removeNative(code)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-gray-100" />

            <div>
              <label className="text-sm font-semibold text-brand-dark mb-2 block">
                I want to learn
              </label>
              <div className="flex flex-col gap-2 mb-2">
                <div className="flex gap-2">
                  <select
                    className="select select-bordered flex-1 bg-gray-50"
                    value={tempTarget}
                    onChange={(e) => setTempTarget(e.target.value)}
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.name}
                      </option>
                    ))}
                  </select>
                  <select
                    className="select select-bordered w-1/3 bg-gray-50"
                    value={tempLevel}
                    onChange={(e) => setTempLevel(e.target.value)}
                  >
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="ADVANCED">Advanced</option>
                  </select>
                </div>
                <Button
                  onClick={addTarget}
                  variant="outline"
                  className="w-full border-dashed border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-brand-dark"
                >
                  <Plus size={16} className="mr-2" /> Add Language
                </Button>
              </div>

              <div className="space-y-2 mt-3">
                {data.targetLanguages.map((item) => (
                  <div
                    key={item.language}
                    className="flex justify-between items-center p-3 bg-brand-bg/30 rounded-lg border border-brand-light/20"
                  >
                    <div>
                      <span className="font-bold text-brand-dark block">
                        {LANGUAGES.find((l) => l.code === item.language)
                          ?.name || item.language}
                      </span>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        {item.level}
                      </span>
                    </div>
                    <button
                      onClick={() => removeTarget(item.language)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center animate-pulse">
                {error}
              </p>
            )}

            <div className="pt-2">
              <Button
                fullWidth
                onClick={handleSubmit}
                isLoading={isLoading}
                className="bg-brand-dark h-12 text-lg"
              >
                Complete Registration <Check size={20} className="ml-2" />
              </Button>
              <button
                onClick={() => setStep(1)}
                className="w-full text-center text-sm text-gray-400 hover:text-gray-600 mt-3"
              >
                Back to Personal Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
