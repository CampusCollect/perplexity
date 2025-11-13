import { z } from 'zod';

export const agentSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  description: z.string(),
  status: z.enum(['online', 'degraded', 'maintenance', 'active', 'paused', 'draft']),
  owner: z.string(),
  capabilities: z.array(z.string()),
});

export const connectorSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['data', 'communication', 'automation']),
  status: z.enum(['online', 'maintenance', 'error', 'offline']),
  owner: z.string(),
  lastSync: z.string(),
});

export const runSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(['running', 'completed', 'failed']),
  owner: z.string(),
  duration: z.string(),
  flowId: z.string(),
  startedAt: z.string(),
});

export const budgetSchema = z.object({
  id: z.string(),
  name: z.string(),
  utilized: z.number().min(0).max(1),
  allocation: z.number().nonnegative(),
  owner: z.string(),
});

export const templateSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  summary: z.string(),
  lastUpdated: z.string(),
});

export const sessionSchema = z.object({
  user: z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string(),
    role: z.enum(['admin', 'cfo', 'analyst', 'viewer']),
  }),
  token: z.string(),
  expiresAt: z.string(),
});

export type AgentResponse = z.infer<typeof agentSchema>;
export type ConnectorResponse = z.infer<typeof connectorSchema>;
export type RunResponse = z.infer<typeof runSchema>;
export type BudgetResponse = z.infer<typeof budgetSchema>;
export type TemplateResponse = z.infer<typeof templateSchema>;
export type SessionResponse = z.infer<typeof sessionSchema>;
