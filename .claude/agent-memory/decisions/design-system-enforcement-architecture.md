# Design System Enforcement Architecture

**Date:** 2026-04-04
**Context:** Built multi-layer enforcement system to ensure Claude always uses @repo/ui components and design tokens

## Summary

- Enforcement uses 5 layers: CLAUDE.md rules, agent MANDATORY sections, hooks, path-specific rules, skill evals
- Each layer catches violations the others might miss
- CLAUDE.md is the single source of truth — agents/skills reference it, not duplicate it

## Layers

1. **CLAUDE.md** — BANNED table mapping native HTML to @repo/ui equivalents, loaded every conversation
2. **Agent frontmatter** — All 3 agents have MANDATORY component reuse workflow sections
3. **PostToolUse hook** (`native-html-check.sh`) — Warns when Edit/Write creates native HTML in `apps/*.tsx`
4. **UserPromptSubmit hook** (`design-system-reminder.sh`) — Injects 5-point reminder before every prompt
5. **Skill evals** — Test cases validate skills produce correct output using @repo/ui components
6. **Path-specific rules** — component-catalog.md only fires for `.tsx`/`.ts` files, reducing noise
