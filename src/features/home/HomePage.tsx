import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { agents } from '@/lib/mock/agents';
import { budgets } from '@/lib/mock/budgets';
import { connectors } from '@/lib/mock/connectors';
import { runs } from '@/lib/mock/runs';

export function HomePage() {
  const budgetProgress = useMemo(
    () =>
      budgets.map((budget) => ({
        ...budget,
        percentage: Math.round(budget.utilized * 100),
      })),
    [],
  );

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Command Deck</CardTitle>
            <CardDescription>Operational telemetry across agents, connectors, and automated flows.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-overlay p-4">
              <p className="text-sm text-text-secondary">Active agents</p>
              <p className="mt-2 text-2xl font-semibold text-text-primary">{agents.length}</p>
            </div>
            <div className="rounded-lg border border-border bg-overlay p-4">
              <p className="text-sm text-text-secondary">Connected systems</p>
              <p className="mt-2 text-2xl font-semibold text-text-primary">{connectors.length}</p>
            </div>
            <div className="rounded-lg border border-border bg-overlay p-4">
              <p className="text-sm text-text-secondary">Active runs</p>
              <p className="mt-2 text-2xl font-semibold text-text-primary">{runs.filter((run) => run.status === 'running').length}</p>
            </div>
            <div className="rounded-lg border border-border bg-overlay p-4">
              <p className="text-sm text-text-secondary">Avg. automation duration</p>
              <p className="mt-2 text-2xl font-semibold text-text-primary">18m</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Runs</CardTitle>
            <CardDescription>Monitor the latest orchestration activity across flows.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Run</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {runs.map((run) => (
                  <TableRow key={run.id}>
                    <TableCell className="text-text-primary">{run.name}</TableCell>
                    <TableCell className="capitalize">{run.status}</TableCell>
                    <TableCell>{run.owner}</TableCell>
                    <TableCell>{run.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Budget Utilization</CardTitle>
            <CardDescription>Track strategic investment envelopes powering your agents and flows.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {budgetProgress.map((budget) => (
              <div key={budget.id} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-primary">{budget.name}</span>
                  <span className="text-text-secondary">{budget.percentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-overlay">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${budget.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Connector Health</CardTitle>
            <CardDescription>Ensure mission-critical systems stay synchronized.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {connectors.map((connector) => (
              <div key={connector.id} className="flex items-center justify-between rounded-md border border-border bg-overlay px-3 py-2 text-sm">
                <div>
                  <p className="font-medium text-text-primary">{connector.name}</p>
                  <p className="text-xs text-text-secondary">{connector.lastSync}</p>
                </div>
                <span
                  className="flex h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor:
                      connector.status === 'online'
                        ? '#30D158'
                        : connector.status === 'maintenance'
                          ? '#FFD60A'
                          : '#FF453A',
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
