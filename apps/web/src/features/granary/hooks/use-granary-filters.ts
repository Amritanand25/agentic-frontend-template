import { useGranaryFilterStore } from "../stores/granary-filter-store";
import type { GranaryFilterKey } from "../types";

interface UseGranaryFiltersOptions {
  visibleFilters: GranaryFilterKey[];
}

export function useGranaryFilters({
  visibleFilters,
}: UseGranaryFiltersOptions) {
  const filters = useGranaryFilterStore((s) => s.filters);
  const setFilter = useGranaryFilterStore((s) => s.setFilter);
  const clearFilter = useGranaryFilterStore((s) => s.clearFilter);
  const clearAll = useGranaryFilterStore((s) => s.clearAllFilters);
  const activeCount = useGranaryFilterStore((s) => s.activeFilterCount)();

  return {
    filters,
    setFilter,
    clearFilter,
    clearAll,
    activeCount,
    visibleFilters,
  };
}
