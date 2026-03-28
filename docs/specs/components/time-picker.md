# TimePicker

## Overview

The `TimePicker` component provides a time selection UI composed of two searchable `Dropdown` components (hours and minutes) and an AM/PM toggle selector. It supports both 12-hour and 24-hour formats, validation states, labels with helper tooltips, and is used both standalone and as an embedded sub-component within the `DatePicker`.

## Anatomy

```
+----------------------------------------------------------+
| [Label*] [?]                                             |
+----------------------------------------------------------+
| [Hour Dropdown] : [Minute Dropdown]  [AM | PM]           |
+----------------------------------------------------------+
| [Icon] Validation message                                |
| Support text                                             |
+----------------------------------------------------------+
```

**Parts:**
1. **Label** -- Optional label with required indicator and helper text tooltip (uses `InputLabel`).
2. **Hour Dropdown** -- Searchable dropdown for selecting the hour value. Supports direct numeric input.
3. **Colon Separator** -- Static `:` text between hour and minute.
4. **Minute Dropdown** -- Searchable dropdown for selecting the minute value (00-59). Supports direct numeric input.
5. **AM/PM Selector** -- Segmented toggle control for period selection (hidden in 24-hour format).
6. **Validation Message** -- Contextual feedback message with colored icon (error/warning/success).
7. **Support Text** -- Additional guidance text below the component.

## Props / API

### TimePickerProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `undefined` | Label text displayed above the time picker. |
| `required` | `boolean` | `undefined` | Shows asterisk on label to indicate required field. |
| `value` | `string` | `undefined` | Controlled time value string (e.g., `"12:00 AM"` or `"14:30"`). Used to set initial hour, minute, and period. |
| `time24Format` | `boolean` | `undefined` | Switches to 24-hour format. Hides the AM/PM selector. Hour options become 1-24. |
| `validationState` | `"error" \| "warning" \| "success" \| "default"` | `"default"` | Visual validation state applied to both dropdowns and the message. |
| `placeholder` | `string` | `"HH:MM"` | Placeholder text. Split by `:` to set hour and minute placeholder independently. |
| `helperText` | `string` | `undefined` | Tooltip text shown when hovering the help icon next to the label. |
| `size` | `"s" \| "m" \| "l"` | `"m"` | Controls the size of dropdowns and the AM/PM selector. |
| `disabled` | `boolean` | `undefined` | Disables all inputs and the period selector. |
| `validationMessage` | `string` | `undefined` | Feedback message text displayed below the inputs. |
| `onChange` | `(time: string) => void` | `undefined` | Callback fired when the time changes. Returns formatted string like `"12:30 PM"` or `"14:30"`. |
| `tooltipText` | `string` | `undefined` | Additional tooltip text (available in props but used via `helperText`). |
| `dropdownProps` | `DropdownProps` | `undefined` | Props spread onto both the hour and minute `Dropdown` components. |
| `supportText` | `string` | `undefined` | Additional guidance text displayed below the validation message. |
| `autoCloseTimer` | `number` | `0` | Timer delay for auto-closing dropdowns (reserved for future use). |
| `classNames` | `{ containerclass?: string; selectorContainerClass?: string; selectorItemClass?: string }` | `undefined` | Custom CSS classes for the container and AM/PM selector elements. |
| `ref` | `React.Ref<HTMLDivElement>` | `undefined` | Ref forwarded to the root container div. |

## Variants

### 12-Hour Format (default)
Displays hour values 01-12 with an AM/PM segmented toggle. The `onChange` callback returns time in `"HH:MM AM/PM"` format.

### 24-Hour Format
Displays hour values 01-24 with no AM/PM toggle. The `onChange` callback returns time in `"HH:MM"` format. Enabled via the `time24Format` prop.

## Sizes

| Size | Dropdown Height | Trigger Padding | Font Size | AM/PM Selector Height | AM/PM Item Padding |
|------|----------------|-----------------|-----------|----------------------|-------------------|
| `s` (Small) | 32px | `py-[4px] px-[12px]` | 14px | 32px, `p-[2px]` | `py-[4px] px-[8px]` |
| `m` (Medium) | 40px | `py-[8px] px-[12px]` | 14px | 40px, `p-[4px]` | `py-[6px] px-[12px]` |
| `l` (Large) | 48px | `py-[12px] px-[12px]` | 16px | 40px, `p-[4px]` | `py-[6px] px-[12px]` |

## States

| State | Description |
|-------|-------------|
| **Default** | Standard appearance. Hour and minute dropdowns use `default` validation state. AM defaults to selected. |
| **Disabled** | All dropdowns and the AM/PM selector become non-interactive. AM/PM selector background changes to `--gd-neutral-grey-20`. Button text becomes `--gd-text-subdued-2`. Cursor is `not-allowed`. |
| **Error** | Dropdown borders turn error color. Validation message appears with `IcErrorColored` icon. Message text uses `--gd-feedback-error-80`. |
| **Warning** | Dropdown borders turn warning color. Validation message appears with `IcWarningColored` icon. Message text uses `--gd-feedback-warning-80`. |
| **Success** | Dropdown borders turn success color. Validation message appears with `IcSuccessColored` icon. Message text uses `--gd-feedback-success-80`. |

### AM/PM Selector States

| State | Background | Text Color |
|-------|-----------|------------|
| **Selected (active)** | `--gd-background-surface-0` (white) | `--gd-primary-50` |
| **Unselected** | `transparent` | `--gd-text-subdued-1` |
| **Disabled** | `--gd-neutral-grey-20` (container) | `--gd-text-subdued-2` |

## Design Tokens

| Token | Usage |
|-------|-------|
| `--gd-text-subdued-1` | Unselected AM/PM button text, support text color. |
| `--gd-text-subdued-2` | Disabled AM/PM button text. |
| `--gd-text-default` | Default validation message text. |
| `--gd-primary-50` | Selected AM/PM button text. |
| `--gd-primary-10` | (Inherited from Dropdown) selected option highlight. |
| `--gd-background-surface-0` | Selected AM/PM button background. |
| `--gd-neutral-grey-20` | Disabled AM/PM selector container background. |
| `--gd-neutral-grey-30` | Default AM/PM selector container background. |
| `--gd-feedback-error-50` | Error validation icon. |
| `--gd-feedback-error-80` | Error validation message text. |
| `--gd-feedback-warning-50` | Warning validation icon. |
| `--gd-feedback-warning-80` | Warning validation message text. |
| `--gd-feedback-success-50` | Success validation icon. |
| `--gd-feedback-success-80` | Success validation message text. |

## Accessibility

### ARIA Attributes
- Hour dropdown has `data-testid="hour-dropdown"`.
- Minute dropdown has `data-testid="minute-dropdown"`.
- AM/PM buttons use `role="button"` and `aria-label` with the period label (e.g., "AM", "PM").
- Label is rendered via `InputLabel` with `htmlFor="time-picker-input"`.

### Keyboard Interactions
| Key | Action |
|-----|--------|
| **Type digits in hour** | Direct numeric input into the hour dropdown search field. Regex validation: 12h format allows `0-12`, 24h format allows `0-23`. Auto-advances to minute dropdown after 2 digits. |
| **Type digits in minute** | Direct numeric input into the minute dropdown search field. Regex allows `0-59`. Auto-closes dropdown after 2 digits. |
| **ArrowUp/Down** | Navigate dropdown options (inherited from Dropdown component). |
| **Enter/Space** | Select highlighted dropdown option (inherited from Dropdown component). |
| **Click AM/PM** | Toggles between AM and PM periods. Triggers `onChange` with updated time. |

### Input Behavior
- Hour input supports direct typing with regex validation (`/^([0-1]?\d|2[0-3]?)?$/` for 24h, `/^([0]?[0-9]?|1[0-2]?)?$/` for 12h).
- Minute input validates with `/^$|^[0-5]?\d$/`.
- When a 2-digit hour is typed, focus automatically moves to the minute dropdown.
- When the dropdown closes, values shorter than 2 digits are zero-padded (e.g., "5" becomes "05").

## Performance Best Practices

### Rendering Optimization
- **Memoize dropdown options** — Hour (1-12 or 0-23) and minute (00-59) option lists are static. Define them as module-level constants, not computed inside the component.
- **Stable `onChange` handler** — The parent's `onChange` callback should use `useCallback`. It is called on every hour, minute, or AM/PM change.
- **Controlled input state** — Keep internal input state minimal. Derive display values from the controlled `value` prop rather than maintaining parallel internal state.

### Input Performance
- **Regex-gated input** — Validate input character-by-character with regex to prevent invalid characters from entering the field. This is cheaper than post-hoc validation and reformatting.
- **Auto-advance** — Automatically move focus from hour to minute field after entering a valid hour. This reduces user friction and eliminates unnecessary Tab key presses.
- **Debounce onChange** — If the parent performs expensive operations on time change (e.g., API calls), debounce the `onChange` callback. The component itself should not debounce — let the consumer decide.

### Scalability Considerations
- **12h and 24h format** — Support both via the `time24Format` prop. The AM/PM toggle is only rendered in 12-hour mode.
- **Composable with DatePicker** — The TimePicker should be usable standalone or embedded within the DatePicker popover. Accept forwarded props for consistent styling.
- **Validation state integration** — Support the same `validationState` pattern (default, error, warning, success) as other form components for consistent form-level validation UX.
- **Size variants** — Match the same size system (s/m/l) as the Dropdown and DatePicker for visual consistency when composed together.
