---
name: component-design
description: Build React components following the design system AND React performance best practices. Use when creating any UI component — buttons, inputs, modals, forms, data tables, dropdowns, navigation, cards, or any interactive element. This skill combines design system component specs (sizes, states, tokens, accessibility) with React patterns (memoization, virtualization, controlled/uncontrolled, compound components, render optimization). Always use the design-system-ui skill alongside this one for token values.
---

# Component Design — React + Design System

Build production-grade React components that follow the design system specification AND React performance best practices. This skill covers **what to build** (specs, sizes, states) and **how to build it well** (React patterns, performance, accessibility).

> **Prerequisite:** This skill references design tokens from the `design-system-ui` skill. All colors, spacing, typography, and radius values come from there. Never hardcode visual values.

---

## PART 1: Component Specifications

### Component Catalog

**Basic Elements:** Text, Avatar (xs/s/m/l), AvatarGroup, Badge (xs/s/m/l), CounterBadge, Divider, Shimmer, Spinner (s/m/l), Tag (xs/s/m/l), Tooltip, Tile, EmptyState

**Actions & Controls:** Button (xs/s/m/l/xl), IconButton (s/m/l), Toggle (s/m), SwipeButton, Link, Slider

**Form Inputs:** Input (s/m/l), TextArea, OTPInput, InputLabel, Checkbox (s/m/l), RadioButtons, Dropdown (s/m/l), DatePicker (s/m/l), TimePicker, Calendar, SearchBar (s/m/l), Selector, SelectorDropdown, FilterPill, FileUpload

**Navigation:** Tabs, Breadcrumb, Pagination, Sidebar, FormNavigation, ProgressStepper, StepperFlow, FormStepper

**Feedback:** Banner, Notifications/Toast, FeedbackMessage, ProgressBar

**Overlays:** Modal (xs/s/m/l/full), RightPanel, BottomSheet, Popover, Accordion, TitleBar, Scrollbar, FileViewer, Carousel

**Data Display:** DataTable, Graphs (Area, Bar, Simple Bar, Combo, Donut, Funnel, Line, Matrix, Pie, Radar, Scatter, Treemap, Segmented Progress Bar), Map

---

### Button Specification

**Anatomy:** [Optional Prefix Icon] + [Label] + [Optional Suffix Icon]

| Size | Height | H-Pad | V-Pad | Font | Icon | Gap |
|------|--------|-------|-------|------|------|-----|
| XS | 24px | 8px | 4px | Body S Prominent (12px/500) | 16x16 | 4px |
| S | 32px | 12px | 4px | Body M Prominent (14px/500) | 16x16 | 4px |
| M | 40px | 16px | 8px | Body M Prominent (14px/500) | 20x20 | 8px |
| L | 48px | 20px | 12px | Body L Prominent (16px/500) | 24x24 | 8px |
| XL | 64px | 32px | 16px | Body 2XL Prominent (24px/500) | 32x32 | 8px |

**Kinds:** Primary (250px pill, solid fill), Secondary (250px pill, transparent+1px border), Tertiary (12px radius, no fill/border/padding)

**Appearances:** Default (primary-50), Contrast (white), Positive (success-50), Negative (error-50), Warning (warning-50), AI (gradient #1ECCB0→primary-50)

**States:**
- Primary: default=primary-50/inverse → hover=primary-40 → active=primary-60/primary-30 → disabled=30%
- Secondary: default=transparent/grey-40 border/primary-60 text → hover=primary-20 → active=primary-30/primary-70 → disabled=30%
- Tertiary: default=primary-60 → hover=underline primary-50 → active=underline/primary-70 → disabled=30%
- Loading: invisible content (maintain width), centered spinner (primary-50), blocked interaction

---

### Input Specification

**Anatomy:** [Label] + [Prefix Icon] + [Field] + [Suffix Icon/Action] + [Helper/Error Text]

| Size | Height | Font | Radius | H-Pad |
|------|--------|------|--------|-------|
| S | 32px | Body M (14px) | 6px | 8px |
| M | 40px | Body M (14px) | 8px | 12px |
| L | 48px | Body L (16px) | 12px | 12px |

**States:** Empty (grey-40/subdued-2) → Filled (grey-40/default) → Hover (grey-60) → Focus (4px primary-60/primary-50 label) → Disabled (grey-40/grey-20/grey-60) → Error/Warning/Success (feedback-50 border + message)

---

### Modal Specification

Radius=16px, backdrop=blur rgba(0,0,0,0.65)+12px, shadow=large, bg=surface-0, max content=494px scrollable.
Widths: XS=560px, S=754px, M=950px, L=1392px, Full=100%.
Enter=150ms ease-out scale+fade, Exit=100ms ease-in.

---

### Badge Sizes

| Size | Height | Font | H-Pad | V-Pad | Radius |
|------|--------|------|-------|-------|--------|
| XS | 20px | 12px | 4px | 2px | 4px |
| S | 24px | 12px | 8px | 4px | 4px |
| M | 28px | 14px | 8px | 4px | 4px |
| L | 32px | 16px | 8px | 4px | 4px |

### Tag Sizes

| Size | Height | Font | Icon | Radius |
|------|--------|------|------|--------|
| XS | 20px | Body S | 16x16 | 250px |
| S | 24px | Body S | 16x16 | 250px |
| M | 28px | Body S | 16x16 | 250px |
| L | 32px | Body L | 20x20 | 250px |

### Checkbox Sizes

| Size | Box | Inner Icon |
|------|-----|------------|
| S | 16x16 | 12x12 |
| M | 20x20 | 12x12 |
| L | 24x24 | 16x16 |

Unchecked=grey-40 border/surface-0, Checked=primary-50/white icon, Indeterminate=primary-50/white dash, Disabled=30%, Focus=4px ring primary-60

### Dropdown Sizes

| Size | Height | Trigger Radius | Menu Radius |
|------|--------|---------------|-------------|
| S | 32px | 6px | 12px |
| M | 40px | 8px | 12px |
| L | 48px | 12px | 16px |

Menu: surface-0, shadow-medium, option hover=primary-20, selected=primary-10/primary-60 text, item gap=4px (use flexbox with gap or margin-bottom on each item except last)

### Sidebar Navigation

**Item Anatomy:** [Optional Icon] + [Label] + [Optional Badge/Count]
**Item Height:** 40px (M size default), 32px (compact)
**Item Padding:** 12px H, 8px V
**Icon-to-text gap:** 8px
**Vertical gap between items:** 8px (use flexbox column with gap or margin-bottom)
**Section gap:** 24px (between different navigation groups)
**States:** default=transparent → hover=primary-10 → active=primary-20/primary-60 text → selected=primary-10/primary-50 text
**Font:** Body M Prominent (14px/500)

### Menu / List Items

| Type | Item Gap | Item Height | Padding | Usage |
|------|----------|-------------|---------|-------|
| Compact Menu | 4px | 32px | 12px H, 6px V | Dropdown menus, context menus |
| Default List | 8px | 40px | 12px H, 8px V | Navigation, file lists |
| Comfortable List | 12px | 48px+ | 16px H, 12px V | Component galleries, feature lists |

**Implementation:** Use flexbox/grid with `gap` property or margin-bottom on all items except `:last-child`

```css
/* Preferred: using gap */
.menu { display: flex; flex-direction: column; gap: var(--space-4); }

/* Alternative: using margin */
.menu-item:not(:last-child) { margin-bottom: var(--space-4); }
```

### DataTable

Header: Heading M (14/20/600), grey-80, surface-10, 12px H pad, 8px V pad
Rows: Body M (14/20/400), text-default, surface-0, 12px pad, min height 48px
Row states: hover=primary-10, selected=primary-20, editing=2px primary-50 outline, disabled=grey-20
Selection: checkbox column (M 20x20), header=all/indeterminate, action bar=primary-10 bg
Pagination: right-aligned, current page=primary-50 pill, "Showing X-Y of Z"=Body S subdued-1

### Tooltip
Radius=8px, bg=black, text=white, padding=8px

### Icon Sizing
XS/S=16px, M=20px, L=24px, XL=32px. Icons inherit text color. Standalone=subdued-1, hover=text-default.

---

## PART 2: React Performance Best Practices

### Component Architecture

#### 1. Compound Component Pattern
Use for complex components with related parts (Dropdown, Tabs, Accordion, DataTable):

```tsx
// Compound component - avoids prop drilling, gives composition control
<Dropdown>
  <Dropdown.Trigger>Select option</Dropdown.Trigger>
  <Dropdown.Menu>
    <Dropdown.Item value="a">Option A</Dropdown.Item>
    <Dropdown.Item value="b">Option B</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
```

Use React Context internally to share state between parts. Keep context value stable with `useMemo`.

#### 2. Controlled & Uncontrolled Support
Every form component should support both patterns:

```tsx
interface InputProps {
  value?: string;           // controlled
  defaultValue?: string;    // uncontrolled
  onChange?: (value: string) => void;
}

function Input({ value: controlledValue, defaultValue, onChange }: InputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e.target.value);
  };
  // ...
}
```

#### 3. Polymorphic Components
Use `as` prop for semantic flexibility (buttons rendering as links, etc.):

```tsx
type PolymorphicProps<E extends ElementType> = {
  as?: E;
} & Omit<ComponentPropsWithoutRef<E>, 'as'>;

function Button<E extends ElementType = 'button'>({
  as, ...props
}: PolymorphicProps<E>) {
  const Component = as || 'button';
  return <Component {...props} />;
}

// Usage: <Button as="a" href="/page">Link styled as button</Button>
```

---

### Render Optimization

#### 4. Memoization Strategy

**When to use `React.memo`:**
- Components that receive stable props but parent re-renders often (list items, table rows, cards)
- Components receiving object/array props from parent
- Components in lists/grids rendered via `.map()`

**When NOT to memo:**
- Components that always receive new props
- Simple/cheap components (Divider, Spinner, Text)
- Components that almost always need to re-render

```tsx
// Good: table row that re-renders only when its data changes
const TableRow = memo(function TableRow({ row, onSelect }: TableRowProps) {
  return (
    <tr onClick={() => onSelect(row.id)}>
      {row.cells.map(cell => <td key={cell.id}>{cell.value}</td>)}
    </tr>
  );
});
```

#### 5. Callback Stability
Stabilize callbacks passed to memoized children:

```tsx
// Parent component
const handleRowSelect = useCallback((id: string) => {
  setSelectedIds(prev => prev.includes(id)
    ? prev.filter(i => i !== id)
    : [...prev, id]
  );
}, []);  // stable reference — uses functional updater

// Pass to memoized child
<TableRow onSelect={handleRowSelect} />
```

#### 6. Expensive Computation
Use `useMemo` for computed values that are expensive or used as deps:

```tsx
// Good: filtering/sorting large datasets
const filteredRows = useMemo(() =>
  rows.filter(r => r.name.includes(search)).sort(compareFn),
  [rows, search, compareFn]
);

// Bad: memoizing trivial operations
const fullName = useMemo(() => `${first} ${last}`, [first, last]); // just compute inline
```

#### 7. State Colocation
Keep state as close to where it's used as possible. Don't lift state higher than needed:

```tsx
// Bad: search state in page component, causing full page re-render
function Page() {
  const [search, setSearch] = useState('');  // every keystroke re-renders everything
  return <><SearchBar value={search} onChange={setSearch} /><DataTable /><Sidebar /></>;
}

// Good: search state in its own component
function SearchableTable() {
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => filterData(data, search), [data, search]);
  return <><SearchBar value={search} onChange={setSearch} /><DataTable rows={filtered} /></>;
}
```

---

### List & Table Performance

#### 8. Virtualization
Use virtualization for lists/tables with >50 items:

```tsx
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }: { items: Item[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48, // row height from design system --height-l
  });

  return (
    <div ref={parentRef} style={{ overflow: 'auto', height: '400px' }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map(virtual => (
          <div key={virtual.key} style={{
            position: 'absolute',
            top: virtual.start,
            height: virtual.size,
          }}>
            {items[virtual.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Use for:** Dropdown options (>50), DataTable rows (>100), long lists, search results.

#### 9. Stable Keys
Always use stable, unique IDs as keys. Never use array index for dynamic lists:

```tsx
// Good
{rows.map(row => <TableRow key={row.id} row={row} />)}

// Bad — causes re-mount on reorder/filter
{rows.map((row, index) => <TableRow key={index} row={row} />)}
```

---

### Event Handling

#### 10. Debounce & Throttle

```tsx
// Search input — debounce to avoid filtering on every keystroke
function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [value, setValue] = useState('');

  const debouncedSearch = useMemo(
    () => debounce((q: string) => onSearch(q), 300),
    [onSearch]
  );

  useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

  return (
    <input
      value={value}
      onChange={e => { setValue(e.target.value); debouncedSearch(e.target.value); }}
    />
  );
}
```

**Debounce (300ms):** search/filter inputs, resize handlers
**Throttle (100ms):** scroll handlers, drag handlers, slider value changes

#### 11. Event Delegation
For tables/lists with many interactive rows, delegate events to the container:

```tsx
function DataTable({ rows, onRowClick }: Props) {
  const handleClick = useCallback((e: React.MouseEvent<HTMLTableSectionElement>) => {
    const row = (e.target as HTMLElement).closest('tr');
    if (row?.dataset.rowId) onRowClick(row.dataset.rowId);
  }, [onRowClick]);

  return (
    <table>
      <tbody onClick={handleClick}>
        {rows.map(row => <tr key={row.id} data-row-id={row.id}>...</tr>)}
      </tbody>
    </table>
  );
}
```

---

### Refs & DOM

#### 12. Forward Refs
All leaf components must forward refs for parent access and composition:

```tsx
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = 'm', state, label, ...props },
  ref
) {
  return (
    <div className={styles.wrapper}>
      {label && <label>{label}</label>}
      <input ref={ref} className={styles[size]} {...props} />
    </div>
  );
});
```

#### 13. Merge Refs
When component needs internal ref AND forwarded ref:

```tsx
function useMergedRef<T>(...refs: React.Ref<T>[]) {
  return useCallback((node: T | null) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<T | null>).current = node;
    });
  }, refs);
}
```

---

### Portals & Overlays

#### 14. Portal Pattern
Modal, Popover, Tooltip, Dropdown menus, BottomSheet render in portals:

```tsx
function Modal({ children, isOpen }: ModalProps) {
  if (!isOpen) return null;
  return createPortal(
    <div className="backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}
```

- Trap focus inside modal (`focus-trap` or manual tab management)
- Lock body scroll when modal/drawer open
- Restore focus to trigger element on close
- Escape key closes overlay

---

### Lazy Loading

#### 15. Code Split Heavy Components

```tsx
// Lazy load heavy components (DataTable, Calendar, Graphs, FileViewer, Map)
const DataTable = lazy(() => import('./DataTable'));
const Calendar = lazy(() => import('./Calendar'));

// Wrap in Suspense with Shimmer fallback from design system
<Suspense fallback={<Shimmer height={400} />}>
  <DataTable data={data} />
</Suspense>
```

---

### CSS & Styling Performance

#### 16. CSS Custom Properties for Theming
Components should use CSS variables, not runtime style calculations:

```css
/* Component styles — no theme logic in JS */
.button-primary {
  background: var(--primary-50);
  color: var(--primary-inverse);
  border-radius: var(--radius-full);
  height: var(--height-m);
  padding: 0 var(--space-16);
  font: var(--font-weight-prominent) var(--font-size-m)/var(--line-height-m) var(--font-sans);
}
.button-primary:hover { background: var(--primary-40); }
.button-primary:active { background: var(--primary-60); }
.button-primary:focus-visible { outline: 4px solid var(--primary-60); outline-offset: 0; }
.button-primary:disabled { opacity: 0.3; cursor: not-allowed; }
```

#### 17. Avoid Layout Thrashing
- Use `transform` and `opacity` for animations (GPU-accelerated)
- Avoid animating `width`, `height`, `top`, `left`
- Use `will-change` sparingly and only for known animations
- Batch DOM reads before writes

```css
/* Good: GPU-accelerated modal animation */
.modal-enter { opacity: 0; transform: scale(0.95); }
.modal-enter-active { opacity: 1; transform: scale(1); transition: all 150ms ease-out; }
.modal-exit-active { opacity: 0; transform: scale(0.95); transition: all 100ms ease-in; }
```

---

### Accessibility in React

#### 18. ARIA & Keyboard Patterns

```tsx
// Button — handles keyboard activation
<button
  role="button"
  aria-disabled={disabled}
  aria-busy={loading}
  tabIndex={disabled ? -1 : 0}
>

// Input — error state
<input
  aria-invalid={!!error}
  aria-describedby={error ? `${id}-error` : helper ? `${id}-helper` : undefined}
  aria-required={required}
/>
{error && <span id={`${id}-error`} role="alert">{error}</span>}

// Dropdown — combobox pattern
<div role="combobox" aria-expanded={open} aria-haspopup="listbox">
  <input aria-autocomplete="list" aria-controls="listbox-id" />
</div>
<ul id="listbox-id" role="listbox">
  <li role="option" aria-selected={selected}>{option.label}</li>
</ul>

// Modal — dialog pattern
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Title</h2>
</div>

// DataTable — sort
<th aria-sort="ascending" role="columnheader">
  <button onClick={toggleSort}>Name</button>
</th>
```

#### 19. Focus Management

```tsx
// Trap focus in modal
useEffect(() => {
  if (!isOpen) return;
  const previousFocus = document.activeElement as HTMLElement;
  modalRef.current?.focus();
  return () => previousFocus?.focus();  // restore on close
}, [isOpen]);

// Focus visible — CSS only, no JS needed
:focus-visible { outline: 4px solid var(--primary-60); outline-offset: 0; }
:focus:not(:focus-visible) { outline: none; }
```

#### 20. Reduced Motion

```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// CSS approach (preferred)
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### Form Patterns

#### 21. Form State Management
For simple forms, use controlled state. For complex forms, use a form library (react-hook-form preferred for performance):

```tsx
// Simple: controlled
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // ...
}

// Complex: react-hook-form (avoids re-renders on every keystroke)
function SettingsForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('name', { required: true })} error={errors.name?.message} />
    </form>
  );
}
```

#### 22. Multi-Step Forms
Use a state machine or reducer for step management:

```tsx
type Step = 'info' | 'address' | 'review';
const STEPS: Step[] = ['info', 'address', 'review'];

function MultiStepForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStepIndex(i => Math.min(i + 1, STEPS.length - 1));
  };

  const handleBack = () => setStepIndex(i => Math.max(i - 1, 0));
  // Render ProgressStepper + current step component
}
```

---

### Error Boundaries

#### 23. Graceful Degradation

```tsx
class ComponentErrorBoundary extends React.Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

// Wrap complex components
<ComponentErrorBoundary fallback={<EmptyState message="Something went wrong" />}>
  <DataTable data={data} />
</ComponentErrorBoundary>
```

---

### Performance Checklist

When building any component, verify:

- [ ] **Memoize** list items and table rows with `React.memo`
- [ ] **Stabilize** callbacks with `useCallback` when passed to memoized children
- [ ] **Virtualize** lists/dropdowns >50 items
- [ ] **Debounce** search/filter inputs (300ms)
- [ ] **Forward refs** on all leaf components
- [ ] **Lazy load** heavy components (DataTable, Calendar, Graphs, Map)
- [ ] **Use CSS variables** for theming, not runtime style computation
- [ ] **Animate with transform/opacity** only — no layout properties
- [ ] **Colocate state** — don't lift state higher than needed
- [ ] **Event delegation** for tables/lists with many rows
- [ ] **Stable keys** — use unique IDs, never array indices
- [ ] **Portal** for overlays (Modal, Popover, Tooltip, BottomSheet)
- [ ] **Focus trap** in modals, restore focus on close
- [ ] **ARIA attributes** for all interactive components
- [ ] **Error boundary** around complex/data-heavy components
- [ ] **Respect prefers-reduced-motion**

---

## Instructions

When building a React component:

1. **Identify the component** from the catalog — determine sizes, variants, states
2. **Apply exact design tokens** — no raw hex/px/font values (reference `design-system-ui` skill)
3. **Use proper gaps** — flexbox/grid `gap` property preferred over margins (4px menus, 8px nav, 12px galleries)
4. **Implement ALL interaction states** — default, hover, active, focus-visible, disabled, loading
5. **Forward ref** on every leaf component
6. **Support controlled + uncontrolled** for form components
7. **Use compound pattern** for complex multi-part components
8. **Memoize appropriately** — memo for list items, useCallback for handlers, useMemo for expensive computations
9. **Virtualize** large lists and dropdown options (>50 items)
10. **Use portals** for overlays — modal, popover, tooltip, dropdown menu
11. **Add full accessibility** — ARIA attributes, keyboard navigation, focus management, focus-visible ring
12. **CSS custom properties** for all theming — no runtime style calculations
13. **Lazy load** heavy components with Suspense + Shimmer fallback
14. **Debounce** search inputs, throttle scroll/drag handlers
15. **Error boundaries** around complex data-driven components
16. **Respect prefers-reduced-motion** — disable animations when user prefers
