# Multi-Tenant Progressive Web App

Production-ready multi-tenant frontend with React 19, TypeScript, Vite, Tailwind v4. Feature + Page driven architecture.

## Tech Stack

- **Package Manager**: Yarn (install: `npm install -g yarn`)
- **Framework**: React 19.2.4 + TypeScript strict
- **Build**: Vite 8.0.1
- **Styling**: Tailwind CSS 4.2.2 + CSS tokens
- **UI**: shadcn/ui (61+ components)
- **Icons**: Lucide React 1.7.0 (use only)
- **Routing**: React Router DOM 7.13.1

## Architecture

**Features** = Business logic | **Pages** = Routes

```
src/
├── features/users/      # Business logic (reusable)
│   ├── api/             # getUsers(), createUser()
│   ├── components/      # UserCard, UserForm
│   ├── hooks/           # useUsers()
│   └── index.ts         # Public API
├── pages/dashboard/     # Routes
│   ├── index.tsx        # /dashboard
│   └── components/      # Page-specific layout
├── components/ui/       # Global UI
├── contexts/            # Auth, Tenant, Theme
└── layouts/             # Page layouts
```

## Quick Start

```bash
yarn install          # Install deps
yarn husky install    # Setup hooks
yarn dev              # Dev server
```

## Component Workflow

**Before creating any component:**

1. **Check existing** - Search `/src/components/ui/` (61+ components available)
2. **If not exists** - Web search for package compatible with design system
3. **If package found:**
   - Run `yarn check-pkg <package-name>`
   - If ✅ approved, install and integrate
4. **If no package:**
   - Use `/ui-ux-design` skill to create component
   - Create in `/src/components/ui/`
   - Follow design token system
5. **Use component** - Import and use in features/pages

**For icons:**
- **Always use Lucide React** (already installed)
- Browse: [lucide.dev/icons](https://lucide.dev/icons)
- Import: `import { User, Settings, Home } from 'lucide-react'`
- Never install other icon libraries

**Examples:**
```typescript
// Icons - use Lucide React
import { User, Mail, Search } from 'lucide-react';

<User className="h-4 w-4" />
<Mail size={16} />

// Existing component
import { DatePicker } from '@/components/ui/date-picker';

// New component - check package first
yarn check-pkg slate-react
// If approved: yarn add slate-react
// If rejected: Use /ui-ux-design skill
```

## Commands

```bash
yarn dev              # localhost:5173
yarn build            # Production build
yarn lint             # ESLint
yarn lint:fix         # Auto-fix
yarn format           # Prettier
yarn test             # Run tests
yarn test:coverage    # Test coverage (target > 90%)
yarn analyze          # Bundle visualizer
yarn check-pkg <pkg>  # Check package before installing
yarn audit            # Check for vulnerabilities
yarn audit:fix        # Auto-fix vulnerabilities
```

## Package Security

**Before `yarn add <package>`, ALWAYS run:**

```bash
yarn check-pkg <package-name>
```

**Auto-checks:**
- ✅ Unpacked size (< 50KB good, < 100KB max)
- ✅ Last update (< 6 months = maintained)
- ✅ GitHub stars (> 1K = popular)
- ✅ Dependencies (< 10 = minimal)
- ✅ License (MIT/Apache preferred)

**Size thresholds:**
- < 50KB = ✅ Good
- 50-100KB = ⚠️ Warning
- > 100KB = ❌ Too large (reject)

**Example:**
```bash
yarn check-pkg clsx

# Size: 8.35 KB ✅
# Updated: 1 year ago ❌
# Stars: 9.7K ✅
# Dependencies: 0 ✅
# Recommendation: ⚠️ REVIEW WARNINGS
```

## Security Vulnerability Checks

**Before deployment, run:**

```bash
yarn audit                    # Check dependencies for known vulnerabilities
yarn audit:fix                # Auto-fix vulnerabilities
yarn check-pkg <package>      # Check new packages before install
```

**Security tools:**
- **yarn audit** - Built-in npm vulnerability scanner
- **Snyk** - [snyk.io](https://snyk.io) for advanced scanning
- **OWASP Dependency-Check** - Check against OWASP database

**Automated checks:**
```bash
# Add to CI/CD pipeline
yarn audit --audit-level=high  # Fail on high/critical
yarn test:coverage             # Ensure > 90% coverage
yarn build                     # Check build succeeds
```

**Security best practices:**
- ✅ Never commit `.env` files
- ✅ No hardcoded secrets/tokens
- ✅ No sensitive data in localStorage
- ✅ Validate all user inputs
- ✅ Sanitize before rendering
- ✅ HTTPS only in production
- ✅ CSP headers configured

## Git Hooks

**Pre-commit** (fast): ESLint + Prettier on staged files
**Pre-push** (slow): Full build + tests

## Design System

- 3 themes: Falcon (Blue), Phoenix (Purple), Jarvis (Teal)
- 2 modes: Light, Dark
- **Never hardcode** - use tokens: `var(--primary-50)`, `var(--space-16)`

## Multi-Tenancy

- Tenant ID on every API call: `headers: { 'X-Tenant-ID': tenantId }`
- Scope localStorage: `tenant-${tenantId}-${key}`
- Feature flags per tenant
- Dynamic theming per tenant

## React 19

- `use()` for async (not useEffect)
- `useTransition` for non-urgent updates
- `useActionState` for forms
- Ref is a prop (no forwardRef)

## Performance

- Code split all routes (React.lazy)
- Bundle: < 200KB gzipped
- Virtualize lists > 100 items
- Lighthouse > 90

## PWA

- Cache-First: Static assets
- Network-First: API calls
- Never cache: auth, payments
- HTTPS only

## Core Rules

1. **Use existing first** - check /src/components/ui/ before creating
2. **Feature + Page** - features = logic, pages = routes
3. **Security** - audit before deploy, validate all inputs
4. **Check packages** - run `yarn check-pkg` before install
5. **Design tokens** - never hardcode values
6. **TypeScript strict** - no `any`
7. **React 19** - use(), transitions, actions
8. **Multi-tenant** - tenant ID on all API calls
9. **Performance** - code split routes
10. **Test coverage** - maintain > 90% coverage

## Targets

- FCP < 1.5s
- TTI < 3.5s
- Bundle < 200KB
- Lighthouse > 90
- Test Coverage > 90%

## Resources

**For design tokens & UI:**
- Use `/ui-ux-design` skill for all design system queries
- `/.claude/rules/` - Development rules

**External:**
- [shadcn/ui](https://ui.shadcn.com)
- [Radix UI](https://radix-ui.com)

## Status

**✅ Done**: Design system, 61+ components, themes
**🚧 Todo**: PWA, tenant context, auth, tests

---

**v1.0.0-alpha** | 2026-03-28
