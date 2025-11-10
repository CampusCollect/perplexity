import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { templates } from '@/lib/mock/templates';

export function TemplatesPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {templates.map((template) => (
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
