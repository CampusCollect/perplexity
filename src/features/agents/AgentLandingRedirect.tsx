import { Navigate } from 'react-router-dom';

import { LoadingState } from '@/components/status/LoadingState';
import { useAgents } from '@/lib/api';

export function AgentLandingRedirect() {
  const { data, isLoading } = useAgents();

  if (isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <LoadingState message="Loading agents" />
      </div>
    );
  }

  const firstAgent = data?.[0];
  if (!firstAgent) {
    return (
      <div className="rounded-lg border border-border bg-overlay p-6 text-center text-text-secondary">
        No agents found. Connect data sources to provision specialized agents.
      </div>
    );
  }

  return <Navigate to={`/agents/${firstAgent.id}`} replace />;
}
