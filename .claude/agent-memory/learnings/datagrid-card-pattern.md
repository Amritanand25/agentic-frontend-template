# DataGrid Card Container Pattern

**Date:** 2026-04-05
**Context:** User defined the standard layout for DataGrid inside cards

## Summary

- Row 1: `Tabs` (variant="subtab") for status filtering + `SearchBar` + primary Button — NEVER ToggleGroup here
- Row 2: `FilterPill` components for data filtering
- Row 3: `ToggleGroup` pills at 24px height for data view switching — NEVER Tabs here
- Row 4: `DataGrid` with `className="rdg-inline"` inside `CardContent` with `padding: 0` (full width)
- Row 5: `TablePagination`
- `<Separator />` between EVERY row
- All wrapped in one `<Card>` with `surface-0` + `radius-24`
- Important action buttons use `variant="default"` (primary), never secondary/ghost
