#!/bin/bash

# ─── Prettier Auto-Format Hook ────────────────────────────────────────────────
#
# Event:   PostToolUse (Edit | Write)
# Purpose: Runs Prettier on every file Claude edits or creates.
#
# Why:     Keeps all code consistently formatted (indentation, trailing commas,
#          quote style, line length) without relying on pre-commit hooks.
#          Runs AFTER lint-fix so ESLint auto-fixes aren't overwritten.
#          Consistent formatting reduces noisy diffs in code review.
#
# Input:   JSON on stdin from Claude Code with tool_input.file_path
# Output:  Prettier output (silent on success)
# Exit 0:  Always allow (formatting is never a blocker)
# ───────────────────────────────────────────────────────────────────────────────

INPUT=$(cat)

FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Format supported file types
case "$FILE_PATH" in
  *.ts|*.tsx|*.js|*.jsx|*.css|*.json|*.md)
    npx prettier --write "$FILE_PATH" 2>/dev/null || true
    ;;
esac

exit 0
