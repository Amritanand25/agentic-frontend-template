# Frontend Best Practices

> React 19, performance targets, design tokens, security, and testing are in CLAUDE.md and dedicated skills. This file covers patterns NOT covered elsewhere.

## Multi-Tenant / Multi-Org Patterns

**Store initialization (app root):**
Zustand stores (`stores/`) are initialized at app bootstrap. No provider nesting needed — stores are imported directly.

**Org switching:**

- User can belong to multiple orgs
- Org switch = full reset: `useOrgStore.getState().reset()` + clear all queries + reset tenant store
- Persist last-used org: `user-${userId}-lastOrg`

**Tenant switching (within org):**

- Reset tenant store + tenant-scoped queries only, preserve org-level cache
- `useTenantStore.getState().reset()`
- `queryClient.removeQueries({ predicate: q => q.queryKey.includes(oldTenantId) })`

**Feature flags:**

```typescript
// Resolution order: org defaults → tenant overrides → user overrides
export const useFeature = (name: string) =>
  useTenantStore((state) => state.features[name] ?? false);
```

**Scoped storage (persist middleware):**

```typescript
persist(storeCreator, {
  name: `org-${orgId}-tenant-${tenantId}-${storeName}`,
});
```

## PWA Caching Strategies

| Strategy               | Use For                        | Details                         |
| ---------------------- | ------------------------------ | ------------------------------- |
| Cache-First            | Static assets (JS, CSS, fonts) | Long TTL, versioned             |
| Network-First          | API calls                      | 5s timeout, cache fallback      |
| Stale-While-Revalidate | Images, avatars                | Serve cached, refresh bg        |
| No Cache               | Auth, payments                 | `/api/auth/*`, `/api/payment/*` |

**All strategies must set cache limits:**

```typescript
expiration: { maxEntries: 50, maxAgeSeconds: 604800, purgeOnQuotaError: true }
```

## Vite Bundle Splitting

```typescript
manualChunks: {
  'react-vendor': ['react', 'react-dom', 'react-router-dom'],
  'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
  'charts': ['recharts']
}
```

## Error Boundaries

- Wrap each feature section independently (one crash doesn't take down the page)
- Org/tenant context errors → redirect to org/tenant selector
- API 403 → tenant permission error, not generic 403

## React 19 Compiler

- Trust the compiler — reduce manual `useMemo`/`useCallback`
- Only memo operations that take 100ms+ to compute
