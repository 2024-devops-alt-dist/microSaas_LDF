import React from 'react';
import { AuthProvider } from '@/features/auth/model/auth.context';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <AuthProvider>{children}</AuthProvider>;
};
