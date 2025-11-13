import { useMemo } from 'react';

import { TemplateCard } from '@/components/ui/TemplateCard';
import type { CreativeScheduleItem } from '@/lib/mock/dashboard';
import { dayjs } from '@/lib/date';

interface ChannelPerformanceItem {
  channel: string;
  lift: number;
}

interface CreativeWorkspaceProps {
  schedule: CreativeScheduleItem[];
  channelPerformance: ChannelPerformanceItem[];
  onNavigate: (path: string) => void;
}

export const CreativeWorkspace = ({ schedule, channelPerformance, onNavigate }: CreativeWorkspaceProps) => {
  const pipelineStages = useMemo(
    () => [
      { stage: 'Ideation', count: 15 },
      { stage: 'Drafting', count: 12 },
      { stage: 'Review', count: 9 },
      { stage: 'Scheduled', count: 6 },
    ],
    []
  );

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-white/5 bg-surface/80 p-6 shadow-lg">
        <h3 className="font-display text-lg font-semibold text-white">Content Calendar</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {schedule.map((item) => (
            <div key={item.id} className="rounded-xl border border-white/5 bg-white/5 p-4 text-sm text-textSecondary">
              <p className="font-display text-lg font-semibold text-white">{item.channel}</p>
              <p className="mt-2">Owner: {item.owner}</p>
              <p className="mt-1">{dayjs(item.scheduledFor).format('MMM D • HH:mm')}</p>
              <span className="mt-3 inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                {item.status.replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/5 bg-surface/80 p-6 shadow-lg">
          <h3 className="font-display text-lg font-semibold text-white">Asset Pipeline</h3>
          <ul className="mt-4 space-y-3 text-sm text-textSecondary">
            {pipelineStages.map((stage) => (
              <li key={stage.stage} className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                <span>{stage.stage}</span>
                <span className="text-white">{stage.count} assets</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/5 bg-surface/80 p-6 shadow-lg">
          <h3 className="font-display text-lg font-semibold text-white">Channel Performance</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {channelPerformance.map((item) => (
              <div key={item.channel} className="rounded-xl border border-white/5 bg-white/5 p-4">
                <p className="font-semibold text-white">{item.channel}</p>
                <p className="mt-2 text-sm text-textSecondary">Engagement lift</p>
                <p className="text-2xl font-semibold text-accent">+{item.lift.toFixed(1)}%</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/5 bg-surface/80 p-6 shadow-lg">
        <h3 className="font-display text-lg font-semibold text-white">Featured Templates</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <TemplateCard
            name="AI Content Studio"
            description="Automate ideation-to-publish workflows across every digital channel with human-in-the-loop reviews."
            connectors={['Notion', 'Slack', 'Google Drive']}
            timeToValue="Go-live in 5 days"
            metrics={['+38% output velocity', '2.4x engagement lift', 'Shared brand style library']}
            onInstall={() => onNavigate('/templates/content-studio')}
          />
          <TemplateCard
            name="Campaign Creative Assistant"
            description="Generate multi-variant assets aligned to pipeline targets with dynamic channel insights."
            connectors={['HubSpot', 'Figma', 'Salesforce']}
            timeToValue="Launch in 7 days"
            metrics={['Reduce QA cycles by 42%', 'Dynamic tone guardrails', 'Automated approvals']}
            onInstall={() => onNavigate('/templates/campaign-assistant')}
          />
        </div>
      </section>
    </div>
  );
};

