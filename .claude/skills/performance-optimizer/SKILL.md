---
name: performance-optimizer
description: React performance optimization — code splitting, bundle size, caching, virtualization, React 19 patterns. Use when building features or before deployment.
---

# Performance Optimizer

## Targets

| Metric           | Target  |
| ---------------- | ------- |
| FCP              | < 1.5s  |
| TTI              | < 3.5s  |
| LCP              | < 2.5s  |
| CLS              | < 0.1   |
| Bundle (gzipped) | < 200KB |
| Route chunks     | < 100KB |
| Lighthouse       | > 90    |

## Checklist

- [ ] All routes: `React.lazy` + `<Suspense fallback={<Skeleton />}>`
- [ ] Heavy components lazy-loaded (charts, editors, maps)
- [ ] Vite `manualChunks`: react-vendor, ui-vendor, charts, forms, data
- [ ] Lists >100 items: `@tanstack/react-virtual`
- [ ] API cached: TanStack Query (15-30 min staleTime)
- [ ] Search inputs debounced (300ms)
- [ ] Images: `loading="lazy"`, WebP/AVIF with fallback
- [ ] Named imports only (tree-shake: `import { User } from 'lucide-react'`)
- [ ] Prefetch routes on hover: `onMouseEnter={() => import('./pages/settings')}`

## React 19

- Trust compiler — minimize manual `useMemo`/`useCallback`
- Only memo expensive operations (>100ms)
- `use()` for async data, `useTransition` for non-urgent updates, `useActionState` for forms

## Analysis

```bash
yarn build && yarn analyze
```
