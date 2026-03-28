# Database Builder Feature

**Type:** Feature
**Size:** Large
**Status:** Partially Implemented (create objects + add fields via table header)
**Created:** 2026-03-28
**Updated:** 2026-03-28
**Priority:** High
**Parent:** [Relio CRM Platform](./module-relio-crm.md)

## Overview

The Database Builder allows users to create custom objects (tables) with flexible field types, configure relationships between objects, and manage the complete schema for their CRM.

### Implementation Notes

**What's built:**

- `CreateObjectDialog` — name input + 12-icon picker (Building2, Users, DollarSign, Database, FileText, ShoppingCart, Briefcase, Tag, Globe, Heart, Star, Zap)
- Add columns via "+" button in DataTable header (9 field types)
- `SchemaStore` (Zustand) with `addObject()`, `addField()`, `updateObject()`, `deleteObject()`
- Default seed objects: Companies (10 fields), Contacts (8 fields), Deals (7 fields)
- Objects listing page shows cards (not sidebar list as originally spec'd)

**What's NOT built yet:**

- Full FieldEditor modal (type-specific config, required/unique constraints)
- Drag-and-drop field reordering
- Object templates selector in creation dialog
- Relationship configuration (1:1, 1:N, N:N)
- Duplicate object

## Layout Pattern

**Pattern 8: Sidebar + Content** with modal overlays

```
┌──────────────────────────────────────────────────────────┐
│ ☰ Objects                                     [+ New]    │ ← Header
├──────────┬──────────────────────────────────────────────┤
│ 📊 Companies │                                          │
│ 👤 Contacts  │ [Companies Object]                       │
│ 💰 Deals     │                                          │
│ 📧 Emails    │ [Icon] Companies                         │
│ 📅 Events    │ 245 records                              │
│              │                                          │
│ Sidebar      │ Fields (12):                             │
│ 240px        │ ┌────────────────────────────────────┐   │
│              │ │ Name          │ Text     │ [Edit] │   │
│              │ │ Type          │ Select   │ [Edit] │   │
│              │ │ Revenue       │ Number   │ [Edit] │   │
│              │ │ Status        │ Select   │ [Edit] │   │
│              │ │ ...           │          │        │   │
│              │ └────────────────────────────────────┘   │
│              │ [+ Add Field]                            │
│              │                                          │
│              │ Settings:                                │
│              │ • Primary field: Name                    │
│              │ • Icon: Building2                        │
│              │ • Color: Blue                            │
└──────────┴──────────────────────────────────────────────┘
```

**Field Editor Modal:**

```
┌────────────────────────────────────────┐
│ Create Field                     [×]   │
├────────────────────────────────────────┤
│ Field Name *                           │
│ [Revenue               ]               │
│                                        │
│ Field Type *                           │
│ [Number                ▾]              │
│                                        │
│ ┌─ Number Configuration ─────────────┐ │
│ │ Format: [Currency  ▾]              │ │
│ │ Currency: [USD ▾]                  │ │
│ │ Decimal places: [2]                │ │
│ │ ☑ Show thousands separator         │ │
│ │ ☐ Allow negative                   │ │
│ └────────────────────────────────────┘ │
│                                        │
│ ☑ Required field                       │
│ ☐ Unique values                        │
│                                        │
│ Description (optional)                 │
│ [Annual recurring revenue      ]       │
│                                        │
│        [Cancel]  [Create Field]        │
└────────────────────────────────────────┘
```

## Requirements

### Core Features

- ✅ Create custom objects (name + icon picker via CreateObjectDialog)
- ✅ Add fields to objects (9 types via "+" column in table header)
- ✅ Delete custom objects (via schema store)
- ✅ Default seed objects (Companies, Contacts, Deals) loaded on first use
- ✅ Object icon selection (12 Lucide icons)
- ✅ Schema store persistence (Zustand, in-memory)
- 🚧 Edit existing fields (name, type, config)
- 🚧 Delete individual fields
- 🚧 14 field types with type-specific configuration (currently 9 basic types)
- 🚧 Drag-and-drop field reordering
- 🚧 Set required/unique constraints
- 🚧 Configure relationships between objects
- 🚧 Duplicate objects (copy schema)
- 🚧 Object templates (pre-built selector in creation dialog)
- 🚧 Bulk import fields (CSV/JSON)

## Field Types & Configuration

| Type            | Config Options                                                  | Example                       |
| --------------- | --------------------------------------------------------------- | ----------------------------- |
| **Text**        | Max length, Default value                                       | Name, Description             |
| **Number**      | Format (decimal, currency, percentage), Decimal places, Min/Max | Revenue, Age, Count           |
| **Email**       | -                                                               | contact@example.com           |
| **Phone**       | Format (US, International)                                      | +1 (555) 123-4567             |
| **URL**         | -                                                               | https://example.com           |
| **Date**        | Format (MM/DD/YYYY, DD/MM/YYYY)                                 | 01/15/2026                    |
| **DateTime**    | Format, Timezone                                                | 01/15/2026 3:45 PM EST        |
| **Boolean**     | Default value, Labels (Yes/No, True/False)                      | Is Active                     |
| **Select**      | Options (add/remove), Default, Colors                           | Status: Lead, Active, Churned |
| **Multiselect** | Options (add/remove), Max selections                            | Tags: Enterprise, Startup     |
| **Relation**    | Target object, Relationship type (1:1, 1:N, N:N), Display field | Company → Contacts            |
| **File**        | Max size, Allowed types (image, pdf, doc)                       | Logo, Contract                |
| **RichText**    | Max length, Toolbar (basic, full)                               | Notes, Description            |
| **Formula**     | Formula expression, Return type                                 | Total = Quantity × Price      |
| **Rollup**      | Related field, Aggregation (sum, avg, count, min, max)          | Sum of Deal values            |

## Design Tokens

### Colors

```css
/* Object list */
--object-item-bg: var(--surface-0);
--object-item-hover: var(--primary-10);
--object-item-active: var(--primary-20);

/* Field list */
--field-row-bg: var(--surface-0);
--field-row-hover: var(--grey-20);
--field-drag-handle: var(--grey-60);

/* Modal */
--modal-bg: var(--surface-0);
--modal-backdrop: var(--blur);
--modal-width: 600px;
```

### Typography

```css
--object-name: 16px, weight 600;
--object-count: 12px, subdued-1;
--field-name: 14px, weight 500;
--field-type: 12px, subdued-1;
```

### Spacing

```css
--sidebar-width: 240px;
--object-item-padding: 12px 16px;
--field-row-padding: 12px;
--field-gap: 16px;
--modal-padding: 24px;
```

## Components

### Existing (from packages/ui/src/)

- `Button` - Add object, add field, save
- `Input` - Field names, object names
- `Select` - Field types, format options
- `Dialog` - Create/edit object, create/edit field
- `Label` - Form labels
- `Checkbox` - Required, unique, boolean config
- `Badge` - Field type badges
- `Separator` - Section dividers
- `ScrollArea` - Sidebar, field list
- `Tooltip` - Field type descriptions
- `RadioGroup` - Relationship types
- `Textarea` - Description fields
- `Command` - Icon picker

### New Components Needed

#### `ObjectList` (Simple)

Sidebar list of all custom objects

**Props:**

```typescript
interface ObjectListProps {
  objects: CustomObject[];
  activeObjectId: string | null;
  onSelectObject: (objectId: string) => void;
  onCreateObject: () => void;
}
```

**Structure:**

```tsx
<div className="object-list">
  <div className="object-list-header">
    <h2>Objects</h2>
    <Button size="sm" onClick={onCreateObject}>
      <Plus size={16} /> New
    </Button>
  </div>
  <ScrollArea>
    {objects.map((obj) => (
      <div
        key={obj.id}
        className={cn("object-item", {
          active: obj.id === activeObjectId,
        })}
        onClick={() => onSelectObject(obj.id)}
      >
        <Icon name={obj.icon} size={20} />
        <div>
          <div className="object-name">{obj.name}</div>
          <div className="object-count">{obj.recordCount} records</div>
        </div>
      </div>
    ))}
  </ScrollArea>
</div>
```

#### `FieldList` (Complex)

Displays and manages fields for selected object

**Props:**

```typescript
interface FieldListProps {
  object: CustomObject;
  onAddField: () => void;
  onEditField: (fieldId: string) => void;
  onDeleteField: (fieldId: string) => void;
  onReorderFields: (from: number, to: number) => void;
}
```

**Structure:**

```tsx
<div className="field-list">
  <div className="field-list-header">
    <h3>Fields ({fields.length})</h3>
    <Button size="sm" onClick={onAddField}>
      <Plus size={16} /> Add Field
    </Button>
  </div>

  <DragDropContext onDragEnd={handleDragEnd}>
    <Droppable droppableId="fields">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {fields.map((field, index) => (
            <Draggable key={field.id} draggableId={field.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  className="field-row"
                >
                  <div {...provided.dragHandleProps}>
                    <GripVertical size={16} />
                  </div>
                  <div className="field-info">
                    <span className="field-name">{field.name}</span>
                    <Badge variant="secondary">{field.type}</Badge>
                    {field.required && (
                      <Badge variant="outline">Required</Badge>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => onEditField(field.id)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDeleteField(field.id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
</div>
```

#### `FieldEditor` (Complex)

Modal for creating/editing fields

**Props:**

```typescript
interface FieldEditorProps {
  open: boolean;
  mode: "create" | "edit";
  field?: Field;
  objectId: string;
  onSave: (field: Partial<Field>) => Promise<void>;
  onClose: () => void;
}
```

**Structure:**

```tsx
<Dialog open={open} onOpenChange={onClose}>
  <DialogContent className="max-w-[600px]">
    <DialogHeader>
      <DialogTitle>{mode === "create" ? "Create" : "Edit"} Field</DialogTitle>
    </DialogHeader>

    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        {/* Field name */}
        <div>
          <Label htmlFor="name">Field Name *</Label>
          <Input
            id="name"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            placeholder="e.g., Revenue, Status"
          />
        </div>

        {/* Field type */}
        <div>
          <Label htmlFor="type">Field Type *</Label>
          <Select value={fieldType} onValueChange={setFieldType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FIELD_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <type.icon size={16} />
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Type-specific config */}
        <FieldTypeConfig
          type={fieldType}
          config={config}
          onChange={setConfig}
        />

        {/* Constraints */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="required"
              checked={required}
              onCheckedChange={setRequired}
            />
            <Label htmlFor="required">Required field</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="unique"
              checked={unique}
              onCheckedChange={setUnique}
            />
            <Label htmlFor="unique">Unique values only</Label>
          </div>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description (optional)</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Help text for this field"
            rows={3}
          />
        </div>
      </div>

      <DialogFooter>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={!isValid}>
          {mode === "create" ? "Create Field" : "Save Changes"}
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
```

#### `ObjectEditor` (Medium)

Modal for creating/editing objects

**Structure:**

```tsx
<Dialog open={open} onOpenChange={onClose}>
  <DialogContent className="max-w-[500px]">
    <DialogHeader>
      <DialogTitle>{mode === "create" ? "Create" : "Edit"} Object</DialogTitle>
    </DialogHeader>

    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        {/* Object name */}
        <div>
          <Label htmlFor="name">Object Name *</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Companies, Contacts"
          />
        </div>

        {/* Icon picker */}
        <div>
          <Label>Icon</Label>
          <IconPicker value={icon} onChange={setIcon} />
        </div>

        {/* Color */}
        <div>
          <Label>Color</Label>
          <ColorPicker value={color} onChange={setColor} />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description (optional)</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
          />
        </div>

        {mode === "create" && (
          <div>
            <Label>Start from template (optional)</Label>
            <Select value={template} onValueChange={setTemplate}>
              <SelectOption value="">Blank object</SelectOption>
              <SelectOption value="companies">Companies</SelectOption>
              <SelectOption value="contacts">Contacts</SelectOption>
              <SelectOption value="deals">Deals</SelectOption>
            </Select>
          </div>
        )}
      </div>

      <DialogFooter>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {mode === "create" ? "Create Object" : "Save Changes"}
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
```

## State Management

### Feature Store (Zustand)

```typescript
interface SchemaStore {
  // Data
  objects: Map<string, CustomObject>;
  activeObjectId: string | null;

  // Actions
  loadObjects: (tenantId: string) => Promise<void>;
  createObject: (object: Partial<CustomObject>) => Promise<void>;
  updateObject: (
    objectId: string,
    updates: Partial<CustomObject>,
  ) => Promise<void>;
  deleteObject: (objectId: string) => Promise<void>;

  // Fields
  addField: (objectId: string, field: Partial<Field>) => Promise<void>;
  updateField: (
    objectId: string,
    fieldId: string,
    updates: Partial<Field>,
  ) => Promise<void>;
  deleteField: (objectId: string, fieldId: string) => Promise<void>;
  reorderFields: (objectId: string, from: number, to: number) => Promise<void>;

  // UI
  setActiveObject: (objectId: string) => void;
}
```

### TanStack Query

```typescript
// Fetch all objects for tenant
const { data: objects } = useQuery({
  queryKey: ["objects", tenantId],
  queryFn: () => fetchObjects(tenantId),
  staleTime: 60000, // 1 minute
});

// Create object mutation
const createObjectMutation = useMutation({
  mutationFn: (object: Partial<CustomObject>) => createObject(object),
  onSuccess: (newObject) => {
    queryClient.setQueryData(["objects", tenantId], (old) => [
      ...old,
      newObject,
    ]);
    toast.success(`${newObject.name} created successfully`);
  },
});

// Update field mutation
const updateFieldMutation = useMutation({
  mutationFn: ({ objectId, fieldId, updates }) =>
    updateField(objectId, fieldId, updates),
  onMutate: async (vars) => {
    // Optimistic update
    await queryClient.cancelQueries(["objects", tenantId]);
    const previous = queryClient.getQueryData(["objects", tenantId]);
    queryClient.setQueryData(["objects", tenantId], (old) =>
      updateFieldInCache(old, vars),
    );
    return { previous };
  },
  onError: (err, vars, context) => {
    queryClient.setQueryData(["objects", tenantId], context.previous);
    toast.error("Failed to update field");
  },
});
```

## Mock Data

### Pre-built Templates

```typescript
const templates = {
  companies: {
    name: "Companies",
    icon: "Building2",
    fields: [
      { name: "Name", type: "text", required: true },
      {
        name: "Type",
        type: "select",
        config: {
          options: ["B2B SaaS", "E-commerce", "Fintech", "Healthcare"],
        },
      },
      {
        name: "Revenue",
        type: "number",
        config: { format: "currency", currency: "USD" },
      },
      { name: "Employees", type: "number", config: { format: "decimal" } },
      {
        name: "Status",
        type: "select",
        config: {
          options: ["Lead", "Active", "Churned"],
        },
      },
      { name: "Website", type: "url" },
      { name: "Email", type: "email" },
      { name: "Phone", type: "phone" },
      { name: "Founded", type: "date" },
      { name: "Is Active", type: "boolean", config: { default: true } },
    ],
  },

  contacts: {
    name: "Contacts",
    icon: "User",
    fields: [
      { name: "Full Name", type: "text", required: true },
      { name: "Email", type: "email", required: true },
      { name: "Phone", type: "phone" },
      {
        name: "Company",
        type: "relation",
        config: {
          targetObject: "companies",
          type: "N:1",
        },
      },
      { name: "Role", type: "text" },
      { name: "LinkedIn", type: "url" },
      {
        name: "Tags",
        type: "multiselect",
        config: {
          options: ["Decision Maker", "Champion", "Influencer", "End User"],
        },
      },
      { name: "Last Contacted", type: "datetime" },
    ],
  },

  deals: {
    name: "Deals",
    icon: "DollarSign",
    fields: [
      { name: "Deal Name", type: "text", required: true },
      {
        name: "Value",
        type: "number",
        config: { format: "currency", currency: "USD" },
      },
      {
        name: "Stage",
        type: "select",
        config: {
          options: [
            "Prospecting",
            "Qualified",
            "Proposal",
            "Negotiation",
            "Closed Won",
            "Closed Lost",
          ],
        },
      },
      {
        name: "Company",
        type: "relation",
        config: { targetObject: "companies", type: "N:1" },
      },
      { name: "Close Date", type: "date" },
      { name: "Probability", type: "number", config: { format: "percentage" } },
      { name: "Notes", type: "richtext" },
    ],
  },
};
```

## Validation Rules

```typescript
// Field name validation
const validateFieldName = (name: string, existingFields: Field[]) => {
  if (!name || name.trim().length === 0) {
    return "Field name is required";
  }
  if (name.length > 50) {
    return "Field name must be less than 50 characters";
  }
  if (existingFields.some((f) => f.name.toLowerCase() === name.toLowerCase())) {
    return "Field name already exists";
  }
  if (!/^[a-zA-Z0-9\s]+$/.test(name)) {
    return "Field name can only contain letters, numbers, and spaces";
  }
  return null;
};

// Object name validation
const validateObjectName = (name: string, existingObjects: CustomObject[]) => {
  if (!name || name.trim().length === 0) {
    return "Object name is required";
  }
  if (name.length > 50) {
    return "Object name must be less than 50 characters";
  }
  if (
    existingObjects.some((o) => o.name.toLowerCase() === name.toLowerCase())
  ) {
    return "Object name already exists";
  }
  return null;
};
```

## Interaction States

### Object Item

- **Default:** bg-surface-0, border transparent
- **Hover:** bg-primary-10, cursor pointer
- **Active:** bg-primary-20, border-left 4px primary-50

### Field Row

- **Default:** bg-surface-0
- **Hover:** bg-grey-20, show drag handle
- **Dragging:** opacity 0.5, cursor grabbing

### Modal

- **Enter:** Fade in 150ms, scale from 0.95
- **Exit:** Fade out 100ms, scale to 0.95
- **Backdrop:** Blur effect, rgba(0,0,0,0.65)

## Accessibility

- ✅ Keyboard navigable (Tab, Enter, Escape, Arrow keys)
- ✅ Screen reader support:
  - `aria-label` on icon picker, drag handles
  - `role="dialog"` on modals
  - `aria-describedby` for field descriptions
- ✅ Focus visible indicators
- ✅ Form validation with clear error messages
- ✅ Sufficient color contrast

## File Changes

| File                                                            | Type   | Description                |
| --------------------------------------------------------------- | ------ | -------------------------- |
| `apps/web/src/features/database/components/ObjectList.tsx`      | Create | Sidebar object list        |
| `apps/web/src/features/database/components/FieldList.tsx`       | Create | Field management UI        |
| `apps/web/src/features/database/components/FieldEditor.tsx`     | Create | Field create/edit modal    |
| `apps/web/src/features/database/components/ObjectEditor.tsx`    | Create | Object create/edit modal   |
| `apps/web/src/features/database/components/FieldTypeConfig.tsx` | Create | Type-specific field config |
| `apps/web/src/features/database/components/IconPicker.tsx`      | Create | Lucide icon picker         |
| `apps/web/src/features/database/hooks/useSchemaStore.ts`        | Create | Zustand schema store       |
| `apps/web/src/features/database/utils/templates.ts`             | Create | Pre-built object templates |
| `apps/web/src/features/database/utils/validators.ts`            | Create | Field/object validation    |
| `apps/web/src/features/database/types.ts`                       | Create | TypeScript types           |

## Testing Strategy

### Unit Tests

- Field/object name validation
- Template creation logic
- Field reordering logic

### Component Tests

- ObjectList renders all objects
- FieldEditor validates input
- Field type config updates correctly
- Drag-and-drop reordering works

### E2E Tests

- Create object from template
- Add 5 different field types
- Reorder fields via drag-drop
- Delete field and confirm

**Coverage target:** >90%

## Acceptance Criteria

- ✅ Create custom object from blank or template
- ✅ Add 14 different field types with type-specific config
- ✅ Reorder fields via drag-and-drop
- ✅ Set field constraints (required, unique)
- ✅ Edit existing fields without data loss
- ✅ Delete field with confirmation
- ✅ Duplicate object (copy schema)
- ✅ Validation prevents duplicate field/object names
- ✅ Keyboard accessible (create field via keyboard)
- ✅ Changes reflect immediately in Data Table page

---

**Next:** [Dashboard Page](./page-dashboard.md) for KPIs and visualizations.
