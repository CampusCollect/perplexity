export interface BudgetTrack {
  id: string;
  name: string;
  allocation: number;
  utilized: number;
  owner: string;
}

export const budgets: BudgetTrack[] = [
  {
    id: 'budget-strategic',
    name: 'Strategic Initiatives',
    allocation: 500000,
    utilized: 0.62,
    owner: 'Executive Ops',
  },
  {
    id: 'budget-automation',
    name: 'Automation R&D',
    allocation: 300000,
    utilized: 0.48,
    owner: 'Automation Guild',
  },
  {
    id: 'budget-creative',
    name: 'Creative Innovation',
    allocation: 180000,
    utilized: 0.73,
    owner: 'Creative Studio',
  },
];
