/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/shared/UI/Button';
import { Input } from '@/shared/UI/Input';
import { authApi } from '../api/auth.api';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await authApi.register({
        email: form.email,
        password: form.password,
      });
      void navigate('/login');
    } catch (err: unknown) {
      setError('Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md">
        {/* Título Centrado (según tu diseño create account parece más centrado o alineado a la derecha, pero lo pondremos centrado para balancear) */}
        <h1 className="font-title text-4xl font-bold text-brand-dark mb-10 text-center">
          Create account
        </h1>

        <form onSubmit={void handleSubmit} className="space-y-4">
          <Input
            placeholder="Email address"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="bg-white"
          />
          <Input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="bg-white"
          />
          <Input
            placeholder="Confirm password"
            type="password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            className="bg-white"
          />

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <Button
            fullWidth
            type="submit"
            isLoading={loading}
            className="mt-4 bg-brand-dark hover:bg-[#005860] text-white rounded-xl h-12 text-lg shadow-lg"
          >
            Create account
          </Button>
        </form>

        {/* Términos y Condiciones */}
        <p className="mt-8 text-center text-xs text-brand-dark opacity-80 px-4 leading-relaxed">
          By creating an account or signing you agree to our{' '}
          <span className="font-bold underline cursor-pointer">
            Terms and Conditions
          </span>
        </p>

        {/* Link para volver al login (opcional, buena práctica UX) */}
        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="text-sm font-bold text-brand-dark hover:underline"
          >
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
};
