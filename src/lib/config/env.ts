const DEFAULT_API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'mock';
const DEFAULT_APP_NAME = import.meta.env.VITE_APP_NAME ?? 'Agentic Business Studio';
const DEFAULT_LOG_LEVEL = (import.meta.env.VITE_LOG_LEVEL ?? 'info').toLowerCase();

export interface AppConfig {
  apiBaseUrl: string;
  appName: string;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  mockLatencyMs: number;
}

function resolveLogLevel(value: string): AppConfig['logLevel'] {
  if (value === 'debug' || value === 'info' || value === 'warn' || value === 'error') {
    return value;
  }
  return 'info';
}

export const appConfig: AppConfig = {
  apiBaseUrl: DEFAULT_API_BASE_URL,
  appName: DEFAULT_APP_NAME,
  logLevel: resolveLogLevel(DEFAULT_LOG_LEVEL),
  mockLatencyMs: Number.parseInt(import.meta.env.VITE_MOCK_LATENCY_MS ?? '250', 10),
};
