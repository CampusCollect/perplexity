import { ReactNode, useState } from 'react';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { dayjs } from '@/lib/date';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export interface RunTimelineStep {
  timestamp: Date;
  type: string;
  cost: number;
  tokens: number;
  latency: number;
  status: 'success' | 'error';
  output?: unknown;
}

export interface RunTimelineProps {
  steps: RunTimelineStep[];
}

const statusIcon: Record<RunTimelineStep['status'], ReactNode> = {
  success: <CheckCircle2 className="h-5 w-5 text-success" />,
  error: <XCircle className="h-5 w-5 text-danger" />,
};

export const RunTimeline = ({ steps }: RunTimelineProps) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="relative">
      <div className="absolute left-4 top-3 bottom-3 w-px bg-white/10" />
      <ul className="space-y-6">
        {steps.map((step, index) => {
          const isExpanded = expanded === index;
          return (
            <li key={index} className="relative flex gap-6">
              <span className="relative z-10 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-muted/70">
                {statusIcon[step.status] || <Loader2 className="h-5 w-5 animate-spin text-accent" />}
              </span>
              <div className="flex-1 rounded-2xl border border-white/5 bg-surface/80 p-5 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-textSecondary">{step.type}</p>
                    <p className="text-base text-white">{dayjs(step.timestamp).format('MMM D, HH:mm:ss')}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-textSecondary">
                    <span>Cost ${step.cost.toFixed(2)}</span>
                    <span>Tokens {step.tokens.toLocaleString()}</span>
                    <span>Latency {step.latency.toFixed(1)}s</span>
                    <button
                      onClick={() => setExpanded(isExpanded ? null : index)}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-accent hover:border-accent/60"
                    >
                      {isExpanded ? 'Hide output' : 'View I/O'}
                    </button>
                  </div>
                </div>
                {isExpanded && step.output && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-white/5 bg-black/40">
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language="json"
                      customStyle={{ margin: 0, background: 'transparent', fontSize: '0.8rem', padding: '1rem' }}
                    >
                      {JSON.stringify(step.output, null, 2)}
                    </SyntaxHighlighter>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
