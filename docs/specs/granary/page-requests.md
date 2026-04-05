# Requests Page & Request Detail Page

**Type:** Page
**Size:** Large
**Status:** Draft
**Created:** 2026-04-04
**Priority:** High
**Parent:** [module-granary.md](./module-granary.md)

## Overview

The Requests module has two pages: (1) a listing page showing all delist/list requests with status tabs and filtering, and (2) a detail page for viewing a specific request's articles, stores, and metadata. All data is mock/static.

## Routes

- Requests List: `/granary/assortment/requests`
- Request Detail: `/granary/assortment/requests/:requestId`

## Navigation

Sidebar: Assortment Intelligence (expandable) > Requests (active, highlighted)

---

## Part 1: Requests List Page

### Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ Requests                                                         │
├──────────────────────────────────────────────────────────────────┤
│ [All] [Pending] [Approved] [Rejected]     [Search...]  [Export] │
├──────────────────────────────────────────────────────────────────┤
│ [Zone v] [Format v] [State: MUM ✕] [City v] [Store v]          │
│ [Category v]  Clear All                                          │
├──────────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │Request ID      │Request │Requested    │Request│Category│Str.││
│ │                │Time    │By           │Type   │        │Cnt ││
│ ├────────────────┼────────┼─────────────┼───────┼────────┼────┤│
│ │RQ2026040214..  │02 Apr  │ayushtiwari@ │Delist │CONSUM. │ 13 ││
│ │                │14:24   │gofynd.com   │       │        │    ││
│ │RQ2026040214..  │02 Apr  │ayushtiwari@ │Delist │PACKAG. │ 10 ││
│ │                │14:03   │gofynd.com   │       │        │    ││
│ │...             │        │             │       │        │    ││
│ └──────────────────────────────────────────────────────────────┘ │
│ Rows per page [50 v]              1-9 of 9  Page [1] of 1       │
└──────────────────────────────────────────────────────────────────┘
```

### Page Header

- Title: "Requests" (left-aligned)
- No date range display

### Status Tabs

`Tabs` from `@repo/ui` with:

- **All** (default) — shows all requests regardless of status
- **Pending** — only pending requests
- **Approved** — only approved requests
- **Rejected** — only rejected requests

Active tab has blue underline indicator (`var(--primary-50)`).

### Search + Export

Right-aligned in the tab bar row:

- Search input (240px) — filters by Request ID, Requested By, Category, Reason
- Export button — primary variant with download icon

### Filter Bar

Standard global filter bar below tabs: Zone, Format, State, City, Store, Category (no Segment, no Period on this page).

### Requests Table

| Column        | Width | Align  | Format                          |
| ------------- | ----- | ------ | ------------------------------- |
| Request ID    | 180px | Left   | Text (e.g., "RQ20260402142441") |
| Request Time  | 140px | Left   | "DD Mon YYYY HH:MM"             |
| Requested By  | 200px | Left   | Email                           |
| Request Type  | 100px | Center | `Badge` (e.g., "Delist")        |
| Category      | 160px | Left   | Text (uppercase)                |
| Store Count   | 100px | Right  | Number                          |
| Product Count | 120px | Right  | Number                          |
| Reason        | flex  | Left   | Text (truncated with ellipsis)  |

- Rows are clickable — clicking navigates to Request Detail page
- Row hover: `var(--surface-10)` background
- Request Type badge: `Badge` with `outline` variant, `var(--grey-90)` text

### Pagination

`TablePagination`: Rows per page (50 default), total count, page navigation.

---

## Part 2: Request Detail Page

### Route

`/granary/assortment/requests/:requestId`

### Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ ← Request ID: RQ20260402142441  [Pending]                       │
├──────────────────────────────────────────────────────────────────┤
│ Request Details                                            [▲]  │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ Category        │ Sub Category   │ Format    │ Zone          │ │
│ │ CONSUMABLES     │ BAGS           │ All       │ All           │ │
│ │                 │                │           │               │ │
│ │ State           │ Request Type   │ Raised on │ Raised by     │ │
│ │ All             │ [Delist]       │ Apr 02,   │ ayushtiwari@  │ │
│ │                 │                │ 2:24 PM   │ gofynd.com    │ │
│ └──────────────────────────────────────────────────────────────┘ │
├──────────────────┬───────────────────────────────────────────────┤
│ Article Selection│ Selection Overview                            │
│ 2                │                                               │
│                  │ Delist Reason: Product discontinued by mfr.   │
│ ┌──────────────┐│ Delist from: 11 Stores                        │
│ │[OTHERS]      ││                                               │
│ │MINI SEL ,PLA.││ Selected Store Preview                   [▲]  │
│ │310087573     ││                              [Search...]      │
│ │Affected(0/11)││ ┌──────────────────────────────────────────┐  │
│ │  [>]         ││ │ Store Listing                            │  │
│ └──────────────┘│ │ Store     │ Store Code │ State │ City    │  │
│ ┌──────────────┐│ ├───────────┼────────────┼───────┼─────────┤  │
│ │[BAGS]        ││ │ RCP       │ 5518       │ MAH   │ NAVI M. │  │
│ │PLAIN WHITE.. ││ │ Acme Mall │ 6217       │ MAH   │ MUMBAI  │  │
│ │310081660     ││ │ Phoenix M.│ 6220       │ MAH   │ MUMBAI  │  │
│ │Affected(0/2) ││ │ D Vic. M. │ 6221       │ MAH   │ MUMBAI  │  │
│ └──────────────┘│ │ SBZ-DOMB. │ FR00       │ MAH   │ MUMBAI  │  │
│                  │ └──────────────────────────────────────────┘  │
└──────────────────┴───────────────────────────────────────────────┘
```

### Page Header

- Back arrow (left) — navigates back to Requests list
- Title: "Request ID: {requestId}" (e.g., "Request ID: RQ20260402142441")
- Status badge: `Badge` with variant based on status:
  - Pending: `secondary` variant (yellow/orange bg)
  - Approved: `default` variant (green)
  - Rejected: `destructive` variant (red)
- Uses `TitleBar` from `@repo/ui` with `onBack` prop

### Request Details Section (collapsible)

`Collapsible` from `@repo/ui` — expanded by default, with toggle arrow.

8 metadata fields in a 4-column grid:

| Field        | Example Value           | Format                       |
| ------------ | ----------------------- | ---------------------------- |
| Category     | CONSUMABLES             | Text (uppercase)             |
| Sub Category | BAGS                    | Text (uppercase)             |
| Format       | All                     | Text                         |
| Zone         | All                     | Text                         |
| State        | All                     | Text                         |
| Request Type | Delist                  | `Badge` with outline variant |
| Raised on    | Apr 02, 2026 \| 2:24 PM | Date + time                  |
| Raised by    | ayushtiwari@gofynd.com  | Email                        |

**Design:** Labels in `var(--text-subdued-1)`, `var(--font-size-xs)`. Values in `var(--text-default)`, `var(--font-size-s)`.

### Article Selection Panel (left sidebar)

**Header:** "Article Selection" + count badge (e.g., "2")

Vertical list of article cards. Each card:

- Sub-category badge: `Badge` with colored bg (e.g., orange "OTHERS", blue "BAGS")
- Article name (truncated)
- Article code
- "Affected (X/Y)" count text
- Chevron right icon `>` (when clickable to show details)
- Active card: blue border `var(--primary-50)`, light bg `var(--primary-10)`

Cards are clickable — clicking updates the right panel to show that article's details.

### Selection Overview (right panel)

**Delist Reason:** Label + bold reason text

**Delist from:** "{count} Stores"

### Selected Store Preview (right panel, below overview)

`Collapsible` section — expanded by default.

**Header:** "Selected Store Preview" + toggle arrow + Search input

| Column                 | Width | Align |
| ---------------------- | ----- | ----- |
| Store Listing (header) | —     | —     |
| Store                  | flex  | Left  |
| Store Code             | 120px | Left  |
| State                  | 80px  | Left  |
| City                   | 140px | Left  |

## Design Tokens

| Element                    | Token                                               |
| -------------------------- | --------------------------------------------------- |
| Page title                 | `var(--font-size-xl)`, `var(--font-weight-heading)` |
| Request ID text            | `var(--font-size-l)`, `var(--font-weight-heading)`  |
| Status badge (Pending)     | `var(--secondary-50)` bg, `var(--surface-0)` text   |
| Status badge (Approved)    | `var(--success-50)` bg, `var(--surface-0)` text     |
| Status badge (Rejected)    | `var(--error-50)` bg, `var(--surface-0)` text       |
| Metadata label             | `var(--font-size-xs)`, `var(--text-subdued-1)`      |
| Metadata value             | `var(--font-size-s)`, `var(--text-default)`         |
| Article card bg            | `var(--surface-0)`                                  |
| Article card active border | `2px solid var(--primary-50)`                       |
| Article card active bg     | `var(--primary-10)`                                 |
| Sub-category badge         | Various colors per category                         |
| Section bg                 | `var(--surface-0)`                                  |
| Section radius             | `var(--radius-12)`                                  |
| Section padding            | `var(--space-24)`                                   |
| Detail metadata grid gap   | `var(--space-16)`                                   |
| Article panel width        | 300px                                               |
| Left-right gap             | `var(--space-24)`                                   |

## Mock Data

Store in `features/granary/mock-data/requests-mock.ts`:

```typescript
export const mockRequests = [
  {
    requestId: "RQ20260402142441",
    requestTime: "2026-04-02T14:24:00",
    requestedBy: "ayushtiwari@gofynd.com",
    requestType: "Delist",
    category: "CONSUMABLES",
    storeCount: 13,
    productCount: 2,
    reason: "Product discontinued by manufacturer",
    status: "Pending",
  },
  {
    requestId: "RQ20260402140330",
    requestTime: "2026-04-02T14:03:00",
    requestedBy: "ayushtiwari@gofynd.com",
    requestType: "Delist",
    category: "PACKAGING",
    storeCount: 10,
    productCount: 2,
    reason: "Supplier reliability or delivery issues",
    status: "Pending",
  },
  {
    requestId: "RQ20260402070448",
    requestTime: "2026-04-02T07:04:00",
    requestedBy: "ayushtiwari@gofynd.com",
    requestType: "Delist",
    category: "PACKAGING",
    storeCount: 4,
    productCount: 1,
    reason: "Low sales performance",
    status: "Pending",
  },
  {
    requestId: "RQ20260402070347",
    requestTime: "2026-04-02T07:03:00",
    requestedBy: "ayushtiwari@gofynd.com",
    requestType: "Delist",
    category: "PACKAGING",
    storeCount: 9,
    productCount: 2,
    reason: "Low sales performance",
    status: "Pending",
  },
  {
    requestId: "RQ20260402070111",
    requestTime: "2026-04-02T07:01:00",
    requestedBy: "ayushtiwari@gofynd.com",
    requestType: "Delist",
    category: "PACKAGING",
    storeCount: 7,
    productCount: 2,
    reason: "Low sales performance",
    status: "Pending",
  },
  {
    requestId: "RQ20260402070035",
    requestTime: "2026-04-02T07:00:00",
    requestedBy: "ayushtiwari@gofynd.com",
    requestType: "Delist",
    category: "PACKAGING",
    storeCount: 6,
    productCount: 1,
    reason: "Low sales performance",
    status: "Pending",
  },
  {
    requestId: "RQ20260402065555",
    requestTime: "2026-04-02T06:55:00",
    requestedBy: "ayushtiwari@gofynd.com",
    requestType: "Delist",
    category: "PREMIUM FRUITS",
    storeCount: 222,
    productCount: 50,
    reason: "Low sales performance",
    status: "Pending",
  },
  {
    requestId: "RQ20260325072125",
    requestTime: "2026-03-25T07:21:00",
    requestedBy: "ayushtiwari@gofynd.com",
    requestType: "Delist",
    category: "PALM OIL",
    storeCount: 27,
    productCount: 4,
    reason: "Quality or defect issues",
    status: "Pending",
  },
  {
    requestId: "RQ20260324103915",
    requestTime: "2026-03-24T10:39:00",
    requestedBy: "ayushtiwari@gofynd.com",
    requestType: "Delist",
    category: "MAJOR CERELAS",
    storeCount: 32,
    productCount: 3,
    reason: "Low sales performance",
    status: "Pending",
  },
];

export const mockRequestDetail = {
  requestId: "RQ20260402142441",
  status: "Pending",
  category: "CONSUMABLES",
  subCategory: "BAGS",
  format: "All",
  zone: "All",
  state: "All",
  requestType: "Delist",
  raisedOn: "2026-04-02T14:24:00",
  raisedBy: "ayushtiwari@gofynd.com",
  articles: [
    {
      articleCode: "310087573",
      articleName: 'MINI SEL ,PLAIN, 1" CORE',
      subCategory: "OTHERS",
      affectedStores: 0,
      totalStores: 11,
      reason: "Product discontinued by manufacturer",
      stores: [
        { name: "RCP", code: "5518", state: "MAH", city: "NAVI MUMBAI" },
        { name: "Acme Mall", code: "6217", state: "MAH", city: "MUMBAI" },
        {
          name: "Phoenix Market City",
          code: "6220",
          state: "MAH",
          city: "MUMBAI",
        },
        { name: "D Victoria Mall", code: "6221", state: "MAH", city: "MUMBAI" },
        {
          name: "SBZ-DOMBIVILI-LODHA",
          code: "FR00",
          state: "MAH",
          city: "MUMBAI",
        },
      ],
    },
    {
      articleCode: "310081660",
      articleName: "PLAIN WHITE COTTON BAG SIZE18...",
      subCategory: "BAGS",
      affectedStores: 0,
      totalStores: 2,
      reason: "Product discontinued by manufacturer",
      stores: [
        { name: "RCP", code: "5518", state: "MAH", city: "NAVI MUMBAI" },
        { name: "Acme Mall", code: "6217", state: "MAH", city: "MUMBAI" },
      ],
    },
  ],
};
```

## Components to Reuse

| Component                                                                 | Source     | Usage                                  |
| ------------------------------------------------------------------------- | ---------- | -------------------------------------- |
| `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`                          | `@repo/ui` | All/Pending/Approved/Rejected tabs     |
| `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell`, `TableHead` | `@repo/ui` | Requests table, store preview table    |
| `TablePagination`                                                         | `@repo/ui` | Requests table pagination              |
| `Badge`                                                                   | `@repo/ui` | Request Type badge, Status badge       |
| `Input`                                                                   | `@repo/ui` | Search inputs                          |
| `Button`                                                                  | `@repo/ui` | Export button                          |
| `TitleBar`                                                                | `@repo/ui` | Request detail header with back        |
| `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`                 | `@repo/ui` | Request details section, store preview |
| `Card`, `CardContent`                                                     | `@repo/ui` | Article selection cards                |
| `ScrollArea`                                                              | `@repo/ui` | Article list scroll                    |
| `Skeleton`                                                                | `@repo/ui` | Loading state                          |

## File Changes

| File                                          | Action | Details             |
| --------------------------------------------- | ------ | ------------------- |
| `pages/granary/requests-page.tsx`             | Create | Requests list page  |
| `pages/granary/request-detail-page.tsx`       | Create | Request detail page |
| `features/granary/mock-data/requests-mock.ts` | Create | Mock data           |

## Acceptance Criteria

### Requests List Page

- [ ] Page title "Requests" renders
- [ ] Tabs: All, Pending, Approved, Rejected — switching filters the table
- [ ] Search filters by request ID, requested by, category, or reason
- [ ] Export button present with download icon
- [ ] Filter bar renders with Zone, Format, State, City, Store, Category
- [ ] Table shows all columns: Request ID, Request Time, Requested By, Request Type, Category, Store Count, Product Count, Reason
- [ ] Request Type shows as a badge
- [ ] Clicking a row navigates to Request Detail page
- [ ] Pagination with rows per page and page navigation

### Request Detail Page

- [ ] Back arrow navigates to Requests list
- [ ] Title shows Request ID with status badge
- [ ] Request Details section is collapsible with 8 metadata fields in 4-column grid
- [ ] Request Type shown as badge within details
- [ ] Article Selection panel shows article cards with sub-category badge, name, code, affected count
- [ ] Clicking an article card updates the right panel
- [ ] Selection Overview shows delist reason and store count
- [ ] Selected Store Preview table shows Store, Store Code, State, City
- [ ] Store preview has search functionality
- [ ] All data from mock data files
