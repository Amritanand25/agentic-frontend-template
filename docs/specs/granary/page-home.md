# Home Page

**Type:** Page
**Size:** Large
**Status:** Draft
**Created:** 2026-04-04
**Priority:** High
**Parent:** [module-granary.md](./module-granary.md)

## Overview

The Granary Home page is the entry point after launching the app. It surfaces inventory health exceptions (alerts) and a DOH (Days on Hand) distribution heatmap for quick operational insights. All data is mock/static for now - no backend API.

## Route

`/granary/home`

## Layout Pattern

Scrollable single-column layout with stacked sections:

```
┌──────────────────────────────────────────────────────────────────┐
│ Page Title: "Home"                                               │
├──────────────────────────────────────────────────────────────────┤
│ [Global Filter Bar]                                              │
├──────────────────────────────────────────────────────────────────┤
│ ★ Exceptions                                         Total: 3   │
│ ┌──────────────┐ ┌──────────────────┐ ┌────────────────┐        │
│ │ Zero Sales   │ │ Negative Inv.    │ │ High DOH       │        │
│ │ Alert        │ │ Alert            │ │ Alert          │        │
│ │ 124,401      │ │ 3,904            │ │ 943            │        │
│ │ Site-SKU     │ │ Site-SKU         │ │ Site-SKU       │        │
│ │ [High Pri.]  │ │ [High Pri.]      │ │ [High Pri.]    │        │
│ └──────────────┘ └──────────────────┘ └────────────────┘        │
├──────────────────────────────────────────────────────────────────┤
│ DOH Distribution Heatmap    [100+ DOH ✕]                        │
│ [Inventory Cost] [Inventory Count]                               │
│ ┌─────────┬─────────┬──────────┬─────────┐                      │
│ │ 61-70   │ 91-100  │ 100+ doh │ 31-40   │  Detailed Breakdown  │
│ │ ₹1.56Cr │ ₹0.71Cr │ ₹14.03Cr│ ₹4.89Cr │  ┌────────────────┐ │
│ ├─────────┼─────────┤          ├─────────┤  │ 19,991 SKUs    │ │
│ │ 71-80   │ 41-50   ├──────────┤ 11-20   │  │ ₹14.03 Cr      │ │
│ │ ₹1.44Cr │ ₹2.70Cr │ 1-10 doh│₹12.22Cr │  │ [Top Cat] [Top]│ │
│ │         │         │₹41.73Cr │         │  │ Cards...       │ │
│ └─────────┴─────────┴──────────┴─────────┘  └────────────────┘ │
│ ● Optimal  ● Moderate Risk  ● Critical Overstock                │
├──────────────────────────────────────────────────────────────────┤
│ Detailed SKU View (100+ DOH)                          Search    │
│ ┌────────────────────────────────────────────────────────────┐   │
│ │ Site | Article | Category | Sub-Category | DOH | ...      │   │
│ │ ...rows...                                                 │   │
│ └────────────────────────────────────────────────────────────┘   │
│ Rows per page [50 v]              1-50 of 55858  Page [1] of X  │
└──────────────────────────────────────────────────────────────────┘
```

## Sections

### 1. Exceptions Section

**Header:** Sparkle icon + "Exceptions" title + "Total: {count}" right-aligned

**Cards:** 3 exception alert cards in a horizontal row (responsive: wrap on mobile)

Each card contains:

- Icon (varies per alert type): `CalendarX2` for Zero Sales, `PackageMinus` for Negative Inventory, `Clock` for High DOH
- Priority badge: `Badge` with `destructive` variant, text "High Priority"
- Alert title: e.g., "Zero Sales Alert"
- Count: e.g., "124,401 Site-SKU combinations"

**Click behavior:** Clicking a card opens a `Dialog` modal with the alert detail table.

### Exception Detail Modal

```
┌──────────────────────────────────────────────────────────┐
│ Details for Negative Inventory Alert              [✕]   │
│ 3,904 Site-SKU combinations                              │
│                                                          │
│ Product Details                          [Search...]     │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ Site | Product Code | Product | Rate of Sale |      │ │
│ │      |              |         | Days on Hand |      │ │
│ │      |              |         | Inventory    |      │ │
│ │ ...rows...                                          │ │
│ └──────────────────────────────────────────────────────┘ │
│ Rows per page [50 v]    1-50 of 55858  Page [1] of 1118│
│                                                          │
│              [Close]  [Export]                            │
└──────────────────────────────────────────────────────────┘
```

Modal columns: Site, Product Code, Product, Rate of Sale, Days on Hand, Inventory

### 2. DOH Distribution Heatmap

**Header:** "DOH Distribution Heatmap" + active DOH filter pill (e.g., `100+ DOH ✕`)

**Toggle:** `ToggleGroup` with options: "Inventory Cost" | "Inventory Count"

**Heatmap:** Treemap-style grid of rectangular blocks. Each block represents a DOH range:

- Block text: DOH range (e.g., "61-70 doh") + value (e.g., "₹1.56 Cr")
- Block size: proportional to value
- Block color based on risk:
  - **Optimal (green):** 1-10 doh, 11-20 doh — `var(--success-10)` bg
  - **Moderate Risk (yellow):** 31-40 doh, 41-50 doh — `var(--secondary-10)` bg
  - **Critical Overstock (red/pink):** 61-70, 71-80, 91-100, 100+ doh — `var(--error-10)` bg
- Selected block: blue border `var(--primary-50)`, 2px solid
- Legend at bottom: colored dots with labels (Optimal, Moderate Risk, Critical Overstock)

**Click behavior:** Clicking a DOH block highlights it and shows the Detailed Breakdown panel.

### 3. Detailed Breakdown Panel (right side of heatmap)

**Header:** "Detailed Breakdown: {DOH range}"

**KPI row:** Two metric cards:

- SKU count: icon + value (e.g., "19,991 SKUs") with info tooltip
- Cost: icon + value (e.g., "₹14.03 Cr") with info tooltip

**Tabs:** "Top Categories {count}" | "Top Sites {count}" — using `Tabs` from `@repo/ui`

**Category/Site cards:** Horizontal scrollable cards, each showing:

- Category icon
- Category/Site name
- SKU count
- Cost value
- Colored bottom border indicator

### 4. Detailed SKU View Table

Shows when a DOH block is selected. Full-width table below the heatmap section.

**Header:** "Detailed SKU View ({DOH range})" + Search input

**Columns:** Site, Article, Category, Sub-Category, DOH, Inventory Count, Sales Qty, Inventory Cost (₹)

**Pagination:** `TablePagination` with rows per page (50 default), page navigation

## Design Tokens

| Element                      | Token                                              |
| ---------------------------- | -------------------------------------------------- |
| Section title font           | `var(--font-size-l)`, `var(--font-weight-heading)` |
| Section gap                  | `var(--space-24)`                                  |
| Exception card padding       | `var(--space-16)`                                  |
| Exception card border-radius | `var(--radius-12)`                                 |
| Exception card bg            | `var(--surface-0)`                                 |
| High Priority badge          | `var(--error-10)` bg, `var(--error-50)` text       |
| Alert count font             | `var(--font-size-s)`, `var(--text-subdued-1)`      |
| Heatmap block border-radius  | `var(--radius-8)`                                  |
| Heatmap optimal bg           | `var(--success-10)`                                |
| Heatmap moderate bg          | `var(--secondary-10)`                              |
| Heatmap critical bg          | `var(--error-10)`                                  |
| Selected block border        | `2px solid var(--primary-50)`                      |
| Breakdown card bg            | `var(--surface-0)`                                 |
| Breakdown card padding       | `var(--space-16)`                                  |
| Modal max-width              | 720px                                              |

## Mock Data

All data is static mock data stored in `features/granary/mock-data/home-mock.ts`:

```typescript
export const mockExceptions = [
  {
    id: "1",
    type: "zero_sales",
    priority: "high",
    siteSkuCount: 124401,
    label: "Zero Sales Alert",
  },
  {
    id: "2",
    type: "negative_inventory",
    priority: "high",
    siteSkuCount: 3904,
    label: "Negative Inventory Alert",
  },
  {
    id: "3",
    type: "high_doh",
    priority: "high",
    siteSkuCount: 943,
    label: "High Doh Alert",
  },
];

export const mockDOHBlocks = [
  { range: "61-70 doh", inventoryCost: 1.56, riskLevel: "critical" },
  { range: "91-100 doh", inventoryCost: 0.71, riskLevel: "critical" },
  { range: "100+ doh", inventoryCost: 14.03, riskLevel: "critical" },
  { range: "31-40 doh", inventoryCost: 4.89, riskLevel: "moderate" },
  { range: "71-80 doh", inventoryCost: 1.44, riskLevel: "critical" },
  { range: "41-50 doh", inventoryCost: 2.7, riskLevel: "moderate" },
  { range: "1-10 doh", inventoryCost: 41.73, riskLevel: "optimal" },
  { range: "11-20 doh", inventoryCost: 12.22, riskLevel: "optimal" },
];

export const mockNegativeInventoryProducts = [
  {
    site: "2021",
    productCode: "490379751",
    product: "RATNAGLD PRM KRNOL SONAMSR RICE 25kg BAG",
    rateOfSale: 0.0,
    daysOnHand: 0,
    inventory: -7,
  },
  {
    site: "2021",
    productCode: "491471681",
    product: "MODERN WOW VANILLA CAKE 60g PP",
    rateOfSale: 0.0,
    daysOnHand: 0,
    inventory: -1,
  },
  // ... more rows
];

export const mockTopCategories = [
  { name: "Casual Wear", skuCount: 1523, cost: 0.22 },
  { name: "WOMENS WEAR", skuCount: 1385, cost: 0.3 },
  { name: "Ethnic Wear", skuCount: 1139, cost: 0.18 },
];
```

## Components to Reuse

| Component                                                                 | Source     | Usage                                |
| ------------------------------------------------------------------------- | ---------- | ------------------------------------ |
| `Card`, `CardHeader`, `CardContent`                                       | `@repo/ui` | Exception cards, breakdown cards     |
| `Badge`                                                                   | `@repo/ui` | Priority badges                      |
| `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`                  | `@repo/ui` | Exception detail modal               |
| `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell`, `TableHead` | `@repo/ui` | Modal table, SKU view table          |
| `TablePagination`                                                         | `@repo/ui` | Pagination in modal and SKU view     |
| `Input`                                                                   | `@repo/ui` | Search in modal                      |
| `Button`                                                                  | `@repo/ui` | Close, Export buttons                |
| `ToggleGroup`, `ToggleGroupItem`                                          | `@repo/ui` | Inventory Cost/Count toggle          |
| `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`                          | `@repo/ui` | Top Categories/Top Sites tabs        |
| `Tooltip`, `TooltipTrigger`, `TooltipContent`                             | `@repo/ui` | Info tooltips on KPIs                |
| `ScrollArea`                                                              | `@repo/ui` | Horizontal scroll for category cards |
| `Skeleton`                                                                | `@repo/ui` | Loading state                        |

## New Components to Create

| Component              | File                                                     | Purpose                             |
| ---------------------- | -------------------------------------------------------- | ----------------------------------- |
| `ExceptionCards`       | `features/granary/components/exception-cards.tsx`        | Renders the 3 alert cards           |
| `ExceptionDetailModal` | `features/granary/components/exception-detail-modal.tsx` | Modal with paginated product table  |
| `DOHHeatmap`           | `features/granary/components/doh-heatmap.tsx`            | Treemap grid visualization          |
| `DOHBreakdownPanel`    | `features/granary/components/doh-breakdown-panel.tsx`    | Right-side breakdown on block click |

## File Changes

| File                                                     | Action | Details               |
| -------------------------------------------------------- | ------ | --------------------- |
| `pages/granary/home-page.tsx`                            | Create | Page composition      |
| `features/granary/components/exception-cards.tsx`        | Create | Alert cards component |
| `features/granary/components/exception-detail-modal.tsx` | Create | Alert detail dialog   |
| `features/granary/components/doh-heatmap.tsx`            | Create | DOH treemap blocks    |
| `features/granary/components/doh-breakdown-panel.tsx`    | Create | Breakdown panel       |
| `features/granary/mock-data/home-mock.ts`                | Create | Static mock data      |

## Interaction States

| Element        | State                   | Behavior                              |
| -------------- | ----------------------- | ------------------------------------- |
| Exception card | Hover                   | Subtle shadow, cursor pointer         |
| Exception card | Click                   | Opens detail modal                    |
| DOH block      | Default                 | Colored by risk level                 |
| DOH block      | Hover                   | Slight opacity change, cursor pointer |
| DOH block      | Selected                | Blue border `var(--primary-50)`       |
| DOH block      | Click                   | Shows breakdown panel + SKU table     |
| Modal          | Open                    | Overlay backdrop, centered modal      |
| Modal close    | Click X or Close button | Closes modal                          |

## Accessibility

- Exception cards are buttons with `role="button"` and `aria-label`
- Modal uses `Dialog` (accessible by default) with focus trap
- DOH blocks are interactive elements with keyboard navigation (Tab + Enter)
- Color coding supplemented with text labels (not color-only)

## Acceptance Criteria

- [ ] Home page renders with filter bar, exceptions section, and DOH heatmap
- [ ] 3 exception cards display with icon, title, count, and priority badge
- [ ] Clicking an exception card opens a modal with searchable paginated table
- [ ] Modal has Close and Export buttons
- [ ] DOH heatmap renders treemap blocks colored by risk level
- [ ] Clicking a DOH block shows detailed breakdown panel with SKUs, cost, top categories
- [ ] Toggle between Inventory Cost and Inventory Count views
- [ ] Detailed SKU View table appears below heatmap when a block is selected
- [ ] All data comes from mock data files (no API calls)
- [ ] Legend shows Optimal (green), Moderate Risk (yellow), Critical Overstock (red)
