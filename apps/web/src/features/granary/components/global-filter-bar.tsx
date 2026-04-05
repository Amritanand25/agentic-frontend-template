import { FilterPill, Button } from "@repo/ui";
import type { FilterPillOption } from "@repo/ui";
import { useGranaryFilters } from "../hooks/use-granary-filters";
import type { GranaryFilterKey } from "../types";

const FILTER_CONFIG: Record<
  GranaryFilterKey,
  { label: string; options: FilterPillOption[] }
> = {
  zone: {
    label: "Zone",
    options: [
      { label: "West", value: "WEST" },
      { label: "East", value: "EAST" },
      { label: "North", value: "NORTH" },
      { label: "South", value: "SOUTH" },
    ],
  },
  format: {
    label: "Format",
    options: [
      { label: "SMART", value: "SMART" },
      { label: "SMART BAZAAR", value: "SMART_BAZAAR" },
      { label: "Hypermarket", value: "HYPERMARKET" },
    ],
  },
  state: {
    label: "State",
    options: [
      { label: "MUM", value: "MUM" },
      { label: "DEL", value: "DEL" },
      { label: "BLR", value: "BLR" },
      { label: "CHN", value: "CHN" },
    ],
  },
  city: {
    label: "City",
    options: [
      { label: "Mumbai", value: "MUMBAI" },
      { label: "Delhi", value: "DELHI" },
      { label: "Bangalore", value: "BANGALORE" },
      { label: "Chennai", value: "CHENNAI" },
    ],
  },
  store: {
    label: "Store",
    options: [
      { label: "RCP", value: "RCP" },
      { label: "Acme Mall", value: "ACME" },
      { label: "Phoenix Market City", value: "PHOENIX" },
    ],
  },
  segment: {
    label: "Segment",
    options: [
      { label: "Grocery", value: "GROCERY" },
      { label: "FMCG", value: "FMCG" },
      { label: "Fresh", value: "FRESH" },
    ],
  },
  category: {
    label: "Category",
    options: [
      { label: "Food", value: "FOOD" },
      { label: "Non-Food", value: "NON_FOOD" },
      { label: "Consumables", value: "CONSUMABLES" },
      { label: "Packaging", value: "PACKAGING" },
    ],
  },
  period: {
    label: "Period",
    options: [
      { label: "WTD", value: "WTD" },
      { label: "MTD", value: "MTD" },
      { label: "QTD", value: "QTD" },
      { label: "YTD", value: "YTD" },
    ],
  },
};

interface GranaryFilterBarProps {
  visibleFilters: GranaryFilterKey[];
}

export function GranaryFilterBar({ visibleFilters }: GranaryFilterBarProps) {
  const { filters, setFilter, clearFilter, clearAll, activeCount } =
    useGranaryFilters({ visibleFilters });

  return (
    <div
      className="flex flex-wrap items-center"
      style={{ gap: "var(--space-8)" }}
    >
      {visibleFilters.map((key) => {
        const config = FILTER_CONFIG[key];
        const currentValue = filters[key];

        return (
          <FilterPill
            key={key}
            placeholder={config.label}
            variant="single"
            options={config.options}
            selectedValues={currentValue ? [currentValue] : []}
            onChange={(values) => {
              const val = values[0];
              if (val) {
                setFilter(key, val);
              } else {
                clearFilter(key);
              }
            }}
          />
        );
      })}
      {activeCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAll}
          style={{ color: "var(--primary-50)", fontSize: "var(--font-size-s)" }}
        >
          Clear All
        </Button>
      )}
    </div>
  );
}
