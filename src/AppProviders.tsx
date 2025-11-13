import type { ReactNode } from 'react';

import { LoggerProvider } from '@/lib/logging/logger';
import { SessionProvider } from '@/lib/auth';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <LoggerProvider>
      <SessionProvider>{children}</SessionProvider>
    </LoggerProvider>
  );
}
