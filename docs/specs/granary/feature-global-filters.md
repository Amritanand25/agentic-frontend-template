# Global Filter Bar

**Type:** Feature
**Size:** Medium
**Status:** Draft
**Created:** 2026-04-04
**Priority:** High
**Parent:** [module-granary.md](./module-granary.md)

## Overview

A shared, persistent filter bar component used across all Granary pages. Provides hierarchical filtering by Zone, Format, State, City, Store, Segment, Category, and Period. Filter selections persist across page navigation via a Zustand store.

## Requirements

- [ ] Render filter bar at the top of every Granary page (below page title)
- [ ] Each filter is a dropdown using `FilterPill` from `@repo/ui`
- [ ] Applied filters show as pills with `x` button to remove
- [ ] "Clear All" link appears when any filter is active — resets all filters
- [ ] Filter state persists across page navigation (Zustand store)
- [ ] Filters are hierarchical: Zone → State → City → Store (selecting Zone narrows State options, etc.)
- [ ] Each page can configure which filters are visible (e.g., Dashboard shows Period, Forecast does not)
- [ ] Filter changes trigger data refetch on the active page via TanStack Query key invalidation

## Visual Design

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Zone v] [Format v] [State: MUM ✕] [City v] [Store v] [Segment v]    │
│ [Category v] [Period: WTD ✕]  Clear All                               │
└─────────────────────────────────────────────────────────────────────────┘
```

- Inactive filters: outline style dropdown trigger
- Active filters: filled pill with value text + close icon (e.g., `State: MUM ✕`)
- Active pill background: `var(--primary-10)`, border: `var(--primary-50)`, text: `var(--text-default)`
- Inactive pill: border `var(--grey-40)`, text: `var(--text-subdued-1)`
- "Clear All" link: `var(--primary-50)`, appears only when 1+ filters active

## Design Tokens

| Element                | Token                                     |
| ---------------------- | ----------------------------------------- |
| Filter bar gap         | `var(--space-8)` (8px) between pills      |
| Filter bar padding     | `var(--space-16)` vertical, 0 horizontal  |
| Inactive pill border   | `var(--grey-40)`                          |
| Inactive pill text     | `var(--text-subdued-1)`                   |
| Active pill background | `var(--primary-10)`                       |
| Active pill border     | `var(--primary-50)`                       |
| Active pill text       | `var(--text-default)`                     |
| Close icon size        | 14px                                      |
| Clear All text         | `var(--primary-50)`, `var(--font-size-s)` |
| Dropdown content bg    | `var(--surface-0)`                        |
| Dropdown item hover    | `var(--surface-10)`                       |
| Pill height            | `var(--height-s)` (32px)                  |

## Filter Configuration Per Page

| Page              | Filters Shown                                               |
| ----------------- | ----------------------------------------------------------- |
| Home              | Zone, Format, State, City, Store, Segment, Category, Period |
| Dashboard         | Zone, Format, State, City, Store, Segment, Category, Period |
| Baseline Forecast | Zone, Format, State, City, Store, Segment                   |
| Category Overview | Zone, Format, State, City, Store, Segment, Period           |
| Range Review      | Zone, Format, State, City, Store, Segment, Category         |
| Requests          | Zone, Format, State, City, Store, Category                  |

## Components to Reuse

| Component    | Source     | Usage                          |
| ------------ | ---------- | ------------------------------ |
| `FilterPill` | `@repo/ui` | Each filter dropdown           |
| `Button`     | `@repo/ui` | Clear All (ghost variant)      |
| `Badge`      | `@repo/ui` | Active filter count (optional) |

## State Management

### Zustand Store: `granary-filter-store.ts`

```typescript
interface GranaryFilterState {
  filters: {
    zone?: string;
    format?: string;
    state?: string;
    city?: string;
    store?: string;
    segment?: string;
    category?: string;
    period?: string;
  };
  setFilter: (key: string, value: string | undefined) => void;
  clearFilter: (key: string) => void;
  clearAllFilters: () => void;
  activeFilterCount: () => number;
}
```

- Persisted using Zustand `persist` middleware with `sessionStorage`
- Storage key: `granary-filters`
- Cleared on workspace switch

### Filter Options API

```typescript
// Each filter fetches options from API, passing parent filter values
["granary", "filter-options", "zone"][
  ("granary", "filter-options", "state", { zone })
][("granary", "filter-options", "city", { zone, state })][
  ("granary", "filter-options", "store", { zone, state, city })
][("granary", "filter-options", "format")][
  ("granary", "filter-options", "segment")
][("granary", "filter-options", "category")];
```

## Hook: `useGranaryFilters`

```typescript
interface UseGranaryFiltersOptions {
  visibleFilters: Array<
    | "zone"
    | "format"
    | "state"
    | "city"
    | "store"
    | "segment"
    | "category"
    | "period"
  >;
}

// Returns filter state + filter bar props
const { filters, setFilter, clearFilter, clearAll, activeCount } =
  useGranaryFilters({
    visibleFilters: [
      "zone",
      "format",
      "state",
      "city",
      "store",
      "segment",
      "category",
      "period",
    ],
  });
```

## File Changes

| File                                                | Action | Details                  |
| --------------------------------------------------- | ------ | ------------------------ |
| `features/granary/components/global-filter-bar.tsx` | Create | Filter bar UI component  |
| `features/granary/stores/granary-filter-store.ts`   | Create | Zustand filter store     |
| `features/granary/hooks/use-granary-filters.ts`     | Create | Filter state hook        |
| `features/granary/api/filter-api.ts`                | Create | Filter options API calls |

## Interaction States

| State               | Behavior                                                  |
| ------------------- | --------------------------------------------------------- |
| Default             | All pills show as outline dropdowns with placeholder text |
| Filter selected     | Pill becomes filled with value + close icon               |
| Hover on pill       | Background: `var(--surface-10)`                           |
| Hover on close icon | Icon color darkens                                        |
| Dropdown open       | Shows searchable list of options                          |
| Loading options     | Spinner inside dropdown content                           |
| No options          | "No options available" text                               |
| Clear All hover     | Underline appears                                         |

## Acceptance Criteria

- [ ] Filter bar renders consistently across all Granary pages
- [ ] Selecting a filter updates the pill to show the value with close icon
- [ ] Removing a filter (close icon) clears that filter and refetches data
- [ ] "Clear All" resets all filters and refetches data
- [ ] Filter state persists when navigating between Granary pages
- [ ] Hierarchical filtering works (selecting Zone narrows State options)
- [ ] Each page can configure which filters are visible
