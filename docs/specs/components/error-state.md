# ErrorState

## Overview

Displayed when content fails to load due to a network error, server error, or application exception. Provides context about what went wrong and recovery options (retry, go back, contact support). Shares layout structure with EmptyState but focuses on error communication and recovery flows.

## Anatomy

```
+------------------------------------------------+
|                                                |
|         [Error Illustration / Icon]            |
|                                                |
|         [Error Title]                          |
|         [Error Description]                    |
|                                                |
|         [Retry Button]                         |
|         [Optional Secondary: "Go back"]        |
|                                                |
+------------------------------------------------+
```

### Parts

| Part | Required | Description |
|------|----------|-------------|
| Error Illustration/Icon | Yes | Visual indicator of the error type |
| Error Title | Yes | Short, clear headline describing the error |
| Error Description | Yes | Helpful explanation and guidance |
| Primary Action (Retry) | Yes | Main recovery action button |
| Secondary Action | No | Alternative recovery path |

## Variants

| Variant | Icon/Illustration | Title | Description |
|---------|-------------------|-------|-------------|
| **Generic error** | Alert triangle (`warning-50`) | "Something went wrong" | "We couldn't load this content. Please try again." |
| **Network error** | Wifi-off icon (`subdued-1`) | "No internet connection" | "Check your connection and try again." |
| **Server error (500)** | Server crash illustration | "Server error" | "Our servers are having issues. Please try again later." |
| **Not found (404)** | Search-off illustration | "Page not found" | "The page you're looking for doesn't exist." |
| **Timeout** | Clock icon (`subdued-1`) | "Request timed out" | "The server took too long to respond." |
| **Permission (403)** | Lock icon (`subdued-1`) | "Access denied" | "You don't have permission to view this." |

## Sizes

| Size | Illustration | Title Font | Description Font | Max Width | Container Padding |
|------|-------------|------------|-----------------|-----------|-------------------|
| S | 80px | Heading M (14px/600) | Body S (12px/400) | 280px | 24px V, 16px H |
| M | 120px | Heading L (16px/600) | Body M (14px/400) | 360px | 48px V, 24px H |
| L | 160px | Heading XL (20px/600) | Body L (16px/400) | 440px | 48px V, 24px H |

## Visual Specifications

| Element | Spec |
|---------|------|
| Layout | Centered, vertically stacked (same as EmptyState) |
| Illustration-to-title gap | `24px` |
| Title-to-description gap | `8px` |
| Description-to-action gap | `24px` |
| Error icon color | `error-50` (for error states) or `warning-50` (for recoverable) |
| Max width | `400px` |
| Container padding | `48px` vertical |
| Text alignment | Center |

## Display Modes

### Inline vs. Full-Page

| Mode | Usage | Size | Background |
|------|-------|------|------------|
| **Inline** | Replaces a card or section that failed to load | S | transparent |
| **Full-page** | Replaces entire page content | M or L | `surface-10` |
| **Component-level** | Small error inside a component (e.g., failed chart) | S | transparent, compact layout |

## Action Buttons

| Action | Button Spec |
|--------|-------------|
| Retry | Button, Primary kind, size M, label "Try again" |
| Go back | Button, Tertiary kind, size M, label "Go back" |
| Refresh page | Button, Secondary kind, size M, label "Refresh page" |
| Contact support | Tertiary link, opens support channel |

## Retry Behavior

1. **On retry click:** Show Spinner (size M) replacing the error state
2. **If retry fails again:** Show error state with updated message: *"Still having trouble. Please try again later."*
3. **After 3 retries:** Show "Contact support" instead of "Try again" (exponential backoff hint)

## States

| State | Description |
|-------|-------------|
| **Error displayed** | Default error state with illustration, title, description, and action buttons |
| **Retrying** | Spinner M replaces error state content while retry is in progress |
| **Retry failed** | Updated error message after subsequent failures |
| **Exhausted retries** | After 3 failed retries, shows "Contact support" link instead of retry button |

## Design Tokens

| Token | Usage |
|-------|-------|
| `--error-50` | Error icon/illustration accent color |
| `--warning-50` | Warning/recoverable icon color |
| `--text-default` | Title text color |
| `--subdued-1` | Description text color, decorative icon color |
| `--subdued-2` | Disabled state text |
| `--surface-10` | Full-page error background |
| `--surface-0` | Inline error background (transparent) |
| `--primary-50` | Primary retry button background |
| `--primary-60` | Tertiary button/link color |
| `--font-size-m` (14px) | Body M description text |
| `--font-size-l` (16px) | Heading L title |
| `--font-weight-semibold` (600) | Title weight |
| `--font-weight-regular` (400) | Description weight |
| `--space-8` | Title-to-description gap |
| `--space-24` | Illustration-to-title gap, description-to-action gap |
| `--space-48` | Container vertical padding |

## Accessibility

| Attribute | Value | Notes |
|-----------|-------|-------|
| `role` | `"alert"` | For dynamic errors (content that was previously visible) |
| `role` | `"status"` | For initial load failures |
| Error icon | `aria-hidden="true"` | Decorative -- message conveys meaning |
| Retry button | `aria-label="Retry loading content"` | Clear action description |
| Live region | Auto-announce | Error state announced by screen readers |

### Keyboard

| Key | Action |
|-----|--------|
| `Tab` | Focus moves to retry button |
| `Enter` / `Space` | Activates retry button |
| `Shift+Tab` | Focus moves to secondary action (if present) |

## Performance Best Practices

### Rendering Optimization
- **Memoize variant defaults** — The `VARIANT_DEFAULTS` map (icon, title, description per variant) should be a module-level constant, not recreated on every render.
- **Stable retry handler** — The `onRetry` callback should use `useCallback` in the parent. It is passed to the retry button and used in the `useRetry` hook.
- **Conditional spinner rendering** — Render the Spinner component only during retry, not hidden via CSS. This avoids keeping the spinner's animation running when invisible.

### Retry Logic
- **Exponential backoff** — The `useRetry` hook should support optional exponential backoff delays between retries to avoid hammering a failing server.
- **AbortController integration** — Cancel in-flight retry requests when the component unmounts or when a new retry supersedes the previous one.
- **Retry count persistence** — Store retry count in a ref-backed state so it survives across parent re-renders without resetting.

### Scalability Considerations
- **Composable with EmptyState** — ErrorState should compose on top of EmptyState's layout primitives, sharing the same icon/title/description/actions structure.
- **Dynamic content based on retry state** — Title and description should update after failed retries and after exhaustion, providing progressive disclosure of recovery options.
- **Display mode flexibility** — Support inline, full-page, and component-level display modes via a single `displayMode` prop rather than separate components.
- **ARIA role selection** — Use `role="alert"` for dynamic errors (content that was previously visible) and `role="status"` for initial load failures. Expose this as a prop.
