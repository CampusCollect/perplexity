import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function SettingsPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Workspace Settings</CardTitle>
          <CardDescription>Update global preferences and workspace metadata.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Workspace name" defaultValue="Agentic Business Studio" />
          <Input placeholder="Notification email" defaultValue="ops@codex.ai" />
          <Button className="self-start">Save changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Authentication and governance guardrails.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-text-secondary">
          <p>Single sign-on is enabled. Rotate shared credentials every 30 days.</p>
          <Button variant="outline">Configure SSO</Button>
        </CardContent>
      </Card>
    </div>
  );
}
