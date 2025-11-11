import { ReactNode, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import {
  Bolt,
  CalendarDays,
  ClipboardList,
  ExternalLink,
  FileBarChart,
  Flame,
  PlayCircle,
  ShieldAlert,
  Sparkles,
  Zap,
} from 'lucide-react';
import clsx from 'classnames';

import { KPIHero } from '@/components/ui/KPIHero';
import { RiskAlertCard } from '@/components/ui/RiskAlertCard';
import { ConnectorCard } from '@/components/ui/ConnectorCard';
import { AgentCard } from '@/components/ui/AgentCard';
import { BudgetBar } from '@/components/ui/BudgetBar';
import { Mode, useModeStore } from '@/stores/modeStore';
import { dashboardData } from '@/lib/mock/dashboard';
import { budgetSummary } from '@/lib/mock/budgets';
import { dayjs } from '@/lib/date';
import { connectors as connectorMocks } from '@/lib/mock/connectors';
import { agents as agentMocks } from '@/lib/mock/agents';
import { riskAlerts } from '@/lib/mock/alerts';
import { RunTimeline } from '@/components/ui/RunTimeline';
import { TemplateCard } from '@/components/ui/TemplateCard';

const connectorIconMap: Record<string, ReactNode> = {
  salesforce: <FileBarChart className="h-5 w-5" />,
  hubspot: <Flame className="h-5 w-5" />,
  stripe: <Zap className="h-5 w-5" />,
  'google-drive': <ClipboardList className="h-5 w-5" />,
  slack: <Bolt className="h-5 w-5" />,
  notion: <Sparkles className="h-5 w-5" />,
  zendesk: <ShieldAlert className="h-5 w-5" />,
  workday: <PlayCircle className="h-5 w-5" />,
};

const spendData = budgetSummary.breakdown.map((segment) => ({
  name: segment.model,
  spend: segment.amount,
}));

const quickActions = [
  { label: 'Launch Command', icon: Zap },
  { label: 'Pause Agent', icon: ShieldAlert },
  { label: 'Run Diagnostic', icon: Bolt },
  { label: 'Schedule Maintenance', icon: CalendarDays },
];

type AlertFilter = 'all' | 'info' | 'warning' | 'error';

export const CommandDeck = () => {
  const { mode } = useModeStore();
  const navigate = useNavigate();

  const topAgents = useMemo(
    () => [...agentMocks].sort((a, b) => b.activityScore - a.activityScore).slice(0, 6),
    []
  );

  const connectorCards = useMemo(
    () =>
      connectorMocks.map((connector) => ({
        ...connector,
        icon: connectorIconMap[connector.id] ?? <ExternalLink className="h-5 w-5" />,
      })),
    []
  );

  const [alertFilter, setAlertFilter] = useState<AlertFilter>('all');

  const filteredAlerts = useMemo(() => {
    if (alertFilter === 'all') {
      return riskAlerts;
    }

    return riskAlerts.filter((alert) => alert.severity === alertFilter);
  }, [alertFilter]);

  const severityOptions: { id: AlertFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'warning', label: 'Warnings' },
    { id: 'error', label: 'Errors' },
    { id: 'info', label: 'Info' },
  ];

  const timelineSteps = useMemo(
    () =>
      dashboardData.activity.slice(0, 6).map((activity) => {
        const status: 'success' | 'error' = activity.status === 'error' ? 'error' : 'success';
        return {
          timestamp: new Date(activity.timestamp),
          type: activity.description,
          cost: activity.cost,
          tokens: activity.tokens,
          latency: Math.random() * 20 + 5,
          status,
          output: {
            agent: activity.agentId,
            summary: activity.description,
            timestamp: activity.timestamp,
          },
        };
      }),
    []
  );

  const channelPerformance = useMemo(
    () =>
      ['LinkedIn', 'YouTube', 'Email', 'Podcast'].map((channel) => ({
        channel,
        lift: (Math.random() * 8 + 2).toFixed(1),
      })),
    []
  );

  const renderExecutive = () => (
    <div className="space-y-10">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardData.kpis.map((kpi) => (
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
              onClick={() => navigate('/governance')}
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
                      action: () => navigate(alert.cta!.href),
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
          <button onClick={() => navigate('/connectors')} className="text-sm font-medium text-accent hover:underline">
            View all connectors
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {connectorCards.map((connector) => (
            <ConnectorCard
              key={connector.id}
              name={connector.name}
              icon={connector.icon}
              authState={connector.authState}
              health={connector.health}
              lastSync={connector.lastSync ? new Date(connector.lastSync) : undefined}
              onClick={() => navigate('/connectors')}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-white">Agent Portfolio</h2>
          <button onClick={() => navigate('/agents')} className="text-sm font-medium text-accent hover:underline">
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
            />
          ))}
        </div>
      </section>

      <BudgetBar cap={budgetSummary.cap} used={budgetSummary.used} breakdown={budgetSummary.breakdown} />
    </div>
  );

  const renderOperator = () => (
    <div className="space-y-10">
      {renderExecutive()}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-surface/80 p-6 shadow-lg lg:col-span-1">
          <h3 className="font-display text-lg font-semibold text-white">Exceptions</h3>
          <ul className="mt-4 space-y-3 text-sm text-textSecondary">
            {dashboardData.exceptions.map((exception) => (
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
          <RunTimeline steps={timelineSteps} />
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

  const renderAnalyst = () => (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardData.analystMetrics.map((metric) => (
          <KPIHero
            key={metric.name}
            label={metric.name}
            value={metric.value}
            delta={metric.change}
            trend={metric.change?.includes('-') ? 'down' : 'up'}
            tooltip="Rolling 7 day trend"
          />
        ))}
      </section>
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/5 bg-surface/80 p-6 shadow-lg">
          <h3 className="font-display text-lg font-semibold text-white">Spend by Model</h3>
          <div className="mt-6 h-72">
            <ResponsiveContainer>
              <AreaChart data={spendData}>
                <defs>
                  <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3EB0F1" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3EB0F1" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 12 }} />
                <YAxis stroke="#94A3B8" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                <Tooltip contentStyle={{ background: '#15191D', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }} />
                <Area type="monotone" dataKey="spend" stroke="#3EB0F1" fill="url(#spendGradient)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-surface/80 p-6 shadow-lg">
          <h3 className="font-display text-lg font-semibold text-white">Performance Table</h3>
          <div className="mt-4 overflow-hidden rounded-xl border border-white/5">
            <table className="w-full table-auto text-sm">
              <thead className="bg-white/5 text-left text-xs uppercase text-textSecondary">
                <tr>
                  <th className="px-4 py-3">Agent</th>
                  <th className="px-4 py-3">Runs (7d)</th>
                  <th className="px-4 py-3">Success %</th>
                  <th className="px-4 py-3">Cost</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.activity.slice(0, 6).map((row) => (
                  <tr key={row.id} className="border-t border-white/5 text-textSecondary">
                    <td className="px-4 py-3 text-white">{row.agentId}</td>
                    <td className="px-4 py-3">{Math.round(row.tokens / 1000)}</td>
                    <td className="px-4 py-3">{row.status === 'success' ? '96%' : '68%'}</td>
                    <td className="px-4 py-3">${row.cost.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex gap-3">
            <button className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:border-accent/60">
              Export CSV
            </button>
            <button className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:border-accent/60">
              Share Snapshot
            </button>
          </div>
        </div>
      </section>
      <BudgetBar cap={budgetSummary.cap} used={budgetSummary.used} breakdown={budgetSummary.breakdown} />
    </div>
  );

  const renderCreative = () => (
    <div className="space-y-8">
      <section className="rounded-2xl border border-white/5 bg-surface/80 p-6 shadow-lg">
        <h3 className="font-display text-lg font-semibold text-white">Content Calendar</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {dashboardData.creativeSchedule.map((item) => (
            <div key={item.id} className="rounded-xl border border-white/5 bg-white/5 p-4 text-sm text-textSecondary">
              <p className="font-display text-lg font-semibold text-white">{item.channel}</p>
              <p className="mt-2">Owner: {item.owner}</p>
              <p className="mt-1">{dayjs(item.scheduledFor).format('MMM D • HH:mm')}</p>
              <span className="mt-3 inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                {item.status.replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      </section>
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/5 bg-surface/80 p-6 shadow-lg">
          <h3 className="font-display text-lg font-semibold text-white">Asset Pipeline</h3>
          <ul className="mt-4 space-y-3 text-sm text-textSecondary">
            {['Ideation', 'Drafting', 'Review', 'Scheduled'].map((stage, index) => (
              <li key={stage} className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                <span>{stage}</span>
                <span className="text-white">{15 - index * 3} assets</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/5 bg-surface/80 p-6 shadow-lg">
          <h3 className="font-display text-lg font-semibold text-white">Channel Performance</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {channelPerformance.map((item) => (
              <div key={item.channel} className="rounded-xl border border-white/5 bg-white/5 p-4">
                <p className="font-semibold text-white">{item.channel}</p>
                <p className="mt-2 text-sm text-textSecondary">Engagement lift</p>
                <p className="text-2xl font-semibold text-accent">+{item.lift}%</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="rounded-2xl border border-white/5 bg-surface/80 p-6 shadow-lg">
        <h3 className="font-display text-lg font-semibold text-white">Featured Templates</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <TemplateCard
            name="AI Content Studio"
            description="Automate ideation-to-publish workflows across every digital channel with human-in-the-loop reviews."
            connectors={['Notion', 'Slack', 'Google Drive']}
            timeToValue="Go-live in 5 days"
            metrics={['+38% output velocity', '2.4x engagement lift', 'Shared brand style library']}
            onInstall={() => navigate('/templates/content-studio')}
          />
          <TemplateCard
            name="Campaign Creative Assistant"
            description="Generate multi-variant assets aligned to pipeline targets with dynamic channel insights."
            connectors={['HubSpot', 'Figma', 'Salesforce']}
            timeToValue="Launch in 7 days"
            metrics={['Reduce QA cycles by 42%', 'Dynamic tone guardrails', 'Automated approvals']}
            onInstall={() => navigate('/templates/campaign-assistant')}
          />
        </div>
      </section>
    </div>
  );

  const modeRenderers: Record<Mode, () => ReactNode> = {
    executive: renderExecutive,
    operator: renderOperator,
    analyst: renderAnalyst,
    creative: renderCreative,
  };

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-semibold text-white">Command Deck</h1>
        <p className="text-sm text-textSecondary">
          Adaptive workspace tuned for the {mode} team. Switch modes from the top bar to personalize insights.
        </p>
      </header>
      {modeRenderers[mode]()}
    </div>
  );
};
