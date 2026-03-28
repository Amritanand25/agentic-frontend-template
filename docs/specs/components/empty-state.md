# EmptyState

## Overview
A flexible component for displaying empty, no-data, or zero-result states. It supports three layout variants -- a centered single card, a three-column grid, and a compact text-only row -- each with optional icons, titles, descriptions, and action buttons. Titles and descriptions accept both strings and ReactNode for rich content.

## Anatomy

### Single Variant (default)
```
+-----------------------------------+
|           [Icon]                  |
|           Title                   |
|        Description                |
|  [Secondary Btn]  [Primary Btn]  |
+-----------------------------------+
```

### Triple Variant
```
+------------+  +------------+  +------------+
|   [Icon]   |  |   [Icon]   |  |   [Icon]   |
|   Title    |  |   Title    |  |   Title    |
| Description|  | Description|  | Description|
| [Actions]  |  | [Actions]  |  | [Actions]  |
+------------+  +------------+  +------------+
```

### Text-Only Variant
```
+-------------------------------------------------------+
| [Icon] Title / Description        [Primary Button]    |
+-------------------------------------------------------+
```

**Parts:**
1. **Icon** -- A default illustration (`EmptyStateIcon`), a built-in icon string (`"location"`), a custom ReactNode, or `"custom"` (renders nothing).
2. **Title** -- Heading element (configurable `h1`--`h6`) for the empty state message.
3. **Description** -- Supporting paragraph text.
4. **Primary Action** -- A primary `Button` with optional prefix icon or plus icon.
5. **Secondary Action** -- A secondary `Button` rendered alongside or above the primary action.
6. **Cards (triple)** -- Array of card objects, each with its own title, description, and actions.

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"single" \| "triple" \| "text-only"` | `"single"` | Layout variant controlling the overall structure. |
| `icon` | `React.ReactNode \| "location" \| "custom"` | `<EmptyStateIcon />` | Icon displayed above the title. Pass a ReactNode for a custom icon, `"location"` for the built-in location pin icon, or `"custom"` to render no icon. |
| `iconSize` | `"sm" \| "md" \| "lg"` | `"md"` | Size of the default `EmptyStateIcon`. Ignored when a custom ReactNode is provided. |
| `title` | `ReactNode` | `undefined` | Title content. Accepts a string or any ReactNode for rich formatting. |
| `description` | `ReactNode` | `undefined` | Description content. Accepts a string or any ReactNode. |
| `titleAs` | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6"` | `"h3"` | HTML heading element used to render the title. |
| `primaryAction` | `{ label: ReactNode; onClick: () => void; icon?: React.ReactNode; showPlusIcon?: boolean }` | `undefined` | Configuration for the primary action button. When `showPlusIcon` is `true` and no custom `icon` is provided, an `IcAdd` icon is shown as the button prefix. |
| `secondaryAction` | `{ label: ReactNode; onClick: () => void }` | `undefined` | Configuration for the secondary action button. |
| `actionsOrientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout direction for the primary and secondary action buttons. |
| `cardClassName` | `string` | `undefined` | Custom CSS class applied to each card container (used in single and triple variants). |
| `iconClassName` | `string` | `undefined` | Custom CSS class applied to the icon wrapper `div`. |
| `titleClassName` | `string` | `undefined` | Custom CSS class applied to the title heading element. |
| `descriptionClassName` | `string` | `undefined` | Custom CSS class applied to the description paragraph. |
| `actionsClassName` | `string` | `undefined` | Custom CSS class applied to the actions wrapper `div`. |
| `cards` | `Array<{ title?: ReactNode; description?: ReactNode; primaryAction?: {...}; secondaryAction?: {...} }>` | `undefined` | Array of card data objects for the triple variant. If omitted in triple variant, the component repeats the top-level `title`, `description`, `primaryAction`, and `secondaryAction` three times. |
| `hideIcon` | `boolean` | `undefined` | When `true`, hides the icon in the text-only variant. |
| `className` | `string` | `undefined` | Custom CSS class applied to the root container element. |
| `ref` | `React.Ref<HTMLDivElement>` | -- | Forwarded ref attached to the root `div` element. |

Additionally, all standard `React.HTMLAttributes<HTMLDivElement>` (except `title` and `description`, which are overridden) are spread onto the root element.

## Variants

### Single (default)
A vertically centered card layout with icon, title, description, and action buttons. Best for full-page or section-level empty states.

### Triple
A responsive three-column grid (`grid-cols-1 md:grid-cols-3`) that renders multiple cards. Each card can have independent title, description, and actions. Useful for onboarding or dashboard sections with multiple empty areas.

### Text-Only
A compact horizontal row with icon + text on the left and a primary action button on the right. Uses smaller button size (`"s"`) and reduced text/icon sizes. Only displays the primary action (secondary action is not rendered). Suited for inline or table-level empty states.

## Sizes

### Icon Sizes

| Size | Dimensions |
|------|-----------|
| `"sm"` | `w-12 h-12` (48px) |
| `"md"` | `w-16 h-16` (64px) |
| `"lg"` | `w-20 h-20` (80px) |

Note: Icon size classes only apply to the default `EmptyStateIcon`. When a custom ReactNode icon is provided, the icon is rendered as-is inside a flex-centered wrapper with `mb-6` margin.

### Button Sizes

| Variant | Button Size |
|---------|------------|
| `single` / `triple` | `"m"` |
| `text-only` | `"s"` |

## States

| State | Description |
|-------|-------------|
| **Empty (no actions)** | Displays icon, title, and description without any buttons when `primaryAction` and `secondaryAction` are both `undefined`. |
| **With Primary Action** | Renders a primary button. Optionally shows an `IcAdd` plus icon via `showPlusIcon: true` or a custom icon via the `icon` property. |
| **With Secondary Action** | Renders a secondary button alongside or above the primary button. |
| **With Both Actions** | Renders both buttons in the specified `actionsOrientation` (horizontal or vertical). |
| **No Content** | Renders the icon only when no `title` or `description` is provided. |
| **Hidden Icon** | In text-only variant, `hideIcon={true}` removes the icon entirely. |

## Design Tokens

| Token | Usage |
|-------|-------|
| `--gd-text-default` | Title text color (applied via inline `style`). |
| `--gd-text-subdued-1` | Description text color (applied via inline `style`). |
| `--gd-primary-50` | Location icon color (when `icon="location"`). |

## Accessibility

- **Semantic headings:** The title renders as a configurable heading element (`h1`--`h6` via `titleAs`), defaulting to `h3`. This ensures proper document outline and screen reader navigation.
- **Button accessibility:** Action buttons use the `Button` component with `kind="primary"` or `kind="secondary"`, inheriting accessible button semantics.
- **Keyboard navigation:** Action buttons are fully keyboard accessible (focusable, activatable via Enter/Space).
- **Ref forwarding:** The component forwards a ref to the root `div` for imperative focus management.
- **ReactNode support:** Both `title` and `description` accept ReactNode, allowing for custom accessible markup (e.g., `<span>`, `<strong>`, `<em>`).

## Performance Best Practices

### Rendering Optimization
- **Memoize the component** — EmptyState content is typically static. Wrap in `React.memo` to prevent re-renders when parent layouts update.
- **Stable action callbacks** — `primaryAction.onClick` and `secondaryAction.onClick` should use `useCallback` in the parent. These are passed as props to Button components.
- **Avoid dynamic heading tag overhead** — The dynamic `titleAs` prop creates a variable JSX element tag. This is fine for React but cache the tag reference in a local variable rather than computing it inline.

### Bundle Optimization
- **Tree-shake icon components** — Default SVG icons (EmptyStateIcon, LocationIcon) should be separate modules so they are tree-shaken when consumers provide custom icons.
- **Lazy load illustrations** — For large SVG illustrations, consider lazy loading them since empty states are not always visible on initial render.

### Scalability Considerations
- **Composable layout** — The three variants (single, triple, text-only) cover the most common empty state layouts. Support `className` overrides on every sub-element for edge cases.
- **ReactNode props** — Accept `ReactNode` for `title` and `description` (not just strings) to support rich content like links, bold text, and custom formatting.
- **Responsive triple variant** — The triple variant grid should collapse to single column on mobile via responsive CSS grid, not JavaScript media queries.
