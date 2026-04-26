---
name: spec-creator
description: Analyzes user prompts and creates detailed implementation specs in /docs/specs/. Breaks down UI pages, features, and bug fixes into actionable specs with layout patterns, design tokens, state management, and file changes. Use BEFORE implementation.
allowed-tools: Read Edit Write Bash Grep Glob
---

# Spec Creator

> Analyze first, spec second, implement never. This skill produces specs — not code.

## Step 1: Classify the Request

Read the user's prompt and classify:

| Type              | Signal                                         | Action                             |
| ----------------- | ---------------------------------------------- | ---------------------------------- |
| **New Page/View** | "create page", "build dashboard", "add screen" | Full page spec with layout pattern |
| **New Component** | "create component", "build widget", "add card" | Component spec with design tokens  |
| **New Feature**   | "add feature", "implement", "integrate"        | Feature spec with state + API      |
| **Bug Fix**       | "fix", "broken", "not working", "issue"        | Bug spec with root cause analysis  |
| **Enhancement**   | "improve", "update", "refactor", "optimize"    | Enhancement spec on existing spec  |

## Step 1.5: Clarify Before Proceeding

**Always ask the user** before creating any spec. Gather missing context:

| Question Area      | Ask When                  | Example Question                                                      |
| ------------------ | ------------------------- | --------------------------------------------------------------------- |
| **Scope**          | Always                    | "Should this be a standalone page or part of an existing view?"       |
| **Data source**    | Features/pages            | "What API/data powers this? Existing endpoint or new?"                |
| **User roles**     | Features with permissions | "Which user roles can access this? Any tenant-specific restrictions?" |
| **Scalability**    | Lists, tables, data-heavy | "How many items expected? Need virtualization or pagination?"         |
| **Reusability**    | Components/features       | "Is this specific to one page or reusable across the app?"            |
| **State lifetime** | Stateful features         | "Should this state persist across navigation or reset on leave?"      |
| **Edge cases**     | Bug fixes, forms          | "What happens on empty state, error, offline, large data?"            |
| **Priority**       | Always                    | "Is this blocking or can it be iterated on?"                          |

**Do NOT assume** — if the prompt is vague, ask. A 2-minute clarification saves a wrong spec.

**Skip questions when:** The user's prompt already answers them, or for simple/obvious requests.

## Step 2: Research Before Writing

**For New Page/View:**

1. Read layout-creator skill → pick layout pattern (1-12)
2. Read design-token skill → identify design tokens, colors, typography, spacing
3. Search `packages/ui/src/` → list existing components to reuse
4. Check `apps/web/src/pages/` → understand existing page patterns
5. Check `apps/web/src/stores/` and `apps/web/src/contexts/` → identify state needs

**For New Component:**

1. Search `packages/ui/src/` → confirm it doesn't exist
2. Read design-token skill → get exact tokens (heights, radius, colors, states)
3. Read component-builder skill → determine simple vs complex, get CVA pattern
4. Check if sub-components exist to reuse

**For New Feature:**

1. Search `apps/web/src/features/` → check for related domain
2. Search existing specs: `docs/specs/` → find related specs
3. Identify API endpoints needed
4. Identify state management approach (Zustand global vs Context page-scoped)

**For Bug Fix:**

1. Search `docs/specs/` for existing spec of the affected feature
2. Search codebase for the affected files and understand current behavior
3. Identify root cause from code analysis
4. If existing spec found → update it with bug section
5. If no spec → create minimal spec covering the fix

## Step 3: Determine Spec Size

Scale the spec to match the request. Not everything needs a full spec.

| Request Size | Example                                                                                           | Spec Depth                                                        |
| ------------ | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Small**    | "Add a loading spinner to button", "Fix tooltip position"                                         | Minimal — overview, file changes, acceptance criteria only        |
| **Medium**   | "Create a user card component", "Add search to table"                                             | Standard — include design tokens, components, state, file changes |
| **Large**    | "Build settings page", "Create user management feature"                                           | Full — all sections including layout, API, state, sub-components  |
| **Module**   | "Build the entire notification system", "Create analytics dashboard with charts, filters, export" | Full + break into sub-specs if needed, link them together         |

**Adapt to the user's prompt** — don't over-spec a simple button fix or under-spec a full module. Include only sections relevant to the request.

## Step 4: Write the Spec

**Output:** `docs/specs/{type}-{name}.md`

**Naming:** `page-dashboard.md`, `component-data-table.md`, `feature-user-management.md`, `fix-sidebar-collapse.md`, `module-notifications.md`

**For modules with sub-specs:** Create a parent spec that links to child specs:

- `module-notifications.md` (parent — overview, architecture)
- `component-notification-card.md` (child — component detail)
- `feature-notification-preferences.md` (child — feature detail)

## Spec Sections Reference

Include only the sections relevant to the request size and type:

### Always Include

- **Overview** — 1-2 sentence description
- **Requirements** — checklist of what needs to be done
- **File Changes** — table of files to create/modify/reuse
- **Acceptance Criteria** — testable success conditions

### Include for UI (pages, components)

- **Layout Pattern** — pattern # from layout-creator skill
- **Design Tokens** — exact colors, typography, spacing, heights, radius from design-token skill
- **Components** — existing ones from packages/ui/src/ to reuse + new ones needed
- **Interaction States** — default, hover, active, focus, disabled, loading
- **Responsive** — breakpoint behavior

### Include for Features with Data

- **State Management** — Zustand (global), Context (page-scoped), TanStack Query (server)
- **API Integration** — endpoints, headers (X-Tenant-ID, X-Org-ID), query keys, cache strategy

### Include for Forms & User Input

- **Security** — input validation (Zod schemas), XSS prevention (DOMPurify), sanitization rules
- **Validation** — field rules, error messages, server-side vs client-side

### Include for Interactive Components

- **Accessibility** — WCAG 2.1 AA, keyboard navigation, ARIA labels, focus management, screen reader announcements

### Include for Data-Heavy / Lists

- **Performance** — virtualization (>100 items), code splitting, lazy loading, bundle impact

### Include for All (Medium+ size)

- **Testing Strategy** — what to test, coverage targets, MSW mocks needed

### Include for Bug Fixes

- **Bug Analysis** — current behavior, expected behavior, root cause, fix strategy, affected files

### Include for Modules

- **Architecture** — how sub-parts connect, data flow between them
- **Sub-specs** — links to child spec files
- **Implementation Order** — which parts to build first (dependencies)

## Spec Header Format

```markdown
# {Title}

**Type:** Page | Component | Feature | Bug Fix | Enhancement | Module
**Size:** Small | Medium | Large | Module
**Status:** Draft
**Created:** {date}
**Priority:** High | Medium | Low
**Parent:** {link to parent spec if this is a sub-spec}
```

## Step 5: After Writing

1. Present spec summary to user
2. Ask if anything needs adjustment before implementation
3. Once approved, the spec serves as the implementation guide

## Rules

- **Scale to the request** — small fix = minimal spec, full module = detailed spec with sub-specs
- **Always research before writing** — read skills, search codebase
- **Use exact design tokens** — never invent values, pull from design-token skill
- **Use exact layout patterns** — reference by number from layout-creator skill
- **List real files** — search and confirm paths exist before referencing
- **Reuse existing components** — search packages/ui/src/ and list what to reuse
- **Update existing specs** — for bug fixes on features that have specs, update don't duplicate
