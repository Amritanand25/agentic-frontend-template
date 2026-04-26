---
name: design-token
description: Design token source of truth — all colors, spacing, typography, radius, shadows, themes (Falcon/Phoenix/Jarvis x Light/Dark), interaction states, and layout rules. Use for any visual/UI decision.
allowed-tools: Read Grep Glob
paths:
  - "apps/**/*.tsx"
  - "apps/**/*.css"
  - "packages/ui/**/*.tsx"
  - "packages/theme/**/*"
---

# Design Tokens

> Every visual value MUST map to a token. No raw hex, arbitrary px, or invented font sizes.

## Component Reuse Rule

Before designing any UI element, check `/.claude/rules/component-catalog.md` (62+ existing components). In `apps/` code, NEVER use native HTML when `@repo/ui` has an equivalent — use `import { X } from "@repo/ui"`. Inside `packages/ui/src/` (building components), native HTML is allowed but must use design tokens below.

## Themes & Modes

| Theme                | Primary       | Primary-50 Light/Dark |
| -------------------- | ------------- | --------------------- |
| **Falcon** (default) | Blue/Indigo   | #3535f3 / #5252ef     |
| **Phoenix**          | Purple/Violet | #6933fa / #8154fc     |
| **Jarvis**           | Teal/Cyan     | #278476 / #278476     |

**Modes:** Light (surface=#ffffff, text=#141414) | Dark (surface=#262627, text=#f0f0f0)

HTML: `<html data-theme="falcon" data-mode="light">`
Persistence: localStorage keys `ds-theme` and `ds-mode`

**What changes per theme:** Primary colors only. Secondary/Tertiary/Neutral/Feedback/Surfaces/Text change per mode, not theme.

---

## Colors

### Primary (per theme)

**Falcon (Blue)**

| Shade  | Light       | Dark        |
| ------ | ----------- | ----------- |
| 10     | #f4f4fc     | #1e1f2e     |
| 20     | #e8e8fc     | #33333f     |
| 30     | #9999ff     | #393968     |
| 40     | #6464ff     | #4040a0     |
| **50** | **#3535f3** | **#5252ef** |
| 60     | #000093     | #7f7ffb     |
| 70     | #00004c     | #ababfc     |
| 80     | #010029     | #adadfc     |

**Phoenix (Purple)**

| Shade  | Light       | Dark        |
| ------ | ----------- | ----------- |
| 10     | #f7f5fc     | #221e2e     |
| 20     | #eee8fc     | #36333f     |
| 30     | #c3adff     | #37227a     |
| 40     | #9770ff     | #5532b8     |
| **50** | **#6933fa** | **#8154fc** |
| 60     | #370b8f     | #9e7aff     |
| 70     | #1b0052     | #c3adff     |
| 80     | #0e0029     | #e1d6ff     |

**Jarvis (Teal)**

| Shade  | Light       | Dark        |
| ------ | ----------- | ----------- |
| 10     | #f7fcfc     | #1b2927     |
| 20     | #e6faf7     | #34403e     |
| 30     | #a6f5e9     | #1f4741     |
| 40     | #31ccb5     | #23665d     |
| **50** | **#278476** | **#278476** |
| 60     | #175249     | #5cb8ac     |
| 70     | #0f332e     | #92d6ce     |
| 80     | #081a17     | #d6fffa     |

### Secondary (Marigold — all themes)

| Shade  | Light       | Dark        |
| ------ | ----------- | ----------- |
| 10     | #fcf9f2     | #1c160a     |
| 20     | #fef7e9     | #3c2e16     |
| 30     | #ffe3ae     | #675228     |
| 40     | #ffd947     | #8d713a     |
| **50** | **#f7ab20** | **#f9be53** |
| 60     | #ac660c     | #fbd187     |
| 70     | #7f4b10     | #fce2b2     |
| 80     | #401d0c     | #fef2dd     |

### Tertiary (Teal — all themes)

Same values as Jarvis primary colors above.

### Neutral

| Token    | Light            | Dark                   | Usage                 |
| -------- | ---------------- | ---------------------- | --------------------- |
| grey-10  | #fafafa          | #1f1f20                | Subtle bg             |
| grey-20  | #f5f5f5          | #19191a                | Section bg            |
| grey-30  | #f0f0f0          | #141414                | Card bg               |
| grey-40  | #e0e0e0          | #5a5a5a                | Borders               |
| grey-60  | #b5b5b5          | #b5b5b5                | Placeholder, disabled |
| grey-80  | rgba(0,0,0,0.65) | rgba(255,255,255,0.78) | Secondary text        |
| grey-100 | #141414          | #f0f0f0                | Strongest             |

### Feedback (80/20 swap in dark)

| Token            | Light                       | Dark                        |
| ---------------- | --------------------------- | --------------------------- |
| success-80/50/20 | #135610 / #25ab21 / #e9f7e9 | #e9f7e9 / #25ab21 / #135610 |
| warning-80/50/20 | #7d2f08 / #f06d0f / #fef0e7 | #fef0e7 / #f06d0f / #7d2f08 |
| error-80/50/20   | #660014 / #f50031 / #fee6ea | #fee6ea / #f50031 / #660014 |

### Surfaces

| Surface    | Light            | Dark             | Usage                   |
| ---------- | ---------------- | ---------------- | ----------------------- |
| surface-0  | #ffffff          | #262627          | Cards, modals, popovers |
| surface-10 | #fafafa          | #1f1f20          | Main content            |
| surface-20 | #f5f5f5          | #19191a          | Sidebar, panels         |
| surface-30 | #f0f0f0          | #141414          | Deepest bg              |
| blur       | rgba(0,0,0,0.65) | rgba(0,0,0,0.65) | Overlay backdrop        |

### Text

| Role      | Light            | Dark                   |
| --------- | ---------------- | ---------------------- |
| Default   | #141414          | #f0f0f0                |
| Subdued-1 | rgba(0,0,0,0.65) | rgba(255,255,255,0.78) |
| Subdued-2 | #b5b5b5          | #b5b5b5                |
| Inverse   | #ffffff          | #ffffff                |

### Shadows

| Level          | Value                              |
| -------------- | ---------------------------------- |
| Small          | 0px 4px 16px rgba(0,0,0,0.08)      |
| Medium         | 0px 4px 16px rgba(0,0,0,0.16)      |
| Large          | 0px 4px 16px rgba(0,0,0,0.24)      |
| Popover (dark) | 0px 4px 16px rgba(255,255,255,0.1) |

**Color rules:** Primary-50=CTA color. Hover=shift lighter (50→40). Active=shift darker (50→60). Never skip text hierarchy: default > subdued-1 > subdued-2. Surface depth: 0 (top) > 10 > 20 > 30 (deepest). Feedback always paired with icon or text, never color alone.

---

## Typography

**Fonts:** Sans=Inter | Display=Inter Display

| Size | px  | Weight    | Value | Line Height | px  |
| ---- | --- | --------- | ----- | ----------- | --- |
| xs   | 11  | Regular   | 400   | xs          | 14  |
| s    | 12  | Prominent | 500   | s           | 16  |
| m    | 14  | Heading   | 600   | m           | 20  |
| l    | 16  |           |       | l           | 24  |
| xl   | 18  |           |       | xl          | 32  |
| 2xl  | 24  |           |       | 3xl         | 42  |
| 3xl  | 32  |           |       | 4xl         | 48  |
| 4xl  | 40  |           |       | 5xl         | 58  |
| 5xl  | 48  |           |       | 6xl         | 62  |
| 6xl  | 56  |           |       | 7xl         | 64  |
| 7xl  | 64  |           |       | 8xl         | 84  |
| 8xl  | 88  |           |       |             |     |

**Display presets** (Inter Display, weight 500): 2XL=88/84/-2 | XL=64/64/-2 | L=56/62/-2 | M=48/58/-1 | S=40/48/-0.6 | XS=32/42/-0.4 | 2XS=24/32/-0.2

**Heading presets** (Inter, weight 600): 2XL=24/32 | XL=18/24 | L=16/24 | M=14/20

**Body presets** (Inter, 400/500): 2XL=24/32 | XL=18/24 | L=16/24 | M=14/20 | S=12/16 | XS=11/14

---

## Spacing

| Token | px  | Token | px  |
| ----- | --- | ----- | --- |
| 0     | 0   | 20    | 20  |
| 1     | 1   | 24    | 24  |
| 2     | 2   | 32    | 32  |
| 4     | 4   | 40    | 40  |
| 8     | 8   | 48    | 48  |
| 12    | 12  | 64    | 64  |
| 16    | 16  | 80    | 80  |

**Guidelines:** Icon-text gap=4-8px | List gap: compact=4, default=8, comfortable=12 | Compact pad=8V/12H | Default pad=12V/16H | Form field spacing=16px | Card padding=24px | Section spacing=24-48px | Page margins=32-64px

## Heights

| Size | px  |
| ---- | --- |
| XS   | 24  |
| S    | 32  |
| M    | 40  |
| L    | 48  |
| XL   | 64  |

## Radius

| Token | px  | Usage                   |
| ----- | --- | ----------------------- |
| 0     | 0   | Dividers                |
| 4     | 4   | Badge, checkbox, nav    |
| 6     | 6   | Input S                 |
| 8     | 8   | Input M, standard       |
| 12    | 12  | Input L, dropdown S/M   |
| 16    | 16  | Card, modal, dropdown L |
| Full  | 250 | Button, tag, pill       |

---

## Interaction States

### Cursor Rules — MANDATORY

Every interactive element MUST have the correct cursor. Missing cursors make the UI feel broken.

| Element Type                                                      | Cursor          | CSS                                 |
| ----------------------------------------------------------------- | --------------- | ----------------------------------- |
| Buttons, links, clickable cards, tabs, pills, toggles, menu items | Pointer (hand)  | `cursor: pointer`                   |
| Text inputs, textareas, search fields                             | Text beam       | `cursor: text`                      |
| Disabled buttons, disabled inputs, disabled anything              | Not-allowed     | `cursor: not-allowed`               |
| Drag handles, resizable panels, reorderable items                 | Grab / Grabbing | `cursor: grab` / `cursor: grabbing` |
| Column resize handles (DataGrid)                                  | Column resize   | `cursor: col-resize`                |
| Loading / processing state                                        | Wait            | `cursor: wait` (or `progress`)      |
| Non-interactive text, labels, static content                      | Default arrow   | `cursor: default`                   |

**Rule:** If it does something when clicked, it MUST have `cursor: pointer`. This includes:

- Table rows with onClick / "View Details" links
- Cards that navigate somewhere
- Icons that trigger actions (edit, delete, copy, expand)
- Filter pills, toggle groups, sidebar nav items
- Breadcrumb links, pagination controls
- Accordion triggers, collapsible headers
- Any `<div>` or `<span>` with an `onClick` handler

### Universal States

| State          | Visual Treatment                                        | Cursor                  | Transition                                    |
| -------------- | ------------------------------------------------------- | ----------------------- | --------------------------------------------- |
| Default        | Base appearance                                         | per element type        | —                                             |
| Hover          | Lighten one shade (50→40) or bg shift                   | `pointer` for clickable | `150ms ease` on background, color, box-shadow |
| Active/Pressed | Darken one shade (50→60), `scale(0.98)` subtle press    | `pointer`               | `50ms ease`                                   |
| Focus Visible  | 4px ring `primary-60`, keyboard only (`:focus-visible`) | —                       | `0ms` (instant)                               |
| Disabled       | 30% opacity, muted colors                               | `not-allowed`           | —                                             |
| Loading        | Content invisible, centered `Spinner`                   | `wait` or `progress`    | —                                             |

### Hover Feedback by Element

| Element                   | Hover Effect                                                         |
| ------------------------- | -------------------------------------------------------------------- |
| Primary Button            | bg `primary-50` → `primary-40`                                       |
| Secondary Button          | bg transparent → `primary-20`                                        |
| Ghost/Tertiary Button     | bg transparent → `grey-20`                                           |
| Table Row (clickable)     | bg → `primary-10`, `cursor: pointer`                                 |
| Table Row (non-clickable) | bg → `var(--rdg-row-hover-background-color)`                         |
| Card (clickable)          | `box-shadow: var(--shadow-medium)`, `cursor: pointer`                |
| Card (non-clickable)      | No hover change                                                      |
| Sidebar nav item          | bg → `primary-10`, `cursor: pointer`                                 |
| Filter pill               | bg shift darker, `cursor: pointer`                                   |
| Toggle group item         | bg → `grey-20`, `cursor: pointer`                                    |
| Icon button               | bg → `grey-20` circle, `cursor: pointer`                             |
| Link text                 | `text-decoration: underline`, `color: primary-50`, `cursor: pointer` |
| Breadcrumb link           | `text-decoration: underline`, `cursor: pointer`                      |
| Pagination control        | bg → `primary-10`, `cursor: pointer`                                 |

### Pressed/Active Feedback

When a user clicks and holds (`:active` state), provide immediate tactile feedback:

| Element               | Active Effect                                          |
| --------------------- | ------------------------------------------------------ |
| Button (all variants) | `transform: scale(0.98)`, bg darkens one shade (50→60) |
| Card (clickable)      | `transform: scale(0.99)`, shadow reduces               |
| Tab / Toggle pill     | bg → `primary-30`                                      |
| Sidebar nav item      | bg → `primary-20`                                      |
| Icon button           | `transform: scale(0.92)`                               |
| Filter pill           | bg → darker shade, slight scale                        |

### Transition Standards

All interactive state changes MUST be animated — never instant (except focus ring):

```css
/* Standard for background/color transitions */
transition:
  background-color 150ms ease,
  color 150ms ease,
  box-shadow 150ms ease;

/* For transform (press effect) */
transition: transform 50ms ease;

/* Combined (most interactive elements need this) */
transition: all 150ms ease;
```

**Never:** Animate `width`, `height`, `margin`, `padding` — these trigger layout reflow. Only animate `transform`, `opacity`, `background-color`, `color`, `box-shadow`, `border-color`.

### Button Variants

- **Primary:** bg=primary-50/text=inverse → hover=primary-40 → active=primary-60, scale(0.98)
- **Secondary:** border=grey-40/text=primary-60 → hover=primary-20 bg → active=primary-30 bg, scale(0.98)
- **Tertiary:** text=primary-60 → hover=underline primary-50 → active=underline primary-70, scale(0.98)
- **Ghost:** text=text-default → hover=bg grey-20 → active=bg grey-30
- **ALL:** `cursor: pointer` always, `cursor: not-allowed` when disabled

### Form Fields

| State    | Border              | Label         | Cursor      |
| -------- | ------------------- | ------------- | ----------- |
| Empty    | grey-40             | subdued-1     | text        |
| Hover    | grey-60             | subdued-1     | text        |
| Focused  | 4px primary-60      | primary-50    | text        |
| Disabled | grey-40, bg=grey-20 | 30% opacity   | not-allowed |
| Error    | error-50            | error-default | text        |

### Clickable Custom Elements

When using `onClick` on non-button elements (`<div>`, `<span>`, `<tr>`, cards), you MUST add:

```tsx
// CORRECT — clickable div with proper interaction
<div
  onClick={handleClick}
  onKeyDown={(e) => e.key === "Enter" && handleClick()}
  role="button"
  tabIndex={0}
  style={{ cursor: "pointer", transition: "all 150ms ease" }}
>

// WRONG — onClick but no cursor, no keyboard, no role
<div onClick={handleClick}>
```

**Checklist for custom clickable elements:**

1. `cursor: pointer` — always
2. `role="button"` or appropriate ARIA role
3. `tabIndex={0}` — keyboard focusable
4. `onKeyDown` handler for Enter/Space — keyboard accessible
5. Hover visual feedback (bg change or shadow)
6. Active/pressed visual feedback (darken or scale)
7. `transition` on visual properties — never instant

---

## Layout Rules

**Surface layering:** Popover/Tooltip (surface-0 + shadow-medium) > Modal (surface-0 + shadow-large + blur) > Card (surface-0 + shadow-small) > Main (surface-10) > Sidebar (surface-20) > Page bg (surface-30)

**Separation principle — Surface over Border:**

- **Default:** Use surface color contrast to separate sections (e.g. surface-0 card on surface-10 background, surface-10 section on surface-0 page). Adjacent areas at different depth levels create natural visual separation without borders.
- **Borders only when:** (1) Interactive element boundaries (inputs, buttons in outline variant) (2) Tables/grids where cell alignment matters (3) Explicit visual dividers via `Separator` component (4) Hover/focus states that need precise boundary feedback.
- **Never:** Add `border` to cards, panels, sidebar sections, or content areas just for separation — use surface depth difference instead. If two areas look the same without a border, change the `background-color` to a different surface level.
- **Token mapping:** surface-0 (foreground/cards) → surface-10 (main content) → surface-20 (panels/sidebar) → surface-30 (deepest bg). Shadows (`shadow-small`) can supplement surface contrast for elevation.

**Content hierarchy:** Display/Heading 2XL → Heading XL → Heading L/M → Body M/L → Body S (subdued-1) → Body XS (subdued-2). Never skip levels.

**Actions:** Max 1 primary button per view. Priority: Primary > Secondary > Tertiary > Destructive > Navigation. **Important action buttons** (New Request, Create, Submit, Save) MUST use `variant="default"` (primary color) — never secondary/ghost for key CTAs.

**Form layout:** Label above input (4px gap), 16px between fields, helper text below (4px gap, Body S, subdued-1), error replaces helper, actions right-aligned (primary on right), 32px between sections.

**Animation:** Accordion=200ms ease-out, Modal enter=150ms ease-out, Modal exit=100ms ease-in. Animate only transform/opacity. Respect `prefers-reduced-motion`.

### SearchBar — Standard Search Component

**`SearchBar` from `@repo/ui` is the ONLY way to create search inputs.** Using plain `Input` with a "Search..." placeholder is BANNED.

- `SearchBar` includes: search icon (left), clear button (appears when has value), focus ring, design tokens
- Props: `value`, `onChange(value: string)`, `onClear`, `placeholder`
- Usage: `<SearchBar value={search} onChange={setSearch} placeholder="Search requests..." />`

### Tabs vs ToggleGroup — Distinct Roles

These two components serve different purposes and must NOT be confused:

| Component                         | Use For                                                      | Location in DataGrid Card |
| --------------------------------- | ------------------------------------------------------------ | ------------------------- |
| `Tabs` (variant=`subtab`)         | Status/category filtering (All, Pending, Approved, Rejected) | **Row 1** — header row    |
| `ToggleGroup` + `ToggleGroupItem` | Data view switching (Sales/Quantity, Value/Percentage)       | **Row 3** — below filters |

- **Row 1** always uses `Tabs` with `variant="subtab"` — pill-shaped status filters
- **Row 3** always uses `ToggleGroup` pills at **24px height** (`style={{ height: 24 }}`) — data view toggles
- NEVER use ToggleGroup in Row 1. NEVER use Tabs in Row 3.

### Grid Gap Standards

| Grid Content                                 | Gap Token         | px  |
| -------------------------------------------- | ----------------- | --- |
| KPI / stat cards                             | `var(--space-12)` | 12  |
| Content sections (chart panels, table cards) | `var(--space-8)`  | 8   |
| Page-level section stacking (vertical)       | `var(--space-8)`  | 8   |
| Form fields                                  | `var(--space-16)` | 16  |

KPI cards in a `grid-cols-4` always use `gap: var(--space-12)` — never `var(--space-8)`.

### DataGrid Full Width

When DataGrid is inside a Card, it MUST fill the full card width edge-to-edge:

- `<CardContent style={{ padding: 0 }}>` — remove all padding
- `<DataGrid className="rdg-inline" />` — borderless, auto-height
- The card's border-radius clips the grid edges — no extra radius needed on the grid
