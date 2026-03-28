# Data Grid Component Spec

---

## Overview

A high-performance, virtualized data grid built on **react-data-grid**. Provides enterprise-grade tabular data display with inline editing, sorting, filtering, row selection, column grouping, frozen columns, tree/grouped data, copy/paste, drag-fill, and full keyboard navigation.

### Variants

1. **Basic Grid** — Simple read-only table with sorting
2. **Editable Grid** — Inline cell editing with text editors and validation
3. **Sortable Grid** — Column sorting with custom sort icons
4. **Row Selection Grid** — Checkbox-based single/multi row selection
5. **Frozen Columns Grid** — Pinned left columns that stay visible on scroll
6. **Column Grouping Grid** — Multi-level grouped column headers
7. **Tree / Grouped Grid** — Hierarchical row grouping with expand/collapse
8. **Custom Cell Renderers Grid** — Badges, progress bars, avatars in cells
9. **Summary Rows Grid** — Pinned top/bottom summary/aggregation rows
10. **Full-Featured Grid** — All features combined
11. **Master-Detail Grid** — Expandable rows with nested child tables
12. **Shimmer Loading Grid** — Skeleton cell loading state
13. **Infinite Scroll Grid** — Scroll-based data loading with shimmer placeholders
14. **Row Edit Mode Grid** — Full-row inline editing with permission-based controls

---

## Anatomy

```
┌─────────────────────────────────────────────────────────────────┐
│  ☐  │ ID  │  Name ▲  │  Email          │  Status  │  Amount   │ ← Header row
├─────┼─────┼──────────┼─────────────────┼──────────┼───────────┤
│  ☐  │ 001 │ Alice    │ alice@mail.com  │ ● Active │  $1,200   │ ← Data row
│  ☐  │ 002 │ Bob      │ bob@mail.com    │ ○ Idle   │  $3,400   │
│  ☑  │ 003 │ Charlie  │ char@mail.com   │ ● Active │  $2,100   │ ← Selected row
│  ☐  │ 004 │ Diana    │ diana@mail.com  │ ✕ Error  │    $800   │
│  ...│ ... │ ...      │ ...             │ ...      │ ...       │ ← Virtual rows
├─────┴─────┴──────────┴─────────────────┴──────────┴───────────┤
│  Total: 4 rows                                    │  $7,500   │ ← Summary row
└─────────────────────────────────────────────────────────────────┘
```

### Column Group Anatomy

```
┌──────────────────────────┬──────────────────────────┐
│      Personal Info       │        Contact           │ ← Group header row
├────────────┬─────────────┼────────────┬─────────────┤
│ First Name │  Last Name  │   Email    │    Phone    │ ← Column header row
├────────────┼─────────────┼────────────┼─────────────┤
│ Alice      │ Smith       │ a@mail.com │ 555-0100    │
└────────────┴─────────────┴────────────┴─────────────┘
```

### Tree Grid Anatomy

```
┌──────────────────────────────────────────────┐
│  Name                  │  Count  │  Revenue  │
├──────────────────────────────────────────────┤
│ ▼ United States        │    12   │  $45,000  │ ← Expanded group
│    ├── New York         │     5   │  $22,000  │
│    └── California       │     7   │  $23,000  │
│ ▶ United Kingdom       │     8   │  $31,000  │ ← Collapsed group
│ ▼ Germany              │     6   │  $18,000  │
│    ├── Berlin           │     3   │  $10,000  │
│    └── Munich           │     3   │   $8,000  │
└──────────────────────────────────────────────┘
```

### Master-Detail Anatomy

```
┌──────┬──────────────┬──────────┬───────────┐
│  ▶   │ Engineering  │ 12 staff │  $540,000 │ ← Collapsed parent row
│  ▼   │ Marketing    │  8 staff │  $320,000 │ ← Expanded parent row
├──────┴──────────────┴──────────┴───────────┤
│  ┌───────────────────────────────────────┐ │
│  │  Product  │  SKU   │  Price  │  Qty   │ │ ← Nested detail table
│  │  Item A   │  A001  │  $120   │   50   │ │
│  │  Item B   │  A002  │  $85    │   30   │ │
│  └───────────────────────────────────────┘ │
│  ▶   │ Sales        │  6 staff │  $280,000 │
└──────┴──────────────┴──────────┴───────────┘
```

### Row Edit Mode Anatomy

```
┌──────────────────────────────────────────────────────────┐
│  Name     │  Email          │  Department  │  Actions    │
├──────────────────────────────────────────────────────────┤
│  Alice    │  alice@co.com   │  Engineering │  [✏ Edit]   │ ← Read-only row
│ [Bob____] │ [bob@co.com___] │ [Marketing_] │  [✓] [✕]   │ ← Editing row (highlighted)
│  Charlie  │  charlie@co.com │  Sales       │  [✏ Edit]   │
└──────────────────────────────────────────────────────────┘
```

---

## Design Tokens

### Grid Container

- Background: `--surface-0`
- Border: 1px solid `--grey-40`
- Border radius: `--radius-12`
- Shadow: `--shadow-small`
- Font family: `--font-sans` (Inter)

### Header Row

- Background: `--surface-10`
- Height: 40px (`--height-m`)
- Font: `--font-size-s` / `--font-weight-heading` / `--line-height-s`
- Color: `--text-subdued-1`
- Text transform: none
- Border bottom: 1px solid `--grey-40`
- Padding horizontal: `--space-12`
- Padding vertical: `--space-8`

### Header Sort Indicator

- Sort icon: Lucide ArrowUp/ArrowDown, 13px, strokeWidth 2.2
- Both icons always visible, active icon highlighted in `--primary-50`
- Inactive icon color: `--text-subdued-2`
- Gap between icons: 1px
- Gap between label and icon group: `--space-4`
- Icons use `display: block`, `verticalAlign: middle` for proper alignment

### Column Group Header

- Background: `--surface-10`
- Font: `--font-size-s` / `--font-weight-heading`
- Color: `--text-default`
- Border bottom: 1px solid `--grey-40`
- Text align: center

### Data Rows

- Background (default): `--surface-0`
- Height: 48px (`--height-l`)
- Font: `--font-size-m` / `--font-weight-regular` / `--line-height-m`
- Color: `--text-default`
- Border bottom: 1px solid `--grey-20`
- Padding horizontal: `--space-12`
- Padding vertical: `--space-8`

### Row States

| State | Background | Text | Border |
|-------|-----------|------|--------|
| Default | `--surface-0` | `--text-default` | 1px `--grey-20` bottom |
| Hover | `--primary-10` | `--text-default` | 1px `--grey-20` bottom |
| Selected | `--primary-20` | `--text-default` | 1px `--grey-20` bottom |
| Selected + Hover | `--primary-20` | `--text-default` | 1px `--grey-20` bottom |
| Active cell | — | — | 2px `--primary-50` outline |
| Editing cell | — | — | 2px `--primary-50` box-shadow ring |
| Editing row | `--primary-10` | `--text-default` | 1px `--grey-20` bottom |
| Disabled | `--grey-20` | `--text-subdued-2` | — |

### Selection Checkbox

Uses the project's Radix-based checkbox component:
- Size: 20x20 (M)
- Unchecked: 1px `--grey-40` border / `--surface-0` bg
- Checked: `--primary-50` bg / white checkmark
- Indeterminate: `--primary-50` bg / white dash
- Hover: `--primary-40` border
- Focus: 4px ring `--primary-60`
- Disabled: 30% opacity

### Frozen Column Divider

- Right border: 2px solid `--grey-40`
- Shadow: 2px 0 4px rgba(0,0,0,0.06)

### Summary Row

- Background: `--surface-10`
- Font: `--font-size-m` / `--font-weight-prominent`
- Color: `--text-default`
- Border top: 2px solid `--grey-40`

### Cell Editor (Inline Edit)

- Background: `--surface-0`
- Border: none (uses box-shadow ring instead)
- Box shadow: `0 0 0 2px var(--primary-50)`
- Font: `--font-size-m` / `--font-weight-regular`
- Color: `--text-default`
- Width: 100% of cell
- Padding: matches cell padding
- Placeholder: italic, `--text-subdued-2`

### Email Validation Error

- Input ring: `0 0 0 2px var(--error-50)` (replaces primary ring)
- Error tooltip: `--error-50` background, white text, `--radius-6`, positioned below input

### Tree Group Row

- Background: `--surface-10`
- Font: `--font-size-m` / `--font-weight-prominent`
- Color: `--text-default`
- Toggle icon: Lucide ChevronRight (16px), rotates 90deg when expanded
- Toggle icon color: `--text-subdued-1`
- Indent per level: `--space-24`
- Group count badge: `--font-size-s` / `--text-subdued-1`

### Master-Detail

- Expand column width: 50px (accounts for cell padding)
- Expand icon: Lucide ChevronRight (16px), rotates 90deg when expanded
- Detail row: spans all columns via `colSpan` on first column
- Detail panel background: inherits from row
- Nested grid max height: 220px with vertical scroll
- Detail cell: `overflow: auto`, `align-items: stretch`, `padding: 0`

### Shimmer / Skeleton Loading

- Shimmer bar height: 14px
- Shimmer bar border radius: `--radius-4`
- Shimmer bar background: `--grey-20`
- Shimmer animation: gradient sweep `--grey-20` → `--grey-30` → `--grey-20`, 1.5s infinite
- Shimmer bar width: varies per column (60%–90%) for visual variety

### Row Edit Mode

- Edit button: icon button with Pencil icon, visible based on user permission level
- Save button: Check icon, `--success-50` color on hover
- Cancel button: X icon, `--error-50` color on hover
- Editing row highlight: `--primary-10` background via `rowClass`
- Inline input: full-width, transparent background, bottom border `--grey-40`, focus border `--primary-50`

### Resize Handle

- Width: 4px
- Color: transparent (invisible until hover)
- Hover color: `--primary-50`
- Cursor: `col-resize`
- Active color: `--primary-50`

### Scrollbar

- Webkit track: `--surface-0` background
- Webkit thumb: `--grey-40` with `--radius-full`, hover `--grey-50`
- Firefox: `scrollbar-color: var(--grey-40) var(--surface-0)`, `scrollbar-width: thin`

### Empty State

- Center-aligned in grid body
- Icon: Lucide Inbox (48px) / `--text-subdued-2`
- Message: `--font-size-l` / `--font-weight-prominent` / `--text-subdued-1`
- Sub-message: `--font-size-m` / `--text-subdued-2`

---

## Custom Cell Renderer Tokens

### Status Badge Cell

- Uses Badge component
- Active: `--success-50` bg / `--success-80` text
- Idle: `--warning-50` bg / `--warning-80` text
- Error: `--error-50` bg / `--error-80` text
- Radius: `--radius-full`
- Font: `--font-size-s` / `--font-weight-prominent`

### Progress Bar Cell

- Track: `--grey-20`
- Fill: `--primary-50`
- Height: 6px
- Border radius: `--radius-full`
- Value label: `--font-size-s` / `--text-subdued-1`

### Avatar Cell

- Size: 28x28
- Border radius: `--radius-full`
- Fallback bg: `--primary-20`
- Fallback text: `--primary-60` / `--font-size-s`
- Gap to name: `--space-8`

---

## Interaction

### Sorting

- Click column header to sort ascending → descending → none
- Ctrl+Click (Cmd on Mac) for multi-column sort
- Sort priority shown as small number badge
- Both ↑ and ↓ arrows always visible; active direction highlighted in `--primary-50`

### Cell Editing

- Double-click or press Enter to begin editing
- Escape to cancel, Enter/Tab to commit
- Tab moves to next editable cell
- Click outside commits by default
- Placeholder text shown in empty cells during edit mode
- Email columns validate via regex with visual error feedback

### Row Edit Mode

- Click edit button to make entire row editable
- All editable cells show inline input fields simultaneously
- Save (check) commits changes, Cancel (X) discards
- Edit button visibility controlled by permission level (admin/editor can edit, viewer cannot)
- Only one row editable at a time

### Row Selection

- Click checkbox to select/deselect
- Header checkbox: select all / deselect all
- Shift+Click: range select
- Ctrl+Click: toggle individual

### Master-Detail Expand/Collapse

- Click chevron to toggle detail panel
- Detail panel renders a nested DataGrid with its own scroll
- Detail row height is dynamic, calculated from content
- Nested grid has max height with overflow scroll for large detail datasets

### Infinite Scroll

- Grid detects scroll proximity to bottom (< 100px threshold)
- Appends shimmer skeleton rows during data fetch
- Skeleton rows match column structure with animated shimmer bars
- Loading triggered once per threshold cross, debounced

### Column Resizing

- Drag resize handle at column header right edge
- Double-click resize handle to auto-fit content
- Min width: 50px

### Column Reordering

- Drag column header to reorder
- Drop indicator: 2px `--primary-50` vertical line
- Dragging header: 50% opacity

### Tree Expand/Collapse

- Click chevron icon to toggle
- Right arrow: expand collapsed group
- Left arrow: collapse expanded group, or go to parent
- Animation: 150ms ease-out rotation on chevron

### Copy/Paste

- Ctrl+C / Cmd+C: copy active cell value
- Ctrl+V / Cmd+V: paste into active cell (if editable)

### Keyboard Navigation

- Arrow keys: navigate between cells
- Tab/Shift+Tab: move between editable cells
- Enter: begin editing / commit edit
- Escape: cancel edit
- Home/End: first/last cell in row
- Ctrl+Home/End: first/last cell in grid
- Space: toggle row selection (on checkbox column)

---

## Accessibility

- `role="grid"` on container (default from react-data-grid)
- `role="row"` on each row
- `role="columnheader"` on header cells
- `role="gridcell"` on data cells
- `aria-sort` on sorted column headers (ascending/descending/none)
- `aria-selected` on selected rows and active cell
- `aria-expanded` on tree group rows and master-detail expand buttons
- `aria-level` on tree group rows
- `aria-rowcount` for total rows (including virtual)
- `aria-label` on grid describing content
- Focus visible: 2px `--primary-50` outline on active cell
- Keyboard-only focus ring (`:focus-visible`)
- Screen reader announces sort changes via `aria-live`

---

## CSS Override Strategy

react-data-grid uses CSS variables for theming. Override them to map to design system tokens:

```css
.rdg-theme {
  --rdg-color: var(--text-default);
  --rdg-background-color: var(--surface-0);
  --rdg-header-background-color: var(--surface-10);
  --rdg-header-draggable-background-color: var(--surface-20);
  --rdg-row-hover-background-color: var(--primary-10);
  --rdg-row-selected-background-color: var(--primary-20);
  --rdg-row-selected-hover-background-color: var(--primary-20);
  --rdg-border-color: var(--grey-40);
  --rdg-selection-color: var(--primary-50);
  --rdg-font-size: var(--font-size-m);
  --rdg-checkbox-focus-color: var(--primary-60);

  border-radius: var(--radius-12);
  border: 1px solid var(--grey-40);
  font-family: var(--font-sans);
}
```

**Critical:** Do NOT set `overflow: hidden` on the grid container — react-data-grid manages its own virtualized scroll internally. Adding overflow hidden breaks scroll behavior.

---

## Performance Best Practices

### Virtualization
- **Leverage built-in virtualization** — react-data-grid virtualizes rows by default. Only the visible rows plus a small buffer are rendered in the DOM. Never disable `enableVirtualization` for grids with >100 rows.
- **Fixed row heights when possible** — Use a constant `rowHeight` (48px) for all non-detail rows. Variable row heights via function are supported but prevent the grid from optimizing scroll position calculations. Only use dynamic `rowHeight` for master-detail where detail panels have variable content.
- **Column width strategy** — Prefer fixed pixel widths over `"auto"` or `"max-content"`. Auto-sizing requires measuring every cell in the column, which defeats virtualization benefits for large datasets.

### Data Management
- **Memoize rows and columns** — The `rows` and `columns` arrays must have stable references. Wrap in `useMemo` or manage via `useState`. Passing a new array reference on every render forces a full grid re-render.
- **Memoize sorted/filtered rows** — Sorting and filtering should be `useMemo` computations derived from `rawRows` + `sortColumns` + `filterValues`. Never sort/filter inline in the render path.
- **Stable `rowKeyGetter`** — Use `useCallback` for the row key getter function. An unstable reference causes react-data-grid to re-index all rows.
- **Immutable row updates** — When updating rows (editing, adding), create new array references with spread or `Array.from`. react-data-grid uses reference equality for change detection.

### Rendering Optimization
- **Memoize custom cell renderers** — `renderCell`, `renderEditCell`, and `renderSummaryCell` functions are called for every visible cell. Define them outside the component or wrap in `useCallback`. Inline arrow functions create new references per render, forcing all cells to re-render.
- **Shared renderers object** — Create a single `gridRenderers` object for custom checkbox and sort status renderers. Pass it to all grid variants via the `renderers` prop. Define this object at module scope (not inside a component) so it has a stable reference.
- **Avoid re-rendering on scroll** — Do not store scroll position in React state. If you need scroll position (e.g., for infinite scroll), use the `onScroll` callback to read position and trigger loading without causing re-renders of the grid itself.

### Infinite Scroll
- **Batch size** — Load 30–50 rows per fetch. Smaller batches increase request frequency; larger batches increase perceived latency.
- **Shimmer row pattern** — Append skeleton rows to the end of the data array during loading. Use a union type (`DataRow | SkeletonRow`) and conditionally render shimmer bars in cell renderers. This is more performant than overlaying a separate loading component.
- **Debounce scroll detection** — Only trigger the next page load when the user scrolls within 100px of the bottom AND no load is in progress. Use a ref flag (`isLoadingRef`) to prevent duplicate fetches.
- **Dispose pattern** — Cancel in-flight fetch requests when the component unmounts or when a new fetch supersedes the previous one. Use `AbortController`.

### Master-Detail
- **Lazy render detail panels** — Only render the nested DataGrid when the row is expanded. Use conditional rendering in the detail cell, not `display: none`. Collapsed rows should return a standard-height row with zero detail content.
- **Cap detail height** — Set a max height (220px) on the detail panel with `overflow: auto`. Without a cap, expanding a row with 100+ child items creates a massive row that pushes all subsequent rows off-screen.
- **Memoize child data** — The detail table's rows should be `useMemo`'d per parent row ID, not re-fetched or re-computed on every expand/collapse.

### Row Edit Mode
- **Draft state pattern** — Store the editing row's data in a separate `editDraft` state, not inline in the rows array. This avoids re-rendering the entire grid on every keystroke. Commit the draft to rows only on save.
- **Single-row editing** — Only one row should be editable at a time. Track `editingRowId` as a scalar, not an array or set.

### Bundle Optimization
- **Import react-data-grid styles once** — Import `react-data-grid/lib/styles.css` in a single shared CSS file. Each variant page should not re-import it.
- **Tree-shake column definitions** — Define column arrays per variant page, not in a shared module that exports all possible columns. This allows unused column renderers to be tree-shaken.
- **Code-split variant pages** — Each variant (editable, tree-grid, master-detail, etc.) should be lazy-loaded via `React.lazy()`. A consumer using only the basic grid should not bundle master-detail or tree-grid code.

### Scalability Considerations
- **10K+ rows** — react-data-grid handles 10K+ rows via virtualization with no special configuration. For 100K+ rows, implement server-side pagination or infinite scroll rather than loading all rows into memory.
- **Server-side sorting/filtering** — For production use with large datasets, sorting and filtering should be delegated to the API. Pass sort/filter state to the server and replace the rows array with the response. Client-side sort/filter is only appropriate for datasets that fit comfortably in memory (<5K rows).
- **Column count** — Performance degrades above ~50 visible columns. For wide datasets, use frozen columns to keep key identifiers visible and allow horizontal scroll for the rest. Consider column visibility toggles for datasets with >20 columns.
- **Real-time updates** — For live data grids (e.g., trading, monitoring), batch row updates into animation frames. Never call `setRows` more than once per frame. Use `requestAnimationFrame` to coalesce updates.

---

## Props Reference (Key Props)

| Prop | Type | Description |
|------|------|-------------|
| `columns` | `Column[]` | Column definitions (key, name, width, sortable, etc.) |
| `rows` | `R[]` | Data rows |
| `rowKeyGetter` | `(row) => K` | Unique row key extractor |
| `rowHeight` | `number \| (row) => number` | Row height (default 35, we use 48) |
| `headerRowHeight` | `number` | Header height (we use 40) |
| `selectedRows` | `ReadonlySet<K>` | Selected row keys |
| `onSelectedRowsChange` | `(set) => void` | Selection change handler |
| `sortColumns` | `SortColumn[]` | Sort state |
| `onSortColumnsChange` | `(cols) => void` | Sort change handler |
| `onRowsChange` | `(rows, data) => void` | Row edit handler |
| `onScroll` | `(event) => void` | Scroll handler (for infinite scroll) |
| `topSummaryRows` | `SR[]` | Top pinned summary rows |
| `bottomSummaryRows` | `SR[]` | Bottom pinned summary rows |
| `enableVirtualization` | `boolean` | Virtual scrolling (default true) |
| `renderers` | `Renderers` | Custom renderers (checkbox, sort status) |
| `rowClass` | `(row) => string` | Dynamic row CSS class |
| `className` | `string` | CSS class for grid |
| `defaultColumnOptions` | `object` | Default column config |
| `direction` | `'ltr' \| 'rtl'` | Text direction |

---

## Column Definition

```tsx
interface Column<R> {
  key: string                     // Unique identifier
  name: string | ReactElement     // Header text
  width?: number | string         // 'auto', '25%', 'max-content'
  minWidth?: number               // Default 50
  maxWidth?: number
  frozen?: boolean                // Pin to start edge
  resizable?: boolean             // Enable resize
  sortable?: boolean              // Enable sort
  draggable?: boolean             // Enable reorder
  editable?: boolean | (row) => boolean
  colSpan?: (args) => number      // Column spanning (for master-detail)
  renderCell?: (props) => ReactNode
  renderHeaderCell?: (props) => ReactNode
  renderEditCell?: (props) => ReactNode
  renderSummaryCell?: (props) => ReactNode
  cellClass?: string | (row) => string
  headerCellClass?: string
}
```

---

## Dependencies

- `react-data-grid` — Core grid component
- `react-data-grid/lib/styles.css` — Base grid styles (imported and overridden)
- `lucide-react` — Icons (ArrowUp, ArrowDown, ChevronRight, Pencil, Check, X, etc.)
- `@/components/ui/checkbox` — Project checkbox component (Radix-based)
