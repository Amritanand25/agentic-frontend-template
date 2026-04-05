# DataGrid Extraction to @repo/ui

**Date:** 2026-04-04
**Context:** Moved react-data-grid from apps/web to packages/ui as a wrapped component

## Summary

- Created `packages/ui/src/data-grid.tsx` — wrapper around react-data-grid with theme auto-applied
- Moved `data-grid-theme.css` to `packages/ui/src/`
- Built-in `gridRenderers` (checkbox via @repo/ui Checkbox, sort status via Lucide icons)
- Wrapper auto-applies `rdg-theme` class and default `rowHeight=48`, `headerRowHeight=40`
- Moved `react-data-grid` dep from `apps/web/package.json` to `packages/ui/package.json`
- Deleted old `grid-renderers.tsx` and `data-grid-theme.css` from pages folder
- Removed duplicate renderCheckbox/renderSortStatus from `features/tables/components/data-table.tsx`

## Exports

- Components: `DataGrid`, `TreeDataGrid`, `SelectColumn`, `gridRenderers`, `renderTextEditor`
- Types: `Column`, `ColumnOrColumnGroup`, `SortColumn`, `RenderCellProps`, `RenderEditCellProps`, `RenderGroupCellProps`, `Renderers`, `DataGridProps`

## Feature-specific CSS

- `features/tables/components/data-grid-theme.css` kept for table-feature-specific styles (cell badges, boolean cells, links) — trimmed to only unique styles, base theme loads from wrapper
