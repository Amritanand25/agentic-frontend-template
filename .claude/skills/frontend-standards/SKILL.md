---
name: frontend-standards
description: Accessibility (WCAG 2.1 AA), logging, and monitoring. Use when creating components with user interactions.
allowed-tools: Read Grep Glob
paths:
  - "apps/**/*.tsx"
  - "packages/ui/**/*.tsx"
---

# Frontend Standards

## Accessibility (WCAG 2.1 AA)

### Requirements

- Text contrast: 4.5:1 min (3:1 for 18px+)
- Touch targets: 44x44px minimum
- All functionality via keyboard
- Focus visible: 4px ring primary-60, `:focus-visible` only

### Semantic HTML

Use `<button>` not `<div onClick>`, `<a href>` not `<span onClick>`, `<nav>`, `<main>`, `<header>`, `<footer>`.

### ARIA Essentials

- Icon-only buttons: `aria-label="Close dialog"`
- Expanded: `aria-expanded={open}`, `aria-haspopup="listbox"`
- Selected: `aria-selected={isActive}`
- Invalid input: `aria-invalid={!!error}`, `aria-describedby="error-id"`
- Loading: `<div role="status" aria-live="polite">`
- Errors: `<span role="alert">`
- Decorative images: `alt="" role="presentation"`

### Keyboard Patterns

- **Dropdown/Menu:** Enter/Space=open, Escape=close, ArrowDown/Up=navigate
- **Modal:** Focus trap, Escape=close, restore focus on close
- **Tabs:** ArrowLeft/Right=switch, Tab=into panel

### Skip Links

```tsx
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

## Logging

### Structured Logger

Log as JSON: `{ level, message, timestamp, environment, ...meta }`

- `logger.info('User logged in', { userId })`
- `logger.error('API failed', error, { endpoint })`
- `logger.warn('Slow response', { duration })`
- Never log passwords, tokens, or PII

### Error Boundaries

Wrap data-heavy components. Log `componentStack` on catch. Show fallback UI with retry button.

### Screen Reader Announcements

`aria-live="polite"` for status updates, `aria-live="assertive"` for errors.
