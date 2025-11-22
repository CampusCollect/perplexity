import { riskAlerts } from './alerts';
import { agents } from './agents';
import { connectors } from './connectors';

export interface KpiDatum {
  label: string;
  value: string | number;
  delta?: string;
  trend?: 'up' | 'down';
  tooltip?: string;
}

export interface ExceptionItem {
  id: string;
  type: 'failed_run' | 'approval' | 'compliance';
  title: string;
  timestamp: string;
  status: 'open' | 'acknowledged' | 'resolved';
  owner: string;
  escalation: 'team' | 'executive' | 'board';
}

export interface ActivityItem {
  id: string;
  agentId: string;
  description: string;
  timestamp: string;
  status: 'success' | 'error' | 'pending';
  cost: number;
  tokens: number;
}

export type ActionPriority = 'p0' | 'p1' | 'p2';

export interface ActionRecommendation {
  id: string;
  priority: ActionPriority;
  action: string;
  reason: string;
  expectedImpact: string;
  risk: string;
  confidence: number;
  sources: string[];
  owner: string;
  status: 'ready' | 'awaiting' | 'scheduled';
}

export interface ScenarioProjection {
  id: string;
  name: string;
  description: string;
  adjustments: string[];
  impact: {
    revenue: string;
    margin: string;
    runway: string;
    risk: string;
  };
  confidence: number;
  horizon: string;
}

export interface TripwireSetting {
  id: string;
  label: string;
  threshold: string;
  channel: 'sms' | 'email' | 'slack';
  status: 'armed' | 'snoozed';
  description?: string;
}

export interface AnalystMetric {
  name: string;
  value: string;
  change?: string;
}

export interface AccountabilityEntry {
  id: string;
  title: string;
  owner: string;
  status: 'waiting' | 'in_progress' | 'complete';
  lastAction: string;
  eta: string;
}

export interface CreativeScheduleItem {
  id: string;
  channel: string;
  owner: string;
  scheduledFor: string;
  status: 'scheduled' | 'in_review' | 'shipped';
}

export interface DashboardData {
  kpis: KpiDatum[];
  alerts: typeof riskAlerts;
  connectors: typeof connectors;
  agents: typeof agents;
  exceptions: ExceptionItem[];
  activity: ActivityItem[];
  analystMetrics: AnalystMetric[];
  creativeSchedule: CreativeScheduleItem[];
  actions: ActionRecommendation[];
  scenarios: ScenarioProjection[];
  tripwires: TripwireSetting[];
  accountability: AccountabilityEntry[];
}

export const dashboardData: DashboardData = {
  kpis: [
    { label: 'Agents Active', value: '18', delta: '+12%', trend: 'up', tooltip: 'Agents that executed at least once in last 24h' },
    { label: 'Monthly Spend', value: '$42.8K', delta: '+4%', trend: 'up', tooltip: 'Against $60K cap' },
    { label: 'Success Rate (7d)', value: '92.6%', delta: '+2.4%', trend: 'up', tooltip: 'Successful runs vs total runs' },
    { label: 'Time Saved', value: '418h', delta: '+38h', trend: 'up', tooltip: 'Automation hours saved vs baseline' },
  ],
  alerts: riskAlerts,
  connectors,
  agents,
  exceptions: [
    {
      id: 'exc-1',
      type: 'failed_run',
      title: 'Collections Accelerator failed on invoice sync',
      timestamp: '2025-05-11T06:42:00Z',
      status: 'open',
      owner: 'Ops Control',
      escalation: 'team',
    },
    {
      id: 'exc-2',
      type: 'approval',
      title: 'Workflow approval pending: Lead scoring recalibration',
      timestamp: '2025-05-10T23:55:00Z',
      status: 'open',
      owner: 'Growth PMO',
      escalation: 'executive',
    },
    {
      id: 'exc-3',
      type: 'compliance',
      title: 'SOC2 evidence upload overdue',
      timestamp: '2025-05-09T19:12:00Z',
      status: 'acknowledged',
      owner: 'Risk Office',
      escalation: 'executive',
    },
  ],
  activity: [
    {
      id: 'act-1',
      agentId: 'revops-orchestrator',
      description: 'Generated ARR forecast scenario (Q3 optimistic)',
      timestamp: '2025-05-11T09:05:00Z',
      status: 'success',
      cost: 12.8,
      tokens: 14890,
    },
    {
      id: 'act-2',
      agentId: 'finance-guardian',
      description: 'Flagged anomaly in deferred revenue roll-forward',
      timestamp: '2025-05-11T08:51:00Z',
      status: 'success',
      cost: 6.3,
      tokens: 6843,
    },
    {
      id: 'act-3',
      agentId: 'marketing-maestro',
      description: 'Campaign channel allocation simulation run',
      timestamp: '2025-05-11T07:32:00Z',
      status: 'error',
      cost: 3.7,
      tokens: 5121,
    },
    {
      id: 'act-4',
      agentId: 'collections-accelerator',
      description: 'Collections follow-up drafting for top 20 accounts',
      timestamp: '2025-05-11T07:15:00Z',
      status: 'success',
      cost: 5.4,
      tokens: 6890,
    },
    {
      id: 'act-5',
      agentId: 'support-savant',
      description: 'Summarized Zendesk backlog for CX leadership',
      timestamp: '2025-05-11T06:58:00Z',
      status: 'success',
      cost: 2.1,
      tokens: 2288,
    },
    {
      id: 'act-6',
      agentId: 'insights-architect',
      description: 'Refreshed executive KPI packet (daily version)',
      timestamp: '2025-05-11T06:37:00Z',
      status: 'success',
      cost: 4.8,
      tokens: 5622,
    },
  ],
  analystMetrics: [
    { name: 'Total Runs (7d)', value: '1,248', change: '+6.4%' },
    { name: 'Median Latency', value: '14.2s', change: '-1.8s' },
    { name: 'Avg. Cost / Run', value: '$3.44', change: '-$0.12' },
    { name: 'Token Utilization', value: '72%', change: '+4%' },
    { name: 'Data Freshness SLA', value: '97%', change: '+1.1%' },
  ],
  creativeSchedule: [
    {
      id: 'creative-1',
      channel: 'LinkedIn',
      owner: 'M. Patel',
      scheduledFor: '2025-05-12T15:00:00Z',
      status: 'scheduled',
    },
    {
      id: 'creative-2',
      channel: 'Email Nurture',
      owner: 'A. Gomez',
      scheduledFor: '2025-05-12T18:00:00Z',
      status: 'in_review',
    },
    {
      id: 'creative-3',
      channel: 'YouTube',
      owner: 'J. Chen',
      scheduledFor: '2025-05-14T20:00:00Z',
      status: 'scheduled',
    },
    {
      id: 'creative-4',
      channel: 'Podcast',
      owner: 'L. Edwards',
      scheduledFor: '2025-05-15T17:00:00Z',
      status: 'shipped',
    },
  ],
  actions: [
    {
      id: 'act-feed-1',
      priority: 'p0',
      action: 'Authorize 8% increase in cloud failover budget for LATAM',
      reason: 'Anomaly engine detected 3 consecutive latency breaches tied to São Paulo region.',
      expectedImpact: '+0.8% uptime protection',
      risk: 'Runway impact <$120k annualized',
      confidence: 0.82,
      sources: ['PagerDuty', 'GCP Billing'],
      owner: 'COO',
      status: 'ready',
    },
    {
      id: 'act-feed-2',
      priority: 'p1',
      action: 'Delegate renewal outreach to Retention Agent',
      reason: '20 top accounts renewing in <30 days with churn probability >18%.',
      expectedImpact: 'Protect $6.4M ARR',
      risk: 'Medium risk of deferral',
      confidence: 0.74,
      sources: ['Salesforce', 'NetSuite'],
      owner: 'Chief Revenue Officer',
      status: 'awaiting',
    },
    {
      id: 'act-feed-3',
      priority: 'p2',
      action: 'Approve AI-generated comms for product recall briefing',
      reason: 'Compliance needs response locked by 5pm UTC to avoid regulator escalation.',
      expectedImpact: 'Avoid $2M penalty exposure',
      risk: 'Reputation risk if delayed',
      confidence: 0.69,
      sources: ['Notion', 'RegWatch'],
      owner: 'Chief Legal Officer',
      status: 'scheduled',
    },
  ],
  scenarios: [
    {
      id: 'scenario-1',
      name: 'Fortify Runway',
      description: 'Shift spend away from experimental GTM to prioritize cash.',
      adjustments: ['Reduce CAC programs by 12%', 'Pause non-critical hires', 'Renegotiate cloud reserved instances'],
      impact: {
        revenue: '-2.1% short-term',
        margin: '+3.4 pts',
        runway: '+4.5 months',
        risk: 'Supply chain risk unchanged',
      },
      confidence: 0.77,
      horizon: '90 days',
    },
    {
      id: 'scenario-2',
      name: 'Accelerate Growth',
      description: 'Go on offense around the enterprise segment while capital is cheap.',
      adjustments: ['Increase enterprise AE capacity by 15%', 'Fund 3 outbound pods', 'Expand EMEA datacenter footprint'],
      impact: {
        revenue: '+8.6% YoY',
        margin: '-1.8 pts',
        runway: '-2.2 months',
        risk: 'Operational load +1 severity',
      },
      confidence: 0.64,
      horizon: '120 days',
    },
    {
      id: 'scenario-3',
      name: 'Operational Resilience',
      description: 'Balance mission-critical redundancies without sacrificing innovation.',
      adjustments: ['Dual-source LLM provider', 'Automate compliance evidence', 'Expand incident response rotations'],
      impact: {
        revenue: '+1.7%',
        margin: '-0.4 pts',
        runway: '-0.8 months',
        risk: 'Security posture +2 pts',
      },
      confidence: 0.7,
      horizon: '60 days',
    },
  ],
  tripwires: [
    {
      id: 'trip-1',
      label: 'Net revenue retention < 118%',
      threshold: 'Alert at 118%',
      channel: 'sms',
      status: 'armed',
      description: 'Escalate to CEO and CRO immediately with churn cohort detail.',
    },
    {
      id: 'trip-2',
      label: 'Cash runway < 14 months',
      threshold: 'Alert at 14 mo',
      channel: 'email',
      status: 'armed',
      description: 'Trigger finance guardian to prep burn compression actions.',
    },
    {
      id: 'trip-3',
      label: 'Security incidents > 2 critical / week',
      threshold: 'Alert at 2 per week',
      channel: 'slack',
      status: 'snoozed',
      description: 'Currently under review with CIO until new SOC update ships.',
    },
  ],
  accountability: [
    {
      id: 'acct-1',
      title: 'Approve SOC2 remediation budget',
      owner: 'CFO',
      status: 'waiting',
      lastAction: 'Waiting on CFO signature',
      eta: 'Due in 4h',
    },
    {
      id: 'acct-2',
      title: 'Collections agent follow-up on Tier 1 accounts',
      owner: 'Revenue Ops',
      status: 'in_progress',
      lastAction: 'Ops acknowledged 32m ago',
      eta: 'ETA 6h',
    },
    {
      id: 'acct-3',
      title: 'Escalate vendor contract for AI infra',
      owner: 'Legal',
      status: 'complete',
      lastAction: 'Signed + archived 2h ago',
      eta: 'Completed',
    },
  ],
};
