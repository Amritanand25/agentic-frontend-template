---
name: api-integration
description: TanStack Query + Axios API integration with caching, interceptors, and optimistic updates. Use for API calls, data fetching, and mutations.
---

# API Integration

## Axios Instances

- **AuthInstance** — adds Bearer token + X-Tenant-ID, handles 401 refresh/403/429
- **GeneralInstance** — no auth/tenant (login, signup, public)

> See [references/basic-api-setup.md](./references/basic-api-setup.md)

## Cache Times

| Data Type       | Stale Time       |
| --------------- | ---------------- |
| Static content  | 60 min           |
| User profile    | 30 min           |
| List data       | 15 min (default) |
| Dashboard stats | 5 min            |
| Search results  | 5 min            |
| Real-time       | 0                |

**Defaults:** staleTime=15min, gcTime=30min, retry=2, refetchOnWindowFocus=false

## Structure

```
features/{name}/
├── api/       # API functions
├── hooks/     # useQuery + useMutation hooks
└── index.ts   # Public exports
```

## Query Keys

`['users']` → `['users', id]` → `['users', { status }]` → `['posts', id, 'comments']`

## Optimistic Updates

1. Cancel outgoing queries → 2. Snapshot previous → 3. Update cache → 4. Return snapshot → 5. Rollback on error → 6. Refetch on settled

> See [references/optimistic-updates.md](./references/optimistic-updates.md)

## Checklist

- [ ] AuthInstance + GeneralInstance configured
- [ ] Interceptors: token, X-Tenant-ID, 401/403/429
- [ ] Query hooks with staleTime per data type
- [ ] Mutations invalidate related queries
- [ ] Search: debounce 300ms + AbortSignal
- [ ] Tests with MSW mocks
