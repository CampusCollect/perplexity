import { ReactNode, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeftNav } from './LeftNav';
import { TopBar } from './TopBar';
import { KeyboardShortcuts } from './KeyboardShortcuts';

interface AppShellProps {
  children: ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const navWidth = useMemo(() => (collapsed ? 88 : 288), [collapsed]);

  return (
    <div className="flex min-h-screen bg-background text-textPrimary">
      <KeyboardShortcuts
        onFocusSearch={() => searchRef.current?.focus()}
        onOpenGovernance={() => navigate('/governance')}
        onOpenAgents={() => navigate('/agents')}
        onOpenConnectors={() => navigate('/connectors')}
        onOpenCommandPalette={() => searchRef.current?.focus()}
      />
      <LeftNav collapsed={collapsed} onToggle={() => setCollapsed((prev) => !prev)} />
      <div className="flex flex-1 flex-col" style={{ marginLeft: navWidth }}>
        <TopBar onToggleNav={() => setCollapsed((prev) => !prev)} searchRef={searchRef} />
        <main className="flex-1 overflow-y-auto px-6 pb-12 pt-6">
          <div className="mx-auto max-w-[1440px] space-y-10">{children}</div>
        </main>
      </div>
    </div>
  );
};
