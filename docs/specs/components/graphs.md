# Graphs Component Spec

---

## Overview

A comprehensive graph/chart system built on **shadcn/ui Chart** (which wraps **Recharts**). Provides 12 chart types covering all data visualization needs:

1. **Area Chart** — Filled line chart showing trends over time
2. **Bar Chart** — Vertical bars comparing categories
3. **Horizontal Bar Chart** — Horizontal bars for ranked/categorical data
4. **Line Chart** — Connected data points showing trends
5. **Pie Chart** — Circular chart showing proportional data
6. **Donut Chart** — Pie chart with center cutout for summary metrics
7. **Radar Chart** — Multi-axis chart for comparing attributes
8. **Radial Bar Chart** — Circular progress/gauge visualization
9. **Scatter Chart** — Two-axis plot showing correlation between variables
10. **Funnel Chart** — Stage-based conversion visualization
11. **Treemap** — Hierarchical data as nested rectangles
12. **Combo Chart** — Mixed bar + line for dual-metric comparison

All charts use `ChartContainer`, `ChartTooltip`, and `ChartLegend` from shadcn/ui for consistent behavior.

---

## Architecture

### shadcn/ui Chart Primitives

```
ChartContainer          — Responsive SVG wrapper, applies ChartConfig CSS vars
ChartConfig             — Type-safe color/label mapping per data series
ChartTooltip            — Hover tooltip (wraps Recharts Tooltip)
ChartTooltipContent     — Formatted tooltip body with labels + colors
ChartLegend             — Legend row (wraps Recharts Legend)
ChartLegendContent      — Formatted legend items with color indicators
```

Each ChartConfig key maps to a CSS variable `--color-{key}` injected by `ChartContainer`.

---

## Anatomy

### Common Chart Layout

```
+--------------------------------------------------+
|  [Chart Title]                    [Legend Items]  |  <- Optional header
+--------------------------------------------------+
|                                                    |
|              ┌─────────────────┐                  |
|              │                 │                  |
|              │   Chart Area    │                  |
|              │                 │                  |
|              └─────────────────┘                  |
|                                                    |
|  [X-Axis Labels]                                  |
+--------------------------------------------------+
|  [Optional Description / Subtitle]                |
+--------------------------------------------------+
```

### Chart Card Wrapper

Each chart is wrapped in a Card component with header, content, and optional footer sections.

---

## Design Tokens

### Chart Container
- Background: `--surface-0`
- Border radius: `--radius-16`
- Padding: `--space-24`
- Shadow: `--shadow-small`
- Min height: 200px

### Chart Colors (per theme)

Charts use design system primary/secondary/tertiary + feedback colors for data series:

| Series | Token | Purpose |
|--------|-------|---------|
| Series 1 | `--primary-50` | Primary data series |
| Series 2 | `--secondary-50` | Secondary data series |
| Series 3 | `--tertiary-50` | Tertiary data series |
| Series 4 | `--success-50` | Fourth data series |
| Series 5 | `--warning-50` | Fifth data series |
| Series 6 | `--error-50` | Sixth data series (if needed) |

For area/line fills:
| Fill | Token | Usage |
|------|-------|-------|
| Area fill 1 | `--primary-20` | Area chart gradient base |
| Area fill 2 | `--secondary-20` | Secondary area fill |
| Area fill 3 | `--tertiary-20` | Tertiary area fill |

### Axes
- Axis line: hidden (`axisLine={false}`)
- Tick line: hidden (`tickLine={false}`)
- Tick label font: `--font-size-s` / `--font-weight-regular` / `--line-height-s`
- Tick label color: `--text-subdued-1`
- Tick margin: `--space-8` (10px)
- Grid lines: `--grey-40` at 30% opacity, horizontal only (`vertical={false}`)

### Tooltip
- Background: `--surface-0`
- Border: 1px solid `--grey-40`
- Border radius: `--radius-8`
- Shadow: `--shadow-medium`
- Label font: `--font-size-s` / `--font-weight-heading`
- Value font: `--font-size-m` / `--font-weight-prominent`
- Color indicator: 8px circle matching series color
- Padding: `--space-8` `--space-12`

### Legend
- Position: bottom or top of chart
- Item font: `--font-size-s` / `--font-weight-regular`
- Item color: `--text-subdued-1`
- Color indicator: 8px circle matching series color
- Gap between items: `--space-16`
- Margin top: `--space-8`

### Card Header (when chart is in a card)
- Title: `--font-size-l` / `--font-weight-heading` / `--text-default`
- Description: `--font-size-s` / `--font-weight-regular` / `--text-subdued-1`
- Gap between title and description: `--space-4`

### Card Footer
- Trend text: `--font-size-m` / `--font-weight-prominent`
- Trend up color: `--success-50`
- Trend down color: `--error-50`
- Description: `--font-size-s` / `--text-subdued-1`

---

## Chart Type Specifications

### 1. Area Chart

**Recharts components:** `AreaChart`, `Area`, `XAxis`, `YAxis`, `CartesianGrid`

**Variants:**
- Simple area (single series, gradient fill)
- Stacked area (multiple series)
- Step area (`type="step"`)
- Area with dots (`dot` prop)

**Area fill:** Linear gradient from `--primary-20` (top, opacity 0.4) to transparent (bottom)
**Stroke:** `--primary-50`, 2px width
**Dot (on hover):** `--primary-50` fill, 4px radius

### 2. Bar Chart

**Recharts components:** `BarChart`, `Bar`, `XAxis`, `YAxis`, `CartesianGrid`

**Variants:**
- Simple bar (single series)
- Grouped bar (multiple series side by side)
- Stacked bar
- Bar with labels (value on top)

**Bar radius:** `[4, 4, 0, 0]` (top corners rounded)
**Bar gap:** 4px between bars in group
**Bar category gap:** 16px between groups
**Active bar:** `--primary-40` (one shade lighter on hover)

### 3. Horizontal Bar Chart

**Recharts components:** `BarChart` with `layout="vertical"`, `Bar`, `XAxis`, `YAxis`

**Variants:**
- Simple horizontal bar
- Horizontal bar with labels
- Multiple series horizontal
- Negative values horizontal

**Bar radius:** `[0, 4, 4, 0]` (right corners rounded)
**Y-axis:** Category names, `--font-size-s`, `--text-subdued-1`

### 4. Line Chart

**Recharts components:** `LineChart`, `Line`, `XAxis`, `YAxis`, `CartesianGrid`

**Variants:**
- Simple line (single series)
- Multi-line (multiple series, different colors)
- Curved line (`type="natural"`)
- Stepped line (`type="step"`)
- Line with dots

**Stroke:** 2px width, respective series color
**Dot:** 4px radius, filled with series color, white 2px border
**Active dot:** 6px radius on hover

### 5. Pie Chart

**Recharts components:** `PieChart`, `Pie`, `Cell`

**Variants:**
- Simple pie
- Pie with labels (outside)
- Pie with label lines
- Interactive pie (active sector grows)

**Outer radius:** 100px (adjustable)
**Stroke between slices:** 2px `--surface-0`
**Label font:** `--font-size-s` / `--font-weight-prominent`
**Label color:** `--text-default`

### 6. Donut Chart

**Recharts components:** `PieChart`, `Pie` with `innerRadius`

**Variants:**
- Simple donut with center label
- Donut with legend
- Interactive donut (hover to show segment info in center)

**Inner radius:** 60% of outer radius
**Outer radius:** 100px
**Center label:** `--font-size-2xl` / `--font-weight-heading` / `--text-default`
**Center sublabel:** `--font-size-s` / `--text-subdued-1`

### 7. Radar Chart

**Recharts components:** `RadarChart`, `Radar`, `PolarGrid`, `PolarAngleAxis`, `PolarRadiusAxis`

**Variants:**
- Simple radar (single series)
- Multi-series radar (overlay comparison)
- Radar with dots
- Filled radar with opacity

**Grid:** `--grey-40` at 40% opacity
**Angle axis label:** `--font-size-s` / `--text-subdued-1`
**Fill opacity:** 0.3 for area, 1.0 for stroke
**Stroke:** 2px

### 8. Radial Bar Chart

**Recharts components:** `RadialBarChart`, `RadialBar`, `PolarAngleAxis`

**Variants:**
- Simple radial (single metric, gauge-like)
- Stacked radial (multiple rings)
- Radial with text center
- Grid layout of multiple radials

**Track background:** `--grey-20`
**Start angle:** 90
**End angle:** -270 (full circle) or custom for gauge
**Inner radius:** 30px
**Outer radius:** increments of 20px per ring
**Corner radius:** `--radius-4`

### 9. Scatter Chart

**Recharts components:** `ScatterChart`, `Scatter`, `XAxis`, `YAxis`, `CartesianGrid`, `ZAxis`

**Variants:**
- Simple scatter (single group)
- Multi-group scatter (different colors per group)
- Scatter with size encoding (ZAxis)

**Dot shape:** Circle
**Dot size:** 8px default, ZAxis-controlled for bubble variant
**Dot fill opacity:** 0.7
**Dot stroke:** 1px darker shade of fill color

### 10. Funnel Chart

**Recharts components:** `FunnelChart`, `Funnel`, `Cell`, `LabelList`

**Variants:**
- Simple funnel
- Funnel with percentages
- Funnel with custom colors per stage

**Stage colors:** Gradient from `--primary-50` (top) through shades
**Label position:** right side
**Label font:** `--font-size-m` / `--font-weight-prominent`
**Value font:** `--font-size-s` / `--text-subdued-1`
**Gap between stages:** 2px

### 11. Treemap

**Recharts components:** `Treemap`

**Variants:**
- Simple treemap
- Treemap with custom content
- Nested treemap (hierarchical data)

**Tile gap:** 2px
**Tile radius:** `--radius-4`
**Tile label:** `--font-size-s` / `--font-weight-prominent` / white text
**Fill:** Uses series colors with slight opacity variation by depth

### 12. Combo Chart (Bar + Line)

**Recharts components:** `ComposedChart`, `Bar`, `Line`, `XAxis`, `YAxis`, `CartesianGrid`

**Variants:**
- Bar + Line overlay
- Dual Y-axis (bar on left, line on right)

**Bar:** Same styling as Bar Chart
**Line:** Same styling as Line Chart
**Dual Y-axis:** Left = `--text-subdued-1`, Right = `--text-subdued-1`, separate scales

---

## Interaction

### Tooltips
- Appear on hover over data points/bars/slices
- Follow cursor for line/area charts
- Fixed position near data point for bar/pie
- Show formatted label + value + color indicator
- Dismiss on mouse leave
- Animation: 100ms fade-in

### Legend
- Click to toggle series visibility
- Hover to highlight corresponding series
- Active series: `--text-default` label
- Inactive series: `--text-subdued-2` label, 30% opacity

### Active States
- **Bar hover:** Lighten one shade (50 → 40)
- **Line/Area dot hover:** Increase dot radius from 4px to 6px
- **Pie/Donut hover:** Expand sector by 4px (`outerRadius` increase)
- **Scatter dot hover:** Scale 1.5x, show tooltip

### Animation
- Chart enter: 500ms ease-out, data draws in from left/bottom
- Tooltip: 100ms fade
- Legend toggle: 200ms ease-out opacity
- Respect `prefers-reduced-motion`: instant rendering, no animation

---

## Accessibility

- `accessibilityLayer` prop on all chart wrappers (adds keyboard navigation)
- `role="img"` on chart container
- `aria-label` describing chart type and data summary
- Tooltip content readable by screen readers via `aria-live="polite"`
- Color is never the sole differentiator — tooltips and legends provide text labels
- Sufficient contrast between adjacent chart segments (minimum 3:1)
- Focus visible on interactive elements: 4px ring `--primary-60`

---

## Responsive Behavior

- Charts use `ResponsiveContainer` (built into `ChartContainer`) for fluid width
- Min height: 200px prevents collapse
- On narrow screens (<640px):
  - Legend moves below chart
  - Axis labels may rotate 45 degrees or truncate
  - Pie/Donut reduces outer radius proportionally
- Chart container maintains aspect ratio via min-height

---

## Performance Best Practices

### Rendering Optimization
- **Memoize chart data transformations** — Use `useMemo` on all data mapping, sorting, and aggregation. Recharts re-renders the entire SVG on data reference changes, so stable references are critical.
- **Memoize ChartConfig objects** — Define `chartConfig` as a module-level constant or wrap in `useMemo`. Changing the config reference triggers a full re-render of all chart primitives.
- **Avoid anonymous components in render props** — Recharts `content` props (custom tooltip, custom legend) receive component references. Define these as standalone components, not inline arrow functions, to prevent unmount/remount cycles.
- **Throttle resize observations** — `ResponsiveContainer` fires on every pixel change during resize. The chart container should debounce re-renders with `requestAnimationFrame` or a 100ms throttle.

### Large Dataset Handling
- **Data windowing for time series** — For datasets exceeding 500 points, implement client-side windowing that renders only the visible time range plus a buffer. Use `ReferenceArea` with brush controls to let users zoom into ranges.
- **Downsample before rendering** — For line/area charts with >1000 data points, apply Largest-Triangle-Three-Buckets (LTTB) or min-max downsampling to reduce points while preserving visual shape. Target ≤2 data points per rendered pixel.
- **Paginate categorical data** — Bar charts, horizontal bar charts, and funnels should paginate or virtualize when categories exceed 50. Render the visible window and provide scroll/navigation controls.
- **Lazy render off-screen charts** — When multiple charts appear on a dashboard, use `IntersectionObserver` to defer SVG rendering until the chart scrolls into view. Render a placeholder with fixed dimensions to prevent layout shift.

### SVG Performance
- **Limit gradient definitions** — Each `<linearGradient>` in SVG adds to the DOM. For stacked area charts with many series, share gradient definitions by referencing a single `<defs>` block rather than creating per-series gradients.
- **Disable animation for large datasets** — Set `isAnimationActive={false}` when rendering >200 data points. SVG path animation on hundreds of elements causes frame drops.
- **Use `animationDuration={0}` on tooltips for live data** — When charts update frequently (real-time dashboards), tooltip animation creates jank. Disable it.

### Bundle Optimization
- **Import Recharts components individually** — Import `AreaChart` from `recharts/es6/chart/AreaChart` or rely on tree-shaking with named imports. Never `import * as Recharts`.
- **Code-split chart pages** — Each chart type page should be `React.lazy()` loaded. A dashboard with 12 chart types should not bundle all 12 in the initial chunk.
- **Externalize Recharts in library builds** — If shipping the chart system as a package, mark `recharts` as a peer dependency to avoid bundling it twice.

### Scalability Considerations
- **Consistent ChartConfig contract** — All charts accept the same `ChartConfig` shape so consumers can build config-driven dashboards where chart type is switchable without restructuring data.
- **Server-side data aggregation** — For production dashboards, aggregation (sum, average, percentile) should happen server-side. The chart component should receive pre-aggregated data, not raw rows.
- **Real-time update pattern** — For live-updating charts, use `useRef` to hold the data array and batch state updates with `requestAnimationFrame`. This prevents React from scheduling 60 re-renders per second on streaming data.
- **Theme-reactive colors** — All colors flow through CSS variables from `ChartConfig`, so theme switches apply instantly without re-rendering the chart component tree.
- **Composable chart building blocks** — Export axes, grids, tooltips, and legends as standalone composable pieces so consumers can build custom chart layouts without forking the component.

---

## Dependencies

- `recharts` — Core charting library
- `@/components/ui/chart` — shadcn/ui chart primitives (ChartContainer, ChartTooltip, ChartLegend)
- `@/components/ui/card` — Card wrapper for chart demos
- `lucide-react` — Icons for trend indicators (TrendingUp, TrendingDown)
