"use client"

import * as React from "react"
import { format } from "date-fns"
import {
  CalendarIcon,
  ArrowRight,
  X,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { cn } from "@repo/utils"
import { InputLabel } from "./input-label.tsx"
import { Button } from "./button.tsx"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover.tsx"
import { Calendar } from "./calendar.tsx"
import type { DateRange } from "react-day-picker"

// ─── Types ─────────────────────────────────────────────
interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "range"
  selectedDates?: Date[]
  onDateChange?: (dates: Date[]) => void
  label?: string
  required?: boolean
  helperText?: string
  placeholder?: string
  size?: "s" | "m" | "l"
  disabled?: boolean
  validationState?: "default" | "error" | "warning" | "success"
  validationMessage?: string
  supportText?: string
}

// ─── Constants ─────────────────────────────────────────
const SIZE_MAP = {
  s: {
    height: 32,
    fontSize: "var(--font-size-s)",
    iconSize: 14,
    padding: "0 var(--space-8)",
  },
  m: {
    height: 40,
    fontSize: "var(--font-size-m)",
    iconSize: 16,
    padding: "0 var(--space-12)",
  },
  l: {
    height: 48,
    fontSize: "var(--font-size-l)",
    iconSize: 18,
    padding: "0 var(--space-16)",
  },
} as const

const VALIDATION_CONFIG = {
  error: {
    color: "var(--error-50)",
    textColor: "var(--error-80)",
    icon: AlertCircle,
    borderColor: "var(--error-50)",
  },
  warning: {
    color: "var(--warning-50)",
    textColor: "var(--warning-80)",
    icon: AlertTriangle,
    borderColor: "var(--warning-50)",
  },
  success: {
    color: "var(--success-50)",
    textColor: "var(--success-80)",
    icon: CheckCircle,
    borderColor: "var(--success-50)",
  },
} as const

function formatDate(date: Date): string {
  return format(date, "dd/MM/yyyy")
}

// ─── Component ─────────────────────────────────────────
const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      className,
      type = "single",
      selectedDates = [],
      onDateChange,
      label,
      required,
      helperText,
      placeholder = "DD/MM/YYYY",
      size = "m",
      disabled = false,
      validationState = "default",
      validationMessage,
      supportText,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)

    // Internal state for range mode (track in-progress selection)
    const [internalRange, setInternalRange] = React.useState<
      DateRange | undefined
    >(() => {
      if (type === "range" && selectedDates.length > 0) {
        return {
          from: selectedDates[0],
          to: selectedDates.length > 1 ? selectedDates[1] : undefined,
        }
      }
      return undefined
    })

    // Sync internal range with selectedDates prop
    React.useEffect(() => {
      if (type === "range") {
        if (selectedDates.length > 0) {
          setInternalRange({
            from: selectedDates[0],
            to: selectedDates.length > 1 ? selectedDates[1] : undefined,
          })
        } else {
          setInternalRange(undefined)
        }
      }
    }, [selectedDates, type])

    const sizeConfig = SIZE_MAP[size]
    const validationInfo =
      validationState !== "default"
        ? VALIDATION_CONFIG[validationState]
        : null
    const ValidationIcon = validationInfo?.icon

    const hasDates = selectedDates.length > 0
    const showClear = hasDates && isHovered && !disabled

    // Determine border color
    const borderColor = open
      ? "var(--primary-60)"
      : validationInfo?.borderColor ?? "var(--grey-40)"

    // ─── Single mode handlers ────────────────────────
    const handleSingleSelect = React.useCallback(
      (date: Date | undefined) => {
        if (date) {
          onDateChange?.([date])
        }
      },
      [onDateChange]
    )

    // ─── Range mode handlers ─────────────────────────
    const handleRangeSelect = React.useCallback(
      (range: DateRange | undefined) => {
        setInternalRange(range)
      },
      []
    )

    const handleDone = React.useCallback(() => {
      if (type === "range" && internalRange) {
        const dates: Date[] = []
        if (internalRange.from) dates.push(internalRange.from)
        if (internalRange.to) dates.push(internalRange.to)
        onDateChange?.(dates)
      }
      setOpen(false)
    }, [type, internalRange, onDateChange])

    const handleClear = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        onDateChange?.([])
        setInternalRange(undefined)
      },
      [onDateChange]
    )

    // ─── Display value ───────────────────────────────
    const renderDisplayValue = () => {
      if (!hasDates) {
        return (
          <span style={{ color: "var(--text-subdued-2)" }}>
            {type === "range"
              ? `${placeholder} - ${placeholder}`
              : placeholder}
          </span>
        )
      }

      if (type === "single") {
        return (
          <span style={{ color: "var(--text-default)" }}>
            {formatDate(selectedDates[0])}
          </span>
        )
      }

      // Range
      return (
        <span
          className="flex items-center"
          style={{ gap: "var(--space-4)", color: "var(--text-default)" }}
        >
          <span>{formatDate(selectedDates[0])}</span>
          <ArrowRight
            style={{
              width: sizeConfig.iconSize,
              height: sizeConfig.iconSize,
              color: "var(--text-subdued-2)",
              flexShrink: 0,
            }}
          />
          <span>
            {selectedDates.length > 1
              ? formatDate(selectedDates[1])
              : placeholder}
          </span>
        </span>
      )
    }

    return (
      <div
        ref={ref}
        className={cn("flex flex-col", className)}
        style={{ gap: "var(--space-4)" }}
        {...props}
      >
        {/* Label */}
        <InputLabel required={required} helperText={helperText} disabled={disabled}>
          {label}
        </InputLabel>

        {/* Support text */}
        {supportText && (
          <span
            style={{
              fontSize: "var(--font-size-s)",
              color: "var(--text-subdued-1)",
              lineHeight: "var(--line-height-s)",
            }}
          >
            {supportText}
          </span>
        )}

        {/* Popover */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild disabled={disabled}>
            <button
              type="button"
              disabled={disabled}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="flex items-center"
              style={{
                height: sizeConfig.height,
                padding: sizeConfig.padding,
                fontSize: sizeConfig.fontSize,
                borderRadius: "var(--radius-8)",
                border: `1px solid ${borderColor}`,
                backgroundColor: disabled
                  ? "var(--grey-20)"
                  : "var(--surface-0)",
                cursor: disabled ? "not-allowed" : "pointer",
                gap: "var(--space-8)",
                transition:
                  "border-color 0.15s ease, box-shadow 0.15s ease",
                outline: "none",
                fontFamily: "var(--font-sans)",
                width: "100%",
                textAlign: "left",
                opacity: disabled ? 0.5 : 1,
              }}
            >
              {/* Calendar icon */}
              <CalendarIcon
                style={{
                  width: sizeConfig.iconSize,
                  height: sizeConfig.iconSize,
                  color: "var(--text-subdued-2)",
                  flexShrink: 0,
                }}
              />

              {/* Display value */}
              <span className="flex-1 truncate">
                {renderDisplayValue()}
              </span>

              {/* Clear button */}
              {showClear && (
                <span
                  role="button"
                  tabIndex={-1}
                  onClick={handleClear}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleClear(e as unknown as React.MouseEvent)
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 20,
                    height: 20,
                    borderRadius: "var(--radius-full)",
                    backgroundColor: "var(--grey-30)",
                    color: "var(--text-subdued-1)",
                    cursor: "pointer",
                    flexShrink: 0,
                    border: "none",
                    padding: 0,
                  }}
                >
                  <X style={{ width: 12, height: 12 }} />
                </span>
              )}
            </button>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            className="w-auto p-0"
            style={{
              borderRadius: "var(--radius-12)",
              boxShadow: "var(--shadow-medium)",
              border: "1px solid var(--grey-40)",
              backgroundColor: "var(--surface-0)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {type === "single" ? (
                <Calendar
                  mode="single"
                  selected={selectedDates[0] ?? undefined}
                  onSelect={handleSingleSelect}
                />
              ) : (
                <Calendar
                  mode="range"
                  selected={internalRange}
                  onSelect={handleRangeSelect}
                />
              )}

              {/* Footer with Done button */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "var(--space-8) var(--space-12)",
                  borderTop: "1px solid var(--grey-40)",
                }}
              >
                <Button
                  size="sm"
                  onClick={handleDone}
                  style={{
                    borderRadius: "var(--radius-full)",
                  }}
                >
                  Done
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Validation message */}
        {validationMessage && validationInfo && ValidationIcon && (
          <div
            className="flex items-center"
            style={{
              gap: "var(--space-4)",
              marginTop: "var(--space-2)",
            }}
          >
            <ValidationIcon
              style={{
                width: 16,
                height: 16,
                color: validationInfo.color,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "var(--font-size-s)",
                color: validationInfo.textColor,
                lineHeight: "var(--line-height-s)",
              }}
            >
              {validationMessage}
            </span>
          </div>
        )}
      </div>
    )
  }
)

DatePicker.displayName = "DatePicker"

export { DatePicker, type DatePickerProps }
