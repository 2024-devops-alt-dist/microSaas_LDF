import { client } from '@/shared/api/client';
import type { AuthResponse } from '../types';

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const { data } = await client.post<AuthResponse>(
      '/auth/login',
      credentials,
    );
    return data;
  },
  register: async (userData: { email: string; password: string }) => {
    const { data } = await client.post<AuthResponse>(
      '/auth/register',
      userData,
    );
    return data;
  },
};
