# Data Table Page

**Type:** Page
**Size:** Large
**Status:** v1 Implemented (display, sort, search, add columns/records)
**Created:** 2026-03-28
**Updated:** 2026-03-28
**Priority:** High
**Parent:** [Relio CRM Platform](./module-relio-crm.md)

## Overview

The Data Table page displays records from custom objects in a virtualized spreadsheet-like interface using `react-data-grid`. Currently supports display of 9 field types, multi-column sorting, client-side search filtering, row selection, and adding new columns/records.

### Implementation Notes

- **Library:** `react-data-grid` (named export `DataGrid`, NOT default) — replaces originally spec'd `react-virtual`
- **Page:** `apps/web/src/pages/app/objects/[objectId]/index.tsx`
- **Component:** `apps/web/src/features/tables/components/data-table.tsx`
- **Height:** `calc(100vh - 160px)` — explicitly set to avoid overflow
- **First column frozen** (name field)
- **Custom CSS theme:** `data-grid-theme.css` matches design system tokens

## Layout Pattern

**Pattern 2: Full-Width Table** with enhancements

```
┌─────────────────────────────────────────────────────────┐
│ [Object Icon] Companies                    [+ Add] [•••] │ ← Header
├─────────────────────────────────────────────────────────┤
│ [🔍 Search] [Filter ▾] [Group ▾] [Sort ▾]   [Views ▾]   │ ← Toolbar (24px gap)
├─────────────────────────────────────────────────────────┤
│ ☐ │ Name      │ Type    │ Revenue  │ Status  │ Date   │ │ ← Sticky header
│───┼───────────┼─────────┼──────────┼─────────┼────────┤ │
│ ☐ │ Acme Inc  │ B2B SaaS│ $1.2M    │ Active  │ Jan 15 │ │
│ ☐ │ TechCorp  │ E-comm  │ $850K    │ Lead    │ Feb 3  │ │
│ ☐ │ StartupXY │ Fintech │ $2.5M    │ Active  │ Mar 1  │ │ ← Virtualized rows
│   │ ...       │         │          │         │        │ │
└─────────────────────────────────────────────────────────┘
│ Showing 1-50 of 1,234            [< Previous] [Next >] │ ← Pagination
└─────────────────────────────────────────────────────────┘
```

## Requirements

### Core Features

- ✅ Virtualized rendering via `react-data-grid` (handles 10k+ rows)
- ✅ Multi-level column sorting (click headers, priority numbers shown)
- ✅ Client-side search filtering (searches all fields)
- ✅ Row selection with checkboxes (uses `@repo/ui` `Checkbox`)
- ✅ Column resizing (built-in react-data-grid)
- ✅ Add columns via "+" button with field type picker (9 types)
- ✅ Create records via dialog (CreateRecordDialog)
- ✅ First column frozen (name field stays visible on scroll)
- ✅ Custom cell renderers for 9 field types
- ✅ Footer showing record count / selection count
- 🚧 Inline editing for all field types (currently display-only)
- 🚧 Column reordering, show/hide
- 🚧 Advanced filtering (AND/OR conditions)
- 🚧 Grouping by single field
- 🚧 Saved views (filters + sort + columns)
- 🚧 Bulk delete action
- 🚧 Keyboard navigation beyond sorting

### Field Types Support

| Type        | Display                     | Edit            | Sort | Filter                 |
| ----------- | --------------------------- | --------------- | ---- | ---------------------- |
| Text        | Plain text                  | Input           | ✓    | Contains, equals       |
| Number      | Formatted (1,234.56)        | Number input    | ✓    | =, >, <, between       |
| Email       | Clickable link              | Email input     | ✓    | Contains               |
| Phone       | Formatted                   | Phone input     | ✓    | Contains               |
| URL         | Clickable link              | URL input       | ✓    | Contains               |
| Date        | Formatted (Jan 15, 2026)    | Date picker     | ✓    | Before, after, between |
| DateTime    | Formatted (Jan 15, 3:45 PM) | DateTime picker | ✓    | Before, after, between |
| Boolean     | Toggle/Checkbox             | Toggle          | ✓    | Is true/false          |
| Select      | Badge with color            | Dropdown        | ✓    | Is, is not             |
| Multiselect | Multiple badges             | Multi-dropdown  | ✓    | Contains, not contains |
| Relation    | Link to record              | Search modal    | ✗    | -                      |
| File        | File name + icon            | Upload button   | ✗    | Has file, no file      |
| RichText    | Truncated preview           | Rich editor     | ✗    | Contains               |

## Design Tokens

### Colors

```css
/* Table structure */
--table-header-bg: var(--surface-10);
--table-row-bg: var(--surface-0);
--table-row-hover: var(--primary-10);
--table-row-selected: var(--primary-20);
--table-border: var(--grey-40);

/* Cell states */
--cell-editing: var(--primary-20); /* Background when editing */
--cell-error: var(--error-20); /* Invalid input */
--cell-focus: 2px solid var(--primary-50); /* Focus ring */
```

### Typography

```css
/* Table text */
--table-header-text: var(--text-default), 12px, weight 600, uppercase;
--table-cell-text: var(--text-default), 14px, weight 400;
--table-cell-subdued: var(--text-subdued-1), 12px;
```

### Dimensions

```css
--table-row-height: 48px;
--table-header-height: 40px;
--table-column-min-width: 120px;
--table-column-max-width: 400px;
--table-checkbox-width: 40px;
```

### Spacing

```css
--cell-padding: 12px 16px;
--toolbar-gap: 8px;
--header-margin-bottom: 24px;
```

## Components

### Existing (from packages/ui/src/)

- `Button` - Add record, bulk actions
- `Input` - Search, text fields
- `Checkbox` - Row selection, boolean fields
- `Select` - Dropdowns for filters, select fields
- `Popover` - Filter menu, column settings
- `Badge` - Select/multiselect values, status
- `Dialog` - Confirm delete, edit modals
- `DropdownMenu` - Row actions (•••)
- `Calendar` - Date picker
- `Tooltip` - Column headers, truncated text
- `ScrollArea` - Horizontal scroll on mobile

### Implemented Components

#### `DataTable` (Complex) — ✅ IMPLEMENTED

Main table component wrapping `react-data-grid`. Located at `features/tables/components/data-table.tsx`.

**Actual Props:**

```typescript
interface DataTableProps {
  fields: Field[]; // Field definitions from schema store
  records: TableRecord[]; // Records from records store
  searchQuery: string; // Client-side search filter
  height?: string; // Default: "calc(100vh - 160px)"
  onAddColumn?: (name: string, type: FieldType) => void; // "+" column callback
}
```

**Key implementation details:**

- Uses `DataGrid` (named export) from `react-data-grid`
- Converts `Field[]` to `Column<GridRow>[]` with type-specific renderers
- `GridRow` is a flat `{ __id: string, [fieldId]: unknown }` shape
- `SelectColumn` for row checkboxes
- Custom `renderCheckbox` using `@repo/ui` `Checkbox`
- Custom `renderSortStatus` with `ArrowUp`/`ArrowDown` icons
- "+" column appended when `onAddColumn` provided (dropdown with 9 field types)
- Badge color mapping for select/multiselect values (`BADGE_COLORS` object)

### Components Still Needed

#### `TableCell` (Complex)

Renders different field types with inline editing

**Props:**

```typescript
interface TableCellProps {
  field: Field; // Field definition
  value: any; // Current value
  recordId: string;
  isEditing: boolean;
  onStartEdit: () => void;
  onSave: (value: any) => Promise<void>;
  onCancel: () => void;
}
```

**Interaction:**

- Click → Enter edit mode
- Type → Update value
- Enter → Save and move down
- Tab → Save and move right
- Escape → Cancel edit
- Click outside → Save

#### `FilterBuilder` (Complex)

Advanced filter UI with AND/OR conditions

**Structure:**

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="secondary">
      Filter {activeFilters > 0 && `(${activeFilters})`}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-[400px]">
    <div className="filter-builder">
      {filters.map((filter) => (
        <FilterRow
          key={filter.id}
          field={filter.field}
          operator={filter.operator}
          value={filter.value}
          onUpdate={updateFilter}
          onRemove={removeFilter}
        />
      ))}
      <Button onClick={addFilter}>+ Add filter</Button>
      <div className="filter-logic">
        <RadioGroup value={logic} onValueChange={setLogic}>
          <Radio value="AND">Match all (AND)</Radio>
          <Radio value="OR">Match any (OR)</Radio>
        </RadioGroup>
      </div>
    </div>
  </PopoverContent>
</Popover>
```

#### `ColumnManager` (Simple)

Show/hide, reorder columns

**Structure:**

```tsx
<Popover>
  <PopoverTrigger>Columns</PopoverTrigger>
  <PopoverContent>
    <DragDropContext onDragEnd={handleReorder}>
      <Droppable>
        {columns.map((col) => (
          <Draggable key={col.id}>
            <Checkbox
              checked={col.visible}
              onCheckedChange={() => toggleColumn(col.id)}
            />
            <GripVertical size={16} />
            {col.name}
          </Draggable>
        ))}
      </Droppable>
    </DragDropContext>
  </PopoverContent>
</Popover>
```

## State Management

### Page Context (React Context)

```typescript
interface TablePageContext {
  // Data
  records: Map<string, TableRecord>; // Fast lookup
  recordIds: string[]; // Ordered for rendering

  // UI state
  selectedRows: Set<string>;
  editingCell: { recordId: string; fieldId: string } | null;

  // Configuration
  columns: TableColumn[];
  sorts: SortConfig[];
  filters: FilterConfig[];
  groupBy: string | null;

  // Actions
  setSelectedRows: (ids: Set<string>) => void;
  editCell: (recordId: string, fieldId: string) => void;
  saveCell: (value: any) => Promise<void>;
  cancelEdit: () => void;
  updateSort: (sorts: SortConfig[]) => void;
  updateFilters: (filters: FilterConfig[]) => void;
  toggleColumn: (fieldId: string) => void;
  reorderColumns: (from: number, to: number) => void;
}
```

### TanStack Query

```typescript
// Fetch records with filters
const { data, isLoading } = useQuery({
  queryKey: ["records", objectId, tenantId, { filters, sorts, page }],
  queryFn: () => fetchRecords({ objectId, filters, sorts, page }),
  staleTime: 30000, // 30s
});

// Update record (optimistic)
const updateMutation = useMutation({
  mutationFn: ({ recordId, fieldId, value }) =>
    updateRecord(recordId, fieldId, value),
  onMutate: async (vars) => {
    // Optimistic update
    await queryClient.cancelQueries(["records", objectId]);
    const previous = queryClient.getQueryData(["records", objectId]);
    queryClient.setQueryData(["records", objectId], (old) =>
      updateRecordInCache(old, vars),
    );
    return { previous };
  },
  onError: (err, vars, context) => {
    // Rollback on error
    queryClient.setQueryData(["records", objectId], context.previous);
  },
});
```

## Mock Data

### Sample Object: "Companies"

```typescript
const companiesObject: CustomObject = {
  id: "obj_companies",
  tenantId: "tenant_1",
  name: "Companies",
  icon: "Building2",
  fields: [
    { id: "f1", name: "Name", type: "text", required: true, position: 0 },
    {
      id: "f2",
      name: "Type",
      type: "select",
      config: {
        options: ["B2B SaaS", "E-commerce", "Fintech", "Healthcare"],
      },
      position: 1,
    },
    {
      id: "f3",
      name: "Revenue",
      type: "number",
      config: {
        format: "currency",
        currency: "USD",
      },
      position: 2,
    },
    {
      id: "f4",
      name: "Status",
      type: "select",
      config: {
        options: ["Lead", "Active", "Churned"],
      },
      position: 3,
    },
    { id: "f5", name: "Founded", type: "date", position: 4 },
    { id: "f6", name: "Website", type: "url", position: 5 },
    { id: "f7", name: "Email", type: "email", position: 6 },
    { id: "f8", name: "Is Active", type: "boolean", position: 7 },
    {
      id: "f9",
      name: "Tags",
      type: "multiselect",
      config: {
        options: ["Enterprise", "Startup", "Mid-market", "SMB"],
      },
      position: 8,
    },
  ],
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-03-28T00:00:00Z",
};

const mockRecords: TableRecord[] = [
  {
    id: "rec_1",
    objectId: "obj_companies",
    tenantId: "tenant_1",
    data: {
      f1: "Acme Inc",
      f2: "B2B SaaS",
      f3: 1200000,
      f4: "Active",
      f5: "2020-01-15",
      f6: "https://acme.com",
      f7: "contact@acme.com",
      f8: true,
      f9: ["Enterprise", "Mid-market"],
    },
    createdBy: "user_1",
    updatedBy: "user_1",
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-03-20T14:30:00Z",
  },
  {
    id: "rec_2",
    objectId: "obj_companies",
    tenantId: "tenant_1",
    data: {
      f1: "TechCorp Solutions",
      f2: "E-commerce",
      f3: 850000,
      f4: "Lead",
      f5: "2019-06-22",
      f6: "https://techcorp.io",
      f7: "info@techcorp.io",
      f8: false,
      f9: ["Startup"],
    },
    createdBy: "user_2",
    updatedBy: "user_2",
    createdAt: "2026-02-03T09:15:00Z",
    updatedAt: "2026-03-15T11:20:00Z",
  },
  {
    id: "rec_3",
    objectId: "obj_companies",
    tenantId: "tenant_1",
    data: {
      f1: "StartupXYZ",
      f2: "Fintech",
      f3: 2500000,
      f4: "Active",
      f5: "2021-03-10",
      f6: "https://startupxyz.com",
      f7: "hello@startupxyz.com",
      f8: true,
      f9: ["Enterprise", "Startup"],
    },
    createdBy: "user_1",
    updatedBy: "user_3",
    createdAt: "2026-03-01T16:45:00Z",
    updatedAt: "2026-03-28T09:00:00Z",
  },
  // ... 50+ more records for realistic scrolling
];
```

## Interaction States

### Table Row

- **Default:** `bg-surface-0`, border-bottom `grey-40`
- **Hover:** `bg-primary-10`, cursor pointer
- **Selected:** `bg-primary-20`, checkbox checked
- **Editing:** Cell has `bg-primary-20`, focus ring `2px primary-50`

### Table Cell

- **Default:** Padding 12px 16px, text-default
- **Hover:** Show edit cursor (text cursor)
- **Editing:** Input visible, focus ring, save on Enter/Tab
- **Error:** `bg-error-20`, border `error-50`, shake animation
- **Loading:** Skeleton shimmer

### Toolbar Buttons

- **Filter (active):** Badge with count `primary-50`
- **Sort (active):** Arrow icon shows direction
- **Views:** Current view name in bold

## Keyboard Navigation

| Key              | Action                                |
| ---------------- | ------------------------------------- |
| Arrow Up/Down    | Navigate rows                         |
| Arrow Left/Right | Navigate cells                        |
| Enter            | Start editing (or save and move down) |
| Tab              | Save and move right                   |
| Shift+Tab        | Save and move left                    |
| Escape           | Cancel edit                           |
| Space            | Toggle checkbox (if focused)          |
| Cmd+A            | Select all                            |
| Cmd+C            | Copy selected cells                   |

## Performance Optimizations

1. **Virtualization:** Only render visible rows (~30-50 at a time)
2. **Memoization:** Memo cells, rows to prevent re-renders
3. **Debounced search:** 300ms delay before search API call
4. **Lazy loading:** Load data in pages of 100 records
5. **Column width cache:** LocalStorage for user preferences
6. **Optimistic updates:** Update UI immediately, sync in background

## Accessibility

- ✅ WCAG 2.1 AA compliant
- ✅ Keyboard navigable (all actions via keyboard)
- ✅ Screen reader support:
  - `role="grid"` on table
  - `role="gridcell"` on cells
  - `aria-label` on action buttons
  - `aria-sort` on sorted columns
  - `aria-selected` on selected rows
- ✅ Focus visible indicators (4px ring)
- ✅ Color not sole indicator (icons + text)
- ✅ Minimum touch target 44x44px
- ✅ Sufficient contrast (4.5:1 text, 3:1 UI)

## Responsive

| Breakpoint | Behavior                                                     |
| ---------- | ------------------------------------------------------------ |
| < 768px    | Horizontal scroll, hide non-essential columns, stack toolbar |
| 768-1024px | Show most columns, single-line toolbar                       |
| > 1024px   | Full table, all features visible                             |

## File Changes

| File                                                               | Status     | Description                                  |
| ------------------------------------------------------------------ | ---------- | -------------------------------------------- |
| `apps/web/src/pages/app/objects/[objectId]/index.tsx`              | ✅ Created | Page entry point                             |
| `apps/web/src/pages/app/objects/index.tsx`                         | ✅ Created | Objects listing page (cards)                 |
| `apps/web/src/features/tables/components/data-table.tsx`           | ✅ Created | Main table component (react-data-grid)       |
| `apps/web/src/features/tables/components/data-grid-theme.css`      | ✅ Created | Custom theme CSS for react-data-grid         |
| `apps/web/src/features/tables/components/create-record-dialog.tsx` | ✅ Created | Dialog for creating records                  |
| `apps/web/src/features/tables/components/create-object-dialog.tsx` | ✅ Created | Dialog for creating objects (name + icon)    |
| `apps/web/src/features/tables/stores/records-store.ts`             | ✅ Created | Zustand records store                        |
| `apps/web/src/features/tables/utils/cell-formatters.ts`            | ✅ Created | Format values by field type                  |
| `apps/web/src/features/tables/types.ts`                            | ✅ Created | TableRecord, TableColumn, FilterConfig types |
| `apps/web/src/features/tables/mock-data.ts`                        | ✅ Created | Mock data for development                    |
| `apps/web/src/features/tables/index.ts`                            | ✅ Created | Barrel exports                               |
| `apps/web/src/features/tables/components/filter-builder.tsx`       | 🚧 TODO    | Advanced filter UI (AND/OR)                  |
| `apps/web/src/features/tables/components/column-manager.tsx`       | 🚧 TODO    | Show/hide, reorder columns                   |
| `apps/web/src/features/tables/utils/cell-validators.ts`            | 🚧 TODO    | Validate input by field type                 |

## Testing Strategy

### Unit Tests (Vitest)

- Cell formatters (all field types)
- Cell validators (input validation)
- Filter logic (AND/OR conditions)
- Sort logic (multi-level)
- Keyboard navigation handlers

### Component Tests (React Testing Library)

- DataTable renders correctly
- Inline editing works (click → type → save)
- Selection works (checkbox, shift-click range)
- Filtering updates table
- Sorting updates order
- Column reordering works

### E2E Tests (Playwright)

- Create new record
- Edit existing record
- Delete record
- Apply complex filter
- Save view

**Coverage target:** >90%

## Acceptance Criteria

- ✅ Table renders 10,000 rows with smooth 60fps scrolling
- ✅ All 12 field types display and edit correctly
- ✅ Inline editing works with keyboard navigation (Enter, Tab, Escape)
- ✅ Multi-select rows and perform bulk delete
- ✅ Apply 3-level sorting (e.g., Status → Revenue → Name)
- ✅ Create complex filter (e.g., Status = Active AND Revenue > $1M)
- ✅ Save view with filters, sorts, column config
- ✅ Column resize, reorder, show/hide persists in localStorage
- ✅ Mobile: Horizontal scroll works, essential columns visible
- ✅ Keyboard accessible (tab through all controls, arrow nav in cells)
- ✅ Screen reader announces row count, column headers, cell values

---

**Next:** [Database Builder Feature](./feature-database-builder.md) for creating custom objects and fields.
