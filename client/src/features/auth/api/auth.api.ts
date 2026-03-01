import { client } from '@/shared/api/client';
import type { AuthResponse, User } from '../types';

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

  getProfile: async () => {
    const { data } = await client.get<User>('/auth/profile');
    return data;
  },
};
