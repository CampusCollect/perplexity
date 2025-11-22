import { useCallback, useMemo, useState } from 'react';
import { Navigate, useLocation, type Location } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Smartphone, Sparkles } from 'lucide-react';

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

  const persona = useMemo(() => mockUsers.find((user) => user.id === selectedUserId), [selectedUserId]);

  if (isAuthenticated && !isLoading) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      <div className="relative flex flex-1 flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0E1F2F] via-[#0B131A] to-[#04070D] p-10 text-white">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-300">C-suite control tower</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold">
            Radical truth, instant actions. Onboard any CxO in minutes.
          </h1>
          <p className="mt-3 max-w-xl text-base text-slate-300">
            Every login is secured, audited, and comes with explainable AI. Choose a persona below to experience the live CEO
            suite without waiting on IT.
          </p>
        </div>
        <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-300" />
            <div>
              <p className="text-sm font-semibold text-white">SOC2-ready controls</p>
              <p className="text-xs text-slate-300">Audit logs stream to your SIEM instantly.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Smartphone className="h-5 w-5 text-accent" />
            <div>
              <p className="text-sm font-semibold text-white">Time sovereignty</p>
              <p className="text-xs text-slate-300">Execs spend &lt;5 minutes/day to see and act.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-amber-200" />
            <div>
              <p className="text-sm font-semibold text-white">Explainable AI</p>
              <p className="text-xs text-slate-300">Every recommendation links to raw data and rationale.</p>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-60" aria-hidden>
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top,_rgba(72,177,255,0.2),_transparent)]" />
        </div>
      </div>
      <div className="flex w-full max-w-xl flex-col justify-center gap-8 border-l border-white/10 bg-surface/80 px-8 py-12">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-text-secondary">Secure login</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Choose a role to enter the suite</h2>
          <p className="mt-1 text-sm text-text-secondary">
            We’ll mimic SSO by letting you select a persona. Production deployments integrate with Okta, Azure AD, or your
            preferred IdP.
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-text-secondary">Persona</label>
            <Select value={selectedUserId} onValueChange={setSelectedUserId} disabled={isSubmitting}>
              <SelectTrigger className="mt-1">
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
          {persona && (
            <div className="rounded-2xl border border-white/5 bg-overlay/70 p-4 text-sm text-text-secondary">
              <p className="text-xs uppercase tracking-wide text-text-secondary">Preview</p>
              <p className="text-lg font-semibold text-white">{persona?.name}</p>
              <p className="text-xs text-text-secondary">{persona?.role.toUpperCase()} • Tripwires armed • Actions routed to phone + Slack</p>
            </div>
          )}
          <Button className="w-full" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Securing session…' : 'Enter workspace'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-text-secondary">
          Every login is logged with origin, device fingerprint, and role. Need help? Email security@executive.ai.
        </p>
      </div>
    </div>
  );
}
