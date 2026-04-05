#!/bin/bash

# ─── Native HTML Check Hook ─────────────────────────────────────────────────
#
# Event:   PostToolUse (Edit | Write)
# Purpose: Warns when native HTML elements are used in app code instead of
#          @repo/ui components. Does NOT check packages/ui/src/ where native
#          HTML is expected (that's where components are built).
#
# Input:   JSON on stdin from Claude Code with tool_input.file_path
# Output:  Warning message listing violations and correct @repo/ui alternatives
# Exit 0:  Always (warning only, does not block)
# ───────────────────────────────────────────────────────────────────────────────

INPUT=$(cat)

FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Only check .tsx files in apps/ directory (not packages/ui/src/)
case "$FILE_PATH" in
  */apps/*.tsx)
    ;;
  *)
    exit 0
    ;;
esac

# Check for native HTML that should use @repo/ui
VIOLATIONS=""

if grep -qE '<input\s' "$FILE_PATH" 2>/dev/null; then
  VIOLATIONS="$VIOLATIONS\n  <input> -> use Input, InputLabel, Checkbox, Switch from @repo/ui"
fi

if grep -qE '<select\s' "$FILE_PATH" 2>/dev/null; then
  VIOLATIONS="$VIOLATIONS\n  <select> -> use Select or Dropdown from @repo/ui"
fi

if grep -qE '<button\s' "$FILE_PATH" 2>/dev/null; then
  VIOLATIONS="$VIOLATIONS\n  <button> -> use Button from @repo/ui"
fi

if grep -qE '<textarea\s' "$FILE_PATH" 2>/dev/null; then
  VIOLATIONS="$VIOLATIONS\n  <textarea> -> use Textarea from @repo/ui"
fi

if grep -qE '<table\s|<tr\s|<td\s|<th\s' "$FILE_PATH" 2>/dev/null; then
  VIOLATIONS="$VIOLATIONS\n  <table>/<tr>/<td> -> use Table, TableHeader, TableBody, TableRow, TableCell from @repo/ui"
fi

if grep -qE 'type="date"' "$FILE_PATH" 2>/dev/null; then
  VIOLATIONS="$VIOLATIONS\n  input[type=date] -> use DatePicker from @repo/ui"
fi

if grep -qE 'type="time"' "$FILE_PATH" 2>/dev/null; then
  VIOLATIONS="$VIOLATIONS\n  input[type=time] -> use TimePicker from @repo/ui"
fi

if grep -qE '<label\s' "$FILE_PATH" 2>/dev/null; then
  VIOLATIONS="$VIOLATIONS\n  <label> -> use Label or InputLabel from @repo/ui"
fi

if grep -qE '<hr\s|<hr/>' "$FILE_PATH" 2>/dev/null; then
  VIOLATIONS="$VIOLATIONS\n  <hr> -> use Separator from @repo/ui"
fi

if [ -n "$VIOLATIONS" ]; then
  echo "NATIVE HTML DETECTED in $FILE_PATH"
  echo -e "Replace with @repo/ui components:$VIOLATIONS"
  echo "See /.claude/rules/component-catalog.md for full list."
fi

exit 0
