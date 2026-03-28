# StepperFlow

## Overview

StepperFlow is an interactivity component that renders a configurable multi-step workflow indicator. It composes lower-level stepper primitives (`Stepper`, `StepperItem`, `StepperTrigger`, `StepperIndicator`, `StepperSeparator`, `StepperTitle`, `StepperDescription`) into a ready-to-use step-by-step flow layout. It supports horizontal and vertical orientations, custom icons, custom text labels, step states, dotted separators, per-step divider colors, and configurable indicator sizes.

## Anatomy

```
StepperFlow
  └─ Stepper (root, provides context for active step & orientation)
       └─ StepperItem (per step, provides step context)
            ├─ StepperTrigger (clickable button wrapping the step content)
            │    ├─ StepperIndicator (circular icon/text badge)
            │    ├─ StepperSeparator (line or dotted divider to next step)
            │    ├─ StepperTitle (step heading)
            │    └─ StepperDescription (step sub-text)
```

### Horizontal layout

```
[Indicator] ── Separator ── [Indicator] ── Separator ── [Indicator]
  Title                       Title                       Title
  Description                 Description                 Description
```

### Vertical layout

```
[Indicator]  Title
  │          Description
  │
[Indicator]  Title
  │          Description
  │
[Indicator]  Title
             Description
```

## Props / API

### StepperFlowProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `StepConfig[]` | **required** | Array of step configuration objects. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout direction of the stepper. |
| `defaultValue` | `number` | `0` | Default active step index (zero-based, uncontrolled mode). |
| `value` | `number` | `undefined` | Controlled active step index (zero-based). |
| `borderedIcon` | `boolean` | `true` | Whether to render a border around the step indicator circle. When `false`, gaps between indicator and content are reduced. |
| `onValueChange` | `(value: number) => void` | `undefined` | Callback invoked when the active step changes. |
| `showStepContent` | `boolean` | `undefined` | Whether to show additional step content. |
| `className` | `string` | `""` | Additional CSS class for the root `Stepper` container. |
| `stepClassName` | `string` | `""` | Additional CSS class applied to each `StepperItem`. |
| `triggerClassName` | `string` | `""` | Additional CSS class applied to each `StepperTrigger`. |
| `contentClassName` | `string` | `undefined` | Additional CSS class for step content areas. |
| `dottedSeparator` | `boolean` | `false` | When `true`, separators render as dotted lines instead of solid lines. |
| `indicatorSize` | `number \| string` | `undefined` | Global indicator size applied to all steps (e.g., `"40px"`, `24`, `"2.5rem"`). When not provided, defaults to the 32px set by `size-gd-32`. |

### StepConfig

Extends `StepperItemProps` (with `title` overridden to accept `ReactNode`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `step` | `number` | **required** | Numeric identifier for the step. |
| `title` | `string \| ReactNode` | **required** | Step heading content. |
| `description` | `ReactNode` | `undefined` | Description text or rich content rendered below the title. |
| `stepState` | `StepState` | `undefined` | Visual/semantic state of the step. See States section. |
| `completed` | `boolean` | `undefined` | Marks the step as completed. |
| `disabled` | `boolean` | `false` | Disables the step, preventing interaction. |
| `loading` | `boolean` | `false` | Shows a spinning loader icon in the indicator instead of the state icon. |
| `descriptionStyle` | `React.CSSProperties` | `undefined` | Inline styles applied to the description element. |
| `stepIcon` | `React.ReactNode` | `undefined` | Custom icon to render inside the indicator, overriding the default state-based icon. |
| `stepText` | `string` | `undefined` | Custom text to render inside the indicator (e.g., "A", "B", "1"). |
| `stepIconStyle` | `React.CSSProperties` | `undefined` | Inline styles for the step icon container. |
| `dividerColor` | `string` | `undefined` | Custom color for the separator line following this step (CSS color value). |
| `indicatorSize` | `number \| string` | `undefined` | Per-step override for indicator size. Takes precedence over the global `indicatorSize` prop. |

### StepState (type)

```tsx
type StepState =
  | "active"
  | "completed"
  | "inactive"
  | "loading"
  | "current"
  | "disabled"
  | "error"
  | "upcoming";
```

## Variants

| Variant | Description |
|---------|-------------|
| **Bordered (default)** | Step indicators have a visible border around the circle (`borderedIcon: true`). |
| **Borderless** | Step indicators have no border, tighter spacing (`borderedIcon: false`). |
| **Solid separator** | Default separator style -- a solid 2px line between steps. |
| **Dotted separator** | Separator renders as a 2px dotted border (`dottedSeparator: true`). |

## Sizes

The indicator circle defaults to 32px (`size-gd-32`). This can be overridden globally via the `indicatorSize` prop or per-step via `StepConfig.indicatorSize`.

| Indicator Size | Description |
|----------------|-------------|
| Default (32px) | Standard indicator size when no `indicatorSize` is specified. |
| Custom | Any CSS size value passed to `indicatorSize`, e.g., `"24px"`, `"40px"`, `48`, `"3rem"`. |

## States

### Step states (via `stepState`)

| State | Background Color | Border Style | Icon |
|-------|-----------------|-------------- |------|
| `completed` | `bg-color-feedback-success-20` | `1px solid var(--gd-feedback-success-50)` | Checkmark icon |
| `current` | `bg-color-feedback-success-50` | none | Default step icon |
| `error` | `bg-color-feedback-error-20` | `1px solid var(--gd-feedback-error-50)` | Exclamation icon |
| `upcoming` | `bg-[var(--gd-background-surface-0)]` | `1px solid var(--gd-neutral-grey-60)` | Default step icon |
| `active` | `bg-[var(--gd-background-surface-0)]` | `1px solid var(--gd-neutral-grey-60)` | Default step icon |
| `inactive` | `bg-[var(--gd-background-surface-0)]` | `1px solid var(--gd-neutral-grey-60)` | Default step icon |
| `disabled` | `bg-[var(--gd-background-surface-0)]` | `1px solid var(--gd-neutral-grey-60)` | Default step icon |
| `loading` | `bg-[var(--gd-background-surface-0)]` | `1px solid var(--gd-neutral-grey-60)` | Animated spinner icon |

### Interaction states

| State | Description |
|-------|-------------|
| **Default** | Step is clickable and idle. |
| **Disabled** | Step button is disabled, pointer events are blocked, opacity reduced to 50%. |
| **Focus-visible** | Focus ring appears around the trigger button on keyboard navigation (3px ring). |
| **Loading** | Spinning loader icon replaces the state icon in the indicator. Active only when `loading: true` and the step is the current active step. |

## Design Tokens

| Token | Usage |
|-------|-------|
| `--gd-neutral-grey-40` | Default separator/divider color |
| `--gd-neutral-grey-60` | Border color for upcoming/inactive/disabled indicators |
| `--gd-feedback-success-50` | Border for completed indicator, background for current indicator |
| `--gd-feedback-success-20` | Background for completed indicator (via Tailwind utility) |
| `--gd-feedback-error-50` | Border for error indicator |
| `--gd-feedback-error-20` | Background for error indicator (via Tailwind utility) |
| `--gd-background-surface-0` | Background for non-active indicators |
| `--gd-background-surface-10` | Surface background for rich content areas |
| `--gd-text-default` | Default text and icon color |
| `--gd-text-subdued-1` | Subdued/secondary text color |

### Spacing tokens (Tailwind utilities)

| Utility | Usage |
|---------|-------|
| `gap-gd-8` | Root stepper gap between steps |
| `gap-gd-16` | Gap between indicator and content (vertical, bordered) |
| `gap-gd-12` | Gap between indicator and content (horizontal, bordered) |
| `gap-gd-4` | Gap between title and description (horizontal) |
| `gap-gd-2` | Reduced gap when `borderedIcon: false` |
| `pb-gd-16` | Bottom padding on vertical description |
| `size-gd-32` | Default indicator width/height |

## Accessibility

- **Semantic structure**: Steps are rendered with `<button>` elements (`StepperTrigger`), making them focusable and keyboard-accessible.
- **`data-state` attribute**: Each `StepperItem` exposes its current state via `data-state` for programmatic access and CSS styling.
- **`data-orientation` attribute**: The root `Stepper` element exposes `data-orientation` for orientation-aware styling.
- **`data-loading` attribute**: Steps in a loading state expose `data-loading="true"`.
- **`aria-hidden`**: The loading spinner icon sets `aria-hidden="true"` to prevent screen readers from announcing the decorative animation.
- **Disabled state**: Disabled steps set the `disabled` attribute on the button, which prevents focus and pointer events and applies `opacity: 50%`.
- **Focus indicators**: `focus-visible` styles apply a visible ring around the trigger for keyboard navigation.
- **Keyboard interaction**: Steps can be navigated and activated using standard keyboard controls (Tab to move focus, Enter/Space to activate).

## Performance Best Practices

### Rendering Optimization
- **Context splitting** — Split stepper context into static config (orientation, size, variant) and dynamic state (activeStep). Steps only subscribe to the context they need.
- **Memoize primitives** — `StepperIndicator`, `StepperSeparator`, `StepperTitle`, and `StepperDescription` should all be `React.memo`'d since they are render-heavy components with mostly static props.
- **Stable step handlers** — `onStepChange` callbacks should use `useCallback` to prevent re-renders propagating through the compound component tree.

### Animation Performance
- **CSS-only separator animation** — Separator fill transitions should use CSS `transition` on the progress element. Avoid JavaScript-driven animation for connector lines.
- **Lazy icon rendering** — Only import and render step icons when the step is visible. For long flows with 10+ steps, off-screen steps should use placeholder indicators.

### Scalability Considerations
- **Compound component API** — Export individual primitives (`Stepper`, `StepperItem`, `StepperTrigger`, `StepperIndicator`, `StepperSeparator`, `StepperTitle`, `StepperDescription`) for maximum composition flexibility.
- **Horizontal and vertical** — Support both orientations via a single `orientation` prop that flows through context to all children.
- **Custom step states** — Support extensible step states (active, completed, error, loading, disabled, upcoming) via a union type, allowing consumers to drive complex workflows.
