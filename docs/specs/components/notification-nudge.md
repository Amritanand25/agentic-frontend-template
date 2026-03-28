# NotificationNudge

## Overview

A flexible, imperative notification (toast/nudge) system for displaying non-intrusive, temporary messages to the user. Built on top of the [sonner](https://sonner.emilkowal.dev/) toast library, it provides a `notify()` function and a `notifyPromise()` helper for promise-based workflows. Notifications support multiple variants, positioning, auto-dismiss with progress bar, hover-to-pause, action buttons, and stackable/non-stackable behavior.

The system consists of three parts:
1. **`NotificationProvider`** -- a React component that must wrap your app (renders `<Toaster>`).
2. **`notify()`** -- an imperative function that triggers a notification toast.
3. **`notifyPromise()`** -- an imperative function that binds a Promise to loading/success/error notification states.

## Anatomy

```
+--------------------------------------------------------------+
|  [Icon]  Title text                                  [Close]  |
|          Description text (optional)                          |
|                                                               |
|                        [Secondary CTA]  [Primary CTA]         |
|  [===========  Progress Bar  =============]                   |
+--------------------------------------------------------------+
```

**Parts:**
- **Icon** -- Variant-specific icon (info, success, error, loading spinner) or a custom icon.
- **Title** -- Required main text, single line, truncated on overflow.
- **Description** -- Optional secondary text below the title, supports multi-line (`whitespace-pre-wrap`).
- **Close button** -- An `IconButton` (X icon) always visible in the top-right area.
- **Action buttons** -- Optional primary and secondary `Button` components, right-aligned.
- **Progress bar** -- Optional animated bar at the bottom showing remaining auto-dismiss time.

## Props / API

### `NotificationOptions` (passed to `notify()`)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | -- (required) | Main title text displayed on the notification. |
| `description` | `string` | `undefined` | Optional additional detail shown below the title. |
| `variant` | `"info" \| "success" \| "error" \| "loading"` | `"info"` | Visual style/type of the notification. Determines background color and default icon. |
| `position` | `"top-left" \| "top-center" \| "top-right" \| "bottom-left" \| "bottom-center" \| "bottom-right"` | `"top-right"` | Screen position where the notification appears. |
| `duration` | `number \| null` | `5000` | Duration in milliseconds before auto-dismiss. Set to `null` to disable auto-dismiss (manual mode). |
| `showProgressBar` | `boolean` | `false` | If `true`, displays an animated progress bar indicating remaining time before auto-dismiss. Only visible when `duration` is not `null`. |
| `showActions` | `boolean` | `false` | If `true`, renders action buttons (primary and/or secondary) when configured. |
| `primaryAction` | `{ label: string; onClick: () => void; className?: string; style?: React.CSSProperties }` | `undefined` | Configuration for the primary action button. |
| `secondaryAction` | `{ label: string; onClick: () => void; className?: string; style?: React.CSSProperties }` | `undefined` | Configuration for the secondary action button. |
| `customIcon` | `React.ReactNode` | `undefined` | Custom React node to override the default variant icon. |
| `stackable` | `boolean` | `true` | If `false`, only one notification is shown at a time; triggering a new one dismisses the previous. |
| `onClose` | `() => void` | `undefined` | Callback executed when the notification is dismissed (manually or automatically). |
| `className` | `string` | `undefined` | Additional CSS class names applied to the notification container. |
| `style` | `React.CSSProperties` | `undefined` | Inline CSS styles applied to the notification container. |
| `iconStyle` | `React.CSSProperties` | `undefined` | Inline CSS styles applied to the notification icon. |
| `loading` | `boolean` | `false` | Internal flag used by the loading variant. |

### `NotificationToastProps` (direct component usage)

All the props above (except `position` and `stackable`) plus standard `React.HTMLAttributes<HTMLDivElement>`. The component also accepts a forwarded `ref`.

### `NotificationProviderProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | `undefined` | Application content to wrap. |

### `notifyPromise<T>()` Options

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | `string` | -- (required) | Message displayed during the loading state. |
| `success` | `string \| ((data: T) => string)` | -- (required) | Message or function returning a message for the success state. |
| `error` | `string \| ((err: unknown) => string)` | -- (required) | Message or function returning a message for the error state. |

Plus all optional properties from `NotificationOptions` except `loading`, `variant`, and `title` (which are managed internally).

## Variants

| Variant | Background Color | Default Icon | Description |
|---------|-----------------|--------------|-------------|
| `info` (default) | `var(--gd-neutral-grey-100)` | `IcInfo` (primary-50 color) | General informational notification. |
| `success` | `var(--gd-feedback-success-80)` | `IcSuccessColored` | Confirms a successful operation. |
| `error` | `var(--gd-feedback-error-80)` | `IcErrorColored` | Indicates an error or failure. |
| `loading` | `var(--gd-neutral-grey-100)` | `Spinner` component | Shows an in-progress state with a spinner. |

## Sizes

The notification has a fixed sizing model:

| Property | Value |
|----------|-------|
| Min width | `328px` |
| Max width | `380px` |
| Padding | `12px` (`p-gd-12`) |
| Border radius | `12px` |
| Icon size | `24px` |
| Close icon size | `16px` |
| Gap (content) | `8px` (`gap-gd-8`) |
| Gap (title-description) | `2px` (`gap-gd-2`) |
| Gap (actions) | `12px` (`gap-gd-12`) |
| Progress bar height | `4px` (`h-gd-4`) |

## States

| State | Description |
|-------|-------------|
| **Default** | Notification is visible and the auto-dismiss timer is counting down. |
| **Hovered** | Timer is paused and progress bar freezes. Timer resumes on mouse leave. |
| **Manual mode** | When `duration` is `null`, the notification persists until explicitly dismissed. |
| **Loading** | Spinner is shown as the icon; used with `notifyPromise` for async operations. |
| **Dismissed** | Notification is removed from the DOM via `toast.dismiss()`. |
| **Non-stackable** | When `stackable` is `false`, a new notification replaces the existing one. |

## Design Tokens

| Token | Usage |
|-------|-------|
| `--gd-neutral-grey-100` | Background for `info` and `loading` variants. |
| `--gd-feedback-success-80` | Background for `success` variant. |
| `--gd-feedback-error-80` | Background for `error` variant. |
| `--gd-neutral-grey-10` | Title text color; progress bar color. |
| `--gd-neutral-grey-40` | Description text color. |
| `--gd-primary-50` | Info icon color. |
| `--gd-shadow-m` | Box shadow applied to the notification container. |
| `--gd-background-surface-0` | Recommended background surface for the provider context. |

**Typography tokens:**
- Title: `text-en-desktop-body-m-prominent`
- Description: `text-en-desktop-body-s`

**Action button styling:**
- Primary button: `background-color: rgba(255, 255, 255, 0.9)`, `color: #141414`
- Secondary button: `background-color: transparent`, `border-color: rgba(255, 255, 255, 0.5)`, white text

## Accessibility

| Attribute | Value | Description |
|-----------|-------|-------------|
| `role` | `"alert"` | Applied to the notification container for screen reader announcements. |
| Keyboard | Close button is focusable and interactive. | Users can tab to the close button and action buttons. |
| Hover pause | `onMouseEnter` / `onMouseLeave` | Auto-dismiss timer pauses on hover to give users time to read. |
| Screen position | Configurable via `position` prop | Supports all six standard positions for toast placement. |

## Performance Best Practices

### Timer Performance
- **Use `setInterval` for progress bar, not `requestAnimationFrame`** — The progress bar updates every 50ms, which is sufficient for visual smoothness. RAF would run at 60fps (16ms), causing unnecessary state updates.
- **Ref-based timer state** — Store `startTime`, `remaining`, and `intervalRef` in refs, not state. Only `progress` (the visual percentage) needs to be in state. This minimizes re-renders during countdown.
- **Clean up timers** — Always clear the interval on unmount and when transitioning between pause/resume states. Leaked timers cause memory leaks and stale state updates.

### Rendering Optimization
- **Memoize toast component** — The `NotificationToast` component should be `React.memo`'d. When multiple toasts are stacked, updating one toast's progress should not re-render others.
- **Stable variant maps** — `variantBackgroundMap` and `variantIconMap` should be module-level constants, not recreated per render.
- **Portal rendering** — Sonner renders toasts into a portal at document body level. This avoids triggering re-renders in the application component tree when toasts appear/disappear.

### Scalability Considerations
- **Imperative API** — `notify()` and `notifyPromise()` are plain functions, not hooks. They work anywhere in the codebase without React context, making them suitable for use in event handlers, async callbacks, and non-React code.
- **Non-stackable mode** — Support single-toast mode for scenarios where only one notification should be visible at a time. Track `lastToastId` at module level for efficient dismissal.
- **Controlled duration** — Pass `duration: Infinity` to sonner and manage auto-dismiss internally. This gives full control over pause/resume behavior and progress bar synchronization.
- **Promise integration** — `notifyPromise` binds loading/success/error states to a Promise lifecycle, eliminating boilerplate for async operation feedback.
