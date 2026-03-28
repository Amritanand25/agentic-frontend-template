# Multi-Tenant Progressive Web App

Production-ready multi-tenant frontend **Turborepo monorepo** with React 19, TypeScript, Vite, Tailwind v4. Feature + Page driven architecture.

## Tech Stack

- **Monorepo**: Turborepo + Yarn Workspaces
- **Package Manager**: Yarn (install: `npm install -g yarn`)
- **Framework**: React 19.2.4 + TypeScript strict
- **Build**: Vite 8.0.1
- **Styling**: Tailwind CSS 4.2.2 + CSS tokens
- **UI**: shadcn/ui (61+ components)
- **State**: Zustand 5.0 (client state) + TanStack Query (server state)
- **Icons**: Lucide React 1.7.0 (use only)
- **Routing**: React Router DOM 7.13.1

## Monorepo Structure

```
/
├── apps/
│   ├── web/                  # React 19 PWA (Vite)
│   │   └── src/
│   │       ├── api/          # API client, interceptors
│   │       ├── assets/       # Static assets (images, fonts)
│   │       ├── components/   # App-specific components
│   │       ├── config/       # App configuration
│   │       ├── contexts/     # React Context (theme, providers)
│   │       ├── features/     # Business logic (reusable within app)
│   │       ├── hooks/        # App-level hooks
│   │       ├── layouts/      # DashboardLayout, AuthLayout
│   │       ├── lib/          # Third-party wrappers
│   │       ├── pages/        # Route entries
│   │       ├── stores/       # Global Zustand stores (auth, tenant, org)
│   │       ├── types/        # App-level types
│   │       └── utils/        # App-level utilities
│   └── mobile/               # Mobile app (future)
├── packages/
│   ├── ui/                   # @repo/ui — shadcn/ui components (61+)
│   ├── theme/                # @repo/theme — design tokens (tokens.css)
│   └── utils/                # @repo/utils — cn(), shared utilities
├── turbo.json                # Task pipeline
├── tsconfig.base.json        # Shared TS config (strict mode)
└── package.json              # Workspace root
```

## Quick Start

```bash
yarn install          # Install deps
yarn husky install    # Setup hooks
yarn dev              # Dev server
```

## Component Workflow

**CRITICAL: Before creating ANY UI element, consult `/.claude/rules/component-catalog.md` for the full list of 62 available components. NEVER use native HTML (`<input>`, `<select>`, `<table>`, `<button>`) when `@repo/ui` has an equivalent.**

**Before creating any component:**

1. **Check catalog** - Read `/.claude/rules/component-catalog.md` (62 components with all exports listed)
2. **Check existing** - Search `packages/ui/src/` if unsure
3. **If not exists** - Web search for package compatible with design system
4. **If package found:**
   - Run `yarn check-pkg <package-name>`
   - If ✅ approved, install and integrate
5. **If no package:**
   - Use `/ui-ux-design` skill to create component
   - Create in `packages/ui/src/`
   - Follow design token system
6. **Use component** - Import from `@repo/ui` in features/pages

**For icons:**

- **Always use Lucide React** (already installed)
- Browse: [lucide.dev/icons](https://lucide.dev/icons)
- Import: `import { User, Settings, Home } from 'lucide-react'`
- Never install other icon libraries

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

**Thresholds:** Size < 100KB | Updated < 6 months | Stars > 1K | Deps < 10 | License MIT/Apache

## Git Hooks

**Pre-commit** (fast): ESLint + Prettier on staged files
**Pre-push** (slow): Full build + tests

## Design System

- 3 themes: Falcon (Blue), Phoenix (Purple), Jarvis (Teal)
- 2 modes: Light, Dark
- **Never hardcode** - use tokens: `var(--primary-50)`, `var(--space-16)`

## React 19

- `use()` for async (not useEffect)
- `useTransition` for non-urgent updates
- `useActionState` for forms
- Ref is a prop (no forwardRef)

## Security

- ✅ Never commit `.env` files
- ✅ No hardcoded secrets/tokens
- ✅ No sensitive data in localStorage
- ✅ Validate all user inputs (Zod)
- ✅ Sanitize before rendering (DOMPurify)
- ✅ HTTPS only in production
- ✅ Run `yarn audit` before deploy

## Core Rules

1. **Use existing first** - check packages/ui/src/ before creating
2. **Feature + Page** - features = logic, pages = routes (see architecture.md)
3. **Check packages** - run `yarn check-pkg` before install
4. **Design tokens** - never hardcode values
5. **TypeScript strict** - no `any`
6. **React 19** - use(), transitions, actions
7. **Multi-tenant** - tenant ID + org ID on all API calls (see architecture.md)
8. **PWA caching** - cache-first static, network-first API (see frontend-best-practices.md)
9. **Performance** - code split routes, < 200KB bundle, Lighthouse > 90
10. **Test coverage** - maintain > 90% coverage

## Targets

- FCP < 1.5s | TTI < 3.5s | Bundle < 200KB | Lighthouse > 90 | Coverage > 90%

## Resources

- `/.claude/rules/component-catalog.md` — **full component catalog (62 components, all exports, usage examples)**
- `/ui-ux-design` skill — design tokens & visual decisions
- `/layout-creator` skill — page layout patterns
- `/.claude/rules/` — architecture & frontend patterns

## Status

**✅ Done**: Design system, 61+ components, themes
**🚧 Todo**: PWA, tenant context, auth, tests

---

**v1.0.0-alpha** | 2026-03-28
