# Relio CRM - Specification Documentation

> **Product:** Relio - Modern, customizable CRM platform
> **Focus:** Frontend UI/UX specifications only (no backend)
> **Created:** March 28, 2026
> **Inspiration:** Attio CRM + Custom database features

## 📋 Overview

Relio is a flexible, data-first CRM that allows users to:

- Create custom databases with multiple field types
- Manage conversations across WhatsApp, Email, and Instagram
- Build visual workflow automations
- Visualize data through customizable dashboards
- Collaborate with team members via comments and mentions

## 🏗️ Architecture

- **Framework:** React 19 + TypeScript (strict mode)
- **Build Tool:** Vite 8.0.1
- **Styling:** Tailwind CSS v4 + Design Tokens
- **State:** Zustand (global) + TanStack Query (server) + React Context (page-scoped)
- **UI Components:** shadcn/ui (62+ components from packages/ui)
- **Data Grid:** react-data-grid (virtualized tables)
- **Workflow Builder:** @xyflow/react (React Flow v12)
- **Icons:** Lucide React
- **Multi-Tenancy:** Organization → Tenant (workspace) → User

## 📁 Specification Files

### 1. **Parent Spec**

- **[module-relio-crm.md](./module-relio-crm.md)** - Overall platform architecture, tech stack, data models, implementation phases

### 2. **Core Data Features**

- **[page-data-table.md](./page-data-table.md)** - Virtualized editable table with 12+ field types, inline editing, filtering, sorting
- **[feature-database-builder.md](./feature-database-builder.md)** - Custom object/field creator with drag-and-drop field reordering

### 3. **Analytics & Visualization**

- **[page-dashboard.md](./page-dashboard.md)** - Customizable dashboard with KPIs, charts (line, bar, pie, funnel), drag-and-drop widgets

### 4. **Communication**

- **[feature-conversations.md](./feature-conversations.md)** - Unified inbox for WhatsApp, Email, Instagram with real-time updates

### 5. **Automation**

- **[feature-workflow-builder.md](./feature-workflow-builder.md)** - Visual workflow automation (triggers → conditions → actions)

### 6. **Discovery & Navigation**

- **[feature-search-filters.md](./feature-search-filters.md)** - Global search (⌘K), advanced filters, saved views

### 7. **Collaboration**

- **[feature-collaboration.md](./feature-collaboration.md)** - Comments, @mentions, activity timeline, record watching

### 8. **Authentication**

- **[page-auth.md](./page-auth.md)** - Login, signup, org selector, tenant selector with OAuth support

### 9. **Settings**

- **[page-settings.md](./page-settings.md)** - Workspace settings, functional theme switching, members management

## 🎨 Design System

**Themes:**

- Falcon (Blue) - Default
- Phoenix (Purple)
- Jarvis (Teal)

**Modes:** Light / Dark

**Key Design Tokens:**

```css
/* Colors */
--primary-50:
  #3535f3 (Falcon Light) --surface-0: #ffffff (Cards, modals)
    --text-default: #141414 /* Typography */ Font: Inter (body),
  Inter Display (headings) Sizes: 11px (xs) to 88px (8xl) /* Spacing */ Section
    gaps: 24px Card padding: 24px Field spacing: 16px;
```

## 🔑 Key Features — Implementation Status

### Data Table (Priority: High) — ✅ v1 Implemented

✅ Virtualized rendering via `react-data-grid` (named export `DataGrid`)
✅ Cell renderers for 9 field types (text, number, email, phone, url, date, boolean, select, multiselect)
✅ Multi-level column sorting (click headers)
✅ Row selection with checkboxes (uses `@repo/ui` `Checkbox`)
✅ Client-side search filtering
✅ Add columns via "+" button with field type picker (9 types)
✅ Create new records via dialog
🚧 Inline editing (not yet — display only)
🚧 Advanced filtering (AND/OR conditions)
🚧 Saved views
🚧 Column reorder / show-hide

### Database Builder (Priority: High) — ✅ Partially Implemented

✅ Create custom objects via `CreateObjectDialog` (name + icon picker)
✅ Add fields to objects via "+" column in table header
✅ Schema store (`schema-store.ts`) with `addObject`, `addField`, `updateObject`, `deleteObject`
✅ Default seed objects: Companies (10 fields), Contacts (8 fields), Deals (7 fields)
✅ Objects listing page with cards showing field count + record count
🚧 Field editor modal (full config: required, unique, type-specific settings)
🚧 Drag-and-drop field reordering
🚧 Object templates selector
🚧 Relationship configuration

### Dashboard (Priority: High) — ✅ UI Shell Built

✅ Dashboard page with mock KPI cards and chart placeholders
🚧 recharts integration
🚧 Drag-and-drop widget positioning
🚧 Real-time data updates
🚧 Export as PDF/PNG

### Conversations (Priority: High) — ✅ UI Shell Built

✅ Master-detail layout (conversation list + message thread)
✅ Channel badges (WhatsApp, Email, Web)
✅ Message bubbles with sent/received styling
✅ Persistent scrollbars (`ScrollArea type="always"`)
✅ Message text wraps to multiple lines (`line-clamp-2`)
🚧 Real-time message sync
🚧 Message compose + send
🚧 File attachments
🚧 Typing indicators

### Workflow Builder (Priority: Medium) — ✅ v1 Implemented

✅ Visual node-based editor (`@xyflow/react`)
✅ 3 trigger types (Record Created, Record Updated, Scheduled)
✅ Condition node (If/Else with field, operator, value)
✅ 5 action types (Send Email, Update Record, Create Task, Notify, Delay)
✅ Node sidebar with draggable node types
✅ Full-screen builder page
✅ Workflow list page with mock workflows
🚧 Save/load workflow persistence
🚧 Test workflow execution

### Search & Filters (Priority: Medium) — ✅ Partially Implemented

✅ Global search via ⌘K `CommandDialog` (in `app-layout.tsx`)
✅ Navigate to pages (Dashboard, Inbox, Workflows, Settings)
✅ Navigate to objects (dynamic list from schema store with record counts)
🚧 Record-level search results
🚧 Saved filter views
🚧 Quick filter presets
🚧 Advanced filter builder (AND/OR)

### Settings (Not in original spec) — ✅ Implemented

✅ General settings (workspace name, URL)
✅ **Functional theme selector** (Falcon/Phoenix/Jarvis via `ThemeProvider`)
✅ Timezone selector
✅ Members management UI (team list, role badges, invite form)
✅ Danger zone (delete workspace)
✅ Sidebar navigation between settings sections

### Collaboration (Priority: Low) — 🚧 Not Started

🚧 Comments on records
🚧 @mentions with notifications
🚧 Activity timeline
🚧 Watch/unwatch records

## 📊 Implementation Phases

### **Phase 1: Foundation** ✅ COMPLETE

1. ✅ Auth pages (login, signup, org selector, tenant selector)
2. ✅ App layout with collapsible sidebar + header
3. ✅ Multi-tenant routing (`/:orgSlug/:tenantSlug/app/*`)
4. ✅ Global stores (auth-store, org-store, tenant-store, schema-store)
5. ✅ Theme system (ThemeProvider context, functional theme switching)
6. ✅ ProtectedRoute component
7. ✅ AuthLayout component

### **Phase 2: Data Core** ✅ MOSTLY COMPLETE

1. ✅ Objects listing page (card grid with icon, name, field/record count)
2. ✅ Object detail page with DataTable (react-data-grid)
3. ✅ Create Object dialog (name + icon picker)
4. ✅ Create Record dialog
5. ✅ Add columns via "+" button in table header (9 field types)
6. ✅ Schema store with seed data (Companies, Contacts, Deals)
7. ✅ Records store with mock data
8. 🚧 Inline cell editing
9. 🚧 Advanced filter builder UI

### **Phase 3: Features** 🚧 IN PROGRESS

1. ✅ Dashboard page (UI shell with mock KPIs)
2. ✅ Global search (⌘K CommandDialog)
3. ✅ Settings page (functional theme selector, members, timezone)
4. 🚧 Dashboard widgets (recharts integration)
5. 🚧 Saved views / advanced filters
6. 🚧 Collaboration (comments, timeline)

### **Phase 4: Advanced** ✅ UI SHELLS BUILT

1. ✅ Conversations page (master-detail inbox UI)
2. ✅ Workflow builder (React Flow canvas with custom nodes)
3. 🚧 Message compose/send
4. 🚧 Workflow save/load persistence

### **Phase 5: Polish** 🚧 NOT STARTED

1. 🚧 Performance optimization
2. 🚧 Accessibility audit (WCAG 2.1 AA)
3. 🚧 Testing (>90% coverage target)

## 🎯 Performance Targets

| Metric       | Target       | Strategy                         |
| ------------ | ------------ | -------------------------------- |
| FCP          | < 1.5s       | Code splitting, lazy loading     |
| TTI          | < 3.5s       | Defer non-critical JS            |
| Bundle       | < 200KB      | Tree shaking, dynamic imports    |
| Table render | < 16ms/frame | Virtualization (react-data-grid) |
| Coverage     | > 90%        | Vitest + React Testing Library   |

## 📦 Packages to Install

Before implementation, check and install:

```bash
# Core dependencies (installed)
✅ react@19.2.4
✅ react-dom@19.2.4
✅ zustand@5.0
✅ lucide-react@1.7.0
✅ react-data-grid              # Virtualized tables
✅ @xyflow/react                # Workflow builder (React Flow v12)

# Planned dependencies (check before installing)
yarn check-pkg recharts          # Dashboard charts
yarn check-pkg react-grid-layout  # Dashboard drag-and-drop
yarn check-pkg @dnd-kit/core      # Field reordering drag-and-drop
```

## 📝 Mock Data

Each spec includes comprehensive mock data for development:

- Custom objects (Companies, Contacts, Deals)
- Records with all field types
- Conversations with messages
- Workflows with nodes and edges
- Dashboard widgets with chart data

## ✅ What's Done vs What's Next

**Done (functional with mock data):**

- Auth flow (login → org select → tenant select → app)
- App layout with sidebar, search (⌘K), theme switching
- Objects listing + detail pages with DataTable
- Create objects + add columns + add records
- Conversations inbox UI
- Workflow builder with React Flow
- Settings with functional theme selector

**Next priorities:**

1. Inline cell editing in DataTable
2. Advanced filter builder (AND/OR conditions)
3. Dashboard recharts integration (KPIs, line/bar/pie charts)
4. Message compose/send in conversations
5. Collaboration (comments, @mentions, activity timeline)
6. Testing (>90% coverage)

## 🚀 Next Steps

1. **Pick a TODO item** from any spec's 🚧 section
2. **Follow file structure** in each spec's "File Changes" section
3. **Use existing components** from `packages/ui/src/` (62+ available)
4. **Follow design tokens** — never hardcode colors/spacing
5. **Use existing stores** — auth-store, schema-store, records-store already set up

## 📚 Resources

- **Design System:** See ui-ux-design skill for exact tokens
- **Layout Patterns:** See layout-creator skill for 12 page patterns
- **Architecture:** [/.claude/rules/architecture.md](../../.claude/rules/architecture.md)
- **Best Practices:** [/.claude/rules/frontend-best-practices.md](../../.claude/rules/frontend-best-practices.md)

## 🔗 External References

**Attio Research:**

- [Attio CRM Overview](https://www.salesforge.ai/directory/sales-tools/attio)
- [Attio CRM Review 2026](https://www.authencio.com/blog/attio-crm-review-features-pricing-customization-alternatives)
- [Attio Workflow Automation](https://attio.com/platform/workflows)

---

**Created by:** spec-creator agent
**Date:** 2026-03-28
**Updated:** 2026-03-28
**Version:** 1.1.0

**Status:** Phase 1 complete, Phase 2-4 UI shells built, Phase 5 not started
