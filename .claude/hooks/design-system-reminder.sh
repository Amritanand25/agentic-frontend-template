#!/bin/bash

# ─── Design System Reminder Hook ────────────────────────────────────────────
#
# Event:   UserPromptSubmit
# Purpose: Injects a reminder about component reuse and design tokens before
#          Claude processes each user prompt. Ensures agents always check
#          existing components first.
#
# Input:   JSON on stdin (user prompt metadata)
# Output:  Reminder text (injected into Claude's context)
# Exit 0:  Always allow
# ───────────────────────────────────────────────────────────────────────────────

cat <<'EOF'
REMINDER: Before writing any UI code:
1. Check /.claude/rules/component-catalog.md (62+ components)
2. Search packages/ui/src/ for existing components
3. NEVER use native HTML (<input>, <button>, <select>, <table>, <textarea>, <label>, <hr>) in apps/ code — use @repo/ui equivalents
4. All visual values must use design tokens from packages/theme/src/tokens.css
5. Icons: Lucide React only
EOF

exit 0
