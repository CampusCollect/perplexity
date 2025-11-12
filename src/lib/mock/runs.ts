export interface RunInsight {
  id: string;
  flowId: string;
  name: string;
  status: 'running' | 'completed' | 'failed';
  startedAt: string;
  duration: string;
  owner: string;
}

export const runs: RunInsight[] = [
  {
    id: 'run-4821',
    flowId: 'flow-orbit',
    name: 'Market Pulse Consolidation',
    status: 'running',
    startedAt: '2025-01-12T09:45:00Z',
    duration: '12m',
    owner: 'Nova',
  },
  {
    id: 'run-4720',
    flowId: 'flow-signal',
    name: 'Sales Forecast Harmonization',
    status: 'completed',
    startedAt: '2025-01-11T14:20:00Z',
    duration: '27m',
    owner: 'Orion',
  },
  {
    id: 'run-4708',
    flowId: 'flow-creative',
    name: 'Campaign Concept Sprint',
    status: 'failed',
    startedAt: '2025-01-10T16:55:00Z',
    duration: '8m',
    owner: 'Lyra',
  },
];
