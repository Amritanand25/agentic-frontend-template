import * as React from "react"
import {
  AlertTriangle,
  WifiOff,
  ServerCrash,
  SearchX,
  Clock,
  Lock,
  Loader2,
} from "lucide-react"
import { cn } from "@repo/utils"
import { Button } from "./button.tsx"

const variantDefaults = {
  generic: {
    icon: AlertTriangle,
    title: "Something went wrong",
    description: "We couldn't load this content. Please try again.",
  },
  network: {
    icon: WifiOff,
    title: "No internet connection",
    description: "Check your connection and try again.",
  },
  server: {
    icon: ServerCrash,
    title: "Server error",
    description: "Our servers are having issues. Please try again later.",
  },
  "not-found": {
    icon: SearchX,
    title: "Page not found",
    description: "The page you're looking for doesn't exist.",
  },
  timeout: {
    icon: Clock,
    title: "Request timed out",
    description: "The server took too long to respond.",
  },
  permission: {
    icon: Lock,
    title: "Access denied",
    description: "You don't have permission to view this.",
  },
} as const

const sizeConfig = {
  sm: {
    iconSize: 40,
    titleSize: "14px",
    descSize: "12px",
    titleLineHeight: "20px",
    descLineHeight: "16px",
    maxWidth: 280,
    gap: "var(--space-12)",
    buttonGap: "var(--space-12)",
  },
  md: {
    iconSize: 56,
    titleSize: "16px",
    descSize: "14px",
    titleLineHeight: "24px",
    descLineHeight: "20px",
    maxWidth: 360,
    gap: "var(--space-16)",
    buttonGap: "var(--space-16)",
  },
  lg: {
    iconSize: 72,
    titleSize: "20px",
    descSize: "16px",
    titleLineHeight: "28px",
    descLineHeight: "24px",
    maxWidth: 440,
    gap: "var(--space-24)",
    buttonGap: "var(--space-20)",
  },
} as const

const displayModeClasses = {
  inline: "",
  "full-page":
    "fixed inset-0 z-50 flex items-center justify-center",
  component: "",
} as const

interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "generic" | "network" | "server" | "not-found" | "timeout" | "permission"
  size?: "sm" | "md" | "lg"
  title?: string
  description?: string
  onRetry?: () => Promise<void> | void
  onGoBack?: () => void
  showGoBack?: boolean
  maxRetries?: number
  icon?: React.ReactNode
  displayMode?: "inline" | "full-page" | "component"
}

const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  (
    {
      variant = "generic",
      size = "md",
      title,
      description,
      onRetry,
      onGoBack,
      showGoBack = false,
      maxRetries = 3,
      icon,
      displayMode = "inline",
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [retryCount, setRetryCount] = React.useState(0)
    const [isRetrying, setIsRetrying] = React.useState(false)

    const defaults = variantDefaults[variant]
    const sizes = sizeConfig[size]
    const IconComponent = defaults.icon

    const resolvedTitle = title ?? defaults.title
    const resolvedDescription = description ?? defaults.description

    const exhaustedRetries = retryCount >= maxRetries

    const handleRetry = React.useCallback(async () => {
      if (!onRetry || isRetrying) return
      setIsRetrying(true)
      try {
        await onRetry()
      } catch {
        setRetryCount((c) => c + 1)
      } finally {
        setIsRetrying(false)
      }
    }, [onRetry, isRetrying])

    const wrapperStyle: React.CSSProperties =
      displayMode === "full-page"
        ? { backgroundColor: "var(--surface-10)", ...style }
        : style ?? {}

    return (
      <div
        ref={ref}
        className={cn(displayModeClasses[displayMode], className)}
        style={wrapperStyle}
        {...props}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: sizes.maxWidth,
            margin: "0 auto",
            padding: "var(--space-32) var(--space-16)",
            gap: sizes.gap,
          }}
        >
          {/* Icon */}
          <div
            style={{
              color: "var(--text-subdued-2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon ? (
              <div style={{ width: sizes.iconSize, height: sizes.iconSize }}>{icon}</div>
            ) : (
              <IconComponent
                style={{ width: sizes.iconSize, height: sizes.iconSize }}
                strokeWidth={1}
              />
            )}
          </div>

          {/* Text */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
            <h3
              style={{
                fontSize: sizes.titleSize,
                fontWeight: "var(--font-weight-heading)",
                lineHeight: sizes.titleLineHeight,
                color: "var(--text-default)",
              }}
            >
              {resolvedTitle}
            </h3>
            <p
              style={{
                fontSize: sizes.descSize,
                lineHeight: sizes.descLineHeight,
                color: "var(--text-subdued-1)",
                fontWeight: "var(--font-weight-regular)",
              }}
            >
              {resolvedDescription}
            </p>
          </div>

          {/* Buttons */}
          {(onRetry || showGoBack) && (
            <div
              className="flex items-center flex-wrap justify-center"
              style={{ gap: sizes.buttonGap, marginTop: "var(--space-8)" }}
            >
              {onRetry && (
                <Button
                  size="sm"
                  onClick={handleRetry}
                  disabled={isRetrying}
                >
                  {isRetrying ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Retrying...
                    </>
                  ) : exhaustedRetries ? (
                    "Contact support"
                  ) : (
                    "Try again"
                  )}
                </Button>
              )}
              {showGoBack && onGoBack && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onGoBack}
                >
                  Go back
                </Button>
              )}
            </div>
          )}

          {/* Retry count indicator */}
          {onRetry && retryCount > 0 && !exhaustedRetries && (
            <p
              style={{
                fontSize: "var(--font-size-s)",
                color: "var(--text-subdued-2)",
              }}
            >
              Attempt {retryCount} of {maxRetries}
            </p>
          )}
        </div>
      </div>
    )
  }
)
ErrorState.displayName = "ErrorState"

export { ErrorState, type ErrorStateProps }
