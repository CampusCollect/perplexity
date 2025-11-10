export interface BudgetBreakdownItem {
  model: string;
  amount: number;
  color: string;
}

export interface BudgetBarProps {
  cap: number;
  used: number;
  breakdown: BudgetBreakdownItem[];
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export const BudgetBar = ({ cap, used, breakdown }: BudgetBarProps) => {
  const usedPercent = Math.min(100, Math.round((used / cap) * 100));
  const remaining = Math.max(cap - used, 0);

  return (
    <div className="space-y-4 rounded-2xl border border-white/5 bg-surface/80 p-6 shadow-lg">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-wide text-textSecondary">Monthly spend</p>
          <h3 className="font-display text-2xl font-semibold text-white">
            {currency.format(used)}
            <span className="text-base font-normal text-textSecondary"> / {currency.format(cap)}</span>
          </h3>
        </div>
        <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-textSecondary">{usedPercent}% utilized</span>
      </div>
      <div className="h-4 overflow-hidden rounded-full bg-muted/60">
        <div className="flex h-full w-full">
          {breakdown.map((segment) => {
            const width = Math.max(1, Math.round((segment.amount / cap) * 100));
            return (
              <div
                key={segment.model}
                className="h-full transition-opacity hover:opacity-80"
                style={{ width: `${width}%`, backgroundColor: segment.color }}
                title={`${segment.model}: ${currency.format(segment.amount)}`}
              />
            );
          })}
          {remaining > 0 && (
            <div
              className="h-full flex-1 bg-white/5"
              title={`Available: ${currency.format(remaining)}`}
            />
          )}
        </div>
      </div>
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {breakdown.map((segment) => (
          <div key={segment.model} className="flex items-center gap-2 text-sm text-textSecondary">
            <span className="h-2 w-8 rounded-full" style={{ backgroundColor: segment.color }} />
            <span className="font-medium text-white">{segment.model}</span>
            <span>{currency.format(segment.amount)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
