import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Mode = 'executive' | 'operator' | 'analyst' | 'creative';

interface ModeState {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export const useModeStore = create<ModeState>()(
  persist(
    (set) => ({
      mode: 'executive',
      setMode: (mode) => set({ mode }),
    }),
    {
      name: 'mode-preference',
    }
  )
);
