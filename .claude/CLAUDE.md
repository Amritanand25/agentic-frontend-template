# Multi-Tenant PWA — Turborepo Monorepo

React 19, TypeScript strict, Vite 8, Tailwind v4. Feature + Page architecture.

---

## MANDATORY: Component Reuse Workflow

**BEFORE creating ANY UI element, ALWAYS follow this order:**

1. **Check catalog** → Read `/.claude/rules/component-catalog.md` (62+ components with all exports)
2. **Search code** → Glob/Grep `packages/ui/src/` for existing components
3. **If exists** → Use it. `import { X } from "@repo/ui"`
4. **If close match** → Extend existing component (add variant/prop). Never duplicate
5. **If not exists** → Search npm package → run `yarn check-pkg <name>`
6. **If no package** → Create in `packages/ui/src/` using `/component-builder` skill

**Violation of this workflow = broken output. Always check before creating.**

### BANNED in `apps/` — Native HTML When @repo/ui Has Equivalent

**Scope:** This ban applies to `apps/web/src/` code only. Inside `packages/ui/src/` (where components are built), native HTML is allowed but must be styled with design tokens.

| Never Use                   | Use Instead (from `@repo/ui`)                       |
| --------------------------- | --------------------------------------------------- |
| `<input>`                   | `Input`, `InputLabel`                               |
| `<input type="date">`       | `DatePicker`                                        |
| `<input type="time">`       | `TimePicker`                                        |
| `<input type="checkbox">`   | `Checkbox`                                          |
| `<input type="radio">`      | `RadioGroup`, `RadioGroupItem`                      |
| `<input type="range">`      | `Slider`                                            |
| `<select>` / `<option>`     | `Select`, `Dropdown`, `FilterPill`                  |
| `<button>`                  | `Button`                                            |
| `<textarea>`                | `Textarea`                                          |
| `<table>` / `<tr>` / `<td>` | **`DataGrid`** — ALWAYS. `Table` is BANNED in apps/ |
| `<label>`                   | `Label`, `InputLabel`                               |
| `<hr>`                      | `Separator`                                         |
| `window.confirm()`          | `AlertDialog`                                       |
| `window.alert()`            | `notify()` from `@repo/ui`                          |
| Custom modal/portal         | `Dialog`, `Sheet`, `Drawer`                         |
| Custom dropdown             | `Dropdown`, `DropdownMenu`, `Select`                |
| Custom tooltip              | `Tooltip`                                           |
| Custom loading spinner      | `Spinner`                                           |
| Custom progress bar         | `Progress`, `ProgressBar`                           |
| Custom breadcrumb           | `Breadcrumb`                                        |
| Custom filter chip/pill     | `FilterPill`                                        |
| Custom tag/chip             | `Badge`, `FilterPill`                               |
| `overflow-auto/scroll`      | `ScrollArea` + `ScrollBar`                          |
| `<input>` with search icon  | `SearchBar`                                         |

### Common Missed Components — ALWAYS Use These

These components are frequently overlooked. **Check before building custom alternatives:**

| Pattern You're Building         | STOP — Use This Instead                                              |
| ------------------------------- | -------------------------------------------------------------------- |
| Search input with icon          | `SearchBar` — NEVER plain `Input` with placeholder "Search..."       |
| Filter dropdowns / filter chips | `FilterPill` (variant: `single` / `multi-checkbox` / `single-radio`) |
| Stepper / wizard progress       | `ProgressStepper` or `StepperFlow`                                   |
| Page title with back button     | `TitleBar`                                                           |
| Empty/no-data placeholder       | `EmptyState`                                                         |
| Error/failure placeholder       | `ErrorState`                                                         |
| Toggle between views            | `ToggleGroup` + `ToggleGroupItem`                                    |
| Loading skeleton                | `Skeleton`                                                           |
| Toasts / notifications          | `notify()` — NOT custom toast                                        |
| Scrollable container            | `ScrollArea` + `ScrollBar` — NEVER `overflow-auto/scroll`            |

**FilterPill is the standard for ALL filter UI.** Whenever you need a dropdown that filters data (zone, city, category, status, etc.), use `FilterPill` from `@repo/ui` — never `<select>`, never a custom dropdown, never a custom chip component.

### ScrollArea — No Native Scrollbars

**`ScrollArea` from `@repo/ui` is the ONLY way to create scrollable containers.** Native CSS `overflow-auto`, `overflow-scroll`, `overflow-y-auto` are **BANNED** in both `apps/` and `packages/ui/src/`.

- **ALWAYS use `ScrollArea`** — for ANY scrollable content: sidebars, dropdowns, modals, panels, page sections, lists
- **NEVER use `overflow-auto`** or `overflow-scroll` — not even on wrapper divs
- The only exception: `overflow-hidden` (clipping, not scrolling) is allowed

### DataGrid vs Table — Table is BANNED in apps/

**`DataGrid` from `@repo/ui` is the ONLY component for ALL tabular data in `apps/`.** `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell`, `TableHead` are **BANNED** in `apps/web/src/`. They exist in `@repo/ui` only for internal use within other components.

- **ALWAYS use `DataGrid`** — for ALL data tables: requests, SKUs, forecasts, brand performance, store lists, wizard review tables, modal tables, everything.
- **NEVER use `Table`** — not even for "simple" or "static" tables. DataGrid handles all cases.
- **NEVER** manually build table markup with `TableHeader`, `TableBody`, `TableRow`, `TableCell` — use `DataGrid` with column definitions instead.
- **`TablePagination`** is still allowed — it works with DataGrid for external pagination control.

```tsx
import { DataGrid, TablePagination, type Column } from "@repo/ui";

const columns: Column<Row>[] = [
  { key: "id", name: "ID", width: 120 },
  { key: "name", name: "Name" },
  { key: "amount", name: "Amount", renderCell: ({ row }) => <span>₹{row.amount}</span> },
];

// Inside a surface-0 container: use className="rdg-inline" for borderless auto-height
<DataGrid className="rdg-inline" columns={columns} rows={paginatedData} />
<TablePagination totalRows={total} page={page} rowsPerPage={rpp} onPageChange={setPage} />
```

### DataGrid + Pagination Layout Pattern

When using DataGrid with pagination inside a surface-0 container:

1. **DataGrid** gets `className="rdg-inline"` — removes border, radius, and fixed height (auto-sizes to content)
2. **TablePagination** sits directly below the DataGrid — it has its own border/radius styling
3. Both live inside the same surface-0 container with `gap: var(--space-8)`
4. The DataGrid rows show clean horizontal lines between them (built into the theme)

```tsx
<div style={{
  backgroundColor: "var(--surface-0)",
  borderRadius: "var(--radius-24)",
  padding: "var(--space-16)",
  display: "flex", flexDirection: "column", gap: "var(--space-8)",
}}>
  {/* Controls: tabs, search, filters */}
  <div className="flex items-center justify-between">...</div>
  <GlobalFilterBar ... />

  {/* DataGrid — borderless inside surface container */}
  <DataGrid className="rdg-inline" columns={columns} rows={paginatedRows} />

  {/* Pagination — has its own border styling */}
  <TablePagination totalRows={total} page={page} rowsPerPage={rpp} onPageChange={setPage} />
</div>
```

### DataGrid — Horizontal Scroll & Text Truncation

DataGrid supports horizontal scrolling natively (react-data-grid virtualizes columns). For many-column grids, columns will scroll horizontally automatically — do NOT set fixed widths that squeeze columns.

**Text truncation with tooltip:** For columns with potentially long text, wrap the cell content in `CellWithTooltip` from `@repo/ui`. This truncates text with ellipsis (`...`) and shows the full text in a tooltip on hover (only when text is actually truncated).

```tsx
import { DataGrid, CellWithTooltip, type Column } from "@repo/ui";

const columns: Column<Row>[] = [
  { key: "id", name: "ID", width: 80 },
  {
    key: "description",
    name: "Description",
    renderCell: ({ row }) => (
      <CellWithTooltip>{row.description}</CellWithTooltip>
    ),
  },
  {
    key: "articleName",
    name: "Article",
    renderCell: ({ row }) => (
      <CellWithTooltip>{row.articleName}</CellWithTooltip>
    ),
  },
];
```

**Rules:**

- **ALWAYS use `CellWithTooltip`** for text columns that may overflow (descriptions, names, addresses, article names, etc.)
- **Do NOT set `minWidth` on every column** — let the grid auto-size and scroll horizontally when needed
- **Frozen columns** (`frozen: true`) stay pinned while other columns scroll — use for key identifier columns (ID, name)
- `CellWithTooltip` only shows the tooltip when text is actually truncated — no tooltip for short text

### Page Spacing Standard

All pages inside layouts must follow uniform spacing:

- **Layout padding (left/right/top/bottom):** `var(--space-16)` — set on `<main>` in layout. Pages must NOT add their own outer padding.
- **Section gap (between cards/sections):** `var(--space-8)` — gap between all cards, sections, and major content blocks.
- **Section inner padding:** `var(--space-16)` for card/panel content padding.
- **KPI card grid gaps:** `var(--space-12)` between KPI cards / stat cards in a grid row
- **Section grid gaps:** `var(--space-8)` between content sections (chart panels, table cards, etc.)
- **Root wrapper:** `flex flex-col gap-[var(--space-8)]` for all page content.

```tsx
// CORRECT
<div className="flex flex-col gap-[var(--space-8)]">
  <h1>Title</h1>
  <GlobalFilterBar visibleFilters={[...]} />
  {/* KPI cards use space-12 gap */}
  <div className="grid grid-cols-4 gap-[var(--space-12)]">
    <KPICard /><KPICard /><KPICard /><KPICard />
  </div>
  {/* Content sections use space-8 gap */}
  <div className="grid grid-cols-2 gap-[var(--space-8)]">
    <ChartCard /><ChartCard />
  </div>
</div>

// WRONG — too much gap, extra padding
<div style={{ padding: "var(--space-24)", gap: "var(--space-24)" }}>
```

### Card Layout Pattern

Every card/panel/section must follow this structure:

```tsx
// KPI / Stat Card
<Card style={{ backgroundColor: "var(--surface-0)", borderRadius: "var(--radius-8)", padding: "var(--space-16)" }}>
  <div style={{ fontSize: "var(--font-size-xs)", color: "var(--text-subdued-1)" }}>
    Label (period) <HelpCircle />
  </div>
  <div style={{ fontSize: "var(--font-size-xl)", fontWeight: "var(--font-weight-heading)" }}>
    ₹0.00 Cr
  </div>
</Card>

// Content Card (chart, table, etc.)
<Card style={{ backgroundColor: "var(--surface-0)", borderRadius: "var(--radius-8)" }}>
  <CardHeader>Title + actions</CardHeader>
  <CardContent>...</CardContent>
</Card>
```

**Rules:**

- **Every card** MUST have `backgroundColor: var(--surface-0)` and `borderRadius: var(--radius-8)` — no exceptions
- **No borders** on cards — surface contrast against `var(--surface-10)` page background is the separator
- **Card padding:** `var(--space-16)` for KPI cards, standard `CardHeader`/`CardContent` padding for content cards
- **KPI label format:** `"Label (period) (?)"` — period in parentheses inline with label, tooltip icon after
- **Side-by-side panels:** Use `grid-cols-2` (equal `1fr 1fr`) by default — never asymmetric unless design explicitly requires it
- **KPI grid:** `grid-cols-4` for top row, `grid-cols-3` for second row (or auto-fill based on count)
- **Card header separator:** When a card has a header row (title, actions, tabs, filters) followed by detail content (table, chart, list), add a `<Separator />` between the header row and the content. This visually separates controls from data. Use `import { Separator } from "@repo/ui"`.

```tsx
// Content Card with header separator
<Card
  style={{
    backgroundColor: "var(--surface-0)",
    borderRadius: "var(--radius-8)",
  }}
>
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>Business Format Sales</CardTitle>
      <ExportButton />
    </div>
  </CardHeader>
  <Separator />
  <CardContent>
    <DataGrid className="rdg-inline" columns={columns} rows={rows} />
  </CardContent>
</Card>
```

### DataGrid Card Container Pattern — Unified Surface with Separators

When a page has a DataGrid with controls (heading, search, filters, toggle tabs, pagination), wrap **everything** in **one single `surface-0` card container**. Each logical section is separated by a `<Separator />`.

**Full structure (all rows are optional — include only what the page needs):**

```
┌──────────────────────────────────────────────────────────────────┐
│  Row 1: Tabs (left) + SearchBar/Primary Buttons (right)          │
│──────────────────────────────────────────────────────────────────│  ← Separator
│  Row 2: Filter pills (FilterPill / GranaryFilterBar)              │
│──────────────────────────────────────────────────────────────────│  ← Separator
│  Row 3: ToggleGroup pills (24px height, single/multi selector)    │
│──────────────────────────────────────────────────────────────────│  ← Separator
│  Row 4: DataGrid (rdg-inline, full width, padding: 0)             │
│──────────────────────────────────────────────────────────────────│  ← Separator
│  Row 5: TablePagination                                           │
└──────────────────────────────────────────────────────────────────┘
```

**Row-by-row rules:**

- **Row 1 — Tabs + Search + Actions:** Use `Tabs` with `variant="subtab"` for status/category switching (All, Pending, Approved). Right side: `SearchBar` (never plain `Input`) + primary `Button` for important actions. Title OR Tabs on left — not both.
- **Row 2 — Filter pills:** `FilterPill` components for data filtering (zone, city, store, etc.)
- **Row 3 — Toggle pills:** `ToggleGroup` + `ToggleGroupItem` at **24px height** (`style={{ height: 24 }}`). For switching data views (Sales/Quantity, Value/Percentage). This is DIFFERENT from Row 1 Tabs.
- **Row 4 — DataGrid:** `className="rdg-inline"`, `CardContent` with `padding: 0` — grid fills full card width edge-to-edge
- **Row 5 — Pagination:** `TablePagination` with padding

```tsx
import {
  Card,
  CardHeader,
  CardContent,
  Separator,
  SearchBar,
  Button,
  Tabs,
  TabsList,
  TabsTrigger,
  DataGrid,
  CellWithTooltip,
  TablePagination,
  ToggleGroup,
  ToggleGroupItem,
} from "@repo/ui";

<div className="flex flex-col gap-[var(--space-8)]">
  <h1>Page Title</h1>

  <Card
    style={{
      backgroundColor: "var(--surface-0)",
      borderRadius: "var(--radius-24)",
    }}
  >
    {/* Row 1: Tabs (subtab variant) + SearchBar + Primary button */}
    <CardHeader>
      <div className="flex items-center justify-between">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList variant="subtab">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-[var(--space-8)]">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search requests..."
          />
          <Button variant="default">+ New Request</Button>
        </div>
      </div>
    </CardHeader>

    <Separator />

    {/* Row 2: Filter pills */}
    <div style={{ padding: "var(--space-12) var(--space-16)" }}>
      <GranaryFilterBar visibleFilters={["zone", "format", "category"]} />
    </div>

    <Separator />

    {/* Row 3: ToggleGroup pills — 24px height, for data view switching */}
    <div style={{ padding: "var(--space-12) var(--space-16)" }}>
      <ToggleGroup type="single" value={view} onValueChange={setView}>
        <ToggleGroupItem value="sales" style={{ height: 24 }}>
          Sales
        </ToggleGroupItem>
        <ToggleGroupItem value="quantity" style={{ height: 24 }}>
          Quantity
        </ToggleGroupItem>
      </ToggleGroup>
    </div>

    <Separator />

    {/* Row 4: DataGrid — full width, no padding */}
    <CardContent style={{ padding: 0 }}>
      <DataGrid className="rdg-inline" columns={columns} rows={paginatedRows} />
    </CardContent>

    <Separator />

    {/* Row 5: Pagination */}
    <div style={{ padding: "var(--space-8) var(--space-16)" }}>
      <TablePagination
        totalRows={total}
        page={page}
        rowsPerPage={rpp}
        onPageChange={setPage}
      />
    </div>
  </Card>
</div>;
```

**Rules:**

- **Page title stays OUTSIDE** the card container
- **Everything else** (tabs, search, filters, toggles, DataGrid, pagination) goes **INSIDE one `<Card>`**
- **`<Separator />`** between every logical row — always separate whatever rows exist
- **Card:** `surface-0` + `radius-24`, no border
- **Row 1 uses `Tabs` (subtab variant)** — for status/category filtering. NEVER use ToggleGroup in row 1
- **Row 3 uses `ToggleGroup` pills at 24px height** — for switching data views. NEVER use Tabs in row 3
- **SearchBar** — ALWAYS use `SearchBar` from `@repo/ui`, never plain `Input` with placeholder
- **Important action buttons use `variant="default"` (primary)** — not secondary/ghost for key CTAs
- **DataGrid fills full width** — `CardContent` with `padding: 0`, DataGrid stretches edge-to-edge
- **DataGrid:** `className="rdg-inline"` — removes its own border/radius (the card provides them)
- **Filter/toggle rows:** `padding: var(--space-12) var(--space-16)` for breathing room
- **Omit rows you don't need** — not every card needs all 5 rows, but separators ALWAYS go between whatever rows exist

**Minimal example (title + DataGrid + pagination only):**

```tsx
<Card
  style={{
    backgroundColor: "var(--surface-0)",
    borderRadius: "var(--radius-24)",
  }}
>
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>Business Format Sales</CardTitle>
      <ExportButton />
    </div>
  </CardHeader>
  <Separator />
  <CardContent style={{ padding: 0 }}>
    <DataGrid className="rdg-inline" columns={columns} rows={rows} />
  </CardContent>
  <Separator />
  <div style={{ padding: "var(--space-8) var(--space-16)" }}>
    <TablePagination
      totalRows={total}
      page={page}
      rowsPerPage={rpp}
      onPageChange={setPage}
    />
  </div>
</Card>
```

### Interaction States — Cursor, Hover, Pressed

**Cursor rules — MANDATORY for all interactive elements:**

| Element                                                                                          | Cursor                              |
| ------------------------------------------------------------------------------------------------ | ----------------------------------- |
| Buttons, links, clickable cards, tabs, pills, toggles, menu items, nav items, icons with onClick | `cursor: pointer`                   |
| Text inputs, textareas, search fields                                                            | `cursor: text`                      |
| Disabled elements (any)                                                                          | `cursor: not-allowed`               |
| Drag handles, reorderable items                                                                  | `cursor: grab` / `cursor: grabbing` |
| Non-interactive text, labels, static content                                                     | `cursor: default`                   |

**If it does something when clicked, it MUST have `cursor: pointer`.** This includes: table rows with onClick, cards that navigate, action icons (edit/delete/copy), filter pills, toggle groups, sidebar items, breadcrumb links, pagination, accordion triggers, any `<div>`/`<span>` with onClick.

**Hover feedback — every clickable element MUST have a visual hover state:**

| Element                   | Hover Effect                       |
| ------------------------- | ---------------------------------- |
| Primary Button            | bg `primary-50` → `primary-40`     |
| Secondary/Ghost Button    | bg → `primary-20` or `grey-20`     |
| Table Row (clickable)     | bg → `primary-10`                  |
| Card (clickable)          | `box-shadow: var(--shadow-medium)` |
| Sidebar/Nav item          | bg → `primary-10`                  |
| Filter pill / Toggle item | bg shift darker                    |
| Icon button               | bg → `grey-20` circle              |
| Link text                 | `text-decoration: underline`       |

**Pressed/Active — provide tactile feedback on click-and-hold (`:active`):**

| Element            | Active Effect                                  |
| ------------------ | ---------------------------------------------- |
| Button (all)       | `transform: scale(0.98)`, bg darkens one shade |
| Card (clickable)   | `transform: scale(0.99)`                       |
| Icon button        | `transform: scale(0.92)`                       |
| Tab / Toggle / Nav | bg → `primary-20`                              |

**Transitions — NEVER instant state changes:**

```css
transition:
  background-color 150ms ease,
  color 150ms ease,
  box-shadow 150ms ease;
/* Press effect: */
transition: transform 50ms ease;
```

Only animate `transform`, `opacity`, `background-color`, `color`, `box-shadow`, `border-color`. Never animate `width`, `height`, `margin`, `padding`.

**Custom clickable elements** (`onClick` on `<div>`/`<span>`) MUST include:

1. `cursor: pointer`
2. `role="button"` + `tabIndex={0}`
3. `onKeyDown` for Enter/Space (keyboard accessible)
4. Hover + active visual feedback
5. `transition` on visual properties

### Creating New Components

- **Location:** `packages/ui/src/{kebab-case-name}.tsx`
- **Tokens only:** Use `var(--primary-50)`, `var(--space-16)`, `var(--radius-8)` — never hardcode
- **Token source:** `packages/theme/src/tokens.css` + `/ui-ux-design` skill
- **Variants:** CVA (class-variance-authority)
- **Icons:** Lucide React only (`import { X } from 'lucide-react'`)
- **Export:** Add to `packages/ui/src/index.ts`
- **Sub-components:** Import existing from `@repo/ui` — never recreate

---

## When to Use What

### Agents — Use for autonomous multi-step tasks

| User Request                                    | Agent                  |
| ----------------------------------------------- | ---------------------- |
| Build full feature (UI + API + state + tests)   | `senior-frontend-eng`  |
| Create visually polished UI, design system work | `ui-ux-design-creator` |
| Plan/spec before implementation                 | `spec-creator`         |

### Skills — Use for focused single-concern tasks

| Task                                              | Skill                    |
| ------------------------------------------------- | ------------------------ |
| Create/refactor one UI component                  | `/component-builder`     |
| Look up design tokens, colors, typography, themes | `/ui-ux-design`          |
| Pick page layout pattern (12 patterns)            | `/layout-creator`        |
| Set up API calls, caching, mutations              | `/api-integration`       |
| Write/fix tests                                   | `/test-master`           |
| Security review, input validation (Zod)           | `/security-guardian`     |
| Performance audit, bundle size, code splitting    | `/performance-optimizer` |
| Accessibility, ARIA, keyboard nav, logging        | `/frontend-standards`    |
| Create implementation spec before coding          | `/spec-creator`          |

### Decision Flow

```
User prompt → Does it need multiple files/concerns?
  YES → Use an AGENT (senior-frontend-eng or ui-ux-design-creator)
  NO  → Use a SKILL for the specific concern

User prompt → "Plan/spec/design this feature"?
  YES → Use spec-creator AGENT first, then implement

User prompt → Needs visual design decisions?
  YES → Use /ui-ux-design SKILL for tokens, ui-ux-design-creator AGENT for implementation
```

---

## Tech Stack

| Layer           | Tool                                      |
| --------------- | ----------------------------------------- |
| Monorepo        | Turborepo + Yarn Workspaces               |
| Package Manager | Yarn (`npm install -g yarn`)              |
| Framework       | React 19 + TypeScript strict              |
| Build           | Vite 8                                    |
| Styling         | Tailwind CSS 4 + CSS design tokens        |
| UI Components   | shadcn/ui (62+ components) via `@repo/ui` |
| Client State    | Zustand 5                                 |
| Server State    | TanStack Query                            |
| Icons           | Lucide React (only — no other icon libs)  |
| Routing         | React Router DOM 7                        |

---

## Monorepo Structure

```
/
├── apps/web/src/
│   ├── api/          # Axios instances, query client
│   ├── components/   # App-specific components
│   ├── contexts/     # React Context (theme, providers)
│   ├── features/     # Business logic by domain
│   ├── hooks/        # App-level hooks
│   ├── layouts/      # DashboardLayout, AuthLayout
│   ├── pages/        # Route entries
│   ├── stores/       # Zustand stores (auth, tenant, org)
│   ├── types/        # App-level types
│   └── utils/        # App-level utilities
├── packages/
│   ├── ui/           # @repo/ui — 62+ components (ALWAYS check first)
│   ├── theme/        # @repo/theme — design tokens (tokens.css)
│   └── utils/        # @repo/utils — cn(), shared utilities
```

**Packages:** `@repo/ui` (components) | `@repo/theme` (tokens) | `@repo/utils` (utilities)  
**Dependency flow:** `apps/*` → `packages/*` (never reverse)

---

## Commands

```bash
yarn dev              # Dev server (localhost:5173)
yarn build            # Production build
yarn lint / lint:fix  # ESLint
yarn format           # Prettier
yarn test             # Run tests
yarn test:coverage    # Coverage report (target >90%)
yarn analyze          # Bundle visualizer
yarn check-pkg <pkg>  # ALWAYS run before yarn add
yarn audit            # Vulnerability check
```

---

## App Layout — Left Nav + Header (Always Present)

All app pages render inside `AppLayout` (`apps/web/src/layouts/app-layout.tsx`):

- **Left sidebar** — Fixed, collapsible (260px / 64px), workspace switcher, nav, user profile
- **Top header** — Always visible (56px), breadcrumbs, actions
- **Main content** — `<Outlet />` renders page content below header, right of sidebar
- **Command palette** — `Cmd+K` search built in

**When building new pages:** They render inside this layout via `<Outlet />`. Do NOT recreate sidebar/header.

**Available layouts:**

| Layout             | File                            | Use For                           |
| ------------------ | ------------------------------- | --------------------------------- |
| `AppLayout`        | `layouts/app-layout.tsx`        | Main app pages (sidebar + header) |
| `AuthLayout`       | `layouts/auth-layout.tsx`       | Login, signup, forgot password    |
| `ComponentsLayout` | `layouts/components-layout.tsx` | Component showcase/docs           |
| `SidebarNav`       | `layouts/sidebar-nav.tsx`       | Reusable sidebar nav component    |

---

## Agent Memory — ALWAYS Auto-Save (No User Prompt Needed)

**This is MANDATORY and AUTOMATIC.** After completing ANY task — no matter how small — you MUST save relevant learnings to `/.claude/agent-memory/` WITHOUT being asked. The user should NEVER need to say "save this" or "remember this". You proactively save:

| What Happened                     | Save To                               | Example                                          |
| --------------------------------- | ------------------------------------- | ------------------------------------------------ |
| Fixed a bug                       | `agent-memory/bugs/{area}-{issue}.md` | `bugs/tooltip-provider-missing.md`               |
| Learned a gotcha or insight       | `agent-memory/learnings/{topic}.md`   | `learnings/sidebar-provider-includes-tooltip.md` |
| Made a design/architecture choice | `agent-memory/decisions/{feature}.md` | `decisions/granary-filter-store.md`              |
| Found a reusable code pattern     | `agent-memory/patterns/{pattern}.md`  | `patterns/datagrid-card-container.md`            |
| Mapped an API endpoint/shape      | `agent-memory/api/{domain}.md`        | `api/granary-endpoints.md`                       |
| User corrected my approach        | `agent-memory/learnings/{topic}.md`   | `learnings/always-use-existing-sidebar.md`       |
| Discovered component behavior     | `agent-memory/learnings/{topic}.md`   | `learnings/filterpill-props.md`                  |

**When to save:**

- After fixing a bug → save the root cause and fix
- After user corrects you → save what you did wrong and the right approach
- After discovering a component's API → save the prop names and gotchas
- After making any non-obvious choice → save the reasoning
- After any task where you learned something that would help future conversations

**How to save:** Write a small markdown file with `# Title`, `**Date:**`, `**Context:**`, bullet-point summary. One topic per file. Update existing files rather than duplicating. Check existing files first with `ls .claude/agent-memory/{category}/`.

**Before each task:** Read relevant existing agent-memory files to avoid repeating past mistakes. Use `ls` and `cat` to check what's already saved in the relevant category.

---

## Design System

- **Themes:** Falcon (Blue), Phoenix (Purple), Jarvis (Teal)
- **Modes:** Light, Dark
- **Token examples:** `var(--primary-50)`, `var(--space-16)`, `var(--radius-8)`, `var(--font-size-m)`
- **Full token reference:** `packages/theme/src/tokens.css` + `/ui-ux-design` skill
- **Rule:** Never hardcode colors, spacing, fonts, radius, shadows — always use tokens
- **Separation (STRICT):** Use surface color contrast to separate areas — **NEVER borders on containers/cards/sections.**
  - Page background: `var(--surface-10)` → Cards/sections: `var(--surface-0)` — the contrast IS the separator
  - **NO `border: 1px solid var(--grey-20/30)` on cards, sections, panels, or content containers**
  - Borders ONLY allowed on: inputs/form fields, table internal row dividers, sidebar/header structural dividers (`borderRight`, `borderBottom`), and interactive selection states
  - If you catch yourself writing `border` on a `<Card>`, `<section>`, or container `<div>`, STOP — remove it and rely on surface contrast
- **Cards MUST have surface background:** Every card, panel, or content section MUST have `backgroundColor: var(--surface-0)` to visually separate from the `var(--surface-10)` page background. Never leave cards without a surface — floating content with no background looks broken.
- **Equal distribution:** When placing two panels side by side, use `1fr 1fr` grid (equal width) unless there is a clear reason for asymmetry. Never use `3fr 2fr` or similar without explicit design intent.

---

## React 19

- `use()` for async data — not useEffect
- `useTransition` for non-urgent updates
- `useActionState` for forms
- Ref is a prop — no forwardRef needed
- Trust compiler — minimize manual useMemo/useCallback

---

## Core Rules

1. **Search existing first** — catalog + `packages/ui/src/` before creating
2. **No native HTML** — use `@repo/ui` equivalents (see BANNED table)
3. **DataGrid for data tables** — never use `Table` for paginated/sortable data (see DataGrid vs Table rule)
4. **Design tokens only** — never hardcode visual values
5. **Uniform page spacing** — `flex flex-col gap-[var(--space-24)]`, no double padding (see Page Spacing Standard)
6. **TypeScript strict** — no `any`
7. **Feature + Page** — features = reusable logic, pages = routes
8. **Check packages** — `yarn check-pkg` before any `yarn add`
9. **Lucide React only** — no other icon libraries
10. **Multi-tenant** — X-Tenant-ID + X-Org-ID on all API calls
11. **Performance** — lazy load routes, <200KB bundle
12. **Test coverage** — maintain >90%

---

## Package Security

**Before `yarn add <package>`, ALWAYS run:** `yarn check-pkg <package-name>`

**Thresholds:** Size < 100KB | Updated < 6 months | Stars > 1K | Deps < 10 | License MIT/Apache

---

## Security

- Never commit `.env` files or hardcode secrets
- No sensitive data in localStorage — use httpOnly cookies
- Validate all inputs (Zod), sanitize HTML (DOMPurify)
- HTTPS only in production

---

## Targets

FCP < 1.5s | TTI < 3.5s | Bundle < 200KB | Lighthouse > 90 | Coverage > 90%

---

## Resources

| Resource                             | Location                                    |
| ------------------------------------ | ------------------------------------------- |
| Component catalog (62+ with exports) | `/.claude/rules/component-catalog.md`       |
| Architecture patterns                | `/.claude/rules/architecture.md`            |
| PWA & multi-tenant patterns          | `/.claude/rules/frontend-best-practices.md` |
| Design tokens (CSS variables)        | `packages/theme/src/tokens.css`             |
| Design token reference (full)        | `/ui-ux-design` skill                       |
