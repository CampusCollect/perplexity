export interface ConnectorProfile {
  id: string;
  name: string;
  type: 'data' | 'communication' | 'automation';
  status: 'online' | 'maintenance' | 'offline';
  lastSync: string;
  owner: string;
}

export const connectors: ConnectorProfile[] = [
  {
    id: 'connector-atlas',
    name: 'Atlas Data Lake',
    type: 'data',
    status: 'online',
    lastSync: '5 minutes ago',
    owner: 'Data Platform',
  },
  {
    id: 'connector-pulse',
    name: 'Pulse Comms Grid',
    type: 'communication',
    status: 'maintenance',
    lastSync: '2 hours ago',
    owner: 'IT Operations',
  },
  {
    id: 'connector-forge',
    name: 'Forge Automation Bridge',
    type: 'automation',
    status: 'online',
    lastSync: '30 minutes ago',
    owner: 'Automation Guild',
  },
];
