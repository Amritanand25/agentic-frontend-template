# Native HTML Scope Rules

**Date:** 2026-04-04
**Context:** User corrected initial approach that banned ALL native HTML everywhere

## Summary

- Native HTML ban applies ONLY to `apps/web/src/` code
- Inside `packages/ui/src/` (where components are built), native HTML is allowed
- But even in packages/ui, all styles must use design tokens (`var(--primary-50)`, `var(--space-16)`, etc.)
- Never hardcode hex colors, px values, or raw CSS values anywhere

## Why

- Components in `packages/ui/src/` are wrappers around native HTML — they need native elements
- The ban prevents app-level code from bypassing the design system
- The hook `native-html-check.sh` enforces this by only checking `apps/` files
