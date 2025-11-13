import { RefObject } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Bell, Menu } from 'lucide-react';
import { ModeSwitcher } from '@/components/ui/ModeSwitcher';

interface TopBarProps {
  searchRef: RefObject<HTMLInputElement>;
  onToggleNav: () => void;
}

export const TopBar = ({ searchRef, onToggleNav }: TopBarProps) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const breadcrumbs = pathSegments.length
    ? pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const label = segment.replace(/-/g, ' ');
        return { href, label };
      })
    : [{ href: '/home', label: 'home' }];

  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-background/70 px-6 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-full items-center gap-3">
          <button
            className="inline-flex items-center justify-center rounded-full border border-white/10 p-2 text-textSecondary transition hover:border-accent/60 hover:text-white lg:hidden"
            onClick={onToggleNav}
            aria-label="Toggle navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
          <nav className="flex items-center gap-2 text-xs uppercase tracking-wide text-textSecondary">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.href} className="flex items-center gap-2">
                {index !== 0 && <span className="text-white/20">/</span>}
                <Link to={crumb.href} className="hover:text-white">
                  {crumb.label}
                </Link>
              </span>
            ))}
          </nav>
        </div>
        <div className="flex w-full flex-col items-start gap-4 lg:w-auto lg:flex-row lg:items-center">
          <div className="relative w-full lg:w-80">
            <input
              ref={searchRef}
              className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 pl-10 text-sm text-white placeholder:text-textSecondary focus:border-accent focus:outline-none"
              placeholder="Search anything..."
            />
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 rounded bg-white/10 px-2 py-0.5 text-[10px] uppercase text-textSecondary">
              / or ⌘K
            </span>
          </div>
          <div className="flex items-center gap-4 self-stretch lg:self-auto">
            <ModeSwitcher />
            <button className="relative rounded-full border border-white/10 p-2 text-textSecondary transition hover:border-accent/60 hover:text-white">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-danger" />
            </button>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <span className="h-8 w-8 rounded-full bg-gradient-to-br from-accent to-purple-500" />
              <div className="text-xs leading-tight text-textSecondary">
                <p className="font-semibold text-white">Jordan Lee</p>
                <p>Chief Automation Officer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
