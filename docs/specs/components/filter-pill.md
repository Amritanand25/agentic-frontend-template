# FilterPill

## Overview

The `FilterPill` component is a versatile filter interface that combines a pill-shaped trigger button with a dropdown popover containing searchable, selectable options. It supports multiple selection modes (multi-checkbox, single-radio, single select), calendar-based date selection (single and range), virtualization for large datasets, loading/shimmer states, and extensive customization of sub-components. The component is built on top of Radix UI's Popover and cmdk's Command primitives.

## Anatomy

```
<div>                                    ← Root wrapper (forwardRef target)
  <Popover>                              ← Radix Popover root
    <PopoverTrigger>                     ← Trigger wrapper
      <button role="combobox">           ← Pill-shaped trigger button (or custom children)
        {triggerValue || placeholder}    ← Trigger label
        <IcChevronDown /> or             ← Expand icon (when no selection)
        <IcCloseRemove />                ← Clear icon (when items selected)
      </button>
    </PopoverTrigger>
    <PopoverContent>                     ← Dropdown panel
      ┌──────────────────────┐
      │  Calendar View       │           ← For calendar-single / calendar-range variants
      │  + Done button       │
      └──────────────────────┘
      ┌──────────────────────┐
      │  Command             │           ← For list-based variants
      │  ┌────────────────┐  │
      │  │ Search Input   │  │           ← Always visible (even during loading)
      │  ├────────────────┤  │
      │  │ Options List   │  │           ← Regular or virtualized
      │  │  [ ] Option 1  │  │           ← multi-checkbox: Checkbox + label
      │  │  ( ) Option 2  │  │           ← single-radio: Radio + label
      │  │    Option 3    │  │           ← single: Label only (highlight on select)
      │  │  Shimmer...    │  │           ← Loading state (FilterPillLoader)
      │  │  No results    │  │           ← Empty state
      │  ├────────────────┤  │
      │  │ Footer         │  │           ← Clear All + Apply buttons
      │  └────────────────┘  │
      └──────────────────────┘
    </PopoverContent>
  </Popover>
</div>
```

## Props / API

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `Option[]` | **required** | Array of selectable options. Each option has `label: string` and `value: string`. |
| `selectedValues` | `string[] \| Date[]` | **required** | Currently selected values. Array of strings for list variants; array of Dates for calendar variants. |
| `onChange` | `(values: string[] \| Date[]) => void` | **required** | Callback fired when the user confirms a selection (Apply button or single-select immediate). |
| `placeholder` | `string` | `"Select"` | Text shown in the trigger button when no value is selected and no `triggerValue` is provided. |
| `variant` | `"multi-checkbox" \| "single-radio" \| "single" \| "calendar-single" \| "calendar-range"` | `"multi-checkbox"` | Determines the selection behavior and UI of the dropdown options. |
| `children` | `ReactNode` | `undefined` | Custom trigger element. When provided, replaces the default pill button entirely. |
| `triggerValue` | `JSX.Element \| string` | `undefined` | Custom content displayed inside the trigger button. Overrides `placeholder`. |
| `className` | `string` | `undefined` | Additional CSS classes for the root wrapper `<div>`. |

### Open State

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `undefined` | Controlled open state. When provided, the component operates in controlled mode. |
| `onOpenChange` | `(value: boolean) => void` | `() => {}` | Callback fired when the popover open/close state changes. |
| `onOptionClick` | `(value: any) => void` | `() => {}` | Callback fired when an option is clicked/toggled, before applying. Receives the current temp selection array. |

### Footer & Icons

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hideFooter` | `boolean` | `undefined` | Controls visibility of the Apply/Clear footer in multi-checkbox and single-radio variants. |
| `hideExpandedIcon` | `boolean` | `false` | Hides the chevron/close icon in the trigger button. |
| `hideTriggerSelectionStatus` | `boolean` | `false` | When `true`, prevents the trigger button from visually indicating selected state (no background/border color change). |

### Calendar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `calendarProps` | `CalendarProps` | `{ type: "single" }` | Props forwarded to the internal `Calendar` component for calendar variants. |

### Sub-component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `popoverContentProps` | `React.ComponentProps<typeof PopoverContent>` | `{}` | Props forwarded to the `PopoverContent` component (className, style, etc.). |
| `popoverProps` | `React.ComponentProps<typeof Popover>` | `{}` | Props forwarded to the root `Popover` component. |
| `triggerButtonProps` | `React.ComponentProps<typeof PopoverTrigger>` | `{}` | Props forwarded to the trigger button element (className, etc.). |
| `buttonProps` | `Partial<{ clearButton, applyButton, doneButton }>` | `{}` | Individual props objects forwarded to the Clear All, Apply, and Done buttons. Each accepts `React.ComponentProps<typeof Button>`. |
| `buttonText` | `Partial<{ clearButton, applyButton, doneButton }>` | `{ clearButton: "Clear All", applyButton: "Apply", doneButton: "Done" }` | Custom text labels for the footer action buttons. |
| `menuItemProps` | `React.ComponentProps<typeof CommandItem>` | `{}` | Props forwarded to each option `CommandItem`. |
| `noResultsProps` | `React.ComponentProps<typeof CommandEmpty>` | `{}` | Props forwarded to the "No options found" empty state. |
| `searchInputProps` | `React.ComponentProps<typeof CustomCommandInput>` | `{}` | Props forwarded to the search input element. |
| `scrollbarProps` | `typeof Scrollbar` | `{}` | Props forwarded to the Scrollbar component wrapping the options list. |

### Virtualization Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableVirtualization` | `boolean` | `false` | Enables virtualized rendering for large option lists using TanStack Virtual. |
| `virtualizationThreshold` | `number` | `10` | Minimum number of filtered options required before virtualization activates (when `enableVirtualization` is `true`). |
| `virtualizationConfig` | `{ itemHeight?: number; maxHeight?: number; overscan?: number }` | `{ itemHeight: 36, maxHeight: 250, overscan: 5 }` | Fine-tuning options for virtualized rendering. `itemHeight`: pixel height per item. `maxHeight`: max container height. `overscan`: extra items rendered outside viewport. |

### Loading State Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isLoading` | `boolean` | `false` | When `true`, replaces the options list with shimmer skeleton placeholders. The search input remains visible. |
| `loadingOptionsCount` | `number` | `5` | Number of shimmer skeleton items to display in the loading state. |

## Variants

### `multi-checkbox`

- Each option displays a `Checkbox` control alongside the label.
- Multiple options can be selected simultaneously.
- Footer shows "Clear All" and "Apply" buttons.
- Selection is temporary until "Apply" is clicked.

### `single-radio`

- Each option displays a custom radio button alongside the label.
- Only one option can be selected at a time.
- Footer shows "Clear All" and "Apply" buttons.
- Selection is temporary until "Apply" is clicked.

### `single`

- Options are displayed as plain text labels.
- Selected option gets a highlighted background (`--gd-primary-20`).
- Selection is applied immediately on click -- no footer is shown.
- Popover closes automatically after selection.

### `calendar-single`

- Renders an inline `Calendar` component in single-date mode.
- Footer shows a "Done" button.
- Selected date is applied when "Done" is clicked.

### `calendar-range`

- Renders an inline `Calendar` component in range mode.
- Footer shows a "Done" button.
- Selected date range is applied when "Done" is clicked.

## Sizes

The FilterPill does not have explicit size variants. Key fixed dimensions:

| Element | Dimension |
|---------|-----------|
| Trigger button height | `24px` |
| Trigger font size | `14px` |
| Dropdown width (list) | `200px` (min-width: `200px`) |
| Dropdown width (calendar) | `w-full` |
| Search input height | `32px` |
| Option item height | `36px` (padding: `8px`) |
| Options max height (non-virtualized) | `250px` |
| Border radius (list) | `12px` |
| Border radius (calendar) | `16px` |

## States

| State | Description |
|-------|-------------|
| **Default (empty)** | Trigger shows placeholder text with chevron down icon. Background: `--gd-background-surface-0`. |
| **Hover (empty)** | Trigger background changes to `--gd-background-surface-10`. |
| **Active/Pressed (empty)** | Trigger background changes to `--gd-background-surface-20`. |
| **Selected** | Trigger background: `--gd-primary-10`, border: `--gd-primary-50`, text color: `--gd-filterpill-selected-text`. Chevron replaced with close (X) icon. |
| **Selected + Hover** | Trigger background: `--gd-primary-20`, border: `--gd-primary-60`. |
| **Open** | Popover dropdown is visible. Chevron rotates 180 degrees. |
| **Search active** | Search input filters options with 300ms debounce. |
| **No results** | "No options found." message displayed in dropdown. |
| **Loading** | Shimmer skeleton items replace options. Search input remains visible. |
| **Option hover** | Individual option background: `--gd-background-surface-10`. |
| **Option selected (single)** | Option background: `--gd-primary-20`. |
| **Focus-visible** | Trigger shows `outline-[4px]` with `outlineColor: --gd-primary-50`. |

## Sub-components

### FilterPillLoader

A shimmer loading state component used internally when `isLoading={true}`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `number` | `5` | Number of shimmer skeleton items to display. |
| `variant` | `"multi-checkbox" \| "single-radio" \| "single"` | `"multi-checkbox"` | Determines whether checkbox/radio shimmer indicators are shown alongside text shimmers. |
| `className` | `string` | `undefined` | Additional CSS classes for the container. |

### CustomCommandInput

An internal search input component wrapping cmdk's `CommandPrimitive.Input` with a search icon and styled border.

## Design Tokens

| Token / Variable | Usage |
|------------------|-------|
| `--gd-background-surface-0` | Default trigger background; dropdown/command background. |
| `--gd-background-surface-10` | Trigger hover background (empty); option hover background. |
| `--gd-background-surface-20` | Trigger pressed/active background (empty). |
| `--gd-primary-10` | Trigger background when items are selected. |
| `--gd-primary-20` | Trigger hover background (selected); single-variant selected option background. |
| `--gd-primary-50` | Trigger border (selected); radio button checked border; radio inner dot; focus outline color. |
| `--gd-primary-60` | Trigger hover border (selected); close icon hover color. |
| `--gd-filterpill-selected-text` | Trigger text color when items are selected. |
| `--gd-filterpill-selected-icon` | Close icon color when items are selected. |
| `--gd-text-subdued-1` | Trigger text color (empty); radio unchecked border color. |
| `--gd-text-default` | Option text color. |
| `--gd-neutral-grey-40` | Search input border color. |
| `--gd-popover-shadow` | Box shadow for the dropdown content. |
| `text-en-desktop-body-m` | Typography class for trigger text and option labels. |
| `text-color-text-default` | Default text color class for search input and options. |
| `text-color-text-subdued-1` | Subdued text color class (trigger placeholder, empty state). |
| `text-color-text-subdued-2` | Search icon color. |
| `text-color-primary-60` | Close icon hover color class. |

## Accessibility

- **ARIA role**: Trigger button uses `role="combobox"` with `aria-expanded` reflecting the open state.
- **ARIA label**: Trigger button has `aria-label` set to the `triggerValue` string (when string type) or `"Open filter options"` as fallback.
- **Keyboard focus**: Trigger uses `focus-visible:outline-[4px]` for keyboard focus indication.
- **Search**: The search input uses cmdk's `CommandPrimitive.Input` for keyboard-driven filtering.
- **Radio buttons**: Native `<input type="radio">` elements are used in the `single-radio` variant for screen reader compatibility.
- **Checkbox**: Uses the `Checkbox` atom component with proper checked state.
- **Focus trapping**: Handled by Radix UI's Popover primitives when the dropdown is open.
- **Click outside**: Closes the popover (Radix behavior).

### Keyboard Interactions

| Key | Action |
|-----|--------|
| `Tab` | Moves focus between trigger, search input, options, and footer buttons. |
| `Enter` / `Space` | Activates focused trigger, option, or button. |
| `Escape` | Closes the popover dropdown. |
| Typing | Filters options via the search input (300ms debounce). |

## Performance Best Practices

### Rendering Optimization
- **Memoize pill components** — Each FilterPill instance should be wrapped in `React.memo`. When one filter changes, other pills whose props haven't changed should not re-render.
- **Stable callback references** — `onChange`, `onOptionClick`, and `onOpenChange` handlers must use `useCallback` to prevent pill re-renders.
- **Debounce search input** — The 300ms search debounce should use `useDeferredValue` or a debounce utility to avoid filtering on every keystroke.

### Virtualization
- **Virtualize large option lists** — For fields with 100+ options, use `@tanstack/react-virtual` to render only visible items. This keeps the dropdown responsive even with thousands of options.
- **Dynamic threshold** — Only activate virtualization when filtered options exceed the `virtualizationThreshold`. For small lists, the overhead of virtualization is unnecessary.
- **Stable virtualizer instance** — Memoize the virtualizer configuration to prevent re-initialization on every render.

### Dropdown Performance
- **Lazy mount popover content** — Only mount the dropdown content (Command, search input, options list) when the popover opens for the first time. Unmount on close if memory is a concern, or keep mounted for faster re-opens.
- **Deferred filtering** — Use `React.startTransition` for search filtering to keep the input responsive while the options list updates.

### Scalability Considerations
- **Async option loading** — Support `loadOptions` for server-driven option fetching. Cache results to avoid redundant API calls when reopening the same filter.
- **Cascading filter support** — When used in a cascading filter bar, each pill's available options should be resolved lazily and cached based on upstream filter state.
- **Controlled pattern** — The component is fully controlled (`selectedValues` + `onChange`), enabling integration with URL state, Redux, or any state manager.
- **Composable** — Export the pill as a standalone component usable outside of a filter bar context.
