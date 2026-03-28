import * as React from "react"
import { toast } from "sonner"
import { Info, CheckCircle, XCircle, X, Loader2 } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────
export interface NotificationOptions {
  title: string
  description?: string
  variant?: "info" | "success" | "error" | "loading"
  duration?: number | null
  showProgressBar?: boolean
  showActions?: boolean
  primaryAction?: { label: string; onClick: () => void }
  secondaryAction?: { label: string; onClick: () => void }
  customIcon?: React.ReactNode
  onClose?: () => void
  position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"
}

// ─── Variant config ──────────────────────────────────────────────────
const VARIANT_CONFIG = {
  info: {
    bg: "var(--surface-0)",
    border: "var(--primary-50)",
    iconColor: "var(--primary-50)",
    icon: <Info size={20} />,
  },
  success: {
    bg: "var(--surface-0)",
    border: "var(--success-50)",
    iconColor: "var(--success-50)",
    icon: <CheckCircle size={20} />,
  },
  error: {
    bg: "var(--surface-0)",
    border: "var(--error-50)",
    iconColor: "var(--error-50)",
    icon: <XCircle size={20} />,
  },
  loading: {
    bg: "var(--surface-0)",
    border: "var(--primary-50)",
    iconColor: "var(--primary-50)",
    icon: <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} />,
  },
} as const

// ─── NotificationToast ──────────────────────────────────────────────
interface NotificationToastProps {
  toastId: string | number
  title: string
  description?: string
  variant: "info" | "success" | "error" | "loading"
  showProgressBar?: boolean
  duration?: number | null
  showActions?: boolean
  primaryAction?: { label: string; onClick: () => void }
  secondaryAction?: { label: string; onClick: () => void }
  customIcon?: React.ReactNode
  onClose?: () => void
}

const NotificationToast = React.forwardRef<HTMLDivElement, NotificationToastProps>(
  (
    {
      toastId,
      title,
      description,
      variant = "info",
      showProgressBar = false,
      duration = 5000,
      showActions = false,
      primaryAction,
      secondaryAction,
      customIcon,
      onClose,
    },
    ref,
  ) => {
    const config = VARIANT_CONFIG[variant]
    const icon = customIcon ?? config.icon

    const handleClose = React.useCallback(() => {
      onClose?.()
      toast.dismiss(toastId)
    }, [toastId, onClose])

    // Progress bar animation
    const progressDuration = typeof duration === "number" ? duration : 5000

    return (
      <div
        ref={ref}
        data-notification-nudge
        style={{
          minWidth: 328,
          maxWidth: 380,
          padding: "var(--space-12)",
          borderRadius: "var(--radius-12)",
          backgroundColor: config.bg,
          border: "1px solid var(--grey-40)",
          borderLeft: `3px solid ${config.border}`,
          color: "var(--text-default)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="flex" style={{ gap: "var(--space-12)" }}>
          {/* Icon */}
          <div className="shrink-0 flex items-start" style={{ paddingTop: 2, color: config.iconColor }}>
            {icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p
              style={{
                fontSize: "var(--font-size-m)",
                fontWeight: "var(--font-weight-prominent)",
                lineHeight: "var(--line-height-m)",
                color: "var(--text-default)",
              }}
            >
              {title}
            </p>
            {description && (
              <p
                style={{
                  fontSize: "var(--font-size-s)",
                  lineHeight: "var(--line-height-s)",
                  color: "var(--text-subdued-1)",
                  marginTop: "var(--space-4)",
                }}
              >
                {description}
              </p>
            )}

            {/* Action buttons */}
            {showActions && (primaryAction || secondaryAction) && (
              <div className="flex items-center" style={{ gap: "var(--space-8)", marginTop: "var(--space-12)" }}>
                {primaryAction && (
                  <button
                    type="button"
                    onClick={() => {
                      primaryAction.onClick()
                      toast.dismiss(toastId)
                    }}
                    className="cursor-pointer"
                    style={{
                      fontSize: "var(--font-size-s)",
                      fontWeight: "var(--font-weight-prominent)",
                      color: "var(--primary-inverse)",
                      backgroundColor: config.border,
                      border: "none",
                      borderRadius: "var(--radius-8)",
                      padding: "var(--space-4) var(--space-12)",
                      lineHeight: "var(--line-height-m)",
                    }}
                  >
                    {primaryAction.label}
                  </button>
                )}
                {secondaryAction && (
                  <button
                    type="button"
                    onClick={() => {
                      secondaryAction.onClick()
                      toast.dismiss(toastId)
                    }}
                    className="cursor-pointer"
                    style={{
                      fontSize: "var(--font-size-s)",
                      fontWeight: "var(--font-weight-prominent)",
                      color: "var(--text-subdued-1)",
                      backgroundColor: "transparent",
                      border: "none",
                      borderRadius: "var(--radius-8)",
                      padding: "var(--space-4) var(--space-12)",
                      lineHeight: "var(--line-height-m)",
                    }}
                  >
                    {secondaryAction.label}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={handleClose}
            className="shrink-0 flex items-center justify-center cursor-pointer"
            style={{
              width: 24,
              height: 24,
              borderRadius: "var(--radius-full)",
              border: "none",
              backgroundColor: "transparent",
              color: "var(--text-subdued-2)",
            }}
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </div>

        {/* Progress bar */}
        {showProgressBar && typeof duration === "number" && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 4,
              backgroundColor: "var(--grey-20)",
            }}
          >
            <div
              style={{
                height: "100%",
                backgroundColor: config.border,
                animation: `notification-progress ${progressDuration}ms linear forwards`,
              }}
            />
            <style>
              {`@keyframes notification-progress {
                from { width: 100%; }
                to { width: 0%; }
              }`}
            </style>
          </div>
        )}
      </div>
    )
  },
)
NotificationToast.displayName = "NotificationToast"

// ─── Spinner keyframes (injected once) ──────────────────────────────
const spinStyleId = "notification-nudge-spin"
if (typeof document !== "undefined" && !document.getElementById(spinStyleId)) {
  const style = document.createElement("style")
  style.id = spinStyleId
  style.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`
  document.head.appendChild(style)
}

// ─── notify() ────────────────────────────────────────────────────────
export function notify(options: NotificationOptions): string | number {
  const {
    title,
    description,
    variant = "info",
    duration = 5000,
    showProgressBar = false,
    showActions = false,
    primaryAction,
    secondaryAction,
    customIcon,
    onClose,
    position,
  } = options

  const id = toast.custom(
    (t) => (
      <NotificationToast
        toastId={t}
        title={title}
        description={description}
        variant={variant}
        showProgressBar={showProgressBar}
        duration={duration}
        showActions={showActions}
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        customIcon={customIcon}
        onClose={onClose}
      />
    ),
    {
      duration: duration === null ? Infinity : duration,
      position,
      unstyled: true,
      className: "nudge-toast",
    },
  )

  return id
}

// ─── notifyPromise() ─────────────────────────────────────────────────
export function notifyPromise<T>(
  promise: Promise<T>,
  messages: {
    loading: string
    success: string | ((data: T) => string)
    error: string | ((err: unknown) => string)
  },
  options?: Partial<NotificationOptions>,
) {
  const loadingId = notify({
    title: messages.loading,
    variant: "loading",
    duration: null,
    ...options,
  })

  promise
    .then((data) => {
      toast.dismiss(loadingId)
      const successMsg = typeof messages.success === "function" ? messages.success(data) : messages.success
      notify({
        title: successMsg,
        variant: "success",
        duration: options?.duration ?? 5000,
        showProgressBar: options?.showProgressBar,
        ...options,
      })
    })
    .catch((err) => {
      toast.dismiss(loadingId)
      const errorMsg = typeof messages.error === "function" ? messages.error(err) : messages.error
      notify({
        title: errorMsg,
        variant: "error",
        duration: options?.duration ?? 5000,
        showProgressBar: options?.showProgressBar,
        ...options,
      })
    })

  return loadingId
}

export { NotificationToast }
