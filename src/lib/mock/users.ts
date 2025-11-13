import type { SessionUser } from '@/lib/types';

export const mockUsers: SessionUser[] = [
  {
    id: 'user-1',
    email: 'ceo@example.com',
    name: 'Jordan Blake',
    role: 'admin',
  },
  {
    id: 'user-2',
    email: 'cfo@example.com',
    name: 'Morgan Patel',
    role: 'cfo',
  },
  {
    id: 'user-3',
    email: 'analyst@example.com',
    name: 'Riley Chen',
    role: 'analyst',
  },
];
