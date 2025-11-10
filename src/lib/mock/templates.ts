export interface TemplateDefinition {
  id: string;
  name: string;
  category: 'automation' | 'governance' | 'creative';
  summary: string;
  lastUpdated: string;
}

export const templates: TemplateDefinition[] = [
  {
    id: 'template-orchestrate',
    name: 'Executive Command Deck',
    category: 'governance',
    summary: 'Centralized executive dashboard aligning metrics, agents, and budgets.',
    lastUpdated: '2025-01-08',
  },
  {
    id: 'template-accelerator',
    name: 'Automation Accelerator',
    category: 'automation',
    summary: 'Pre-built flow patterns for multi-system automation orchestration.',
    lastUpdated: '2025-01-05',
  },
  {
    id: 'template-creative',
    name: 'Campaign Story Forge',
    category: 'creative',
    summary: 'Guided creative prompt structures with governance guardrails.',
    lastUpdated: '2024-12-30',
  },
];
