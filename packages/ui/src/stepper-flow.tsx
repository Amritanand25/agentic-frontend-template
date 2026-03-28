import * as React from "react"
import { Check, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@repo/utils"

// ─── Types ───────────────────────────────────────────────
type StepState =
  | "active"
  | "completed"
  | "current"
  | "error"
  | "upcoming"
  | "inactive"
  | "disabled"
  | "loading"

interface StepConfig {
  step: number
  title: string | React.ReactNode
  description?: React.ReactNode
  stepState?: StepState
  completed?: boolean
  disabled?: boolean
  loading?: boolean
  stepIcon?: React.ReactNode
  stepText?: string
  dividerColor?: string
  indicatorSize?: number | string
}

interface StepperFlowProps {
  steps: StepConfig[]
  orientation?: "horizontal" | "vertical"
  defaultValue?: number
  value?: number
  onValueChange?: (value: number) => void
  borderedIcon?: boolean
  dottedSeparator?: boolean
  indicatorSize?: number | string
  className?: string
  stepClassName?: string
}

// ─── Context ─────────────────────────────────────────────
interface StepperContextValue {
  activeStep: number
  orientation: "horizontal" | "vertical"
  borderedIcon: boolean
  dottedSeparator: boolean
  globalIndicatorSize: number | string
  onStepClick: (step: number) => void
}

const StepperContext = React.createContext<StepperContextValue>({
  activeStep: 1,
  orientation: "horizontal",
  borderedIcon: true,
  dottedSeparator: false,
  globalIndicatorSize: 32,
  onStepClick: () => {},
})

function useStepperContext() {
  return React.useContext(StepperContext)
}

// ─── Resolve effective state ─────────────────────────────
function resolveStepState(config: StepConfig): StepState {
  if (config.stepState) return config.stepState
  if (config.loading) return "loading"
  if (config.disabled) return "disabled"
  if (config.completed) return "completed"
  return "upcoming"
}

// ─── Step Indicator ──────────────────────────────────────
function StepIndicator({
  config,
  effectiveState,
}: {
  config: StepConfig
  effectiveState: StepState
}) {
  const { borderedIcon, globalIndicatorSize } = useStepperContext()
  const size = config.indicatorSize ?? globalIndicatorSize
  const numSize = typeof size === "number" ? size : parseInt(size as string, 10) || 32

  const getIndicatorStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      width: numSize,
      height: numSize,
      borderRadius: "var(--radius-full)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      fontSize: "var(--font-size-s)",
      fontWeight: "var(--font-weight-prominent)",
      transition: "all 0.2s ease",
    }

    switch (effectiveState) {
      case "completed":
        return {
          ...base,
          backgroundColor: "var(--success-20)",
          border: borderedIcon ? "1px solid var(--success-50)" : "none",
          color: "var(--success-50)",
        }
      case "current":
        return {
          ...base,
          backgroundColor: "var(--success-50)",
          border: "none",
          color: "var(--surface-0)",
        }
      case "error":
        return {
          ...base,
          backgroundColor: "var(--error-20)",
          border: borderedIcon ? "1px solid var(--error-50)" : "none",
          color: "var(--error-50)",
        }
      case "disabled":
        return {
          ...base,
          backgroundColor: "var(--surface-0)",
          border: borderedIcon ? "1px solid var(--grey-60)" : "none",
          color: "var(--text-subdued-2)",
          opacity: 0.5,
        }
      case "loading":
        return {
          ...base,
          backgroundColor: "var(--surface-0)",
          border: borderedIcon ? "1px solid var(--grey-60)" : "none",
          color: "var(--text-subdued-1)",
        }
      // active, upcoming, inactive
      default:
        return {
          ...base,
          backgroundColor: "var(--surface-0)",
          border: borderedIcon ? "1px solid var(--grey-60)" : "none",
          color: "var(--text-subdued-1)",
        }
    }
  }

  const renderContent = () => {
    if (config.stepIcon) return config.stepIcon

    switch (effectiveState) {
      case "completed":
        return <Check style={{ width: numSize * 0.5, height: numSize * 0.5 }} />
      case "current":
        return (
          <span style={{ color: "var(--surface-0)", fontSize: "var(--font-size-s)", fontWeight: "var(--font-weight-prominent)" }}>
            {config.stepText ?? config.step}
          </span>
        )
      case "error":
        return <AlertCircle style={{ width: numSize * 0.5, height: numSize * 0.5 }} />
      case "loading":
        return (
          <Loader2
            className="animate-spin"
            style={{ width: numSize * 0.5, height: numSize * 0.5 }}
          />
        )
      default:
        return (
          <span style={{ fontSize: "var(--font-size-s)", fontWeight: "var(--font-weight-prominent)" }}>
            {config.stepText ?? config.step}
          </span>
        )
    }
  }

  return <div style={getIndicatorStyles()}>{renderContent()}</div>
}

// ─── Separator ───────────────────────────────────────────
function StepSeparator({
  dividerColor,
  isLast,
}: {
  dividerColor?: string
  isLast: boolean
}) {
  const { orientation, dottedSeparator, globalIndicatorSize } = useStepperContext()

  if (isLast) return null

  const color = dividerColor ?? "var(--grey-40)"
  const numSize = typeof globalIndicatorSize === "number" ? globalIndicatorSize : parseInt(globalIndicatorSize as string, 10) || 32

  if (orientation === "vertical") {
    return (
      <div
        style={{
          width: 1,
          flexGrow: 1,
          minHeight: 24,
          borderLeft: `${dottedSeparator ? "2px dotted" : "1px solid"} ${color}`,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
    )
  }

  return (
    <div
      style={{
        height: 1,
        flexGrow: 1,
        minWidth: 24,
        marginTop: numSize / 2,
        borderTop: `${dottedSeparator ? "2px dotted" : "1px solid"} ${color}`,
      }}
    />
  )
}

// ─── Single Step ─────────────────────────────────────────
function StepItem({
  config,
  isFirst,
  isLast,
  prevDividerColor,
}: {
  config: StepConfig
  isFirst: boolean
  isLast: boolean
  prevDividerColor?: string
}) {
  const { orientation, onStepClick, dottedSeparator: isDotted } = useStepperContext()
  const effectiveState = resolveStepState(config)
  const isDisabled = effectiveState === "disabled"
  const lineStyle = isDotted ? "2px dotted" : "1px solid"

  if (orientation === "vertical") {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: "var(--space-12)" }}>
          {/* Indicator column */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <button
              type="button"
              onClick={() => !isDisabled && onStepClick(config.step)}
              disabled={isDisabled}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: isDisabled ? "not-allowed" : "pointer",
                display: "flex",
              }}
              aria-label={`Step ${config.step}`}
            >
              <StepIndicator config={config} effectiveState={effectiveState} />
            </button>
          </div>

          {/* Text content */}
          <div style={{ display: "flex", flexDirection: "column", paddingTop: "var(--space-4)" }}>
            <div
              style={{
                fontSize: "var(--font-size-m)",
                fontWeight: "var(--font-weight-prominent)",
                color: isDisabled ? "var(--text-subdued-2)" : "var(--text-default)",
                lineHeight: "var(--line-height-m)",
              }}
            >
              {config.title}
            </div>
            {config.description && (
              <div
                style={{
                  fontSize: "var(--font-size-s)",
                  color: "var(--text-subdued-1)",
                  lineHeight: "var(--line-height-s)",
                  marginTop: "var(--space-2)",
                }}
              >
                {config.description}
              </div>
            )}
          </div>
        </div>

        {/* Vertical separator */}
        {!isLast && (
          <div style={{ display: "flex", paddingLeft: 15, minHeight: 24 }}>
            <StepSeparator dividerColor={config.dividerColor} isLast={isLast} />
          </div>
        )}
      </div>
    )
  }

  // Horizontal layout — indicator + separator in one row, label below
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        minWidth: 0,
      }}
    >
      {/* Indicator row: circle + separator line touching the circle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        {!isFirst ? (
          <div
            style={{
              flex: 1,
              height: 0,
              borderTop: `${lineStyle} ${prevDividerColor ?? "var(--grey-40)"}`,
            }}
          />
        ) : (
          <div style={{ flex: 1 }} />
        )}
        <button
          type="button"
          onClick={() => !isDisabled && onStepClick(config.step)}
          disabled={isDisabled}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: isDisabled ? "not-allowed" : "pointer",
            display: "flex",
            flexShrink: 0,
          }}
          aria-label={`Step ${config.step}`}
        >
          <StepIndicator config={config} effectiveState={effectiveState} />
        </button>
        {!isLast ? (
          <div
            style={{
              flex: 1,
              height: 0,
              borderTop: `${lineStyle} ${config.dividerColor ?? "var(--grey-40)"}`,
            }}
          />
        ) : (
          <div style={{ flex: 1 }} />
        )}
      </div>

      {/* Label below */}
      <div style={{ textAlign: "center", marginTop: "var(--space-8)" }}>
        <div
          style={{
            fontSize: "var(--font-size-s)",
            fontWeight: "var(--font-weight-prominent)",
            color: isDisabled ? "var(--text-subdued-2)" : "var(--text-default)",
            lineHeight: "var(--line-height-s)",
          }}
        >
          {config.title}
        </div>
        {config.description && (
          <div
            style={{
              fontSize: "var(--font-size-s)",
              color: "var(--text-subdued-1)",
              lineHeight: "var(--line-height-s)",
              marginTop: "var(--space-2)",
            }}
          >
            {config.description}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────
const StepperFlow = React.forwardRef<HTMLDivElement, StepperFlowProps>(
  (
    {
      steps,
      orientation = "horizontal",
      defaultValue = 1,
      value,
      onValueChange,
      borderedIcon = true,
      dottedSeparator = false,
      indicatorSize = 32,
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

    const contextValue = React.useMemo<StepperContextValue>(
      () => ({
        activeStep,
        orientation,
        borderedIcon,
        dottedSeparator,
        globalIndicatorSize: indicatorSize,
        onStepClick: handleStepClick,
      }),
      [activeStep, orientation, borderedIcon, dottedSeparator, indicatorSize, handleStepClick]
    )

    return (
      <StepperContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(stepClassName, className)}
          style={{
            display: "flex",
            flexDirection: orientation === "vertical" ? "column" : "row",
            alignItems: orientation === "vertical" ? "stretch" : "flex-start",
            gap: orientation === "vertical" ? "var(--space-4)" : 0,
            width: "100%",
          }}
        >
          {steps.map((step, index) => (
            <StepItem
              key={step.step}
              config={step}
              isFirst={index === 0}
              isLast={index === steps.length - 1}
              prevDividerColor={index > 0 ? steps[index - 1].dividerColor : undefined}
            />
          ))}
        </div>
      </StepperContext.Provider>
    )
  }
)
StepperFlow.displayName = "StepperFlow"

export { StepperFlow }
export type { StepConfig, StepperFlowProps, StepState }
