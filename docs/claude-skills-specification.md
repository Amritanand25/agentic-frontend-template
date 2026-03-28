# Claude Skills & Agents Index

Skills and agents are defined in `/.claude/skills/` and `/.claude/agents/`. Each skill has a `SKILL.md` with rules and an optional `references/` directory with code examples loaded on demand.

## Skills

| Skill                 | Path                            | Purpose                                                       |
| --------------------- | ------------------------------- | ------------------------------------------------------------- |
| Component Builder     | `skills/component-builder/`     | Component creation with LLD, CVA, a11y, design tokens         |
| API Integration       | `skills/api-integration/`       | TanStack Query + Axios, cache strategies, optimistic updates  |
| Design System UI      | `skills/ui-ux-design/`          | Color tokens, typography, spacing, themes, interaction states |
| Layout Creator        | `skills/layout-creator/`        | 12 page layout patterns (dashboard, table, form, etc.)        |
| Security Guardian     | `skills/security-guardian/`     | Input validation, XSS, token storage, tenant isolation        |
| Performance Optimizer | `skills/performance-optimizer/` | Bundle size, code splitting, virtualization, Lighthouse       |
| Test Master           | `skills/test-master/`           | Vitest + RTL + MSW, coverage targets, test patterns           |
| Frontend Standards    | `skills/frontend-standards/`    | WCAG 2.1 AA, keyboard nav, ARIA, logging, error boundaries    |

## Agents

| Agent                | Path                             | Uses Skills                                         |
| -------------------- | -------------------------------- | --------------------------------------------------- |
| Senior Frontend Eng  | `agents/senior-frontend-eng.md`  | All skills                                          |
| UI/UX Design Creator | `agents/ui-ux-design-creator.md` | design-system-ui, layout-creator, component-builder |

## Reference Files (loaded on demand)

- `component-builder/references/simple-button-example.md` — CVA + a11y pattern
- `component-builder/references/complex-dropdown-example.md` — Compound component pattern
- `api-integration/references/basic-api-setup.md` — Axios + TanStack setup
- `api-integration/references/optimistic-updates.md` — TanStack mutation pattern
- `test-master/references/component-testing-example.md` — Vitest + RTL + MSW setup
