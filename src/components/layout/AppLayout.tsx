import { useEffect, useMemo, useState, type ComponentType, type SVGProps } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Activity,
  Bot,
  LayoutDashboard,
  Plug,
  ScrollText,
  Settings,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRuns, useAgents } from '@/lib/api';
import { MODES, type OperatingMode, useModeStore } from '@/lib/store/modeStore';

type NavItem = {
  label: string;
  to: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCommandOpen, setCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');
  const { mode, setMode } = useModeStore();
  const { data: agents } = useAgents();
  const { data: runs } = useRuns();

  const defaultAgentId = agents?.[0]?.id ?? 'agent-overview';
  const defaultRun = runs?.[0];
  const defaultFlowId = defaultRun?.flowId ?? 'flow-overview';
  const defaultRunId = defaultRun?.id ?? 'run-overview';

  const navItems: NavItem[] = useMemo(
    () => [
      { label: 'Onboarding', to: '/onboarding', icon: Sparkles },
      { label: 'Command Deck', to: '/home', icon: LayoutDashboard },
      { label: 'Connectors', to: '/connectors', icon: Plug },
      { label: 'Agents', to: `/agents/${defaultAgentId}`, icon: Bot },
      { label: 'Flows', to: `/flows/${defaultFlowId}`, icon: Workflow },
      { label: 'Runs', to: `/runs/${defaultRunId}`, icon: Activity },
      { label: 'Governance', to: '/governance', icon: ShieldCheck },
      { label: 'Templates', to: '/templates', icon: ScrollText },
      { label: 'Settings', to: '/settings', icon: Settings },
    ],
    [defaultAgentId, defaultFlowId, defaultRunId],
  );

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      const target = event.target as HTMLElement;
      if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) return;

      if (event.key === '/') {
        event.preventDefault();
        setCommandOpen(true);
        return;
      }

      if (event.key.toLowerCase() === 'g') {
        event.preventDefault();
        navigate('/governance');
      }

      if (event.key.toLowerCase() === 'a') {
        event.preventDefault();
        navigate(`/agents/${defaultAgentId}`);
      }

      if (event.key.toLowerCase() === 'c') {
        event.preventDefault();
        navigate('/connectors');
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [defaultAgentId, navigate]);

  useEffect(() => {
    setCommandOpen(false);
    setCommandQuery('');
  }, [location.pathname]);

  return (
    <div className="flex h-full min-h-screen w-full bg-background text-text-primary">
      <aside className="hidden h-full w-64 flex-col border-r border-border bg-surface/80 px-4 py-6 md:flex">
        <Link to="/home" className="flex items-center gap-2 px-2 text-lg font-semibold text-text-primary">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-background">AB</div>
          Agentic Studio
        </Link>
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-overlay text-text-primary'
                    : 'text-text-secondary hover:bg-overlay/60 hover:text-text-primary'
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto space-y-3 border-t border-border pt-4">
          <p className="text-xs uppercase tracking-wide text-text-secondary">Keyboard Shortcuts</p>
          <div className="space-y-2 text-xs text-text-secondary">
            <p><span className="rounded border border-border bg-overlay px-1 py-0.5 text-text-primary">/</span> Command palette</p>
            <p><span className="rounded border border-border bg-overlay px-1 py-0.5 text-text-primary">G</span> Governance</p>
            <p><span className="rounded border border-border bg-overlay px-1 py-0.5 text-text-primary">A</span> Agents</p>
            <p><span className="rounded border border-border bg-overlay px-1 py-0.5 text-text-primary">C</span> Connectors</p>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-surface/60 px-6 py-4 backdrop-blur">
          <div>
            <p className="text-xs uppercase tracking-wide text-text-secondary">Current mode</p>
            <h1 className="text-xl font-semibold text-text-primary">{mode} Mode</h1>
          </div>
          <div className="flex items-center gap-3">
            <Select value={mode} onValueChange={(value) => setMode(value as OperatingMode)}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                {MODES.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => setCommandOpen(true)}>
              Open Command (/)
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-background px-4 py-6 md:px-8">
          <Outlet />
        </main>
      </div>

      <Dialog open={isCommandOpen} onOpenChange={setCommandOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Command Palette</DialogTitle>
            <DialogDescription>Search for surfaces, agents, or flows across your workspace.</DialogDescription>
          </DialogHeader>
          <Input
            autoFocus
            placeholder="Type to search..."
            value={commandQuery}
            onChange={(event) => setCommandQuery(event.target.value)}
          />
          <p className="text-xs text-text-secondary">
            Keyboard access: / to open, Esc to close. Use shortcuts G, A, C for direct navigation.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
