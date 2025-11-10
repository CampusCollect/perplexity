export type AlertSeverity = 'info' | 'warning' | 'error';

export interface RiskAlert {
  id: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  cta?: {
    label: string;
    href: string;
  };
}

export const riskAlerts: RiskAlert[] = [
  {
    id: 'alert-1',
    severity: 'warning',
    title: 'Salesforce sync lagging',
    description: 'Last sync exceeded 4 hours; review connector throughput before next automation run.',
    cta: { label: 'View connector', href: '/connectors/salesforce' },
  },
  {
    id: 'alert-2',
    severity: 'error',
    title: 'Stripe payout discrepancies',
    description: 'Reconciliation agent flagged $32k difference in payout schedule. Investigate immediately.',
    cta: { label: 'Open issue', href: '/governance/risk/stripe' },
  },
  {
    id: 'alert-3',
    severity: 'info',
    title: 'New HubSpot schema fields available',
    description: 'Marketing automation can now use lifecycle_stage_v2 and partner_score fields.',
  },
  {
    id: 'alert-4',
    severity: 'warning',
    title: 'Vendor contract nearing spend cap',
    description: 'OpenAI GPT-4o mini usage has reached 84% of contract threshold for May.',
    cta: { label: 'Adjust budget', href: '/governance/budgets' },
  },
  {
    id: 'alert-5',
    severity: 'error',
    title: 'Automation approvals backlog',
    description: '12 approval requests pending over 48 hours. Operators should review the queue.',
    cta: { label: 'Review approvals', href: '/flows/approvals' },
  },
];
