# Calendar Component Spec

---

## Overview

A multi-view calendar component with three interactive views:
1. **Day View** (default) — Month grid showing days
2. **Month View** — 3x4 grid of months, triggered by clicking the month name
3. **Year View** — 4x4 grid of years (16-year range), triggered by clicking the year

Users drill down: Year View → Month View → Day View. Supports single date and date range selection modes.

---

## Anatomy

```
┌──────────────────────────────────┐
│  [<]    February  2025      [>]  │  ← Header (nav + clickable labels)
├──────────────────────────────────┤
│  SUN  MON  TUE  WED  THU  FRI  SAT │  ← Weekday headers (Day View only)
│──────────────────────────────────│
│  26   27   28   29   30   31   01  │  ← Day grid (outside days subdued)
│  02   03   04   05   06   07   08  │
│  09   10   11   12   13   14   15  │
│  16  [17]  18   19   20   21   22  │  ← Selected day = primary-50 circle
│  23   24   25   26   27   28   01  │
│  02   03   04   05   06   07   08  │
└──────────────────────────────────┘
```

**Month View:**
```
┌──────────────────────────────────┐
│  [<]    February  2025      [>]  │
├──────────────────────────────────┤
│     Jan      [Feb]      Mar      │  ← 3x4 grid, selected = pill
│     Apr       May       Jun      │
│     Jul       Aug       Sep      │
│     Oct       Nov       Dec      │
└──────────────────────────────────┘
```

**Year View:**
```
┌──────────────────────────────────┐
│  [<]      2019 - 2034       [>]  │
├──────────────────────────────────┤
│   2019    2020    2021    2022   │  ← 4x4 grid, selected = pill
│   2023    2024   [2025]   2026   │
│   2027    2028    2029    2030   │
│   2031    2032    2033    2034   │
└──────────────────────────────────┘
```

---

## Design Tokens

### Container
- Background: `--surface-0`
- Border radius: `--radius-16`
- Padding: `--space-16`
- Shadow: `--shadow-small` (when standalone)
- Min width: 320px

### Header
- Height: `--height-m` (40px)
- Month label: `--font-size-xl` / `--font-weight-heading` / `--line-height-l` / `--primary-60` color
- Year label: `--font-size-xl` / `--font-weight-heading` / `--line-height-l` / `--primary-60` color
- Year range (Year View): `--font-size-xl` / `--font-weight-heading` / `--primary-60`
- Nav arrows: 20x20 Lucide ChevronLeft/ChevronRight, color `--primary-50`
- Nav arrow hover: `--primary-40`
- Nav arrow active: `--primary-60`
- Gap between month and year: `--space-8`

### Weekday Headers (Day View only)
- Font: `--font-size-s` / `--font-weight-heading` / `--line-height-s`
- Color: `--text-subdued-1`
- Text transform: uppercase
- Letter spacing: `--letter-spacing-baggy`
- Padding bottom: `--space-8`
- Border bottom: 1px solid `--grey-40`

### Day Cells
- Size: 40x40 (square)
- Font: `--font-size-m` / `--font-weight-regular` / `--line-height-m`
- Color (current month): `--text-default`
- Color (outside month): `--text-subdued-2`
- Gap between cells: `--space-2`
- Border radius: `--radius-full` (circle)

### Day Cell States
| State | Background | Text Color | Border |
|-------|-----------|------------|--------|
| Default | transparent | `--text-default` | none |
| Outside month | transparent | `--text-subdued-2` | none |
| Hover | `--primary-10` | `--primary-60` | none |
| Selected | `--primary-50` | `--primary-inverse` | none |
| Today (unselected) | `--primary-20` | `--primary-60` | none |
| Today (selected) | `--primary-50` | `--primary-inverse` | none |
| Disabled | transparent | `--text-subdued-2` | none, 30% opacity |
| Focus visible | transparent | `--text-default` | 4px ring `--primary-60` |

### Range Selection (mode="range")

Visual structure for date range selection:

```
│  02  [03]  04   05   06   07   08  │  ← Start: circle + right half strip
│  09   10   11   12   13   14   15  │  ← Middle: full-width strip
│  16   17   18   19  [20]  21   22  │  ← End: circle + left half strip
```

**Range Start Cell:**
- Cell background: `linear-gradient(to right, transparent 50%, --primary-20 50%)` — right half shows range strip
- Button: `--primary-50` bg / `--primary-inverse` text / full circle

**Range End Cell:**
- Cell background: `linear-gradient(to left, transparent 50%, --primary-20 50%)` — left half shows range strip
- Button: `--primary-50` bg / `--primary-inverse` text / full circle

**Range Middle Cell:**
- Cell background: `--primary-20` — full-width band connecting start to end
- Text: `--text-default`

**Row continuity:** The `--primary-20` strip spans the full cell width so rows visually connect into a continuous band across the calendar grid.

### Month Cells (Month View)
- Layout: 3 columns x 4 rows
- Cell height: `--height-l` (48px)
- Font: `--font-size-l` / `--font-weight-prominent` / `--line-height-l`
- Color: `--text-default`
- Selected: `--primary-50` bg / `--primary-inverse` text / `--radius-full` pill shape
- Hover: `--primary-10` bg / `--primary-60` text
- Gap: `--space-8`

### Year Cells (Year View)
- Layout: 4 columns x 4 rows
- Cell height: `--height-l` (48px)
- Font: `--font-size-l` / `--font-weight-prominent` / `--line-height-l`
- Color: `--text-default`
- Selected: `--primary-50` bg / `--primary-inverse` text / `--radius-full` pill shape
- Hover: `--primary-10` bg / `--primary-60` text
- Gap: `--space-8`

---

## Interaction

### Navigation
- **Left/Right arrows**: In Day View, navigate months. In Month View, navigate years. In Year View, navigate 16-year ranges.
- **Click month name** in header: Switch to Month View
- **Click year** in header: Switch to Year View
- **Select a month** (Month View): Switch to Day View for that month
- **Select a year** (Year View): Switch to Month View for that year

### View Switching Flow

```
Day View (default)
  ├── Click month name → Month View
  │     ├── Select a month → Day View (for that month)
  │     └── Left/Right arrows → navigate years
  └── Click year → Year View
        ├── Select a year → Month View (for that year)
        └── Left/Right arrows → navigate 16-year ranges
```

The header renders two clickable buttons (month name, year) using `displayMonth` from component state. Clicking triggers `setPickerView()` which conditionally renders MonthPicker, YearPicker, or the DayPicker grid.

### Keyboard
- **ArrowLeft/Right**: Move focus between days/months/years
- **ArrowUp/Down**: Move focus between rows
- **Enter/Space**: Select focused cell
- **Escape**: Go back one view level (Year → Month → Day)
- **Tab**: Move focus to nav arrows, then to grid

### Animation
- View transitions: 150ms ease-out opacity + transform
- Respect `prefers-reduced-motion`

---

## Accessibility

- `role="grid"` on the day/month/year grid
- `role="gridcell"` on each cell
- `aria-selected="true"` on selected cell
- `aria-disabled="true"` on disabled cells
- `aria-label` on nav buttons ("Previous month", "Next month", etc.)
- `aria-live="polite"` on header for screen reader announcements
- `aria-current="date"` on today's date
- Focus visible: 4px ring `--primary-60`, keyboard only

---

## Props

```tsx
interface DSCalendarProps {
  mode?: "single" | "range"
  value?: Date
  defaultValue?: Date
  onChange?: (date: Date) => void
  rangeValue?: { start: Date; end: Date }
  onRangeChange?: (range: { start: Date; end: Date }) => void
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[] | ((date: Date) => boolean)
  className?: string
  showOutsideDays?: boolean
  locale?: Intl.Locale | string
}
```

Supports both controlled (`value` + `onChange`) and uncontrolled (`defaultValue`) patterns.

---

## Performance Best Practices

### Rendering Optimization
- **Memoize the day grid** — The 6×7 day cell grid should be wrapped in `React.memo` with a custom comparator that only re-renders when `displayMonth`, `selectedDate`, or `disabledDates` change. Avoid re-rendering all 42 cells on every parent render.
- **Stable callback references** — All event handlers (`onDayClick`, `onNavigate`, `onViewChange`) must use `useCallback` with correct dependency arrays. These are passed to 42+ child cells, so unstable references defeat memoization.
- **Pre-compute disabled state** — Convert `disabledDates` into a `Set<string>` (ISO date strings) once per render cycle via `useMemo`, rather than iterating the array on every cell render.
- **Avoid inline style objects** — Day cells render 42 times per view. Define state-based style maps as constants outside the component or use `useMemo` to prevent object allocation per cell.

### Date Calculation
- **Cache month metadata** — `useMemo` the first day of month, number of days, and leading/trailing days from adjacent months. These are pure functions of `displayMonth` and should not recalculate on selection changes.
- **Use timestamp comparison** — Compare dates via `getTime()` instead of creating new `Date` objects. This avoids GC pressure during rapid navigation.
- **Lazy locale formatting** — Use `Intl.DateTimeFormat` instances cached via `useMemo(locale)` rather than creating new formatters per cell.

### Bundle Optimization
- **No external date library dependency** — Use native `Date` and `Intl.DateTimeFormat` APIs. Avoid pulling in `date-fns` or `dayjs` for calendar arithmetic — the required operations (add month, start of week) are trivial to implement in <50 lines.
- **Tree-shakeable exports** — Export `Calendar`, `MonthPicker`, `YearPicker` as named exports so consumers can import only what they need.

### Scalability Considerations
- **Controlled vs uncontrolled** — Support both patterns. Large forms benefit from controlled mode where the parent manages state; standalone usage benefits from uncontrolled mode with `defaultValue`.
- **Composable sub-components** — MonthPicker and YearPicker should be usable independently for use cases that don't need the full calendar.
- **i18n-ready** — Accept `locale` prop and derive weekday names, month names, and first-day-of-week from `Intl.DateTimeFormat`. Never hardcode English strings.
- **Disabled date predicate** — Accept both `Date[]` (simple cases) and `(date: Date) => boolean` (complex rules like "no weekends", "no past dates") to scale to enterprise scheduling use cases.

---

## Size

Single size. Container adjusts to fit content. Recommended minimum: 320px wide.
