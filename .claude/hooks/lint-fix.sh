#!/bin/bash

# ─── ESLint Check Hook ────────────────────────────────────────────────────────
#
# Event:   Stop
# Purpose: Runs full project ESLint check after Claude finishes a task.
#
# Why:     Instead of linting every single file edit (noisy, slow), we lint
#          once when Claude is done. If errors are found, the output is fed
#          back to Claude so it can see and resolve them automatically.
#          This catches unused imports, rule violations, and code quality
#          issues across all changed files in one pass.
#
# Input:   JSON on stdin (stop event metadata — not used here)
# Output:  ESLint errors/warnings (fed back to Claude for auto-resolution)
# Exit 0:  Always (lint errors are informational, Claude will fix them)
# ───────────────────────────────────────────────────────────────────────────────

# Run project-wide lint
LINT_OUTPUT=$(yarn lint 2>&1)
LINT_EXIT=$?

if [ $LINT_EXIT -ne 0 ]; then
  echo "ESLint found issues:"
  echo "$LINT_OUTPUT" | tail -30
fi

exit 0
