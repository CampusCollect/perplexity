export interface AgentSummary {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'error';
  budget: {
    used: number;
    cap: number;
  };
  lastRun?: string;
  activityScore: number;
}

export const agents: AgentSummary[] = [
  {
    id: 'revops-orchestrator',
    name: 'RevOps Orchestrator',
    status: 'active',
    budget: { used: 8200, cap: 12000 },
    lastRun: '2025-05-11T09:24:00Z',
    activityScore: 96,
  },
  {
    id: 'finance-guardian',
    name: 'Finance Guardian',
    status: 'active',
    budget: { used: 6400, cap: 9000 },
    lastRun: '2025-05-11T07:41:00Z',
    activityScore: 92,
  },
  {
    id: 'pipeline-coach',
    name: 'Pipeline Coach',
    status: 'paused',
    budget: { used: 2500, cap: 6000 },
    lastRun: '2025-05-10T21:08:00Z',
    activityScore: 68,
  },
  {
    id: 'collections-accelerator',
    name: 'Collections Accelerator',
    status: 'active',
    budget: { used: 4100, cap: 7000 },
    lastRun: '2025-05-11T05:22:00Z',
    activityScore: 87,
  },
  {
    id: 'partner-success',
    name: 'Partner Success Navigator',
    status: 'active',
    budget: { used: 3100, cap: 5000 },
    lastRun: '2025-05-09T18:44:00Z',
    activityScore: 74,
  },
  {
    id: 'marketing-maestro',
    name: 'Marketing Maestro',
    status: 'error',
    budget: { used: 5600, cap: 8000 },
    lastRun: '2025-05-11T02:17:00Z',
    activityScore: 81,
  },
  {
    id: 'compliance-sentinel',
    name: 'Compliance Sentinel',
    status: 'active',
    budget: { used: 1500, cap: 4500 },
    lastRun: '2025-05-10T23:03:00Z',
    activityScore: 65,
  },
  {
    id: 'people-ops',
    name: 'PeopleOps Co-Pilot',
    status: 'paused',
    budget: { used: 2200, cap: 4800 },
    lastRun: '2025-05-08T16:37:00Z',
    activityScore: 58,
  },
  {
    id: 'support-savant',
    name: 'Support Savant',
    status: 'active',
    budget: { used: 4700, cap: 7500 },
    lastRun: '2025-05-11T09:02:00Z',
    activityScore: 89,
  },
  {
    id: 'insights-architect',
    name: 'Insights Architect',
    status: 'active',
    budget: { used: 3800, cap: 6500 },
    lastRun: '2025-05-11T04:55:00Z',
    activityScore: 83,
  },
];
