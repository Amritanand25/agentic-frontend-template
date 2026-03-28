# Spinner

## Overview

Spinner is an animated loading indicator component that provides visual feedback during asynchronous operations. It renders an SVG-based circular spinner with a track and progress arc, supports five predefined sizes, customizable colors, an optional text label with configurable position, and custom sizing. The component uses `role="status"` and includes screen-reader-only text for accessibility.

## Anatomy

```
<div role="status">                  <!-- Container (data-testid="spinner-container") -->
  [<p>Label</p>]                     <!-- Optional label (top/left position, data-testid="spinner-label") -->
  <svg>                              <!-- Animated SVG spinner (data-testid="spinner-svg") -->
    <circle />                       <!-- Background track circle -->
    <path />                         <!-- Animated progress arc -->
  </svg>
  <span class="sr-only">            <!-- Screen reader text (data-testid="spinner-sr-text") -->
    Loading...
  </span>
  [<p>Label</p>]                     <!-- Optional label (bottom/right position) -->
</div>
```

The Spinner consists of:
1. **Container** - A `div` with `role="status"` that holds the spinner and optional label. Uses flexbox for layout.
2. **Label (optional)** - A `<p>` element rendered before or after the SVG depending on the `position` prop.
3. **SVG Spinner** - An animated SVG containing a background circle (track) and a partial arc path (progress indicator) with `animate-spin` class.
4. **Screen Reader Text** - A visually hidden `<span>` with `sr-only` class containing "Loading..." for assistive technologies.

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs" \| "s" \| "m" \| "l" \| "xl"` | `"m"` | Predefined size of the spinner. Controls SVG dimensions, font size, and gap. |
| `customSize` | `string` | `""` | Custom size override for the SVG spinner (e.g., `"60px"`). When set, overrides the width/height from `size`. |
| `color` | `string` | `"var(--gd-primary-50)"` | Color of the animated progress arc (the moving part of the spinner). |
| `background` | `string` | `"var(--gd-neutral-grey-40)"` | Color of the background track circle. |
| `label` | `string` | `""` | Optional text label displayed alongside the spinner. |
| `position` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | Position of the label relative to the spinner. `top`/`bottom` use vertical layout (`flex-col`), `left`/`right` use horizontal layout. |
| `labelClassName` | `string` | - | Additional CSS class names applied to the label `<p>` element. |
| `labelStyle` | `React.CSSProperties` | `{}` | Additional inline styles applied to the label `<p>` element. |
| `containerClassName` | `string` | - | Additional CSS class names applied to the container `div`. |
| `containerStyle` | `React.CSSProperties` | `{}` | Additional inline styles applied to the container `div`. |
| `ref` | `React.Ref<HTMLDivElement>` | - | Forwarded ref attached to the container `div`. |

Additional HTML attributes are spread onto the container `div` via `...props`.

## Variants

Spinner does not have named visual variants. Its appearance is configured through the `size` prop and color customization.

## Sizes

| Size | Spinner Dimensions | SVG ViewBox | Stroke Width | Font Size | Line Height | Gap |
|------|-------------------|-------------|--------------|-----------|-------------|-----|
| `xs` | 12px x 12px | 0 0 12 12 | 2.25 | 12px | 16px | 4px |
| `s` | 16px x 16px | 0 0 16 16 | 3 | 14px | 20px | 8px |
| `m` | 24px x 24px | 0 0 24 24 | 4 | 16px | 24px | 12px |
| `l` | 40px x 40px | 0 0 40 40 | 5 | 18px | 24px | 16px |
| `xl` | 48px x 48px | 0 0 48 48 | 6 | 18px | 24px | 16px |

Each size has a precisely crafted SVG with appropriate circle radius and arc path coordinates to maintain visual consistency.

When `customSize` is provided, the SVG element's inline `width` and `height` are overridden to the custom value while the internal SVG coordinates (viewBox, circle, path) remain based on the selected `size`.

## States

| State | Description |
|-------|-------------|
| **Loading (default)** | The spinner continuously rotates via the `animate-spin` CSS animation. This is the only visual state. |

Spinner has no interactive states (hover, focus, active, disabled) as it is a non-interactive status indicator.

## Design Tokens

| Token | Usage |
|-------|-------|
| `--gd-primary-50` | Default color for the animated progress arc |
| `--gd-neutral-grey-40` | Default color for the background track circle |

## Accessibility

| Attribute | Element | Value | Description |
|-----------|---------|-------|-------------|
| `role` | Container `div` | `"status"` | Identifies the spinner as a live region that conveys status information. Screen readers announce changes within this region. |
| `aria-hidden` | `<svg>` | `"true"` | Hides the decorative SVG from assistive technologies. |
| `class="sr-only"` | `<span>` | - | Contains "Loading..." text that is visually hidden but readable by screen readers. |

**Keyboard Interactions:**
- Spinner is non-interactive and does not receive keyboard focus.

**Screen Reader Behavior:**
- The `role="status"` container ensures screen readers announce the loading state.
- The "Loading..." text in the `sr-only` span provides a textual description of the spinner's purpose.
- The SVG is marked `aria-hidden="true"` to avoid announcing the visual decoration.

## Performance Best Practices

### Rendering Optimization
- **Memoize with `React.memo`** — Spinner props rarely change once mounted. Wrap in `React.memo` to prevent re-renders when parent components update.
- **Avoid inline style objects** — Pre-compute style objects for each size variant as constants outside the component. Inline style object literals create new references every render.
- **SVG constants** — Define the SIZE_CONFIG map (viewBox, arc paths, circle coordinates) as a module-level constant. These never change and should not be recreated.

### Animation Performance
- **Use CSS `animation` over JS** — The `animate-spin` CSS animation runs on the compositor thread, avoiding main thread jank. Never use `requestAnimationFrame` or `setInterval` for spinner rotation.
- **`will-change: transform`** — Add this CSS hint to promote the SVG to its own compositor layer for smoother rotation.
- **Respect `prefers-reduced-motion`** — Pause or slow the animation for users who request reduced motion. Consider using a static progress indicator as fallback.

### Scalability Considerations
- **No internal state** — The spinner is purely props-driven with no `useState` or `useEffect`. This makes it the most performant possible — a pure render function.
- **Stateless by design** — Never add loading state management to the spinner itself. The spinner renders; the parent decides when to show it.
- **Tree-shakeable** — Export as a named export so unused spinner imports can be eliminated during bundling.
