export type AgentStatus = 'online' | 'degraded' | 'maintenance' | 'active' | 'paused' | 'draft';

export interface AgentSummary {
  id: string;
  name: string;
  role: string;
  description: string;
  status: AgentStatus;
  owner: string;
  capabilities: string[];
}

export type ConnectorStatus = 'online' | 'maintenance' | 'error' | 'offline';

export interface Connector {
  id: string;
  name: string;
  type: 'data' | 'communication' | 'automation';
  status: ConnectorStatus;
  owner: string;
  lastSync: string;
}

export interface RunSummary {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'failed';
  owner: string;
  duration: string;
  flowId: string;
  startedAt: string;
}

export interface BudgetEnvelope {
  id: string;
  name: string;
  utilized: number;
  allocation: number;
  owner: string;
}

export interface TemplateSummary {
  id: string;
  name: string;
  category: string;
  summary: string;
  lastUpdated: string;
}

export type UserRole = 'admin' | 'cfo' | 'analyst' | 'viewer';

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface SessionState {
  user: SessionUser;
  token: string;
  expiresAt: string;
}
