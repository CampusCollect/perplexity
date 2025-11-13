import { NavLink } from 'react-router-dom';
import {
  Bot,
  Grid3x3,
  Home,
  Plug,
  ShieldCheck,
  Workflow,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import clsx from 'classnames';

const navItems = [
  { label: 'Home', href: '/home', icon: Home },
  { label: 'Connectors', href: '/connectors', icon: Plug },
  { label: 'Agents', href: '/agents', icon: Bot },
  { label: 'Flows', href: '/flows', icon: Workflow },
  { label: 'Governance', href: '/governance', icon: ShieldCheck },
  { label: 'Templates', href: '/templates', icon: Grid3x3 },
];

interface LeftNavProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const LeftNav = ({ collapsed, onToggle }: LeftNavProps) => {
  return (
    <aside
      className={clsx(
        'fixed inset-y-0 z-40 flex flex-col border-r border-white/5 bg-surface/95 p-4 backdrop-blur transition-all duration-300',
        collapsed ? 'w-20' : 'w-72'
      )}
    >
      <div className="flex items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-black font-display text-lg">
            PX
          </span>
          {!collapsed && (
            <div>
              <p className="font-display text-lg font-semibold text-white">Perplexity OS</p>
              <p className="text-xs text-textSecondary">Agentic business studio</p>
            </div>
          )}
        </div>
        <button
          onClick={onToggle}
          className="rounded-full border border-white/10 p-2 text-textSecondary transition hover:border-accent/60 hover:text-white"
          aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </div>
      <nav className="mt-8 flex-1 space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => (
          <NavLink
            key={href}
            to={href}
            className={({ isActive }) =>
              clsx(
                'group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition',
                isActive ? 'bg-accent/10 text-white' : 'text-textSecondary hover:bg-white/5 hover:text-white'
              )
            }
          >
            <Icon className="h-5 w-5" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
      <div className={clsx('rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-textSecondary', collapsed && 'hidden')}>
        <p className="font-semibold text-white">Command Tips</p>
        <p className="mt-1">Press <span className="rounded bg-black/40 px-1">/</span> to search</p>
        <p className="mt-1">Cmd/Ctrl + K for command deck</p>
      </div>
    </aside>
  );
};
