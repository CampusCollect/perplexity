import { Sparkles } from 'lucide-react';

export interface TemplateCardProps {
  name: string;
  description: string;
  connectors: string[];
  timeToValue: string;
  metrics: string[];
  onInstall?: () => void;
}

export const TemplateCard = ({ name, description, connectors, timeToValue, metrics, onInstall }: TemplateCardProps) => {
  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/5 bg-surface/80 p-6 shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Sparkles className="h-5 w-5" />
            </span>
            <h3 className="font-display text-xl font-semibold text-white">{name}</h3>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-textSecondary">{description}</p>
        </div>
        <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-textSecondary">{timeToValue}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {connectors.map((connector) => (
          <span
            key={connector}
            className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-textSecondary"
          >
            {connector}
          </span>
        ))}
      </div>
      <ul className="flex flex-1 list-disc flex-col gap-1 pl-5 text-sm text-textSecondary">
        {metrics.map((metric) => (
          <li key={metric}>{metric}</li>
        ))}
      </ul>
      <button
        onClick={onInstall}
        className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-black transition hover:bg-accent/80"
      >
        Install &amp; Customize
      </button>
    </div>
  );
};
