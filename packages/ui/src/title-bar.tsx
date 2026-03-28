import * as React from "react"
import { ArrowLeft } from "lucide-react"
import { cn } from "@repo/utils"

export interface TitleBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Page title */
  title: string
  /** Optional subtitle / breadcrumb text below the title */
  subtitle?: string
  /** Callback for the back arrow — arrow is hidden when omitted */
  onBack?: () => void
  /** Right-side actions (buttons, menus, etc.) */
  actions?: React.ReactNode
  /** Sticky positioning at the top */
  sticky?: boolean
}

const TitleBar = React.forwardRef<HTMLDivElement, TitleBarProps>(
  (
    {
      className,
      title,
      subtitle,
      onBack,
      actions,
      sticky = false,
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          sticky && "sticky top-0 z-10",
          className,
        )}
        style={{
          padding: "var(--space-12) var(--space-24)",
          backgroundColor: "var(--surface-0)",
          borderBottom: "1px solid var(--grey-30)",
          gap: "var(--space-12)",
          minHeight: 48,
          ...style,
        }}
        {...props}
      >
        {/* Back button */}
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Go back"
            className="flex shrink-0 items-center justify-center transition-colors"
            style={{
              width: 36,
              height: 36,
              borderRadius: "var(--radius-8)",
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
              color: "var(--text-subdued-1)",
              padding: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--grey-20)"
              e.currentTarget.style.color = "var(--text-default)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
              e.currentTarget.style.color = "var(--text-subdued-1)"
            }}
          >
            <ArrowLeft style={{ width: 20, height: 20 }} />
          </button>
        )}

        {/* Title area */}
        <div className="flex min-w-0 flex-1 flex-col">
          <h1
            style={{
              margin: 0,
              fontSize: "var(--font-size-l)",
              lineHeight: "var(--line-height-l)",
              fontWeight: "var(--font-weight-heading)",
              color: "var(--text-default)",
              fontFamily: "var(--font-sans)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <span
              style={{
                fontSize: "var(--font-size-s)",
                lineHeight: "var(--line-height-s)",
                color: "var(--text-subdued-1)",
                fontFamily: "var(--font-sans)",
                marginTop: "var(--space-2)",
              }}
            >
              {subtitle}
            </span>
          )}
        </div>

        {/* Right-side actions */}
        {actions && (
          <div
            className="flex shrink-0 items-center"
            style={{ gap: "var(--space-8)" }}
          >
            {actions}
          </div>
        )}
      </div>
    )
  },
)
TitleBar.displayName = "TitleBar"

export { TitleBar }
