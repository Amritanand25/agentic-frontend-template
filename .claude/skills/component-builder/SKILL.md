---
name: component-builder
description: React component creation with LLD, CVA variants, specs, a11y, and design tokens. Use for creating/refactoring any UI component.
---

# Component Builder

## Step 0: Check Existing First

1. Search `packages/ui/src/` (61+ components)
2. If close match → modify existing (add variant/prop)
3. If no match → search for package → `yarn check-pkg`
4. If no package → create using design tokens

**During creation:** If the new component needs sub-components (Button, ScrollArea, Input, etc.), search and reuse existing ones from `packages/ui/src/`. Never recreate what already exists.

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
