#!/bin/bash

# ─── Prevent Secrets Hook ─────────────────────────────────────────────────────
#
# Event:   PreToolUse (Edit | Write)
# Purpose: BLOCKS Claude from writing to sensitive files (.env, credentials,
#          secret keys, tokens).
#
# Why:     Security guardrail. Even if Claude is asked to create or edit
#          .env files, API key files, or credential configs — this hook
#          prevents it. Secrets should never be committed or AI-generated.
#          Aligns with OWASP best practices and our security-guardian skill.
#
# Input:   JSON on stdin from Claude Code with tool_input.file_path
# Exit 0:  Allow the write (safe file)
# Exit 2:  BLOCK the write (sensitive file — stderr shown to Claude)
# ───────────────────────────────────────────────────────────────────────────────

INPUT=$(cat)

FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Block writes to sensitive files
case "$FILE_PATH" in
  *.env|*.env.*|*credentials*|*secret*|*.pem|*.key|*token*)
    echo "BLOCKED: Cannot write to sensitive file: $FILE_PATH" >&2
    echo "Secrets must never be AI-generated or committed. Use environment variables instead." >&2
    exit 2
    ;;
esac

exit 0
