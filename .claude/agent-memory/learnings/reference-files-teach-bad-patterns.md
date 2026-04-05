# Reference Files Can Teach Bad Patterns

**Date:** 2026-04-04
**Context:** Found skill reference examples using native HTML, undermining design system enforcement

## Summary

- Skill reference files in `.claude/skills/*/references/` are used as examples by agents
- If references contain native `<input>`, `<button>`, `alert()` etc., agents copy that pattern
- Fixed `api-integration/references/basic-api-setup.md` — replaced `<input>` with `Input` from @repo/ui, `alert()` with `notify()`
- Fixed `api-integration/references/optimistic-updates.md` — replaced `<button>` with `Button` from @repo/ui

## Lesson

- Always audit reference/example files when adding new rules
- References are high-leverage: one bad example = many bad outputs
