---
name: design-system-ui
description: Complete UI/UX design system skill. Use whenever building ANY user interface — pages, layouts, forms, themes, dark mode, styling, or visual design decisions. Contains all design tokens (colors, spacing, typography, radius, shadows), theme system (Falcon/Phoenix/Jarvis x Light/Dark), surface layering, content hierarchy, interaction states, page layout patterns, form layout rules, animation, accessibility, and icon guidelines. This is the single source of truth for all visual decisions.
---

# Design System UI — Complete Reference

> **CRITICAL:** Every visual decision MUST map to a token defined here. No raw/hardcoded hex values, arbitrary px spacing, or invented font sizes. No AI-generated design aesthetics. Every color, spacing, typography, radius, and shadow value must come from this spec.

---

## 1. Design Philosophy

1. **Token-Driven Consistency** — Every color, spacing, type size, and radius maps to a named token
2. **Theme Adaptability** — UI adapts across 3 brand themes x 2 modes = 6 visual combinations without component changes
3. **Composable Components** — Simple elements combine to form complex patterns with visual consistency at every level

---

## 2. Theme System

### 2.1 Themes & Modes

| Theme | Identity | Primary-50 Light | Primary-50 Dark |
|-------|----------|-----------------|-----------------|
| **Falcon** (default) | Blue/Indigo | #3535f3 | #5252ef |
| **Phoenix** | Purple/Violet | #6933fa | #8154fc |
| **Jarvis** | Teal/Cyan | #278476 | #278476 |

| Mode | Surface | Text |
|------|---------|------|
| **Light** | #ffffff | #141414 |
| **Dark** | #262627 | #f0f0f0 |

### 2.2 What Changes

| Token Group | Per Theme? | Per Mode? |
|-------------|-----------|-----------|
| Primary (10-80) | Yes | Yes |
| Secondary/Tertiary/Neutral | No | Yes |
| Feedback | No | Yes (80/20 swap) |
| Surfaces/Text | No | Yes |
| Shadows | No | Yes (dark = white-tinted popovers) |

### 2.3 Theme Implementation

**HTML:** `<html data-theme="falcon" data-mode="light">`

**Anti-flash script** (place in `<head>` before stylesheets):
```html
<script>
  (function() {
    var t = localStorage.getItem('ds-theme') || 'falcon';
    var m = localStorage.getItem('ds-mode') || 'light';
    document.documentElement.setAttribute('data-theme', t);
    document.documentElement.setAttribute('data-mode', m);
  })();
</script>
```

**CSS structure:**
```css
:root, [data-theme="falcon"] { /* Falcon light primary */ }
[data-theme="falcon"][data-mode="dark"] { /* Falcon dark primary */ }
[data-theme="phoenix"] { /* Phoenix light primary */ }
[data-theme="phoenix"][data-mode="dark"] { /* Phoenix dark primary */ }
[data-theme="jarvis"] { /* Jarvis light primary */ }
[data-theme="jarvis"][data-mode="dark"] { /* Jarvis dark primary */ }
:root, [data-mode="light"] { /* Mode-dependent: secondary, tertiary, neutral, feedback, surfaces, text */ }
[data-mode="dark"] { /* Dark mode overrides */ }
```

**Persistence:** localStorage keys `ds-theme` and `ds-mode`, restore on page load.

---

## 3. Color System

### 3.1 Primary Colors (change per theme)

**Falcon (Blue/Indigo)**

| Shade | Light | Dark |
|-------|-------|------|
| 10 | #f4f4fc | #1e1f2e |
| 20 | #e8e8fc | #33333f |
| 30 | #9999ff | #393968 |
| 40 | #6464ff | #4040a0 |
| **50** | **#3535f3** | **#5252ef** |
| 60 | #000093 | #7f7ffb |
| 70 | #00004c | #ababfc |
| 80 | #010029 | #adadfc |
| inverse | #ffffff | #ffffff |

**Phoenix (Purple/Violet)**

| Shade | Light | Dark |
|-------|-------|------|
| 10 | #f7f5fc | #221e2e |
| 20 | #eee8fc | #36333f |
| 30 | #c3adff | #37227a |
| 40 | #9770ff | #5532b8 |
| **50** | **#6933fa** | **#8154fc** |
| 60 | #370b8f | #9e7aff |
| 70 | #1b0052 | #c3adff |
| 80 | #0e0029 | #e1d6ff |
| inverse | #ffffff | #ffffff |

**Jarvis (Teal/Cyan)**

| Shade | Light | Dark |
|-------|-------|------|
| 10 | #f7fcfc | #1b2927 |
| 20 | #e6faf7 | #34403e |
| 30 | #a6f5e9 | #1f4741 |
| 40 | #31ccb5 | #23665d |
| **50** | **#278476** | **#278476** |
| 60 | #175249 | #5cb8ac |
| 70 | #0f332e | #92d6ce |
| 80 | #081a17 | #d6fffa |
| inverse | #ffffff | #ffffff |

### 3.2 Secondary Colors (Marigold — same all themes)

| Shade | Light | Dark |
|-------|-------|------|
| 10 | #fcf9f2 | #1c160a |
| 20 | #fef7e9 | #3c2e16 |
| 30 | #ffe3ae | #675228 |
| 40 | #ffd947 | #8d713a |
| **50** | **#f7ab20** | **#f9be53** |
| 60 | #ac660c | #fbd187 |
| 70 | #7f4b10 | #fce2b2 |
| 80 | #401d0c | #fef2dd |
| inverse | #401d0c | #fef7e9 |

### 3.3 Tertiary Colors (Teal — same all themes)

| Shade | Light | Dark |
|-------|-------|------|
| 10 | #f7fcfc | #1b2927 |
| 20 | #e6faf7 | #34403e |
| 30 | #a6f5e9 | #1f4741 |
| 40 | #31ccb5 | #23665d |
| **50** | **#278476** | **#278476** |
| 60 | #175249 | #5cb8ac |
| 70 | #0f332e | #92d6ce |
| 80 | #081a17 | #d6fffa |
| inverse | #ffffff | #ffffff |

### 3.4 Neutral Colors

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| grey-10 | #fafafa | #1f1f20 | Subtle bg |
| grey-20 | #f5f5f5 | #19191a | Section bg |
| grey-30 | #f0f0f0 | #141414 | Card/container bg |
| grey-40 | #e0e0e0 | #5a5a5a | Borders, dividers |
| grey-60 | #b5b5b5 | #b5b5b5 | Placeholder, disabled |
| grey-80 | rgba(0,0,0,0.65) | rgba(255,255,255,0.78) | Secondary text |
| grey-100 | #141414 | #f0f0f0 | Strongest neutral |
| white | #ffffff | #ffffff | Mode-independent |
| black | #141414 | #141414 | Mode-independent |

### 3.5 Feedback Colors (80/20 swap in dark mode)

| Token | Light | Dark |
|-------|-------|------|
| success-80 | #135610 | #e9f7e9 |
| success-50 | #25ab21 | #25ab21 |
| success-20 | #e9f7e9 | #135610 |
| warning-80 | #7d2f08 | #fef0e7 |
| warning-50 | #f06d0f | #f06d0f |
| warning-20 | #fef0e7 | #7d2f08 |
| error-80 | #660014 | #fee6ea |
| error-50 | #f50031 | #f50031 |
| error-20 | #fee6ea | #660014 |

### 3.6 Background Surfaces

| Surface | Light | Dark | Usage |
|---------|-------|------|-------|
| surface-0 | #ffffff | #262627 | Top-most (cards, modals, popovers) |
| surface-10 | #fafafa | #1f1f20 | Main content area |
| surface-20 | #f5f5f5 | #19191a | Sidebar, secondary panels |
| surface-30 | #f0f0f0 | #141414 | Deepest recessed background |
| blur | rgba(0,0,0,0.65) | rgba(0,0,0,0.65) | Overlay/backdrop |
| opacity-20 | rgba(255,255,255,0.2) | rgba(0,0,0,0.1) | Transparent overlay |
| opacity-10 | rgba(255,255,255,0.1) | rgba(0,0,0,0.05) | Subtle transparent overlay |

### 3.7 Text Color Hierarchy

| Role | Light | Dark | When |
|------|-------|------|------|
| Default | #141414 | #f0f0f0 | Primary text, headings, labels |
| Subdued-1 | rgba(0,0,0,0.65) | rgba(255,255,255,0.78) | Secondary text, descriptions |
| Subdued-2 | #b5b5b5 | #b5b5b5 | Placeholder, disabled, captions |
| Inverse | #ffffff | #ffffff | Text on dark/primary backgrounds |
| Error | #f50031 | #f50031 | Error messages |
| Error subdued | #660014 | #fee6ea | Error supporting text |
| Warning | #f06d0f | #f06d0f | Warning messages |
| Warning subdued | #7d2f08 | #fef0e7 | Warning supporting text |
| Success | #25ab21 | #25ab21 | Success messages |
| Success subdued | #135610 | #e9f7e9 | Success supporting text |

### 3.8 Shadows

| Level | Value | Usage |
|-------|-------|-------|
| Small | 0px 4px 16px rgba(0,0,0,0.08) | Tooltips, small cards |
| Medium | 0px 4px 16px rgba(0,0,0,0.16) | Dropdowns, popovers |
| Large | 0px 4px 16px rgba(0,0,0,0.24) | Modals, dialogs |
| Scroll | 0px -4px 16px rgba(0,0,0,0.08) | Scroll shadow |
| Popover (dark) | 0px 4px 16px rgba(255,255,255,0.1) | Floating elements in dark mode |

### 3.9 Color Usage Rules

1. **Never use raw hex** — always reference a token
2. **Primary-50** = default CTA / interactive color
3. **Text hierarchy**: default > subdued-1 > subdued-2 (never skip levels)
4. **Background depth**: surface-0 (topmost) > surface-10 > surface-20 > surface-30 (deepest)
5. **Hover**: shift one shade lighter (50→40)
6. **Active/Pressed**: shift one shade darker (50→60)

---

## 4. Typography

### 4.1 Font Families
- **Sans:** Inter — all body text, UI labels, forms
- **Display:** Inter Display — hero text, marketing headlines

### 4.2 Type Scale

| Name | Size | Name | Size |
|------|------|------|------|
| xs | 11px | 3xl | 32px |
| s | 12px | 4xl | 40px |
| m | 14px | 5xl | 48px |
| l | 16px | 6xl | 56px |
| xl | 18px | 7xl | 64px |
| 2xl | 24px | 8xl | 88px |

### 4.3 Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text, descriptions |
| Prominent | 500 | Emphasized text, labels, display |
| Heading | 600 | Section headings, column headers |

### 4.4 Line Heights

| Name | Value | Paired With |
|------|-------|-------------|
| xs | 14px | 11px |
| s | 16px | 12px |
| m | 20px | 14px |
| l | 24px | 16-18px |
| xl | 32px | 24px |
| 3xl | 42px | 32px |
| 4xl | 48px | 40px |
| 5xl | 58px | 48px |
| 6xl | 62px | 56px |
| 7xl | 64px | 64px |
| 8xl | 84px | 88px |

### 4.5 Letter Spacing

| Name | Value | Usage |
|------|-------|-------|
| Baggy | 0px | Body text, headings (default) |
| Loose | -0.2px | Small display |
| Comfy | -0.4px | Medium display |
| Fitted | -0.6px | Large display |
| Snug | -1px | Extra-large display |
| Tight | -2px | Maximum display |

### 4.6 Typography Presets

**Display** (Inter Display, weight 500):

| Preset | Size | Line Height | Letter Spacing |
|--------|------|-------------|----------------|
| Display 2XL | 88px | 84px | -2px |
| Display XL | 64px | 64px | -2px |
| Display L | 56px | 62px | -2px |
| Display M | 48px | 58px | -1px |
| Display S | 40px | 48px | -0.6px |
| Display XS | 32px | 42px | -0.4px |
| Display 2XS | 24px | 32px | -0.2px |

**Heading** (Inter, weight 600):

| Preset | Size | Line Height | Letter Spacing |
|--------|------|-------------|----------------|
| Heading 2XL | 24px | 32px | 0px |
| Heading XL | 18px | 24px | 0px |
| Heading L | 16px | 24px | 0px |
| Heading M | 14px | 20px | 0px |

**Body** (Inter, Regular 400 / Prominent 500):

| Preset | Size | Line Height | Weight |
|--------|------|-------------|--------|
| Body 2XL / Prominent | 24px | 32px | 400 / 500 |
| Body XL / Prominent | 18px | 24px | 400 / 500 |
| Body L / Prominent | 16px | 24px | 400 / 500 |
| Body M / Prominent | 14px | 20px | 400 / 500 |
| Body S / Prominent | 12px | 16px | 400 / 500 |
| Body XS / Prominent | 11px | 14px | 400 / 500 |

### 4.7 Typography Usage Guidelines

| Context | Preset |
|---------|--------|
| Page hero / landing | Display L–2XL |
| Page title | Heading 2XL or Display 2XS |
| Section heading | Heading XL |
| Card title | Heading L |
| Subsection / label header | Heading M |
| Body text | Body L or Body M |
| Form labels | Body M Prominent |
| Input text | Body M (S/M) / Body L (L) |
| Helper / description text | Body S |
| Badge / tag text | Body S Prominent |
| Caption / fine print | Body XS |
| Placeholder text | Body M, subdued-2 color |
| Button text | Body S Prominent (xs) / Body M Prominent (s,m) / Body L Prominent (l) / Body 2XL Prominent (xl) |

---

## 5. Spacing System

### 5.1 Spacing Scale

| Token | Value | Token | Value |
|-------|-------|-------|-------|
| 0 | 0px | 20 | 20px |
| 1 | 1px | 24 | 24px |
| 2 | 2px | 32 | 32px |
| 4 | 4px | 40 | 40px |
| 8 | 8px | 48 | 48px |
| 12 | 12px | 64 | 64px |
| 16 | 16px | 80 | 80px |

### 5.2 Spacing Guidelines

| Context | Spacing |
|---------|---------|
| Icon-to-text gap (small buttons) | 4px |
| Icon-to-text gap (default) | 8px |
| Inline element gap | 8px |
| List item gap (compact) | 4px |
| List item gap (default) | 8px |
| List item gap (comfortable) | 12px |
| Navigation item gap | 8px |
| Menu item gap | 4px |
| Component list gap | 12px |
| Compact padding | 8px V, 12px H |
| Default padding | 12px V, 16px H |
| Spacious padding | 16px V, 24px H |
| Form field vertical spacing | 16px |
| Card content padding | 24px |
| Section vertical spacing | 24px–48px |
| Page content margins | 32px–64px |
| Container padding | 32px |
| Sidebar item vertical gap | 8px |
| Sidebar section gap | 24px |

### 5.2.1 Gap Usage Rules

**List & Navigation Spacing:**
- **4px gap** — Dropdown menu items, dense tables, compact lists (high density, scan quickly)
- **8px gap** — Default navigation items, sidebar links, standard lists (balanced readability)
- **12px gap** — Component galleries, feature lists, comfortable reading (spacious, clear separation)

**When to use each:**
- **Compact lists (4px):** Menu items, autocomplete suggestions, dense data tables, tag lists
- **Default lists (8px):** Sidebar navigation, settings lists, file browsers, inbox items
- **Comfortable lists (12px):** Component showcases, feature cards, documentation navigation, marketing lists

**Inline vs Block Gaps:**
- **Inline (horizontal):** 8px between badges/tags/chips, 12px between button groups
- **Block (vertical):** Use list item gaps above, 16px between form fields, 24px between sections

**Best Practice:** Lists that users scan frequently (navigation, menus) use 8px. Lists that require careful selection (component galleries, settings) use 12px.

| Size | Height | Used By |
|------|--------|---------|
| XS | 24px | Extra-small buttons |
| S | 32px | Small buttons, inputs, dropdowns |
| M | 40px | Default buttons, inputs, dropdowns |
| L | 48px | Large buttons, inputs, dropdowns |
| XL | 64px | Extra-large buttons |

---

## 6. Border Radius

### 6.1 Scale

| Token | Value | Usage |
|-------|-------|-------|
| 0 | 0px | Dividers, table cells |
| 4 | 4px | Badge, checkbox, nav |
| 6 | 6px | Input S |
| 8 | 8px | Input M, standard |
| 12 | 12px | Input L, dropdown S/M |
| 16 | 16px | Card, modal, dropdown L |
| 24 | 24px | Large rounding |
| 32 | 32px | Bottom sheet |
| Full | 250px | Button, tag, pill, selector |

### 6.2 Size-Dependent Radius

| Component | Size S | Size M | Size L |
|-----------|--------|--------|--------|
| Input | 6px | 8px | 12px |
| Dropdown menu | 12px | 12px | 16px |
| DatePicker | 12px | 12px | 16px |
| SearchBar trigger | 8px | 8px | 12px |
| SearchBar list | 12px | 12px | 16px |

---

## 7. Interaction States

### 7.1 Universal State Model

| State | Treatment |
|-------|-----------|
| Default | Base appearance |
| Hover | Lighten one shade (50→40), or show underline |
| Active/Pressed | Darken one shade (50→60) |
| Focus Visible | 4px ring primary-60, no offset, keyboard only |
| Disabled | 30% opacity, not-allowed cursor |
| Loading | Content invisible (maintain width), centered spinner, blocked interaction |

### 7.2 Button States

**Primary:** Default=primary-50 bg/primary-inverse text | Hover=primary-40 | Active=primary-60/primary-30 text | Disabled=30% opacity

**Secondary:** Default=transparent/1px grey-40/primary-60 text | Hover=primary-20 bg | Active=primary-30 bg/primary-70 text | Disabled=30% opacity

**Tertiary:** Default=none/primary-60 text | Hover=1px underline primary-50/primary-50 text | Active=1px underline text-default/primary-70 | Disabled=30% opacity

### 7.3 Form Field States

| State | Border | Background | Text | Label |
|-------|--------|-----------|------|-------|
| Empty | 1px grey-40 | surface-0 | subdued-2 | subdued-1 |
| Filled | 1px grey-40 | surface-0 | text-default | subdued-1 |
| Hover | 1px grey-60 | surface-0 | text-default | subdued-1 |
| Focused | 4px primary-60 | surface-0 | text-default | primary-50 |
| Disabled | 1px grey-40 | grey-20 | grey-60 | 30% opacity |
| Read-only | 1px grey-40 | grey-20 | grey-80 | subdued-1 |
| Error | 1px error-50 | surface-0 | text-default | error-default |
| Warning | 1px warning-50 | surface-0 | text-default | warning-default |
| Success | 1px success-50 | surface-0 | text-default | success-default |

### 7.4 Validation Pattern

| State | Border | Icon | Message Color |
|-------|--------|------|---------------|
| None | grey-40 | None | None |
| Success | success-50 | Checkmark | success-default |
| Warning | warning-50 | Warning triangle | warning-default |
| Error | error-50 | Error circle | error-default |

**Rule:** Feedback states never communicated through color alone — always pair with icon or text label.

---

## 8. Layout & Composition

### 8.1 Surface Layering (top to bottom)

```
Popover / Tooltip / Dropdown  → surface-0 + shadow-medium
Modal                         → surface-0 + shadow-large + blur backdrop
Card / Panel                  → surface-0 + shadow-small
Main Content                  → surface-10
Sidebar / Secondary           → surface-20
Page Background               → surface-30
```

### 8.2 Content Hierarchy

| Level | Typography | Color | Example |
|-------|-----------|-------|---------|
| 1 | Heading 2XL / Display | text-default | Page title |
| 2 | Heading XL | text-default | Section title |
| 3 | Heading L / M | text-default | Card title |
| 4 | Body M / L | text-default | Paragraph |
| 5 | Body S | subdued-1 | Description, helper |
| 6 | Body XS | subdued-2 | Timestamp, metadata |

**Rule:** Never skip hierarchy levels.

### 8.3 Action Hierarchy

| Priority | Kind | Appearance |
|----------|------|-----------|
| Primary (1 per view) | Button Primary | Default |
| Secondary | Button Secondary | Default |
| Tertiary | Button Tertiary | Default |
| Destructive | Primary/Secondary | Negative |
| Navigation | Link / Tertiary | — |

### 8.4 Form Layout Rules

1. Label above input, **4px** gap
2. **16px** between fields
3. Helper text below input, 4px gap, Body S, subdued-1
4. Error replaces helper, error-default color
5. Required: asterisk (*) appended to label
6. Actions right-aligned, 16px gap between buttons, primary on right
7. Sections: **32px** gap, optional Heading L title
8. Button size matches input size (S/M/L)

### 8.5 Page Patterns

**Dashboard:** TitleBar (surface-0) + Sidebar (surface-20) + Main (surface-10) with Cards (surface-0, shadow-small)

**List/Table:** TitleBar + Filters (SearchBar, FilterPills) + optional Tabs + DataTable + Pagination

**Detail/Settings:** TitleBar with Back + Section Cards (surface-0, radius-16, shadow-small, 24px padding) stacked with 24px gaps

**Modal:** surface-0, radius-16, shadow-large, blur backdrop rgba(0,0,0,0.65) + 12px blur, max content 494px scrollable. Widths: XS=560, S=754, M=950, L=1392, Full=100%

### 8.6 Responsive

- Container: centered, max-width, 32px padding
- Sidebar: collapsible on smaller viewports
- DataTable: horizontal scroll with fixed columns
- Mobile: BottomSheet (24px top radius) replaces dropdowns/modals

---

## 9. Animation & Motion

| Type | Duration | Easing |
|------|----------|--------|
| Color transition | instant | ease |
| Accordion | 200ms | ease-out |
| Modal enter | 150ms | ease-out (scale+fade) |
| Modal exit | 100ms | ease-in |
| Slide-in panels | 200-300ms | ease-out |
| Toast | 200ms | ease-out |

**Principles:** Purposeful (not decorative), Quick (<200ms), Consistent direction (panels from their edge), Respect `prefers-reduced-motion`.

---

## 10. Accessibility

- **Focus:** 4px ring primary-60, `focus-visible` only, no offset
- **Contrast:** WCAG 2.1 AA — 4.5:1 normal text, 3:1 large text
- **Touch targets:** Min 24px (XS), recommended 40px (M)
- **Spacing:** 8px min between interactive elements
- **Feedback:** Never color alone — always icon or text label
- **Tab order:** Follows visual reading order

---

## 11. Icons

- **Lucide** primary, **Paul Icons** supplementary
- Sizes: XS/S=16px, M=20px, L=24px, XL=32px
- Icons inherit text color; standalone use subdued-1, text-default on hover

---

## 12. Design Token CSS Custom Properties

```
/* Spacing */
--space-{0|1|2|4|8|12|16|20|24|32|40|48|64|80}

/* Typography */
--font-sans: 'Inter', sans-serif
--font-display: 'Inter Display', sans-serif
--font-size-{xs|s|m|l|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl}
--font-weight-{regular|prominent|heading}: 400|500|600
--line-height-{xs|s|m|l|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl}
--letter-spacing-{baggy|loose|comfy|fitted|snug|tight}

/* Radius */
--radius-{0|4|6|8|12|16|24|32|full}

/* Heights */
--height-{xs|s|m|l|xl}: 24|32|40|48|64px

/* Colors (set via data-theme/data-mode attributes) */
--primary-{10|20|30|40|50|60|70|80|inverse}
--secondary-{10|20|30|40|50|60|70|80|inverse}
--tertiary-{10|20|30|40|50|60|70|80|inverse}
--grey-{10|20|30|40|60|80|100}
--success-{20|50|80}, --warning-{20|50|80}, --error-{20|50|80}
--surface-{0|10|20|30}, --blur, --opacity-{10|20}
--text-{default|subdued-1|subdued-2|inverse}
--shadow-{small|medium|large|scroll|popover}
```

---

## Instructions for AI

1. **Always use design tokens** — never raw hex, arbitrary px, or invented font sizes
2. **Structure CSS with custom properties** mapping to these tokens
3. **Follow surface layering** for z-index and visual depth
4. **Apply correct typography preset** for each context
5. **Implement ALL interaction states** (hover, active, focus-visible, disabled, loading)
6. **Max 1 primary button per view** — follow action hierarchy
7. **Use the spacing scale exclusively** — no arbitrary values
8. **Apply size-dependent radius** for inputs and dropdowns
9. **Include dark mode support** via token swap (data-mode attribute)
10. **Form layouts:** labels above, 4px gap, 16px between fields, 32px between sections
11. **Never skip text hierarchy** — default > subdued-1 > subdued-2
12. **Respect prefers-reduced-motion** for all animations
13. **WCAG 2.1 AA** contrast for all text
14. **Feedback states** always paired with icon or text, never color alone
