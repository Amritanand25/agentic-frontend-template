---
name: Architecture
description: Feature + Page driven structure, component patterns, Git hooks
type: rules
---

# Architecture

## Feature + Page Driven

**Features** = Business logic (reusable)
**Pages** = Routes (compose features)

```
src/
├── features/users/
│   ├── api/           # getUsers(), createUser()
│   ├── components/    # UserCard, UserForm
│   ├── hooks/         # useUsers(), useCreateUser()
│   ├── types/         # User, CreateUserDto
│   └── index.ts       # Public API export
├── pages/dashboard/
│   ├── index.tsx      # /dashboard route
│   └── components/    # DashboardHeader (page-specific)
├── components/ui/     # Global UI (shadcn/ui)
├── contexts/          # Auth, Tenant, Theme
├── layouts/           # DashboardLayout, AuthLayout
└── api/               # API client
```

## How It Works

**Feature exports:**
```typescript
// features/users/index.ts
export { UserCard } from './components';
export { useUsers } from './hooks';
```

**Page uses features:**
```typescript
// pages/dashboard/index.tsx
import { UserCard } from '@/features/users';
import { StatsCard } from '@/features/analytics';

export function DashboardPage() {
  return (
    <DashboardLayout>
      <StatsCard />
      <UserCard />
    </DashboardLayout>
  );
}
```

## Where to Put Code

- **Global** (`/components/ui`) - used by 3+ features
- **Features** (`/features/users`) - business logic, reusable
- **Pages** (`/pages/dashboard`) - routes, page-specific layout

## Patterns

**shadcn/ui components:**
```typescript
import { cva } from 'class-variance-authority';

const variants = cva('base', {
  variants: { variant: {...}, size: {...} }
});

export function Button({ variant, size, ...props }) {
  return <button className={cn(variants({ variant, size }))} {...props} />;
}
```

**API calls:**
```typescript
// features/users/api/get-users.ts
export async function getUsers() {
  return apiClient.get('/users', {
    headers: { 'X-Tenant-ID': tenantId }
  });
}

// features/users/hooks/use-users.ts
export function useUsers() {
  return useQuery({ queryKey: ['users'], queryFn: getUsers });
}
```

**Context:**
```typescript
const Context = createContext<T | null>(null);

export function useHook() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error('Must use within Provider');
  return ctx;
}
```

## Git Hooks (Husky)

**Pre-commit** (fast ~1-3s):
- Lints staged files (ESLint)
- Formats code (Prettier)

**Pre-push** (slow ~30-60s):
- Builds project (`yarn build`)
- Prevents push if build fails

**Setup:**
```bash
yarn add -D husky lint-staged prettier
yarn husky install
echo 'yarn lint-staged' > .husky/pre-commit
echo 'yarn build' > .husky/pre-push
chmod +x .husky/pre-commit .husky/pre-push
```

**lint-staged config:**
```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

## Naming

**Files:**
- Components: kebab-case - `user-profile.tsx`, `avatar.tsx`
- Hooks: kebab-case - `use-tenant.ts`, `use-auth.ts`
- Utils: kebab-case - `api-client.ts`, `format-date.ts`
- Folders: kebab-case - `user-management/`

**Inside files:**
- Components: PascalCase - `UserProfile`, `Avatar`
- Variables: camelCase - `currentUser`, `buttonVariants`
- Functions: camelCase - `getUser()`, `handleSubmit()`
- Constants: UPPER_SNAKE_CASE - `API_BASE_URL`

**Be descriptive:**
- ❌ `usr`, `arr`, `dt`
- ✅ `currentUser`, `userList`, `createdAt`

## Import Aliases

```typescript
import { Button } from '@/components/ui/button';
import { UserCard } from '@/features/users';
import { useTenant } from '@/contexts/tenant-context';
```

## Package Security

**Before installing ANY package:**

```bash
yarn check-pkg <package-name>
```

**Checks:**
- Size (< 50KB ✅, 50-100KB ⚠️, > 100KB ❌)
- Last update (< 6 months ✅)
- GitHub stars (> 1K ✅)
- Dependencies (< 10 ✅)
- License (MIT/Apache ✅)

**Reject if:**
- Size > 100KB (hard limit)
- Not updated in 6+ months
- < 100 stars (low adoption)
- > 10 dependencies (bloated)

## Testing Requirements

**Test Coverage: > 90%**

**What to test:**
- ✅ Critical business logic (features)
- ✅ Utility functions
- ✅ API integration
- ✅ Custom hooks
- ✅ Component interactions

**Test structure:**
```
features/users/
├── __tests__/
│   ├── api.test.ts        # API calls
│   ├── hooks.test.ts      # useUsers, etc.
│   └── UserCard.test.tsx  # Component
```

**Coverage targets:**
- Features: 90%+ (critical)
- Utils: 90%+ (critical)
- Components: 80%+ (important)
- Pages: 70%+ (integration)

**Commands:**
```bash
yarn test              # Run tests
yarn test:coverage     # Check coverage
yarn test:watch        # Watch mode
```

## Component Creation

**Workflow:**
1. Check `/src/components/ui/` first (61+ components)
2. If not found → web search for package
3. Check package → `yarn check-pkg <name>`
4. If approved → install
5. If rejected → use `/ui-ux-design` skill

**Icons:** Always use Lucide React - `import { User } from 'lucide-react'`

## Key Rules

1. **Use existing first** - check components before creating
2. **Feature + Page** - features = logic, pages = routes
3. **Check packages** - run `yarn check-pkg` before install
4. **Icons** - Lucide React only
5. **Test coverage** - maintain > 90% overall
6. **Features export public API** - via index.ts
7. **Pages compose features** - no business logic in pages
8. **Global = 3+ uses** - otherwise feature or page-specific
9. **@/ imports** - always use path aliases
10. **Pre-push** - full build + tests
