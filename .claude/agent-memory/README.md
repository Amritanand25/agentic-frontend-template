# Agent Memory

Project-specific context stored by Claude agents. Organized by category, persists across conversations.

## Folder Structure

```
agent-memory/
├── bugs/           # Bug patterns, root causes, recurring issues
├── learnings/      # Implementation insights, gotchas, what worked
├── decisions/      # Architecture & design decisions with rationale
├── patterns/       # Reusable code patterns discovered during work
└── api/            # API shapes, endpoint mappings, data contracts
```

## Auto-Save Rules

After completing any task, save relevant context:

| What Happened            | Save To                  | Example                          |
| ------------------------ | ------------------------ | -------------------------------- |
| Fixed a bug              | `bugs/{area}-{issue}.md` | `bugs/dropdown-z-index.md`       |
| Learned a gotcha         | `learnings/{topic}.md`   | `learnings/react-19-use-hook.md` |
| Made a design choice     | `decisions/{feature}.md` | `decisions/auth-flow.md`         |
| Found a reusable pattern | `patterns/{pattern}.md`  | `patterns/form-validation.md`    |
| Mapped an API            | `api/{domain}.md`        | `api/users-endpoints.md`         |

## File Format

```markdown
# {Title}

**Date:** {YYYY-MM-DD}
**Context:** {What task triggered this}

## Summary

- Point-wise notes
- Keep it brief

## Details

{Only if needed — code snippets, before/after, root cause analysis}
```

## Rules

- Keep files small and focused — one topic per file
- Update existing files rather than creating duplicates
- Delete outdated entries when the codebase changes
- Never store secrets, tokens, or credentials
