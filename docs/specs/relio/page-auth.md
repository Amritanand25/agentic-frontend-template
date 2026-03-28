# Auth Pages

**Type:** Page
**Size:** Medium
**Status:** Implemented (login, signup, org/tenant selectors with mock auth)
**Created:** 2026-03-28
**Updated:** 2026-03-28
**Priority:** High
**Parent:** [Relio CRM Platform](./module-relio-crm.md)

## Overview

Authentication flow: login, signup, org selector, and tenant selector.

### Implementation Notes

**What's built:**

- `pages/login-page.tsx` — email/password login with OAuth buttons (Google, GitHub)
- `pages/signup-page.tsx` — name, email, password, org name, terms checkbox
- `pages/select-org-page.tsx` — select from available organizations
- `pages/select-tenant-page.tsx` — select workspace within org
- `layouts/auth-layout.tsx` — centered card layout for auth pages
- `components/ProtectedRoute.tsx` — redirects to login if not authenticated
- `stores/auth-store.ts` — Zustand store with `persist` middleware:
  - Mock login (accepts any email/password, auto-selects first org+tenant)
  - Mock signup (validates email, password strength, terms acceptance)
  - OAuth stub (logs provider, no redirect)
  - `selectOrg()` and `selectTenant()` for multi-tenant navigation
  - Persists token, user, currentOrg, currentTenant to localStorage
- `types/auth.ts`, `types/org.ts`, `types/tenant.ts` — TypeScript interfaces
- Validation helpers: `validateEmail()`, `validatePassword()` exported from auth-store

**Auth flow:** Login → auto-select org+tenant → redirect to `/:orgSlug/:tenantSlug/app/dashboard`

## Pages

### 1. Login (`/login`)

```
┌────────────────────────────────┐
│   [Relio Logo]                 │
│                                │
│   Welcome back                 │
│   Log in to your account       │
│                                │
│   Email                        │
│   [email@example.com    ]      │
│                                │
│   Password                     │
│   [••••••••••••         ]      │
│   [Forgot password?]           │
│                                │
│   [     Log in          ]      │
│                                │
│   ─────── or ───────           │
│                                │
│   [🔵 Continue with Google]    │
│   [⚫ Continue with GitHub]    │
│                                │
│   Don't have an account?       │
│   [Sign up]                    │
└────────────────────────────────┘
```

### 2. Signup (`/signup`)

```
┌────────────────────────────────┐
│   [Relio Logo]                 │
│                                │
│   Create your account          │
│                                │
│   Full Name                    │
│   [John Doe             ]      │
│                                │
│   Email                        │
│   [email@example.com    ]      │
│                                │
│   Password                     │
│   [••••••••••••         ]      │
│   8+ characters, mix required  │
│                                │
│   Organization Name            │
│   [Acme Inc             ]      │
│                                │
│   ☑ I agree to Terms of Service│
│                                │
│   [     Create Account  ]      │
│                                │
│   Already have an account?     │
│   [Log in]                     │
└────────────────────────────────┘
```

### 3. Org Selector (`/select-org`)

(Shown after login if user belongs to multiple orgs)

```
┌────────────────────────────────┐
│   Select Organization          │
│                                │
│   ┌──────────────────────────┐ │
│   │ 🏢 Acme Inc              │ │
│   │ 3 workspaces             │ │
│   │                  [Open]  │ │
│   └──────────────────────────┘ │
│                                │
│   ┌──────────────────────────┐ │
│   │ 🏢 TechCorp              │ │
│   │ 1 workspace              │ │
│   │                  [Open]  │ │
│   └──────────────────────────┘ │
│                                │
│   [+ Create New Organization]  │
└────────────────────────────────┘
```

### 4. Tenant Selector (`/:orgSlug/select-tenant`)

(Shown if user has access to multiple tenants in org)

```
┌────────────────────────────────┐
│   Acme Inc                     │
│   Select Workspace             │
│                                │
│   ┌──────────────────────────┐ │
│   │ 💼 Sales Team            │ │
│   │ Admin                    │ │
│   │                  [Open]  │ │
│   └──────────────────────────┘ │
│                                │
│   ┌──────────────────────────┐ │
│   │ 💼 Marketing Team        │ │
│   │ Member                   │ │
│   │                  [Open]  │ │
│   └──────────────────────────┘ │
│                                │
│   [+ Create New Workspace]     │
└────────────────────────────────┘
```

## Requirements

- ✅ Email/password login
- ✅ OAuth (Google, GitHub)
- ✅ Password validation (8+ chars, mix required)
- ✅ Forgot password flow (email reset link)
- ✅ Multi-org support (select org after login)
- ✅ Multi-tenant support (select workspace)
- ✅ Remember last org/tenant in localStorage
- ✅ Form validation with error messages
- ✅ Loading states
- ✅ Redirect to intended page after auth

## Design Tokens

```css
/* Auth pages */
--auth-container-width: 400px;
--auth-container-padding: 48px;
--auth-bg: var(--surface-0);
--auth-logo-size: 48px;

/* Form */
--field-gap: 20px;
--label-margin: 8px;
--button-height: 48px;
```

## Components

### Existing

- `Button`, `Input`, `Label`, `Checkbox`, `Separator`

### New Components

#### `AuthLayout` (Simple)

Wrapper for all auth pages

```tsx
<div className="auth-layout">
  <div className="auth-container">
    <div className="auth-logo">
      <Logo size={48} />
    </div>
    <div className="auth-content">{children}</div>
  </div>
</div>
```

#### `LoginForm` (Medium)

```tsx
<form onSubmit={handleSubmit}>
  <div className="form-header">
    <h1>Welcome back</h1>
    <p className="text-subdued-1">Log in to your account</p>
  </div>

  <div className="form-fields">
    <div>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>

    <div>
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Link to="/forgot-password" className="text-sm text-primary-50">
        Forgot password?
      </Link>
    </div>
  </div>

  <Button type="submit" className="w-full" disabled={isLoading}>
    {isLoading ? <Spinner /> : "Log in"}
  </Button>

  <Separator />

  <div className="oauth-buttons">
    <Button variant="outline" onClick={() => loginWithGoogle()}>
      <GoogleIcon /> Continue with Google
    </Button>
    <Button variant="outline" onClick={() => loginWithGitHub()}>
      <GitHubIcon /> Continue with GitHub
    </Button>
  </div>

  <div className="text-center text-sm">
    Don't have an account?{" "}
    <Link to="/signup" className="text-primary-50">
      Sign up
    </Link>
  </div>
</form>
```

#### `OrgSelector` (Simple)

```tsx
<div className="org-selector">
  <h1>Select Organization</h1>

  <div className="org-list">
    {orgs.map((org) => (
      <Card key={org.id} className="org-card" onClick={() => selectOrg(org.id)}>
        <div className="org-icon">{org.icon || "🏢"}</div>
        <div className="org-info">
          <div className="org-name">{org.name}</div>
          <div className="org-meta">{org.tenantCount} workspaces</div>
        </div>
        <Button variant="ghost">Open</Button>
      </Card>
    ))}
  </div>

  <Button variant="outline" onClick={createOrg}>
    <Plus size={16} /> Create New Organization
  </Button>
</div>
```

## State Management

```typescript
interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  loginWithOAuth: (provider: "google" | "github") => Promise<void>;

  // Multi-tenant
  selectOrg: (orgId: string) => void;
  selectTenant: (tenantId: string) => void;
}

// Persist in localStorage
const useAuthStore = create(
  persist(
    (set) => ({
      // ... state & actions
    }),
    {
      name: "relio-auth",
      partialPersist: (state) => ({
        token: state.token,
        lastOrgId: state.user?.lastOrgId,
        lastTenantId: state.user?.lastTenantId,
      }),
    },
  ),
);
```

## Mock Data

```typescript
const mockUser: User = {
  id: "user_1",
  email: "john@example.com",
  name: "John Doe",
  avatar: null,
  lastOrgId: "org_1",
  lastTenantId: "tenant_1",
};

const mockOrgs: Organization[] = [
  {
    id: "org_1",
    name: "Acme Inc",
    slug: "acme-inc",
    tenantCount: 3,
    icon: "🏢",
  },
  {
    id: "org_2",
    name: "TechCorp",
    slug: "techcorp",
    tenantCount: 1,
    icon: "🚀",
  },
];

const mockTenants: Tenant[] = [
  {
    id: "tenant_1",
    orgId: "org_1",
    name: "Sales Team",
    slug: "sales",
    role: "admin",
  },
  {
    id: "tenant_2",
    orgId: "org_1",
    name: "Marketing Team",
    slug: "marketing",
    role: "member",
  },
];
```

## Validation

```typescript
const validatePassword = (password: string) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }
  if (
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password)
  ) {
    return "Password must contain uppercase, lowercase, and numbers";
  }
  return null;
};

const validateEmail = (email: string) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Invalid email address";
  }
  return null;
};
```

## File Changes

| File                                         | Status     | Description                                     |
| -------------------------------------------- | ---------- | ----------------------------------------------- |
| `apps/web/src/pages/login-page.tsx`          | ✅ Created | Login form (email, password, OAuth)             |
| `apps/web/src/pages/signup-page.tsx`         | ✅ Created | Signup form (name, email, password, org, terms) |
| `apps/web/src/pages/select-org-page.tsx`     | ✅ Created | Org selector cards                              |
| `apps/web/src/pages/select-tenant-page.tsx`  | ✅ Created | Tenant/workspace selector                       |
| `apps/web/src/stores/auth-store.ts`          | ✅ Created | Zustand auth store with persist                 |
| `apps/web/src/layouts/auth-layout.tsx`       | ✅ Created | Centered card layout                            |
| `apps/web/src/components/ProtectedRoute.tsx` | ✅ Created | Route guard component                           |
| `apps/web/src/types/auth.ts`                 | ✅ Created | User, SignupData types                          |
| `apps/web/src/types/org.ts`                  | ✅ Created | Organization type                               |
| `apps/web/src/types/tenant.ts`               | ✅ Created | Tenant type                                     |
| `apps/web/src/pages/forgot-password.tsx`     | 🚧 TODO    | Password reset flow                             |

## Acceptance Criteria

- ✅ Login with email/password
- ✅ Signup creates account + redirects to org/tenant selector
- ✅ OAuth (Google, GitHub) works (redirect to provider)
- ✅ Password validation shows error messages
- ✅ Forgot password sends reset email
- ✅ Multi-org: Select org after login if user has multiple
- ✅ Multi-tenant: Select tenant after org selection
- ✅ Remember last org/tenant (auto-select next time)
- ✅ Redirect to intended page after auth

---

**All specs complete!** Ready for implementation.
