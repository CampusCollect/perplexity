import { ErrorState } from '@/components/status/ErrorState';
import { LoadingState } from '@/components/status/LoadingState';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTemplates } from '@/lib/api';

export function TemplatesPage() {
  const { data, isLoading, isError, refetch } = useTemplates();

  if (isLoading) {
    return (
      <div className="flex min-h-[240px] items-center justify-center">
        <LoadingState message="Fetching blueprints" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[240px] items-center justify-center">
        <ErrorState
          title="Templates unavailable"
          description="We couldn't reach the template library. Retry or confirm network health."
          onRetry={() => {
            void refetch();
          }}
        />
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {data?.map((template) => (
        <Card key={template.id} className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>{template.name}</CardTitle>
            <CardDescription className="capitalize">{template.category}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-text-secondary">
            <p>{template.summary}</p>
            <p className="text-xs text-text-secondary">Updated {template.lastUpdated}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
