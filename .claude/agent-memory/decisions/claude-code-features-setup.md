# Claude Code Features Setup

**Date:** 2026-04-04
**Context:** Researched and implemented missing Claude Code features for the project

## Features Added

1. **Agent persistent memory** (`memory: project`) — all 3 agents retain learnings across sessions
2. **Permissions allow list** — auto-approves Read, Glob, Grep, yarn lint/format/test/build, npx tsc/prettier
3. **Worktree symlinks** — `node_modules` and `.yarn` symlinked instead of copied for parallel agents
4. **Path-specific rules** — component-catalog scoped to `.tsx/.ts`, architecture to `apps/**/packages/**`, best-practices to `apps/web/**`
5. **UserPromptSubmit hook** — injects design system reminder before every prompt
6. **Auto mode config** — allows safe operations like component creation and test writing
7. **`.worktreeinclude`** — copies `.env.example` and `.env.local.example` into worktrees
8. **`CLAUDE.local.md.example`** — template for per-developer overrides (gitignored)
9. **Skill evals** — test cases for ui-ux-design (3), spec-creator (2), layout-creator (2)

## File Placement

- `.worktreeinclude` — MUST be at project root (Git reads from repo root)
- `CLAUDE.local.md.example` — MUST be at project root (loaded alongside CLAUDE.md)
- Hooks — in `.claude/hooks/`, registered in `.claude/settings.json`
