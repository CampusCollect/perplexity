import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { delay } from '@/lib/api/utils';
import { appConfig } from '@/lib/config/env';
import { useLogFn } from '@/lib/logging/logger';
import { mockUsers } from '@/lib/mock/users';
import type { SessionState, SessionUser } from '@/lib/types';
import { sessionSchema } from '@/lib/validation/schemas';

interface SessionContextValue {
  user: SessionUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (userId?: string) => Promise<void>;
  signOut: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

const STORAGE_KEY = 'executive-suite.session';

function readStoredSession(): SessionState | null {
  const value = window.localStorage.getItem(STORAGE_KEY);
  if (!value) return null;

  try {
    const parsed = JSON.parse(value);
    const result = sessionSchema.safeParse(parsed);
    if (!result.success) {
      return null;
    }
    return result.data;
  } catch {
    return null;
  }
}

function writeStoredSession(session: SessionState | null) {
  if (!session) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

function createMockSession(user: SessionUser): SessionState {
  return {
    user,
    token: `mock-token-${user.id}`,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
  };
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<SessionState | null>(null);
  const [isLoading, setLoading] = useState(true);
  const logInfo = useLogFn('info');

  useEffect(() => {
    const stored = readStoredSession();
    if (stored) {
      setSession(stored);
    }
    setLoading(false);
  }, []);

  const signIn = useCallback(async (userId?: string) => {
    setLoading(true);
    const user = mockUsers.find((item) => item.id === userId) ?? mockUsers[0];
    try {
      await delay(appConfig.mockLatencyMs);
      const nextSession = createMockSession(user);
      writeStoredSession(nextSession);
      setSession(nextSession);
      logInfo('User signed in', { userId: user.id, role: user.role });
    } finally {
      setLoading(false);
    }
  }, [logInfo]);

  const signOut = useCallback(() => {
    writeStoredSession(null);
    setSession(null);
    logInfo('User signed out');
  }, [logInfo]);

  const value = useMemo<SessionContextValue>(() => ({
    user: session?.user ?? null,
    isAuthenticated: Boolean(session?.user),
    isLoading,
    signIn,
    signOut,
  }), [session, isLoading, signIn, signOut]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
