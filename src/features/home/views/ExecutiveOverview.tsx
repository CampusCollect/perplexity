import { useMemo, useState } from 'react';
import clsx from 'classnames';

import { KPIHero } from '@/components/ui/KPIHero';
import { RiskAlertCard, RiskSeverity } from '@/components/ui/RiskAlertCard';
import { ConnectorCard, ConnectorCardProps } from '@/components/ui/ConnectorCard';
import { AgentCard } from '@/components/ui/AgentCard';
import { BudgetBar } from '@/components/ui/BudgetBar';
import type { KpiDatum } from '@/lib/mock/dashboard';
import type { RiskAlert } from '@/lib/mock/alerts';
import type { AgentSummary } from '@/lib/mock/agents';
import type { BudgetSummary } from '@/lib/mock/budgets';

type AlertFilter = 'all' | RiskSeverity;

interface ExecutiveOverviewProps {
  kpis: KpiDatum[];
  alerts: RiskAlert[];
  connectors: Array<Omit<ConnectorCardProps, 'onClick'> & { id: string }>;
  agents: AgentSummary[];
  budget: BudgetSummary;
  onNavigate: (path: string) => void;
}

const severityOptions: { id: AlertFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'warning', label: 'Warnings' },
  { id: 'error', label: 'Errors' },
  { id: 'info', label: 'Info' },
];

export const ExecutiveOverview = ({
  kpis,
  alerts,
  connectors,
  agents,
  budget,
  onNavigate,
}: ExecutiveOverviewProps) => {
  const [alertFilter, setAlertFilter] = useState<AlertFilter>('all');

  const filteredAlerts = useMemo(() => {
    if (alertFilter === 'all') {
      return alerts;
    }

    return alerts.filter((alert) => alert.severity === alertFilter);
  }, [alertFilter, alerts]);

  const topAgents = useMemo(
    () => [...agents].sort((a, b) => b.activityScore - a.activityScore).slice(0, 6),
    [agents]
  );

  return (
    <div className="space-y-10">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KPIHero key={kpi.label} {...kpi} />
        ))}
      </section>

      <section>
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="font-display text-xl font-semibold text-white">Risk &amp; Opportunities</h2>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-xs font-semibold">
              {severityOptions.map((option) => {
                const isActive = alertFilter === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setAlertFilter(option.id)}
                    className={clsx(
                      'rounded-full px-3 py-1 transition',
                      isActive ? 'bg-accent text-black shadow-sm' : 'text-textSecondary hover:text-white'
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => onNavigate('/governance')}
              className="self-start text-sm font-medium text-accent hover:underline md:self-center"
            >
              View governance
            </button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {filteredAlerts.slice(0, 4).map((alert) => (
            <RiskAlertCard
              key={alert.id}
              severity={alert.severity}
              title={alert.title}
              description={alert.description}
              cta={
                alert.cta
                  ? {
                      label: alert.cta.label,
                      action: () => onNavigate(alert.cta!.href),
                    }
                  : undefined
              }
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-white">Data Sources Health</h2>
          <button onClick={() => onNavigate('/connectors')} className="text-sm font-medium text-accent hover:underline">
            View all connectors
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {connectors.map((connector) => (
            <ConnectorCard
              key={connector.id}
              name={connector.name}
              icon={connector.icon}
              authState={connector.authState}
              health={connector.health}
              lastSync={connector.lastSync}
              onClick={() => onNavigate('/connectors')}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-white">Agent Portfolio</h2>
          <button onClick={() => onNavigate('/agents')} className="text-sm font-medium text-accent hover:underline">
            View all agents
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {topAgents.map((agent) => (
            <AgentCard
              key={agent.id}
              id={agent.id}
              name={agent.name}
              status={agent.status}
              budget={agent.budget}
              lastRun={agent.lastRun ? new Date(agent.lastRun) : undefined}
              onClick={() => onNavigate(`/agents/${agent.id}`)}
            />
          ))}
        </div>
      </section>

      <BudgetBar cap={budget.cap} used={budget.used} breakdown={budget.breakdown} />
    </div>
  );
};

