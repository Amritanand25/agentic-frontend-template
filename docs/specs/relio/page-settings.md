# Settings Page

**Type:** Page
**Size:** Medium
**Status:** Implemented (theme switching, members UI, timezone)
**Created:** 2026-03-28
**Priority:** Medium
**Parent:** [Relio CRM Platform](./module-relio-crm.md)

## Overview

Workspace settings page with sidebar navigation between sections: General, Members, Billing, Integrations, API. General section includes functional theme switching and timezone selection.

### Implementation Notes

**What's built (`pages/app/settings/index.tsx`):**

- Sidebar navigation (5 sections: General, Members, Billing, Integrations, API)
- Active section highlighting with `ChevronRight` indicator
- **General section:**
  - Workspace name input
  - Workspace URL display
  - **Functional theme selector** — 3 theme cards (Falcon/Phoenix/Jarvis) using `useTheme()` from `ThemeProvider`
  - Timezone selector using `@repo/ui` `Select` component
  - Danger zone (delete workspace button)
- **Members section:**
  - Team member list with avatars, roles (Admin/Member/Viewer), last active
  - Invite by email with role selector
  - Roles & permissions info cards
- **Billing, Integrations, API** — placeholder sections

**Key technical decisions:**

- Theme switching uses `ThemeProvider` context (`contexts/theme-context.tsx`)
- Sets `data-theme` attribute on `document.documentElement` (falcon/phoenix/jarvis)
- Persists theme to localStorage via key `ds-theme`
- Timezone selector uses `@repo/ui` `Select` component (replaced native `<select>`)
- Role selector in Members uses `@repo/ui` `Select` (replaced native `<select>`)

## Layout Pattern

```
┌─────────────────────────────────────────────────┐
│ Settings                                         │
│ Manage your workspace settings and preferences   │
├──────────────┬──────────────────────────────────┤
│ > General    │  [Workspace Information Card]     │
│   Members    │  [Theme Selection Card]           │
│   Billing    │  [Timezone Card]                  │
│   Integrations│ [Danger Zone Card]               │
│   API        │                                   │
│   240px      │                                   │
└──────────────┴──────────────────────────────────┘
```

## Components Used (from @repo/ui)

- `Card`, `CardContent`, `CardHeader`, `CardTitle`
- `Button`, `Input`, `Label`, `Separator`
- `Avatar`, `AvatarFallback`
- `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`

## Theme System

The theme selector connects to `ThemeProvider` which:

1. Reads initial theme from `localStorage.getItem("ds-theme")` or defaults to `"falcon"`
2. Sets `data-theme` attribute on `<html>` element
3. CSS tokens in `packages/theme/src/tokens.css` respond via `[data-theme="falcon"]`, `[data-theme="phoenix"]`, `[data-theme="jarvis"]`
4. Each theme overrides `--primary-10` through `--primary-60` CSS variables

## File Changes

| File                                        | Status      | Description                          |
| ------------------------------------------- | ----------- | ------------------------------------ |
| `apps/web/src/pages/app/settings/index.tsx` | ✅ Created  | Settings page with sections          |
| `apps/web/src/contexts/theme-context.tsx`   | ✅ Created  | ThemeProvider (data-theme + persist) |
| `apps/web/src/App.tsx`                      | ✅ Modified | Wrapped app with ThemeProvider       |

## What's Next

- 🚧 Billing section (plan display, usage, payment method)
- 🚧 Integrations section (connected apps list, OAuth)
- 🚧 API section (API keys, webhooks, usage)
- 🚧 Dark mode toggle in settings (currently via separate component)

---

**Depends on:** ThemeProvider, auth-store (for current user/tenant context)
