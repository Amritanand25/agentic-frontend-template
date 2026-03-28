---
name: layout-creator
description: 12 page layout patterns for dashboards, tables, forms, galleries, feeds, boards, and workflows. Use when building pages or views.
---

# Layout Creator — 12 Page Layout Patterns

## Pattern 1: Dashboard KPI

**Use for:** Overview pages, metrics dashboards

- KPI grid: `repeat(auto-fit, minmax(220px, 1fr))`, gap 16px
- Split content: `3fr 2fr` on desktop, stack mobile
- Section gaps: 24px

## Pattern 2: Full-Width Table

**Use for:** Data listings, records, reports

- Section header: flex space-between (title left, actions right)
- Filters: flex wrap, gap 8px
- Table: sticky header, horizontal scroll
- Pagination: bottom, space-between

## Pattern 3: Stacked Sections

**Use for:** Multi-section pages, category overviews

- Section gap: 24px, each in card wrapper (padding 24px)
- Section header: space-between, margin-bottom 16px

## Pattern 4: Split Content

**Use for:** Analytics, visualizations with side panel

- Split: `3fr 2fr` (primary wider), gap 24px
- Variants: `2fr 3fr`, `1fr 1fr`
- Stack on mobile (<768px)

## Pattern 5: Master-Detail

**Use for:** Item selection with detail panel, inbox-style

- Split: `320px minmax(0, 1fr)` (fixed left, fluid right)
- Left: scrollable list, max-height `calc(100vh - 200px)`
- Right: collapsible sections, key-value grid `repeat(auto-fit, minmax(180px, 1fr))`

## Pattern 6: Stepper Flow

**Use for:** Multi-step forms, wizards, workflows

- Header: back + title + stepper (center) + actions (right)
- Split: `320px minmax(0, 1fr)`, gap 24px
- Footer: Previous (left), Next (right)

## Pattern 7: Alert Cards

**Use for:** Landing pages, notification feeds

- Card grid: `repeat(auto-fit, minmax(280px, 1fr))`, gap 16px
- Card: icon + badge + title + count

## Pattern 8: Sidebar + Content

**Use for:** Admin panels, settings, documentation

- Split: `240px minmax(0, 1fr)` (fixed sidebar, fluid content)
- Sidebar: sticky top, full height, scrollable, collapsible on mobile

## Pattern 9: Grid Gallery

**Use for:** Product catalogs, image galleries

- Grid: `repeat(auto-fill, minmax(240px, 1fr))`, gap 16-24px
- Card: image (aspect-ratio 4:3) + title + metadata
- Virtualize if >100 items

## Pattern 10: Timeline/Feed

**Use for:** Activity feeds, audit logs

- Timeline: left border/dots, date separators (sticky, bold)
- Item: timestamp + avatar + action + metadata
- Gap: 16px items, 24px days

## Pattern 11: Kanban Board

**Use for:** Task boards, pipelines

- Columns: flex, `minmax(280px, 1fr)`, gap 16px
- Cards: gap 12px, drag-and-drop

## Pattern 12: Form + Preview

**Use for:** Editors, builders, email composers

- Split: `1fr 1fr`, gap 24px
- Preview: debounced onChange (300ms), device/theme toggles

---

## Composition Guide

| Page Type | Primary           | Secondary |
| --------- | ----------------- | --------- |
| Dashboard | 1 (KPI)           | 4 (Split) |
| Data List | 2 (Table)         | —         |
| Overview  | 3 (Stacked)       | —         |
| Analytics | 4 (Split)         | 2 (Table) |
| Detail    | 5 (Master-Detail) | —         |
| Workflow  | 6 (Stepper)       | —         |
| Alerts    | 7 (Cards)         | 4 (Split) |
| Admin     | 8 (Sidebar)       | 2 or 3    |
| Catalog   | 9 (Gallery)       | —         |
| Activity  | 10 (Timeline)     | —         |
| Tasks     | 11 (Kanban)       | —         |
| Editor    | 12 (Form Preview) | —         |

## Spacing

| Between                 | Gap  |
| ----------------------- | ---- |
| Title → filters         | 16px |
| Filters → content       | 24px |
| Sections                | 24px |
| Section title → content | 16px |
| Cards in grid           | 16px |
| Items in list           | 12px |
| Split panels            | 24px |

## Responsive

| Breakpoint | Behavior                      |
| ---------- | ----------------------------- |
| <768px     | Stack grids, hide sidebar     |
| 768-1024px | 2-col grids, collapse sidebar |
| >1024px    | Full layouts, show sidebar    |
