import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/lib/api/queryKeys';
import { getAgents, getBudgets, getConnectors, getRuns, getTemplates, useResourceLogger } from '@/lib/api/resources';

export function useAgents() {
  const { logError } = useResourceLogger();
  return useQuery({
    queryKey: queryKeys.agents,
    queryFn: async () => {
      try {
        return await getAgents();
      } catch (error) {
        logError('Failed to load agents', { error });
        throw error;
      }
    },
  });
}

export function useConnectors() {
  const { logError } = useResourceLogger();
  return useQuery({
    queryKey: queryKeys.connectors,
    queryFn: async () => {
      try {
        return await getConnectors();
      } catch (error) {
        logError('Failed to load connectors', { error });
        throw error;
      }
    },
  });
}

export function useRuns() {
  const { logError } = useResourceLogger();
  return useQuery({
    queryKey: queryKeys.runs,
    queryFn: async () => {
      try {
        return await getRuns();
      } catch (error) {
        logError('Failed to load runs', { error });
        throw error;
      }
    },
  });
}

export function useBudgets() {
  const { logError } = useResourceLogger();
  return useQuery({
    queryKey: queryKeys.budgets,
    queryFn: async () => {
      try {
        return await getBudgets();
      } catch (error) {
        logError('Failed to load budgets', { error });
        throw error;
      }
    },
  });
}

export function useTemplates() {
  const { logError } = useResourceLogger();
  return useQuery({
    queryKey: queryKeys.templates,
    queryFn: async () => {
      try {
        return await getTemplates();
      } catch (error) {
        logError('Failed to load templates', { error });
        throw error;
      }
    },
  });
}
