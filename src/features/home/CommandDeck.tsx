import { ReactNode, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bolt, CalendarDays, ClipboardList, ExternalLink, FileBarChart, Flame, PlayCircle, ShieldAlert, Sparkles, Zap } from 'lucide-react';

import { Mode, useModeStore } from '@/stores/modeStore';
import { dashboardData } from '@/lib/mock/dashboard';
import { budgetSummary } from '@/lib/mock/budgets';
import { connectors as connectorMocks } from '@/lib/mock/connectors';
import { agents as agentMocks } from '@/lib/mock/agents';
import { riskAlerts } from '@/lib/mock/alerts';
import { RunTimelineStep } from '@/components/ui/RunTimeline';
import { ExecutiveOverview } from './views/ExecutiveOverview';
import { OperatorWorkspace } from './views/OperatorWorkspace';
import { AnalystWorkspace } from './views/AnalystWorkspace';
import { CreativeWorkspace } from './views/CreativeWorkspace';

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

const quickActions = [
  { label: 'Launch Command', icon: Zap },
  { label: 'Pause Agent', icon: ShieldAlert },
  { label: 'Run Diagnostic', icon: Bolt },
  { label: 'Schedule Maintenance', icon: CalendarDays },
];

export const CommandDeck = () => {
  const { mode } = useModeStore();
  const navigate = useNavigate();

  const connectorCards = useMemo(
    () =>
      connectorMocks.map((connector) => ({
        id: connector.id,
        name: connector.name,
        icon: connectorIconMap[connector.id] ?? <ExternalLink className="h-5 w-5" />,
        authState: connector.authState,
        health: connector.health,
        lastSync: connector.lastSync ? new Date(connector.lastSync) : undefined,
      })),
    []
  );

  const timelineSteps: RunTimelineStep[] = useMemo(
    () =>
      dashboardData.activity.slice(0, 6).map((activity) => ({
        timestamp: new Date(activity.timestamp),
        type: activity.description,
        cost: activity.cost,
        tokens: activity.tokens,
        latency: Math.random() * 20 + 5,
        status: activity.status === 'error' ? 'error' : 'success',
        output: {
          agent: activity.agentId,
          summary: activity.description,
          timestamp: activity.timestamp,
        },
      })),
    []
  );

  const channelPerformance = useMemo(
    () =>
      ['LinkedIn', 'YouTube', 'Email', 'Podcast'].map((channel) => ({
        channel,
        lift: Number((Math.random() * 8 + 2).toFixed(1)),
      })),
    []
  );

  const spendData = useMemo(
    () => budgetSummary.breakdown.map((segment) => ({ name: segment.model, spend: segment.amount })),
    []
  );

  const viewByMode: Record<Mode, ReactNode> = {
    executive: (
      <ExecutiveOverview
        kpis={dashboardData.kpis}
        alerts={riskAlerts}
        connectors={connectorCards}
        agents={agentMocks}
        budget={budgetSummary}
        onNavigate={(path) => navigate(path)}
      />
    ),
    operator: (
      <OperatorWorkspace
        kpis={dashboardData.kpis}
        alerts={riskAlerts}
        connectors={connectorCards}
        agents={agentMocks}
        budget={budgetSummary}
        exceptions={dashboardData.exceptions}
        steps={timelineSteps}
        quickActions={quickActions}
        onNavigate={(path) => navigate(path)}
      />
    ),
    analyst: (
      <AnalystWorkspace
        metrics={dashboardData.analystMetrics}
        spendByModel={spendData}
        activity={dashboardData.activity}
        budget={budgetSummary}
      />
    ),
    creative: (
      <CreativeWorkspace
        schedule={dashboardData.creativeSchedule}
        channelPerformance={channelPerformance}
        onNavigate={(path) => navigate(path)}
      />
    ),
  };

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-semibold text-white">Command Deck</h1>
        <p className="text-sm text-textSecondary">
          Adaptive workspace tuned for the {mode} team. Switch modes from the top bar to personalize insights.
        </p>
      </header>
      {viewByMode[mode]}
    </div>
  );
};

