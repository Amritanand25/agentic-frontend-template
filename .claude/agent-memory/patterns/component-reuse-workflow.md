# Component Reuse Workflow Pattern

**Date:** 2026-04-04
**Context:** Established mandatory 6-step workflow for all UI work

## Pattern

Before creating ANY UI element:

1. Check `/.claude/rules/component-catalog.md` (63 components with all exports)
2. Glob/Grep `packages/ui/src/` for existing components
3. If exists: `import { X } from "@repo/ui"`
4. If close match: extend existing component (add variant/prop), never duplicate
5. If not exists: search npm, run `yarn check-pkg <name>`
6. If no package: create in `packages/ui/src/` using `/component-builder` skill

## Key Components Often Missed

- `NotificationNudge` — was exported but missing from catalog, now added
- `DatePicker` — use instead of `<input type="date">`
- `TimePicker` — use instead of `<input type="time">`
- `notify()` — use instead of `window.alert()` or `window.confirm()`
