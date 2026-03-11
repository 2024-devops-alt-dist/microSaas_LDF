import type { UserProfile } from '../types/index';

const VITE_API_URL = import.meta.env.VITE_API_URL as string;

export class UserService {
  async getAvailableExchangePartners(): Promise<UserProfile[]> {
    const response = await fetch(`${VITE_API_URL}/users`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch partners');
    return response.json() as Promise<UserProfile[]>;
  }
}
