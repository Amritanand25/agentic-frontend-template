# Granary - Grocery Planning & Assortment Intelligence Platform

**Type:** Module
**Size:** Large
**Status:** Draft
**Created:** 2026-04-04
**Priority:** High

## Overview

Granary is a grocery product planning dashboard and assortment intelligence tool. It enables retail teams to forecast demand, review product ranges across stores, manage category performance, and raise delist/list requests for SKUs. The platform provides data-driven insights through classification matrices, DOH (Days on Hand) heatmaps, sales trend analysis, and inventory exception alerts.

## Product Vision

A comprehensive grocery planning platform that helps retail operations teams:

- **Monitor inventory health** - DOH heatmaps, exception alerts (zero sales, negative inventory, high DOH)
- **Analyze category performance** - Sales trends, gross margin, brand performance, region-wise breakdowns
- **Forecast demand** - Baseline forecasting with daily granularity per site-article combination
- **Manage product assortment** - ABC-XYZ classification matrix, range review, NOB vs Volume analysis
- **Streamline operations** - Delist/list request workflows with multi-step approval process

## Architecture

### Tech Stack (Inherits from Platform)

- **Framework:** React 19 + TypeScript strict mode
- **Build:** Vite 8
- **Styling:** Tailwind v4 + CSS design tokens
- **UI Components:** `@repo/ui` (64+ components)
- **State Management:**
  - **Global:** Zustand (auth, tenant, granary filter state)
  - **Server:** TanStack Query (all API data, caching)
  - **Page-scoped:** React Context (wizard state, selection state)
- **Charts:** Recharts via `ChartContainer` from `@repo/ui`
- **Icons:** Lucide React
- **Routing:** React Router DOM 7

### Multi-Tenant Architecture

Granary operates within the existing multi-tenant hierarchy:

```
Organization (Org)
└── Tenant (Workspace)
    └── User (with roles: super-admin, admin, pm, etc.)
```

**Route structure:** `/granary/*` (standalone app entry, not nested under org/tenant since Granary uses its own workspace switcher in the profile dropdown)

**Data isolation:**

- All API calls include `X-Tenant-ID` and `X-Org-ID` headers via Axios interceptor
- Workspace switching available from profile dropdown
- Filter state persisted per user session

### Navigation Structure

```
Granary App
├── Home                          → /granary/home
├── Dashboard                     → /granary/dashboard
├── Forecasting (expandable)
│   └── Baseline Forecast         → /granary/forecasting/baseline
├── Assortment Intelligence (expandable)
│   ├── Category Overview         → /granary/assortment/category
│   │   └── Sub Category Detail   → /granary/assortment/category/:categoryId/sub/:subCategoryId
│   ├── Range Review              → /granary/assortment/range-review
│   └── Requests                  → /granary/assortment/requests
│       └── Request Detail        → /granary/assortment/requests/:requestId
└── Delist Request Wizard         → /granary/assortment/delist-request (full-screen, no sidebar)
```

### App Layout

Granary uses its own layout (`GranaryLayout`) separate from the platform's `AppLayout`:

#### Left Sidebar (240px)

```
┌──────────────────────────┐
│ 🏠 Home                  │  ← Standalone nav item (icon: Home)
│                          │
│ 📊 Dashboard             │  ← Standalone nav item (icon: BarChart3)
│                          │
│ 📈 Forecasting        ∨  │  ← Expandable group (icon: TrendingUp, chevron)
│    Baseline Forecast     │    ← Child item (indented, no icon)
│                          │
│ 🔲 Assortment Intel.  ∨  │  ← Expandable group (icon: LayoutGrid, chevron)
│    Category Overview     │    ← Child item
│    Range Review          │    ← Child item
│    Requests              │    ← Child item
└──────────────────────────┘
```

**Note:** No logo/brand name in sidebar — branding is in the full-width header above.

**Sidebar behavior:**

- **Standalone items** (Home, Dashboard): Direct nav links, no children
- **Group items** (Forecasting, Assortment Intelligence): Click toggles expand/collapse with chevron rotation
  - Expanded: Chevron points down `∨`, children visible below with indentation
  - Collapsed: Chevron points right `›`, children hidden
  - Groups auto-expand when a child route is active
- **Active item**: `var(--primary-10)` background, `var(--primary-50)` text, `var(--radius-8)` border-radius, full-width highlight
- **Active group header**: When any child is active, the group header text uses `var(--text-default)` (not highlighted itself, only the child is highlighted)
- **Hover**: `var(--surface-10)` background
- **Icons**: Lucide React icons — `Home`, `BarChart3`, `TrendingUp`, `LayoutGrid`
- **Child indentation**: `var(--space-32)` left padding (no icon, text only)
- **Item height**: `var(--height-m)` (40px)
- **Item padding**: `var(--space-8)` vertical, `var(--space-12)` horizontal
- **Sidebar bg**: `var(--surface-0)`
- **Sidebar border-right**: `1px solid var(--grey-20)`

#### Top Header (56px) — Full-Width Dark Header

The header spans the **full width** of the screen, above both sidebar and content area.

```
┌──────────────────────────────────────────────────────────────┐
│ 🌾 Granary                         ⚙️  [AT] Granary       │
│                                         Ayush Tiwari    ∨  │
└──────────────────────────────────────────────────────────────┘
```

- **Logo + brand** (left): `Wheat` icon + "Granary" text in white
- **Settings icon** (right): `Settings` from lucide-react, `var(--grey-40)`
- **User profile** (far right): Avatar (initials circle) + "Granary" label + user name + chevron down
  - Click opens `DropdownMenu`:
    - User info: Avatar + full name + email
    - Separator
    - "WORKSPACES" label
    - Workspace items: Avatar + org name + role (e.g., "Impetus / planning-super-admin")
    - Clicking a workspace switches the active workspace
    - Separator
    - "Log out" item with logout icon

**Header bg**: `var(--grey-100)` (dark)
**Text color**: White (`#FFFFFF`) for brand name and user name, `var(--grey-40)` for subdued text
**Layout**: `display: flex; justify-content: space-between` — logo left, settings+user right

#### Layout Structure

```
┌──────────────────────────────────────────┐
│ Full-width dark header (56px)            │
├──────────┬───────────────────────────────┤
│ Sidebar  │ Main content                  │
│ (240px)  │ <Outlet />                    │
│          │ bg: surface-10, pad: space-16 │
└──────────┴───────────────────────────────┘
```

#### Main Content Area

Renders child page via `<Outlet />`. Full height minus header. Scrollable.
Background: `var(--surface-10)`, padding: `var(--space-16)`

### Core Modules

| Module                  | Description                                                                     | Spec File                                                |
| ----------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **Landing Page Update** | Add Granary card to platform home                                               | [page-landing-update.md](./page-landing-update.md)       |
| **Global Filters**      | Shared filter bar (Zone, Format, State, City, Store, Segment, Category, Period) | [feature-global-filters.md](./feature-global-filters.md) |
| **Home**                | Exception alerts, DOH distribution heatmap, detailed breakdown                  | [page-home.md](./page-home.md)                           |
| **Dashboard**           | KPI cards, performance comparison, brand table, sales trend charts              | [page-dashboard.md](./page-dashboard.md)                 |
| **Baseline Forecast**   | Article forecast list with daily date columns                                   | [page-baseline-forecast.md](./page-baseline-forecast.md) |
| **Category Overview**   | Business format sales, sub-category drill-down, charts                          | [page-category-overview.md](./page-category-overview.md) |
| **Range Review**        | ABC-XYZ classification matrix, NOB vs Volume, ranged articles table             | [page-range-review.md](./page-range-review.md)           |
| **Requests**            | Request listing, detail view, status management                                 | [page-requests.md](./page-requests.md)                   |
| **Delist Wizard**       | 3-step delist request creation (Store Selection → Add Reason → Review)          | [feature-delist-wizard.md](./feature-delist-wizard.md)   |

## Data Model (Frontend Types)

### Core Entities

```typescript
// Global filter state used across all Granary pages
interface GranaryFilters {
  zone?: string;
  format?: string;
  state?: string; // e.g. "MUM"
  city?: string;
  store?: string;
  segment?: string;
  category?: string;
  period?: string; // e.g. "WTD", "MTD", "QTD", "YTD"
}

// Exception alert on Home page
interface ExceptionAlert {
  id: string;
  type: "zero_sales" | "negative_inventory" | "high_doh";
  priority: "high" | "medium" | "low";
  siteSkuCount: number;
  label: string;
}

// DOH heatmap block
interface DOHBlock {
  range: string; // "1-10 doh", "100+ doh"
  inventoryCost: number; // in Cr
  inventoryCount: number;
  riskLevel: "optimal" | "moderate" | "critical";
}

// Dashboard KPI
interface DashboardKPI {
  label: string;
  value: number;
  unit: string; // "Cr", "L", "%", "days"
  tooltip: string;
  period?: string; // "90 days"
}

// Brand performance row
interface BrandPerformance {
  brandId: string;
  brandName: string;
  cySales: number;
  cyMargin: number; // percentage
  lySales: number;
}

// Forecast row (one per site-article-date)
interface ForecastEntry {
  site: string;
  articleId: string;
  articleDescription: string;
  dailyForecasts: Record<string, number>; // date string → forecast value
}

// Category overview
interface CategoryFormat {
  formatName: string;
  articleCount: number;
  locationCount: number;
  totalSales: number;
  salesQuantity: number;
  grossMargin: number;
  grossMarginPct: number;
}

interface SubCategory {
  name: string;
  articleCount: number;
  totalSales: number;
  salesQuantity: number;
  grossMarginPct: number;
}

// Classification matrix cell
interface ClassificationCell {
  code: string; // "AX", "BY", "CZ"
  revenue: "A" | "B" | "C";
  demandStability: "X" | "Y" | "Z";
  percentage: number;
  skuType: "strategic" | "regular" | "review";
}

// NOB vs Volume card
interface NOBCategory {
  name: string; // "Bulk Items", "Core SKU", etc.
  description: string; // "Low Bills & High Volume"
  skuCount: number;
  billsPct: number;
  volumePct: number;
  avgUPB: number;
  color: string; // left border color
}

// Range review article row
interface RangedArticle {
  articleCode: string;
  articleName: string;
  storeCount: number;
  subCategory: string;
  brick: string;
  classification: string;
  // ... additional columns
}

// Delist/list request
interface DelistRequest {
  requestId: string; // "RQ20260402142441"
  requestTime: string; // ISO date
  requestedBy: string; // email
  requestType: "Delist" | "List";
  category: string;
  storeCount: number;
  productCount: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

// Request detail
interface RequestDetail extends DelistRequest {
  subCategory: string;
  format: string;
  zone: string;
  state: string;
  raisedOn: string;
  raisedBy: string;
  articles: RequestArticle[];
}

interface RequestArticle {
  articleCode: string;
  articleName: string;
  subCategory: string;
  affectedStores: number;
  totalStores: number;
  stores: StoreInfo[];
}

interface StoreInfo {
  name: string;
  code: string;
  state: string;
  city: string;
  classificationMatrix?: number;
  salesVelocity?: number;
  revenueContribution?: number;
}

// Delist wizard state
interface DelistWizardState {
  currentStep: 1 | 2 | 3;
  selectedArticles: SelectedArticle[];
  storeTargetingMode: "affected" | "ranged" | "custom";
  globalReason?: string;
  articleReasons: Record<string, string>; // articleCode → reason
}

interface SelectedArticle {
  articleCode: string;
  articleName: string;
  subCategory: string;
  affectedCount: number;
  rangedCount: number;
  selectedStores: StoreInfo[];
}
```

## File Structure

```
apps/web/src/
├── features/granary/
│   ├── api/
│   │   ├── granary-client.ts          # Axios instance with Granary base URL
│   │   ├── home-api.ts                # Home page API (exceptions, DOH)
│   │   ├── dashboard-api.ts           # Dashboard KPIs, trends
│   │   ├── forecast-api.ts            # Baseline forecast data
│   │   ├── category-api.ts            # Category overview, sub-category
│   │   ├── range-review-api.ts        # Classification matrix, articles
│   │   └── requests-api.ts            # Requests CRUD, delist wizard
│   ├── components/
│   │   ├── granary-layout.tsx          # App shell (sidebar + header)
│   │   ├── granary-sidebar.tsx         # Left navigation
│   │   ├── granary-header.tsx          # Top header with profile
│   │   ├── global-filter-bar.tsx       # Shared filter bar component
│   │   ├── classification-matrix.tsx   # 3x3 ABC-XYZ matrix
│   │   ├── nob-volume-cards.tsx        # NOB vs Volume card group
│   │   ├── doh-heatmap.tsx            # DOH distribution treemap
│   │   ├── exception-cards.tsx         # Alert exception cards
│   │   ├── sales-trend-chart.tsx       # Line chart (reusable)
│   │   ├── gross-margin-chart.tsx      # Bar chart (reusable)
│   │   ├── kpi-card.tsx               # Single KPI metric card
│   │   └── export-button.tsx          # Export action button
│   ├── hooks/
│   │   ├── use-granary-filters.ts     # Filter state hook
│   │   ├── use-home-data.ts           # Home page queries
│   │   ├── use-dashboard-data.ts      # Dashboard queries
│   │   ├── use-forecast-data.ts       # Forecast queries
│   │   ├── use-category-data.ts       # Category queries
│   │   ├── use-range-review-data.ts   # Range review queries
│   │   └── use-requests-data.ts       # Requests queries
│   ├── stores/
│   │   └── granary-filter-store.ts    # Zustand store for global filters
│   ├── types/
│   │   └── index.ts                   # All Granary TypeScript types
│   └── index.ts                       # Public API exports
├── pages/granary/
│   ├── home-page.tsx
│   ├── dashboard-page.tsx
│   ├── baseline-forecast-page.tsx
│   ├── category-overview-page.tsx
│   ├── sub-category-detail-page.tsx
│   ├── range-review-page.tsx
│   ├── requests-page.tsx
│   ├── request-detail-page.tsx
│   └── delist-request/
│       ├── delist-request-page.tsx     # Wizard container
│       ├── step-store-selection.tsx
│       ├── step-add-reason.tsx
│       └── step-review-request.tsx
```

## State Management

| State               | Tool                             | Scope       | Details                                                                                  |
| ------------------- | -------------------------------- | ----------- | ---------------------------------------------------------------------------------------- |
| Global filters      | Zustand (`granary-filter-store`) | Cross-page  | Zone, Format, State, City, Store, Segment, Category, Period. Persists across navigation. |
| Server data         | TanStack Query                   | Cached      | All API responses. Keys include filter params for cache invalidation.                    |
| Delist wizard       | React Context                    | Page-scoped | Step state, selected articles, store targeting, reasons. Resets on unmount.              |
| Row selection       | React state (`useState`)         | Component   | Checkbox selection in Range Review table.                                                |
| DOH block selection | React state (`useState`)         | Component   | Selected heatmap block for detailed breakdown.                                           |

### Query Key Structure

```typescript
// All queries namespaced under 'granary'
["granary", "home", "exceptions", filters][
  ("granary", "home", "doh-heatmap", filters)
][("granary", "dashboard", "kpis", filters)][
  ("granary", "dashboard", "brand-performance", filters)
][("granary", "dashboard", "sales-trend", filters)][
  ("granary", "forecast", "baseline", filters, page, pageSize)
][("granary", "category", categoryId, filters)][
  ("granary", "category", categoryId, "sub", subCategoryId, filters)
][("granary", "range-review", filters, tab)][
  ("granary", "requests", filters, status, page, pageSize)
][("granary", "requests", requestId)];
```

## Global Patterns

### Filter Bar

Every page uses a consistent filter bar with dropdowns: Zone, Format, State, City, Store, Segment, Category, Period. Applied filters render as pills with `x` to remove. "Clear All" link resets all filters. Filter state is stored in Zustand and persists across page navigation. See [feature-global-filters.md](./feature-global-filters.md).

### Export

All data tables and grids include an Export button (download icon + "Export" text) in the top-right. Export triggers a CSV/Excel download of the current filtered data.

### Pagination

All paginated tables use `TablePagination` from `@repo/ui` with: Rows per page selector (10, 25, 50), page navigation (previous/next arrows, page number input), total count display ("1-50 of 1858").

### Currency Formatting

All monetary values displayed in Indian Rupees (₹) with suffixes: K (thousands), L (lakhs), Cr (crores). Example: `₹14.03 Cr`, `₹19.83 L`.

### Tooltips

Metrics with `(?)` icons use `Tooltip` from `@repo/ui` to explain the metric definition.

### Color Coding

- **Strategic/Optimal:** `var(--success-50)` (green)
- **Regular/Moderate:** `var(--secondary-50)` (orange/yellow)
- **Review/Critical:** `var(--error-50)` (red)

## Implementation Order

1. **Phase 1 - Foundation:**
   - Landing page update (add Granary card)
   - Granary layout (sidebar + header)
   - Global filter bar component
   - Granary filter store (Zustand)

2. **Phase 2 - Dashboard & Home:**
   - Home page (exceptions, DOH heatmap)
   - Dashboard page (KPIs, charts, brand performance)

3. **Phase 3 - Forecasting:**
   - Baseline Forecast page

4. **Phase 4 - Assortment Intelligence:**
   - Category Overview + Sub Category detail
   - Range Review (classification matrix, data table)
   - Requests (list + detail)

5. **Phase 5 - Workflows:**
   - Delist Request wizard (3-step flow)

## Components to Reuse from `@repo/ui`

| Component                                                 | Usage                                                                |
| --------------------------------------------------------- | -------------------------------------------------------------------- |
| `Card`, `CardHeader`, `CardTitle`, `CardContent`          | KPI cards, exception cards, NOB cards                                |
| `DataGrid` (+ `className="rdg-inline"`)                   | ALL data tables — Table is BANNED in apps/                           |
| `TablePagination`                                         | All paginated tables                                                 |
| `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`          | Ranged/Unranged/Unlisted/Pending tabs, All/Pending/Approved/Rejected |
| `Badge`                                                   | Status badges (Pending, Delist, priority), category tags             |
| `Button`                                                  | Export, Submit, Save, Next, Previous                                 |
| `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`  | Filter dropdowns, reason dropdowns                                   |
| `FilterPill`                                              | Filter bar dropdown pills                                            |
| `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`  | Exception alert detail modal                                         |
| `Tooltip`, `TooltipTrigger`, `TooltipContent`             | Metric explanations                                                  |
| `Checkbox`                                                | Row selection in tables                                              |
| `RadioGroup`, `RadioGroupItem`                            | Store targeting mode selection                                       |
| `Input`                                                   | Search inputs                                                        |
| `Separator`                                               | Section dividers                                                     |
| `ScrollArea`                                              | Scrollable sidebars, article lists                                   |
| `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` | Request details section                                              |
| `ProgressStepper` / `StepperFlow`                         | Delist wizard step indicator                                         |
| `ChartContainer`, `ChartTooltip`, `ChartLegend`           | Sales trend, gross margin charts                                     |
| `ToggleGroup`, `ToggleGroupItem`                          | Quantity/Sales toggle, Value/Percentage toggle                       |
| `Skeleton`                                                | Loading states                                                       |
| `EmptyState`                                              | No results states                                                    |
| `Spinner`                                                 | Loading indicators                                                   |
| `notify`                                                  | Success/error notifications on submit                                |
| `DropdownMenu`                                            | Profile dropdown, quick actions                                      |
| `Avatar`                                                  | User avatar in header                                                |
| `TitleBar`                                                | Page titles with back navigation                                     |

## New Components to Create

| Component              | Location                                                | Purpose                           |
| ---------------------- | ------------------------------------------------------- | --------------------------------- |
| `GranaryLayout`        | `features/granary/components/granary-layout.tsx`        | App shell with sidebar + header   |
| `GranarySidebar`       | `features/granary/components/granary-sidebar.tsx`       | Left nav with expandable sections |
| `GranaryHeader`        | `features/granary/components/granary-header.tsx`        | Top bar with profile dropdown     |
| `GlobalFilterBar`      | `features/granary/components/global-filter-bar.tsx`     | Shared filter bar                 |
| `ClassificationMatrix` | `features/granary/components/classification-matrix.tsx` | 3x3 ABC-XYZ grid                  |
| `NOBVolumeCards`       | `features/granary/components/nob-volume-cards.tsx`      | 4 NOB category cards              |
| `DOHHeatmap`           | `features/granary/components/doh-heatmap.tsx`           | Treemap visualization             |
| `ExceptionCards`       | `features/granary/components/exception-cards.tsx`       | Alert cards with modal            |
| `SalesTrendChart`      | `features/granary/components/sales-trend-chart.tsx`     | Reusable line chart               |
| `GrossMarginChart`     | `features/granary/components/gross-margin-chart.tsx`    | Reusable bar chart                |
| `KPICard`              | `features/granary/components/kpi-card.tsx`              | Single metric card                |
| `ExportButton`         | `features/granary/components/export-button.tsx`         | Download trigger                  |
