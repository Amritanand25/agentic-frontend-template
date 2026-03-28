import * as React from "react"
import { cn } from "@repo/utils"

// ─── Size Configuration ──────────────────────────────────
const SPINNER_SIZE_CONFIG = {
  xs: {
    width: 12,
    height: 12,
    viewBox: "0 0 12 12",
    strokeWidth: 2.25,
    fontSize: "12px",
    lineHeight: "16px",
    gap: "4px",
  },
  s: {
    width: 16,
    height: 16,
    viewBox: "0 0 16 16",
    strokeWidth: 3,
    fontSize: "14px",
    lineHeight: "20px",
    gap: "8px",
  },
  m: {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    strokeWidth: 4,
    fontSize: "16px",
    lineHeight: "24px",
    gap: "12px",
  },
  l: {
    width: 40,
    height: 40,
    viewBox: "0 0 40 40",
    strokeWidth: 5,
    fontSize: "18px",
    lineHeight: "24px",
    gap: "16px",
  },
  xl: {
    width: 48,
    height: 48,
    viewBox: "0 0 48 48",
    strokeWidth: 6,
    fontSize: "18px",
    lineHeight: "24px",
    gap: "16px",
  },
} as const

type SpinnerSize = keyof typeof SPINNER_SIZE_CONFIG
type LabelPosition = "top" | "bottom" | "left" | "right"

// ─── Helpers ─────────────────────────────────────────────
function describeArc(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
): string {
  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180
  const startX = cx + radius * Math.cos(toRad(startAngle))
  const startY = cy + radius * Math.sin(toRad(startAngle))
  const endX = cx + radius * Math.cos(toRad(endAngle))
  const endY = cy + radius * Math.sin(toRad(endAngle))
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
  return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`
}

// ─── Spinner Props ───────────────────────────────────────
export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of the spinner */
  size?: SpinnerSize
  /** Color of the active arc */
  color?: string
  /** Color of the background circle */
  background?: string
  /** Optional text label */
  label?: string
  /** Position of the label relative to the spinner */
  labelPosition?: LabelPosition
}

// ─── Spinner Component ───────────────────────────────────
const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      className,
      size = "m",
      color = "var(--primary-50)",
      background = "var(--grey-40)",
      label,
      labelPosition = "right",
      style,
      ...props
    },
    ref,
  ) => {
    const config = SPINNER_SIZE_CONFIG[size]
    const cx = config.width / 2
    const cy = config.height / 2
    const radius = (config.width - config.strokeWidth) / 2
    const arcPath = describeArc(cx, cy, radius, 0, 270)

    const isVertical = labelPosition === "top" || labelPosition === "bottom"
    const isReversed = labelPosition === "top" || labelPosition === "left"

    const containerStyle: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: isVertical ? "column" : "row",
      gap: label ? config.gap : undefined,
      ...style,
    }

    const labelEl = label ? (
      <span
        style={{
          fontSize: config.fontSize,
          lineHeight: config.lineHeight,
          color: "var(--text-subdued-1)",
          fontFamily: "var(--font-sans)",
          fontWeight: "var(--font-weight-regular)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    ) : null

    return (
      <div
        ref={ref}
        role="status"
        className={cn(className)}
        style={containerStyle}
        {...props}
      >
        {isReversed && labelEl}
        <svg
          width={config.width}
          height={config.height}
          viewBox={config.viewBox}
          fill="none"
          className="animate-spin"
          style={{ flexShrink: 0 }}
        >
          {/* Background circle */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            stroke={background}
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
          />
          {/* Foreground arc (~270 degrees) */}
          <path
            d={arcPath}
            stroke={color}
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
          />
        </svg>
        {!isReversed && labelEl}
        <span className="sr-only">Loading...</span>
      </div>
    )
  },
)
Spinner.displayName = "Spinner"

export { Spinner, SPINNER_SIZE_CONFIG }
