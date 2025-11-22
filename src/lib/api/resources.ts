import { delay } from '@/lib/api/utils';
import { appConfig } from '@/lib/config/env';
import { useLogFn } from '@/lib/logging/logger';
import { agents } from '@/lib/mock/agents';
import { budgets } from '@/lib/mock/budgets';
import { connectors } from '@/lib/mock/connectors';
import { runs } from '@/lib/mock/runs';
import { templates } from '@/lib/mock/templates';
import { dashboardData, type DashboardData } from '@/lib/mock/dashboard';
import type { BudgetEnvelope, Connector, RunSummary, TemplateSummary } from '@/lib/types';
import type { AgentSummary } from '@/lib/types';
import { httpClient } from '@/lib/api/httpClient';
import { agentSchema, budgetSchema, connectorSchema, runSchema, templateSchema } from '@/lib/validation/schemas';

function useMockData<T>(data: T): Promise<T> {
  return delay(appConfig.mockLatencyMs).then(() => data);
}

async function fetchCollection<T>(path: string, schema: (typeof agentSchema) | (typeof connectorSchema) | (typeof runSchema) | (typeof budgetSchema) | (typeof templateSchema)) {
  const raw = await httpClient.get<unknown>(path);
  const result = schema.array().safeParse(raw);
  if (!result.success) {
    throw new Error(`Invalid response for ${path}`);
  }
  return result.data as T;
}

export async function getAgents(): Promise<AgentSummary[]> {
  if (appConfig.apiBaseUrl === 'mock') {
    return useMockData(agents);
  }

  return fetchCollection<AgentSummary[]>('/agents', agentSchema);
}

export async function getConnectors(): Promise<Connector[]> {
  if (appConfig.apiBaseUrl === 'mock') {
    return useMockData(connectors);
  }

  return fetchCollection<Connector[]>('/connectors', connectorSchema);
}

export async function getRuns(): Promise<RunSummary[]> {
  if (appConfig.apiBaseUrl === 'mock') {
    return useMockData(runs);
  }

  return fetchCollection<RunSummary[]>('/runs', runSchema);
}

export async function getBudgets(): Promise<BudgetEnvelope[]> {
  if (appConfig.apiBaseUrl === 'mock') {
    return useMockData(budgets);
  }

  return fetchCollection<BudgetEnvelope[]>('/budgets', budgetSchema);
}

export async function getTemplates(): Promise<TemplateSummary[]> {
  if (appConfig.apiBaseUrl === 'mock') {
    return useMockData(templates);
  }

  return fetchCollection<TemplateSummary[]>('/templates', templateSchema);
}

export async function getDashboard(): Promise<DashboardData> {
  if (appConfig.apiBaseUrl === 'mock') {
    return useMockData(dashboardData);
  }

  const raw = await httpClient.get<unknown>('/dashboard');
  return raw as DashboardData;
}

export function useResourceLogger() {
  const logError = useLogFn('error');
  const logInfo = useLogFn('info');

  return { logError, logInfo };
}
