import { getErrorMessage } from '@/utils/getErrorMessage';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/shared/UI/Button';
import { Input } from '@/shared/UI/Input';
import { authApi } from '../api/auth.api';
import {
  OnboardingModal,
  type OnboardingData,
} from '../components/OnboardingModal';

export type RegisterPayload = {
  name: string;
  birthDate: string;
  timeZone: string;
  nativeLanguages: string[];
  targetLanguages: { language: string; level: string }[];
  targetLevel: string;
};

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [basicForm, setBasicForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!basicForm.email || !basicForm.password) {
      setError('Please fill all fields');
      return;
    }
    if (basicForm.password !== basicForm.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (basicForm.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setShowModal(true);
  };

  const handleFinalSubmit = async (modalData: OnboardingData) => {
    setLoading(true);
    try {
      const fullPayload = {
        email: basicForm.email,
        password: basicForm.password,
        name: modalData.name,
        birthDate: modalData.birthDate,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        nativeLanguages: modalData.nativeLanguages,
        targetLanguages: modalData.targetLanguages,
      };

      await authApi.register(fullPayload);
      void navigate('/login');
    } catch (err) {
      console.error(err);
      setShowModal(false);
      const userFriendlyMessage = getErrorMessage(err, 'Registration failed');
      setError(userFriendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col justify-center items-center p-6 relative">
      <div className="w-full max-w-md">
        <h1 className="font-title text-4xl font-bold text-brand-dark mb-10 text-center">
          Create account
        </h1>

        <form onSubmit={handleInitialSubmit} className="space-y-4">
          <Input
            placeholder="Email address"
            type="email"
            value={basicForm.email}
            onChange={(e) =>
              setBasicForm({ ...basicForm, email: e.target.value })
            }
            className="bg-white"
          />
          <Input
            placeholder="Password"
            type="password"
            value={basicForm.password}
            onChange={(e) =>
              setBasicForm({ ...basicForm, password: e.target.value })
            }
            className="bg-white"
          />
          <Input
            placeholder="Confirm password"
            type="password"
            value={basicForm.confirmPassword}
            onChange={(e) =>
              setBasicForm({ ...basicForm, confirmPassword: e.target.value })
            }
            className="bg-white"
          />

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <Button
            fullWidth
            type="submit"
            className="mt-4 bg-brand-dark hover:bg-[#005860] text-white rounded-xl h-12 text-lg shadow-lg"
          >
            Create account
          </Button>
        </form>

        <p className="mt-8 text-center text-xs text-brand-dark opacity-80 px-4 leading-relaxed">
          By creating an account or signing you agree to our{' '}
          <span className="font-bold underline cursor-pointer">
            Terms and Conditions
          </span>
        </p>

        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="text-sm font-bold text-brand-dark hover:underline"
          >
            Already have an account? Log in
          </Link>
        </div>
      </div>

      <OnboardingModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(e) => void handleFinalSubmit(e)}
        isLoading={loading}
      />
    </div>
  );
};
