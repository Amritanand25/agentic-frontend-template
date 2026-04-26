---
name: component-builder
description: React component creation with LLD, CVA variants, specs, a11y, and design tokens. Use for creating/refactoring any UI component.
allowed-tools: Read Edit Write Bash Grep Glob
paths:
  - "packages/ui/src/**/*"
  - "apps/**/*.tsx"
---

# Component Builder

## Step 0: MANDATORY — Check Existing First

**NEVER skip this step. NEVER create a component that already exists.**

1. Read `/.claude/rules/component-catalog.md` (62+ components with all exports listed)
2. Search `packages/ui/src/` for existing components
3. If exact match → use it. `import { X } from "@repo/ui"`
4. If close match → modify existing (add variant/prop). Do NOT create duplicate
5. If no match → search for npm package → `yarn check-pkg`
6. If no package → create using design tokens in `packages/ui/src/`

**Native HTML rule:** Inside `packages/ui/src/` (building components), native HTML is allowed but must be styled with design tokens. In `apps/` code, NEVER use native HTML when `@repo/ui` has an equivalent.

**During creation:** If the new component needs sub-components (Button, ScrollArea, Input, etc.), import from `@repo/ui`. Never recreate what exists.

## Simple vs Complex

**Simple** (straight to code): <50 lines, 1-2 state vars — Button, Input, Badge, Avatar, Tag

**Complex** (create LLD first): >50 lines, 3+ state vars, compound components — DataTable, Dropdown, Modal, Accordion

## LLD Template (complex only)

Create document with: Purpose, Props Interface, File Structure, State Management, Accessibility, Performance, CVA Variants, Testing Strategy.

> See [references/complex-dropdown-example.md](./references/complex-dropdown-example.md)

## Component Sizes

| Component | Heights (px)                       |
| --------- | ---------------------------------- |
| Button    | XS=24, S=32, M=40, L=48, XL=64     |
| Input     | S=32, M=40, L=48                   |
| Modal     | XS=560, S=754, M=950, L=1392, Full |
| Badge/Tag | XS=20, S=24, M=28, L=32            |
| Dropdown  | S=32, M=40, L=48                   |
| Checkbox  | S=16, M=20, L=24                   |
| Icons     | XS/S=16, M=20, L=24, XL=32         |

**List density:** Compact=4px gap/32px h | Default=8px/40px | Comfortable=12px/48px+

## Key Patterns

1. **Compound Components** — multi-part with shared context
2. **CVA Variants** — type-safe style variants
3. **Controlled & Uncontrolled** — support both for form components
4. **Portals** — overlays render in document.body
5. **Virtualization** — lists >50 items

> See [references/simple-button-example.md](./references/simple-button-example.md)

## Checklist

- [ ] TypeScript interfaces
- [ ] CVA variants
- [ ] All states: hover, active, focus-visible, disabled, loading
- [ ] Design tokens (no hardcoded values)
- [ ] Semantic HTML + ARIA
- [ ] Keyboard navigation
- [ ] Ref forwarded
- [ ] Exported via index.ts
- [ ] Tests (90%+ coverage)
