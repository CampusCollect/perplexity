import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Clock4,
  ExternalLink,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RiskAlertCard } from '@/components/ui/RiskAlertCard';
import { LoadingState } from '@/components/status/LoadingState';
import { ErrorState } from '@/components/status/ErrorState';
import { useDashboard } from '@/lib/api';
import { useSession } from '@/lib/auth';
import type { ActionRecommendation, ScenarioProjection } from '@/lib/mock/dashboard';
import { cn } from '@/lib/utils';

const priorityStyles: Record<
  ActionRecommendation['priority'],
  { label: string; className: string }
> = {
  p0: { label: 'P0 • Immediate', className: 'bg-red-500/10 text-red-200 border border-red-500/30' },
  p1: { label: 'P1 • Next 24h', className: 'bg-amber-500/10 text-amber-200 border border-amber-400/30' },
  p2: { label: 'P2 • Monitor', className: 'bg-blue-500/10 text-blue-200 border border-blue-400/30' },
};

const statusStyles: Record<string, string> = {
  waiting: 'text-amber-300',
  in_progress: 'text-sky-300',
  complete: 'text-emerald-300',
};

export function HomePage() {
  const { data, isLoading, isError, refetch } = useDashboard();
  const { user } = useSession();
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);

  useEffect(() => {
    if (data && !selectedScenarioId) {
      setSelectedScenarioId(data.scenarios[0]?.id ?? null);
    }
  }, [data, selectedScenarioId]);

  const selectedScenario = useMemo<ScenarioProjection | undefined>(
    () => data?.scenarios.find((scenario) => scenario.id === selectedScenarioId) ?? data?.scenarios[0],
    [data, selectedScenarioId],
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center">
        <LoadingState message="Synchronizing live telemetry for leadership" />
      </div>
    );
  }

  if (!data || isError) {
    return (
      <div className="flex min-h-[320px] items-center justify-center">
        <ErrorState
          title="We could not load the CEO command center"
          description="Check network connectivity or refresh to reload real-time metrics."
          onRetry={() => {
            void refetch();
          }}
        />
      </div>
    );
  }

  const lastSignal = data.activity[0]?.timestamp
    ? new Date(data.activity[0]?.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'moments ago';

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/5 bg-gradient-to-br from-surface/80 via-surface/60 to-background/60 p-8 shadow-2xl shadow-black/50">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-text-secondary">Executive command center</p>
            <h1 className="font-display text-3xl font-semibold text-white">
              {user ? `Good day, ${user.name.split(' ')[0]}` : 'Good day'} — everything critical is surfaced here.
            </h1>
            <p className="max-w-3xl text-base text-text-secondary">
              Radical transparency across cash, risk, talent, and growth. Every signal is explainable, source-linked, and routed to
              action in under 90 seconds.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-text-secondary">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1">
                <Sparkles className="h-4 w-4 text-accent" /> Lossless context enabled
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1">
                <ShieldAlert className="h-4 w-4 text-red-300" /> Tripwires armed
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1">
                <Clock4 className="h-4 w-4 text-emerald-300" /> Last refresh {lastSignal}
              </span>
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 rounded-2xl border border-white/5 bg-overlay/80 p-5 text-sm lg:w-80">
            <p className="text-xs uppercase tracking-wide text-text-secondary">Today&apos;s blockers removed</p>
            {data.accountability.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-primary">{item.title}</p>
                  <p className="text-xs text-text-secondary">{item.owner}</p>
                </div>
                <p className={cn('text-xs font-semibold', statusStyles[item.status])}>{item.eta}</p>
              </div>
            ))}
            <Button size="sm" variant="secondary" className="mt-2">
              Open accountability ledger
            </Button>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {data.kpis.map((kpi) => (
              <div key={kpi.label} className="rounded-2xl border border-white/5 bg-surface/80 p-5">
                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span>{kpi.label}</span>
                  {kpi.delta && (
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 rounded-full px-2 py-0.5',
                        kpi.trend === 'down' ? 'bg-red-500/10 text-red-200' : 'bg-emerald-500/10 text-emerald-200',
                      )}
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      {kpi.delta}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-3xl font-semibold text-white">{kpi.value}</p>
                {kpi.tooltip && <p className="mt-2 text-sm text-text-secondary">{kpi.tooltip}</p>}
              </div>
            ))}
          </section>

          <section className="space-y-4 rounded-3xl border border-white/5 bg-surface/80 p-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-text-secondary">AI action feed</p>
                <h2 className="text-xl font-semibold text-white">Approve, modify, or delegate in one click</h2>
              </div>
              <Button variant="secondary" size="sm">
                View full backlog
              </Button>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {data.actions.map((action) => (
                <article key={action.id} className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-overlay/60 p-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className={cn('rounded-full px-3 py-1 font-semibold', priorityStyles[action.priority].className)}>
                      {priorityStyles[action.priority].label}
                    </span>
                    <span className="text-text-secondary">{action.owner}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{action.action}</h3>
                    <p className="mt-1 text-sm text-text-secondary">{action.reason}</p>
                  </div>
                  <dl className="grid gap-3 text-xs text-text-secondary sm:grid-cols-2">
                    <div>
                      <dt className="text-text-secondary">Expected impact</dt>
                      <dd className="text-sm text-white">{action.expectedImpact}</dd>
                    </div>
                    <div>
                      <dt>Risk</dt>
                      <dd className="text-sm text-white">{action.risk}</dd>
                    </div>
                    <div>
                      <dt>Confidence</dt>
                      <dd className="text-sm text-white">{Math.round(action.confidence * 100)}%</dd>
                    </div>
                    <div>
                      <dt>Sources</dt>
                      <dd className="text-sm text-white">{action.sources.join(', ')}</dd>
                    </div>
                  </dl>
                  <div className="mt-auto flex flex-wrap gap-3">
                    <Button size="sm">Approve</Button>
                    <Button size="sm" variant="outline">
                      Modify
                    </Button>
                    <Button size="sm" variant="ghost">
                      Delegate
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-4 rounded-3xl border border-white/5 bg-surface/80 p-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-text-secondary">Time machine</p>
                <h2 className="text-xl font-semibold text-white">Scenario sandbox</h2>
              </div>
              <div className="flex gap-2">
                {data.scenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    type="button"
                    onClick={() => setSelectedScenarioId(scenario.id)}
                    className={cn(
                      'rounded-full border px-4 py-1 text-xs font-semibold transition',
                      selectedScenario?.id === scenario.id
                        ? 'border-accent bg-accent text-black'
                        : 'border-white/20 text-text-secondary hover:text-white',
                    )}
                  >
                    {scenario.name}
                  </button>
                ))}
              </div>
            </div>
            {selectedScenario && (
              <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                <div className="space-y-4 rounded-2xl border border-white/5 bg-overlay/60 p-5">
                  <p className="text-sm text-text-secondary">{selectedScenario.description}</p>
                  <ul className="space-y-2 text-sm text-white">
                    {selectedScenario.adjustments.map((adjustment) => (
                      <li key={adjustment} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                        {adjustment}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3 rounded-2xl border border-white/5 bg-overlay/60 p-5 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Confidence</span>
                    <span className="font-semibold text-white">{Math.round(selectedScenario.confidence * 100)}%</span>
                  </div>
                  <div className="grid gap-3">
                    {Object.entries(selectedScenario.impact).map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between text-xs uppercase text-text-secondary">
                        <span>{label}</span>
                        <span className="text-base font-semibold text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-text-secondary">Horizon: {selectedScenario.horizon}</p>
                  <Button size="sm" className="w-full">
                    Push scenario to CFO workspace
                  </Button>
                </div>
              </div>
            )}
          </section>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Anomaly & Risk Radar</CardTitle>
              <CardDescription>Escalations before anyone can soften the message.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.alerts.slice(0, 4).map((alert) => (
                <RiskAlertCard
                  key={alert.id}
                  severity={alert.severity}
                  title={alert.title}
                  description={alert.description}
                  cta={
                    alert.cta
                      ? {
                          label: alert.cta.label,
                          action: () => window.open(alert.cta?.href ?? '#', '_self'),
                        }
                      : undefined
                  }
                />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tripwires</CardTitle>
              <CardDescription>Signals that wake the C-suite instantly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.tripwires.map((tripwire) => (
                <div
                  key={tripwire.id}
                  className="rounded-2xl border border-white/5 bg-overlay/60 p-4 text-sm text-text-secondary"
                >
                  <div className="flex items-center justify-between text-text-primary">
                    <p className="font-semibold">{tripwire.label}</p>
                    <span className="text-xs uppercase tracking-wide">{tripwire.channel}</span>
                  </div>
                  <p className="mt-1 text-xs">{tripwire.threshold}</p>
                  {tripwire.description && <p className="mt-1 text-xs">{tripwire.description}</p>}
                  <span
                    className={cn(
                      'mt-3 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold',
                      tripwire.status === 'armed'
                        ? 'bg-emerald-500/10 text-emerald-300'
                        : 'bg-amber-500/10 text-amber-200',
                    )}
                  >
                    {tripwire.status === 'armed' ? <ShieldAlert className="h-3.5 w-3.5" /> : <Clock4 className="h-3.5 w-3.5" />}
                    {tripwire.status === 'armed' ? 'Armed' : 'Snoozed'}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Live Agent Activity</CardTitle>
              <CardDescription>Lossless trace from source to action.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.activity.slice(0, 5).map((activity) => (
                <div key={activity.id} className="rounded-2xl border border-white/5 bg-overlay/60 p-4 text-sm">
                  <div className="flex items-center justify-between text-xs text-text-secondary">
                    <span className="uppercase tracking-wide">{activity.agentId}</span>
                    <span>{new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="mt-2 text-text-primary">{activity.description}</p>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-text-secondary">
                    <span className="inline-flex items-center gap-1">
                      <Activity className="h-3.5 w-3.5 text-accent" /> {activity.tokens.toLocaleString()} tokens
                    </span>
                    <span>${activity.cost.toFixed(2)}</span>
                    <span
                      className={cn(
                        'inline-flex items-center gap-1',
                        activity.status === 'error' ? 'text-red-300' : 'text-emerald-300',
                      )}
                    >
                      <AlertTriangle className="h-3.5 w-3.5" /> {activity.status}
                    </span>
                  </div>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full">
                Open provenance explorer
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connector posture</CardTitle>
              <CardDescription>Source-of-truth health (no PowerPoint smoothing).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.connectors.slice(0, 5).map((connector) => (
                <div key={connector.id} className="flex items-center justify-between rounded-2xl border border-white/5 p-3">
                  <div>
                    <p className="text-sm font-medium text-white">{connector.name}</p>
                    <p className="text-xs text-text-secondary">{connector.lastSync}</p>
                  </div>
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs',
                      connector.status === 'online'
                        ? 'bg-emerald-500/10 text-emerald-300'
                        : connector.status === 'maintenance'
                          ? 'bg-amber-500/10 text-amber-200'
                          : 'bg-red-500/10 text-red-200',
                    )}
                  >
                    {connector.status}
                  </span>
                </div>
              ))}
              <Button variant="secondary" size="sm" className="w-full">
                Manage connectors
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
