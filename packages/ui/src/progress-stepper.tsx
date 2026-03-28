import * as React from "react"
import { Check, AlertTriangle, XCircle } from "lucide-react"
import { cn } from "@repo/utils"

// ─── Types ───────────────────────────────────────────────
type ProgressStatus = "success" | "warning" | "error" | "default"

interface ProgressConfig {
  percentage: number
  type?: ProgressStatus
  strokeWidth?: number
}

interface ProgressStepConfig {
  step: number
  title: string | React.ReactNode
  description?: React.ReactNode
  status?: ProgressStatus
  progress?: ProgressConfig
  disabled?: boolean
}

interface ProgressStepperProps {
  steps: ProgressStepConfig[]
  orientation?: "horizontal" | "vertical"
  defaultValue?: number
  value?: number
  onValueChange?: (value: number) => void
  size?: "sm" | "md"
  circleStrokeWidth?: number
  className?: string
  stepClassName?: string
}

// ─── Color helpers ───────────────────────────────────────
function getStatusColor(status: ProgressStatus): string {
  switch (status) {
    case "success":
      return "var(--success-50)"
    case "warning":
      return "var(--warning-50)"
    case "error":
      return "var(--error-50)"
    default:
      return "var(--grey-40)"
  }
}

function getStatusBgColor(status: ProgressStatus): string {
  switch (status) {
    case "success":
      return "var(--success-20)"
    case "warning":
      return "var(--warning-20)"
    case "error":
      return "var(--error-20)"
    default:
      return "var(--surface-0)"
  }
}

// ─── Circular Progress SVG ───────────────────────────────
function CircularProgress({
  percentage,
  radius,
  strokeWidth,
  size,
  progressColor,
}: {
  percentage: number
  radius: number
  strokeWidth: number
  size: number
  progressColor: string
}) {
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ transform: "rotate(-90deg)", flexShrink: 0 }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--grey-40)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={progressColor}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.3s ease" }}
      />
    </svg>
  )
}

// ─── Status Icon Indicator ───────────────────────────────
function StatusIndicator({
  status,
  indicatorSize,
}: {
  status: ProgressStatus
  indicatorSize: number
}) {
  const iconSize = indicatorSize * 0.55
  const color = getStatusColor(status)
  const bgColor = getStatusBgColor(status)

  const renderIcon = () => {
    switch (status) {
      case "success":
        return <Check style={{ width: iconSize, height: iconSize, color }} />
      case "warning":
        return <AlertTriangle style={{ width: iconSize, height: iconSize, color }} />
      case "error":
        return <XCircle style={{ width: iconSize, height: iconSize, color }} />
      default:
        return null
    }
  }

  return (
    <div
      style={{
        width: indicatorSize,
        height: indicatorSize,
        borderRadius: "var(--radius-full)",
        backgroundColor: bgColor,
        border: `1px solid ${color}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {renderIcon()}
    </div>
  )
}

// ─── Render indicator (shared) ───────────────────────────
function StepIndicator({
  config,
  indicatorSize,
  circleRadius,
  circleStrokeWidth,
}: {
  config: ProgressStepConfig
  indicatorSize: number
  circleRadius: number
  circleStrokeWidth: number
}) {
  const status = config.status ?? "default"

  if (status !== "default") {
    return <StatusIndicator status={status} indicatorSize={indicatorSize} />
  }

  const progress = config.progress
  const percentage = progress?.percentage ?? 0
  const progressType = progress?.type ?? "default"
  const sw = progress?.strokeWidth ?? circleStrokeWidth

  const progressColorMap: Record<ProgressStatus, string> = {
    success: "var(--success-50)",
    warning: "var(--warning-50)",
    error: "var(--error-50)",
    default: "var(--primary-50)",
  }

  return (
    <CircularProgress
      percentage={percentage}
      radius={circleRadius}
      strokeWidth={sw}
      size={indicatorSize}
      progressColor={progressColorMap[progressType]}
    />
  )
}

// ─── Connector line color for the segment after a step ───
function getConnectorColor(status: ProgressStatus): string {
  switch (status) {
    case "success":
      return "var(--success-50)"
    case "warning":
      return "var(--warning-50)"
    case "error":
      return "var(--error-50)"
    default:
      return "var(--grey-40)"
  }
}

// ─── Main Component ──────────────────────────────────────
const ProgressStepper = React.forwardRef<HTMLDivElement, ProgressStepperProps>(
  (
    {
      steps,
      orientation = "horizontal",
      defaultValue = 1,
      value,
      onValueChange,
      size = "md",
      circleStrokeWidth = 2,
      className,
      stepClassName,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const activeStep = value ?? internalValue

    const handleStepClick = React.useCallback(
      (step: number) => {
        if (value === undefined) {
          setInternalValue(step)
        }
        onValueChange?.(step)
      },
      [value, onValueChange]
    )

    const indicatorSize = size === "sm" ? 20 : 24
    const circleRadius = size === "sm" ? 8 : 10

    // ─── Vertical layout ─────────────────────────────────
    if (orientation === "vertical") {
      return (
        <div
          ref={ref}
          className={cn(stepClassName, className)}
          data-active-step={activeStep}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {steps.map((step, index) => {
            const status = step.status ?? "default"
            const isDisabled = step.disabled ?? false
            const isLast = index === steps.length - 1

            return (
              <div key={step.step} style={{ display: "flex", flexDirection: "row", gap: "var(--space-12)" }}>
                {/* Indicator column with connector */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <button
                    type="button"
                    onClick={() => !isDisabled && handleStepClick(step.step)}
                    disabled={isDisabled}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: isDisabled ? "not-allowed" : "pointer",
                      display: "flex",
                      opacity: isDisabled ? 0.5 : 1,
                    }}
                    aria-label={`Step ${step.step}`}
                  >
                    <StepIndicator
                      config={step}
                      indicatorSize={indicatorSize}
                      circleRadius={circleRadius}
                      circleStrokeWidth={circleStrokeWidth}
                    />
                  </button>
                  {!isLast && (
                    <div
                      style={{
                        width: 1,
                        flexGrow: 1,
                        minHeight: 24,
                        borderLeft: `1px solid ${getConnectorColor(status)}`,
                      }}
                    />
                  )}
                </div>

                {/* Text content */}
                <div style={{ paddingTop: "var(--space-2)", paddingBottom: isLast ? 0 : "var(--space-16)" }}>
                  <div
                    style={{
                      fontSize: "var(--font-size-m)",
                      fontWeight: "var(--font-weight-prominent)",
                      color: isDisabled ? "var(--text-subdued-2)" : "var(--text-default)",
                      lineHeight: "var(--line-height-m)",
                    }}
                  >
                    {step.title}
                  </div>
                  {step.description && (
                    <div
                      style={{
                        fontSize: "var(--font-size-s)",
                        color: "var(--text-subdued-1)",
                        lineHeight: "var(--line-height-s)",
                        marginTop: "var(--space-2)",
                      }}
                    >
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )
    }

    // ─── Horizontal layout ───────────────────────────────
    // Each step is equal width. Connector lines sit at indicator center height.
    return (
      <div
        ref={ref}
        className={cn(stepClassName, className)}
        data-active-step={activeStep}
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        {steps.map((step, index) => {
          const status = step.status ?? "default"
          const isDisabled = step.disabled ?? false
          const isFirst = index === 0
          const isLast = index === steps.length - 1

          // Connector color: left connector uses previous step's color, right uses current step's color
          const prevStatus = index > 0 ? (steps[index - 1].status ?? "default") : "default"
          const leftConnectorColor = getConnectorColor(prevStatus)
          const rightConnectorColor = getConnectorColor(status)

          return (
            <div
              key={step.step}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: 0,
              }}
            >
              {/* Indicator row: left-connector + indicator + right-connector */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  height: indicatorSize,
                }}
              >
                {/* Left connector (half-width, hidden for first step) */}
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: isFirst ? "transparent" : leftConnectorColor,
                  }}
                />

                {/* Indicator button */}
                <button
                  type="button"
                  onClick={() => !isDisabled && handleStepClick(step.step)}
                  disabled={isDisabled}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    display: "flex",
                    opacity: isDisabled ? 0.5 : 1,
                    flexShrink: 0,
                  }}
                  aria-label={`Step ${step.step}`}
                >
                  <StepIndicator
                    config={step}
                    indicatorSize={indicatorSize}
                    circleRadius={circleRadius}
                    circleStrokeWidth={circleStrokeWidth}
                  />
                </button>

                {/* Right connector (half-width, hidden for last step) */}
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: isLast ? "transparent" : rightConnectorColor,
                  }}
                />
              </div>

              {/* Text below indicator */}
              <div
                style={{
                  textAlign: "center",
                  marginTop: "var(--space-8)",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    fontSize: "var(--font-size-s)",
                    fontWeight: "var(--font-weight-prominent)",
                    color: isDisabled ? "var(--text-subdued-2)" : "var(--text-default)",
                    lineHeight: "var(--line-height-s)",
                  }}
                >
                  {step.title}
                </div>
                {step.description && (
                  <div
                    style={{
                      fontSize: "var(--font-size-s)",
                      color: "var(--text-subdued-1)",
                      lineHeight: "var(--line-height-s)",
                      marginTop: "var(--space-2)",
                    }}
                  >
                    {step.description}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
)
ProgressStepper.displayName = "ProgressStepper"

export { ProgressStepper }
export type { ProgressStepConfig, ProgressStepperProps, ProgressStatus, ProgressConfig }
