import * as React from "react"
import { cn } from "@repo/utils"

// ─── Props ────────────────────────────────────────────────
interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  color?: "default" | "success" | "error" | "warning"
  showLabel?: boolean
  showValue?: boolean
  label?: string
  size?: "xs" | "sm" | "md" | "lg"
  variant?: "line" | "circle"
  circleRadius?: number
  strokeWidth?: number
}

// ─── Config Maps ──────────────────────────────────────────
const COLOR_MAP = {
  default: { fill: "var(--primary-50)", text: "var(--primary-60)" },
  success: { fill: "var(--success-50)", text: "var(--success-80)" },
  error: { fill: "var(--error-50)", text: "var(--error-80)" },
  warning: { fill: "var(--warning-50)", text: "var(--warning-80)" },
} as const

const LINE_HEIGHT_MAP = {
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
} as const

const DEFAULT_RADIUS_MAP = {
  xs: 8,
  sm: 12,
  md: 24,
  lg: 36,
} as const

const DEFAULT_STROKE_MAP = {
  xs: 2,
  sm: 2,
  md: 4,
  lg: 8,
} as const

// ─── Line Variant ─────────────────────────────────────────
const LineProgress = React.memo(function LineProgress({
  percentage,
  color,
  size,
  showLabel,
  showValue,
  label,
}: {
  percentage: number
  color: "default" | "success" | "error" | "warning"
  size: "xs" | "sm" | "md" | "lg"
  showLabel: boolean
  showValue: boolean
  label: string
}) {
  const colors = COLOR_MAP[color]
  const height = LINE_HEIGHT_MAP[size]

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", width: "100%" }}>
      {(showLabel || showValue) && (label || showValue) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {showLabel && label && (
            <span
              style={{
                fontSize: "var(--font-size-s)",
                fontWeight: "var(--font-weight-prominent)",
                color: "var(--text-default)",
                lineHeight: "var(--line-height-s)",
              }}
            >
              {label}
            </span>
          )}
          {showValue && (
            <span
              style={{
                fontSize: "var(--font-size-s)",
                fontWeight: "var(--font-weight-prominent)",
                color: colors.text,
                lineHeight: "var(--line-height-s)",
                marginLeft: "auto",
              }}
            >
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      {/* Track */}
      <div
        style={{
          width: "100%",
          height,
          backgroundColor: "var(--grey-40)",
          borderRadius: 9999,
          overflow: "hidden",
        }}
      >
        {/* Fill */}
        <div
          className="transition-all duration-300 ease-in-out"
          style={{
            width: `${percentage}%`,
            height: "100%",
            backgroundColor: colors.fill,
            borderRadius: 9999,
          }}
        />
      </div>
    </div>
  )
})

// ─── Circle Variant ───────────────────────────────────────
const CircleProgress = React.memo(function CircleProgress({
  percentage,
  color,
  size,
  showValue,
  radius,
  stroke,
}: {
  percentage: number
  color: "default" | "success" | "error" | "warning"
  size: "xs" | "sm" | "md" | "lg"
  showValue: boolean
  radius: number
  stroke: number
}) {
  const colors = COLOR_MAP[color]

  const circumference = React.useMemo(() => 2 * Math.PI * radius, [radius])
  const dashOffset = React.useMemo(
    () => circumference - (percentage / 100) * circumference,
    [circumference, percentage]
  )

  const svgSize = (radius + stroke) * 2

  const fontSizeMap: Record<string, string> = {
    xs: "var(--font-size-xs)",
    sm: "var(--font-size-xs)",
    md: "var(--font-size-s)",
    lg: "var(--font-size-m)",
  }

  const isXs = size === "xs"

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-4)" }}>
      <svg
        width={svgSize}
        height={svgSize}
        style={{ transform: "rotate(-90deg)" }}
        aria-valuenow={Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        role="progressbar"
      >
        {/* Background track */}
        <circle
          cx={radius + stroke}
          cy={radius + stroke}
          r={radius}
          fill="none"
          stroke="var(--grey-40)"
          strokeWidth={stroke}
        />
        {/* Progress arc */}
        <circle
          cx={radius + stroke}
          cy={radius + stroke}
          r={radius}
          fill="none"
          stroke={colors.fill}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
      {showValue && isXs && (
        <span
          style={{
            fontSize: fontSizeMap[size],
            fontWeight: "var(--font-weight-prominent)",
            color: colors.text,
            lineHeight: "var(--line-height-xs)",
          }}
        >
          {Math.round(percentage)}%
        </span>
      )}
      {showValue && !isXs && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: svgSize,
            height: svgSize,
          }}
        >
          <span
            style={{
              fontSize: fontSizeMap[size],
              fontWeight: "var(--font-weight-prominent)",
              color: colors.text,
            }}
          >
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  )
})

// ─── Main Component ───────────────────────────────────────
const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value = 0,
      max = 100,
      color = "default",
      showLabel = true,
      showValue = true,
      label = "",
      size = "md",
      variant = "line",
      circleRadius,
      strokeWidth,
      className,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100))

    const resolvedRadius = circleRadius ?? DEFAULT_RADIUS_MAP[size]
    const resolvedStroke = strokeWidth ?? DEFAULT_STROKE_MAP[size]

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex", className)}
        role="progressbar"
        aria-valuenow={Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || undefined}
        {...props}
      >
        {variant === "line" ? (
          <LineProgress
            percentage={percentage}
            color={color}
            size={size}
            showLabel={showLabel}
            showValue={showValue}
            label={label}
          />
        ) : (
          <CircleProgress
            percentage={percentage}
            color={color}
            size={size}
            showValue={showValue}
            radius={resolvedRadius}
            stroke={resolvedStroke}
          />
        )}
      </div>
    )
  }
)
ProgressBar.displayName = "ProgressBar"

export { ProgressBar, type ProgressBarProps }
