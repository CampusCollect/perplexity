import { useMemo, useState } from 'react';
import { Activity, Bell, Check, ShieldCheck, Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const personas = [
  { id: 'ceo', title: 'CEO', description: 'Cash, runway, existential risk, strategic leverage.' },
  { id: 'cfo', title: 'CFO', description: 'Liquidity, margin compression, working capital.' },
  { id: 'coo', title: 'COO', description: 'Supply chain, incidents, throughput, headcount.' },
  { id: 'cro', title: 'CRO', description: 'Pipeline, churn, win rates, strategic accounts.' },
];

const focusModes = [
  {
    id: 'survival',
    title: 'Resilience',
    description: 'Extend runway, make risk visible, protect cash.',
    emphasis: ['Cash runway', 'Vendor concentration', 'Critical incidents'],
  },
  {
    id: 'growth',
    title: 'Growth',
    description: 'Aggressively scale the motions that work.',
    emphasis: ['ARR velocity', 'NDR', 'Enterprise pipeline'],
  },
  {
    id: 'resilience',
    title: 'Operational excellence',
    description: 'Tighten ops, data freshness, and compliance.',
    emphasis: ['Automation health', 'SLA adherence', 'Audit readiness'],
  },
];

const connectors = [
  { id: 'finance', name: 'NetSuite', detail: 'Finance' },
  { id: 'crm', name: 'Salesforce', detail: 'GTM' },
  { id: 'support', name: 'Zendesk', detail: 'Support' },
  { id: 'hris', name: 'Workday', detail: 'People' },
  { id: 'security', name: 'Drata', detail: 'GRC' },
  { id: 'data', name: 'Snowflake', detail: 'Data platform' },
];

const tripwireTemplates = [
  { id: 'churn', label: 'Churn rate > 0.3% daily', channel: 'SMS' },
  { id: 'cash', label: 'Cash runway < 14 months', channel: 'Signal' },
  { id: 'incidents', label: 'Critical incidents > 2 / week', channel: 'PagerDuty' },
];

const steps = [
  { id: 'persona', title: 'Identity & focus' },
  { id: 'connectors', title: 'Data fidelity' },
  { id: 'priorities', title: 'Goals & tripwires' },
  { id: 'handoff', title: 'Review & activate' },
] as const;

type StepId = (typeof steps)[number]['id'];

export function OnboardingPage() {
  const [step, setStep] = useState<StepId>('persona');
  const [persona, setPersona] = useState(personas[0].id);
  const [focus, setFocus] = useState(focusModes[0].id);
  const [selectedConnectors, setSelectedConnectors] = useState<string[]>(['finance', 'crm']);
  const [customGoals, setCustomGoals] = useState('Stabilize margin at 64%+, defend enterprise renewals, unblock SOC2.');
  const [tripwires, setTripwires] = useState<string[]>(['cash']);
  const [alertPhone, setAlertPhone] = useState('+1 415 000 0000');
  const [alertEmail, setAlertEmail] = useState('ceo@example.com');

  const currentStepIndex = steps.findIndex((item) => item.id === step);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const summary = useMemo(
    () => ({
      persona: personas.find((item) => item.id === persona)?.title,
      focus: focusModes.find((mode) => mode.id === focus)?.title,
      connectors: connectors.filter((connector) => selectedConnectors.includes(connector.id)).map((c) => c.name),
      tripwires: tripwireTemplates.filter((item) => tripwires.includes(item.id)).map((item) => item.label),
      goals: customGoals,
      alerts: { phone: alertPhone, email: alertEmail },
    }),
    [persona, focus, selectedConnectors, tripwires, customGoals, alertPhone, alertEmail],
  );

  const goToStep = (delta: number) => {
    const nextIndex = Math.min(Math.max(currentStepIndex + delta, 0), steps.length - 1);
    setStep(steps[nextIndex].id);
  };

  const toggleConnector = (id: string) => {
    setSelectedConnectors((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const toggleTripwire = (id: string) => {
    setTripwires((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-surface/80 via-surface/60 to-background/60 p-8 shadow-2xl shadow-black/40">
        <p className="text-xs uppercase tracking-[0.3em] text-text-secondary">Universal onboarding</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Zero-friction setup for every CxO</h1>
        <p className="mt-2 max-w-3xl text-base text-text-secondary">
          Configure executive focus, connect source-of-truth systems, define the outcomes that matter, and arm tripwires in under
          five minutes. No slide decks. No IT tickets.
        </p>
        <div className="mt-6 h-2 rounded-full bg-white/10">
          <div className="h-full rounded-full bg-accent" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-xs uppercase tracking-wide text-text-secondary">
          {steps.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setStep(item.id)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1',
                index === currentStepIndex ? 'bg-white/10 text-white' : 'text-text-secondary hover:text-white',
              )}
            >
              <span className="h-6 w-6 rounded-full border border-white/20 text-center leading-6">{index + 1}</span>
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {step === 'persona' && (
        <Card>
          <CardHeader>
            <CardTitle>Who are we onboarding?</CardTitle>
            <CardDescription>Every role has a different decision horizon. Pick one to personalize telemetry.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {personas.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setPersona(option.id)}
                className={cn(
                  'rounded-2xl border p-4 text-left transition',
                  persona === option.id ? 'border-accent bg-accent/10' : 'border-white/5 bg-surface/80 hover:border-accent/60',
                )}
              >
                <p className="text-lg font-semibold text-white">{option.title}</p>
                <p className="mt-1 text-sm text-text-secondary">{option.description}</p>
              </button>
            ))}
          </CardContent>
        </Card>
      )}

      {step === 'persona' && (
        <Card>
          <CardHeader>
            <CardTitle>What matters most?</CardTitle>
            <CardDescription>Set the default prioritization for the action feed.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {focusModes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setFocus(mode.id)}
                className={cn(
                  'rounded-2xl border border-white/5 bg-surface/80 p-4 text-left transition',
                  focus === mode.id && 'border-accent bg-accent/10',
                )}
              >
                <p className="text-base font-semibold text-white">{mode.title}</p>
                <p className="mt-1 text-sm text-text-secondary">{mode.description}</p>
                <ul className="mt-3 space-y-1 text-xs text-text-secondary">
                  {mode.emphasis.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </CardContent>
        </Card>
      )}

      {step === 'connectors' && (
        <Card>
          <CardHeader>
            <CardTitle>Connect systems-of-record</CardTitle>
            <CardDescription>We ingest raw, live data with provenance. Select the systems to pull immediately.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {connectors.map((connector) => (
              <button
                key={connector.id}
                type="button"
                onClick={() => toggleConnector(connector.id)}
                className={cn(
                  'rounded-2xl border border-white/5 bg-surface/80 p-4 text-left transition',
                  selectedConnectors.includes(connector.id) && 'border-accent bg-accent/10',
                )}
              >
                <p className="text-base font-semibold text-white">{connector.name}</p>
                <p className="text-xs text-text-secondary">{connector.detail}</p>
                <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-text-secondary">
                  <Zap className="h-3.5 w-3.5 text-accent" />
                  {selectedConnectors.includes(connector.id) ? 'Connected' : 'Tap to connect'}
                </span>
              </button>
            ))}
          </CardContent>
        </Card>
      )}

      {step === 'priorities' && (
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Define the outcomes</CardTitle>
              <CardDescription>Tell the platform where to focus. Plain English is fine.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="text-xs font-semibold uppercase tracking-wide text-text-secondary">Top initiatives</label>
              <textarea
                value={customGoals}
                onChange={(event) => setCustomGoals(event.target.value)}
                className="min-h-[140px] w-full rounded-2xl border border-white/5 bg-surface/80 p-4 text-sm text-white"
              />
              <label className="text-xs font-semibold uppercase tracking-wide text-text-secondary">Tripwires</label>
              <div className="grid gap-3 md:grid-cols-3">
                {tripwireTemplates.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => toggleTripwire(template.id)}
                    className={cn(
                      'rounded-2xl border border-white/5 bg-surface/80 p-4 text-left text-sm transition',
                      tripwires.includes(template.id) && 'border-accent bg-accent/10',
                    )}
                  >
                    <p className="font-semibold text-white">{template.label}</p>
                    <p className="text-xs text-text-secondary">{template.channel}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Alert channels</CardTitle>
              <CardDescription>Tripwire delivery destinations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wide text-text-secondary">SMS / Signal</label>
                <Input value={alertPhone} onChange={(event) => setAlertPhone(event.target.value)} className="mt-1" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-text-secondary">Email</label>
                <Input value={alertEmail} onChange={(event) => setAlertEmail(event.target.value)} className="mt-1" />
              </div>
              <div className="rounded-2xl border border-white/5 bg-overlay/60 p-4 text-xs text-text-secondary">
                <p className="font-semibold text-white">Tripwire policy</p>
                <p className="mt-1">All alerts include provenance, AI confidence, and next best actions.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {step === 'handoff' && (
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Ready for activation</CardTitle>
              <CardDescription>Review the configuration that will power your CEO dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-white/5 bg-surface/80 p-4 text-sm">
                <p className="text-xs uppercase tracking-wide text-text-secondary">Persona</p>
                <p className="text-lg font-semibold text-white">{summary.persona}</p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-surface/80 p-4 text-sm">
                <p className="text-xs uppercase tracking-wide text-text-secondary">Focus</p>
                <p className="text-lg font-semibold text-white">{summary.focus}</p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-surface/80 p-4 text-sm">
                <p className="text-xs uppercase tracking-wide text-text-secondary">Connectors live</p>
                <p className="text-lg font-semibold text-white">{summary.connectors.join(', ')}</p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-surface/80 p-4 text-sm">
                <p className="text-xs uppercase tracking-wide text-text-secondary">Tripwires armed</p>
                <p className="text-lg font-semibold text-white">{summary.tripwires.join(' • ') || 'None selected'}</p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-surface/80 p-4 text-sm">
                <p className="text-xs uppercase tracking-wide text-text-secondary">Goals</p>
                <p className="text-lg font-semibold text-white">{summary.goals}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What happens next?</CardTitle>
              <CardDescription>Explainability, audit trails, and RBAC are already in place.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-text-secondary">
              <p className="flex items-center gap-2 text-text-primary">
                <ShieldCheck className="h-4 w-4 text-emerald-300" /> RBAC policies inherited from identity provider
              </p>
              <p className="flex items-center gap-2 text-text-primary">
                <Bell className="h-4 w-4 text-accent" /> Tripwires route to {summary.alerts.phone} and {summary.alerts.email}
              </p>
              <p className="flex items-center gap-2 text-text-primary">
                <Activity className="h-4 w-4 text-sky-300" /> First report arrives once connectors finish syncing (~3 min)
              </p>
              <div className="rounded-2xl border border-white/5 bg-overlay/60 p-4 text-xs">
                <p className="font-semibold text-white">Explainability pledge</p>
                <p className="mt-1">
                  Every recommendation links to source data, rationale, and accountability trail. No black boxes.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex flex-col gap-3 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-text-secondary">
          Step {currentStepIndex + 1} of {steps.length}. Lossless onboarding so you can act within minutes.
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => goToStep(-1)} disabled={currentStepIndex === 0}>
            Back
          </Button>
          {currentStepIndex < steps.length - 1 ? (
            <Button onClick={() => goToStep(1)}>Continue</Button>
          ) : (
            <Button className="bg-accent text-black hover:opacity-90">Launch CEO dashboard</Button>
          )}
        </div>
      </div>
    </div>
  );
}
