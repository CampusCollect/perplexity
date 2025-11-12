import { create } from 'zustand';

export type OperatingMode = 'Executive' | 'Operator' | 'Analyst' | 'Creative';

interface ModeState {
  mode: OperatingMode;
  setMode: (mode: OperatingMode) => void;
}

export const MODES: OperatingMode[] = ['Executive', 'Operator', 'Analyst', 'Creative'];

export const useModeStore = create<ModeState>((set) => ({
  mode: 'Executive',
  setMode: (mode) => set({ mode }),
}));
