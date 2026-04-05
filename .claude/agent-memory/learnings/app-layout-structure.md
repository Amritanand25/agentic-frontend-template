# App Layout Structure

**Date:** 2026-04-04
**Context:** Documented layout so agents don't recreate sidebar/header

## Summary

- All app pages render inside `AppLayout` (`apps/web/src/layouts/app-layout.tsx`)
- Left sidebar: fixed, collapsible (260px / 64px), workspace switcher, nav, user profile
- Top header: always visible (56px), breadcrumbs, actions
- Main content: `<Outlet />` renders page content below header, right of sidebar
- Command palette: `Cmd+K` search built in

## Available Layouts

| Layout             | File                            | Use For                           |
| ------------------ | ------------------------------- | --------------------------------- |
| `AppLayout`        | `layouts/app-layout.tsx`        | Main app pages (sidebar + header) |
| `AuthLayout`       | `layouts/auth-layout.tsx`       | Login, signup, forgot password    |
| `ComponentsLayout` | `layouts/components-layout.tsx` | Component showcase/docs           |
| `SidebarNav`       | `layouts/sidebar-nav.tsx`       | Reusable sidebar nav component    |

## Key Rule

When building new pages, they render inside AppLayout via `<Outlet />`. Do NOT recreate sidebar or header.
