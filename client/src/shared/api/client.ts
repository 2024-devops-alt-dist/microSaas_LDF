import axios from 'axios';

export const API_URL = import.meta.env.DEV
  ? '/api'
  : (import.meta.env.VITE_API_URL as string);

export const client = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});
