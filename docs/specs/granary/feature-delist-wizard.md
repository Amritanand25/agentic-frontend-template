# Delist Request Wizard (3-Step Flow)

**Type:** Feature
**Size:** Large
**Status:** Draft
**Created:** 2026-04-04
**Priority:** High
**Parent:** [module-granary.md](./module-granary.md)

## Overview

A 3-step wizard for creating delist requests. Initiated from the Range Review page when users select articles and click "Delist". The wizard is a full-screen flow (no sidebar) with a step indicator header. Steps: (1) Store Selection, (2) Add Reason, (3) Review Request. All data is mock/static.

## Route

`/granary/assortment/delist-request`

**Note:** This is a full-screen page — it does NOT render inside the Granary sidebar layout. It has its own header with Back button and step indicator.

## Entry Point

User selects articles on Range Review page → clicks "Delist" in the selection action bar → navigates to this wizard with selected articles passed via route state or a shared Zustand store.

## Wizard Header (all steps)

```
┌──────────────────────────────────────────────────────────────────┐
│ ← Back   Delist Request    ①Store Selection  ②Add Reason       │
│                             ③Review Request         [Save][Submit]│
└──────────────────────────────────────────────────────────────────┘
```

- **Back button:** `← Back` — navigates back to Range Review (with confirmation if unsaved changes)
- **Title:** "Delist Request"
- **Step indicator:** Uses `StepperFlow` from `@repo/ui` with 3 steps:
  - Step 1: "Store Selection"
  - Step 2: "Add Reason"
  - Step 3: "Review Request"
- **Step states:**
  - Current step: Filled circle with number, bold text
  - Completed step: Green check icon
  - Future step: Gray circle with number, subdued text
- **Action buttons (right):**
  - "Save" — outline/secondary variant, saves draft
  - "Submit" — primary variant, disabled until Step 3 is complete

## State Management

Wizard state managed via React Context (`DelistWizardContext`) scoped to the wizard page. Resets on unmount.

```typescript
interface DelistWizardState {
  currentStep: 1 | 2 | 3;
  selectedArticles: SelectedArticle[];
  storeTargetingMode: Record<string, "affected" | "ranged" | "custom">; // per article
  selectedStores: Record<string, StoreInfo[]>; // per article
  globalReason?: string;
  articleReasons: Record<string, string>; // articleCode → reason
  isDirty: boolean;
}

interface SelectedArticle {
  articleCode: string;
  articleName: string;
  subCategory: string;
  affectedCount: number;
  rangedCount: number;
}
```

---

## Step 1: Store Selection

### Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ Article Selection: 2         Edit                                │
│ ┌──────────────┐  ┌─────────────────────────────────────────────┐│
│ │[OTHERS]    [-]│  │ Store Targeting Mode (?) [Ranged]          ││
│ │CORNSTARCH    │  │                                             ││
│ │BIODEG...     │  │ ○ Affected Stores (Default)                ││
│ │310080351    [>]│  │   5 stores flagged for action based on    ││
│ │Affected: 5   │  │   performance                              ││
│ │Ranged: 5     │  │                                             ││
│ └──────────────┘  │ ● Ranged Stores          ○ Custom List     ││
│ ┌──────────────┐  │   Includes all 5 stores    Manually select ││
│ │[DISPLAY M] [-]│  │   where this article is    specific stores ││
│ │MINI SEL...   │  │   stocked                                  ││
│ │310087574     │  │                                             ││
│ │Affected: 6   │  ├─────────────────────────────────────────────┤│
│ │Ranged: 6     │  │ Selected Store Preview          [Search..] ││
│ └──────────────┘  │ ┌─────────────────────────────────────────┐ ││
│                    │ │☑│ Store   │ State│ City  │ Class.│ Vel.│ ││
│                    │ ├──┼─────────┼──────┼───────┼───────┼─────┤ ││
│                    │ │☑│ RCP     │ MAH  │ NAVI M│ 14    │ 0.00│ ││
│                    │ │☑│ Acme M. │ MAH  │MUMBAI │ 14    │ 0.00│ ││
│                    │ │☑│Phoenix M│ MAH  │MUMBAI │ 14    │ 0.00│ ││
│                    │ │☑│D Vic. M │ MAH  │MUMBAI │ 14    │ 0.00│ ││
│                    │ │☑│Centre P.│ MAH  │NAVI M.│ 14    │ 0.00│ ││
│                    │ └─────────────────────────────────────────┘ ││
│                    └─────────────────────────────────────────────┘│
│                                                                  │
│ [Previous]                                              [Next]   │
└──────────────────────────────────────────────────────────────────┘
```

### Left Panel: Article Selection

**Header:** "Article Selection : {count}" + "Edit" link (opens edit mode to add/remove articles)

Vertical list of selected article cards. Each card:

- Sub-category badge (colored): `Badge` with category color
- Article name (truncated)
- Article code
- "Affected: {n} Ranged: {n}" counts
- Remove button (minus icon, top-right) — removes article from selection
- Chevron right `>` — selects this article to configure stores
- Active card: blue dashed border

### Right Panel: Store Targeting Mode

**Header:** "Store Targeting Mode" + tooltip icon `(?)` + current mode badge (e.g., `[Ranged]`)

**Collapsible** section, expanded by default.

3 radio options using `RadioGroup` + `RadioGroupItem` from `@repo/ui`:

| Option                    | Description                                             | Default        |
| ------------------------- | ------------------------------------------------------- | -------------- |
| Affected Stores (Default) | "{n} stores flagged for action based on performance"    | No             |
| Ranged Stores             | "Includes all {n} stores where this article is stocked" | Yes (selected) |
| Custom List               | "Manually select specific stores"                       | No             |

Each option is a selectable card:

- Active: Blue border `var(--primary-50)`, light bg `var(--primary-10)`
- Inactive: Gray border `var(--grey-30)`, white bg

For "Ranged Stores" and "Custom List", show side-by-side in a 2-column grid below "Affected Stores".

### Selected Store Preview Table

**Header:** "Selected Store Preview" + Search input

Table with checkboxes (for Custom List mode — all checked for Affected/Ranged modes):

| Column                 | Width | Align  |
| ---------------------- | ----- | ------ |
| Checkbox               | 40px  | Center |
| Store                  | flex  | Left   |
| State                  | 80px  | Left   |
| City                   | 120px | Left   |
| Classification Matrix  | 150px | Center |
| Sales Velocity         | 120px | Right  |
| Revenue Contribution % | 170px | Right  |

- Classification Matrix shows as a small `Badge` with the value
- In Affected/Ranged modes, all checkboxes are checked and disabled
- In Custom List mode, checkboxes are interactive

### Navigation

- "Previous" button (left, disabled on Step 1) — ghost variant
- "Next" button (right) — primary variant, navigates to Step 2

---

## Step 2: Add Reason

### Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ Global Reason (?)                                                │
│ Add a common reason for all selected articles                    │
│ ┌────────────────────────────────────────────────┐ [Apply to all]│
│ │ Supplier reliability or delivery issues     v  │               │
│ └────────────────────────────────────────────────┘               │
│                                                                  │
│ ─────────────────────── OR ──────────────────────                │
│                                                                  │
│ Article Specific Reason (?)                                [▲]  │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ Selected Article Listing              [Search...]           │ │
│ │                                                              │ │
│ │ Article Code │ Article Name                    │ Reason      │ │
│ ├──────────────┼─────────────────────────────────┼─────────────┤ │
│ │ 310080351    │ CORNSTARCH BIODEGRADABLE BAGN.. │ [Select..v] │ │
│ │ 310087574    │ MINI SEL ,PLAIN, 3" CORE       │ [Select..v] │ │
│ └──────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ [Previous]                                              [Next]   │
└──────────────────────────────────────────────────────────────────┘
```

### Global Reason Section

**Header:** "Global Reason" + tooltip icon `(?)`

**Subtext:** "Add a common reason for all selected articles"

**Controls:**

- `Select` dropdown with predefined reasons:
  - "Low sales performance"
  - "Product discontinued by manufacturer"
  - "Supplier reliability or delivery issues"
  - "Quality or defect issues"
  - "Seasonal/temporary product"
  - "Customer complaints"
  - "Regulatory/compliance issues"
- "Apply to all" button — `Button` primary variant, applies global reason to all articles

### OR Divider

Horizontal separator with "OR" text centered. Uses `Separator` from `@repo/ui` with overlaid text.

### Article Specific Reason Section

`Collapsible` section with tooltip icon.

**Header:** "Article Specific Reason" + tooltip `(?)` + toggle arrow

**Table:**

| Column       | Width | Align |
| ------------ | ----- | ----- |
| Article Code | 140px | Left  |
| Article Name | flex  | Left  |
| Reason       | 300px | Left  |

- Reason column: `Select` dropdown per row with same reason options as global
- Search input filters by article code or name
- If global reason was applied, each row shows the global reason (editable per article)

### Navigation

- "Previous" button — navigates back to Step 1
- "Next" button — primary variant, navigates to Step 3 (disabled if no reason set for any article)

---

## Step 3: Review Request

### Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ Selection Summary                               [Search...]     │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ Article                    │ Article │ Reason    │ Targeting │ │
│ │                            │ Code    │           │ Mode      │ │
│ ├────────────────────────────┼─────────┼───────────┼───────────┤ │
│ │ CORNSTARCH BIODEGR. BAGN.. │310080351│[Supplier.]│[Ranged(5)]│✏│
│ │ MINI SEL ,PLAIN, 3" CORE  │310087574│[Supplier.]│[Ranged(6)]│✏│
│ └──────────────────────────────────────────────────────────────┘ │
│ Rows per page [10 v]              1-2 of 2  Page [1] of 1       │
│                                                                  │
│ [Previous]                                            [Submit]   │
└──────────────────────────────────────────────────────────────────┘
```

### Selection Summary Table

**Header:** "Selection Summary" + Search input

| Column         | Width | Align  | Format                                                         |
| -------------- | ----- | ------ | -------------------------------------------------------------- |
| Article        | flex  | Left   | Article name text                                              |
| Article Code   | 120px | Left   | Text                                                           |
| Reason         | 250px | Left   | `Badge` with reason text (e.g., green badge)                   |
| Targeting Mode | 180px | Left   | `Badge` with mode + store count (e.g., "Ranged (5 stores)")    |
| Edit           | 60px  | Center | Pencil icon button — navigates back to Step 1 for that article |

- Reason badge: `var(--success-10)` bg, `var(--success-60)` text
- Targeting Mode badge: `var(--primary-10)` bg, `var(--primary-60)` text

**Pagination:** `TablePagination` with 10 rows per page default.

### Navigation

- "Previous" button — navigates back to Step 2
- "Submit" button — primary variant, submits the delist request
  - On success: shows `notify({ title: 'Delist request submitted', variant: 'success' })`
  - Navigates back to Requests list page

---

## Design Tokens

| Element                      | Token                                                 |
| ---------------------------- | ----------------------------------------------------- |
| Wizard header bg             | `var(--surface-0)`                                    |
| Wizard header border-bottom  | `1px solid var(--grey-20)`                            |
| Wizard header height         | 64px                                                  |
| Step indicator text (active) | `var(--text-default)`, `var(--font-weight-prominent)` |
| Step indicator text (future) | `var(--text-subdued-2)`                               |
| Step circle (active)         | `var(--primary-50)` bg, `var(--surface-0)` text       |
| Step circle (completed)      | `var(--success-50)` bg, white check icon              |
| Step circle (future)         | `var(--grey-30)` bg, `var(--text-subdued-2)` text     |
| Article card bg              | `var(--surface-0)`                                    |
| Article card active border   | `2px dashed var(--primary-50)`                        |
| Radio card active border     | `2px solid var(--primary-50)`                         |
| Radio card active bg         | `var(--primary-10)`                                   |
| Radio card inactive border   | `1px solid var(--grey-30)`                            |
| Save button                  | `outline` variant                                     |
| Submit button                | `default` (primary) variant                           |
| Previous button              | `ghost` variant, `var(--primary-50)` text             |
| Next button                  | `default` (primary) variant                           |
| OR divider text              | `var(--text-subdued-2)`, centered                     |
| Reason badge bg              | `var(--success-10)`                                   |
| Reason badge text            | `var(--success-60)`                                   |
| Targeting badge bg           | `var(--primary-10)`                                   |
| Targeting badge text         | `var(--primary-60)`                                   |
| Edit pencil icon             | `var(--primary-50)`                                   |
| Content padding              | `var(--space-24)`                                     |
| Section gap                  | `var(--space-24)`                                     |

## Mock Data

Store in `features/granary/mock-data/delist-mock.ts`:

```typescript
export const mockDelistArticles = [
  {
    articleCode: "310080351",
    articleName: 'CORNSTARCH BIODEGRADABLE BAGN ROLL10X14"',
    subCategory: "OTHERS",
    affectedCount: 5,
    rangedCount: 5,
  },
  {
    articleCode: "310087574",
    articleName: 'MINI SEL ,PLAIN, 3" CORE',
    subCategory: "DISPLAY MATERIAL",
    affectedCount: 6,
    rangedCount: 6,
  },
];

export const mockStoresByArticle: Record<string, StoreInfo[]> = {
  "310080351": [
    {
      name: "RCP",
      code: "5518",
      state: "MAH",
      city: "NAVI MUMBAI",
      classificationMatrix: 14,
      salesVelocity: 0.0,
      revenueContribution: 0,
    },
    {
      name: "Acme Mall",
      code: "6217",
      state: "MAH",
      city: "MUMBAI",
      classificationMatrix: 14,
      salesVelocity: 0.0,
      revenueContribution: 0,
    },
    {
      name: "Phoenix Market City",
      code: "6220",
      state: "MAH",
      city: "MUMBAI",
      classificationMatrix: 14,
      salesVelocity: 0.0,
      revenueContribution: 0,
    },
    {
      name: "D Victoria Mall",
      code: "6221",
      state: "MAH",
      city: "MUMBAI",
      classificationMatrix: 14,
      salesVelocity: 0.0,
      revenueContribution: 0,
    },
    {
      name: "Centre Point",
      code: "CP01",
      state: "MAH",
      city: "NAVI MUMBAI",
      classificationMatrix: 14,
      salesVelocity: 0.0,
      revenueContribution: 0,
    },
  ],
  "310087574": [
    {
      name: "RCP",
      code: "5518",
      state: "MAH",
      city: "NAVI MUMBAI",
      classificationMatrix: 14,
      salesVelocity: 0.0,
      revenueContribution: 0,
    },
    {
      name: "Acme Mall",
      code: "6217",
      state: "MAH",
      city: "MUMBAI",
      classificationMatrix: 14,
      salesVelocity: 0.0,
      revenueContribution: 0,
    },
    {
      name: "Phoenix Market City",
      code: "6220",
      state: "MAH",
      city: "MUMBAI",
      classificationMatrix: 14,
      salesVelocity: 0.0,
      revenueContribution: 0,
    },
    {
      name: "D Victoria Mall",
      code: "6221",
      state: "MAH",
      city: "MUMBAI",
      classificationMatrix: 14,
      salesVelocity: 0.0,
      revenueContribution: 0,
    },
    {
      name: "Centre Point",
      code: "CP01",
      state: "MAH",
      city: "NAVI MUMBAI",
      classificationMatrix: 14,
      salesVelocity: 0.0,
      revenueContribution: 0,
    },
    {
      name: "Smart Badlapur West",
      code: "TAJF",
      state: "MAH",
      city: "BADLAPUR",
      classificationMatrix: 14,
      salesVelocity: 0.0,
      revenueContribution: 0,
    },
  ],
};

export const mockDelistReasons = [
  "Low sales performance",
  "Product discontinued by manufacturer",
  "Supplier reliability or delivery issues",
  "Quality or defect issues",
  "Seasonal/temporary product",
  "Customer complaints",
  "Regulatory/compliance issues",
];
```

## Components to Reuse

| Component                                                                 | Source     | Usage                                                                    |
| ------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------ |
| `StepperFlow`                                                             | `@repo/ui` | 3-step progress indicator                                                |
| `RadioGroup`, `RadioGroupItem`                                            | `@repo/ui` | Store targeting mode selection                                           |
| `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell`, `TableHead` | `@repo/ui` | Store preview, article listing, review summary                           |
| `TablePagination`                                                         | `@repo/ui` | Review table pagination                                                  |
| `Checkbox`                                                                | `@repo/ui` | Store selection in Custom List mode                                      |
| `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`                  | `@repo/ui` | Reason dropdowns                                                         |
| `Badge`                                                                   | `@repo/ui` | Sub-category badges, reason badges, targeting badges                     |
| `Button`                                                                  | `@repo/ui` | Back, Save, Submit, Previous, Next, Apply to all, Edit                   |
| `Input`                                                                   | `@repo/ui` | Search inputs                                                            |
| `Separator`                                                               | `@repo/ui` | OR divider                                                               |
| `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`                 | `@repo/ui` | Store targeting, article specific reason                                 |
| `Tooltip`, `TooltipTrigger`, `TooltipContent`                             | `@repo/ui` | Store Targeting Mode (?), Global Reason (?), Article Specific Reason (?) |
| `ScrollArea`                                                              | `@repo/ui` | Article selection panel                                                  |
| `Card`                                                                    | `@repo/ui` | Radio option cards                                                       |
| `notify`                                                                  | `@repo/ui` | Success notification on submit                                           |

## File Changes

| File                                                     | Action | Details                                |
| -------------------------------------------------------- | ------ | -------------------------------------- |
| `pages/granary/delist-request/delist-request-page.tsx`   | Create | Wizard container with context provider |
| `pages/granary/delist-request/step-store-selection.tsx`  | Create | Step 1 UI                              |
| `pages/granary/delist-request/step-add-reason.tsx`       | Create | Step 2 UI                              |
| `pages/granary/delist-request/step-review-request.tsx`   | Create | Step 3 UI                              |
| `pages/granary/delist-request/delist-wizard-context.tsx` | Create | React Context for wizard state         |
| `features/granary/mock-data/delist-mock.ts`              | Create | Mock data                              |

## Interaction States

| Element                          | State       | Behavior                                                   |
| -------------------------------- | ----------- | ---------------------------------------------------------- |
| Step indicator                   | Current     | Filled blue circle, bold text                              |
| Step indicator                   | Completed   | Green circle with check                                    |
| Step indicator                   | Future      | Gray circle, subdued text                                  |
| Article card                     | Active      | Dashed blue border                                         |
| Article card                     | Inactive    | Solid gray border                                          |
| Remove button                    | Hover       | Red color                                                  |
| Radio option card                | Selected    | Blue border, light blue bg                                 |
| Radio option card                | Unselected  | Gray border, white bg                                      |
| Store checkbox (Affected/Ranged) | Disabled    | Checked but not interactive                                |
| Store checkbox (Custom)          | Interactive | Toggleable                                                 |
| Next button                      | Disabled    | When step validation fails (e.g., no reason set)           |
| Submit button                    | Disabled    | Until Step 3 is reached                                    |
| Submit button                    | Click       | Shows success notification, redirects to Requests          |
| Save button                      | Click       | Saves draft, shows success notification                    |
| Previous button                  | Step 1      | Disabled                                                   |
| Back button                      | Click       | Confirm dialog if `isDirty`, then navigate to Range Review |

## Acceptance Criteria

### Step 1 - Store Selection

- [ ] Left panel shows selected articles with sub-category badge, name, code, affected/ranged counts
- [ ] Remove button removes an article from the selection
- [ ] Right panel shows Store Targeting Mode with 3 radio options
- [ ] Selecting "Ranged Stores" shows all stores where the article is stocked
- [ ] Selecting "Affected Stores" shows only flagged stores
- [ ] Selecting "Custom List" enables checkbox selection in the store table
- [ ] Store table shows Store, State, City, Classification Matrix, Sales Velocity, Revenue Contribution
- [ ] Classification Matrix value shown as a badge
- [ ] Search filters stores
- [ ] Clicking a different article card updates the right panel
- [ ] "Ranged" badge shown next to Store Targeting Mode header
- [ ] Next button navigates to Step 2

### Step 2 - Add Reason

- [ ] Global Reason dropdown with predefined reason options
- [ ] "Apply to all" button applies global reason to all articles
- [ ] OR divider separates global from article-specific
- [ ] Article Specific Reason section shows table with per-article reason dropdowns
- [ ] Search filters articles in the table
- [ ] Next button disabled if any article has no reason set
- [ ] Previous button navigates back to Step 1

### Step 3 - Review Request

- [ ] Selection Summary table shows Article, Article Code, Reason (badge), Targeting Mode (badge with store count)
- [ ] Edit button per row navigates back to Step 1 for that article
- [ ] Pagination with rows per page
- [ ] Submit button triggers success notification and redirects to Requests list
- [ ] Previous button navigates back to Step 2
- [ ] All data from mock data files
