# SearchBar Component Created

**Date:** 2026-04-05
**Context:** User requested proper search bar with icon, not plain Input

## Summary

- Created `packages/ui/src/search-bar.tsx` — SearchBar component
- Has: Search icon (left), clear X button (appears when value exists), focus ring
- Props: `value`, `onChange(value: string)`, `onClear`, `placeholder`
- Plain `Input` with "Search..." placeholder is BANNED — always use `SearchBar`
- Exported from `@repo/ui` via index.ts
