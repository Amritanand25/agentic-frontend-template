# Relio CRM Platform

**Type:** Module
**Size:** Large
**Status:** In Progress (Phase 1 complete, Phase 2-4 UI shells built)
**Created:** 2026-03-28
**Updated:** 2026-03-28
**Priority:** High

## Overview

Relio is a modern, highly customizable CRM platform similar to Attio, built with multi-tenancy support. Users can create custom databases with flexible field types, manage conversations across multiple channels (WhatsApp, Email, Instagram), automate workflows, and visualize data through interactive dashboards.

## Product Vision

A flexible, data-first CRM that adapts to any business model through:

- **Custom data models** - Users define their own objects, fields, and relationships
- **Unified communication** - All customer conversations in one place
- **Visual automation** - No-code workflow builder for process automation
- **Real-time collaboration** - Teams work together with comments, mentions, and live updates
- **Multi-tenant architecture** - Organizations → Tenants (workspaces) → Users

## Architecture

### Tech Stack

- **Framework:** React 19 + TypeScript strict mode
- **Build:** Vite 8.0.1
- **Styling:** Tailwind v4 + CSS design tokens
- **UI Components:** shadcn/ui (61+ components)
- **State Management:**
  - **Global:** Zustand (auth, tenant, org stores)
  - **Server:** TanStack Query (API data, caching)
  - **Page-scoped:** React Context
- **Icons:** Lucide React
- **Routing:** React Router DOM 7.13.1

### Multi-Tenant Hierarchy

```
Organization (Org)
└── Tenant (Workspace/Team)
    └── User (Member with roles)
```

**Route structure:** `/:orgSlug/:tenantSlug/app/*`

**Data isolation:**

- All API calls include `X-Tenant-ID` and `X-Org-ID` headers
- LocalStorage scoped: `org-${orgId}-tenant-${tenantId}-${key}`
- React Query keys: `['resource', orgId, tenantId, ...params]`

### Core Modules

| Module               | Description                                                             | Status            | Spec File                                                    |
| -------------------- | ----------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------ |
| **Auth**             | Login, signup, tenant selection, role-based access                      | ✅ Implemented    | [page-auth.md](./page-auth.md)                               |
| **Data Table**       | Virtualized table via react-data-grid with sorting, search, add columns | ✅ v1 Implemented | [page-data-table.md](./page-data-table.md)                   |
| **Database Builder** | Create objects + add fields via table header "+" button                 | ✅ Partial        | [feature-database-builder.md](./feature-database-builder.md) |
| **Dashboard**        | KPI cards and chart placeholders (UI shell)                             | 🚧 UI Shell       | [page-dashboard.md](./page-dashboard.md)                     |
| **Conversations**    | Unified inbox master-detail layout with mock messages                   | 🚧 UI Shell       | [feature-conversations.md](./feature-conversations.md)       |
| **Workflow Builder** | Visual React Flow canvas with trigger/condition/action nodes            | ✅ v1 Implemented | [feature-workflow-builder.md](./feature-workflow-builder.md) |
| **Search & Filters** | ⌘K CommandDialog navigating to pages + objects                          | ✅ Partial        | [feature-search-filters.md](./feature-search-filters.md)     |
| **Settings**         | Theme selector (functional), members, timezone                          | ✅ Implemented    | (in settings page)                                           |
| **Collaboration**    | Comments, @mentions, activity timeline                                  | 🚧 Not Started    | [feature-collaboration.md](./feature-collaboration.md)       |

## Data Model (Frontend)

### Core Entities

```typescript
// Custom object (table) created by users
interface CustomObject {
  id: string;
  tenantId: string;
  name: string; // "Companies", "Deals", "Contacts"
  icon: string; // Lucide icon name
  fields: Field[];
  createdAt: string;
  updatedAt: string;
}

// Field definition
interface Field {
  id: string;
  objectId: string;
  name: string;
  type: FieldType;
  config: FieldConfig; // Type-specific settings
  required: boolean;
  position: number; // Column order
}

type FieldType =
  | "text"
  | "number"
  | "email"
  | "phone"
  | "url"
  | "date"
  | "datetime"
  | "boolean"
  | "select"
  | "multiselect"
  | "relation"
  | "file"
  | "richtext"
  | "formula"
  | "rollup";

// Record (row) in a custom object
interface Record {
  id: string;
  objectId: string;
  tenantId: string;
  data: Record<string, any>; // fieldId → value
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}
```

## State Management Strategy

### Global Stores (Zustand)

Located in: `apps/web/src/stores/`

```typescript
// Auth store
interface AuthStore {
  user: User | null;
  token: string | null;
  login: (credentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Org store
interface OrgStore {
  currentOrg: Organization | null;
  orgs: Organization[];
  setCurrentOrg: (orgId: string) => void;
  reset: () => void;
}

// Tenant store
interface TenantStore {
  currentTenant: Tenant | null;
  tenants: Tenant[];
  setCurrentTenant: (tenantId: string) => void;
  theme: "falcon" | "phoenix" | "jarvis";
  features: Record<string, boolean>; // Feature flags
  reset: () => void;
}

// Database schema store — IMPLEMENTED in stores/schema-store.ts
interface SchemaStore {
  objects: Map<string, CustomObject>; // objectId → object
  isLoading: boolean;
  loadSchema: (tenantId: string) => Promise<void>; // Seeds defaults if empty
  addObject: (object: CustomObject) => void;
  updateObject: (objectId: string, updates: Partial<CustomObject>) => void;
  deleteObject: (objectId: string) => void;
  addField: (objectId: string, name: string, type: FieldType) => void;
  getObject: (objectId: string) => CustomObject | undefined;
  getObjectsList: () => CustomObject[];
  reset: () => void;
}
```

### Server State (TanStack Query)

```typescript
// Query keys structure
const queryKeys = {
  objects: (tenantId: string) => ["objects", tenantId],
  object: (objectId: string, tenantId: string) => [
    "object",
    objectId,
    tenantId,
  ],
  records: (objectId: string, tenantId: string, filters: any) => [
    "records",
    objectId,
    tenantId,
    filters,
  ],
  record: (recordId: string, tenantId: string) => [
    "record",
    recordId,
    tenantId,
  ],
  conversations: (tenantId: string, channel?: string) => [
    "conversations",
    tenantId,
    channel,
  ],
  workflows: (tenantId: string) => ["workflows", tenantId],
};
```

## Design System

### Theme

- **Falcon (Blue)** - Default
- **Phoenix (Purple)** - Alternative
- **Jarvis (Teal)** - Alternative
- **Modes:** Light / Dark

### Key Colors

```css
/* Primary (Falcon theme, light mode) */
var(--primary-50)   /* #3535f3 - Main CTA color */
var(--primary-40)   /* #6464ff - Hover */
var(--primary-60)   /* #000093 - Active */

/* Surfaces */
var(--surface-0)    /* #ffffff - Cards, modals */
var(--surface-10)   /* #fafafa - Main content */
var(--surface-20)   /* #f5f5f5 - Sidebar */

/* Text */
var(--text-default)   /* #141414 */
var(--text-subdued-1) /* rgba(0,0,0,0.65) */
var(--text-subdued-2) /* #b5b5b5 */
```

### Typography

- **Font:** Inter (body), Inter Display (headings)
- **Sizes:** xs(11px), s(12px), m(14px), l(16px), xl(18px), 2xl(24px)
- **Weights:** 400 (regular), 500 (prominent), 600 (heading)

### Spacing

- **Section gaps:** 24px
- **Card padding:** 24px
- **Field spacing:** 16px
- **Item gaps:** 8-12px

## Performance Targets

| Metric          | Target       | Strategy                        |
| --------------- | ------------ | ------------------------------- |
| FCP             | < 1.5s       | Code splitting, lazy loading    |
| TTI             | < 3.5s       | Defer non-critical JS           |
| Bundle          | < 200KB      | Tree shaking, dynamic imports   |
| Table render    | < 16ms/frame | Virtualization (react-virtual)  |
| Search response | < 100ms      | Debounced input, indexed search |

## Responsive Breakpoints

| Breakpoint | Width      | Layout                           |
| ---------- | ---------- | -------------------------------- |
| Mobile     | < 768px    | Stack, hide sidebar              |
| Tablet     | 768-1024px | 2-col grids, collapsible sidebar |
| Desktop    | > 1024px   | Full layouts, fixed sidebar      |

## Implementation Order

1. **Phase 1: Foundation** ✅ COMPLETE
   - ✅ Auth pages (login, signup, org selector, tenant selector)
   - ✅ App layout with collapsible sidebar, header, ⌘K search
   - ✅ Multi-tenant routing (`/:orgSlug/:tenantSlug/app/*`)
   - ✅ Global stores (auth-store, org-store, tenant-store, schema-store)
   - ✅ ThemeProvider with functional theme switching (Falcon/Phoenix/Jarvis)
   - ✅ ProtectedRoute, AuthLayout components

2. **Phase 2: Data Core** ✅ MOSTLY COMPLETE
   - ✅ Objects listing page (cards) + Object detail page (DataTable)
   - ✅ DataTable with react-data-grid (sorting, search, row selection)
   - ✅ Create objects (dialog) + Add fields ("+" column header)
   - ✅ Create records (dialog) + Records store with mock data
   - 🚧 Inline cell editing
   - 🚧 Advanced filter builder UI

3. **Phase 3: Features** 🚧 IN PROGRESS
   - ✅ Dashboard page (UI shell with mock KPIs)
   - ✅ Global search (⌘K CommandDialog)
   - ✅ Settings page (theme, members, timezone)
   - 🚧 Dashboard widgets (recharts)
   - 🚧 Saved views / advanced filters
   - 🚧 Collaboration (comments, timeline)

4. **Phase 4: Advanced** ✅ UI SHELLS BUILT
   - ✅ Conversations page (master-detail inbox UI)
   - ✅ Workflow builder (React Flow canvas with custom nodes)
   - 🚧 Message compose/send
   - 🚧 Workflow save/load persistence

5. **Phase 5: Polish** 🚧 NOT STARTED
   - 🚧 Performance optimization
   - 🚧 Accessibility audit
   - 🚧 Testing (>90% coverage)

## File Structure (Actual)

```
apps/web/src/
├── pages/
│   ├── login-page.tsx              # ✅ Login page
│   ├── signup-page.tsx             # ✅ Signup page
│   ├── select-org-page.tsx         # ✅ Org selector
│   ├── select-tenant-page.tsx      # ✅ Tenant selector
│   ├── home-page.tsx               # ✅ Landing page
│   └── app/                        # Main app routes (/:orgSlug/:tenantSlug/app/*)
│       ├── dashboard/index.tsx     # ✅ Dashboard (KPI shell)
│       ├── objects/index.tsx       # ✅ Objects listing (cards)
│       ├── objects/[objectId]/index.tsx  # ✅ Object detail (DataTable)
│       ├── conversations/index.tsx # ✅ Conversations inbox
│       ├── workflows/index.tsx     # ✅ Workflow list
│       ├── workflows/builder.tsx   # ✅ Workflow builder (React Flow)
│       └── settings/index.tsx      # ✅ Settings (theme, members)
├── features/
│   ├── tables/                     # ✅ Table feature
│   │   ├── components/data-table.tsx       # react-data-grid wrapper
│   │   ├── components/create-record-dialog.tsx
│   │   ├── components/create-object-dialog.tsx
│   │   ├── stores/records-store.ts         # Zustand records store
│   │   ├── utils/cell-formatters.ts        # Format values by type
│   │   ├── mock-data.ts                    # Mock records
│   │   ├── types.ts                        # TableRecord, TableColumn, etc.
│   │   └── index.ts                        # Barrel exports
│   └── workflows/                  # ✅ Workflow feature
│       ├── components/workflow-canvas.tsx
│       ├── components/trigger-node.tsx
│       ├── components/condition-node.tsx
│       ├── components/action-node.tsx
│       ├── components/node-sidebar.tsx
│       ├── types.ts
│       └── index.ts
├── stores/
│   ├── auth-store.ts               # ✅ Auth, login/signup, org/tenant selection
│   ├── org-store.ts                # ✅ Org state
│   ├── tenant-store.ts             # ✅ Tenant state
│   └── schema-store.ts             # ✅ Custom objects + fields
├── contexts/
│   ├── theme-context.tsx           # ✅ ThemeProvider (data-theme attribute)
│   ├── auth-context.tsx
│   ├── org-context.tsx
│   └── tenant-context.tsx
├── layouts/
│   ├── app-layout.tsx              # ✅ Sidebar + header + ⌘K search
│   ├── auth-layout.tsx             # ✅ Auth pages wrapper
│   ├── sidebar-nav.tsx             # ✅ Sidebar navigation
│   └── components-layout.tsx       # Component library layout
├── components/
│   ├── ProtectedRoute.tsx          # ✅ Route guard
│   └── theme-toggle.tsx            # ✅ Dark/light toggle
└── types/
    ├── auth.ts                     # User, SignupData types
    ├── org.ts                      # Organization type
    ├── tenant.ts                   # Tenant type
    └── index.ts                    # Re-exports
```

## Sub-Specs

1. [Data Table Page](./page-data-table.md) - Virtualized, editable table
2. [Database Builder Feature](./feature-database-builder.md) - Custom objects/fields
3. [Dashboard Page](./page-dashboard.md) - KPIs and charts
4. [Conversations Feature](./feature-conversations.md) - Unified inbox
5. [Workflow Builder Feature](./feature-workflow-builder.md) - Visual automation
6. [Search & Filters Feature](./feature-search-filters.md) - Advanced search
7. [Collaboration Feature](./feature-collaboration.md) - Comments, timeline
8. [Auth Pages](./page-auth.md) - Login, signup, tenant selection

## Success Metrics

- **Performance:** All pages load < 2s, table renders 10k rows smoothly
- **Usability:** Users can create custom object + add 5 fields in < 3 minutes
- **Accessibility:** WCAG 2.1 AA compliant, keyboard navigable
- **Testing:** >90% code coverage, E2E tests for critical flows
- **Bundle:** Main chunk < 200KB gzipped

---

**Next Steps:**

1. Review this parent spec
2. Create detailed child specs for each module
3. Begin Phase 1 implementation (Auth + Foundation)

**Sources:**

- [Attio CRM Overview](https://www.salesforge.ai/directory/sales-tools/attio)
- [Attio CRM Review 2026](https://www.authencio.com/blog/attio-crm-review-features-pricing-customization-alternatives)
- [Attio Workflow Automation](https://attio.com/platform/workflows)
