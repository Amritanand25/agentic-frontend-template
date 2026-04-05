import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GranaryFilters, GranaryFilterKey } from "../types";

interface GranaryFilterState {
  filters: GranaryFilters;
  setFilter: (key: GranaryFilterKey, value: string | undefined) => void;
  clearFilter: (key: GranaryFilterKey) => void;
  clearAllFilters: () => void;
  activeFilterCount: () => number;
}

export const useGranaryFilterStore = create<GranaryFilterState>()(
  persist(
    (set, get) => ({
      filters: {},
      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),
      clearFilter: (key) =>
        set((state) => {
          const next = { ...state.filters };
          delete next[key];
          return { filters: next };
        }),
      clearAllFilters: () => set({ filters: {} }),
      activeFilterCount: () =>
        Object.values(get().filters).filter(Boolean).length,
    }),
    {
      name: "granary-filters",
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) =>
          sessionStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    },
  ),
);
