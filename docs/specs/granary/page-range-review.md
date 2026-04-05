# Range Review Page

**Type:** Page
**Size:** Large
**Status:** Draft
**Created:** 2026-04-04
**Priority:** High
**Parent:** [module-granary.md](./module-granary.md)

## Overview

The Range Review page is the core assortment intelligence tool. It displays a 3x3 ABC-XYZ classification matrix for SKU analysis, NOB (Number of Bills) vs Volume insight cards, and a tabbed data table of articles (Ranged, Unranged, Unlisted, Pending). Users can select articles from the table and initiate delist requests. All data is mock/static.

## Route

`/granary/assortment/range-review`

## Navigation

Sidebar: Assortment Intelligence (expandable) > Range Review (active, highlighted)

## Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ Range Review                                                     │
├──────────────────────────────────────────────────────────────────┤
│ [Zone v] [Format v] [State: MUM ✕] [City v] [Store v]          │
│ [Segment v] [Category v]  Clear All                              │
├──────────────────────────┬───────────────────────────────────────┤
│ Classification Matrix     │ NOB vs Volume                        │
│                           │                                      │
│         X      Y      Z  │ ┌─ Bulk Items ──────────────────┐   │
│    ┌────────┬────────┬──┐ │ │ Low Bills & High Volume      │   │
│ A  │ AX     │ AY     │AZ│ │ │ SKUs: 1,102  Bills: 0.02%   │   │
│    │ 2.72%  │ 2.41%  │..│ │ │ Volume: 0.04%  UPB: 2.96   │   │
│    ├────────┼────────┼──┤ │ └──────────────────────────────┘   │
│ B  │ BX     │ BY     │BZ│ │ ┌─ Core SKU ──────────────────┐   │
│    │ 8.59%  │ 4.8%   │..│ │ │ High Bills & High Volume    │   │
│    ├────────┼────────┼──┤ │ │ SKUs: 47,334  Bills: 99.45% │   │
│ C  │ CX     │ CY     │CZ│ │ │ Volume: 99.65% UPB: 1.61   │   │
│    │53.84%  │15.62%  │..│ │ └──────────────────────────────┘   │
│    └────────┴────────┴──┘ │ ┌─ Habitual Picks ────────────┐   │
│ Revenue↑  Demand Stab.→   │ │ ...                          │   │
│                           │ └──────────────────────────────┘   │
│ ● Strategic  ● Regular    │ ┌─ Rationalize ───────────────┐   │
│ ● Review                  │ │ ...                          │   │
│                           │ └──────────────────────────────┘   │
├───────────────────────────┴───────────────────────────────────────┤
│ ● Strategic SKU's   ● Regular SKU's   ● Review SKU's            │
├──────────────────────────────────────────────────────────────────┤
│ [Ranged] [Unranged] [Unlisted] [Pending]                        │
│                                                                  │
│ [All] [Local Gems] [Visibility] [Basket Builder] [Delist]       │
│                                         [Search...]  [Export]    │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │☐│ Article Code│ Article Name           │ Store │ Sub Cat │..││
│ ├──┼─────────────┼────────────────────────┼───────┼─────────┼──┤│
│ │☐│ 1590001701  │ APPLE JAMMU KASHMIR..  │ 9 (?) │ APPLE   │..││
│ │☑│ 310080351   │ CORNSTARCH BIODEGRAD.. │ 5 (?) │ OTHERS  │..││
│ │☑│ 310087574   │ MINI SEL ,PLAIN, 3"..  │ 6 (?) │ DISPLAY │..││
│ │☐│ 310087656   │ IMPORTED VHB ADHESIVE..│ 6 (?) │ BROWN T.│..││
│ │ ...                                                          ││
│ └──────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ ✕  2 of 50 selected   Select All   ✕ Delist   ↓ Export (2) │ │
│ └──────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

## Sections

### 1. Classification Matrix (left panel)

A 3x3 grid representing the ABC-XYZ classification:

**Axes:**

- Y-axis (rows): Revenue — A (high), B (medium), C (low)
- X-axis (columns): Demand Stability — X (stable), Y (variable), Z (volatile)

**Cells:**
Each cell shows:

- Code label with tooltip icon (e.g., "AX (?)")
- Percentage value (e.g., "2.72%")

**Color coding by cell:**

| Cell   | Color                             | SKU Type                     |
| ------ | --------------------------------- | ---------------------------- |
| AX, AY | Green (`var(--success-10)` bg)    | Strategic                    |
| AZ, BX | Yellow/Green (light)              | Strategic-Regular transition |
| BY     | Yellow (`var(--secondary-10)` bg) | Regular                      |
| BZ, CX | Light pink                        | Regular-Review transition    |
| CY, CZ | Pink/Red (`var(--error-10)` bg)   | Review                       |

**Axis labels:**

- Left side (vertical): "Revenue" with upward arrow
- Bottom: "Demand Stability" with right arrow

**Legend (below matrix):**

- Green dot: "Strategic SKU's"
- Orange dot: "Regular SKU's"
- Red dot: "Review SKU's"

### 2. NOB vs Volume Cards (right panel)

4 cards stacked vertically, each with a colored left border:

| Card           | Description              | Left Border Color              |
| -------------- | ------------------------ | ------------------------------ |
| Bulk Items     | Low Bills & High Volume  | `var(--primary-50)` (blue)     |
| Core SKU       | High Bills & High Volume | `var(--success-50)` (green)    |
| Habitual Picks | High Bills & Low Volume  | `var(--secondary-50)` (orange) |
| Rationalize    | Low Bills & Low Volume   | `var(--error-50)` (red)        |

Each card shows:

- Category name (bold)
- Description subtitle
- 4 metrics in a row: No. of SKUs, % of Bills, % of Volume, Avg UPB

Card layout:

```
┌─────────────────────────────────────────────────────────┐
│▌ Core SKU                                               │
│▌ High Bills & High Volume                               │
│▌                                                         │
│▌ No. of SKUs  │ % of Bills │ % of Volume │ Avg UPB     │
│▌ 47,334       │ 99.45%     │ 99.65%      │ 1.61        │
└─────────────────────────────────────────────────────────┘
```

### 3. Shared Legend Row

Full-width row below both panels:

- Green dot + "Strategic SKU's"
- Orange dot + "Regular SKU's"
- Red dot + "Review SKU's"

### 4. Tabbed Data Table

**Primary Tabs:** `Tabs` from `@repo/ui`

- Ranged (default, active with blue underline)
- Unranged
- Unlisted
- Pending

**Filter Pills (within Ranged tab):** `ToggleGroup` (single select)

- All (default, filled when active)
- Local Gems
- Visibility
- Basket Builder
- Delist

**Search + Export:** Right-aligned above table

**Table columns:**

| Column         | Width | Align  | Notes                       |
| -------------- | ----- | ------ | --------------------------- |
| Checkbox       | 40px  | Center | `Checkbox` from `@repo/ui`  |
| Article Code   | 140px | Left   | Text                        |
| Article Name   | flex  | Left   | Text                        |
| Store Count    | 100px | Right  | Number + tooltip icon `(?)` |
| Sub Category   | 150px | Left   | Text                        |
| Brick          | 150px | Left   | Text                        |
| Classification | 130px | Left   | Text (e.g., "BY")           |
| ...            | ...   | ...    | More columns scrollable     |

**Row selection behavior:**

- Checkboxes for multi-select
- Header checkbox for select all on current page
- Selected rows highlighted with `var(--primary-10)` background

### 5. Selection Action Bar (bottom sticky bar)

Appears when 1+ rows are selected. Fixed to bottom of the table area.

```
┌──────────────────────────────────────────────────────────────┐
│ ✕  2 of 50 selected   [Select All]   ✕ Delist   ↓ Export(2)│
└──────────────────────────────────────────────────────────────┘
```

- Close icon (✕): Deselects all
- Count: "{selected} of {total} selected"
- "Select All" link: Selects all items across all pages
- "Delist" button: Navigates to Delist Request wizard with selected articles
- "Export (N)" button: Exports selected articles

**Bar styling:**

- Background: `var(--grey-90)` (dark)
- Text: `var(--surface-0)` (white)
- Border-radius: `var(--radius-8)`
- Centered with max-width, floating at bottom
- Shadow: `var(--shadow-lg)`

## Design Tokens

| Element                   | Token                                                |
| ------------------------- | ---------------------------------------------------- |
| Matrix cell padding       | `var(--space-16)`                                    |
| Matrix cell border-radius | `var(--radius-8)`                                    |
| Matrix cell gap           | `var(--space-4)`                                     |
| Strategic cell bg         | `var(--success-10)`                                  |
| Regular cell bg           | `var(--secondary-10)`                                |
| Review cell bg            | `var(--error-10)`                                    |
| Cell code text            | `var(--font-size-s)`, `var(--font-weight-prominent)` |
| Cell percentage           | `var(--font-size-xl)`, `var(--font-weight-heading)`  |
| NOB card border-left      | 4px solid {color}                                    |
| NOB card padding          | `var(--space-16)`                                    |
| NOB card bg               | `var(--surface-0)`                                   |
| NOB metric label          | `var(--font-size-xs)`, `var(--text-subdued-1)`       |
| NOB metric value          | `var(--font-size-m)`, `var(--font-weight-heading)`   |
| Tab underline active      | `var(--primary-50)`, 2px                             |
| Filter pill active        | `var(--primary-50)` bg, `var(--surface-0)` text      |
| Filter pill inactive      | `var(--grey-40)` border                              |
| Selection bar bg          | `var(--grey-90)`                                     |
| Selection bar text        | `var(--surface-0)`                                   |
| Selected row bg           | `var(--primary-10)`                                  |
| Two-panel gap             | `var(--space-24)`                                    |

## Mock Data

Store in `features/granary/mock-data/range-review-mock.ts`:

```typescript
export const mockClassificationMatrix = [
  {
    code: "AX",
    revenue: "A",
    demandStability: "X",
    percentage: 2.72,
    skuType: "strategic",
  },
  {
    code: "AY",
    revenue: "A",
    demandStability: "Y",
    percentage: 2.41,
    skuType: "strategic",
  },
  {
    code: "AZ",
    revenue: "A",
    demandStability: "Z",
    percentage: 0.95,
    skuType: "regular",
  },
  {
    code: "BX",
    revenue: "B",
    demandStability: "X",
    percentage: 8.59,
    skuType: "regular",
  },
  {
    code: "BY",
    revenue: "B",
    demandStability: "Y",
    percentage: 4.8,
    skuType: "regular",
  },
  {
    code: "BZ",
    revenue: "B",
    demandStability: "Z",
    percentage: 1.59,
    skuType: "review",
  },
  {
    code: "CX",
    revenue: "C",
    demandStability: "X",
    percentage: 53.84,
    skuType: "review",
  },
  {
    code: "CY",
    revenue: "C",
    demandStability: "Y",
    percentage: 15.62,
    skuType: "review",
  },
  {
    code: "CZ",
    revenue: "C",
    demandStability: "Z",
    percentage: 9.49,
    skuType: "review",
  },
];

export const mockNOBCategories = [
  {
    name: "Bulk Items",
    description: "Low Bills & High Volume",
    skuCount: 1102,
    billsPct: 0.02,
    volumePct: 0.04,
    avgUPB: 2.96,
    color: "var(--primary-50)",
  },
  {
    name: "Core SKU",
    description: "High Bills & High Volume",
    skuCount: 47334,
    billsPct: 99.45,
    volumePct: 99.65,
    avgUPB: 1.61,
    color: "var(--success-50)",
  },
  {
    name: "Habitual Picks",
    description: "High Bills & Low Volume",
    skuCount: 697,
    billsPct: 0.03,
    volumePct: 0.01,
    avgUPB: 0.38,
    color: "var(--secondary-50)",
  },
  {
    name: "Rationalize",
    description: "Low Bills & Low Volume",
    skuCount: 36716,
    billsPct: 0.5,
    volumePct: 0.31,
    avgUPB: 1.01,
    color: "var(--error-50)",
  },
];

export const mockRangedArticles = [
  {
    articleCode: "1590001701",
    articleName: "APPLE JAMMU KASHMIR MEDIUM NON RR",
    storeCount: 9,
    subCategory: "APPLE (INDIAN)",
    brick: "APPLE KASHMIR",
    classification: "-",
  },
  {
    articleCode: "310080351",
    articleName: 'CORNSTARCH BIODEGRADABLE BAGN ROLL10X14"',
    storeCount: 5,
    subCategory: "OTHERS",
    brick: "OTHERS",
    classification: "-",
  },
  {
    articleCode: "310087574",
    articleName: 'MINI SEL ,PLAIN, 3" CORE',
    storeCount: 6,
    subCategory: "DISPLAY MATERIAL",
    brick: "TAG SEL",
    classification: "-",
  },
  {
    articleCode: "310087656",
    articleName: "IMPORTED VHB ADHESIVE TAPE 12MMX50 MTR",
    storeCount: 6,
    subCategory: "BROWN TAPE",
    brick: "BROWN TAPE",
    classification: "-",
  },
  {
    articleCode: "310089510",
    articleName: '100% COTTON BAG SIZE-19" X 20",2 COL_VF',
    storeCount: 2,
    subCategory: "BAGS",
    brick: "CARRY BAGS",
    classification: "BY",
  },
  {
    articleCode: "310092446",
    articleName: "COMPOSTABLE KIRANA BAG 1KG-7X12.5 -20MIC",
    storeCount: 5,
    subCategory: "PACKAGING",
    brick: "PACKAGING",
    classification: "-",
  },
  {
    articleCode: "310092447",
    articleName: "COMPOSTABLE KIRANA BAG 3 KG-11X15 -25MIC",
    storeCount: 2,
    subCategory: "PACKAGING",
    brick: "PACKAGING",
    classification: "-",
  },
  {
    articleCode: "310092448",
    articleName: "COMPOSTABLE KIRANA BAG 5 KG-13X18 - 3MIC",
    storeCount: 6,
    subCategory: "PACKAGING",
    brick: "PACKAGING",
    classification: "-",
  },
  {
    articleCode: "310097791",
    articleName: 'PEG HOOK WHITE SEL 40X75MM- 3" CORE',
    storeCount: 10,
    subCategory: "DISPLAY MATERIAL",
    brick: "TAG SEL",
    classification: "-",
  },
];
```

## Components to Reuse

| Component                                                                 | Source     | Usage                                |
| ------------------------------------------------------------------------- | ---------- | ------------------------------------ |
| `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell`, `TableHead` | `@repo/ui` | Article data table                   |
| `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`                          | `@repo/ui` | Ranged/Unranged/Unlisted/Pending     |
| `ToggleGroup`, `ToggleGroupItem`                                          | `@repo/ui` | Filter pills (All, Local Gems, etc.) |
| `Checkbox`                                                                | `@repo/ui` | Row selection                        |
| `Input`                                                                   | `@repo/ui` | Search                               |
| `Button`                                                                  | `@repo/ui` | Export, Delist, Select All           |
| `Badge`                                                                   | `@repo/ui` | Classification labels                |
| `Card`, `CardContent`                                                     | `@repo/ui` | NOB cards, matrix card               |
| `Tooltip`, `TooltipTrigger`, `TooltipContent`                             | `@repo/ui` | Cell tooltips (AX ?, Store Count ?)  |
| `Skeleton`                                                                | `@repo/ui` | Loading                              |

## New Components to Create

| Component              | File                                                    | Purpose                     |
| ---------------------- | ------------------------------------------------------- | --------------------------- |
| `ClassificationMatrix` | `features/granary/components/classification-matrix.tsx` | 3x3 ABC-XYZ grid            |
| `NOBVolumeCards`       | `features/granary/components/nob-volume-cards.tsx`      | 4 NOB category cards        |
| `SelectionActionBar`   | `features/granary/components/selection-action-bar.tsx`  | Bottom sticky selection bar |

## File Changes

| File                                                    | Action | Details              |
| ------------------------------------------------------- | ------ | -------------------- |
| `pages/granary/range-review-page.tsx`                   | Create | Page composition     |
| `features/granary/components/classification-matrix.tsx` | Create | 3x3 matrix grid      |
| `features/granary/components/nob-volume-cards.tsx`      | Create | NOB vs Volume cards  |
| `features/granary/components/selection-action-bar.tsx`  | Create | Bottom selection bar |
| `features/granary/mock-data/range-review-mock.ts`       | Create | Mock data            |

## Interaction States

| Element             | State       | Behavior                                                                 |
| ------------------- | ----------- | ------------------------------------------------------------------------ |
| Matrix cell         | Hover       | Slight background darken, cursor pointer                                 |
| Matrix cell tooltip | Hover (?)   | Shows classification description                                         |
| NOB card            | Default     | Static display                                                           |
| Tab                 | Active      | Blue underline indicator                                                 |
| Tab                 | Inactive    | No underline, subdued text                                               |
| Filter pill         | Active      | Filled bg (`var(--primary-50)`), white text                              |
| Filter pill         | Inactive    | Outline border, default text                                             |
| Checkbox            | Unchecked   | Empty square                                                             |
| Checkbox            | Checked     | Filled with check icon, `var(--primary-50)`                              |
| Row                 | Selected    | `var(--primary-10)` background                                           |
| Selection bar       | 0 selected  | Hidden                                                                   |
| Selection bar       | 1+ selected | Slides up from bottom                                                    |
| Delist button       | Click       | Navigates to `/granary/assortment/delist-request` with selected articles |

## Acceptance Criteria

- [ ] Classification Matrix renders as a 3x3 grid with correct cell codes and percentages
- [ ] Cells are color-coded: green (strategic), yellow (regular), pink/red (review)
- [ ] Matrix has axis labels: "Revenue" (vertical) and "Demand Stability" (horizontal)
- [ ] Legend shows 3 SKU types with colored dots
- [ ] 4 NOB vs Volume cards render with colored left borders and metric values
- [ ] Tabs switch between Ranged, Unranged, Unlisted, Pending views
- [ ] Filter pills within Ranged tab filter the table data
- [ ] Table supports multi-select with checkboxes
- [ ] Selection action bar appears at bottom when rows are selected
- [ ] "Select All" selects all rows
- [ ] "Delist" navigates to delist wizard with selected articles
- [ ] "Export (N)" downloads selected articles
- [ ] Store Count shows count with tooltip icon
- [ ] All data from mock data files
