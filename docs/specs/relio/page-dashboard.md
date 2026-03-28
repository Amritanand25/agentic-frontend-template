# Dashboard Page

**Type:** Page
**Size:** Large
**Status:** UI Shell Built (mock KPIs, no real charts yet)
**Created:** 2026-03-28
**Updated:** 2026-03-28
**Priority:** High
**Parent:** [Relio CRM Platform](./module-relio-crm.md)

## Overview

Customizable dashboard with drag-and-drop KPI cards, charts (bar, line, pie, funnel), and data widgets. Users can create multiple dashboard views, pin metrics, and visualize data from any custom object.

## Layout Pattern

**Pattern 1: Dashboard KPI** + **Pattern 4: Split Content**

```
┌─────────────────────────────────────────────────────────┐
│ 📊 Sales Dashboard               [+ Widget] [Edit] [•••]│
├─────────────────────────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│ │ Revenue  │ │ Deals    │ │ New Leads│ │ Win Rate │   │ ← KPI Grid
│ │ $1.2M    │ │ 45       │ │ 128      │ │ 68%      │   │
│ │ ↑ 12%    │ │ ↓ 3      │ │ ↑ 24     │ │ ↑ 5%     │   │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
├─────────────────────────────────────────────────────────┤
│ ┌────────────────────┬────────────────────┐             │
│ │ Revenue Trend      │ Deals by Stage     │             │ ← Chart Grid
│ │ [Line Chart]       │ [Funnel Chart]     │             │
│ │                    │                    │             │
│ └────────────────────┴────────────────────┘             │
├─────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────┐                │
│ │ Recent Deals                         │                │ ← Data Widget
│ │ [Table: Deal | Value | Stage | Date] │                │
│ └──────────────────────────────────────┘                │
└─────────────────────────────────────────────────────────┘
```

## Requirements

- ✅ Drag-and-drop widget positioning (react-grid-layout)
- ✅ 6 widget types: KPI, Line Chart, Bar Chart, Pie Chart, Funnel, Table
- ✅ Query builder (select object, metric, filters, grouping)
- ✅ Multiple dashboards (create, switch, favorite)
- ✅ Real-time data updates (30s polling)
- ✅ Date range filters (Today, Week, Month, Quarter, Custom)
- ✅ Export dashboard as PDF/PNG
- ✅ Responsive (stack on mobile)

## Widget Types

| Widget         | Data Source                   | Config Options                                        |
| -------------- | ----------------------------- | ----------------------------------------------------- |
| **KPI Card**   | Aggregation (count, sum, avg) | Metric, comparison period, trend arrow                |
| **Line Chart** | Time series                   | X-axis (date field), Y-axis (metric), grouping        |
| **Bar Chart**  | Categorical                   | X-axis (category field), Y-axis (metric), orientation |
| **Pie/Donut**  | Distribution                  | Category field, metric, max slices                    |
| **Funnel**     | Conversion stages             | Stage field, metric, conversion %                     |
| **Table**      | Records                       | Columns, filters, sort, max rows                      |

## Design Tokens

```css
/* Dashboard */
--dashboard-bg: var(--surface-10);
--widget-bg: var(--surface-0);
--widget-shadow: var(--shadow-small);
--widget-border: var(--grey-40);

/* KPI Card */
--kpi-value: 32px, weight 600;
--kpi-label: 12px, subdued-1;
--kpi-trend-up: var(--success-50);
--kpi-trend-down: var(--error-50);

/* Chart */
--chart-primary: var(--primary-50);
--chart-secondary: var(--secondary-50);
--chart-tertiary: var(--tertiary-50);
--chart-grid: var(--grey-40);
--chart-axis: var(--text-subdued-1);

/* Grid */
--kpi-grid: repeat(auto-fit, minmax(220px, 1fr));
--chart-grid: repeat(auto-fit, minmax(400px, 1fr));
--grid-gap: 16px;
```

## Components

### Existing (from packages/ui/src/)

- `Button`, `Select`, `Calendar`, `Popover`, `Dialog`
- `Badge`, `Tooltip`, `DropdownMenu`
- Package needed: `recharts` (charts library - check with `yarn check-pkg recharts`)

### New Components

#### `DashboardGrid` (Complex)

```typescript
interface DashboardGridProps {
  widgets: Widget[];
  editMode: boolean;
  onLayoutChange: (layout: Layout[]) => void;
  onWidgetEdit: (widgetId: string) => void;
  onWidgetDelete: (widgetId: string) => void;
}

// Uses react-grid-layout for drag-and-drop
<ResponsiveGridLayout
  layouts={layouts}
  onLayoutChange={onLayoutChange}
  isDraggable={editMode}
  isResizable={editMode}
>
  {widgets.map(widget => (
    <div key={widget.id}>
      <WidgetRenderer widget={widget} />
    </div>
  ))}
</ResponsiveGridLayout>
```

#### `KPICard` (Simple)

```tsx
<Card className="kpi-card">
  <CardHeader>
    <span className="kpi-label">{widget.label}</span>
    {editMode && <WidgetMenu />}
  </CardHeader>
  <CardContent>
    <div className="kpi-value">{formatValue(value, widget.format)}</div>
    {trend && (
      <div className={cn("kpi-trend", trend.direction)}>
        {trend.direction === "up" ? <TrendingUp /> : <TrendingDown />}
        {trend.percentage}%
      </div>
    )}
  </CardContent>
</Card>
```

#### `ChartWidget` (Complex)

```tsx
// Line Chart Example
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={chartData}>
    <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
    <XAxis dataKey="date" stroke="var(--chart-axis)" />
    <YAxis stroke="var(--chart-axis)" />
    <Tooltip />
    <Line
      type="monotone"
      dataKey="value"
      stroke="var(--chart-primary)"
      strokeWidth={2}
    />
  </LineChart>
</ResponsiveContainer>
```

#### `WidgetEditor` (Complex)

Modal for creating/editing widgets

```tsx
<Dialog>
  <DialogContent className="max-w-[700px]">
    <DialogHeader>
      <DialogTitle>Create Widget</DialogTitle>
    </DialogHeader>

    <div className="space-y-4">
      {/* Widget type */}
      <Select value={type} onValueChange={setType}>
        <SelectItem value="kpi">KPI Card</SelectItem>
        <SelectItem value="line">Line Chart</SelectItem>
        <SelectItem value="bar">Bar Chart</SelectItem>
        <SelectItem value="pie">Pie Chart</SelectItem>
        <SelectItem value="funnel">Funnel</SelectItem>
        <SelectItem value="table">Table</SelectItem>
      </Select>

      {/* Data source */}
      <Select value={objectId} onValueChange={setObjectId}>
        {objects.map((obj) => (
          <SelectItem value={obj.id}>{obj.name}</SelectItem>
        ))}
      </Select>

      {/* Metric configuration (type-specific) */}
      <WidgetTypeConfig type={type} config={config} onChange={setConfig} />

      {/* Filters */}
      <FilterBuilder filters={filters} onChange={setFilters} />
    </div>

    <DialogFooter>
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button onClick={handleSave}>Create Widget</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## State Management

### Page Context

```typescript
interface DashboardContext {
  widgets: Widget[];
  layout: Layout[];
  editMode: boolean;
  dateRange: DateRange;
  activeFilters: Filter[];

  setEditMode: (enabled: boolean) => void;
  setDateRange: (range: DateRange) => void;
  addWidget: (widget: Widget) => void;
  updateWidget: (id: string, updates: Partial<Widget>) => void;
  deleteWidget: (id: string) => void;
  updateLayout: (layout: Layout[]) => void;
}
```

### TanStack Query

```typescript
// Fetch widget data
const { data, isLoading } = useQuery({
  queryKey: ["widget-data", widget.id, dateRange, filters],
  queryFn: () => fetchWidgetData({ widget, dateRange, filters }),
  refetchInterval: 30000, // 30s polling
});
```

## Mock Data

```typescript
const mockWidgets: Widget[] = [
  {
    id: "w1",
    type: "kpi",
    title: "Total Revenue",
    objectId: "obj_deals",
    metric: { field: "value", aggregation: "sum" },
    format: "currency",
    layout: { x: 0, y: 0, w: 3, h: 2 },
  },
  {
    id: "w2",
    type: "line",
    title: "Revenue Trend",
    objectId: "obj_deals",
    xAxis: { field: "closeDate", groupBy: "month" },
    yAxis: { field: "value", aggregation: "sum" },
    layout: { x: 0, y: 2, w: 6, h: 4 },
  },
  {
    id: "w3",
    type: "funnel",
    title: "Deal Pipeline",
    objectId: "obj_deals",
    stageField: "stage",
    metric: { field: "value", aggregation: "sum" },
    layout: { x: 6, y: 2, w: 6, h: 4 },
  },
];

const mockKPIData = {
  value: 1234567,
  trend: { direction: "up", percentage: 12.5 },
  comparison: { period: "last month", value: 1100000 },
};

const mockChartData = [
  { date: "Jan", value: 45000 },
  { date: "Feb", value: 52000 },
  { date: "Mar", value: 61000 },
  // ...
];
```

## Interaction States

- **Widget (View):** Shadow-small, hover shows settings icon (edit mode)
- **Widget (Edit):** Dashed border, drag handle visible, resize corners
- **Drag:** Opacity 0.8, cursor grabbing, placeholder shows drop zone

## Accessibility

- ✅ Chart data available in table format (screen reader)
- ✅ Keyboard: Tab to widgets, Enter to focus, Arrow keys to navigate chart data
- ✅ ARIA labels on charts, tooltips

## File Changes

| File                                                           | Type   |
| -------------------------------------------------------------- | ------ |
| `apps/web/src/pages/app/dashboard/index.tsx`                   | Create |
| `apps/web/src/features/dashboard/components/DashboardGrid.tsx` | Create |
| `apps/web/src/features/dashboard/components/KPICard.tsx`       | Create |
| `apps/web/src/features/dashboard/components/ChartWidget.tsx`   | Create |
| `apps/web/src/features/dashboard/components/WidgetEditor.tsx`  | Create |
| `apps/web/src/features/dashboard/hooks/useWidgetData.ts`       | Create |
| `apps/web/src/features/dashboard/utils/chart-formatters.ts`    | Create |
| `apps/web/src/features/dashboard/mock-data.ts`                 | Create |

## Acceptance Criteria

- ✅ Create dashboard with 4 different widget types
- ✅ Drag-and-drop widgets to reposition
- ✅ Resize widgets (2x2 to 12x6 grid)
- ✅ Filter by date range updates all widgets
- ✅ Charts render with correct design tokens (colors, fonts)
- ✅ Export dashboard as PDF (html2canvas + jspdf)
- ✅ Mobile: Widgets stack vertically, scroll works

---

**Next:** [Conversations Feature](./feature-conversations.md)
