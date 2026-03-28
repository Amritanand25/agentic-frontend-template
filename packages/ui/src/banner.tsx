import * as React from "react"
import { AlertTriangle, X } from "lucide-react"
import { cn } from "@repo/utils"
import { Button } from "./button.tsx"
import { Spinner } from "./spinner.tsx"

// ─── Variant Configuration ───────────────────────────────
const BANNER_VARIANTS = {
  primary: {
    border: "var(--primary-30)",
    background: "var(--primary-10)",
    iconColor: "var(--primary-50)",
  },
  success: {
    border: "var(--success-50)",
    background: "var(--success-20)",
    iconColor: "var(--success-50)",
  },
  error: {
    border: "var(--error-50)",
    background: "var(--error-20)",
    iconColor: "var(--error-50)",
  },
  warning: {
    border: "var(--warning-50)",
    background: "var(--warning-20)",
    iconColor: "var(--warning-50)",
  },
  neutral: {
    border: "var(--grey-40)",
    background: "var(--grey-10)",
    iconColor: "var(--primary-50)",
  },
} as const

type BannerVariant = keyof typeof BANNER_VARIANTS

// ─── Banner Action ───────────────────────────────────────
export interface BannerAction {
  label: string
  onClick: () => void
  variant?: React.ComponentProps<typeof Button>["variant"]
}

// ─── Banner Props ────────────────────────────────────────
export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: BannerVariant
  /** Title text (hidden in single-line mode) */
  title?: string
  /** Description / message body */
  description?: string
  /** Custom icon element; defaults to AlertTriangle */
  icon?: React.ReactNode
  /** Action buttons */
  actions?: BannerAction[]
  /** Show as single-line layout (no title, everything in one row) */
  isSingleLine?: boolean
  /** Full-width layout (no border-radius, screen width) */
  isFullWidth?: boolean
  /** Replace icon with a loading spinner */
  isLoading?: boolean
  /** Callback when the close button is clicked */
  onClose?: () => void
  /** Controlled visibility */
  showBanner?: boolean
}

// ─── Banner Component ────────────────────────────────────
const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      className,
      variant = "primary",
      title,
      description,
      icon,
      actions,
      isSingleLine = false,
      isFullWidth = false,
      isLoading = false,
      onClose,
      showBanner,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalVisible, setInternalVisible] = React.useState(true)

    // Determine visibility: controlled vs uncontrolled
    const isControlled = showBanner !== undefined
    const isVisible = isControlled ? showBanner : internalVisible

    if (!isVisible) return null

    const variantConfig = BANNER_VARIANTS[variant]

    const handleClose = () => {
      if (!isControlled) {
        setInternalVisible(false)
      }
      onClose?.()
    }

    // Icon element: spinner when loading, custom icon, or default AlertTriangle
    const iconElement = isLoading ? (
      <Spinner size="s" color={variantConfig.iconColor} />
    ) : icon !== undefined ? (
      icon
    ) : (
      <AlertTriangle
        style={{
          width: 20,
          height: 20,
          color: variantConfig.iconColor,
          flexShrink: 0,
        }}
      />
    )

    const actionButtons =
      actions && actions.length > 0 ? (
        <div
          className="flex flex-wrap"
          style={{ gap: "var(--space-8)" }}
        >
          {actions.map((action, i) => (
            <Button
              key={i}
              variant={action.variant ?? "outline"}
              size="sm"
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </div>
      ) : null

    const closeButton = onClose ? (
      <button
        type="button"
        onClick={handleClose}
        aria-label="Dismiss banner"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 24,
          height: 24,
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
          padding: 0,
          color: "var(--text-subdued-1)",
          flexShrink: 0,
          borderRadius: "var(--radius-4)",
        }}
      >
        <X style={{ width: 16, height: 16 }} />
      </button>
    ) : null

    const containerStyle: React.CSSProperties = {
      backgroundColor: variantConfig.background,
      border: `1px solid ${variantConfig.border}`,
      borderRadius: isFullWidth ? 0 : "var(--radius-12)",
      padding: isSingleLine || isFullWidth
        ? "var(--space-12) var(--space-16)"
        : "var(--space-16)",
      fontFamily: "var(--font-sans)",
      ...(isFullWidth ? { width: "100%" } : {}),
      ...style,
    }

    // ─── Single-line / Full-width layout ─────────────────
    if (isSingleLine || isFullWidth) {
      return (
        <div
          ref={ref}
          role="alert"
          className={cn(className)}
          style={containerStyle}
          {...props}
        >
          <div
            className="flex items-center"
            style={{ gap: "var(--space-12)" }}
          >
            {/* Icon */}
            <div style={{ flexShrink: 0 }}>{iconElement}</div>

            {/* Description */}
            <p
              style={{
                flex: 1,
                fontSize: "var(--font-size-m)",
                lineHeight: "var(--line-height-m)",
                color: "var(--text-default)",
                fontWeight: "var(--font-weight-regular)",
                margin: 0,
              }}
            >
              {description}
            </p>

            {/* Actions */}
            {actionButtons}

            {/* Close */}
            {closeButton}
          </div>
        </div>
      )
    }

    // ─── Multi-line layout (default) ─────────────────────
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(className)}
        style={containerStyle}
        {...props}
      >
        <div
          className="flex"
          style={{ gap: "var(--space-12)" }}
        >
          {/* Icon */}
          <div style={{ flexShrink: 0, paddingTop: "var(--space-2)" }}>
            {iconElement}
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {title && (
              <p
                style={{
                  fontSize: "var(--font-size-m)",
                  lineHeight: "var(--line-height-m)",
                  fontWeight: "var(--font-weight-heading)",
                  color: "var(--text-default)",
                  margin: 0,
                }}
              >
                {title}
              </p>
            )}
            {description && (
              <p
                style={{
                  fontSize: "var(--font-size-m)",
                  lineHeight: "var(--line-height-m)",
                  fontWeight: "var(--font-weight-regular)",
                  color: "var(--text-subdued-1)",
                  margin: 0,
                  marginTop: title ? "var(--space-4)" : 0,
                }}
              >
                {description}
              </p>
            )}
            {children}
            {actionButtons && (
              <div style={{ marginTop: "var(--space-12)" }}>
                {actionButtons}
              </div>
            )}
          </div>

          {/* Close */}
          {closeButton}
        </div>
      </div>
    )
  },
)
Banner.displayName = "Banner"

export { Banner, BANNER_VARIANTS }
