import { useParams } from 'react-router-dom';
import { ErrorState } from '@/components/status/ErrorState';
import { LoadingState } from '@/components/status/LoadingState';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAgents } from '@/lib/api';

export function AgentDetailPage() {
  const { id } = useParams();
  const { data, isLoading, isError, refetch } = useAgents();

  if (isLoading) {
    return (
      <div className="flex min-h-[240px] items-center justify-center">
        <LoadingState message="Fetching agent record" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[240px] items-center justify-center">
        <ErrorState
          title="Agents are temporarily unavailable"
          description="We couldn't retrieve the agent roster. Please retry once connectivity stabilizes."
          onRetry={() => {
            void refetch();
          }}
        />
      </div>
    );
  }

  const agent = data?.find((item) => item.id === id);

  if (!agent) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Agent not found</CardTitle>
          <CardDescription>The requested agent is not available in the current workspace.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>{agent.name}</CardTitle>
          <CardDescription>{agent.role}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-text-secondary">{agent.description}</p>
          <div>
            <h4 className="text-sm font-semibold text-text-primary">Capabilities</h4>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {agent.capabilities.map((capability) => (
                <li key={capability} className="rounded-md border border-border bg-overlay px-3 py-2 text-sm text-text-secondary">
                  {capability}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ownership</CardTitle>
          <CardDescription>Governance context for this agent.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-text-secondary">
          <div className="flex items-center justify-between">
            <span>Status</span>
            <span className="capitalize text-text-primary">{agent.status}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Owner</span>
            <span className="text-text-primary">{agent.owner}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Runbook</span>
            <span className="text-text-primary">Executive onboarding protocol</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
