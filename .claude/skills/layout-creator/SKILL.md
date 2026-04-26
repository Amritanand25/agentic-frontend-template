---
name: layout-creator
description: 12 page layout patterns for dashboards, tables, forms, galleries, feeds, boards, and workflows. Use when building pages or views.
allowed-tools: Read Grep Glob
paths:
  - "apps/web/src/pages/**/*"
  - "apps/web/src/layouts/**/*"
---

# Layout Creator — 12 Page Layout Patterns

> All pages render inside `AppLayout` (sidebar + header). Never recreate those. Pages fill `<Outlet />` only.
> Every spacing value MUST use design tokens. Never hardcode px values.

## Spacing Standards (Mandatory)

| Between                              | Token               | px  |
| ------------------------------------ | -------------------- | --- |
| Layout padding (main area)           | `var(--space-16)`    | 16  |
| Page root section gap (vertical)     | `var(--space-8)`     | 8   |
| KPI cards in grid                    | `var(--space-12)`    | 12  |
| Content sections (charts, tables)    | `var(--space-8)`     | 8   |
| Card inner padding                   | `var(--space-16)`    | 16  |
| Form field spacing                   | `var(--space-16)`    | 16  |
| Split panel gap                      | `var(--space-8)`     | 8   |

**Page root wrapper — always:**
```tsx
<div className="flex flex-col gap-[var(--space-8)]">
  <h1>Page Title</h1>
  {/* sections */}
</div>
```

**Card wrapper — always:**
```tsx
<Card style={{
  backgroundColor: "var(--surface-0)",
  borderRadius: "var(--radius-24)",
  // NO border property — surface contrast only
}}>
```

---

## Pattern 1: Dashboard KPI

**Use for:** Overview pages, metrics dashboards, home screens

```
┌──────────────────────────────────────────────────┐
│  Page Title                                       │
│  GlobalFilterBar                                  │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐               │
│  │ KPI │ │ KPI │ │ KPI │ │ KPI │  (grid-cols-4)  │
│  └─────┘ └─────┘ └─────┘ └─────┘               │
│  ┌──────────────┐ ┌──────────────┐               │
│  │   Chart      │ │   Chart      │  (grid-cols-2) │
│  └──────────────┘ └──────────────┘               │
│  ┌──────────────────────────────┐                │
│  │   DataGrid (full width)      │                │
│  └──────────────────────────────┘                │
└──────────────────────────────────────────────────┘
```

```tsx
<div className="flex flex-col gap-[var(--space-8)]">
  <h1>Dashboard</h1>
  <GlobalFilterBar visibleFilters={[...]} />
  <div className="grid grid-cols-4 gap-[var(--space-12)]">
    <KPICard /><KPICard /><KPICard /><KPICard />
  </div>
  <div className="grid grid-cols-2 gap-[var(--space-8)]">
    <ChartCard /><ChartCard />
  </div>
  <DataGridCard />
</div>
```

**Rules:** KPI grid = `grid-cols-4`, gap `space-12`. Content grid = `grid-cols-2`, gap `space-8`. Side-by-side panels = `1fr 1fr` (equal width) unless explicit design reason for asymmetry.

---

## Pattern 2: Full-Width Table (DataGrid Card Container)

**Use for:** Data listings, records, reports, any page with a primary table

This is the most common pattern. Everything goes inside **one single `surface-0` card**. Rows separated by `<Separator />`.

```
┌──────────────────────────────────────────────────┐
│  Page Title (OUTSIDE the card)                    │
│                                                   │
│  ┌────────────────────────────────────────────┐   │
│  │ Row 1: Tabs (subtab) + SearchBar + Button  │   │
│  │────────────────────────────────────────────│   │
│  │ Row 2: FilterPill / GranaryFilterBar       │   │
│  │────────────────────────────────────────────│   │
│  │ Row 3: ToggleGroup pills (24px height)     │   │
│  │────────────────────────────────────────────│   │
│  │ Row 4: DataGrid (rdg-inline, padding: 0)   │   │
│  │────────────────────────────────────────────│   │
│  │ Row 5: TablePagination                     │   │
│  └────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────┘
```

```tsx
<div className="flex flex-col gap-[var(--space-8)]">
  <h1>Page Title</h1>
  <Card style={{ backgroundColor: "var(--surface-0)", borderRadius: "var(--radius-24)" }}>
    {/* Row 1: Tabs + Search + Actions */}
    <CardHeader>
      <div className="flex items-center justify-between">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList variant="subtab">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-[var(--space-8)]">
          <SearchBar value={search} onChange={setSearch} placeholder="Search..." />
          <Button variant="default">+ New</Button>
        </div>
      </div>
    </CardHeader>
    <Separator />
    {/* Row 2: Filters */}
    <div style={{ padding: "var(--space-12) var(--space-16)" }}>
      <GranaryFilterBar visibleFilters={["zone", "format"]} />
    </div>
    <Separator />
    {/* Row 3: Toggle pills */}
    <div style={{ padding: "var(--space-12) var(--space-16)" }}>
      <ToggleGroup type="single" value={view} onValueChange={setView}>
        <ToggleGroupItem value="sales" style={{ height: 24 }}>Sales</ToggleGroupItem>
        <ToggleGroupItem value="qty" style={{ height: 24 }}>Quantity</ToggleGroupItem>
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
      <TablePagination totalRows={total} page={page} rowsPerPage={rpp} onPageChange={setPage} />
    </div>
  </Card>
</div>
```

**Rules:**
- Page title stays **OUTSIDE** the card
- Everything else goes **INSIDE one `<Card>`**
- `<Separator />` between every row that exists
- Row 1: `Tabs` with `variant="subtab"` — NEVER ToggleGroup here
- Row 3: `ToggleGroup` at 24px height — NEVER Tabs here
- Row 4: `DataGrid className="rdg-inline"`, `CardContent padding: 0`
- `SearchBar` — ALWAYS use SearchBar, never plain Input for search
- Primary action buttons use `variant="default"` — never secondary/ghost for key CTAs
- Omit rows you don't need — but separators ALWAYS go between whatever rows exist

---

## Pattern 3: Stacked Sections

**Use for:** Multi-section pages, category overviews, settings

```tsx
<div className="flex flex-col gap-[var(--space-8)]">
  <h1>Page Title</h1>
  <Card style={{ backgroundColor: "var(--surface-0)", borderRadius: "var(--radius-24)" }}>
    <CardHeader><CardTitle>Section 1</CardTitle></CardHeader>
    <Separator />
    <CardContent>{/* content */}</CardContent>
  </Card>
  <Card style={{ backgroundColor: "var(--surface-0)", borderRadius: "var(--radius-24)" }}>
    <CardHeader><CardTitle>Section 2</CardTitle></CardHeader>
    <Separator />
    <CardContent>{/* content */}</CardContent>
  </Card>
</div>
```

---

## Pattern 4: Split Content

**Use for:** Analytics with side panel, comparison views

```
┌───────────────┬───────────────┐
│   Chart/Main  │   Summary     │
│   (1fr)       │   (1fr)       │
└───────────────┴───────────────┘
```

```tsx
<div className="flex flex-col gap-[var(--space-8)]">
  <h1>Analytics</h1>
  <div className="grid grid-cols-2 gap-[var(--space-8)]">
    <Card style={{ backgroundColor: "var(--surface-0)", borderRadius: "var(--radius-24)" }}>
      <CardHeader><CardTitle>Chart</CardTitle></CardHeader>
      <Separator />
      <CardContent>{/* chart */}</CardContent>
    </Card>
    <Card style={{ backgroundColor: "var(--surface-0)", borderRadius: "var(--radius-24)" }}>
      <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
      <Separator />
      <CardContent>{/* details */}</CardContent>
    </Card>
  </div>
</div>
```

**Default = `1fr 1fr` (equal width).** Only use asymmetric (e.g. `2fr 1fr`) with explicit design intent. Stack on mobile (`<768px`).

---

## Pattern 5: Master-Detail

**Use for:** Item selection with detail panel, inbox-style, record detail

```
┌────────────┬──────────────────────────┐
│  List       │  Detail Panel            │
│  (320px)    │  (1fr)                   │
│  scrollable │  collapsible sections    │
└────────────┴──────────────────────────┘
```

- Left: fixed `320px`, scrollable list via `ScrollArea` (never `overflow-auto`)
- Right: `minmax(0, 1fr)`, key-value grids, collapsible sections
- Stack on mobile: list view → tap → detail view

---

## Pattern 6: Stepper Flow

**Use for:** Multi-step forms, wizards, onboarding, request workflows

```
┌──────────────────────────────────────┐
│  ← Back    ProgressStepper    Save   │
├────────────┬─────────────────────────┤
│  Step Nav  │  Step Content            │
│  (320px)   │  (1fr)                   │
├────────────┴─────────────────────────┤
│  Previous                     Next → │
└──────────────────────────────────────┘
```

- Use `ProgressStepper` or `StepperFlow` from `@repo/ui`
- Split: `320px minmax(0, 1fr)`, gap `var(--space-8)`
- Footer: Previous (left), Next/Submit (right, primary variant)
- Validate current step before allowing next

---

## Pattern 7: Alert/Notification Cards

**Use for:** Landing pages, notification feeds, status boards

```tsx
<div className="grid grid-cols-3 gap-[var(--space-8)]">
  {alerts.map(alert => (
    <Card key={alert.id} style={{
      backgroundColor: "var(--surface-0)",
      borderRadius: "var(--radius-24)",
      cursor: "pointer",
    }}>
      <CardContent>{/* icon + badge + title + count */}</CardContent>
    </Card>
  ))}
</div>
```

Grid: `repeat(auto-fit, minmax(280px, 1fr))`, gap `var(--space-8)`. Clickable cards need `cursor: pointer`, hover shadow, and keyboard access.

---

## Pattern 8: Sidebar + Content

**Use for:** Admin panels, settings, documentation

- Split: `240px minmax(0, 1fr)`
- Sidebar: sticky, full height, `ScrollArea`, collapsible on mobile
- Use existing `SidebarNav` component from layouts

---

## Pattern 9: Grid Gallery

**Use for:** Product catalogs, image galleries, card collections

```tsx
<div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-[var(--space-8)]">
  {items.map(item => (
    <Card key={item.id} style={{
      backgroundColor: "var(--surface-0)",
      borderRadius: "var(--radius-24)",
    }}>
      <img style={{ aspectRatio: "4/3" }} />
      <CardContent>{/* title + metadata */}</CardContent>
    </Card>
  ))}
</div>
```

Virtualize if >100 items. Cards: image (`aspect-ratio: 4/3`) + title + metadata.

---

## Pattern 10: Timeline/Feed

**Use for:** Activity feeds, audit logs, history

- Timeline: left border/dots, date separators (sticky, bold)
- Item: timestamp + avatar + action + metadata
- Gap: `var(--space-8)` between items, `var(--space-16)` between day groups
- Use `ScrollArea` for scrollable feeds

---

## Pattern 11: Kanban Board

**Use for:** Task boards, pipelines, status workflows

- Columns: flex row, `minmax(280px, 1fr)`, gap `var(--space-8)`
- Cards: gap `var(--space-8)`, drag-and-drop
- Column headers: title + count + add button
- Horizontal scroll for many columns via `ScrollArea`

---

## Pattern 12: Form + Preview

**Use for:** Editors, builders, email composers, content creation

```
┌───────────────┬───────────────┐
│   Form        │   Preview     │
│   (1fr)       │   (1fr)       │
└───────────────┴───────────────┘
```

- Split: `1fr 1fr`, gap `var(--space-8)`
- Preview: debounced `onChange` (300ms), device/theme toggles
- Form side: use `@repo/ui` form components (Input, Select, Textarea, etc.)

---

## Composition Guide

| Page Type | Primary           | Can Combine With |
| --------- | ----------------- | ---------------- |
| Dashboard | 1 (KPI)           | 4 (Split), 2 (Table) |
| Data List | 2 (Table)         | —                |
| Overview  | 3 (Stacked)       | 2 (Table)        |
| Analytics | 4 (Split)         | 1 (KPI), 2 (Table) |
| Detail    | 5 (Master-Detail) | —                |
| Workflow  | 6 (Stepper)       | —                |
| Alerts    | 7 (Cards)         | 4 (Split)        |
| Admin     | 8 (Sidebar)       | 2 or 3           |
| Catalog   | 9 (Gallery)       | —                |
| Activity  | 10 (Timeline)     | —                |
| Tasks     | 11 (Kanban)       | —                |
| Editor    | 12 (Form+Preview) | —                |

## Responsive Breakpoints

| Breakpoint  | Behavior                                              |
| ----------- | ----------------------------------------------------- |
| `< 768px`   | Stack all grids to single column, hide sidebars       |
| `768-1024px` | 2-col grids, collapse sidebar to icon-only           |
| `> 1024px`  | Full layouts, show sidebar expanded                   |

## Card Rules (All Patterns)

- **ALWAYS:** `backgroundColor: var(--surface-0)`, `borderRadius: var(--radius-24)`
- **NEVER:** `border` property on cards — surface contrast only (surface-0 on surface-10 background)
- **Header separator:** `<Separator />` between card header and content
- **DataGrid in cards:** `className="rdg-inline"`, `CardContent padding: 0`
- **Scrollable content:** `ScrollArea` from `@repo/ui` — never `overflow-auto/scroll`
