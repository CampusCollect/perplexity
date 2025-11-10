import { LayoutDashboard, Settings, LineChart, Palette } from 'lucide-react';
import clsx from 'classnames';
import { ComponentType } from 'react';
import { Mode, useModeStore } from '@/stores/modeStore';

type ModeConfig = {
  id: Mode;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

const modes: ModeConfig[] = [
  { id: 'executive', label: 'Executive', icon: LayoutDashboard },
  { id: 'operator', label: 'Operator', icon: Settings },
  { id: 'analyst', label: 'Analyst', icon: LineChart },
  { id: 'creative', label: 'Creative', icon: Palette },
];

export const ModeSwitcher = () => {
  const { mode, setMode } = useModeStore();

  return (
    <div className="inline-flex overflow-hidden rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur">
      {modes.map(({ id, label, icon: Icon }) => {
        const active = mode === id;
        return (
          <button
            key={id}
            onClick={() => setMode(id)}
            className={clsx(
              'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition',
              active ? 'bg-accent text-black shadow-sm' : 'text-textSecondary hover:text-white'
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
};
