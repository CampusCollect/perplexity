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
  status: 'open' | 'acknowledged';
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

export interface AnalystMetric {
  name: string;
  value: string;
  change?: string;
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
    },
    {
      id: 'exc-2',
      type: 'approval',
      title: 'Workflow approval pending: Lead scoring recalibration',
      timestamp: '2025-05-10T23:55:00Z',
      status: 'open',
    },
    {
      id: 'exc-3',
      type: 'compliance',
      title: 'SOC2 evidence upload overdue',
      timestamp: '2025-05-09T19:12:00Z',
      status: 'acknowledged',
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
};
