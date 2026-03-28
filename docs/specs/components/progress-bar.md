# ProgressBar (FeedbackProgress)

## Overview

A progress indicator component that supports two visual variants: a horizontal **line** bar and a circular **ring**. It displays determinate progress as a percentage of a configurable maximum value, with optional label text and numeric value display. The component supports four color themes, four sizes, custom circle dimensions, and both label and value styling overrides.

## Anatomy

### Line Variant

```
+------------------------------------------+
|  Label Text                        Value  |  <-- optional header row
+------------------------------------------+
|  [========----------]                     |  <-- track + fill bar
+------------------------------------------+
```

**Parts:**
- **Container** -- Outer `<div>` with `role="progress-container"`. Full width, optional `space-y-gd-16` spacing when label/value is shown.
- **Header Row** -- Flex row containing the label span (left-aligned) and value span (right-aligned, `ml-auto`).
- **Track** -- Background bar with `role="progressbar"`, rounded-full, colored with neutral grey.
- **Fill** -- Inner bar representing progress percentage, animated with `transition-all duration-300 ease-in-out`.

### Circle Variant

```
    +-------+
   |         |
   |   75    |    <-- value centered inside (or beside for xs)
   |         |
    +-------+
```

**Parts:**
- **Container** -- Inline-flex wrapper for centering.
- **SVG** -- Contains two `<circle>` elements, rotated -90deg so progress starts from the top.
- **Background Circle** -- Full ring in neutral grey.
- **Progress Circle** -- Colored arc using `strokeDasharray` and `strokeDashoffset`, with `strokeLinecap="round"`.
- **Value Display** -- For `xs` size: a `<span>` positioned beside the circle with `ml-gd-4`. For all other sizes: a `<div>` absolutely positioned in the center of the circle.

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Current progress value. |
| `max` | `number` | `100` | Maximum progress value. The fill percentage is calculated as `Math.min(100, (value / max) * 100)`. |
| `color` | `"default" \| "success" \| "error" \| "warning"` | `"default"` | Color theme applied to the fill bar/circle and value text. |
| `showLabel` | `boolean` | `true` | Whether to display the label text (line variant only). |
| `showValue` | `boolean` | `true` | Whether to display the numeric value. |
| `label` | `string` | `""` | Label text shown above the progress bar (line variant). Empty string renders nothing due to falsy check. |
| `className` | `string` | `undefined` | Additional CSS classes applied to the outer container (line variant only). |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | Controls the height of the line bar or the radius of the circle, plus text sizing. |
| `variant` | `"line" \| "circle"` | `"line"` | Visual variant -- horizontal bar or circular ring. |
| `textStyle` | `React.CSSProperties` | `{}` | Inline styles applied to the label text element. |
| `valueStyle` | `React.CSSProperties` | `{}` | Inline styles applied to the value text element. |
| `circleRadius` | `number` | `undefined` | Custom radius in pixels for the circle variant. Overrides the size-based default. The SVG dimensions will be `circleRadius * 2`. |
| `strokeWidth` | `number` | `undefined` | Custom stroke width in pixels for the circle variant. Overrides the size-based default. |

The component also accepts any additional HTML attributes via rest props, which are spread onto the outer container element.

## Variants

| Variant | Description |
|---------|-------------|
| **Line** | A horizontal progress bar with a rounded track and fill. Supports label and value text above the bar. This is the default variant. |
| **Circle** | A circular/ring progress indicator using SVG. Progress starts from the 12 o'clock position. Value is shown in the center (or beside for `xs` size). Does not render a label. |

## Sizes

### Line Variant Heights

| Size | Height Class | Actual Height |
|------|-------------|---------------|
| `xs` | `h-gd-2` | 2px (design token) |
| `sm` | `h-gd-4` | 4px (design token) |
| `md` | `h-[6px]` | 6px |
| `lg` | `h-gd-8` | 8px (design token) |

### Circle Variant Radii (default)

| Size | Default Radius | SVG Dimensions | Default Stroke Width |
|------|---------------|----------------|---------------------|
| `xs` | 8 px | 16x16 px | 2 px |
| `sm` | 12 px | 24x24 px | 2 px |
| `md` | 24 px | 48x48 px | 4 px |
| `lg` | 36 px | 72x72 px | 8 px |

Note: The actual drawn circle radius is `radius - strokeWidth/2` to keep strokes within the SVG viewBox.

### Value Text Font Sizes

| Size | Font Class |
|------|-----------|
| `xs` | `text-en-desktop-body-s` |
| `sm` | `text-en-desktop-body-xs` |
| `md` | `text-en-desktop-body-m` |
| `lg` | `text-en-desktop-heading-xl` |

### Line Variant Label Font

All sizes use `text-en-desktop-body-l-prominent` for the label/value header row.

## States

| State | Description |
|-------|-------------|
| **Empty** | `value={0}` -- Fill bar has `width: 0%`; circle has no visible arc. |
| **Partial** | `0 < value < max` -- Fill bar shows proportional width; circle shows proportional arc. |
| **Full** | `value >= max` -- Fill bar is `width: 100%`; circle is a complete ring. Value is capped at 100% via `Math.min`. |
| **Overflow** | `value > max` -- Clamped to 100% fill (no visual overflow). |
| **With Label** | `showLabel={true}` and `label` is truthy -- Header row is rendered with the label text. |
| **Without Label** | `showLabel={false}` or empty `label` -- Header row label is hidden. |
| **With Value** | `showValue={true}` -- Numeric value is displayed. For line: in the header row. For circle: centered or beside. |
| **Without Value** | `showValue={false}` -- No numeric value displayed. |

### Animated Transition (Line Variant)

The fill bar uses `transition-all duration-300 ease-in-out` for smooth value changes.

## Design Tokens

### Color Tokens

#### Fill/Stroke Colors

| Color Prop | Fill Token | CSS Variable |
|------------|-----------|--------------|
| `default` | `bg-color-primary-50` | `var(--gd-primary-50)` |
| `success` | `bg-color-feedback-success-50` | `var(--gd-feedback-success-50)` |
| `error` | `bg-color-feedback-error-50` | `var(--gd-feedback-error-50)` |
| `warning` | `bg-color-feedback-warning-50` | `var(--gd-feedback-warning-50)` |

#### Text Colors (Value Display)

| Color Prop | Text CSS Variable |
|------------|-------------------|
| `default` | `var(--gd-primary-60)` |
| `success` | `var(--gd-feedback-success-80)` |
| `error` | `var(--gd-feedback-error-80)` |
| `warning` | `var(--gd-feedback-warning-80)` |

#### Track/Background

| Element | Token |
|---------|-------|
| Line track background | `bg-color-neutral-grey-40` |
| Circle background stroke | `var(--gd-neutral-grey-40)` |

### Spacing Tokens

| Token | Usage |
|-------|-------|
| `space-y-gd-16` | Gap between header row and progress bar (when label/value shown) |
| `ml-gd-4` | Left margin for xs circle value text |
| `h-gd-2` | xs bar height |
| `h-gd-4` | sm bar height |
| `h-gd-8` | lg bar height |

### Typography Tokens

| Token | Usage |
|-------|-------|
| `text-en-desktop-body-l-prominent` | Line variant header row text |
| `text-en-desktop-body-s` | xs circle value text |
| `text-en-desktop-body-xs` | sm circle value text |
| `text-en-desktop-body-m` | md circle value text |
| `text-en-desktop-heading-xl` | lg circle value text |
| `text-color-primary-60` | Line variant value text color |

## Accessibility

### ARIA Attributes

| Element | Attribute | Value |
|---------|-----------|-------|
| Outer container (line) | `role` | `"progress-container"` |
| Outer container (line) | `data-testid` | `"progress-container"` |
| Track bar (line) | `role` | `"progressbar"` |
| Track bar (line) | `data-testid` | `"progress-bar"` |
| Fill bar (line) | `role` | `"progress-fill"` |
| SVG (circle) | `role` | `"img"` |
| Progress circle (circle) | `role` | `"progress-circle"` |
| Outer container (circle) | `data-testid` | `"progress-container"` |

### Additional ARIA Support

The component spreads rest props onto the container, so consumers can add standard ARIA attributes:

```tsx
<ProgressBar
  value={50}
  max={100}
  aria-label="Upload progress"
  aria-valuenow={50}
  aria-valuemin={0}
  aria-valuemax={100}
/>
```

### Ref Forwarding

The component forwards a `ref` to the outer container `<div>` element for both variants.

### Recommendations

- Provide `aria-label` or `aria-labelledby` to describe what progress is being tracked.
- Consider adding `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` for screen reader support, since these are not automatically set by the component.

## Performance Best Practices

### Rendering Optimization
- **Memoize the component** — Wrap in `React.memo`. Progress bars often appear in lists or dashboards where parent re-renders are frequent but progress values change infrequently.
- **Module-level config maps** — All size/color configuration maps (`lineHeightMap`, `fillColorMap`, `circleDefaults`, etc.) should be defined at module scope, not inside the component.
- **Avoid unnecessary SVG recalculations** — For the circle variant, memoize `circumference` and `dashOffset` computations via `useMemo` keyed on `value`, `max`, `radius`, and `strokeWidth`.

### Animation Performance
- **CSS transitions for line variant** — Use `transition-all duration-300 ease-in-out` on the fill bar. CSS transitions run on the compositor thread and don't block the main thread.
- **No JS animation for circle variant** — SVG `strokeDashoffset` changes are handled by the browser's layout engine. Don't use JavaScript animation libraries for progress ring updates.
- **Batch rapid updates** — If progress updates arrive faster than the transition duration (300ms), the CSS transition will naturally interpolate to the latest value. No debouncing needed.

### SVG Optimization
- **Single SVG render** — The circle variant uses two `<circle>` elements in one SVG. This is more efficient than separate SVG elements for track and fill.
- **Avoid dynamic viewBox** — Compute viewBox dimensions from props and set them as attributes, not inline style. This avoids layout thrashing.
- **`strokeLinecap="round"`** — Applied only to the progress circle, not the background track. This keeps the visual consistent without doubling the cap rendering cost.

### Scalability Considerations
- **Custom max value** — Support `max` prop for non-percentage scales (e.g., bytes uploaded out of total). The component normalizes to percentage internally.
- **Rest props spreading** — Spread remaining HTML attributes onto the container so consumers can add `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-label` for accessibility.
- **Custom circle dimensions** — Accept `circleRadius` and `strokeWidth` overrides for non-standard sizes without adding new size variants.
