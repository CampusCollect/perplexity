import { AlertCircle, AlertTriangle, OctagonAlert } from 'lucide-react';
import clsx from 'classnames';
import { ReactNode } from 'react';

export type RiskSeverity = 'info' | 'warning' | 'error';

export interface RiskAlertCardProps {
  severity: RiskSeverity;
  title: string;
  description: string;
  cta?: {
    label: string;
    action: () => void;
  };
}

const severityConfig: Record<
  RiskSeverity,
  {
    border: string;
    badge: string;
    icon: ReactNode;
  }
> = {
  info: {
    border: 'border-accent/40',
    badge: 'text-accent/80',
    icon: <AlertCircle className="h-5 w-5" />,
  },
  warning: {
    border: 'border-warning/60',
    badge: 'text-warning',
    icon: <AlertTriangle className="h-5 w-5" />,
  },
  error: {
    border: 'border-danger/70',
    badge: 'text-danger',
    icon: <OctagonAlert className="h-5 w-5" />,
  },
};

export const RiskAlertCard = ({ severity, title, description, cta }: RiskAlertCardProps) => {
  const config = severityConfig[severity];

  return (
    <div
      className={clsx(
        'flex h-full flex-col justify-between rounded-xl border bg-surface/90 p-5 shadow-lg shadow-black/20 backdrop-blur',
        config.border
      )}
    >
      <div className="flex items-start gap-3">
        <span className={clsx('flex h-9 w-9 items-center justify-center rounded-full bg-muted/60', config.badge)}>
          {config.icon}
        </span>
        <div className="space-y-2">
          <p className="text-base font-semibold text-white">{title}</p>
          <p className="text-sm leading-relaxed text-textSecondary">{description}</p>
        </div>
      </div>
      {cta && (
        <button
          onClick={cta.action}
          className="mt-4 inline-flex w-fit items-center justify-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-accent/80"
        >
          {cta.label}
        </button>
      )}
    </div>
  );
};
