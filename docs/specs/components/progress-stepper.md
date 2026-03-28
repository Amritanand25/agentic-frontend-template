# ProgressStepper

## Overview

ProgressStepper is a feedback component that displays a multi-step process with progress indicators. Each step can show its completion status via colored icons (success, warning, error) or a circular progress bar for in-progress steps. It is built on top of a set of composable stepper primitives (`Stepper`, `StepperItem`, `StepperIndicator`, `StepperSeparator`, `StepperTitle`, `StepperDescription`, `StepperTrigger`) and an intermediate `StepperFlow` layout component. It adds progress-tracking semantics including status-based divider coloring and per-step circular progress indicators.

## Anatomy

```
ProgressStepper
  └─ StepperFlow (borderedIcon=false)
       └─ StepperItem (per step)
            ├─ StepperIndicator
            │    └─ Status Icon (SuccessIcon | WarningIcon | ErrorIcon)
            │       OR CircularProgressBar (circular SVG progress indicator)
            ├─ StepperSeparator (colored divider between steps)
            ├─ StepperTitle (step title wrapped in styled span)
            └─ StepperDescription (step description wrapped in styled span)
```

## Props / API

### ProgressStepperProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `ProgressStepConfig[]` | **required** | Array of step configuration objects defining each step's content, status, and progress. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout direction of the stepper. |
| `defaultValue` | `number` | `0` | The default active step index (zero-based, uncontrolled). |
| `value` | `number` | `undefined` | The controlled active step index (zero-based). |
| `size` | `"sm" \| "md"` | `"md"` | Controls the size of step indicators, progress circles, and typography. |
| `onValueChange` | `(value: number) => void` | `undefined` | Callback invoked when the active step changes. |
| `showStepContent` | `boolean` | `undefined` | Whether to show additional step content panels. |
| `className` | `string` | `""` | Additional CSS class for the root stepper container. |
| `stepClassName` | `string` | `""` | Additional CSS class applied to each step item. |
| `triggerClassName` | `string` | `""` | Additional CSS class applied to each step trigger button. |
| `contentClassName` | `string` | `undefined` | Additional CSS class for step content panels. |
| `variant` | `"default" \| "progress"` | `undefined` | Visual variant of the stepper. |
| `circleStrokeWidth` | `number` | `2` | Default stroke width (in pixels) for the circular progress indicator. Can be overridden per-step via `progress.strokeWidth`. |

### ProgressStepConfig

Extends `StepConfig` from the StepperFlow layer.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `step` | `number` | **required** | Numeric identifier for the step. |
| `title` | `string \| ReactNode` | **required** | Title text displayed for the step. |
| `description` | `ReactNode` | `undefined` | Description content rendered below the title. |
| `status` | `ProgressType` (`"success" \| "warning" \| "error" \| "default"`) | `undefined` | Determines the status icon and divider color. When `"default"`, a circular progress bar is shown instead of a status icon. |
| `progress` | `ProgressData` | `undefined` | Progress bar configuration for steps with `status: "default"`. |
| `disabled` | `boolean` | `false` | Whether the step is disabled and non-interactive. |
| `completed` | `boolean` | `undefined` | Whether the step is marked as completed. |
| `loading` | `boolean` | `undefined` | Whether the step shows a loading spinner. |

### ProgressData

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `percentage` | `number` | **required** | Progress value from 0 to 100. |
| `type` | `ProgressType` | `undefined` | Color type for the progress circle (`"success"`, `"warning"`, `"error"`, `"default"`). |
| `strokeWidth` | `number` | `undefined` | Per-step override for the circle stroke width. Falls back to the component-level `circleStrokeWidth` prop. |

## Variants

| Variant | Description |
|---------|-------------|
| **Default / Progress** | Each step renders either a status icon (for `success`, `warning`, `error`) or a circular progress bar (for `default` status). This is the primary usage pattern. |

## Sizes

| Size | Indicator Size | Circle Radius | Font Class |
|------|---------------|---------------|------------|
| `sm` | 20px | 8px | `text-sm` |
| `md` | 24px | 10px | `text-base` |

## States

### Step-level states (via `status`)

| State | Visual |
|-------|--------|
| `success` | Green success icon, green divider (token `--gd-feedback-success-50`) |
| `warning` | Orange warning icon, orange divider (token `--gd-feedback-warning-50`) |
| `error` | Red error icon, red divider (token `--gd-feedback-error-50`) |
| `default` | Circular progress bar indicator, neutral grey divider (token `--gd-neutral-grey-40`) |

### Interaction states

| State | Description |
|-------|-------------|
| **Active** | The currently selected step, determined by `value` or `defaultValue`. |
| **Disabled** | Step is non-interactive (`disabled: true` on `ProgressStepConfig`). |

## Design Tokens

| Token | Usage |
|-------|-------|
| `--gd-neutral-grey-40` | Default divider/separator color |
| `--gd-feedback-success-50` | Success divider color |
| `--gd-feedback-warning-50` | Warning divider color |
| `--gd-feedback-error-50` | Error divider color |
| `--gd-text-subdued-1` | Description text color |

## Accessibility

- The component renders as interactive `<button>` elements via `StepperTrigger`, providing keyboard focusability.
- `focus-visible` ring styles are applied for keyboard navigation visibility.
- Disabled steps set `disabled` on the underlying button, preventing pointer events and reducing opacity.
- Step titles and descriptions are rendered as semantic text elements for screen reader consumption.
- Each step provides `data-state` attributes conveying current state information.

## Performance Best Practices

### Rendering Optimization
- **Memoize step items** — Each `StepperItem` should be `React.memo`'d. When the active step changes, only the affected steps (previous active and new active) should re-render.
- **Context optimization** — Use separate contexts for frequently-changing values (active step) and rarely-changing values (orientation, size). This prevents all steps from re-rendering when only the active step changes.
- **Stable step configuration** — Define step arrays as module-level constants or memoize them. Passing new array references on every render causes all steps to re-render.

### Animation Performance
- **CSS transitions for connectors** — Animate connector fill progress with CSS `transition` on width/height, not JavaScript. This runs on the compositor thread.
- **Circular progress via SVG** — Step indicators with progress rings should use `strokeDashoffset` CSS, not canvas or JavaScript animation.
- **Respect `prefers-reduced-motion`** — Skip connector animations and step transitions for users who prefer reduced motion.

### Scalability Considerations
- **Compound component pattern** — Use React context to pass stepper state (active step, orientation) to child primitives. This keeps the API composable without prop drilling.
- **Controlled and uncontrolled** — Support both controlled (`activeStep` + `onStepChange`) and uncontrolled (`defaultStep`) patterns.
- **Dynamic step count** — The stepper should handle dynamic addition/removal of steps without layout breakage.
