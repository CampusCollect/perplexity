import clsx from 'classnames';
import { ReactNode } from 'react';
import { dayjs } from '@/lib/date';

export interface ConnectorCardProps {
  name: string;
  icon: ReactNode;
  authState: 'connected' | 'not_connected' | 'error';
  lastSync?: Date;
  health?: number;
  onClick?: () => void;
}

const authStyles: Record<ConnectorCardProps['authState'], string> = {
  connected: 'bg-success/10 text-success border-success/40',
  not_connected: 'bg-warning/10 text-warning border-warning/40',
  error: 'bg-danger/10 text-danger border-danger/40',
};

export const ConnectorCard = ({ name, icon, authState, lastSync, health = 0, onClick }: ConnectorCardProps) => {
  const healthColor = health >= 80 ? 'text-success' : health >= 50 ? 'text-warning' : 'text-danger';

  return (
    <button
      onClick={onClick}
      className="flex min-w-[220px] flex-col gap-3 rounded-2xl border border-white/5 bg-surface/90 p-4 text-left shadow-md shadow-black/20 transition hover:-translate-y-1 hover:border-accent/60"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/70 text-accent">{icon}</span>
        <span className={clsx('rounded-full border px-3 py-1 text-xs font-semibold', authStyles[authState])}>
          {authState === 'connected' ? 'Connected' : authState === 'error' ? 'Error' : 'Not connected'}
        </span>
      </div>
      <div>
        <h4 className="font-display text-lg font-semibold text-white">{name}</h4>
        <p className={clsx('text-sm font-medium', healthColor)}>Health {health}%</p>
      </div>
      <p className="text-xs text-textSecondary">{lastSync ? `Last sync ${dayjs(lastSync).fromNow()}` : 'Never synced'}</p>
    </button>
  );
};
