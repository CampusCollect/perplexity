import clsx from 'classnames';
import { useNavigate } from 'react-router-dom';
import { dayjs } from '@/lib/date';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export interface AgentCardProps {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'error';
  budget: {
    used: number;
    cap: number;
  };
  lastRun?: Date;
  onClick?: () => void;
}

const statusStyles: Record<AgentCardProps['status'], string> = {
  active: 'bg-success/10 text-success border-success/40',
  paused: 'bg-warning/10 text-warning border-warning/40',
  error: 'bg-danger/10 text-danger border-danger/40',
};

export const AgentCard = ({ id, name, status, budget, lastRun, onClick }: AgentCardProps) => {
  const navigate = useNavigate();
  const percent = Math.min(100, Math.round((budget.used / budget.cap) * 100));

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    navigate(`/agents/${id}`);
  };

  return (
    <button
      onClick={handleClick}
      className="group relative flex h-full w-full flex-col rounded-2xl border border-white/5 bg-surface/80 p-5 text-left shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-accent/60 hover:shadow-glow"
    >
      <span className={clsx('absolute right-4 top-4 inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold', statusStyles[status])}>
        {status === 'active' ? 'Active' : status === 'paused' ? 'Paused' : 'Needs attention'}
      </span>
      <div className="space-y-2">
        <h3 className="font-display text-xl font-semibold text-white">{name}</h3>
        <p className="text-sm text-textSecondary">Monthly budget {percent}% used</p>
      </div>
      <div className="mt-4 h-2 rounded-full bg-muted/70">
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-textSecondary">
        <span>
          {currency.format(budget.used)} / {currency.format(budget.cap)}
        </span>
        <span>{lastRun ? `Ran ${dayjs(lastRun).fromNow()}` : 'No recent runs'}</span>
      </div>
      <span className="mt-6 inline-flex items-center text-sm font-medium text-accent opacity-0 transition group-hover:opacity-100">
        View insights →
      </span>
    </button>
  );
};
