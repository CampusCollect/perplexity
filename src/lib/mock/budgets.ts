export interface BudgetBreakdown {
  model: string;
  amount: number;
  color: string;
}

export interface BudgetSummary {
  cap: number;
  used: number;
  breakdown: BudgetBreakdown[];
}

export const budgetSummary: BudgetSummary = {
  cap: 60000,
  used: 42850,
  breakdown: [
    { model: 'OpenAI GPT-4o', amount: 18200, color: '#3EB0F1' },
    { model: 'OpenAI GPT-4o mini', amount: 9200, color: '#8B5CF6' },
    { model: 'Anthropic Claude 3 Opus', amount: 7600, color: '#22D3EE' },
    { model: 'Anthropic Claude 3 Haiku', amount: 5600, color: '#F472B6' },
    { model: 'Azure Cognitive Search', amount: 3250, color: '#FB923C' },
  ],
};
