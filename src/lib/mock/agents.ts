export type AgentStatus = 'active' | 'paused' | 'draft';

export interface AgentProfile {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  description: string;
  capabilities: string[];
  owner: string;
}

export const agents: AgentProfile[] = [
  {
    id: 'agent-orion',
    name: 'Orion',
    role: 'Strategic Orchestrator',
    status: 'active',
    description: 'Aligns cross-functional agents and connectors to executive priorities.',
    capabilities: ['Portfolio Insights', 'Executive Briefings', 'Adaptive Governance'],
    owner: 'Executive Ops',
  },
  {
    id: 'agent-nova',
    name: 'Nova',
    role: 'Automation Architect',
    status: 'active',
    description: 'Designs and optimizes flows for continuous operational excellence.',
    capabilities: ['Flow Authoring', 'Connector Health Monitoring', 'Run Analytics'],
    owner: 'Automation Guild',
  },
  {
    id: 'agent-lyra',
    name: 'Lyra',
    role: 'Creative Producer',
    status: 'paused',
    description: 'Generates brand-aligned assets and campaign concepts with governance guardrails.',
    capabilities: ['Asset Generation', 'Campaign Drafting', 'Feedback Looping'],
    owner: 'Creative Studio',
  },
];

export const AGENT_DEFAULT_ID = agents[0]?.id ?? 'agent-orion';
