# Dashboard Page

**Type:** Page
**Size:** Large
**Status:** Draft
**Created:** 2026-04-04
**Priority:** High
**Parent:** [module-granary.md](./module-granary.md)

## Overview

The Granary Dashboard provides a high-level performance overview of the grocery business. It shows KPI metric cards, year-over-year performance comparison, top brand performance table, and sales trend analysis chart. All data is mock/static - no backend API.

## Route

`/granary/dashboard`

## Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ Dashboard                                Mar 30, 2026 - Apr 3   │
├──────────────────────────────────────────────────────────────────┤
│ [Global Filter Bar]                                              │
├──────────────────────────────────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│ │Total     │ │Sales     │ │Markdown  │ │Active    │            │
│ │Sales (?) │ │Qty (?)   │ │(?)       │ │SKUs (?)  │            │
│ │₹0.00 Cr  │ │0.00 L    │ │₹0.00 Cr  │ │84,672    │            │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘            │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐                         │
│ │Avg ROS   │ │Avg DOH   │ │Availab.  │                         │
│ │(90d) (?) │ │(90d) (?) │ │(90d) (?) │                         │
│ │0.68      │ │21 days   │ │57.23%    │                         │
│ └──────────┘ └──────────┘ └──────────┘                         │
├───────────────────────────┬──────────────────────────────────────┤
│ Overall Performance       │ Brand Performance (Top 50)           │
│ (CY vs LY)               │ [Search by brand name or ID]         │
│                           │                                      │
│ Total Net Sales           │ Brand ID | Brand Name | CY Sales |  │
│ ₹0.00 vs ₹8.94 Cr  ──── │ CY Margin | LY Sales                │
│                           │ 06688  LOOSE   ₹19.83L  7.74%      │
│ Category Contribution     │ A989   Good L. ₹13.60L  1.80%      │
│ ₹0.00 vs ₹8.94 Cr  ──── │ 02010  AMUL    ₹8.26L  -0.58%      │
│                           │ ...                                  │
├───────────────────────────┴──────────────────────────────────────┤
│ Sales Trend Analysis                                             │
│ [Quantity] [Sales]                                               │
│                                                                  │
│  ₹18.00 Cr ─┤                                                   │
│  ₹13.50 Cr ─┤     ╭──╮                                         │
│   ₹9.00 Cr ─┤    ╱    ╲──────╮  ╭──╮                           │
│   ₹4.50 Cr ─┤   ╱             ╲╱    ╲                          │
│   ₹0.00    ─┼──╱                      ╲──                      │
│              W3 W4 W5 W6 W7 W8 W9 W10 W11 W12 W13 W14         │
│              ── Last Year Sales  ── Current Sales                │
└──────────────────────────────────────────────────────────────────┘
```

## Sections

### 1. Page Header

- Title: "Dashboard" (left-aligned)
- Date range: "Mar 30, 2026 - Apr 3, 2026" (right-aligned, `var(--text-subdued-1)`)
- Date range is derived from the Period filter selection

### 2. KPI Cards Row

7 KPI cards in a responsive grid (4 columns on desktop, wrap on smaller screens).

Each KPI card:

- Label text with tooltip icon `(?)` explaining the metric
- Value with unit suffix
- Card background: `var(--surface-0)`
- Subtle border: `1px solid var(--grey-20)`
- Padding: `var(--space-16)`
- Border-radius: `var(--radius-8)`

| KPI                    | Value  | Unit    | Tooltip                                     |
| ---------------------- | ------ | ------- | ------------------------------------------- |
| Total Sales            | 0.00   | Cr (₹)  | Total revenue for the selected period       |
| Sales Quantity         | 0.00   | L       | Total units sold in the period              |
| Markdown               | 0.00   | Cr (₹)  | Total markdown/discount value               |
| Active SKUs (90 days)  | 84,672 | count   | SKUs with at least one sale in last 90 days |
| Average ROS (90 days)  | 0.68   | decimal | Average Rate of Sale per SKU over 90 days   |
| Average DOH (90 days)  | 21     | days    | Average Days on Hand across all SKUs        |
| Availability (90 days) | 57.23  | %       | Percentage of time items were in stock      |

### 3. Overall Performance (Current Year vs Last Year)

Left card in a 2-column layout.

**Title:** "Overall Performance (Current year vs Last year)"

Two comparison rows:

- **Total Net Sales:** Current value (₹0.00) + "vs" + last year value (₹8.94 Cr) + progress bar
- **Category Contribution:** Current value (₹0.00) + "vs" + last year value (₹8.94 Cr) + progress bar

Progress bar: `Progress` from `@repo/ui`, shows ratio of current vs last year. Color: `var(--primary-50)`.

### 4. Brand Performance (Top 50)

Right card in the 2-column layout.

**Header:** "Brand Performance (Top 50)" + search input ("Search by brand name or ID")

**Table columns:**
| Column | Width | Align |
| --- | --- | --- |
| Brand ID | 100px | Left |
| Brand Name | flex | Left |
| CY Sales | 120px | Right |
| CY Margin | 100px | Right |
| LY Sales | 120px | Right |

- Table scrollable within the card (fixed height ~400px)
- Search filters rows client-side
- CY Margin shows percentage, can be negative (red for negative)

### 5. Sales Trend Analysis

Full-width chart card.

**Header:** "Sales Trend Analysis"

**Toggle:** `ToggleGroup` with "Quantity" | "Sales" options (Sales selected by default)

**Chart:** Line chart using `ChartContainer` + Recharts:

- X-axis: Weekly labels (W3, W4, ..., W14)
- Y-axis: Currency values (₹ Cr) or quantity depending on toggle
- Two lines:
  - "Last Year Sales" — lighter color (`var(--tertiary-40)`)
  - "Current Sales" — darker color (`var(--primary-50)`)
- Legend at bottom showing both line labels with color indicators
- Tooltip on hover showing exact values

## Design Tokens

| Element                | Token                                                                      |
| ---------------------- | -------------------------------------------------------------------------- |
| Page title             | `var(--font-size-xl)`, `var(--font-weight-heading)`                        |
| Date range text        | `var(--font-size-s)`, `var(--text-subdued-1)`                              |
| KPI card bg            | `var(--surface-0)`                                                         |
| KPI card border        | `1px solid var(--grey-20)`                                                 |
| KPI card radius        | `var(--radius-8)`                                                          |
| KPI card padding       | `var(--space-16)`                                                          |
| KPI label              | `var(--font-size-xs)`, `var(--text-subdued-1)`                             |
| KPI value              | `var(--font-size-xl)`, `var(--font-weight-heading)`, `var(--text-default)` |
| Section card bg        | `var(--surface-0)`                                                         |
| Section card radius    | `var(--radius-12)`                                                         |
| Section card padding   | `var(--space-24)`                                                          |
| Section title          | `var(--font-size-m)`, `var(--font-weight-heading)`                         |
| "vs" text              | `var(--text-subdued-2)`                                                    |
| Comparison value       | `var(--text-subdued-1)`                                                    |
| Progress bar color     | `var(--primary-50)`                                                        |
| Progress bar bg        | `var(--grey-20)`                                                           |
| Chart line (current)   | `var(--primary-50)`                                                        |
| Chart line (last year) | `var(--tertiary-40)`                                                       |
| Negative margin color  | `var(--error-50)`                                                          |
| Grid gap               | `var(--space-16)`                                                          |
| Section gap            | `var(--space-24)`                                                          |

## Mock Data

Store in `features/granary/mock-data/dashboard-mock.ts`:

```typescript
export const mockKPIs = [
  {
    label: "Total Sales",
    value: 0.0,
    unit: "Cr",
    prefix: "₹",
    tooltip: "Total revenue for the selected period",
  },
  {
    label: "Sales Quantity",
    value: 0.0,
    unit: "L",
    tooltip: "Total units sold in the period",
  },
  {
    label: "Markdown",
    value: 0.0,
    unit: "Cr",
    prefix: "₹",
    tooltip: "Total markdown/discount value",
  },
  {
    label: "Active SKUs",
    value: 84672,
    unit: "",
    period: "90 days",
    tooltip: "SKUs with at least one sale in last 90 days",
  },
  {
    label: "Average ROS",
    value: 0.68,
    unit: "",
    period: "90 days",
    tooltip: "Average Rate of Sale per SKU over 90 days",
  },
  {
    label: "Average DOH",
    value: 21,
    unit: "days",
    period: "90 days",
    tooltip: "Average Days on Hand across all SKUs",
  },
  {
    label: "Availability",
    value: 57.23,
    unit: "%",
    period: "90 days",
    tooltip: "Percentage of time items were in stock",
  },
];

export const mockOverallPerformance = {
  totalNetSales: { current: 0.0, lastYear: 8.94, unit: "Cr" },
  categoryContribution: { current: 0.0, lastYear: 8.94, unit: "Cr" },
};

export const mockBrandPerformance = [
  {
    brandId: "06688",
    brandName: "LOOSE",
    cySales: 19.83,
    cyMargin: 7.74,
    lySales: 11.58,
  },
  {
    brandId: "A989",
    brandName: "Good Life",
    cySales: 13.6,
    cyMargin: 1.8,
    lySales: 12.49,
  },
  {
    brandId: "02010",
    brandName: "AMUL",
    cySales: 8.26,
    cyMargin: -0.58,
    lySales: 6.06,
  },
  {
    brandId: "02265",
    brandName: "FORTUNE",
    cySales: 7.98,
    cyMargin: 8.76,
    lySales: 2.23,
  },
  {
    brandId: "02816",
    brandName: "GOWARDHAN",
    cySales: 3.88,
    cyMargin: 6.73,
    lySales: 2.2,
  },
  {
    brandId: "06515",
    brandName: "LOOSE",
    cySales: 3.74,
    cyMargin: 9.05,
    lySales: 1.78,
  },
];

export const mockSalesTrend = {
  weeks: [
    "W3",
    "W4",
    "W5",
    "W6",
    "W7",
    "W8",
    "W9",
    "W10",
    "W11",
    "W12",
    "W13",
    "W14",
  ],
  lastYear: [
    9.0, 15.5, 12.0, 11.5, 10.0, 7.5, 9.5, 11.0, 10.5, 12.0, 11.0, 10.5,
  ],
  current: [0, 0, 0, 0, 0, 0, 0, 9.0, 7.0, 12.0, 14.0, 4.5],
};
```

## Components to Reuse

| Component                                                                 | Source     | Usage                       |
| ------------------------------------------------------------------------- | ---------- | --------------------------- |
| `Card`, `CardHeader`, `CardTitle`, `CardContent`                          | `@repo/ui` | All section cards           |
| `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell`, `TableHead` | `@repo/ui` | Brand performance table     |
| `Input`                                                                   | `@repo/ui` | Brand search                |
| `Progress`                                                                | `@repo/ui` | Performance comparison bars |
| `Tooltip`, `TooltipTrigger`, `TooltipContent`                             | `@repo/ui` | KPI tooltips                |
| `ToggleGroup`, `ToggleGroupItem`                                          | `@repo/ui` | Quantity/Sales toggle       |
| `ChartContainer`, `ChartTooltip`, `ChartLegend`                           | `@repo/ui` | Sales trend chart           |
| `Badge`                                                                   | `@repo/ui` | Period indicator            |
| `Skeleton`                                                                | `@repo/ui` | Loading state               |
| `ScrollArea`                                                              | `@repo/ui` | Brand table scroll          |

## New Components to Create

| Component               | File                                                     | Purpose                                                  |
| ----------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `KPICard`               | `features/granary/components/kpi-card.tsx`               | Reusable metric card with label, value, tooltip          |
| `KPICardGrid`           | `features/granary/components/kpi-card-grid.tsx`          | Grid layout for KPI cards                                |
| `PerformanceComparison` | `features/granary/components/performance-comparison.tsx` | CY vs LY with progress bars                              |
| `SalesTrendChart`       | `features/granary/components/sales-trend-chart.tsx`      | Reusable line chart (used on dashboard + category pages) |

## File Changes

| File                                                     | Action | Details             |
| -------------------------------------------------------- | ------ | ------------------- |
| `pages/granary/dashboard-page.tsx`                       | Create | Page composition    |
| `features/granary/components/kpi-card.tsx`               | Create | KPI metric card     |
| `features/granary/components/kpi-card-grid.tsx`          | Create | KPI cards grid      |
| `features/granary/components/performance-comparison.tsx` | Create | CY vs LY comparison |
| `features/granary/components/sales-trend-chart.tsx`      | Create | Line chart          |
| `features/granary/mock-data/dashboard-mock.ts`           | Create | Mock data           |

## Acceptance Criteria

- [ ] Dashboard page renders with filter bar, KPI cards, performance, brands, and chart
- [ ] 7 KPI cards display with correct values, units, and tooltip icons
- [ ] Hovering tooltip icon shows metric description
- [ ] Overall Performance shows CY vs LY with progress bars
- [ ] Brand Performance table is searchable by brand name or ID
- [ ] Negative CY Margin values display in red
- [ ] Sales Trend chart toggles between Quantity and Sales views
- [ ] Chart shows two lines (Last Year Sales, Current Sales) with legend
- [ ] Date range displays in the top-right corner
- [ ] All data comes from mock data files
