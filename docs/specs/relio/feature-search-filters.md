# Search & Filters Feature

**Type:** Feature
**Size:** Medium
**Status:** Partially Implemented (⌘K global search with page/object navigation)
**Created:** 2026-03-28
**Updated:** 2026-03-28
**Priority:** Medium
**Parent:** [Relio CRM Platform](./module-relio-crm.md)

## Overview

Global search across all objects, advanced filtering with saved views, and quick filters for common queries.

## Implementation Notes

**What's built (in `layouts/app-layout.tsx`):**

- ⌘K keyboard shortcut opens `CommandDialog` (from `@repo/ui`)
- Search trigger button in sidebar (styled: 36px height, surface-10 bg, grey-30 border)
- Works in both collapsed and expanded sidebar states
- **Pages group:** Dashboard, Inbox, Workflows, Settings — each navigates on click
- **Objects group:** Dynamic list from `schemaStore.getObjectsList()` with record counts
- All items navigate using `react-router-dom` `useNavigate` and close the dialog

**What's NOT built yet:**

- Record-level search results (search inside record data)
- Search result highlights
- Recent searches history
- Debounced API search
- Advanced filter builder (AND/OR conditions) — separate from ⌘K
- Saved views (filter + sort + column presets)
- Quick filter presets/chips

## Requirements

- ✅ Global search (⌘K shortcut) — implemented in app-layout.tsx
- ✅ Navigate to pages and objects
- 🚧 Search across record data
- 🚧 Advanced filter builder (AND/OR conditions)
- 🚧 Saved views (filters + sorts + columns)
- 🚧 Quick filters (predefined common filters)
- 🚧 Search results with highlights
- 🚧 Recent searches
- 🚧 Debounced search (300ms)

## Components

### `GlobalSearch` (Complex)

Command palette for global search

```tsx
<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput
    placeholder="Search anything... (⌘K)"
    value={query}
    onValueChange={setQuery}
  />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Objects">
      {objectResults.map((obj) => (
        <CommandItem
          key={obj.id}
          onSelect={() => navigate(`/objects/${obj.id}`)}
        >
          <Icon name={obj.icon} />
          {obj.name}
          <Badge>{obj.recordCount} records</Badge>
        </CommandItem>
      ))}
    </CommandGroup>
    <CommandGroup heading="Records">
      {recordResults.map((record) => (
        <CommandItem key={record.id} onSelect={() => openRecord(record.id)}>
          {highlightMatch(record.name, query)}
          <span className="text-subdued">{record.objectName}</span>
        </CommandItem>
      ))}
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Recent">
      {recentSearches.map((search) => (
        <CommandItem key={search} onSelect={() => setQuery(search)}>
          <Clock size={16} />
          {search}
        </CommandItem>
      ))}
    </CommandGroup>
  </CommandList>
</CommandDialog>;

// Trigger: Keyboard shortcut
useEffect(() => {
  const down = (e) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setOpen(true);
    }
  };
  document.addEventListener("keydown", down);
  return () => document.removeEventListener("keydown", down);
}, []);
```

### `SavedViews` (Medium)

Dropdown to save and load filter presets

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="secondary">
      <Eye size={16} />
      {currentView?.name || "All Records"}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-[300px]">
    <div className="space-y-2">
      <div className="font-medium">Saved Views</div>
      {savedViews.map((view) => (
        <div
          key={view.id}
          className="flex items-center justify-between p-2 hover:bg-grey-20 rounded cursor-pointer"
          onClick={() => loadView(view.id)}
        >
          <span>{view.name}</span>
          <DropdownMenu>
            <DropdownMenuTrigger>⋮</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => updateView(view.id)}>
                Update
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteView(view.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
      <Separator />
      <Button variant="outline" size="sm" onClick={saveCurrentView}>
        <Plus size={16} /> Save Current View
      </Button>
    </div>
  </PopoverContent>
</Popover>
```

### `QuickFilters` (Simple)

Common filter presets as chips

```tsx
<div className="quick-filters">
  <span className="text-subdued-1">Quick filters:</span>
  <Badge
    variant={activeFilter === 'active' ? 'primary' : 'secondary'}
    onClick={() => applyQuickFilter('active')}
  >
    Active only
  </Badge>
  <Badge
    variant={activeFilter === 'recent' ? 'primary' : 'secondary'}
    onClick={() => applyQuickFilter('recent')}
  >
    Last 30 days
  </Badge>
  <Badge
    variant={activeFilter === 'high-value' ? 'primary' : 'secondary'}
    onClick={() => applyQuickFilter('high-value')}
  >
    Revenue > $50K
  </Badge>
</div>
```

## State Management

```typescript
interface SearchStore {
  globalQuery: string;
  recentSearches: string[];
  setGlobalQuery: (query: string) => void;
  addRecentSearch: (query: string) => void;
}

interface ViewsStore {
  savedViews: SavedView[];
  currentViewId: string | null;
  createView: (
    name: string,
    filters: Filter[],
    sorts: Sort[],
    columns: Column[],
  ) => void;
  loadView: (viewId: string) => void;
  updateView: (viewId: string, updates: Partial<SavedView>) => void;
  deleteView: (viewId: string) => void;
}
```

## Mock Data

```typescript
const mockSavedViews: SavedView[] = [
  {
    id: "view_1",
    name: "Active Enterprise Clients",
    objectId: "obj_companies",
    filters: [
      { field: "status", operator: "equals", value: "Active" },
      { field: "tags", operator: "contains", value: "Enterprise" },
    ],
    sorts: [{ field: "revenue", direction: "desc" }],
    columns: ["name", "revenue", "status", "founded"],
    createdAt: "2026-03-01T00:00:00Z",
  },
  {
    id: "view_2",
    name: "Hot Leads",
    objectId: "obj_deals",
    filters: [
      { field: "stage", operator: "equals", value: "Proposal" },
      { field: "value", operator: "greater", value: 100000 },
    ],
    sorts: [{ field: "closeDate", direction: "asc" }],
    columns: ["dealName", "value", "stage", "closeDate"],
    createdAt: "2026-03-15T00:00:00Z",
  },
];
```

## Acceptance Criteria

- ✅ Press ⌘K to open global search
- ✅ Type query, see results from all objects
- ✅ Click result to navigate to record
- ✅ Recent searches appear at bottom
- ✅ Save current filters as named view
- ✅ Load saved view restores filters + sorts + columns
- ✅ Quick filter chips apply common filters instantly

---

**Next:** [Collaboration Feature](./feature-collaboration.md)
