# SwipeButton

## Overview

The SwipeButton component is a confirmation interaction element that requires the user to swipe (drag) a thumb indicator across a track to confirm an action. It is designed for high-stakes actions where an accidental tap should be prevented. The component transitions through multiple states (idle, confirming, loading, confirmed) and supports async confirmation handlers, custom icons, customizable text for each state, and three visual variants.

## Anatomy

```
+---------------------------------------------------+
| [Thumb]           "Swipe to confirm"               |
|   [Icon]                                           |
+---------------------------------------------------+
```

- **Track** -- The full-width pill-shaped (`rounded-full`) container that serves as the swipe area. Colored according to the selected `variant`.
- **Text Overlay** -- Centered text label that changes based on the current state (idle, confirming, loading, confirmed). Uses `text-en-desktop-body-xl-prominent` typography.
- **Thumb** -- A circular draggable element (`h-10 w-10`) positioned on the left side of the track. The user drags it to the right to trigger confirmation. Changes cursor between `cursor-grab` (idle) and `cursor-grabbing` (dragging).
- **Thumb Icon** -- An icon (`h-gd-24 w-gd-24` container) rendered inside the thumb. Changes based on state: default icon in idle/confirming, loading icon during loading, and confirm icon after confirmation.

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | `""` | HTML `id` attribute applied to the inner button container. |
| `variant` | `"primary" \| "secondary" \| "tertiary"` | `"primary"` | Visual color variant that determines the track background and thumb text colors using theme CSS variables. |
| `style` | `React.CSSProperties` | `{}` | Inline styles merged with width/height and applied to the inner button container. |
| `width` | `string` | `undefined` | Custom width of the button track. Defaults to `296px` via CSS class `w-[296px]`. |
| `height` | `string` | `undefined` | Custom height of the button track. Defaults to `48px` via CSS class `h-[48px]`. |
| `onConfirm` | `() => Promise<void> \| void` | `() => alert("Confirmed")` | Callback fired when the swipe is completed. Can return a Promise for async operations. On success, transitions to "confirmed" state. On rejection, resets to "idle" state. |
| `text` | `string` | `"Swipe to confirm"` | Text displayed in the idle state. |
| `confirmingText` | `string` | `"Confirming"` | Text displayed during the confirming state transition. |
| `confirmedText` | `string` | `"Confirmed"` | Text displayed after successful confirmation. |
| `loadingText` | `string` | `"Processing..."` | Text displayed during the loading state (while `onConfirm` Promise is pending). |
| `disabled` | `boolean` | `false` | When `true`, prevents all interaction, reduces opacity to 30%, sets `cursor-not-allowed`, and sets `tabIndex` to `-1`. |
| `icon` | `React.ReactNode` | Chevron-right icon | Icon rendered inside the thumb during idle and confirming states. |
| `confirmIcon` | `React.ReactNode` | Confirm/check icon | Icon rendered inside the thumb after successful confirmation. |
| `loadingIcon` | `React.ReactNode` | Spinning border div | Icon rendered inside the thumb during the loading state. Defaults to an animated spinner. |
| `className` | `string` | `undefined` | Additional CSS class names appended to the inner button container. |
| `stateText` | `{ confirming?: string; loading?: string; confirmed?: string }` | `undefined` | Alternative text overrides for each state. Takes priority over the individual `confirmingText`, `loadingText`, and `confirmedText` props. |
| `ref` | `React.Ref<HTMLDivElement>` | -- | Forwarded ref to the outermost wrapper `<div>` element. |
| `...props` | `React.HTMLAttributes<HTMLDivElement>` | -- | Additional HTML div attributes spread onto the outermost wrapper element (not the button). |

## Variants

### Primary (default)
- **Track**: `bg-[var(--gd-primary-50)]`, `text-[var(--gd-primary-inverse)]`
- **Thumb**: `bg-[var(--gd-background-surface-0)]`, `text-[var(--gd-primary-50)]`

### Secondary
- **Track**: `bg-[var(--gd-secondary-50)]`, `text-[var(--gd-secondary-inverse)]`
- **Thumb**: `bg-[var(--gd-background-surface-0)]`, `text-[var(--gd-secondary-50)]`

### Tertiary
- **Track**: `bg-[var(--gd-tertiary-50)]`, `text-[var(--gd-tertiary-inverse)]`
- **Thumb**: `bg-[var(--gd-background-surface-0)]`, `text-[var(--gd-tertiary-50)]`

## Sizes

The SwipeButton has a single default size with customizable dimensions:

| Property | Default Value | Customizable Via |
|----------|--------------|------------------|
| Track Width | `296px` (`w-[296px]`) | `width` prop |
| Track Height | `48px` (`h-[48px]`) | `height` prop |
| Track Padding | `4px` (`p-gd-4`) | -- |
| Thumb Diameter | `40px` (`h-10 w-10`) | -- |
| Icon Container | `24x24px` (`h-gd-24 w-gd-24`) | -- |

## States

| State | Description | Visual Treatment | Text Shown |
|-------|-------------|------------------|------------|
| **Idle** | Default resting state. Thumb is at the left edge. | Normal opacity. Thumb has `cursor-grab`. | `text` prop value (default: "Swipe to confirm") |
| **Dragging** | User is actively dragging the thumb. | Thumb follows pointer position (clamped to track bounds). Thumb has `cursor-grabbing`. | `text` prop value |
| **Confirming** | Thumb has reached the end of the track. Brief transitional state before loading begins. | Thumb stays at the right edge. | `stateText.confirming` or `confirmingText` (default: "Confirming") |
| **Loading** | `onConfirm` has been called and its Promise is pending. Minimum 500ms duration enforced. | Track has `opacity-80`. Thumb has `animate-pulse`. Loading icon is shown. | `stateText.loading` or `loadingText` (default: "Processing...") |
| **Confirmed** | `onConfirm` has resolved successfully. | Text has `opacity-50`. Confirm icon is shown in the thumb. | `stateText.confirmed` or `confirmedText` (default: "Confirmed") |
| **Error (reset)** | `onConfirm` Promise rejected. | Resets to idle state. Thumb returns to position 0. | Reverts to `text` prop value |
| **Disabled** | `disabled={true}`. | `opacity-30`, `cursor-not-allowed`. `tabIndex=-1`. `aria-disabled="true"`. No drag or click interactions are processed. | `text` prop value |

### State Machine Flow
```
idle -> (drag to end) -> confirming -> loading -> confirmed
                                         |
                                         v (on error)
                                        idle
```

## Design Tokens

| Token / CSS Variable | Usage |
|---------------------|-------|
| `--gd-primary-50` | Primary variant track background color and thumb text color. |
| `--gd-primary-inverse` | Primary variant track text color. |
| `--gd-secondary-50` | Secondary variant track background color and thumb text color. |
| `--gd-secondary-inverse` | Secondary variant track text color. |
| `--gd-tertiary-50` | Tertiary variant track background color and thumb text color. |
| `--gd-tertiary-inverse` | Tertiary variant track text color. |
| `--gd-background-surface-0` | Thumb background color (all variants). |
| `p-gd-4` | Track inner padding. |
| `h-gd-24`, `w-gd-24` | Icon container dimensions inside the thumb. |
| `text-en-desktop-body-xl-prominent` | Typography class for the button text overlay. |

## Accessibility

### ARIA Attributes
- `role="button"` is set on the inner track container.
- `aria-label` is dynamically set to the current button text (changes with state).
- `aria-disabled` is set to `true` when the `disabled` prop is `true`, `false` otherwise.
- `tabIndex={0}` when enabled, `tabIndex={-1}` when disabled.

### Keyboard Interactions
- **Enter / Space** -- Triggers the `handleTouchStart` handler, initiating the drag state. Note: full swipe completion via keyboard alone requires additional drag simulation; the keyboard primarily initiates the interaction.
- **Tab** -- Standard focus navigation. The button is focusable when not disabled.

### Touch and Pointer Support
- Supports both mouse events (`mousedown`, `mousemove`, `mouseup`) and touch events (`touchstart`, `touchmove`, `touchend`).
- Global event listeners are added to `window` during drag to ensure smooth tracking even when the pointer leaves the button bounds.
- Event listeners are properly cleaned up on unmount and when dragging ends.

### Error Handling
- If `onConfirm` throws or its Promise rejects, the button resets to idle state, allowing the user to retry.
- Multiple confirmations are prevented: once the swipe threshold is reached, the `hasTriggeredConfirm` flag prevents re-triggering during the same drag.

## Performance Best Practices

### Drag Performance
- **Native pointer events** — Use `pointerdown`, `pointermove`, `pointerup` events (not mouse + touch separately). This provides unified input handling with lower overhead.
- **Ref-based drag state** — Store drag position, start position, and drag active flag in refs, not state. Only update state for visual feedback (thumb position percentage) using `requestAnimationFrame` batching.
- **`touch-action: none`** — Set this CSS property on the track to prevent browser scroll interference during drag. This eliminates the 300ms touch delay.
- **`will-change: transform`** — Apply to the thumb element during drag to promote it to a compositor layer for smoother movement.

### State Machine
- **Deterministic transitions** — The state machine (idle → dragging → confirming → loading → confirmed, with error → idle reset) should be implemented as a pure reducer. This makes state transitions predictable and testable.
- **Minimum loading duration** — Enforce a 500ms minimum loading state to prevent flashing. Use `Promise.all` with a timer promise and the actual `onConfirm` promise.

### Scalability Considerations
- **No gesture library dependency** — Implement drag handling with native pointer events to avoid bundling heavy gesture libraries. The interaction is simple enough (1D horizontal drag) to not need one.
- **Async confirmation** — Support async `onConfirm` that returns a Promise. Transition to loading state on drag completion, then to confirmed or error based on the Promise result.
- **Custom icons per state** — Accept icon overrides for each state (idle, loading, confirmed) to support branded or context-specific visuals.
