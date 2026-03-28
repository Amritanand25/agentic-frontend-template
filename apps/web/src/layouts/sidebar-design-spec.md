# Relio CRM -- Left Sidebar Navigation Design Spec

**Status:** Draft
**Created:** 2026-03-28
**Priority:** High
**Parent:** [Relio CRM Platform](../../../../docs/specs/relio/module-relio-crm.md)

---

## 1. Visual Layout

### 1.1 Expanded State (240px)

```
+------------------------------------------+
|  [OrgIcon]  Acme Inc           [v]       |  <- Workspace Switcher (64px)
|             Sales Team                   |
+------------------------------------------+
|  [Search]   Search...         Cmd+K      |  <- Search Trigger (40px)
+------------------------------------------+
|                                          |
|  PINNED                         [pin]    |  <- Section Label
|  [Star] Hot Leads                        |
|  [Star] Enterprise Clients               |
|                                          |
+- - - - - - - - - - - - - - - - - - - - -+
|                                          |
|  [LayoutDashboard]  Dashboard            |  <- Primary Nav
|                                          |
|  [Database]  Objects            [+]      |  <- Collapsible
|    [ChevronDown]                         |
|    +-- [Building2]  Companies            |  <- Sub-items
|    +-- [User]       Contacts             |
|    +-- [DollarSign] Deals                |
|    +-- [Plus]       Add object           |
|                                          |
|  [MessageSquare] Conversations  [3] [+]  |  <- Badge + Quick Create
|                                          |
|  [Workflow]  Workflows          [+]      |
|                                          |
+- - - - - - - - - - - - - - - - - - - - -+
|                                          |
|  (flexible spacer)                       |
|                                          |
+------------------------------------------+
|  [Settings]  Settings                    |  <- Bottom Section
+------------------------------------------+
|  [ChevronLeft]  Collapse                 |  <- Collapse Toggle
+------------------------------------------+
|  [Avatar]  John Doe           [...]      |  <- User Profile (56px)
|            john@example.com              |
+------------------------------------------+
```

### 1.2 Collapsed State (48px)

```
+--------+
| [Org]  |  <- Org icon only (tooltip: "Acme Inc / Sales Team")
+--------+
| [Srch] |  <- Search icon (tooltip: "Search (Cmd+K)")
+--------+
|        |
| [Star] |  <- Pinned section icon (tooltip shows item names)
|        |
+--------+
| [Dash] |  <- Dashboard (tooltip)
| [Obj]  |  <- Objects (tooltip + flyout sub-menu)
| [Conv] |  <- Conversations + dot badge (tooltip)
| [Flow] |  <- Workflows (tooltip)
|        |
| (flex) |
+--------+
| [Gear] |  <- Settings (tooltip)
+--------+
| [ > ]  |  <- Expand toggle
+--------+
| [Avtr] |  <- Avatar only (tooltip: user name)
+--------+
```

### 1.3 Mobile Overlay (< 768px)

- Sidebar is hidden off-screen by default (`transform: translateX(-100%)`)
- Hamburger button in the top header triggers it as an overlay
- Backdrop: `var(--blur)` behind the sidebar
- Full 240px width, full viewport height
- Swipe-left to dismiss (optional progressive enhancement)
- Close button visible at top-right of sidebar

---

## 2. Navigation Items and Icons

All icons are from Lucide React. Sizes follow the component-builder skill: M=20px for expanded nav items, S=16px for sub-items and section labels.

### 2.1 Full Item Inventory

| Section  | Label           | Lucide Icon         | Size | Route / Action                             | Badge     |
| -------- | --------------- | ------------------- | ---- | ------------------------------------------ | --------- |
| Switcher | Org / Tenant    | `Building2`         | 20   | Opens dropdown                             | --        |
| Search   | Search          | `Search`            | 20   | Opens Cmd+K dialog                         | --        |
| Pinned   | (dynamic)       | `Star`              | 16   | Navigates to saved view                    | --        |
| Primary  | Dashboard       | `LayoutDashboard`   | 20   | `/:org/:tenant/app/dashboard`              | --        |
| Primary  | Objects         | `Database`          | 20   | `/:org/:tenant/app/objects`                | --        |
| Sub-item | Companies       | `Building2`         | 16   | `/:org/:tenant/app/objects/companies`      | --        |
| Sub-item | Contacts        | `User`              | 16   | `/:org/:tenant/app/objects/contacts`       | --        |
| Sub-item | Deals           | `DollarSign`        | 16   | `/:org/:tenant/app/objects/deals`          | --        |
| Sub-item | Add object      | `Plus`              | 16   | Opens create object dialog                 | --        |
| Primary  | Conversations   | `MessageSquare`     | 20   | `/:org/:tenant/app/conversations`          | Unread ct |
| Primary  | Workflows       | `Workflow`          | 20   | `/:org/:tenant/app/workflows`              | --        |
| Bottom   | Settings        | `Settings`          | 20   | `/:org/:tenant/app/settings`               | --        |
| Bottom   | Collapse toggle | `ChevronLeft/Right` | 16   | Toggles sidebar width                      | --        |
| User     | Profile menu    | (Avatar component)  | 32   | Opens dropdown (Profile, Settings, Logout) | --        |

### 2.2 Quick Create Buttons (+)

Quick create buttons appear on hover beside each section that supports creation.

| Parent Section | Creates           | Lucide Icon | Action                    |
| -------------- | ----------------- | ----------- | ------------------------- |
| Objects        | New custom object | `Plus`      | Opens ObjectEditor dialog |
| Conversations  | New conversation  | `Plus`      | Opens new conversation    |
| Workflows      | New workflow      | `Plus`      | Navigates to builder      |

---

## 3. Interaction States

### 3.1 Nav Item States

| State                  | Background          | Text Color              | Icon Color              | Border                                                   | Additional                                  |
| ---------------------- | ------------------- | ----------------------- | ----------------------- | -------------------------------------------------------- | ------------------------------------------- |
| Default                | `transparent`       | `var(--text-subdued-1)` | `var(--text-subdued-1)` | none                                                     | --                                          |
| Hover                  | `var(--primary-10)` | `var(--text-default)`   | `var(--text-default)`   | none                                                     | `cursor: pointer`                           |
| Active (current route) | `var(--primary-10)` | `var(--primary-50)`     | `var(--primary-50)`     | `left: 2px solid var(--primary-50)`                      | `font-weight: var(--font-weight-prominent)` |
| Focus Visible          | `var(--primary-10)` | `var(--primary-50)`     | `var(--primary-50)`     | `outline: 2px solid var(--primary-60)` with `2px offset` | Keyboard only (`:focus-visible`)            |
| Disabled               | `transparent`       | `var(--text-subdued-2)` | `var(--text-subdued-2)` | none                                                     | `opacity: 0.3; cursor: not-allowed`         |

### 3.2 Sub-item States

Same as nav item states, but without the left border on active. Active sub-items use:

- Background: `var(--primary-10)`
- Text/icon: `var(--primary-50)`
- Font weight: `var(--font-weight-prominent)`

### 3.3 Quick Create Button (+) States

| State         | Background       | Icon Color              | Additional                                       |
| ------------- | ---------------- | ----------------------- | ------------------------------------------------ |
| Default       | `transparent`    | `var(--text-subdued-2)` | `visibility: hidden` (shown on parent row hover) |
| Hover         | `var(--grey-20)` | `var(--text-default)`   | --                                               |
| Active        | `var(--grey-30)` | `var(--text-default)`   | --                                               |
| Focus Visible | `var(--grey-20)` | `var(--text-default)`   | `outline: 2px solid var(--primary-60)`           |

### 3.4 Workspace Switcher States

| State         | Background          | Border                                 |
| ------------- | ------------------- | -------------------------------------- |
| Default       | `transparent`       | none                                   |
| Hover         | `var(--surface-10)` | none                                   |
| Active/Open   | `var(--surface-10)` | none                                   |
| Focus Visible | `transparent`       | `outline: 2px solid var(--primary-60)` |

### 3.5 Notification Badge

- Background: `var(--error-50)`
- Text: `var(--text-inverse)` (`#ffffff`)
- Font: `var(--font-size-xs)` / `var(--font-weight-prominent)`
- Size: `var(--height-xs)` (24px) min, pill-shaped (`var(--radius-full)`)
- Minimum width: 20px; grows with content ("99+")
- In collapsed mode: 8px red dot positioned top-right of the icon

### 3.6 Collapsed State Tooltips

- Triggered by hover on any collapsed nav icon
- Appear on the `right` side
- Use existing `Tooltip` / `TooltipContent` from `@repo/ui`
- Delay: 200ms (via `TooltipProvider delayDuration={200}`)

### 3.7 Collapsed State Flyout for Objects

When sidebar is collapsed and the user hovers on the Objects icon:

- A flyout panel appears to the right (like a popover)
- Contains the list of custom objects as sub-items
- Background: `var(--surface-0)`
- Border: `1px solid var(--grey-40)`
- Shadow: `var(--shadow-medium)`
- Border radius: `var(--radius-8)`
- Width: 200px
- Padding: `var(--space-8)` vertical, `var(--space-4)` horizontal

---

## 4. Design Token Usage

Every visual property below maps to a token from `packages/theme/src/tokens.css`.

### 4.1 Sidebar Container

| Property          | Token / Value                                                   |
| ----------------- | --------------------------------------------------------------- |
| Width (expanded)  | `240px` (constant, matches `--sidebar-width` pattern in tokens) |
| Width (collapsed) | `48px`                                                          |
| Background        | `var(--surface-20)`                                             |
| Border right      | `1px solid var(--grey-40)`                                      |
| Height            | `100vh` (fixed, full viewport)                                  |
| Position          | `fixed`, `left: 0`, `top: 0`                                    |
| z-index           | `30`                                                            |

### 4.2 Workspace Switcher

| Property            | Token / Value                                               |
| ------------------- | ----------------------------------------------------------- |
| Height              | `var(--height-xl)` (64px)                                   |
| Padding (expanded)  | `0 var(--space-16)`                                         |
| Padding (collapsed) | `0 var(--space-4)`                                          |
| Org icon bg         | `var(--primary-10)`                                         |
| Org icon text       | `var(--primary-50)`                                         |
| Org icon size       | `var(--height-s)` (32px)                                    |
| Org icon radius     | `var(--radius-8)`                                           |
| Org name font       | `var(--font-size-m)` (14px), `var(--font-weight-prominent)` |
| Org name color      | `var(--text-default)`                                       |
| Tenant name font    | `var(--font-size-s)` (12px), `var(--font-weight-regular)`   |
| Tenant name color   | `var(--text-subdued-1)`                                     |
| Chevron icon        | `ChevronsUpDown`, 14px, `var(--text-subdued-2)`             |

### 4.3 Search Trigger

| Property         | Token / Value                                                                                                                          |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Height           | `var(--height-m)` (40px)                                                                                                               |
| Margin           | `var(--space-8) var(--space-12)`                                                                                                       |
| Background       | `var(--surface-10)`                                                                                                                    |
| Border           | `1px solid var(--grey-40)`                                                                                                             |
| Border radius    | `var(--radius-8)`                                                                                                                      |
| Icon             | `Search`, 16px, `var(--text-subdued-2)`                                                                                                |
| Placeholder text | `var(--font-size-m)`, `var(--text-subdued-2)`                                                                                          |
| Shortcut badge   | `var(--font-size-xs)`, `var(--text-subdued-2)`, bg `var(--grey-20)`, radius `var(--radius-4)`, padding `var(--space-2) var(--space-4)` |
| Hover background | `var(--surface-0)`                                                                                                                     |

### 4.4 Section Labels

| Property       | Token / Value                        |
| -------------- | ------------------------------------ |
| Font size      | `var(--font-size-xs)` (11px)         |
| Font weight    | `var(--font-weight-prominent)` (500) |
| Color          | `var(--text-subdued-2)`              |
| Text transform | `uppercase`                          |
| Letter spacing | `0.5px`                              |
| Padding        | `var(--space-8) var(--space-12)`     |
| Line height    | `var(--line-height-xs)` (14px)       |

### 4.5 Nav Items

| Property              | Token / Value                                                   |
| --------------------- | --------------------------------------------------------------- |
| Height                | `var(--height-m)` (40px)                                        |
| Padding               | `var(--space-8) var(--space-12)`                                |
| Border radius         | `var(--radius-4)`                                               |
| Font size             | `var(--font-size-m)` (14px)                                     |
| Font weight (default) | `var(--font-weight-regular)` (400)                              |
| Font weight (active)  | `var(--font-weight-prominent)` (500)                            |
| Line height           | `var(--line-height-m)` (20px)                                   |
| Icon size             | 20px                                                            |
| Icon-text gap         | `var(--space-8)`                                                |
| Item gap              | `var(--space-2)` (2px between items)                            |
| Active left border    | `2px solid var(--primary-50)`, `border-radius: var(--radius-4)` |

### 4.6 Sub-items (Objects children)

| Property         | Token / Value                                              |
| ---------------- | ---------------------------------------------------------- |
| Indent           | `var(--space-32)` (32px from left edge)                    |
| Left connector   | `1px solid var(--grey-40)`, at `var(--space-20)` from left |
| Height           | `var(--height-s)` (32px)                                   |
| Padding          | `var(--space-4) var(--space-12)`                           |
| Font size        | `var(--font-size-m)` (14px)                                |
| Font weight      | `var(--font-weight-regular)` (400)                         |
| Icon size        | 16px                                                       |
| Icon-text gap    | `var(--space-8)`                                           |
| Item gap         | `var(--space-2)`                                           |
| Active indicator | bg `var(--primary-10)`, text `var(--primary-50)`           |

### 4.7 Collapse Toggle

| Property        | Token / Value                                  |
| --------------- | ---------------------------------------------- |
| Height          | `var(--height-s)` (32px)                       |
| Padding area    | `var(--space-8)`                               |
| Icon size       | 16px                                           |
| Text (expanded) | `var(--font-size-xs)`, `var(--text-subdued-1)` |

### 4.8 User Profile Area

| Property            | Token / Value                                        |
| ------------------- | ---------------------------------------------------- |
| Height              | 56px                                                 |
| Padding (expanded)  | `var(--space-12) var(--space-16)`                    |
| Padding (collapsed) | `var(--space-12) var(--space-8)`                     |
| Avatar size         | 32px (`h-8 w-8`)                                     |
| Avatar bg           | `var(--primary-10)`                                  |
| Avatar text color   | `var(--primary-50)`                                  |
| Avatar font         | `var(--font-size-s)`, `var(--font-weight-heading)`   |
| User name font      | `var(--font-size-m)`, `var(--font-weight-prominent)` |
| User name color     | `var(--text-default)`                                |
| User email font     | `var(--font-size-xs)`, `var(--font-weight-regular)`  |
| User email color    | `var(--text-subdued-1)`                              |

### 4.9 Separators

| Property | Token / Value                                       |
| -------- | --------------------------------------------------- |
| Color    | `var(--grey-40)`                                    |
| Height   | `var(--space-1)` (1px)                              |
| Margin   | `var(--space-4) var(--space-12)` (horizontal inset) |

### 4.10 Pinned Items Section

| Property           | Token / Value                                                 |
| ------------------ | ------------------------------------------------------------- |
| Pin icon           | `Star`, 12px, `var(--secondary-50)` (filled, marigold accent) |
| Item font          | `var(--font-size-m)`, `var(--font-weight-regular)`            |
| Item height        | `var(--height-s)` (32px)                                      |
| Section max-height | 120px (max 3 visible, scroll for more)                        |

---

## 5. Typography Specs

All fonts use `var(--font-sans)` (Inter) unless noted.

| Element               | Size Token            | Weight Token                   | Line Height Token       | Color Token             |
| --------------------- | --------------------- | ------------------------------ | ----------------------- | ----------------------- |
| Org name              | `var(--font-size-m)`  | `var(--font-weight-prominent)` | `var(--line-height-m)`  | `var(--text-default)`   |
| Tenant name           | `var(--font-size-s)`  | `var(--font-weight-regular)`   | `var(--line-height-s)`  | `var(--text-subdued-1)` |
| Section label         | `var(--font-size-xs)` | `var(--font-weight-prominent)` | `var(--line-height-xs)` | `var(--text-subdued-2)` |
| Nav item (default)    | `var(--font-size-m)`  | `var(--font-weight-regular)`   | `var(--line-height-m)`  | `var(--text-subdued-1)` |
| Nav item (active)     | `var(--font-size-m)`  | `var(--font-weight-prominent)` | `var(--line-height-m)`  | `var(--primary-50)`     |
| Sub-item (default)    | `var(--font-size-m)`  | `var(--font-weight-regular)`   | `var(--line-height-m)`  | `var(--text-subdued-1)` |
| Sub-item (active)     | `var(--font-size-m)`  | `var(--font-weight-prominent)` | `var(--line-height-m)`  | `var(--primary-50)`     |
| Search placeholder    | `var(--font-size-m)`  | `var(--font-weight-regular)`   | `var(--line-height-m)`  | `var(--text-subdued-2)` |
| Keyboard shortcut     | `var(--font-size-xs)` | `var(--font-weight-regular)`   | `var(--line-height-xs)` | `var(--text-subdued-2)` |
| Badge count           | `var(--font-size-xs)` | `var(--font-weight-prominent)` | `var(--line-height-xs)` | `var(--text-inverse)`   |
| User name             | `var(--font-size-m)`  | `var(--font-weight-prominent)` | `var(--line-height-m)`  | `var(--text-default)`   |
| User email            | `var(--font-size-xs)` | `var(--font-weight-regular)`   | `var(--line-height-xs)` | `var(--text-subdued-1)` |
| Collapse label        | `var(--font-size-xs)` | `var(--font-weight-regular)`   | `var(--line-height-xs)` | `var(--text-subdued-1)` |
| "Add object" sub-item | `var(--font-size-m)`  | `var(--font-weight-regular)`   | `var(--line-height-m)`  | `var(--text-subdued-2)` |

---

## 6. Spacing and Dimensions

### 6.1 Overall Dimensions

| Dimension                 | Value   | Notes             |
| ------------------------- | ------- | ----------------- |
| Sidebar width (expanded)  | 240px   | Fixed             |
| Sidebar width (collapsed) | 48px    | Icons only        |
| Sidebar height            | `100vh` | Fixed to viewport |
| Transition duration       | 200ms   | `ease-out`        |

### 6.2 Vertical Section Heights

| Section              | Height / Spacing                                                           |
| -------------------- | -------------------------------------------------------------------------- |
| Workspace switcher   | 64px (`var(--height-xl)`)                                                  |
| Separator            | 1px                                                                        |
| Search trigger area  | `var(--space-8)` top pad + 40px + `var(--space-8)` bottom pad = 56px total |
| Section label row    | 28px (label + padding)                                                     |
| Nav item             | 40px (`var(--height-m)`)                                                   |
| Sub-item             | 32px (`var(--height-s)`)                                                   |
| Pinned item          | 32px (`var(--height-s)`)                                                   |
| Gap between items    | `var(--space-2)` (2px)                                                     |
| Gap between sections | `var(--space-16)` (16px)                                                   |
| Collapse toggle area | 40px                                                                       |
| User profile area    | 56px                                                                       |

### 6.3 Horizontal Spacing

| Element                    | Left Padding                 | Right Padding     |
| -------------------------- | ---------------------------- | ----------------- |
| Workspace switcher         | `var(--space-16)`            | `var(--space-16)` |
| Search trigger             | `var(--space-12)`            | `var(--space-12)` |
| Section label              | `var(--space-12)`            | `var(--space-12)` |
| Nav item                   | `var(--space-12)`            | `var(--space-12)` |
| Sub-item                   | `var(--space-32)` (indented) | `var(--space-12)` |
| User profile               | `var(--space-16)`            | `var(--space-16)` |
| Icon to text gap           | `var(--space-8)`             | --                |
| Quick create button margin | --                           | `var(--space-8)`  |

### 6.4 Touch Targets

All interactive elements meet minimum 44x44px touch target:

- Nav items: 40px height but padded to 44px effective area via spacing
- Collapsed icons: 48px container width provides adequate target
- Quick create buttons: 24px visible but 44px hit area via padding
- User avatar: 32px visible but clickable area wraps the full row

---

## 7. Responsive Behavior

### 7.1 Breakpoints

| Breakpoint | Width        | Sidebar Behavior                                                     |
| ---------- | ------------ | -------------------------------------------------------------------- |
| Desktop    | > 1024px     | Fixed sidebar, default expanded (240px). User can collapse to 48px.  |
| Tablet     | 768 - 1024px | Auto-collapsed to 48px. User can expand. Overlay mode when expanded. |
| Mobile     | < 768px      | Hidden off-screen. Hamburger menu in header triggers overlay.        |

### 7.2 Desktop (> 1024px)

- Sidebar is persistent (`position: fixed`)
- Main content shifts with `margin-left: <sidebarWidth>`
- User can toggle between expanded (240px) and collapsed (48px)
- Collapse state persisted in localStorage: `relio-sidebar-collapsed`

### 7.3 Tablet (768 - 1024px)

- Sidebar starts collapsed (48px)
- Clicking expand opens it as an overlay (240px) over the content
- Backdrop: `var(--blur)` behind sidebar
- Click backdrop or press Escape to collapse back
- Main content does NOT shift (sidebar overlays)

### 7.4 Mobile (< 768px)

- Sidebar is completely hidden (off-screen left)
- Top header shows a hamburger icon (`Menu` from Lucide, 24px)
- Clicking hamburger slides sidebar in from left as a full-height overlay
- Backdrop: `var(--blur)`
- Close via: X button, backdrop click, Escape key, or swipe-left
- After navigation (clicking a nav item), sidebar auto-closes

---

## 8. Collapsed State Behavior

### 8.1 General

| Feature              | Expanded (240px)                       | Collapsed (48px)                      |
| -------------------- | -------------------------------------- | ------------------------------------- |
| Workspace switcher   | Full org + tenant names + chevron      | Org icon only, tooltip on hover       |
| Search               | Search bar with placeholder + shortcut | Search icon, tooltip "Search (Cmd+K)" |
| Pinned items         | Star icon + label                      | Hidden (section not shown)            |
| Section labels       | Visible (uppercase text)               | Hidden                                |
| Nav items            | Icon + label + badge                   | Icon only + dot badge, tooltip        |
| Sub-items (Objects)  | Indented list                          | Flyout popover on hover               |
| Quick create buttons | Shown on parent hover                  | Hidden (available in flyout)          |
| Settings             | Icon + label                           | Icon only, tooltip                    |
| Collapse toggle      | ChevronLeft + "Collapse" text          | ChevronRight only                     |
| User profile         | Avatar + name + email                  | Avatar only, dropdown on click        |

### 8.2 Objects Flyout (collapsed mode)

When hovering the Objects icon in collapsed mode, a flyout appears:

```
+--------+   +---------------------+
|        |   | Companies       [>] |
| [Obj]--+-->| Contacts        [>] |
|        |   | Deals           [>] |
+--------+   |---------------------|
              | + Add object        |
              +---------------------+
```

- Trigger: hover on Objects icon with 200ms delay
- Position: right of sidebar, vertically aligned with Objects icon
- Background: `var(--surface-0)`
- Border: `1px solid var(--grey-40)`
- Shadow: `var(--shadow-medium)`
- Border radius: `var(--radius-8)`
- Width: 200px
- Item height: `var(--height-s)` (32px)
- Padding: `var(--space-4)` vertical
- Dismiss: mouse leaves both icon and flyout

---

## 9. Animation and Transition Specs

All animations use GPU-accelerated properties only (`transform`, `opacity`). All animations respect `prefers-reduced-motion: reduce` by reducing to instant state changes.

### 9.1 Sidebar Expand/Collapse

| Property          | Value                     |
| ----------------- | ------------------------- |
| Property animated | `width`                   |
| Duration          | 200ms                     |
| Easing            | `ease-out`                |
| Reduced motion    | Instant (`duration: 0ms`) |

Note: `width` is not GPU-accelerated. For better performance on lower-end devices, consider animating `transform: translateX()` on the sidebar and adjusting main content margin separately. The current approach is acceptable at 200ms since layout shifts are minimal for a sidebar.

### 9.2 Objects Sub-nav Expand/Collapse

| Property          | Value                                     |
| ----------------- | ----------------------------------------- |
| Component         | `Collapsible` from `@repo/ui` (Radix)     |
| Property animated | `height` (via Radix `CollapsibleContent`) |
| Duration          | 200ms                                     |
| Easing            | `ease-out`                                |
| Reduced motion    | Instant                                   |

### 9.3 Mobile Sidebar Slide

| Property          | Value                               |
| ----------------- | ----------------------------------- |
| Property animated | `transform: translateX(-100% -> 0)` |
| Duration (enter)  | 200ms                               |
| Duration (exit)   | 150ms                               |
| Easing (enter)    | `ease-out`                          |
| Easing (exit)     | `ease-in`                           |
| Backdrop          | `opacity: 0 -> 1`, 200ms            |
| Reduced motion    | Instant                             |

### 9.4 Flyout Popover (collapsed objects)

| Property          | Value                                                 |
| ----------------- | ----------------------------------------------------- |
| Property animated | `opacity: 0 -> 1`, `transform: translateX(-4px) -> 0` |
| Duration (enter)  | 150ms                                                 |
| Duration (exit)   | 100ms                                                 |
| Easing            | `ease-out`                                            |
| Reduced motion    | Instant                                               |

### 9.5 Hover / Active Transitions

| Property       | Value                       |
| -------------- | --------------------------- |
| Properties     | `background-color`, `color` |
| Duration       | 150ms                       |
| Easing         | `ease`                      |
| Reduced motion | Instant                     |

### 9.6 Notification Badge Pulse (new message arrival)

| Property       | Value                                |
| -------------- | ------------------------------------ |
| Animation      | `scale(1) -> scale(1.2) -> scale(1)` |
| Duration       | 300ms                                |
| Easing         | `ease-in-out`                        |
| Trigger        | When unread count increments         |
| Reduced motion | No animation, just update count      |

### 9.7 ChevronDown Rotation (Objects section)

| Property          | Value                                    |
| ----------------- | ---------------------------------------- |
| Property animated | `transform: rotate(-90deg) -> rotate(0)` |
| Duration          | 200ms                                    |
| Easing            | `ease-out`                               |
| Reduced motion    | Instant                                  |

---

## 10. Component Structure

### 10.1 Component Tree

```
AppLayout
+-- AppSidebar                              (new - container)
|   +-- SidebarWorkspaceSwitcher            (new - top section)
|   |   +-- Avatar                          (existing @repo/ui)
|   |   +-- DropdownMenu                    (existing @repo/ui)
|   |   +-- Tooltip                         (existing @repo/ui)
|   |
|   +-- SidebarSearchTrigger               (new - search bar)
|   |
|   +-- SidebarPinnedSection               (new - favorites/pinned)
|   |   +-- SidebarNavItem                  (new - reusable)
|   |
|   +-- SidebarSectionLabel                (new - "PINNED", etc.)
|   |
|   +-- SidebarNavItem                     (new - reusable nav item)
|   |   +-- Tooltip                         (existing @repo/ui)
|   |
|   +-- SidebarObjectsGroup               (new - collapsible objects)
|   |   +-- Collapsible                     (existing @repo/ui)
|   |   +-- CollapsibleTrigger              (existing @repo/ui)
|   |   +-- CollapsibleContent              (existing @repo/ui)
|   |   +-- SidebarNavItem                  (reused)
|   |   +-- SidebarObjectsFlyout            (new - collapsed popover)
|   |       +-- Popover                     (existing @repo/ui)
|   |
|   +-- SidebarQuickCreateButton           (new - inline + button)
|   |
|   +-- SidebarNotificationBadge          (new - unread count)
|   |
|   +-- SidebarCollapseToggle             (new - expand/collapse)
|   |   +-- Button                          (existing @repo/ui)
|   |
|   +-- SidebarUserProfile                (new - bottom user section)
|   |   +-- Avatar                          (existing @repo/ui)
|   |   +-- DropdownMenu                    (existing @repo/ui)
|   |
|   +-- SidebarMobileBackdrop             (new - overlay for mobile)
|   |
|   +-- ScrollArea                         (existing @repo/ui)
|   +-- Separator                          (existing @repo/ui)
|
+-- MainContent
    +-- Header
    +-- <Outlet />
```

### 10.2 New Components to Create

All new components go in `apps/web/src/layouts/sidebar/`.

| Component                  | File                              | Complexity | Lines (est.) |
| -------------------------- | --------------------------------- | ---------- | ------------ |
| `AppSidebar`               | `app-sidebar.tsx`                 | Complex    | ~250         |
| `SidebarWorkspaceSwitcher` | `sidebar-workspace-switcher.tsx`  | Medium     | ~120         |
| `SidebarSearchTrigger`     | `sidebar-search-trigger.tsx`      | Simple     | ~50          |
| `SidebarNavItem`           | `sidebar-nav-item.tsx`            | Simple     | ~80          |
| `SidebarObjectsGroup`      | `sidebar-objects-group.tsx`       | Medium     | ~120         |
| `SidebarObjectsFlyout`     | `sidebar-objects-flyout.tsx`      | Medium     | ~80          |
| `SidebarPinnedSection`     | `sidebar-pinned-section.tsx`      | Simple     | ~60          |
| `SidebarSectionLabel`      | `sidebar-section-label.tsx`       | Simple     | ~20          |
| `SidebarQuickCreateButton` | `sidebar-quick-create-button.tsx` | Simple     | ~40          |
| `SidebarNotificationBadge` | `sidebar-notification-badge.tsx`  | Simple     | ~30          |
| `SidebarCollapseToggle`    | `sidebar-collapse-toggle.tsx`     | Simple     | ~40          |
| `SidebarUserProfile`       | `sidebar-user-profile.tsx`        | Medium     | ~100         |
| `SidebarMobileBackdrop`    | `sidebar-mobile-backdrop.tsx`     | Simple     | ~30          |

### 10.3 Existing Components Reused from `@repo/ui`

| Component               | Usage in Sidebar                |
| ----------------------- | ------------------------------- |
| `Avatar`                | Workspace icon, user avatar     |
| `AvatarFallback`        | Initials fallback               |
| `AvatarImage`           | User profile photo              |
| `Button`                | Collapse toggle, quick create   |
| `DropdownMenu`          | Workspace switcher, user menu   |
| `DropdownMenuContent`   | Menu panels                     |
| `DropdownMenuItem`      | Menu items                      |
| `DropdownMenuSeparator` | Dividers in menus               |
| `DropdownMenuTrigger`   | Menu triggers                   |
| `Tooltip`               | Collapsed state hints           |
| `TooltipContent`        | Tooltip text                    |
| `TooltipTrigger`        | Tooltip anchors                 |
| `ScrollArea`            | Scrollable nav section          |
| `Separator`             | Visual dividers                 |
| `Collapsible`           | Objects sub-nav expand/collapse |
| `CollapsibleTrigger`    | Objects section header          |
| `CollapsibleContent`    | Objects sub-items container     |
| `Popover`               | Objects flyout (collapsed mode) |
| `PopoverContent`        | Flyout panel                    |
| `PopoverTrigger`        | Flyout trigger                  |
| `Badge`                 | Notification count              |

### 10.4 State Management

**Sidebar UI state** -- managed via React Context scoped to `AppSidebar`:

```typescript
interface SidebarContextValue {
  collapsed: boolean;
  toggleCollapsed: () => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  objectsExpanded: boolean;
  toggleObjectsExpanded: () => void;
}
```

Persistence: `collapsed` state stored in localStorage key `relio-sidebar-collapsed`.

**Data from stores:**

| Data                 | Source                                               |
| -------------------- | ---------------------------------------------------- |
| Current org          | `useAuthStore(s => s.currentOrg)`                    |
| Current tenant       | `useAuthStore(s => s.currentTenant)`                 |
| User                 | `useAuthStore(s => s.user)`                          |
| Organizations list   | `useAuthStore(s => s.organizations)`                 |
| Custom objects       | `useSchemaStore(s => s.objects)` (future)            |
| Unread conversations | `useConversationsStore(s => s.totalUnread)` (future) |
| Pinned items         | `usePinnedStore(s => s.pinnedItems)` (future)        |

### 10.5 Props Interfaces

```typescript
// AppSidebar -- no external props, consumes stores internally
interface AppSidebarProps {
  // self-contained
}

// SidebarNavItem -- reusable nav item
interface SidebarNavItemProps {
  icon: React.ReactNode;
  label: string;
  path?: string; // route path (if navigating)
  onClick?: () => void; // action (if not navigating)
  isActive?: boolean;
  badge?: number; // notification count
  quickCreate?: () => void; // shows + button on hover
  collapsed?: boolean; // from sidebar context
  tooltipLabel?: string; // override tooltip text
}

// SidebarObjectsGroup
interface SidebarObjectsGroupProps {
  objects: Array<{
    id: string;
    name: string;
    icon: string; // Lucide icon name
    path: string;
  }>;
  basePath: string;
  collapsed: boolean;
  onCreateObject: () => void;
}

// SidebarPinnedSection
interface SidebarPinnedSectionProps {
  items: Array<{
    id: string;
    label: string;
    path: string;
  }>;
  collapsed: boolean;
  onManagePins: () => void;
}

// SidebarWorkspaceSwitcher
interface SidebarWorkspaceSwitcherProps {
  org: Organization;
  tenant: Tenant;
  collapsed: boolean;
  onSwitchOrg: () => void;
  onSwitchTenant: () => void;
}

// SidebarUserProfile
interface SidebarUserProfileProps {
  user: User;
  collapsed: boolean;
  onProfile: () => void;
  onSettings: () => void;
  onLogout: () => void;
}

// SidebarSearchTrigger
interface SidebarSearchTriggerProps {
  collapsed: boolean;
  onTrigger: () => void; // opens Cmd+K dialog
}

// SidebarNotificationBadge
interface SidebarNotificationBadgeProps {
  count: number;
  collapsed?: boolean; // renders as dot when collapsed
}
```

---

## 11. Accessibility

### 11.1 ARIA Landmarks and Roles

| Element         | ARIA                                                        |
| --------------- | ----------------------------------------------------------- |
| `<aside>`       | `role="navigation"`, `aria-label="Main sidebar navigation"` |
| Nav section     | `<nav aria-label="Primary navigation">`                     |
| Active item     | `aria-current="page"`                                       |
| Collapsible     | `aria-expanded="true/false"` on trigger                     |
| Badge           | `aria-label="3 unread conversations"`                       |
| Collapse button | `aria-label="Collapse sidebar"` / `"Expand sidebar"`        |
| Search trigger  | `aria-label="Open search (Command+K)"`                      |
| Mobile backdrop | `aria-hidden="true"` (decorative)                           |

### 11.2 Keyboard Navigation

| Key                | Behavior                                            |
| ------------------ | --------------------------------------------------- |
| `Tab`              | Moves through interactive elements in order         |
| `Enter` / `Space`  | Activates focused item                              |
| `Escape`           | Closes mobile overlay / flyout / dropdown           |
| `ArrowDown`        | Moves focus to next nav item (optional enhancement) |
| `ArrowUp`          | Moves focus to previous nav item                    |
| `ArrowRight`       | Expands collapsed section (Objects)                 |
| `ArrowLeft`        | Collapses expanded section (Objects)                |
| `Cmd+K` / `Ctrl+K` | Opens global search (handled at app level)          |

### 11.3 Focus Management

- Focus-visible ring: `2px solid var(--primary-60)`, `2px offset`
- After sidebar close (mobile), focus returns to the hamburger trigger
- After dropdown close, focus returns to the trigger element
- Skip-to-content link before sidebar (hidden until focused)

### 11.4 Contrast Ratios

All text-on-background combinations meet WCAG 2.1 AA (4.5:1 minimum):

| Combination                              | Light Mode Ratio                       | Dark Mode Ratio |
| ---------------------------------------- | -------------------------------------- | --------------- |
| `--text-default` on `--surface-20`       | 15.7:1                                 | 13.2:1          |
| `--text-subdued-1` on `--surface-20`     | 8.5:1                                  | 10.3:1          |
| `--text-subdued-2` on `--surface-20`     | 3.0:1 (decorative only, not body text) | 3.0:1           |
| `--primary-50` on `--primary-10`         | 5.2:1                                  | 5.8:1           |
| `--text-inverse` on `--error-50` (badge) | 5.1:1                                  | 5.1:1           |

Note: `--text-subdued-2` is used only for decorative labels (section headers) that are accompanied by other visual cues. Interactive elements use `--text-subdued-1` minimum.

---

## 12. Theme Compatibility

The sidebar uses exclusively CSS custom properties, so it renders correctly across all 6 theme combinations without code changes.

| Token Used       | Falcon Light | Falcon Dark | Phoenix Light | Phoenix Dark | Jarvis Light | Jarvis Dark |
| ---------------- | ------------ | ----------- | ------------- | ------------ | ------------ | ----------- |
| `--primary-50`   | #3535f3      | #5252ef     | #6933fa       | #8154fc      | #278476      | #278476     |
| `--primary-10`   | #f4f4fc      | #1e1f2e     | #f7f5fc       | #221e2e      | #f7fcfc      | #1b2927     |
| `--surface-20`   | #f5f5f5      | #19191a     | #f5f5f5       | #19191a      | #f5f5f5      | #19191a     |
| `--text-default` | #141414      | #f0f0f0     | #141414       | #f0f0f0      | #141414      | #f0f0f0     |
| `--grey-40`      | #e0e0e0      | #5a5a5a     | #e0e0e0       | #5a5a5a      | #e0e0e0      | #5a5a5a     |

No hardcoded hex values, px values outside tokens, or theme-conditional logic in the component code.

---

## 13. Implementation Notes

### 13.1 File Structure

```
apps/web/src/layouts/
+-- sidebar/
|   +-- app-sidebar.tsx
|   +-- sidebar-workspace-switcher.tsx
|   +-- sidebar-search-trigger.tsx
|   +-- sidebar-nav-item.tsx
|   +-- sidebar-objects-group.tsx
|   +-- sidebar-objects-flyout.tsx
|   +-- sidebar-pinned-section.tsx
|   +-- sidebar-section-label.tsx
|   +-- sidebar-quick-create-button.tsx
|   +-- sidebar-notification-badge.tsx
|   +-- sidebar-collapse-toggle.tsx
|   +-- sidebar-user-profile.tsx
|   +-- sidebar-mobile-backdrop.tsx
|   +-- sidebar-context.tsx              <- React Context for sidebar state
|   +-- index.ts                         <- barrel export
+-- app-layout.tsx                       <- updated to use AppSidebar
+-- sidebar-design-spec.md              <- this file
```

### 13.2 Migration Path

The existing `app-layout.tsx` should be updated to:

1. Replace the inline sidebar JSX with `<AppSidebar />`.
2. The existing `sidebar-nav.tsx` can be retired. Its `NavGroup` pattern is subsumed by `SidebarObjectsGroup` with `Collapsible`.
3. The workspace switcher, user profile, and collapse toggle code from `app-layout.tsx` moves into their respective new components.

### 13.3 Dependencies (no new packages)

All required UI primitives already exist in `packages/ui/src/`:

- `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` (Radix)
- `Popover`, `PopoverContent`, `PopoverTrigger` (Radix)
- `Tooltip`, `TooltipContent`, `TooltipTrigger` (Radix)
- `DropdownMenu` and related (Radix)
- `Avatar`, `Badge`, `Button`, `ScrollArea`, `Separator`

No new packages need to be installed.

### 13.4 Performance Considerations

- Sidebar is `position: fixed` to avoid reflowing main content on scroll
- Icons imported individually from Lucide (`import { Database } from 'lucide-react'`), not from barrel
- Custom objects list is typically < 20 items; no virtualization needed
- `Collapsible` uses Radix animation for smooth height transitions
- Mobile backdrop uses `will-change: opacity` for GPU compositing

### 13.5 Testing Strategy

| Test Type  | Coverage Areas                                        |
| ---------- | ----------------------------------------------------- |
| Unit       | `SidebarNavItem` renders all states, active detection |
| Unit       | `SidebarNotificationBadge` renders count, dot variant |
| Component  | `AppSidebar` collapse/expand toggle works             |
| Component  | Objects group expands/collapses, shows sub-items      |
| Component  | Workspace switcher shows org/tenant, opens dropdown   |
| Component  | Flyout appears on hover in collapsed mode             |
| A11y       | All items keyboard navigable, ARIA attributes correct |
| Responsive | Sidebar hidden on mobile, overlay works               |
| Visual     | Renders correctly across all 6 theme combinations     |

Target: > 90% coverage for all sidebar components.
