# Dropdown

## Overview

The `Dropdown` component is a feature-rich select menu built on Radix UI's `Popover` and `cmdk` command primitives. It supports single-select, multi-select, and radio-select modes, searchable filtering, option grouping, custom icons, validation states, and custom trigger elements. The package also includes `VirtualizedDropdown`, an extended variant that uses `@tanstack/react-virtual` for efficient rendering of large datasets (1,000+ options).

## Anatomy

```
+-------------------------------------------------------------+
| [Label*] [?]                                                |
+-------------------------------------------------------------+
| [Icon] [Count Badge X] [Input/Search]  [X]  [ChevronDown]  |  <-- Trigger
+-------------------------------------------------------------+
|  +-------------------------------------------------------+  |
|  |  Option 1                                              |  |  <-- PopoverContent
|  |  Option 2 (disabled)                                   |  |
|  |  ---- Group Label ----                                 |  |
|  |  Grouped Option 1                                      |  |
|  |  Grouped Option 2                                      |  |
|  +-------------------------------------------------------+  |
|  |  [Clear All]                    [Apply]                |  |  <-- Footer (multi-select)
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
| [Icon] Validation message                                   |
| Support text                                                |
+-------------------------------------------------------------+
```

**Parts:**
1. **Label** -- Optional label above the trigger with required indicator and helper tooltip (uses `InputLabel`).
2. **Trigger** -- The clickable area that opens the dropdown. Contains icon, multi-select count badge, search input, clear button, and chevron.
3. **Custom Trigger** -- When `children` is provided, replaces the default trigger with a custom element.
4. **Option List** -- Scrollable list of options rendered inside a `Scrollbar` component, with max height of 320px.
5. **Option Item** -- Individual selectable item with optional checkbox (multi-select), radio button (radio-select), icon, label, help text, and type badge.
6. **Group Header** -- Divider with optional label separating grouped options.
7. **Footer** -- "Clear All" and "Apply" buttons for multi-select mode (controlled by `hideFooterActions`).
8. **Add Button** -- Appears when `showAddButton` is true and search yields no results.
9. **Validation Message** -- Contextual feedback via `MessageBox` component.
10. **Support Text** -- Additional guidance text below the dropdown.

## Props / API

### DropdownProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `DropdownOption[]` | `[]` | Array of available options. |
| `placeholder` | `string` | `"Search..."` | Placeholder text in the input/trigger. |
| `value` | `DropdownOption[]` | `[]` | Controlled array of currently selected option(s). |
| `onChange` | `(allSelectedOptions: DropdownOption[], currentSelectedOption?: DropdownOption) => void` | `undefined` | Callback fired on selection change. Receives all selected options and the most recently changed option. |
| `onAddOption` | `(option: DropdownOption) => void` | `undefined` | Callback fired when user clicks the "Add" button for a new option. |
| `showAddButton` | `boolean` | `false` | Shows an "Add" button when search yields no results. |
| `defaultIcon` | `JSX.Element` | `undefined` | Icon displayed in the trigger. Changes to the selected option's icon when a selection is made. |
| `disabled` | `boolean` | `false` | Disables the entire dropdown. |
| `readOnly` | `boolean` | `false` | Makes the dropdown read-only. |
| `validationMessage` | `string` | `undefined` | Feedback message displayed below the dropdown. |
| `validationState` | `"default" \| "error" \| "warning" \| "success"` | `"default"` | Visual validation state affecting border color and message. |
| `required` | `boolean` | `false` | Shows asterisk on label and sets `aria-required`. |
| `isMultiSelect` | `boolean` | `false` | Enables multi-selection with checkboxes. Takes priority over `isRadioSelect`. |
| `isRadioSelect` | `boolean` | `false` | Enables single selection with radio button indicators. Ignored if `isMultiSelect` is true. |
| `helperText` | `string` | `undefined` | Tooltip text shown via help icon next to the label. |
| `label` | `string` | `undefined` | Label text above the dropdown. |
| `groups` | `DropdownGroup[]` | `[]` | Array of group definitions for categorizing options. |
| `searchable` | `boolean` | `false` | Enables the search/filter input within the trigger. |
| `hideFooterActions` | `boolean` | `true` | Hides the "Clear All" / "Apply" footer. Set to `false` for multi-select with confirm. |
| `size` | `"s" \| "m" \| "l"` | `"l"` | Controls sizing of trigger, options, and icons. |
| `classNames` | `DropdownClassNames` | `undefined` | Custom CSS classes for internal elements. |
| `onBlur` | `() => void` | `() => {}` | Callback fired when popover content loses focus. |
| `hideCrossIcon` | `boolean` | `false` | Hides the clear (X) icon in the trigger. |
| `inputValidationRegex` | `RegExp` | `undefined` | Regex pattern to validate/restrict search input characters. |
| `supportText` | `string` | `undefined` | Guidance text below the validation message. |
| `children` | `React.ReactNode` | `undefined` | Custom trigger element. Replaces the default trigger when provided. |
| `onInputChange` | `(e: React.ChangeEvent<HTMLInputElement>) => void` | `(e) => {}` | Callback fired on search input change. |
| `inputValue` | `string` | `undefined` | Controlled value for the search input. |
| `isOpen` | `boolean` | `undefined` | Controlled open state of the popover. |
| `onOpenChange` | `(isOpen: boolean) => void` | `() => {}` | Callback fired when open state changes. |
| `hideNoResultsFound` | `boolean` | `false` | Hides the "No results found" empty state message. |
| `popoverContainerSize` | `string` | `undefined` | CSS width for the popover content (overrides auto width matching). |
| `extraProps` | `InternalProps` | `{}` | Pass-through props for Radix Popover, PopoverTrigger, and PopoverContent. |
| `hideSelection` | `boolean` | `undefined` | Hides the selected state visual highlight on options. |
| `ref` | `React.Ref<HTMLDivElement>` | `undefined` | Ref forwarded to the root container div. |

### VirtualizedDropdownProps (extends all DropdownProps plus)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableVirtualization` | `boolean` | `false` | Enables virtualized rendering. Falls back to standard rendering if item count is below threshold. |
| `virtualizedHeight` | `number` | `320` | Height in pixels of the dropdown list container. |
| `estimateItemSize` | `number` | Auto (36-44px based on size) | Estimated height of each item in pixels. |
| `overscan` | `number` | `5` | Number of items rendered outside the visible viewport for smooth scrolling. |
| `virtualizationThreshold` | `number` | `100` | Minimum number of options required to activate virtualization. |
| `chunkSize` | `number` | `undefined` | Load items in chunks for better performance (reserved). |
| `searchIndexing` | `boolean` | `undefined` | Enable search indexing for faster filtering (reserved). |
| `lazyLoad` | `boolean` | `undefined` | Enable lazy loading of items (reserved). |
| `cacheResults` | `boolean` | `undefined` | Cache search results (reserved). |
| `debounceSearch` | `number` | `undefined` | Custom debounce time for search in ms (reserved). |
| `maxVisibleItems` | `number` | `undefined` | Limit maximum visible items (reserved). |

### DropdownOption

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number \| string` | Yes | Unique identifier. |
| `label` | `string` | Yes | Display text for the option. |
| `value` | `string \| number` | Yes | The value associated with the option. |
| `groupId` | `string \| number` | No | Associates the option with a group. |
| `disabled` | `boolean` | No | Disables the individual option. |
| `helpText` | `string` | No | Secondary descriptive text shown below the label. |
| `type` | `string` | No | Badge text shown on the right side of the option. |
| `icon` | `JSX.Element` | No | Icon element displayed before the label. |

### DropdownGroup

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string \| number` | Yes | Unique group identifier matching options' `groupId`. |
| `label` | `string` | No | Label text displayed as a group header/divider. |

### DropdownClassNames

| Property | Type | Description |
|----------|------|-------------|
| `popoverContainerClasses` | `string` | Classes for the root container div. |
| `popoverTriggerClasses` | `string` | Classes for the PopoverTrigger. |
| `popoverTriggerChildClasses` | `string` | Classes for the custom trigger child wrapper. |
| `popoverContentClasses` | `string` | Classes for the PopoverContent. |
| `scrollAreaClasses` | `string` | Classes for the Scrollbar/scroll area. |
| `footerClasses` | `string` | Classes for the footer actions bar. |
| `inputSearchClasses` | `string` | Classes for the search input element. |
| `itemClasses` | `string` | Classes for individual option items. |

### InternalProps

| Property | Type | Description |
|----------|------|-------------|
| `popoverProps` | `Partial<PopoverProps>` | Props forwarded to the Radix `Popover`. |
| `popoverTriggerProps` | `Partial<PopoverTriggerProps & { className?: string }>` | Props forwarded to the Radix `PopoverTrigger`. |
| `popoverContentProps` | `Partial<PopoverContentProps & { className, sticky, align, style }>` | Props forwarded to the Radix `PopoverContent`. |

## Variants

### Single Select (default)
Standard dropdown allowing one selection at a time. Selected option is highlighted with `--gd-primary-20` background and `--gd-primary-50` text. Dropdown closes after selection.

### Multi-Select
Enabled via `isMultiSelect`. Each option displays a checkbox. Multiple selections are allowed. A count badge appears in the trigger showing the number of selected items. The dropdown stays open after each selection.

### Radio Select
Enabled via `isRadioSelect`. Each option displays a radio button. Only one selection is allowed. Ignored if `isMultiSelect` is also true.

### Searchable
Enabled via `searchable`. The trigger input becomes editable, allowing users to type and filter options. Uses a 300ms debounce for search filtering. Placeholder shows the selected option's label when not focused.

### Grouped Options
Options can be categorized using the `groups` prop and each option's `groupId`. Groups are separated by a labeled divider line.

### With Custom Trigger
When `children` is provided, the default trigger is replaced with the custom element. The popover width can be controlled via `popoverContainerSize`.

### With Add Button
When `showAddButton` is true and `searchable` is true, an "Add" button with a plus icon appears when the search yields no matching results, allowing users to add new custom options.

### With Footer Actions
When `hideFooterActions` is `false`, a sticky footer with "Clear All" and "Apply" buttons appears at the bottom of the dropdown. Useful for multi-select scenarios where the user needs to confirm their selections.

### VirtualizedDropdown
Uses `@tanstack/react-virtual` for windowed rendering. Only items in the viewport (plus overscan) are rendered in the DOM. Automatically falls back to standard rendering when item count is below `virtualizationThreshold`. Ideal for datasets of 1,000+ options.

## Sizes

| Size | Trigger Height | Font Size | Input Font | Trigger Padding | Item Padding | Icon Size | Border Radius | Popover Radius |
|------|---------------|-----------|------------|-----------------|-------------|-----------|---------------|----------------|
| `s` (Small) | 32px | 14px | 14px/20px/400 | `py-[6px] px-[8px]` | `px-[8px] py-[4px]` | 20x20px | rounded-[6px] | rounded-[12px] |
| `m` (Medium) | 40px | 14px | 14px/20px/400 | `py-[8px] px-[12px]` | `px-[8px] py-[8px]` | 24x24px | rounded-[8px] | rounded-[12px] |
| `l` (Large) | 48px | 16px | 16px/24px/400 | `py-[12px] px-[12px]` | `px-[8px] py-[8px]` | 24x24px | rounded-[12px] | rounded-[16px] |

### Virtualized Item Sizes

| Size | Estimated Item Height |
|------|-----------------------|
| `s` | 36px |
| `m` | 44px |
| `l` | 44px |

## States

### Trigger States

| State | Description |
|-------|-------------|
| **Default** | Neutral grey border (`--gd-neutral-grey-40`), white background. |
| **Open** | Primary border color (`--gd-primary-50`). Chevron rotates 180 degrees. Clear icon visible. |
| **Hover** | Text color becomes `--gd-text-subdued-1`. Clear icon becomes visible (if value present). |
| **Focus-Visible** | Transparent border, 4px primary outline offset by -1px. |
| **Disabled** | `cursor-not-allowed`, grey background (`--gd-neutral-grey-20`), grey border. Opacity reduced. |
| **Read-Only** | `cursor-default`, grey background, subdued text. Popover cannot open. |
| **Error** | Border color `--gd-feedback-error-50`. |
| **Warning** | Border color `--gd-feedback-warning-50`. |
| **Success** | Border color `--gd-feedback-success-50`. |

### Option Item States

| State | Description |
|-------|-------------|
| **Default** | Normal text, transparent background. |
| **Hover** | Background becomes `--gd-background-surface-10`. |
| **Active/Pressed** | Background becomes `--gd-background-surface-20`. |
| **Selected (single)** | Background becomes `--gd-primary-20`. Text becomes `--gd-primary-50`. |
| **Selected (multi)** | Checkbox is checked. No background highlight. |
| **Selected (radio)** | Radio button is filled. No background highlight. |
| **Highlighted (keyboard)** | 2px primary outline with -2px offset (`--gd-primary-50`). |
| **Disabled** | Opacity 40%, `cursor-not-allowed`, `pointer-events-none`. |

## Design Tokens

| Token | Usage |
|-------|-------|
| `--gd-background-surface-0` | Trigger background, popover content background, footer background, selected AM/PM. |
| `--gd-background-surface-10` | Option hover background, disabled/read-only trigger background. |
| `--gd-background-surface-20` | Option active/pressed background. |
| `--gd-neutral-grey-40` | Default border color, group divider, multi-select badge border. |
| `--gd-neutral-grey-20` | Disabled trigger background. |
| `--gd-neutral-grey-80` | Hover placeholder text. |
| `--gd-primary-50` | Open border, selected option text, highlighted item outline, multi-select badge text, focus-visible outline. |
| `--gd-primary-20` | Selected option background (single-select). |
| `--gd-primary-10` | Multi-select count badge background. |
| `--gd-text-subdued-1` | Trigger icon color, chevron color, clear icon color, hover text, read-only text. |
| `--gd-text-default` | Default text color. |
| `--gd-feedback-error-50` | Error border color. |
| `--gd-feedback-warning-50` | Warning border color. |
| `--gd-feedback-success-50` | Success border color. |
| `--gd-popover-shadow` | Box shadow for popover content. |

## Accessibility

### ARIA Attributes

| Attribute | Element | Value |
|-----------|---------|-------|
| `role="button"` | Trigger div | Indicates interactive element. |
| `role="option"` | Each option item | Indicates selectable option. |
| `aria-expanded` | Trigger div | `true` when dropdown is open. |
| `aria-disabled` | Trigger div, input, options | `true` when disabled. |
| `aria-haspopup="listbox"` | Custom trigger child | Indicates popup type. |
| `aria-controls="dropdown-menu"` | Input, custom trigger | References the menu. |
| `aria-label="Search options"` | Search input | Describes the input purpose. |
| `aria-autocomplete="list"` | Search input | Indicates list-based autocomplete. |
| `aria-required` | Search input | Set when `required` is true. |
| `aria-activedescendant` | Search input | ID of the currently highlighted option. |
| `aria-selected` | Option item | `"true"` for keyboard-highlighted item. |
| `aria-checked` | Option item | `true` for selected item. |
| `aria-readonly` | Trigger div | `true` when read-only. |
| `aria-labelledby="dropdown-label"` | Trigger div | References the label. |

### Keyboard Interactions

| Key | Context | Action |
|-----|---------|--------|
| **ArrowDown** | Trigger (closed) | Opens dropdown, highlights first enabled option. |
| **ArrowDown** | Trigger/Content (open) | Moves highlight to next enabled option. Wraps to first. |
| **ArrowUp** | Trigger/Content (open) | Moves highlight to previous enabled option. Wraps to last. |
| **Enter** | Trigger (closed) | Opens dropdown, highlights first enabled option. |
| **Enter** | Content (open, item highlighted) | Selects highlighted option. Closes dropdown in single-select. |
| **Space** | Trigger (closed) | Opens dropdown. |
| **Space** | Content (open, item highlighted) | Selects highlighted option. Passes through to input if no highlight. |
| **Escape** | Content (open) | Closes dropdown. Skips disabled items if currently highlighted. |
| **Home** | Content (open) | Highlights first enabled option. |
| **End** | Content (open) | Highlights last enabled option. |
| **Tab** | Content (open) | Closes dropdown. |
| **Typing** | Searchable input | Filters options via 300ms debounced search. |

### Focus Management
- When the dropdown opens, focus moves to the search input.
- On close, focus returns to the trigger.
- Scrolls the highlighted item into view during keyboard navigation.
- In single-select searchable mode, the input clears on open and restores the selected value on close.

## Performance Best Practices

### Rendering Optimization
- **Memoize option items** — Each option item component should be `React.memo`'d. When the user types in search, only items whose visibility changes should re-render.
- **Stable `onChange` callback** — The parent's `onChange` handler must use `useCallback`. An unstable reference causes the entire dropdown to re-render on every parent render.
- **Avoid re-rendering on open/close** — Separate the trigger and content into independent render boundaries. Opening the popover should not re-render the trigger.

### Search Performance
- **Debounce search** — Use 300ms debounce on the search input via cmdk's built-in filtering or a custom debounce. This prevents re-filtering the options list on every keystroke.
- **Use `startTransition` for filtering** — Wrap the filter state update in `React.startTransition` to keep the input responsive while the list updates.
- **Pre-index options for search** — For large option sets, build a lowercase label index once and search against it, rather than calling `.toLowerCase()` on every option during each search.

### Virtualization
- **Activate for 100+ options** — Use `@tanstack/react-virtual` when options exceed the virtualization threshold. Render only visible items plus overscan buffer.
- **Stable virtualizer** — Memoize the virtualizer configuration. Re-creating it on every render defeats the performance benefit.
- **Measure once** — Use fixed `estimateItemSize` rather than dynamic measurement when option heights are consistent.

### Scalability Considerations
- **Controlled open state** — Support both controlled (`isOpen` + `onOpenChange`) and uncontrolled patterns for flexibility in different integration contexts.
- **Server-driven options** — Support async option loading for typeahead/autocomplete patterns where the full option set lives on the server.
- **Group rendering** — Only render group headers when `groups` is provided. Don't add grouping overhead for ungrouped dropdowns.
- **Popover width matching** — Match popover width to trigger width by default, with `popoverContainerSize` override for custom widths.
