---
paths:
  - "apps/**/*.tsx"
  - "packages/ui/**/*.tsx"
---

# UI Patterns — Cards, DataGrid, Spacing, Interactions

## Page Spacing Standard

- **Layout padding:** `var(--space-16)` — set on `<main>` in layout. Pages must NOT add their own outer padding.
- **Section gap:** `var(--space-8)` — gap between all cards, sections, and major content blocks.
- **Section inner padding:** `var(--space-16)` for card/panel content padding.
- **KPI card grid gaps:** `var(--space-12)` between KPI cards in a grid row.
- **Section grid gaps:** `var(--space-8)` between content sections (chart panels, table cards).
- **Root wrapper:** `flex flex-col gap-[var(--space-8)]` for all page content.

```tsx
// CORRECT
<div className="flex flex-col gap-[var(--space-8)]">
  <h1>Title</h1>
  <GlobalFilterBar visibleFilters={[...]} />
  <div className="grid grid-cols-4 gap-[var(--space-12)]">{/* KPI cards */}</div>
  <div className="grid grid-cols-2 gap-[var(--space-8)]">{/* Content sections */}</div>
</div>

// WRONG — too much gap, extra padding
<div style={{ padding: "var(--space-24)", gap: "var(--space-24)" }}>
```

## Card Rules

- **Every card** MUST have `backgroundColor: var(--surface-0)` and `borderRadius: var(--radius-24)`
- **ZERO borders on ANY card** — surface-based separation ONLY (surface-0 on surface-10 background)
- **Card header separator:** Add `<Separator />` between header row and content
- **Side-by-side panels:** Use `grid-cols-2` (equal `1fr 1fr`) by default

## DataGrid Card Container Pattern

When a page has a DataGrid with controls, wrap **everything** in **one single `surface-0` card**. Rows separated by `<Separator />`.

```
┌──────────────────────────────────────────────────────────┐
│  Row 1: Tabs (subtab) + SearchBar + Primary Button        │
│──────────────────────────────────────────────────────────│
│  Row 2: FilterPill / GranaryFilterBar                     │
│──────────────────────────────────────────────────────────│
│  Row 3: ToggleGroup pills (24px height)                   │
│──────────────────────────────────────────────────────────│
│  Row 4: DataGrid (rdg-inline, padding: 0)                 │
│──────────────────────────────────────────────────────────│
│  Row 5: TablePagination                                   │
└──────────────────────────────────────────────────────────┘
```

**Rules:**
- Page title stays **OUTSIDE** the card
- `<Separator />` between every row
- Row 1: `Tabs variant="subtab"` — NEVER ToggleGroup
- Row 3: `ToggleGroup` at 24px height — NEVER Tabs
- Row 4: `DataGrid className="rdg-inline"`, `CardContent padding: 0`
- `SearchBar` — ALWAYS use SearchBar, never plain Input
- Primary action buttons use `variant="default"`
- Omit rows you don't need, but separators ALWAYS go between whatever rows exist

## DataGrid Rules

- **ALWAYS `DataGrid`** for ALL tabular data in apps/. `Table` is BANNED in `apps/web/src/`.
- **`className="rdg-inline"`** inside cards — removes border/radius (card provides them)
- **`CellWithTooltip`** for text columns that may overflow
- **`TablePagination`** below for pagination
- Frozen columns (`frozen: true`) for key identifier columns

## Interaction States — MANDATORY

**Cursor rules:**

| Element                                          | Cursor          |
| ------------------------------------------------ | --------------- |
| Buttons, links, clickable cards, tabs, pills     | `cursor: pointer` |
| Text inputs, textareas, search fields            | `cursor: text`    |
| Disabled elements                                | `cursor: not-allowed` |
| Drag handles                                     | `cursor: grab`    |

**If it does something when clicked, it MUST have `cursor: pointer`.**

**Hover feedback — every clickable element MUST have a visual hover state.**

**Pressed/Active (`:active`) — provide tactile feedback:** `transform: scale(0.98)` for buttons, `scale(0.99)` for cards.

**Transitions — NEVER instant:** `transition: background-color 150ms ease, color 150ms ease, box-shadow 150ms ease;`

Only animate `transform`, `opacity`, `background-color`, `color`, `box-shadow`, `border-color`. Never animate `width`, `height`, `margin`, `padding`.

**Custom clickable elements** (`onClick` on `<div>`/`<span>`) MUST include:
1. `cursor: pointer`
2. `role="button"` + `tabIndex={0}`
3. `onKeyDown` for Enter/Space
4. Hover + active visual feedback
5. `transition` on visual properties
