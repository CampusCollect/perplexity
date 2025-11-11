import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react';
import { ReactNode } from 'react';
import clsx from 'classnames';

export interface KPIHeroProps {
  label: string;
  value: string | number;
  delta?: string;
  tooltip?: string;
  trend?: 'up' | 'down';
  sparkline?: ReactNode;
}

export const KPIHero = ({ label, value, delta, tooltip, trend, sparkline }: KPIHeroProps) => {
  const TrendIcon = trend === 'down' ? ArrowDownRight : trend === 'up' ? ArrowUpRight : ArrowRight;
  const trendColor = trend === 'down' ? 'text-danger' : trend === 'up' ? 'text-success' : 'text-textSecondary';

  return (
    <div
      className="relative flex h-full flex-col justify-between rounded-2xl border border-white/5 bg-surface/80 p-6 shadow-lg shadow-black/30 backdrop-blur"
      title={tooltip}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium uppercase tracking-wide text-textSecondary">{label}</span>
        {delta && (
          <span className={clsx('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold', trendColor)}>
            <TrendIcon className="h-4 w-4" />
            {delta}
          </span>
        )}
      </div>
      <div className="mt-4 flex items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-4xl font-semibold text-white font-display">{value}</p>
          {tooltip && <p className="text-sm text-textSecondary">{tooltip}</p>}
        </div>
        {sparkline && <div className="h-16 w-24 overflow-hidden text-accent">{sparkline}</div>}
      </div>
    </div>
  );
};
