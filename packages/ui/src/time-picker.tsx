"use client"

import * as React from "react"
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react"
import { InputLabel } from "./input-label.tsx"
import { cn } from "@repo/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select.tsx"

// ─── Types ─────────────────────────────────────────────
interface TimePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label?: string
  required?: boolean
  helperText?: string
  value?: string // "12:00 AM" or "14:30"
  time24Format?: boolean
  validationState?: "default" | "error" | "warning" | "success"
  validationMessage?: string
  supportText?: string
  placeholder?: string // "HH:MM"
  size?: "s" | "m" | "l"
  disabled?: boolean
  onChange?: (time: string) => void
}

// ─── Constants ─────────────────────────────────────────
const SIZE_MAP = {
  s: { height: 32, fontSize: "var(--font-size-s)", iconSize: 14 },
  m: { height: 40, fontSize: "var(--font-size-m)", iconSize: 16 },
  l: { height: 48, fontSize: "var(--font-size-l)", iconSize: 18 },
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

// ─── Helpers ───────────────────────────────────────────
function generate12Hours(): string[] {
  return Array.from({ length: 12 }, (_, i) => {
    const h = i + 1
    return h.toString().padStart(2, "0")
  })
}

function generate24Hours(): string[] {
  return Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
}

function generateMinutes(): string[] {
  return Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"))
}

function parseTimeValue(
  value: string | undefined,
  is24: boolean
): { hour: string; minute: string; period: "AM" | "PM" } {
  if (!value) return { hour: "", minute: "", period: "AM" }

  const trimmed = value.trim()

  // Check for AM/PM format: "12:00 AM"
  const match12 = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (match12) {
    const h = match12[1].padStart(2, "0")
    const m = match12[2]
    const p = match12[3].toUpperCase() as "AM" | "PM"
    if (is24) {
      let hour24 = parseInt(h, 10)
      if (p === "PM" && hour24 !== 12) hour24 += 12
      if (p === "AM" && hour24 === 12) hour24 = 0
      return {
        hour: hour24.toString().padStart(2, "0"),
        minute: m,
        period: "AM",
      }
    }
    return { hour: h, minute: m, period: p }
  }

  // Check for 24h format: "14:30"
  const match24 = trimmed.match(/^(\d{1,2}):(\d{2})$/)
  if (match24) {
    const hour24 = parseInt(match24[1], 10)
    const m = match24[2]
    if (is24) {
      return {
        hour: hour24.toString().padStart(2, "0"),
        minute: m,
        period: "AM",
      }
    }
    // Convert to 12h
    const p: "AM" | "PM" = hour24 >= 12 ? "PM" : "AM"
    let h12 = hour24 % 12
    if (h12 === 0) h12 = 12
    return { hour: h12.toString().padStart(2, "0"), minute: m, period: p }
  }

  return { hour: "", minute: "", period: "AM" }
}

// ─── Component ─────────────────────────────────────────
const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      className,
      label,
      required,
      helperText,
      value,
      time24Format = false,
      validationState = "default",
      validationMessage,
      supportText,
      placeholder: _placeholder,
      size = "m",
      disabled = false,
      onChange,
      ...props
    },
    ref
  ) => {
    const parsed = parseTimeValue(value, time24Format)
    const [hour, setHour] = React.useState(parsed.hour)
    const [minute, setMinute] = React.useState(parsed.minute)
    const [period, setPeriod] = React.useState<"AM" | "PM">(parsed.period)

    // Sync with controlled value
    React.useEffect(() => {
      const p = parseTimeValue(value, time24Format)
      setHour(p.hour)
      setMinute(p.minute)
      setPeriod(p.period)
    }, [value, time24Format])

    const sizeConfig = SIZE_MAP[size]
    const hours = time24Format ? generate24Hours() : generate12Hours()
    const minutes = generateMinutes()

    const emitChange = React.useCallback(
      (h: string, m: string, p: "AM" | "PM") => {
        if (!h || !m) return
        if (time24Format) {
          onChange?.(`${h}:${m}`)
        } else {
          onChange?.(`${h}:${m} ${p}`)
        }
      },
      [onChange, time24Format]
    )

    const handleHourChange = (h: string) => {
      setHour(h)
      emitChange(h, minute, period)
    }

    const handleMinuteChange = (m: string) => {
      setMinute(m)
      emitChange(hour, m, period)
    }

    const handlePeriodChange = (p: "AM" | "PM") => {
      setPeriod(p)
      emitChange(hour, minute, p)
    }

    const validationInfo =
      validationState !== "default"
        ? VALIDATION_CONFIG[validationState]
        : null
    const ValidationIcon = validationInfo?.icon

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

        {/* Time picker controls */}
        <div
          className="flex items-center"
          style={{ gap: "var(--space-8)" }}
        >
          {/* Hour select */}
          <Select
            value={hour}
            onValueChange={handleHourChange}
            disabled={disabled}
          >
            <SelectTrigger
              style={{
                height: sizeConfig.height,
                fontSize: sizeConfig.fontSize,
                width: 72,
                borderColor: validationInfo?.borderColor ?? "var(--grey-40)",
                borderRadius: "var(--radius-8)",
                backgroundColor: disabled
                  ? "var(--grey-20)"
                  : "var(--surface-0)",
              }}
            >
              <SelectValue placeholder="HH" />
            </SelectTrigger>
            <SelectContent>
              {hours.map((h) => (
                <SelectItem key={h} value={h}>
                  {h}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Colon separator */}
          <span
            style={{
              fontSize: sizeConfig.fontSize,
              fontWeight: "var(--font-weight-heading)",
              color: disabled
                ? "var(--text-subdued-2)"
                : "var(--text-default)",
              lineHeight: 1,
            }}
          >
            :
          </span>

          {/* Minute select */}
          <Select
            value={minute}
            onValueChange={handleMinuteChange}
            disabled={disabled}
          >
            <SelectTrigger
              style={{
                height: sizeConfig.height,
                fontSize: sizeConfig.fontSize,
                width: 72,
                borderColor: validationInfo?.borderColor ?? "var(--grey-40)",
                borderRadius: "var(--radius-8)",
                backgroundColor: disabled
                  ? "var(--grey-20)"
                  : "var(--surface-0)",
              }}
            >
              <SelectValue placeholder="MM" />
            </SelectTrigger>
            <SelectContent>
              {minutes.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* AM/PM toggle (only in 12h mode) */}
          {!time24Format && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: disabled
                  ? "var(--grey-20)"
                  : "var(--grey-30)",
                borderRadius: "var(--radius-full)",
                padding: 2,
                height: sizeConfig.height,
              }}
            >
              {(["AM", "PM"] as const).map((p) => {
                const isSelected = period === p
                return (
                  <button
                    key={p}
                    type="button"
                    disabled={disabled}
                    onClick={() => handlePeriodChange(p)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: sizeConfig.height - 4,
                      padding: "0 var(--space-12)",
                      borderRadius: "var(--radius-full)",
                      border: "none",
                      cursor: disabled ? "not-allowed" : "pointer",
                      fontSize: sizeConfig.fontSize,
                      fontWeight: "var(--font-weight-prominent)",
                      fontFamily: "var(--font-sans)",
                      transition:
                        "background-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease",
                      backgroundColor: isSelected
                        ? "var(--surface-0)"
                        : "transparent",
                      color: isSelected
                        ? "var(--primary-50)"
                        : disabled
                          ? "var(--text-subdued-2)"
                          : "var(--text-subdued-1)",
                      boxShadow: isSelected
                        ? "var(--shadow-small)"
                        : "none",
                      opacity: disabled ? 0.5 : 1,
                    }}
                  >
                    {p}
                  </button>
                )
              })}
            </div>
          )}
        </div>

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
                width: sizeConfig.iconSize,
                height: sizeConfig.iconSize,
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

TimePicker.displayName = "TimePicker"

export { TimePicker, type TimePickerProps }
