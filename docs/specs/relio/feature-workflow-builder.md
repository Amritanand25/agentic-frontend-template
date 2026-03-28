# Workflow Builder Feature

**Type:** Feature
**Size:** Large
**Status:** v1 Implemented (canvas, nodes, sidebar — no persistence)
**Created:** 2026-03-28
**Updated:** 2026-03-28
**Priority:** Medium
**Parent:** [Relio CRM Platform](./module-relio-crm.md)

## Overview

Visual workflow automation builder using React Flow node-based interface. Users create automations with: **Trigger** -> **Conditions** (optional) -> **Actions**. Full-screen builder page at `/workflows/new` and `/workflows/:id/edit`.

## Scope (v1)

- Full-screen builder page with its own layout (no sidebar)
- Left sidebar with draggable node types
- React Flow canvas with custom node types
- Inline node configuration (dropdowns/inputs on each node, no side panel)
- Header with workflow name, Back, Test, Save buttons
- 3 trigger types, condition branching, 5 action types

## Layout

```
+---------------------------------------------------------+
| <- Back  "Workflow Name"            [Test] [Save Draft] |
+----------+----------------------------------------------+
|          |                                              |
| TRIGGERS |       [Trigger Node]                         |
| o Record |            |                                 |
|   Created|       [Condition Node]                       |
| o Record |          /    \                              |
|   Updated|   [Action]  [Action]                        |
| o Sched. |                                              |
|          |                                              |
| CONDITNS |                                              |
| o If/Else|                                              |
|          |                                              |
| ACTIONS  |                                              |
| o Send   |                                              |
|   Email  |          React Flow Canvas                   |
| o Update |          (drag & drop, connect)              |
|   Record |                                              |
| o Create |                                              |
|   Task   |                                              |
| o Notify |                                              |
| o Delay  |                                              |
|          |                                              |
| 240px    |                                              |
+----------+----------------------------------------------+
```

## Node Types

### Triggers (1 per workflow, always first)

| Type               | Config                  |
| ------------------ | ----------------------- |
| **Record Created** | Object selector         |
| **Record Updated** | Object + field selector |
| **Scheduled**      | Frequency dropdown      |

### Conditions (optional, branching)

| Type        | Config                        |
| ----------- | ----------------------------- |
| **If/Else** | Field, operator, value inputs |

### Actions

| Type              | Config                    |
| ----------------- | ------------------------- |
| **Send Email**    | To, subject, body inputs  |
| **Update Record** | Object, field, value      |
| **Create Task**   | Title, assignee, due date |
| **Send Notify**   | Channel, message          |
| **Wait/Delay**    | Duration + unit dropdown  |

## Design Tokens

```css
--canvas-bg: var(--surface-10);
--canvas-grid: var(--grey-30);
--node-bg: var(--surface-0);
--node-border: var(--grey-40);
--node-border-selected: var(--primary-50);
--node-trigger-accent: var(--success-50);
--node-condition-accent: var(--warning-50);
--node-action-accent: var(--primary-50);
--node-shadow: var(--shadow-medium);
--edge-stroke: var(--grey-50);
--edge-active: var(--primary-50);
--sidebar-bg: var(--surface-0);
--sidebar-border: var(--grey-40);
```

## Components (from @repo/ui)

- `Button`, `Input`, `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`
- `Card`, `CardContent`
- `Separator`
- `Badge`
- `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider`
- `ScrollArea`

## External Package

- `@xyflow/react` (React Flow v12) — visual node editor

## File Changes

| File                                                             | Status      | Description                 |
| ---------------------------------------------------------------- | ----------- | --------------------------- |
| `apps/web/src/pages/app/workflows/builder.tsx`                   | ✅ Created  | Full-screen builder page    |
| `apps/web/src/pages/app/workflows/index.tsx`                     | ✅ Created  | Workflow list page          |
| `apps/web/src/features/workflows/components/workflow-canvas.tsx` | ✅ Created  | React Flow canvas           |
| `apps/web/src/features/workflows/components/trigger-node.tsx`    | ✅ Created  | Trigger node component      |
| `apps/web/src/features/workflows/components/condition-node.tsx`  | ✅ Created  | Condition node component    |
| `apps/web/src/features/workflows/components/action-node.tsx`     | ✅ Created  | Action node component       |
| `apps/web/src/features/workflows/components/node-sidebar.tsx`    | ✅ Created  | Draggable node type sidebar |
| `apps/web/src/features/workflows/types.ts`                       | ✅ Created  | TypeScript types            |
| `apps/web/src/features/workflows/index.ts`                       | ✅ Created  | Barrel exports              |
| `apps/web/src/App.tsx`                                           | ✅ Modified | Added builder route         |

## Acceptance Criteria

- Drag node from sidebar onto canvas
- Connect nodes with edges (trigger -> condition -> action)
- Each node shows inline config (dropdowns, inputs)
- Delete node removes connected edges
- Save workflow (nodes + edges + config to mock store)
- Back button returns to workflows list
- Canvas supports zoom/pan
- Grid background on canvas
