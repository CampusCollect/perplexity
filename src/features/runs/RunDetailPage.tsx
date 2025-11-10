import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { runs } from '@/lib/mock/runs';

export function RunDetailPage() {
  const { id } = useParams();
  const run = runs.find((item) => item.id === id);

  if (!run) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Run not found</CardTitle>
          <CardDescription>No orchestration run matches the provided identifier.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{run.name}</CardTitle>
        <CardDescription>Flow {run.flowId} · Owner {run.owner}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-text-secondary">
        <div className="flex items-center justify-between">
          <span>Status</span>
          <span className="uppercase tracking-wide text-text-primary">{run.status}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Started</span>
          <span className="text-text-primary">{new Date(run.startedAt).toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Duration</span>
          <span className="text-text-primary">{run.duration}</span>
        </div>
        <p>
          Telemetry and event traces will appear here as you integrate real execution data. Use this surface for debugging and
          post-run reviews.
        </p>
      </CardContent>
    </Card>
  );
}
