import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { agents } from '@/lib/mock/agents';
import { budgets } from '@/lib/mock/budgets';

export function GovernancePage() {
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
              {agents.map((agent) => (
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
          {budgets.map((budget) => (
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
