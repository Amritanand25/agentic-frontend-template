# Architecture

> Monorepo tree, tech stack, commands, component workflow, and package security are in CLAUDE.md. This file covers architecture patterns only.

## Workspace Packages

| Package          | Name          | Purpose                                | Consumed By           |
| ---------------- | ------------- | -------------------------------------- | --------------------- |
| `packages/ui`    | `@repo/ui`    | All UI components (shadcn/ui + custom) | apps/web, apps/mobile |
| `packages/theme` | `@repo/theme` | CSS design tokens (`tokens.css`)       | apps/web, packages/ui |
| `packages/utils` | `@repo/utils` | `cn()`, shared utilities               | apps/web, packages/ui |

**Dependency flow:** `apps/*` → `packages/*` (never reverse, never between apps)

## Where to Put Code

| Scope                | Location                                 | Rule                                   |
| -------------------- | ---------------------------------------- | -------------------------------------- |
| Shared UI components | `packages/ui/src/`                       | Used across apps                       |
| Design tokens        | `packages/theme/src/`                    | CSS custom properties                  |
| Shared utilities     | `packages/utils/src/`                    | Pure functions only                    |
| Business logic       | `apps/web/src/features/{domain}/`        | Export via index.ts                    |
| Route-specific       | `apps/web/src/pages/{route}/components/` | Never import elsewhere                 |
| Global stores        | `apps/web/src/stores/`                   | Auth, Tenant, Org (Zustand)            |
| React Context        | `apps/web/src/contexts/`                 | Theme, providers, dependency injection |

## Feature + Page Pattern

**Features** = Reusable business logic | **Pages** = Routes that compose features

```
apps/web/src/
├── features/{domain}/
│   ├── api/           # API calls
│   ├── components/    # Domain components
│   ├── hooks/         # Domain hooks
│   ├── store/         # Zustand stores (domain-scoped)
│   ├── types/         # Domain types
│   └── index.ts       # Public API (only export what pages need)
└── pages/{route}/
    ├── index.tsx       # Route entry
    └── components/     # Page-specific only
```

## State Management

| State Type          | Tool            | Scope             | Example                                      |
| ------------------- | --------------- | ----------------- | -------------------------------------------- |
| Server data         | TanStack Query  | Global (cached)   | Users list, posts, API responses             |
| Global client state | Zustand         | Cross-page        | Auth, tenant, org, sidebar, theme preference |
| Page-scoped state   | React Context   | Single page/route | Stepper state, page filters, wizard flow     |
| Compound components | React Context   | Component tree    | Dropdown, accordion, tabs shared state       |
| Form state          | React Hook Form | Single form       | Form inputs, validation                      |

**When to use what:**

- **Zustand** — State that persists across page navigation or is shared between unrelated components
- **React Context** — State scoped to a page or component subtree that resets on unmount
- **TanStack Query** — Anything from the server

**Locations:**

- Global stores: `apps/web/src/stores/` (auth, tenant, org)
- Domain stores: `apps/web/src/features/{domain}/store/`
- Page contexts: `apps/web/src/pages/{route}/contexts/`
- App-level contexts: `apps/web/src/contexts/` (theme provider)

**Zustand rules:**

- One store per domain concern — not one giant store
- Use selectors to prevent unnecessary re-renders: `useStore(state => state.count)`
- Persist tenant/auth stores: `persist` middleware with scoped storage key
- Reset tenant store on tenant switch, auth store on logout

## Multi-Tenant / Multi-Org Hierarchy

```
Organization (org)
└── Tenant (workspace/team)
    └── User (member)
```

- **Org store**: org-level settings, billing, SSO config
- **Tenant store**: workspace config, theme, feature flags, permissions
- **Auth store**: current user, tokens, roles within tenant
- All three resolved at app bootstrap via Zustand stores in `stores/`
- Route structure: `/:orgSlug/:tenantSlug/dashboard`

## Data Isolation

- API headers: `X-Tenant-ID` + `X-Org-ID` (always, via Axios interceptor)
- LocalStorage: `org-${orgId}-tenant-${tenantId}-${key}`
- React Query keys include tenant/org: `['users', orgId, tenantId]`
- Feature flags resolved per tenant within org
- Theme resolved per tenant (org can set defaults)

## Naming

| What       | Convention             | Example                             |
| ---------- | ---------------------- | ----------------------------------- |
| Files      | kebab-case             | `user-profile.tsx`, `use-tenant.ts` |
| Components | PascalCase             | `UserProfile`, `AlertDialog`        |
| Variables  | camelCase, descriptive | `currentUser`, `userList`           |
| Functions  | camelCase, verb-first  | `getUser()`, `handleSubmit()`       |
| Constants  | UPPER_SNAKE_CASE       | `API_BASE_URL`                      |
| Hooks      | `use` prefix           | `useTenant()`, `useOrgConfig()`     |

No abbreviations. `currentUser` not `usr`. `createdAt` not `dt`.

## Imports

**Within apps/web** — use `@/` alias (resolves to `apps/web/src/`):

```typescript
import { UserCard } from "@/features/users";
import { useTenantStore } from "@/stores/tenant-store";
```

**Cross-package** — use `@repo/` scope:

```typescript
import { Button } from "@repo/ui";
import { cn } from "@repo/utils";
import "@repo/theme/tokens.css";
```

## Turbo Pipeline

Tasks run in dependency order: `^build` means packages build before apps.

```
build  → dependsOn: [^build], outputs: [dist/**]
dev    → no cache, persistent
lint   → dependsOn: [^build]
test   → dependsOn: [^build]
```
