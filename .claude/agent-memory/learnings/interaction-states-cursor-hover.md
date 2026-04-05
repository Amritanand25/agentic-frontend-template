# Interaction States Are Mandatory

**Date:** 2026-04-05
**Context:** User emphasized cursor:pointer, hover, pressed states are critical UI/UX

## Summary

- Every clickable element MUST have `cursor: pointer`
- Every clickable element MUST have visible hover feedback (bg change, shadow, etc.)
- Active/pressed state: `scale(0.98)` + darken one shade
- Transitions: 150ms ease for bg/color, 50ms for transform — never instant
- Custom clickable divs need: cursor:pointer, role="button", tabIndex=0, onKeyDown
- Disabled: `cursor: not-allowed` + 30% opacity
- User was frustrated these weren't being thought about proactively
