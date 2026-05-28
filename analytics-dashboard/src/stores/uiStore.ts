import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Period, SortKey, SortDir } from '../types';

interface UIState {
  theme: 'light' | 'dark';
  period: Period;
  sortKey: SortKey;
  sortDir: SortDir;
  search: string;
  toggleTheme: () => void;
  setPeriod: (p: Period) => void;
  setSort: (key: SortKey) => void;
  setSearch: (s: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      period: '7',
      sortKey: 'market_cap',
      sortDir: 'desc',
      search: '',
      toggleTheme: () => set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),
      setPeriod: (period) => set({ period }),
      setSort: (key) =>
        set((s) => ({
          sortKey: key,
          sortDir: s.sortKey === key && s.sortDir === 'desc' ? 'asc' : 'desc',
        })),
      setSearch: (search) => set({ search }),
    }),
    { name: 'ui-store', partialize: (s: UIState) => ({ theme: s.theme }) }
  )
);
