# Banner (Notification Banner)

## Overview

The Banner component is a notification banner used to display contextual messages, alerts, and feedback to users. It supports multiple visual variants, single-line and multi-line layouts, optional action buttons, a close/dismiss mechanism, and a loading state. The component uses `React.forwardRef` for ref forwarding.

## Anatomy

```
+---------------------------------------------------------------+
| [Icon/Spinner]  [Title]                          [Close Button]|
|                 [Description]                                  |
|                 [Primary Button]  [Secondary Button]           |
+---------------------------------------------------------------+
```

**Multi-line layout** (default):
- Icon container (left) -- shows a custom icon, default `IcWarning` icon, or a `Spinner` when loading
- Content area (center) -- title (optional), description, and action buttons
- Close button (right) -- `IconButton` with close icon

**Single-line layout** (`isSingleLine` or `isFullWidth`):
- Icon, description, buttons, and close button aligned horizontally in a single row
- Title is not displayed in single-line mode

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `"Title"` | Title text displayed in multi-line mode |
| `description` | `string` | `"Description"` | Description text displayed in both layouts |
| `icon` | `React.ReactNode` | `<IcWarning />` | Custom icon to display. Falls back to default warning icon |
| `variant` | `"neutral" \| "primary" \| "error" \| "success" \| "warning"` | `"primary"` | Visual variant controlling colors for background, border, icon, and buttons |
| `hideTitle` | `boolean` | `false` | Hides the title in multi-line mode |
| `isFullWidth` | `boolean` | `false` | Renders the banner in full-width single-line mode (screen-width, no border-radius) |
| `isSingleLine` | `boolean` | `false` | Renders the banner in single-line (inline) mode |
| `hideButtons` | `boolean` | `false` | Hides both primary and secondary action buttons |
| `hidePrimaryBtn` | `boolean` | `false` | Hides only the primary action button |
| `hideSecondaryBtn` | `boolean` | `false` | Hides only the secondary action button |
| `primaryBtnText` | `string` | `"Submit"` | Text for the primary action button |
| `secondaryBtnText` | `string` | `"Cancel"` | Text for the secondary action button |
| `primaryBtnAction` | `() => void` | `() => {}` | Callback when the primary button is clicked |
| `secondaryBtnAction` | `() => void` | `() => {}` | Callback when the secondary button is clicked |
| `hideClose` | `boolean` | `false` | Hides the close/dismiss button |
| `hideIcon` | `boolean` | `false` | Hides the icon/spinner area entirely |
| `loading` | `boolean` | `false` | Replaces the icon with a `Spinner` component |
| `showBanner` | `boolean` | `true` | Controls external visibility of the banner. When `false`, renders `null` |
| `onClose` | `() => void` | `undefined` | Custom close handler. If not provided, the banner manages its own visibility via internal state |

The component also accepts all standard `HTMLDivElement` attributes via rest props.

## Variants

| Variant | Border Color | Background Color | Icon Color | Button Appearance |
|---|---|---|---|---|
| `primary` (default) | `border-color-primary-30` | `bg-color-primary-10` | `text-color-primary-50` | `default` |
| `success` | `border-color-text-success-default` | `bg-color-feedback-success-20` | `text-color-feedback-success-50` | `positive` |
| `error` | `border-color-feedback-error-50` | `bg-color-feedback-error-20` | `text-color-feedback-error-50` | `negative` |
| `warning` | `border-color-feedback-warning-50` | `bg-color-feedback-warning-20` | `text-color-feedback-warning-50` | `warning` |
| `neutral` | `border-color-neutral-grey-40` | `bg-color-neutral-grey-10` | `text-color-primary-50` | `default` |

### Secondary Button Text Colors by Variant

| Variant | Secondary Button Color |
|---|---|
| `primary` | `text-color-primary-60` |
| `success` | `text-color-feedback-success-80` |
| `error` | `text-color-feedback-error-80` |
| `warning` | `text-color-feedback-warning-80` |
| `neutral` | `text-color-primary-60` |

## Sizes

The Banner does not have explicit size props. Sizing is determined by layout mode:

| Layout | Padding | Border | Width |
|---|---|---|---|
| Multi-line | `p-gd-12` | `border-[1px]`, `rounded-gd-12` | `w-full` |
| Single-line (normal) | `p-gd-8` | `border-[1px]`, `rounded-gd-12` | `w-full` |
| Single-line (full-width) | `px-gd-24 py-gd-12` | No border, no border-radius | `w-screen` |

Action buttons use `size="xs"`. Close button uses `size="sm"`.

## States

| State | Description |
|---|---|
| **Default** | Multi-line banner with title, description, and action buttons |
| **Single-line** | Compact horizontal layout; title is hidden |
| **Full-width** | Single-line banner spanning the entire viewport width |
| **Loading** | Icon is replaced with a `Spinner` component |
| **Hidden (internal)** | Clicking close without `onClose` sets internal `visible` state to `false`, rendering `null` |
| **Hidden (external)** | `showBanner={false}` renders `null` |

## Design Tokens

### Colors (via Tailwind utility classes mapped to design tokens)

- **Backgrounds**: `bg-color-primary-10`, `bg-color-feedback-success-20`, `bg-color-feedback-error-20`, `bg-color-feedback-warning-20`, `bg-color-neutral-grey-10`
- **Borders**: `border-color-primary-30`, `border-color-text-success-default`, `border-color-feedback-error-50`, `border-color-feedback-warning-50`, `border-color-neutral-grey-40`
- **Icon colors**: `text-color-primary-50`, `text-color-feedback-success-50`, `text-color-feedback-error-50`, `text-color-feedback-warning-50`
- **Text**: `text-color-text-subdued-1` (description)

### Typography

- Title: `text-en-desktop-body-l-prominent`
- Description: `text-en-desktop-body-m`

### Spacing

- `gap-gd-12` (parent), `gap-gd-8` (content sections)
- Icon size: `w-gd-24 h-gd-24`

## Accessibility

- The component uses semantic HTML (`<p>` for title and description)
- Close button is rendered as an `IconButton` component (button element with icon)
- Action buttons are rendered using the `Button` component
- The component forwards refs for external DOM access
- No explicit ARIA attributes are defined on the banner container itself; consider adding `role="alert"` or `role="status"` for screen reader announcements

## Performance Best Practices

### Rendering Optimization
- **Memoize the component** — Wrap in `React.memo` since banners are often rendered in lists or layouts that re-render frequently. The banner's props (variant, title, description) change infrequently.
- **Stable callback references** — `primaryBtnAction`, `secondaryBtnAction`, and `onClose` handlers should use `useCallback` in the parent to prevent unnecessary re-renders.
- **Conditional rendering over CSS hiding** — Use early return `null` for hidden banners rather than `display: none`. This avoids keeping hidden banner DOM nodes in memory.

### Animation
- **CSS transitions over JS** — Use CSS `transition` for show/hide animations rather than JavaScript-driven animation. Apply `opacity` and `transform` transitions for mount/unmount.
- **Respect `prefers-reduced-motion`** — Disable transitions when the user's OS preference requests reduced motion.

### Scalability Considerations
- **Controlled vs uncontrolled dismiss** — Support both patterns via the `onClose` prop. When `onClose` is provided, the parent owns visibility state (controlled). Otherwise, the banner manages its own state (uncontrolled). This enables integration with global notification state managers.
- **Composable with notification systems** — The banner should be usable standalone or as a building block within a toast/notification queue system.
- **Variant extensibility** — Use CVA or a variant map pattern so new variants can be added by extending the configuration, not modifying the component logic.
