# Multi-Tenant PWA — Turborepo Monorepo

React 19, TypeScript strict, Vite 8, Tailwind v4. Feature + Page architecture.

---

## Behavioral Principles (Karpathy's 4 Rules)

> Reduce common LLM coding mistakes. Bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Coding

- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

- No features beyond what was asked. No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- If you write 200 lines and it could be 50, rewrite it.
- Ask: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

- Don't "improve" adjacent code, comments, or formatting. Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- Remove imports/variables/functions that YOUR changes made unused. Don't remove pre-existing dead code unless asked.
- **The test:** Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

- Transform tasks into verifiable goals: "Add validation" → "Write tests for invalid inputs, then make them pass"
- For multi-step tasks, state a brief plan with verification steps.
- Strong success criteria let you loop independently. Weak criteria require constant clarification.

---

## MANDATORY: Component Reuse Workflow

**BEFORE creating ANY UI element, ALWAYS follow this order:**

1. **Check catalog** → Read `/.claude/rules/component-catalog.md` (62+ components)
2. **Search code** → Glob/Grep `packages/ui/src/` for existing components
3. **If exists** → Use it. `import { X } from "@repo/ui"`
4. **If close match** → Extend existing component (add variant/prop). Never duplicate
5. **If not exists** → Search npm package → run `yarn check-pkg <name>`
6. **If no package** → Create in `packages/ui/src/` using `/component-builder` skill

**Native HTML is BANNED in `apps/web/src/`** when `@repo/ui` has an equivalent. Full banned list and alternatives are in `/.claude/rules/component-catalog.md`. Inside `packages/ui/src/` native HTML is allowed but must use design tokens.

---

## When to Use What

### Agents — Use for autonomous multi-step tasks

| User Request                                    | Agent                  |
| ----------------------------------------------- | ---------------------- |
| Build full feature (UI + API + state + tests)   | `senior-frontend-eng`  |
| Create visually polished UI, design system work | `ui-ux-design-creator` |
| Plan/spec before implementation                 | `spec-creator`         |

### Skills — Use for focused single-concern tasks

| Task                                              | Skill                    |
| ------------------------------------------------- | ------------------------ |
| Create/refactor one UI component                  | `/component-builder`     |
| Look up design tokens, colors, typography, themes | `/design-token`          |
| UX thinking, design principles, heuristics        | `/ui-ux-designer`        |
| Pick page layout pattern (12 patterns)            | `/layout-creator`        |
| Set up API calls, caching, mutations              | `/api-integration`       |
| Write/fix tests                                   | `/test-master`           |
| Security review, input validation (Zod)           | `/security-guardian`     |
| Performance audit, bundle size, code splitting    | `/performance-optimizer` |
| Accessibility, ARIA, keyboard nav, logging        | `/frontend-standards`    |
| Create implementation spec before coding          | `/spec-creator`          |

### Decision Flow

```
User prompt → Does it need multiple files/concerns?
  YES → Use an AGENT (senior-frontend-eng or ui-ux-design-creator)
  NO  → Use a SKILL for the specific concern

User prompt → "Plan/spec/design this feature"?
  YES → Use spec-creator AGENT first, then implement

User prompt → Needs visual design decisions?
  YES → Use /design-token SKILL for tokens, /ui-ux-designer SKILL for UX thinking
```

---

## Tech Stack

| Layer           | Tool                                      |
| --------------- | ----------------------------------------- |
| Monorepo        | Turborepo + Yarn Workspaces               |
| Package Manager | Yarn (`npm install -g yarn`)              |
| Framework       | React 19 + TypeScript strict              |
| Build           | Vite 8                                    |
| Styling         | Tailwind CSS 4 + CSS design tokens        |
| UI Components   | shadcn/ui (62+ components) via `@repo/ui` |
| Client State    | Zustand 5                                 |
| Server State    | TanStack Query                            |
| Icons           | Lucide React (only — no other icon libs)  |
| Routing         | React Router DOM 7                        |

---

## Monorepo Structure

```
/
├── apps/web/src/
│   ├── api/          # Axios instances, query client
│   ├── components/   # App-specific components
│   ├── contexts/     # React Context (theme, providers)
│   ├── features/     # Business logic by domain
│   ├── hooks/        # App-level hooks
│   ├── layouts/      # DashboardLayout, AuthLayout
│   ├── pages/        # Route entries
│   ├── stores/       # Zustand stores (auth, tenant, org)
│   ├── types/        # App-level types
│   └── utils/        # App-level utilities
├── packages/
│   ├── ui/           # @repo/ui — 62+ components (ALWAYS check first)
│   ├── theme/        # @repo/theme — design tokens (tokens.css)
│   └── utils/        # @repo/utils — cn(), shared utilities
```

**Dependency flow:** `apps/*` → `packages/*` (never reverse)

---

## Commands

```bash
yarn dev              # Dev server (localhost:5173)
yarn build            # Production build
yarn lint / lint:fix  # ESLint
yarn format           # Prettier
yarn test             # Run tests
yarn test:coverage    # Coverage report (target >90%)
yarn analyze          # Bundle visualizer
yarn check-pkg <pkg>  # ALWAYS run before yarn add
yarn audit            # Vulnerability check
```

---

## App Layout

All app pages render inside `AppLayout` (`apps/web/src/layouts/app-layout.tsx`):
- **Left sidebar** — Fixed, collapsible (260px / 64px), workspace switcher, nav, user profile
- **Top header** — Always visible (56px), breadcrumbs, actions
- **Main content** — `<Outlet />` renders page content below header, right of sidebar

**When building new pages:** They render inside this layout via `<Outlet />`. Do NOT recreate sidebar/header.

---

## Design System (Summary)

- **Themes:** Falcon (Blue), Phoenix (Purple), Jarvis (Teal) | **Modes:** Light, Dark
- **Tokens:** `var(--primary-50)`, `var(--space-16)`, `var(--radius-24)`, `var(--font-size-m)` — never hardcode
- **Full token reference:** `packages/theme/src/tokens.css` + `/design-token` skill
- **Separation:** Surface contrast ONLY (`surface-0` on `surface-10`). **NO borders on cards/containers/panels.**
- **Cards:** MUST have `backgroundColor: var(--surface-0)`, `borderRadius: var(--radius-24)`
- **Equal split:** `1fr 1fr` by default. Never asymmetric without explicit design intent.
- **UI patterns (spacing, DataGrid, cards, interactions):** See `/.claude/rules/ui-patterns.md`

---

## React 19

- `use()` for async data — not useEffect
- `useTransition` for non-urgent updates
- `useActionState` for forms
- Ref is a prop — no forwardRef needed
- Trust compiler — minimize manual useMemo/useCallback

---

## Core Rules

1. **Search existing first** — catalog + `packages/ui/src/` before creating
2. **No native HTML** — use `@repo/ui` equivalents (see `/.claude/rules/component-catalog.md`)
3. **DataGrid for all tables** — `Table` is BANNED in apps/ (see `/.claude/rules/ui-patterns.md`)
4. **Design tokens only** — never hardcode visual values
5. **Uniform page spacing** — `flex flex-col gap-[var(--space-8)]` (see `/.claude/rules/ui-patterns.md`)
6. **TypeScript strict** — no `any`
7. **Feature + Page** — features = reusable logic, pages = routes (see `/.claude/rules/architecture.md`)
8. **Check packages** — `yarn check-pkg` before any `yarn add`
9. **Lucide React only** — no other icon libraries
10. **Multi-tenant** — X-Tenant-ID + X-Org-ID on all API calls
11. **Performance** — lazy load routes, <200KB bundle
12. **Test coverage** — maintain >90%

---

## Creating New Components

- **Location:** `packages/ui/src/{kebab-case-name}.tsx`
- **Tokens only:** Never hardcode — use `/design-token` skill
- **Variants:** CVA (class-variance-authority)
- **Icons:** Lucide React only
- **Export:** Add to `packages/ui/src/index.ts`
- **Sub-components:** Import existing from `@repo/ui` — never recreate

---

## Agent Memory — ALWAYS Auto-Save

After completing ANY task, save relevant learnings to `/.claude/agent-memory/` WITHOUT being asked:

| What Happened               | Save To                               |
| --------------------------- | ------------------------------------- |
| Fixed a bug                 | `agent-memory/bugs/{area}-{issue}.md` |
| Learned a gotcha            | `agent-memory/learnings/{topic}.md`   |
| Made a design choice        | `agent-memory/decisions/{feature}.md` |
| Found a reusable pattern    | `agent-memory/patterns/{pattern}.md`  |
| Mapped an API endpoint      | `agent-memory/api/{domain}.md`        |

**Before each task:** Read relevant existing agent-memory files to avoid repeating past mistakes.

---

## Security & Targets

- Never commit `.env` files or hardcode secrets. No sensitive data in localStorage.
- Validate all inputs (Zod), sanitize HTML (DOMPurify). HTTPS only in production.
- `yarn check-pkg` before any `yarn add` (Size < 100KB | Stars > 1K | Deps < 10)
- **Targets:** FCP < 1.5s | TTI < 3.5s | Bundle < 200KB | Lighthouse > 90 | Coverage > 90%

---

## Rules & Resources (Auto-Loaded)

| Resource                           | Location                                     |
| ---------------------------------- | -------------------------------------------- |
| Component catalog (62+ exports)    | `/.claude/rules/component-catalog.md`        |
| Architecture & state management    | `/.claude/rules/architecture.md`             |
| UI patterns (cards, DataGrid, etc) | `/.claude/rules/ui-patterns.md`              |
| PWA & multi-tenant patterns        | `/.claude/rules/frontend-best-practices.md`  |
| Design tokens (CSS variables)      | `packages/theme/src/tokens.css`              |
| Design token reference (full)      | `/design-token` skill                        |
| UX design principles & laws        | `/ui-ux-designer` skill                      |
| UX research docs                   | `docs/ui-ux-design/` (22 design docs)        |
