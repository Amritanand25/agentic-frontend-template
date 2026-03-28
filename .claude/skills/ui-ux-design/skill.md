---
name: design-system-ui
description: Design token source of truth — all colors, spacing, typography, radius, shadows, themes (Falcon/Phoenix/Jarvis x Light/Dark), interaction states, and layout rules. Use for any visual/UI decision.
---

# Design System UI

> Every visual value MUST map to a token. No raw hex, arbitrary px, or invented font sizes.

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

### Universal

| State         | Treatment                           |
| ------------- | ----------------------------------- |
| Default       | Base appearance                     |
| Hover         | Lighten one shade (50→40)           |
| Active        | Darken one shade (50→60)            |
| Focus Visible | 4px ring primary-60, keyboard only  |
| Disabled      | 30% opacity, not-allowed cursor     |
| Loading       | Content invisible, centered spinner |

### Button Variants

- **Primary:** bg=primary-50/text=inverse → hover=primary-40 → active=primary-60
- **Secondary:** border=grey-40/text=primary-60 → hover=primary-20 bg → active=primary-30 bg
- **Tertiary:** text=primary-60 → hover=underline primary-50 → active=underline primary-70

### Form Fields

| State    | Border              | Label         |
| -------- | ------------------- | ------------- |
| Empty    | grey-40             | subdued-1     |
| Hover    | grey-60             | subdued-1     |
| Focused  | 4px primary-60      | primary-50    |
| Disabled | grey-40, bg=grey-20 | 30% opacity   |
| Error    | error-50            | error-default |

---

## Layout Rules

**Surface layering:** Popover/Tooltip (surface-0 + shadow-medium) > Modal (surface-0 + shadow-large + blur) > Card (surface-0 + shadow-small) > Main (surface-10) > Sidebar (surface-20) > Page bg (surface-30)

**Content hierarchy:** Display/Heading 2XL → Heading XL → Heading L/M → Body M/L → Body S (subdued-1) → Body XS (subdued-2). Never skip levels.

**Actions:** Max 1 primary button per view. Priority: Primary > Secondary > Tertiary > Destructive > Navigation.

**Form layout:** Label above input (4px gap), 16px between fields, helper text below (4px gap, Body S, subdued-1), error replaces helper, actions right-aligned (primary on right), 32px between sections.

**Animation:** Accordion=200ms ease-out, Modal enter=150ms ease-out, Modal exit=100ms ease-in. Animate only transform/opacity. Respect `prefers-reduced-motion`.
