"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@repo/utils"
import { Button, buttonVariants } from "./button.tsx"

// ─── Constants ────────────────────────────────────────────
const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]
const YEARS_PER_PAGE = 16

// ─── Picker View Type ─────────────────────────────────────
type PickerView = "day" | "month" | "year"

// ─── Month Picker ─────────────────────────────────────────
function MonthPicker({
  currentMonth,
  currentYear,
  onSelect,
  onYearChange,
}: {
  currentMonth: number
  currentYear: number
  onSelect: (month: number) => void
  onYearChange: (delta: number) => void
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-8)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "var(--height-m)",
        }}
      >
        <button
          type="button"
          onClick={() => onYearChange(-1)}
          aria-label="Previous year"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: "var(--radius-8)",
            border: "none",
            backgroundColor: "transparent",
            color: "var(--primary-50)",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <ChevronLeftIcon style={{ width: 20, height: 20 }} />
        </button>

        <span
          style={{
            fontSize: "var(--font-size-m)",
            fontWeight: "var(--font-weight-heading)",
            lineHeight: "var(--line-height-m)",
            color: "var(--primary-60)",
            fontFamily: "var(--font-sans)",
          }}
        >
          {currentYear}
        </span>

        <button
          type="button"
          onClick={() => onYearChange(1)}
          aria-label="Next year"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: "var(--radius-8)",
            border: "none",
            backgroundColor: "transparent",
            color: "var(--primary-50)",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <ChevronRightIcon style={{ width: 20, height: 20 }} />
        </button>
      </div>

      {/* Month grid */}
      <div
        role="grid"
        aria-label={`Select month for ${currentYear}`}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "var(--space-4)",
          padding: "var(--space-4) 0",
        }}
      >
        {MONTHS_SHORT.map((label, i) => {
          const selected = i === currentMonth
          return (
            <button
              key={label}
              type="button"
              role="gridcell"
              aria-selected={selected}
              onClick={() => onSelect(i)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 36,
                borderRadius: "var(--radius-full)",
                border: "none",
                backgroundColor: selected ? "var(--primary-50)" : "transparent",
                color: selected ? "var(--primary-inverse)" : "var(--text-default)",
                fontSize: "var(--font-size-s)",
                fontWeight: "var(--font-weight-prominent)",
                lineHeight: "var(--line-height-s)",
                cursor: "pointer",
                transition: "background-color 0.1s ease, color 0.1s ease",
                fontFamily: "var(--font-sans)",
                padding: "0 var(--space-8)",
              }}
              onMouseEnter={(e) => {
                if (selected) return
                e.currentTarget.style.backgroundColor = "var(--primary-10)"
                e.currentTarget.style.color = "var(--primary-60)"
              }}
              onMouseLeave={(e) => {
                if (selected) return
                e.currentTarget.style.backgroundColor = "transparent"
                e.currentTarget.style.color = "var(--text-default)"
              }}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Year Picker ──────────────────────────────────────────
function YearPicker({
  currentYear,
  onSelect,
}: {
  currentYear: number
  onSelect: (year: number) => void
}) {
  const [rangeStart, setRangeStart] = React.useState(
    () => Math.floor(currentYear / YEARS_PER_PAGE) * YEARS_PER_PAGE + 3
  )

  const years = React.useMemo(
    () => Array.from({ length: YEARS_PER_PAGE }, (_, i) => rangeStart + i),
    [rangeStart]
  )

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-8)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "var(--height-m)",
        }}
      >
        <button
          type="button"
          onClick={() => setRangeStart((s) => s - YEARS_PER_PAGE)}
          aria-label="Previous years"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: "var(--radius-8)",
            border: "none",
            backgroundColor: "transparent",
            color: "var(--primary-50)",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <ChevronLeftIcon style={{ width: 20, height: 20 }} />
        </button>

        <span
          style={{
            fontSize: "var(--font-size-m)",
            fontWeight: "var(--font-weight-heading)",
            lineHeight: "var(--line-height-m)",
            color: "var(--primary-60)",
            fontFamily: "var(--font-sans)",
          }}
        >
          {years[0]} - {years[years.length - 1]}
        </span>

        <button
          type="button"
          onClick={() => setRangeStart((s) => s + YEARS_PER_PAGE)}
          aria-label="Next years"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: "var(--radius-8)",
            border: "none",
            backgroundColor: "transparent",
            color: "var(--primary-50)",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <ChevronRightIcon style={{ width: 20, height: 20 }} />
        </button>
      </div>

      {/* Year grid */}
      <div
        role="grid"
        aria-label={`Select year from ${years[0]} to ${years[years.length - 1]}`}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "var(--space-4)",
          padding: "var(--space-4) 0",
        }}
      >
        {years.map((year) => {
          const selected = year === currentYear
          return (
            <button
              key={year}
              type="button"
              role="gridcell"
              aria-selected={selected}
              onClick={() => onSelect(year)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 36,
                borderRadius: "var(--radius-full)",
                border: "none",
                backgroundColor: selected ? "var(--primary-50)" : "transparent",
                color: selected ? "var(--primary-inverse)" : "var(--text-default)",
                fontSize: "var(--font-size-s)",
                fontWeight: "var(--font-weight-prominent)",
                lineHeight: "var(--line-height-s)",
                cursor: "pointer",
                transition: "background-color 0.1s ease, color 0.1s ease",
                fontFamily: "var(--font-sans)",
                padding: "0 var(--space-4)",
              }}
              onMouseEnter={(e) => {
                if (selected) return
                e.currentTarget.style.backgroundColor = "var(--primary-10)"
                e.currentTarget.style.color = "var(--primary-60)"
              }}
              onMouseLeave={(e) => {
                if (selected) return
                e.currentTarget.style.backgroundColor = "transparent"
                e.currentTarget.style.color = "var(--text-default)"
              }}
            >
              {year}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Main Calendar ────────────────────────────────────────
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  month: controlledMonth,
  onMonthChange,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()
  const [pickerView, setPickerView] = React.useState<PickerView>("day")
  const [internalMonth, setInternalMonth] = React.useState<Date>(
    controlledMonth ?? new Date()
  )

  // Sync with controlled month prop
  const displayMonth = controlledMonth ?? internalMonth
  const handleMonthChange = React.useCallback(
    (date: Date) => {
      setInternalMonth(date)
      onMonthChange?.(date)
    },
    [onMonthChange]
  )

  // Month picker: user selects a month
  const handleMonthSelect = React.useCallback(
    (monthIndex: number) => {
      const newDate = new Date(displayMonth.getFullYear(), monthIndex, 1)
      handleMonthChange(newDate)
      setPickerView("day")
    },
    [displayMonth, handleMonthChange]
  )

  // Year picker: user selects a year → go to month picker
  const handleYearSelect = React.useCallback(
    (year: number) => {
      const newDate = new Date(year, displayMonth.getMonth(), 1)
      handleMonthChange(newDate)
      setPickerView("month")
    },
    [displayMonth, handleMonthChange]
  )

  // Month picker year navigation
  const handleMonthPickerYearChange = React.useCallback(
    (delta: number) => {
      const newDate = new Date(
        displayMonth.getFullYear() + delta,
        displayMonth.getMonth(),
        1
      )
      handleMonthChange(newDate)
    },
    [displayMonth, handleMonthChange]
  )

  // Shared container style for all views — fixed width so day/month/year cards match
  const calendarWidth = 220
  const containerStyle: React.CSSProperties = {
    backgroundColor: "var(--surface-0)",
    borderRadius: "var(--radius-12)",
    padding: "var(--space-12)",
    fontFamily: "var(--font-sans)",
    width: calendarWidth,
  }

  // Show month or year picker
  if (pickerView === "month") {
    return (
      <div
        data-slot="calendar"
        className={cn("bg-background", className)}
        style={containerStyle}
      >
        <MonthPicker
          currentMonth={displayMonth.getMonth()}
          currentYear={displayMonth.getFullYear()}
          onSelect={handleMonthSelect}
          onYearChange={handleMonthPickerYearChange}
        />
      </div>
    )
  }

  if (pickerView === "year") {
    return (
      <div
        data-slot="calendar"
        className={cn("bg-background", className)}
        style={containerStyle}
      >
        <YearPicker
          currentYear={displayMonth.getFullYear()}
          onSelect={handleYearSelect}
        />
      </div>
    )
  }

  // Day view — enhanced DayPicker
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background group/calendar p-6 [--cell-size:60px] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      style={containerStyle}
      captionLayout={captionLayout}
      month={displayMonth}
      onMonthChange={handleMonthChange}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-2 md:flex-row",
          defaultClassNames.months
        ),
        month: cn("flex w-full flex-col gap-1.5", defaultClassNames.month),
        nav: cn(
          "pointer-events-none absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "pointer-events-auto h-8 w-8 select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "pointer-events-auto h-8 w-8 select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-8 w-full items-center justify-center px-8",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-[--cell-size] w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "bg-popover absolute inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "flex-1 select-none text-[0.7rem] font-semibold uppercase text-center",
          defaultClassNames.weekday
        ),
        week: cn("mt-1 flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-[--cell-size] select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-muted-foreground select-none text-[0.8rem]",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative flex flex-1 items-center justify-center select-none p-0 text-center",
          defaultClassNames.day
        ),
        range_start: cn(
          "cal-range-start",
          defaultClassNames.range_start
        ),
        range_middle: cn(
          "cal-range-middle",
          defaultClassNames.range_middle
        ),
        range_end: cn(
          "cal-range-end",
          defaultClassNames.range_end
        ),
        today: cn(
          "rounded-full data-[selected=true]:rounded-full",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground opacity-40 aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-30",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          const style: React.CSSProperties = {
            color: "var(--primary-50)",
            width: 20,
            height: 20,
          }
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn(className)} style={style} {...props} />
            )
          }
          if (orientation === "right") {
            return (
              <ChevronRightIcon className={cn(className)} style={style} {...props} />
            )
          }
          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          )
        },
        CaptionLabel: () => {
          // Use displayMonth directly instead of parsing children
          const monthName = displayMonth.toLocaleString("default", { month: "long" })
          const year = displayMonth.getFullYear()

          return (
            <span
              className="select-none"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-8)",
              }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setPickerView("month")
                }}
                style={{
                  fontSize: "var(--font-size-m)",
                  fontWeight: "var(--font-weight-heading)",
                  lineHeight: "var(--line-height-m)",
                  color: "var(--primary-60)",
                  cursor: "pointer",
                  border: "none",
                  backgroundColor: "transparent",
                  padding: 0,
                  fontFamily: "var(--font-sans)",
                  transition: "color 0.1s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--primary-50)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--primary-60)"
                }}
                aria-label="Select month"
              >
                {monthName}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setPickerView("year")
                }}
                style={{
                  fontSize: "var(--font-size-m)",
                  fontWeight: "var(--font-weight-heading)",
                  lineHeight: "var(--line-height-m)",
                  color: "var(--primary-60)",
                  cursor: "pointer",
                  border: "none",
                  backgroundColor: "transparent",
                  padding: 0,
                  fontFamily: "var(--font-sans)",
                  transition: "color 0.1s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--primary-50)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--primary-60)"
                }}
                aria-label="Select year"
              >
                {year}
              </button>
            </span>
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-[--cell-size] items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

// ─── Day Button ───────────────────────────────────────────
function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  const isSelected =
    modifiers.selected &&
    !modifiers.range_start &&
    !modifiers.range_end &&
    !modifiers.range_middle
  const isToday = modifiers.today && !modifiers.selected

  return (
    <Button
      ref={ref}
      variant="ghost"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={isSelected}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[selected-single=true]:rounded-full",
        "data-[range-middle=true]:bg-transparent data-[range-middle=true]:text-foreground",
        "data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-start=true]:rounded-full",
        "data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-end=true]:rounded-full",
        "group-data-[focused=true]/day:ring-ring/50",
        "flex h-6 w-6 items-center justify-center gap-0 p-0 font-normal leading-none rounded-full",
        "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px]",
        "[&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      style={{
        ...(isToday
          ? {
              backgroundColor: "var(--primary-20)",
              color: "var(--primary-60)",
            }
          : {}),
        ...(modifiers.outside
          ? { color: "var(--text-subdued-2)" }
          : {}),
        fontSize: "var(--font-size-m)",
        fontWeight: "var(--font-weight-regular)",
        borderRadius: "var(--radius-full)",
      }}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
