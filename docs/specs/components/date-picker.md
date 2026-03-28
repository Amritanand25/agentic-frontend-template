# DatePicker

## Overview

The `DatePicker` component provides a customizable date selection UI built on top of a popover-based calendar. It supports single and range date selection, optional time picking, predefined date filters, manual keyboard input with validation, and multiple validation states. The component integrates with the `Calendar`, `TimePicker`, and `Popover` primitives.

## Anatomy

```
+-------------------------------------------------------+
| [Label]  [?]  (helper tooltip)                        |
+-------------------------------------------------------+
| [Calendar Icon] [Start Input] [->] [End Input]  [X]  |  <-- PopoverTrigger (input bar)
+-------------------------------------------------------+
|  +-------------------+  +-------------------------+   |
|  | Filter Panel      |  | Calendar                |   |  <-- PopoverContent
|  | - Custom          |  | < Month Year >          |   |
|  | - Today           |  | Su Mo Tu We Th Fr Sa    |   |
|  | - Yesterday       |  |  1  2  3  4  5  6  7    |   |
|  | - ...             |  |  8  9 10 11 12 13 14    |   |
|  |                   |  | 15 16 17 18 19 20 21    |   |
|  |                   |  | 22 23 24 25 26 27 28    |   |
|  +-------------------+  +-------------------------+   |
|                         | TimePicker (optional)    |   |
|                         +--------------------------+   |
|                         |              [Done]      |   |  <-- Footer
|                         +--------------------------+   |
+-------------------------------------------------------+
| [Validation icon] Validation message                  |
| Support text                                          |
+-------------------------------------------------------+
```

**Parts:**
1. **Label** -- Optional label above the input with required indicator and helper tooltip.
2. **Input Bar** (PopoverTrigger) -- Displays selected date(s), calendar icon prefix, clear button on hover.
3. **Filter Panel** -- Optional sidebar with predefined date shortcuts (e.g., "Today", "Yesterday").
4. **Calendar** -- Core date grid for visual date selection.
5. **TimePicker** -- Optional time selection row shown when `timer` is enabled.
6. **Footer** -- Contains the "Done" button to confirm selection.
7. **Validation Message** -- Contextual feedback message with icon.
8. **Support Text** -- Additional guidance text below the input.

## Props / API

### DatePickerProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"single" \| "range"` | `"single"` | Selection mode -- single date or date range. |
| `timer` | `boolean` | `false` | Enables time selection alongside date selection. |
| `size` | `"s" \| "m" \| "l"` | `"m"` | Controls the size of the input and calendar. |
| `filters` | `FilterItem[]` | `[]` | Predefined date filter shortcuts displayed in a sidebar panel. |
| `required` | `boolean` | `undefined` | Marks the field as required, showing an asterisk on the label. |
| `selectedDates` | `Date[]` | `[]` | Controlled array of currently selected Date objects. |
| `onDateChangeHandler` | `Dispatch<SetStateAction<Date[]>>` | `() => {}` | Callback fired when dates are confirmed (on "Done" or popover close). |
| `validationState` | `"default" \| "warning" \| "error" \| "success"` | `"default"` | Visual validation state of the input border and message. |
| `helperText` | `string` | `undefined` | Tooltip text shown next to the label via a help icon. |
| `validationMessage` | `string` | `undefined` | Feedback message displayed below the input (shown for non-default states). |
| `supportText` | `string` | `undefined` | Guidance text displayed below the validation message. |
| `disabled` | `boolean` | `undefined` | Disables the entire component, preventing interaction. |
| `readOnly` | `boolean` | `false` | Makes the component read-only with a distinct visual style. |
| `width` | `string` | `"100%"` | CSS width value for the popover trigger. |
| `label` | `string` | `undefined` | Label text displayed above the input. |
| `placeholder` | `string` | `"DD/MM/YYYY"` | Placeholder text for the input field(s). For range, split by `~`. |
| `prefixIcon` | `React.JSX.Element` | `<CalendarIcon />` | Custom icon displayed before the input text. |
| `dateFormatter` | `(dates: (string \| Date)[], isTime: boolean) => string[]` | `formatDateAndTime` | Custom function to format date display strings. |
| `allowManualInput` | `boolean` | `true` | Allows users to type dates directly into the input field. |
| `hideFooter` | `boolean` | `false` | Hides the footer area containing the "Done" button. |
| `propsConfig` | `PropsConfig` | `undefined` | Pass-through props for internal sub-components. |
| `classNames` | `ClassNamesTypes` | `undefined` | Custom CSS classes for internal elements. |
| `ref` | `React.Ref<HTMLDivElement>` | `undefined` | Ref forwarded to the root container div. |

### FilterItem

| Property | Type | Description |
|----------|------|-------------|
| `id` | `number \| string` | Unique identifier for the filter. |
| `label` | `string` | Display label (e.g., "Today", "Yesterday"). |
| `onSelect` | `(date: Date) => Date[]` | Function returning selected dates when filter is clicked. |

### PropsConfig

| Property | Type | Description |
|----------|------|-------------|
| `calendarProps` | `CalendarProps` | Props forwarded to the internal `Calendar` component. |
| `timePickerProps` | `TimePickerProps` | Props forwarded to the internal `TimePicker` component. |
| `popoverTriggerProps` | `PopoverTriggerProps` | Props forwarded to the Radix `PopoverTrigger`. |
| `popoverContentProps` | `PopoverContentProps` | Props forwarded to the Radix `PopoverContent`. |
| `toolTipProps` | `TooltipProps` | Props forwarded to the Radix `Tooltip`. |
| `toolTipTriggerProps` | `TooltipTriggerProps` | Props forwarded to the Radix `TooltipTrigger`. |
| `toolTipContentProps` | `TooltipContentProps` | Props forwarded to the Radix `TooltipContent`. |

### ClassNamesTypes

| Property | Type | Description |
|----------|------|-------------|
| `popoverTriggerClasses` | `string` | Classes for the popover trigger wrapper. |
| `popoverContentClasses` | `string` | Classes for the popover content panel. |
| `toolTipTriggerClasses` | `string` | Classes for the helper tooltip trigger. |
| `toolTipContentClasses` | `string` | Classes for the helper tooltip content. |
| `inputFeildClasses` | `string` | Classes for the date input field(s). |
| `clearIconClasses` | `string` | Classes for the clear (X) icon. |
| `prefixIconClasses` | `string` | Classes for the prefix calendar icon. |
| `inBetweenArrowIconClasses` | `string` | Classes for the arrow icon between range inputs. |
| `buttonClasses` | `string` | Classes for the "Done" button. |
| `filterItemClasses` | `string` | Classes for individual filter sidebar items. |

## Variants

### Single Date Picker
Allows selecting a single date. The input displays one date value.

### Range Date Picker
Allows selecting a start and end date. The input displays two fields separated by an arrow icon. Focus automatically moves from start to end after the first date is selected.

### With Timer
Adds a `TimePicker` component below the calendar for combined date and time selection (12-hour format by default).

### With Filters
Displays a sidebar panel on the left side of the calendar with predefined date shortcuts. The active filter is highlighted. Clicking a filter auto-selects the corresponding date(s).

### With Footer Hidden
When `hideFooter` is `true`, the "Done" button is removed. Selection is confirmed when the popover closes.

## Sizes

| Size | Input Height | Font Size | Icon Scale | Border Radius |
|------|-------------|-----------|------------|---------------|
| `s` (Small) | 32px | 14px | 90% | rounded-[16px] |
| `m` (Medium) | 40px | 14px | 110% | rounded-[16px] |
| `l` (Large) | 48px | 16px | 130% | rounded-[16px] |

## States

| State | Description |
|-------|-------------|
| **Default** | Standard appearance with neutral grey border (`--gd-neutral-grey-40`). |
| **Open/Focused** | Border color changes to primary (`--gd-primary-60`). Popover calendar is visible. |
| **Hover** | Clear icon appears when value is present. |
| **Disabled** | Cursor changes to `not-allowed`. Background becomes `--gd-background-surface-10`. Interaction is blocked. |
| **Read-Only** | Background becomes `--gd-background-surface-10`. Text color is `--gd-text-subdued-1`. Cannot open popover. |
| **Error** | Border color becomes `--gd-feedback-error-50`. Validation message appears with error icon. |
| **Warning** | Border color becomes `--gd-feedback-warning-50`. Validation message appears with warning icon. |
| **Success** | Border color becomes `--gd-feedback-success-50`. Validation message appears with success icon. |
| **Manual Input Invalid** | When typing produces an invalid date, the border turns to error color (`--gd-feedback-error-50`). Uses Zod-based validation for DD/MM/YYYY format. |
| **Range - Start Focused** | In range mode, the start input has a primary-colored bottom border underline. |
| **Range - End Focused** | In range mode, the end input has a primary-colored bottom border underline. |

## Design Tokens

| Token | Usage |
|-------|-------|
| `--gd-text-subdued-1` | Label text color, prefix icon color, clear icon color, read-only text, support text. |
| `--gd-text-subdued-2` | Arrow icon color between range inputs. |
| `--gd-text-default` | Default input text color. |
| `--gd-feedback-error-50` | Error border color, required asterisk color. |
| `--gd-feedback-warning-50` | Warning border color. |
| `--gd-feedback-success-50` | Success border color. |
| `--gd-primary-60` | Focused input border color. |
| `--gd-primary-20` | Active filter item background. |
| `--gd-primary-50` | Active filter item text color. |
| `--gd-neutral-grey-40` | Default border color, divider lines. |
| `--gd-background-surface-0` | Default background, popover content background, tooltip background, filter panel background. |
| `--gd-background-surface-10` | Disabled/read-only background, filter item hover background. |
| `--gd-background-surface-20` | Filter item active/pressed background. |
| `--gd-popover-shadow` | Box shadow for the popover content. |

## Accessibility

### ARIA Attributes
- The popover trigger has `data-testid="popover-trigger"`.
- Filter buttons use `role="button"`, `aria-pressed`, and `aria-label` with the filter label.
- Input fields include `data-testid` values (`start-input`, `end-input`, `single-input`).
- The "Done" button has `data-testid="done-button"`.
- Clear icon has `data-testid="clear-icon"`.

### Keyboard Interactions
| Key | Action |
|-----|--------|
| **Enter** | Confirms the current selection and closes the popover (calls `pressedDoneHandler`). |
| **Backspace** | In manual input mode, handles deletion including automatic slash removal in DD/MM/YYYY format. |
| **Delete** | Deletes character at cursor, with special handling for complete field clearing. |
| **Tab** | Moves focus between start and end inputs in range mode. |
| **Click** | Opens/closes the popover. In range mode, clicking a field sets focus to that field. |

### Date Input Validation
- Uses Zod schemas for real-time validation of date format (DD/MM/YYYY).
- Validates day ranges (1-31), month ranges (1-12), and month-specific day limits (e.g., Feb max 29).
- Range validation ensures start date is not after end date.
- Auto-formats input with slashes as the user types (e.g., "15" becomes "15/").

## Performance Best Practices

### Rendering Optimization
- **Memoize the calendar grid** — The calendar renders 42 day cells. Wrap the grid in `React.memo` and only re-render when `displayMonth`, `selectedDates`, or `disabledDates` change.
- **Stable event handlers** — `onDateChangeHandler` and filter `onSelect` callbacks should use `useCallback` in the parent. These are passed through to the calendar and filter list.
- **Lazy mount popover** — Only mount the calendar, time picker, and filter panel when the popover opens for the first time. This avoids rendering complex sub-components for a closed date picker.

### Date Computation
- **Cache month grid** — Use `useMemo` to compute the 6×7 day grid based on `displayMonth`. Re-computing on every render is wasteful since the grid only changes when the month changes.
- **Batch date formatting** — Format display strings via `useMemo` keyed on `selectedDates`. Avoid calling `format()` on every render.
- **Zod schema caching** — Create Zod validation schemas once at module level, not inside the component. Schema creation is not free.

### Input Performance
- **Debounce manual input validation** — Validate typed input on a short debounce (100ms) rather than on every keystroke. This prevents excessive Zod validation runs during fast typing.
- **Auto-format without state churn** — Insert `/` separators in the `onChange` handler without triggering additional re-renders. Use a single `setState` call per keystroke.

### Scalability Considerations
- **Controlled date state** — Use `selectedDates` + `onDateChangeHandler` as the controlled pattern. Internal `tempDates` buffer ensures the parent state only updates on confirmation, not on every calendar click.
- **Composable sub-components** — Calendar, TimePicker, and FilterPanel should be independently importable for custom compositions.
- **i18n-ready** — Date formatting should use `Intl.DateTimeFormat` or configurable `dateFormatter` prop, not hardcoded format strings.
- **Range mode focus management** — Automatically shift focus from start to end input after first date selection to reduce user friction.
