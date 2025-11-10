import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { runs } from '@/lib/mock/runs';

const flowDescriptions: Record<string, string> = {
  'flow-orbit': 'Synthesizes executive intelligence from market, finance, and product signals.',
  'flow-signal': 'Aligns sales, marketing, and finance data into a single command narrative.',
  'flow-creative': 'Operationalizes creative ideation and review loops with governance checkpoints.',
};

export function FlowDetailPage() {
  const { id } = useParams();
  const relatedRuns = runs.filter((run) => run.flowId === id);
  const description = (id && flowDescriptions[id]) || 'Flow definition coming soon. Configure steps and agents to begin orchestration.';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{id?.replace('flow-', '').toUpperCase() ?? 'Flow'}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent executions</CardTitle>
          <CardDescription>Visibility into the most recent automation cycles.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {relatedRuns.length === 0 && <p className="text-sm text-text-secondary">No recent runs recorded for this flow.</p>}
          {relatedRuns.map((run) => (
            <div key={run.id} className="rounded-md border border-border bg-overlay px-4 py-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-text-primary">{run.name}</span>
                <span className="uppercase tracking-wide text-text-secondary">{run.status}</span>
              </div>
              <p className="mt-1 text-xs text-text-secondary">
                Started {new Date(run.startedAt).toLocaleString()} · Duration {run.duration} · Owner {run.owner}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
