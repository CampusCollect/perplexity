export type ConnectorAuthState = 'connected' | 'not_connected' | 'error';

export interface ConnectorSummary {
  id: string;
  name: string;
  icon: string;
  authState: ConnectorAuthState;
  lastSync?: string;
  health?: number;
}

export const connectors: ConnectorSummary[] = [
  {
    id: 'salesforce',
    name: 'Salesforce',
    icon: 'SiSalesforce',
    authState: 'connected',
    lastSync: '2025-05-11T08:45:00Z',
    health: 88,
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    icon: 'SiHubspot',
    authState: 'connected',
    lastSync: '2025-05-11T08:52:00Z',
    health: 92,
  },
  {
    id: 'stripe',
    name: 'Stripe',
    icon: 'SiStripe',
    authState: 'error',
    lastSync: '2025-05-11T06:12:00Z',
    health: 72,
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    icon: 'SiGoogledrive',
    authState: 'connected',
    lastSync: '2025-05-11T03:54:00Z',
    health: 95,
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: 'SiSlack',
    authState: 'connected',
    lastSync: '2025-05-11T09:03:00Z',
    health: 84,
  },
  {
    id: 'notion',
    name: 'Notion',
    icon: 'SiNotion',
    authState: 'connected',
    lastSync: '2025-05-11T07:35:00Z',
    health: 78,
  },
  {
    id: 'zendesk',
    name: 'Zendesk',
    icon: 'SiZendesk',
    authState: 'not_connected',
    lastSync: '2025-05-05T11:25:00Z',
    health: 40,
  },
  {
    id: 'workday',
    name: 'Workday',
    icon: 'SiWorkplace',
    authState: 'connected',
    lastSync: '2025-05-10T22:18:00Z',
    health: 68,
  },
];
