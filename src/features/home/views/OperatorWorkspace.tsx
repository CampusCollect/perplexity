import { ComponentType } from 'react';

import { ExecutiveOverview } from './ExecutiveOverview';
import { RunTimeline, RunTimelineStep } from '@/components/ui/RunTimeline';
import { dayjs } from '@/lib/date';
import type { ExceptionItem, KpiDatum } from '@/lib/mock/dashboard';
import type { RiskAlert } from '@/lib/mock/alerts';
import type { AgentSummary } from '@/lib/mock/agents';
import type { BudgetSummary } from '@/lib/mock/budgets';
import type { ConnectorCardProps } from '@/components/ui/ConnectorCard';

interface OperatorWorkspaceProps {
  kpis: KpiDatum[];
  alerts: RiskAlert[];
  connectors: Array<Omit<ConnectorCardProps, 'onClick'> & { id: string }>;
  agents: AgentSummary[];
  budget: BudgetSummary;
  exceptions: ExceptionItem[];
  steps: RunTimelineStep[];
  quickActions: { label: string; icon: ComponentType<{ className?: string }> }[];
  onNavigate: (path: string) => void;
}

export const OperatorWorkspace = ({
  kpis,
  alerts,
  connectors,
  agents,
  budget,
  exceptions,
  steps,
  quickActions,
  onNavigate,
}: OperatorWorkspaceProps) => {
  return (
    <div className="space-y-10">
      <ExecutiveOverview
        kpis={kpis}
        alerts={alerts}
        connectors={connectors}
        agents={agents}
        budget={budget}
        onNavigate={onNavigate}
      />

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-surface/80 p-6 shadow-lg lg:col-span-1">
          <h3 className="font-display text-lg font-semibold text-white">Exceptions</h3>
          <ul className="mt-4 space-y-3 text-sm text-textSecondary">
            {exceptions.map((exception) => (
              <li key={exception.id} className="rounded-xl bg-white/5 p-3">
                <p className="font-medium text-white">{exception.title}</p>
                <p className="text-xs text-textSecondary">
                  {dayjs(exception.timestamp).fromNow()} • {exception.type.replace('_', ' ')}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/5 bg-surface/80 p-6 shadow-lg lg:col-span-2">
          <h3 className="font-display text-lg font-semibold text-white">Recent Activity</h3>
          <RunTimeline steps={steps} />
        </div>
      </section>

      <section className="rounded-2xl border border-white/5 bg-surface/80 p-6 shadow-lg">
        <h3 className="font-display text-lg font-semibold text-white">Quick Actions</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white transition hover:border-accent/60 hover:bg-white/10"
            >
              <Icon className="h-5 w-5 text-accent" />
              {label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

