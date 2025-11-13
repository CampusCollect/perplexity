import { useCallback, useState } from 'react';
import { Navigate, useLocation, type Location } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSession } from '@/lib/auth';
import { mockUsers } from '@/lib/mock/users';

export function LoginPage() {
  const { isAuthenticated, isLoading, signIn } = useSession();
  const location = useLocation();
  const [selectedUserId, setSelectedUserId] = useState<string>(mockUsers[0]?.id ?? '');
  const [isSubmitting, setSubmitting] = useState(false);

  const from = (location.state as { from?: Location })?.from?.pathname ?? '/home';

  const handleSubmit = useCallback(async () => {
    setSubmitting(true);
    await signIn(selectedUserId);
    setSubmitting(false);
  }, [selectedUserId, signIn]);

  if (isAuthenticated && !isLoading) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-border bg-surface/80 p-8 shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-text-primary">Access Executive AI Suite</h1>
          <p className="text-sm text-text-secondary">
            Choose a role to simulate secure access. Production deployments will use SSO via your identity provider.
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Sign in as</label>
            <Select value={selectedUserId} onValueChange={setSelectedUserId} disabled={isSubmitting}>
              <SelectTrigger>
                <SelectValue placeholder="Select a persona" />
              </SelectTrigger>
              <SelectContent>
                {mockUsers.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name} — {user.role.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Securing session…' : 'Enter workspace'}
          </Button>
        </div>
        <p className="text-xs text-text-secondary">
          Audit logging is enabled. Every session change is tracked to prepare for SOC 2 controls.
        </p>
      </div>
    </div>
  );
}
