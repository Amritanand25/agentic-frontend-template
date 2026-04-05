# Baseline Forecast Page

**Type:** Page
**Size:** Medium
**Status:** Draft
**Created:** 2026-04-04
**Priority:** Medium
**Parent:** [module-granary.md](./module-granary.md)

## Overview

The Baseline Forecast page displays a large data grid of article-level demand forecasts with daily date columns. Each row represents a site-article combination, with forecast quantity values for each day. The grid supports horizontal scrolling for date columns and server-side pagination. All data is mock/static.

## Route

`/granary/forecasting/baseline`

## Navigation

Sidebar: Forecasting (expandable) > Baseline Forecast (active)

## Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ Baseline Forecast                                                │
├──────────────────────────────────────────────────────────────────┤
│ [Global Filter Bar: Zone, Format, State, City, Store, Segment]   │
├──────────────────────────────────────────────────────────────────┤
│ Article Forecast List                   [Search...]  [Export]    │
│                                                                  │
│ ┌────────────────────────────────────────────────────────────┐   │
│ │       │         │                    │ 3 Feb  │ 4 Feb  │..│   │
│ │       │         │                    │ 2026   │ 2026   │  │   │
│ │ Site  │ Article │ Article            │ Week 6 │ Week 6 │  │   │
│ │       │ Id      │ Description        │        │        │  │   │
│ ├───────┼─────────┼────────────────────┼────────┼────────┼──┤   │
│ │ 2268  │490176160│ LOOSE SUGAR M      │ 501    │ 437    │  │   │
│ │ 2079  │490176160│ LOOSE SUGAR M      │ 453    │ 524    │  │   │
│ │ 2079  │494626326│ PARAMPARA REFINED..│ 85     │ 137    │  │   │
│ │ 2202  │490174095│ LOOSE LOKWAN GRA.. │ 183    │ 212    │  │   │
│ │ 2202  │494589807│ LOOSE LOKWAN JADOO.│ 172    │ 188    │  │   │
│ │ ...   │ ...     │ ...                │ ...    │ ...    │  │   │
│ └────────────────────────────────────────────────────────────┘   │
│                                                          → scroll│
│ Rows per page [50 v]              1-50 of 92900  Page [1] of 1858│
└──────────────────────────────────────────────────────────────────┘
```

## Data Grid Configuration

### Fixed Columns (left, frozen)

| Column              | Width | Description        |
| ------------------- | ----- | ------------------ |
| Site                | 80px  | Store/site code    |
| Article Id          | 120px | Article identifier |
| Article Description | 280px | Full product name  |

### Dynamic Date Columns (scrollable)

- Each column represents one calendar day
- Header shows: Date (e.g., "3 Feb 2026") on first line, Week label (e.g., "Week 6") on second line
- Width: 100px per date column
- Values: Integer forecast quantities
- Typically 7-14 date columns visible, more via horizontal scroll

### Grid Features

- **Frozen columns:** First 3 columns (Site, Article Id, Article Description) are frozen — remain visible during horizontal scroll
- **Virtual scrolling:** Use `DataGrid` from `@repo/ui` for performance (handles 50+ rows efficiently)
- **Horizontal scroll:** Date columns scroll independently of frozen columns
- **Row height:** 40px
- **Header height:** 56px (two-line headers for dates)

## Design Tokens

| Element              | Token                                                 |
| -------------------- | ----------------------------------------------------- |
| Page title           | `var(--font-size-xl)`, `var(--font-weight-heading)`   |
| Section title        | `var(--font-size-m)`, `var(--font-weight-heading)`    |
| Grid header bg       | `var(--surface-10)`                                   |
| Grid header text     | `var(--font-size-xs)`, `var(--font-weight-prominent)` |
| Grid cell text       | `var(--font-size-s)`, `var(--text-default)`           |
| Grid row border      | `1px solid var(--grey-20)`                            |
| Grid row hover       | `var(--surface-10)`                                   |
| Frozen column border | `2px solid var(--grey-30)` (right edge)               |
| Search input width   | 240px                                                 |
| Export button        | Primary variant                                       |
| Section padding      | `var(--space-16)`                                     |

## Mock Data

Store in `features/granary/mock-data/forecast-mock.ts`:

```typescript
export const mockForecastDates = [
  { date: "2026-02-03", weekLabel: "Week 6" },
  { date: "2026-02-04", weekLabel: "Week 6" },
  { date: "2026-02-05", weekLabel: "Week 6" },
  { date: "2026-02-06", weekLabel: "Week 6" },
  { date: "2026-02-07", weekLabel: "Week 6" },
  { date: "2026-02-08", weekLabel: "Week 6" },
  // ... more dates
];

export const mockForecastRows = [
  {
    site: "2268",
    articleId: "490176160",
    description: "LOOSE SUGAR M",
    forecasts: {
      "2026-02-03": 501,
      "2026-02-04": 437,
      "2026-02-05": 433,
      "2026-02-06": 445,
      "2026-02-07": 499,
      "2026-02-08": 515,
    },
  },
  {
    site: "2079",
    articleId: "490176160",
    description: "LOOSE SUGAR M",
    forecasts: {
      "2026-02-03": 453,
      "2026-02-04": 524,
      "2026-02-05": 399,
      "2026-02-06": 389,
      "2026-02-07": 472,
      "2026-02-08": 219,
    },
  },
  {
    site: "2079",
    articleId: "494626326",
    description: "PARAMPARA REFINED SOYABEAN OIL 800G PCH",
    forecasts: {
      "2026-02-03": 85,
      "2026-02-04": 137,
      "2026-02-05": 431,
      "2026-02-06": 450,
      "2026-02-07": 141,
      "2026-02-08": 90,
    },
  },
  {
    site: "2202",
    articleId: "490174095",
    description: "LOOSE LOKWAN GRADE 1",
    forecasts: {
      "2026-02-03": 183,
      "2026-02-04": 212,
      "2026-02-05": 198,
      "2026-02-06": 203,
      "2026-02-07": 223,
      "2026-02-08": 233,
    },
  },
  {
    site: "2202",
    articleId: "494589807",
    description: "LOOSE LOKWAN JADOO WHEAT 30 KG",
    forecasts: {
      "2026-02-03": 172,
      "2026-02-04": 188,
      "2026-02-05": 194,
      "2026-02-06": 207,
      "2026-02-07": 244,
      "2026-02-08": 235,
    },
  },
  {
    site: "2082",
    articleId: "494626326",
    description: "PARAMPARA REFINED SOYABEAN OIL 800G PCH",
    forecasts: {
      "2026-02-03": 345,
      "2026-02-04": 100,
      "2026-02-05": 242,
      "2026-02-06": 482,
      "2026-02-07": 67,
      "2026-02-08": 44,
    },
  },
  {
    site: "2233",
    articleId: "493691928",
    description: "ANIK SOURABH GOLD MILK 1 L PP",
    forecasts: {
      "2026-02-03": 143,
      "2026-02-04": 144,
      "2026-02-05": 137,
      "2026-02-06": 138,
      "2026-02-07": 152,
      "2026-02-08": 155,
    },
  },
  {
    site: "2268",
    articleId: "490000073",
    description: "TATA IODISED SALT 1 kg PP",
    forecasts: {
      "2026-02-03": 103,
      "2026-02-04": 119,
      "2026-02-05": 80,
      "2026-02-06": 132,
      "2026-02-07": 105,
      "2026-02-08": 117,
    },
  },
  {
    site: "2233",
    articleId: "590002686",
    description: "AMUL GOLD FULL CREAM MILK 1 L PP",
    forecasts: {
      "2026-02-03": 100,
      "2026-02-04": 105,
      "2026-02-05": 98,
      "2026-02-06": 94,
      "2026-02-07": 112,
      "2026-02-08": 111,
    },
  },
  {
    site: "2268",
    articleId: "490174095",
    description: "LOOSE LOKWAN GRADE 1",
    forecasts: {
      "2026-02-03": 107,
      "2026-02-04": 99,
      "2026-02-05": 80,
      "2026-02-06": 97,
      "2026-02-07": 97,
      "2026-02-08": 102,
    },
  },
  {
    site: "2268",
    articleId: "590000597",
    description: "AMUL TAAZA TONED MILK 1 L PCH",
    forecasts: {
      "2026-02-03": 89,
      "2026-02-04": 83,
      "2026-02-05": 92,
      "2026-02-06": 87,
      "2026-02-07": 96,
      "2026-02-08": 98,
    },
  },
];

export const mockForecastPagination = {
  totalRows: 92900,
  totalPages: 1858,
  rowsPerPage: 50,
  currentPage: 1,
};
```

## Components to Reuse

| Component         | Source     | Usage                                  |
| ----------------- | ---------- | -------------------------------------- |
| `DataGrid`        | `@repo/ui` | Main forecast grid with frozen columns |
| `TablePagination` | `@repo/ui` | Bottom pagination                      |
| `Input`           | `@repo/ui` | Search input                           |
| `Button`          | `@repo/ui` | Export button                          |
| `Skeleton`        | `@repo/ui` | Loading state                          |

## File Changes

| File                                          | Action | Details            |
| --------------------------------------------- | ------ | ------------------ |
| `pages/granary/baseline-forecast-page.tsx`    | Create | Page with DataGrid |
| `features/granary/mock-data/forecast-mock.ts` | Create | Mock forecast data |

## Acceptance Criteria

- [ ] Page renders with title "Baseline Forecast" and filter bar
- [ ] DataGrid shows Site, Article Id, Article Description as frozen columns
- [ ] Date columns scroll horizontally while frozen columns remain visible
- [ ] Date column headers show date on first line, week label on second line
- [ ] Search input filters rows by site, article ID, or description
- [ ] Export button is present (primary variant with download icon)
- [ ] Pagination shows "Rows per page" dropdown and page navigation
- [ ] Grid handles 50 rows per page efficiently
- [ ] All data comes from mock data files
