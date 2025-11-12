import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function OnboardingPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Agentic Business Studio</CardTitle>
          <CardDescription>Provision your workspace and connect your primary systems to begin orchestrating intelligence.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="workspace">
            <TabsList>
              <TabsTrigger value="workspace">Workspace</TabsTrigger>
              <TabsTrigger value="connections">Connections</TabsTrigger>
              <TabsTrigger value="goals">Operating Goals</TabsTrigger>
            </TabsList>
            <TabsContent value="workspace" className="space-y-4">
              <Input placeholder="Workspace name" />
              <Input placeholder="Executive sponsor" />
              <Button className="self-start">Create workspace</Button>
            </TabsContent>
            <TabsContent value="connections" className="space-y-4">
              <p className="text-sm text-text-secondary">
                Connect your data, communication, and automation systems. You can add more connectors any time from the command deck.
              </p>
              <Button variant="outline">Launch Connector Catalog</Button>
            </TabsContent>
            <TabsContent value="goals" className="space-y-4">
              <p className="text-sm text-text-secondary">Define the executive outcomes you want our agents to deliver this quarter.</p>
              <Input placeholder="Primary objective" />
              <Button>Save objectives</Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
