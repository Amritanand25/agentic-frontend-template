#!/bin/bash

# ─── TypeScript Type-Check Hook ───────────────────────────────────────────────
#
# Event:   Stop
# Purpose: Runs full TypeScript type-check after Claude finishes responding.
#
# Why:     ESLint catches syntax/style issues per-file, but TypeScript errors
#          (missing props, wrong types, broken imports) only surface with a
#          full project type-check. Running on Stop catches these before the
#          user tries to build or deploy. Ensures strict mode compliance.
#
# Input:   JSON on stdin (stop event metadata)
# Output:  TypeScript errors (fed back to Claude for awareness)
# Exit 0:  Always allow (type errors are informational, not blocking)
# ───────────────────────────────────────────────────────────────────────────────

# Run type-check on the web app
npx tsc --noEmit --project apps/web/tsconfig.app.json 2>&1 | head -20 || true

exit 0
