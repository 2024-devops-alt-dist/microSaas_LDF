/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/shared/UI/Button';
import { Input } from '@/shared/UI/Input';
import { authApi } from '../api/auth.api';
import { useAuth } from '../model/auth.context';
import { Facebook, Apple } from 'lucide-react'; // Google suele ser un SVG de color, usaremos una G por ahora

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await authApi.login(form);
      login(data.access_token);
      void navigate('/home');
    } catch (err: unknown) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md">
        {/* Título */}
        <h1 className="font-title text-4xl font-bold text-brand-dark mb-8 text-left">
          Log in
        </h1>

        <form onSubmit={void handleSubmit} className="space-y-5">
          {/* Inputs con estilo del diseño */}
          <Input
            label="Email address"
            placeholder="helloworld@gmail.com"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="bg-white"
            labelStyle="text-brand-dark font-normal"
          />

          <div>
            <Input
              label="Password"
              placeholder="••••••••"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="bg-white"
              labelStyle="text-brand-dark font-normal"
            />
            {/* Link de Forgot Password alineado a la derecha */}
            <div className="flex justify-end mt-2">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-brand-dark hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          {/* Botón Principal */}
          <Button
            fullWidth
            type="submit"
            isLoading={loading}
            className="bg-brand-dark hover:bg-[#005860] text-white rounded-xl h-12 text-lg shadow-lg"
          >
            Log in
          </Button>
        </form>

        {/* Separador */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-brand-bg text-gray-500">
              Or Login with
            </span>
          </div>
        </div>

        {/* Botones Sociales */}
        <div className="grid grid-cols-3 gap-4">
          <Button
            type="button"
            variant="social"
            className="rounded-xl border-none shadow-sm h-14"
          >
            <Facebook className="text-[#1877F2] w-6 h-6" fill="currentColor" />
          </Button>
          <Button
            type="button"
            variant="social"
            className="rounded-xl border-none shadow-sm h-14"
          >
            {/* Simulación del logo de Google de colores */}
            <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500">
              G
            </span>
          </Button>
          <Button
            type="button"
            variant="social"
            className="rounded-xl border-none shadow-sm h-14"
          >
            <Apple className="text-black w-6 h-6" fill="currentColor" />
          </Button>
        </div>

        {/* Footer Link */}
        <p className="mt-10 text-center text-sm text-brand-dark">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
