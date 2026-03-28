import * as React from "react"
import { ChevronRight, Check } from "lucide-react"
import { cn } from "@repo/utils"

type SwipeState = "idle" | "dragging" | "confirming" | "loading" | "confirmed" | "error"

const variantStyles = {
  primary: {
    trackBg: "var(--primary-50)",
    trackText: "var(--primary-inverse)",
    thumbBg: "var(--surface-0)",
    thumbText: "var(--primary-50)",
  },
  secondary: {
    trackBg: "var(--secondary-50)",
    trackText: "var(--secondary-inverse)",
    thumbBg: "var(--surface-0)",
    thumbText: "var(--secondary-50)",
  },
  tertiary: {
    trackBg: "var(--tertiary-50)",
    trackText: "var(--tertiary-inverse)",
    thumbBg: "var(--surface-0)",
    thumbText: "var(--tertiary-50)",
  },
} as const

interface SwipeButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "tertiary"
  width?: string
  height?: string
  onConfirm?: () => Promise<void> | void
  text?: string
  confirmingText?: string
  confirmedText?: string
  loadingText?: string
  disabled?: boolean
  icon?: React.ReactNode
  confirmIcon?: React.ReactNode
  loadingIcon?: React.ReactNode
}

const SwipeButton = React.forwardRef<HTMLDivElement, SwipeButtonProps>(
  (
    {
      variant = "primary",
      width = "296px",
      height = "48px",
      onConfirm,
      text = "Swipe to confirm",
      confirmingText = "Confirming",
      confirmedText = "Confirmed",
      loadingText = "Processing...",
      disabled = false,
      icon,
      confirmIcon,
      loadingIcon,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [state, setState] = React.useState<SwipeState>("idle")
    const [dragPercent, setDragPercent] = React.useState(0)

    const trackRef = React.useRef<HTMLDivElement>(null)
    const isDraggingRef = React.useRef(false)
    const startXRef = React.useRef(0)

    const colors = variantStyles[variant]

    const padding = 4
    const trackHeightNum = parseInt(height, 10) || 48
    const thumbSize = trackHeightNum - padding * 2

    const getTrackWidth = React.useCallback(() => {
      if (!trackRef.current) return 296
      return trackRef.current.getBoundingClientRect().width
    }, [])

    const handlePointerDown = React.useCallback(
      (e: React.PointerEvent) => {
        if (disabled || state !== "idle") return
        isDraggingRef.current = true
        startXRef.current = e.clientX
        setState("dragging")
        setDragPercent(0)
      },
      [disabled, state]
    )

    React.useEffect(() => {
      const handlePointerMove = (e: PointerEvent) => {
        if (!isDraggingRef.current) return
        const trackWidth = getTrackWidth()
        const maxDrag = trackWidth - thumbSize - padding * 2
        const delta = e.clientX - startXRef.current
        const clamped = Math.max(0, Math.min(delta, maxDrag))
        const percent = maxDrag > 0 ? clamped / maxDrag : 0
        setDragPercent(percent)
      }

      const handlePointerUp = async () => {
        if (!isDraggingRef.current) return
        isDraggingRef.current = false

        // Read current dragPercent via a state update to get latest value
        setDragPercent((currentPercent) => {
          if (currentPercent >= 0.9) {
            // Trigger confirmation
            triggerConfirm()
          } else {
            // Reset
            setState("idle")
          }
          return 0
        })
      }

      const triggerConfirm = async () => {
        setState("confirming")

        // Small delay before loading
        await new Promise((r) => setTimeout(r, 100))
        setState("loading")

        const loadingStart = Date.now()

        try {
          await onConfirm?.()
          // Ensure minimum 500ms loading
          const elapsed = Date.now() - loadingStart
          if (elapsed < 500) {
            await new Promise((r) => setTimeout(r, 500 - elapsed))
          }
          setState("confirmed")
        } catch {
          setState("error")
          await new Promise((r) => setTimeout(r, 400))
          setState("idle")
        }
      }

      window.addEventListener("pointermove", handlePointerMove)
      window.addEventListener("pointerup", handlePointerUp)
      return () => {
        window.removeEventListener("pointermove", handlePointerMove)
        window.removeEventListener("pointerup", handlePointerUp)
      }
    }, [getTrackWidth, thumbSize, onConfirm])

    const trackWidth = getTrackWidth()
    const maxDrag = trackWidth - thumbSize - padding * 2
    const thumbOffset = padding + dragPercent * maxDrag

    const isInteractive = state === "idle" || state === "dragging"

    const displayText = (() => {
      switch (state) {
        case "idle":
        case "dragging":
          return text
        case "confirming":
          return confirmingText
        case "loading":
          return loadingText
        case "confirmed":
          return confirmedText
        case "error":
          return text
        default:
          return text
      }
    })()

    const textOpacity = state === "dragging" ? 1 - dragPercent * 0.8 : 1

    const thumbContent = (() => {
      if (state === "loading") {
        return (
          loadingIcon ?? (
            <div
              style={{
                width: 18,
                height: 18,
                border: `2px solid ${colors.thumbText}`,
                borderTopColor: "transparent",
                borderRadius: "50%",
                animation: "swipe-spin 0.6s linear infinite",
              }}
            />
          )
        )
      }
      if (state === "confirmed") {
        return confirmIcon ?? <Check style={{ width: 18, height: 18, color: colors.thumbText }} />
      }
      return icon ?? <ChevronRight style={{ width: 18, height: 18, color: colors.thumbText }} />
    })()

    return (
      <>
        <style>
          {`@keyframes swipe-spin { to { transform: rotate(360deg); } }`}
        </style>
        <div
          ref={ref}
          className={cn("select-none", className)}
          style={{
            width,
            opacity: disabled ? 0.5 : 1,
            pointerEvents: disabled ? "none" : "auto",
            ...style,
          }}
          {...props}
        >
          <div
            ref={trackRef}
            style={{
              position: "relative",
              width: "100%",
              height,
              backgroundColor:
                state === "confirmed"
                  ? "var(--success-50)"
                  : state === "error"
                  ? "var(--error-50)"
                  : colors.trackBg,
              borderRadius: "var(--radius-full)",
              padding,
              touchAction: "none",
              overflow: "hidden",
              transition: state === "dragging" ? "none" : "background-color 0.3s ease",
              cursor: isInteractive ? "default" : "default",
            }}
          >
            {/* Track text */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color:
                  state === "confirmed"
                    ? "var(--surface-0)"
                    : state === "error"
                    ? "var(--surface-0)"
                    : colors.trackText,
                fontSize: "var(--font-size-m)",
                fontWeight: "var(--font-weight-prominent)",
                opacity: textOpacity,
                transition: state === "dragging" ? "none" : "opacity 0.3s ease",
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              {displayText}
            </div>

            {/* Thumb */}
            <div
              onPointerDown={handlePointerDown}
              style={{
                position: "absolute",
                top: padding,
                left:
                  state === "confirmed" || state === "loading" || state === "confirming"
                    ? `calc(100% - ${thumbSize + padding}px)`
                    : state === "dragging"
                    ? thumbOffset
                    : padding,
                width: thumbSize,
                height: thumbSize,
                borderRadius: "50%",
                backgroundColor:
                  state === "confirmed"
                    ? "var(--surface-0)"
                    : state === "error"
                    ? "var(--surface-0)"
                    : colors.thumbBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                transition:
                  state === "dragging"
                    ? "none"
                    : "left 0.3s ease, background-color 0.3s ease",
                cursor: isInteractive ? "grab" : "default",
                zIndex: 1,
              }}
            >
              {thumbContent}
            </div>
          </div>
        </div>
      </>
    )
  }
)
SwipeButton.displayName = "SwipeButton"

export { SwipeButton, type SwipeButtonProps }
