---
name: Frontend Best Practices
description: Essential React 19, performance, design tokens, PWA, multi-tenant patterns
type: rules
---

# Frontend Best Practices

## React 19 Essentials

**Use React 19 features:**
- `use()` for async data (not useEffect)
- `useTransition` for non-urgent updates
- `useActionState` for forms
- `useOptimistic` for instant UI updates
- Ref is a prop (no forwardRef)
- Server Components default, 'use client' for interactive

```typescript
// ✅ React 19
import { use, Suspense } from 'react';

function Component({ dataPromise }) {
  const data = use(dataPromise);
  return <div>{data.name}</div>;
}

<Suspense fallback={<Loading />}>
  <Component dataPromise={fetchData()} />
</Suspense>

// ❌ React 18
useEffect(() => { fetchData().then(setData); }, []);
```

**Compiler optimizations:**
- Trust React 19 compiler - reduce manual `useMemo`/`useCallback`
- Only memo expensive operations (100ms+)

## Performance Rules

**Code splitting (required):**
```typescript
// Split all routes
const Dashboard = lazy(() => import('./pages/dashboard'));

<Suspense fallback={<PageSkeleton />}>
  <Dashboard />
</Suspense>
```

**Vite bundle config:**
```typescript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        'charts': ['recharts']
      }
    }
  }
}
```

**Virtualize lists > 100 items:**
```typescript
import { useVirtualizer } from '@tanstack/react-virtual';
```

**Targets:**
- Initial bundle: < 200KB gzipped
- Route chunks: < 100KB
- Lighthouse: > 90

## Design Tokens (Critical)

**NEVER hardcode values - always use tokens:**

```typescript
// ❌ Never
<div style={{ color: '#3535f3', padding: '16px' }}>

// ✅ Always
<div style={{ color: 'var(--primary-50)', padding: 'var(--space-16)' }}>
```

**For complete token reference:**
Use `/ui-ux-design` skill - contains all design tokens, colors, spacing, typography

**Key tokens:**
- Colors: `--primary-{10-80}`, `--surface-{0,10,20,30}`, `--text-default`
- Spacing: `--space-{4,8,12,16,24,32,48}`
- Typography: `--font-size-{xs,s,m,l,xl,2xl}`
- Radius: `--radius-{4,8,12,16,full}`
- Heights: `--height-{xs,s,m,l,xl}` (24,32,40,48,64px)

**Themes:**
- 3 themes: Falcon (Blue), Phoenix (Purple), Jarvis (Teal)
- 2 modes: Light, Dark
- Test all 6 combinations

## Multi-Tenant Patterns

**Tenant context:**
```typescript
// contexts/tenant-context.tsx
export function useTenant() {
  const { config } = useContext(TenantContext);
  return config; // { tenantId, orgId, theme, features, permissions }
}
```

**API scoping (critical):**
```typescript
// Every API call MUST include tenant ID
headers: { 'X-Tenant-ID': config.tenantId }
```

**LocalStorage scoping:**
```typescript
// Scope by tenant
localStorage.setItem(`tenant-${tenantId}-${key}`, value);
```

**Feature flags:**
```typescript
export function useFeature(name: string) {
  const { config } = useTenant();
  return config.features[name] ?? false;
}
```

## PWA Essentials

**Service worker caching:**
- Cache-First: Static assets (JS, CSS, fonts)
- Network-First: API calls (5s timeout, cache fallback)
- Stale-While-Revalidate: Images

**Always set cache limits:**
```typescript
expiration: {
  maxEntries: 50,
  maxAgeSeconds: 604800, // 7 days
  purgeOnQuotaError: true
}
```

**Never cache:**
- Auth tokens
- Passwords
- Payment data
- `/api/auth/*`, `/api/payment/*`

**Requirements:**
- HTTPS only
- Lighthouse PWA score: 100

## Naming Conventions

**Files (kebab-case):**
```typescript
// ❌ Bad - typos, wrong case
Avater.tsx
UserCard.tsx
buttonComponent.tsx

// ✅ Good - kebab-case, correct spelling
avatar.tsx
user-card.tsx
button.tsx
alert-dialog.tsx
```

**Components (PascalCase inside files):**
```typescript
// avatar.tsx
export const Avatar = () => {...}

// user-card.tsx
export const UserCard = () => {...}

// alert-dialog.tsx
export const AlertDialog = () => {...}
```

**Variables (camelCase, descriptive):**
```typescript
// ❌ Bad - unclear, abbreviated
const usr = getData();
const arr = [];
const dt = new Date();

// ✅ Good - clear, descriptive
const currentUser = getData();
const userList = [];
const createdAt = new Date();
const buttonVariants = cva(...);
```

**Functions (camelCase, verb-based):**
```typescript
// ❌ Bad
function user() {}
function data() {}

// ✅ Good
function getUser() {}
function fetchUserData() {}
function handleSubmit() {}
```

**Constants (UPPER_SNAKE_CASE):**
```typescript
const API_BASE_URL = 'https://api.com';
const MAX_ITEMS_PER_PAGE = 100;
```

**Hooks (camelCase with 'use' prefix):**
```typescript
// File: use-tenant.ts
export function useTenant() {...}

// File: use-user-data.ts
export function useUserData() {...}
```

**Key rules:**
- Files: kebab-case (avatar.tsx, user-card.tsx)
- Components: PascalCase (Avatar, UserCard)
- Variables: camelCase, descriptive (currentUser, userList)
- Be descriptive - no abbreviations
- Spell correctly - use IDE spell checker

## TypeScript Rules

- Strict mode: `strict: true`
- No `any` - use generics or `unknown`
- Export types with components
- Descriptive type names (PascalCase)

## Testing & Quality

**Coverage target: > 90%**

**Test critical paths:**
```typescript
// features/users/__tests__/hooks.test.ts
import { renderHook } from '@testing-library/react';
import { useUsers } from '../hooks/use-users';

test('useUsers fetches user list', async () => {
  const { result } = renderHook(() => useUsers());
  expect(result.current.isLoading).toBe(true);
  await waitFor(() => expect(result.current.data).toBeDefined());
});
```

**Required tests:**
- Unit tests: Functions, hooks, utils (90%+)
- Component tests: User interactions (80%+)
- Integration tests: Feature flows (70%+)

**Pre-push runs:**
```bash
yarn test && yarn build
```

## Security

**Vulnerability scanning:**
```bash
yarn audit                    # Check dependencies
yarn audit --audit-level=high # Fail on high/critical
yarn check-pkg <package>      # Before install
```

**Prevent XSS:**
```typescript
// ❌ Dangerous
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ Safe
<div>{userInput}</div>
// or sanitize: DOMPurify.sanitize(html)
```

**Input validation:**
```typescript
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  age: z.number().min(0).max(120)
});

const data = schema.parse(formData); // Throws on invalid
```

**Never:**
- Commit `.env` files
- Store tokens in localStorage
- Log sensitive data
- Hardcode secrets

**Always:**
- Validate all inputs (Zod)
- Use HTTPS in production
- Configure CSP headers
- Run `yarn audit` before deploy

## Component Creation

**Before creating components:**

1. Check `/src/components/ui/` - 61+ components exist
2. If not found, web search for compatible package
3. Check package: `yarn check-pkg <name>`
4. If approved: install
5. If rejected: use `/ui-ux-design` skill to create

**Icons:**
- Always use **Lucide React** (installed)
- Browse: [lucide.dev/icons](https://lucide.dev/icons)
- `import { User, Mail } from 'lucide-react'`
- Never install other icon libraries

## Key Patterns

1. **Use existing first** - check components before creating
2. **Naming** - camelCase variables, PascalCase components, descriptive names
3. **React 19** - use(), transitions, actions, no forwardRef
4. **Security** - audit before deploy, validate inputs
5. **Code split** - all routes with React.lazy
6. **Design tokens** - never hardcode values
7. **Icons** - Lucide React only
8. **Multi-tenant** - tenant ID on every API call
9. **Performance** - < 200KB initial bundle
10. **Test coverage** - > 90% overall
