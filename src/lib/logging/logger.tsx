import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';

import { appConfig } from '@/lib/config/env';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

type LogContextValue = {
  log: (level: LogLevel, message: string, metadata?: Record<string, unknown>) => void;
  level: LogLevel;
};

const LoggerContext = createContext<LogContextValue | null>(null);

function shouldLog(level: LogLevel): boolean {
  const priority: Record<LogLevel, number> = {
    debug: 10,
    info: 20,
    warn: 30,
    error: 40,
  };

  return priority[level] >= priority[appConfig.logLevel];
}

function emit(level: LogLevel, message: string, metadata?: Record<string, unknown>) {
  if (!shouldLog(level)) return;

  const payload = metadata ? { message, ...metadata } : message;

  switch (level) {
    case 'debug':
      console.debug('[app]', payload);
      break;
    case 'info':
      console.info('[app]', payload);
      break;
    case 'warn':
      console.warn('[app]', payload);
      break;
    case 'error':
      console.error('[app]', payload);
      break;
    default:
      console.log('[app]', payload);
  }
}

export interface LoggerProviderProps {
  children: ReactNode;
}

export function LoggerProvider({ children }: LoggerProviderProps) {
  const log = useCallback<LogContextValue['log']>((level, message, metadata) => {
    emit(level, message, metadata);
  }, []);

  const value = useMemo<LogContextValue>(() => ({
    log,
    level: appConfig.logLevel,
  }), [log]);

  return <LoggerContext.Provider value={value}>{children}</LoggerContext.Provider>;
}

export function useLogger() {
  const context = useContext(LoggerContext);
  if (!context) {
    throw new Error('useLogger must be used within a LoggerProvider');
  }
  return context;
}

export function useLogFn(level: LogLevel) {
  const { log } = useLogger();
  return useCallback((message: string, metadata?: Record<string, unknown>) => {
    log(level, message, metadata);
  }, [log, level]);
}
