# Category Overview & Sub Category Detail Pages

**Type:** Page
**Size:** Large
**Status:** Draft
**Created:** 2026-04-04
**Priority:** High
**Parent:** [module-granary.md](./module-granary.md)

## Overview

The Category Overview page shows aggregated performance data for a selected product category, including business format sales, sub-category breakdowns, sales trends, gross margin charts, and regional performance. Users can drill down into individual sub-categories for deeper analysis. All data is mock/static.

## Routes

- Category Overview: `/granary/assortment/category`
- Sub Category Detail: `/granary/assortment/category/:categoryId/sub/:subCategoryId`

## Navigation

Sidebar: Assortment Intelligence (expandable) > Category Overview (active)

---

## Part 1: Category Overview Page

### Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ Category Overview: Food                                          │
├──────────────────────────────────────────────────────────────────┤
│ [Zone v] [Format v] [State: MUM ✕] [City v] [Store v]          │
│ [Segment v] [Period: WTD ✕]  Clear All                          │
├──────────────────────────────────────────────────────────────────┤
│ Business Format Sales                               [Export]     │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ Format Name │ No. of │ No. of    │ Total  │ Sales  │ Gross  ││
│ │             │Articles│ Locations │ Sales  │ Qty    │ Margin ││
│ ├─────────────┼────────┼───────────┼────────┼────────┼────────┤│
│ │ SMART       │ 405    │ 8         │ ₹0.00  │ 3.00 L │ ₹0.00  ││
│ │ SMART BAZAAR│ 319    │ 3         │ ₹0.00  │ 1.03 L │ ₹0.00  ││
│ └──────────────────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────┤
│ Sub-Category List               [Search...]          [Export]    │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ Sub Category │ No. of  │ Total  │ Sales  │ Gross   │Actions ││
│ │ Name         │ Articles│ Sales  │ Qty    │ Margin %│        ││
│ ├──────────────┼─────────┼────────┼────────┼─────────┼────────┤│
│ │ BISCUITS     │ 536     │ ₹0.00  │ 0      │ 0%      │View    ││
│ │ BRANDED BAK. │ 3       │ ₹0.00  │ 0      │ 0%      │View    ││
│ └──────────────────────────────────────────────────────────────┘ │
│ Rows per page [50 v]              1-2 of 2  Page [1] of 1       │
├──────────────────────────────────────────────────────────────────┤
│ Sales Trend Analysis          │ Gross Margin Performance         │
│ [Quantity] [Sales]            │ [Value] [Percentage]             │
│ ┌──────────────────────┐     │ ┌──────────────────────┐         │
│ │ Line chart           │     │ │ Bar chart             │         │
│ │ LY Sales vs Current  │     │ │ Last Year vs Current  │         │
│ │ W3-W14               │     │ │ W3-W14                │         │
│ └──────────────────────┘     │ └──────────────────────┘         │
├──────────────────────────────┼───────────────────────────────────┤
│ Region Wise Performance      │ Overstocked Stores                │
│ ┌──────────────────────┐     │ ┌──────────────────────┐         │
│ │ Region│ Qty │ Sales  │     │ │ FR00 - SBZ-DOMB ████ │         │
│ │ MUM   │ 0   │ ₹0.00 │     │ │ TAJF - Smart B. ███  │         │
│ │       │     │        │     │ │ 5518 - RCP      ██   │         │
│ └──────────────────────┘     │ └──────────────────────┘         │
└──────────────────────────────┴───────────────────────────────────┘
```

### Sections

#### 1. Page Header

- Title: "Category Overview: {Category Name}" (e.g., "Category Overview: Food")
- Category name comes from the selected Category filter or defaults to the first category

#### 2. Business Format Sales Table

**Header:** "Business Format Sales" + Export button (right-aligned)

| Column           | Width | Align | Format                 |
| ---------------- | ----- | ----- | ---------------------- |
| Format Name      | flex  | Left  | Text                   |
| No. of Articles  | 120px | Right | Number                 |
| No. of Locations | 130px | Right | Number                 |
| Total Sales      | 120px | Right | ₹ currency             |
| Sales Quantity   | 130px | Right | Number with L/K suffix |
| Gross Margin     | 120px | Right | ₹ currency             |
| Gross Margin %   | 130px | Right | Percentage             |

#### 3. Sub-Category List Table

**Header:** "Sub-Category List" + Search input + Export button

| Column            | Width | Align  | Format              |
| ----------------- | ----- | ------ | ------------------- |
| Sub Category Name | flex  | Left   | Text                |
| No. of Articles   | 120px | Right  | Number              |
| Total Sales       | 120px | Right  | ₹ currency          |
| Sales Quantity    | 120px | Right  | Number              |
| Gross Margin %    | 120px | Right  | Percentage          |
| Actions           | 100px | Center | "View Details" link |

- "View Details" link navigates to Sub Category Detail page
- Link color: `var(--primary-50)`
- Search filters by sub-category name
- Includes `TablePagination`

#### 4. Sales Trend Analysis (left card)

Same chart as Dashboard — reuses `SalesTrendChart` component.

- Toggle: Quantity | Sales
- Line chart with Last Year Sales vs Current Sales
- Weekly x-axis (W3-W14)

#### 5. Gross Margin Performance (right card)

**Header:** "Gross Margin Performance"

**Toggle:** `ToggleGroup` with "Value" | "Percentage"

**Chart:** Bar chart using `ChartContainer` + Recharts `BarChart`:

- X-axis: Weekly labels (W3-W14)
- Y-axis: ₹ value or percentage depending on toggle
- Two bar groups per week:
  - "Last Year" — `var(--tertiary-40)` (lighter teal)
  - "Current Year" — `var(--primary-50)` (darker blue/purple)
- Legend at bottom

#### 6. Region Wise Performance (left card, bottom)

Small table card:

| Column   | Width | Align |
| -------- | ----- | ----- |
| Region   | flex  | Left  |
| Quantity | 100px | Right |
| Sales    | 120px | Right |

#### 7. Overstocked Stores (right card, bottom)

Horizontal bar chart showing store names/codes with bar length proportional to overstock level.

- Bar color: `var(--secondary-50)` (orange)
- Store labels: "{code} - {name}" format
- Top 5-10 stores shown

---

## Part 2: Sub Category Detail Page

### Route

`/granary/assortment/category/:categoryId/sub/:subCategoryId`

### Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ ← Sub Category: BISCUITS                                        │
├──────────────────────────────────────────────────────────────────┤
│ [Global Filter Bar]                                              │
├──────────────────────────────────────────────────────────────────┤
│ Business Format Sales                               [Export]     │
│ (same table as Category Overview)                                │
├──────────────────────────────────────────────────────────────────┤
│ Sales Trend Analysis          │ Gross Margin Performance         │
│ (same as Category Overview)   │ (same as Category Overview)      │
├──────────────────────────────────────────────────────────────────┤
│ Brick Performance                       [Search...]  [Export]    │
│ [All] [Top 10 bricks] [Bottom 10 bricks] [New bricks]          │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ Brick Code│Brick Name│First Sales│Sales     │Total  │Sales  ││
│ │           │          │Date       │Contrib.  │Sales  │Qty    ││
│ ├───────────┼──────────┼───────────┼──────────┼───────┼───────┤│
│ │ (No results for "Top 10 bricks" filter)                      ││
│ └──────────────────────────────────────────────────────────────┘ │
├──────────────────────────────┬───────────────────────────────────┤
│ Region Wise Performance      │ Overstocked Stores                │
│ (same as Category Overview)  │ (same as Category Overview)       │
└──────────────────────────────┴───────────────────────────────────┘
```

### Page Header

- Back arrow icon (left) — navigates back to Category Overview
- Title: "Sub Category: {name}" (e.g., "Sub Category: BISCUITS")
- Uses `TitleBar` from `@repo/ui` with `onBack` prop

### Brick Performance Table (unique to sub-category detail)

**Header:** "Brick Performance" + Search + Export

**Filter pills:** `ToggleGroup` (single select) with options:

- All (default)
- Top 10 bricks
- Bottom 10 bricks
- New bricks

| Column             | Width | Align | Format     |
| ------------------ | ----- | ----- | ---------- |
| Brick Code         | 120px | Left  | Text       |
| Brick Name         | flex  | Left  | Text       |
| First Sales Date   | 140px | Left  | Date       |
| Sales Contribution | 150px | Right | Percentage |
| Total Sales        | 120px | Right | ₹ currency |
| Sales Qty          | 100px | Right | Number     |

- Shows `EmptyState` when no results for a filter (e.g., "No results.")

All other sections (Business Format Sales, Sales Trend, Gross Margin, Region, Overstocked) are identical to the Category Overview page — reuse the same components.

## Design Tokens

| Element               | Token                                                 |
| --------------------- | ----------------------------------------------------- |
| Page title            | `var(--font-size-xl)`, `var(--font-weight-heading)`   |
| Section title         | `var(--font-size-m)`, `var(--font-weight-heading)`    |
| Section card bg       | `var(--surface-0)`                                    |
| Section card radius   | `var(--radius-12)`                                    |
| Section card padding  | `var(--space-24)`                                     |
| Table header bg       | `var(--surface-10)`                                   |
| Table header text     | `var(--font-size-xs)`, `var(--font-weight-prominent)` |
| Table cell text       | `var(--font-size-s)`                                  |
| "View Details" link   | `var(--primary-50)`                                   |
| Back arrow            | `var(--text-default)`, 20px                           |
| Filter pill active bg | `var(--primary-50)`, text `var(--surface-0)`          |
| Filter pill inactive  | `var(--grey-40)` border, `var(--text-default)` text   |
| Overstocked bar       | `var(--secondary-50)` (orange)                        |
| Chart last year color | `var(--tertiary-40)`                                  |
| Chart current color   | `var(--primary-50)`                                   |
| Two-column gap        | `var(--space-16)`                                     |
| Section gap           | `var(--space-24)`                                     |

## Mock Data

Store in `features/granary/mock-data/category-mock.ts`:

```typescript
export const mockBusinessFormats = [
  {
    formatName: "SMART",
    articleCount: 405,
    locationCount: 8,
    totalSales: 0.0,
    salesQuantity: 300000,
    grossMargin: 0.0,
    grossMarginPct: 0,
  },
  {
    formatName: "SMART BAZAAR",
    articleCount: 319,
    locationCount: 3,
    totalSales: 0.0,
    salesQuantity: 103000,
    grossMargin: 0.0,
    grossMarginPct: 0,
  },
];

export const mockSubCategories = [
  {
    name: "BISCUITS",
    articleCount: 536,
    totalSales: 0.0,
    salesQuantity: 0,
    grossMarginPct: 0,
  },
  {
    name: "BRANDED BAKERY",
    articleCount: 3,
    totalSales: 0.0,
    salesQuantity: 0,
    grossMarginPct: 0,
  },
];

export const mockCategorySalesTrend = {
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
    25.5, 34.0, 29.0, 27.5, 25.5, 22.0, 25.0, 24.0, 22.5, 25.0, 21.0, 20.0,
  ],
  current: [0, 0, 0, 0, 0, 0, 0, 17.0, 14.0, 22.5, 25.0, 10.0],
};

export const mockGrossMarginData = {
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
  lastYear: [0.5, 1.2, 1.3, 1.4, 1.5, 1.6, 1.5, 1.6, 1.7, 2.0, 2.2, 2.3],
  current: [0, 0.2, 1.1, 1.2, 1.3, 1.4, 1.5, 1.5, 1.6, 2.1, 2.4, 2.55],
};

export const mockRegionPerformance = [
  { region: "MUM", quantity: 0, sales: 0.0 },
];

export const mockOverstockedStores = [
  { code: "FR00", name: "SBZ-DOMBIVILI-LODHA", value: 85 },
  { code: "TAJF", name: "Smart Badlapur West", value: 78 },
  { code: "5518", name: "RCP", value: 65 },
];

export const mockBrickPerformance = [
  // Empty for "Top 10 bricks" filter to demonstrate empty state
];
```

## Components to Reuse

| Component                                                                 | Source     | Usage                              |
| ------------------------------------------------------------------------- | ---------- | ---------------------------------- |
| `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell`, `TableHead` | `@repo/ui` | All tables                         |
| `TablePagination`                                                         | `@repo/ui` | Sub-category table pagination      |
| `Input`                                                                   | `@repo/ui` | Search inputs                      |
| `Button`                                                                  | `@repo/ui` | Export buttons                     |
| `Card`, `CardHeader`, `CardContent`                                       | `@repo/ui` | Section cards                      |
| `ToggleGroup`, `ToggleGroupItem`                                          | `@repo/ui` | Chart toggles, brick filter pills  |
| `ChartContainer`, `ChartTooltip`, `ChartLegend`                           | `@repo/ui` | Charts                             |
| `TitleBar`                                                                | `@repo/ui` | Sub-category page header with back |
| `EmptyState`                                                              | `@repo/ui` | No results in brick table          |
| `Skeleton`                                                                | `@repo/ui` | Loading states                     |

## Reusable Components (shared with Dashboard)

| Component          | File                                                 | Shared With                   |
| ------------------ | ---------------------------------------------------- | ----------------------------- |
| `SalesTrendChart`  | `features/granary/components/sales-trend-chart.tsx`  | Dashboard                     |
| `GrossMarginChart` | `features/granary/components/gross-margin-chart.tsx` | Category + Sub-Category pages |
| `ExportButton`     | `features/granary/components/export-button.tsx`      | All pages                     |

## New Components to Create

| Component                | File                                                       | Purpose                                     |
| ------------------------ | ---------------------------------------------------------- | ------------------------------------------- |
| `BusinessFormatTable`    | `features/granary/components/business-format-table.tsx`    | Format sales table (reused in sub-category) |
| `RegionPerformanceTable` | `features/granary/components/region-performance-table.tsx` | Small region table                          |
| `OverstockedStoresChart` | `features/granary/components/overstocked-stores-chart.tsx` | Horizontal bar chart                        |
| `GrossMarginChart`       | `features/granary/components/gross-margin-chart.tsx`       | Bar chart with toggle                       |
| `BrickPerformanceTable`  | `features/granary/components/brick-performance-table.tsx`  | Brick table with filter pills               |

## File Changes

| File                                                       | Action | Details                      |
| ---------------------------------------------------------- | ------ | ---------------------------- |
| `pages/granary/category-overview-page.tsx`                 | Create | Category overview page       |
| `pages/granary/sub-category-detail-page.tsx`               | Create | Sub-category drill-down page |
| `features/granary/components/business-format-table.tsx`    | Create | Shared format table          |
| `features/granary/components/region-performance-table.tsx` | Create | Region table                 |
| `features/granary/components/overstocked-stores-chart.tsx` | Create | Horizontal bar chart         |
| `features/granary/components/gross-margin-chart.tsx`       | Create | Gross margin bar chart       |
| `features/granary/components/brick-performance-table.tsx`  | Create | Brick performance table      |
| `features/granary/mock-data/category-mock.ts`              | Create | Mock data                    |

## Acceptance Criteria

### Category Overview Page

- [ ] Page title shows "Category Overview: {category name}"
- [ ] Business Format Sales table renders with correct columns and Export button
- [ ] Sub-Category List table renders with search, export, pagination
- [ ] "View Details" link navigates to sub-category detail page
- [ ] Sales Trend Analysis chart with Quantity/Sales toggle
- [ ] Gross Margin Performance chart with Value/Percentage toggle
- [ ] Region Wise Performance table renders
- [ ] Overstocked Stores horizontal bar chart renders

### Sub Category Detail Page

- [ ] Back arrow navigates to Category Overview
- [ ] Page title shows "Sub Category: {name}"
- [ ] Business Format Sales table renders (same as parent page)
- [ ] Sales Trend and Gross Margin charts render
- [ ] Brick Performance table with filter pills (All, Top 10, Bottom 10, New)
- [ ] Empty state shown when filter yields no results
- [ ] Region and Overstocked sections render
- [ ] All data comes from mock data files
