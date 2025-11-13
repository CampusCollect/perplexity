import { ErrorState } from '@/components/status/ErrorState';
import { LoadingState } from '@/components/status/LoadingState';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAgents, useBudgets } from '@/lib/api';

export function GovernancePage() {
  const { data: agents, isLoading: agentsLoading, isError: agentError, refetch: refetchAgents } = useAgents();
  const { data: budgets, isLoading: budgetsLoading, isError: budgetError, refetch: refetchBudgets } = useBudgets();

  const isLoading = agentsLoading || budgetsLoading;
  const hasError = agentError || budgetError;

  if (isLoading) {
    return (
      <div className="flex min-h-[240px] items-center justify-center">
        <LoadingState message="Loading governance data" />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex min-h-[240px] items-center justify-center">
        <ErrorState
          title="Governance view unavailable"
          description="Telemetry for policy owners and budgets could not be retrieved. Retry after verifying integrations."
          onRetry={() => {
            void Promise.all([refetchAgents(), refetchBudgets()]);
          }}
        />
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Governance Council</CardTitle>
          <CardDescription>Policy owners and operating model accountability.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
          <TableBody>
              {agents?.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell className="text-text-primary">{agent.name}</TableCell>
                  <TableCell>{agent.owner}</TableCell>
                  <TableCell className="capitalize">{agent.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Budget Oversight</CardTitle>
          <CardDescription>Allocation vs. utilization across strategic envelopes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-text-secondary">
          {budgets?.map((budget) => (
            <div key={budget.id} className="rounded-md border border-border bg-overlay px-4 py-3">
              <div className="flex items-center justify-between text-text-primary">
                <span>{budget.name}</span>
                <span>${budget.allocation.toLocaleString()}</span>
              </div>
              <p className="text-xs text-text-secondary">Utilization {Math.round(budget.utilized * 100)}%</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
