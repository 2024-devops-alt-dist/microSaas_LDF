import React from 'react';
import { AuthProvider } from '@/features/auth/model/auth.context';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AuthProvider>
      {/* Aquí podrías añadir ThemeProvider, QueryClientProvider, etc. */}
      {children}
    </AuthProvider>
  );
};
