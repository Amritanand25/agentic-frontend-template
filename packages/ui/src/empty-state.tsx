import * as React from "react"
import { FileQuestion, MapPin } from "lucide-react"
import { cn } from "@repo/utils"
import { Button } from "./button.tsx"

// ─── Types ────────────────────────────────────────────────
interface EmptyStateAction {
  label: React.ReactNode
  onClick: () => void
  icon?: React.ReactNode
}

interface EmptyStateCard {
  title?: React.ReactNode
  description?: React.ReactNode
  primaryAction?: { label: React.ReactNode; onClick: () => void }
  secondaryAction?: { label: React.ReactNode; onClick: () => void }
}

interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: "single" | "triple" | "text-only"
  icon?: React.ReactNode | "location" | "custom"
  iconSize?: "sm" | "md" | "lg"
  title?: React.ReactNode
  description?: React.ReactNode
  titleAs?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  primaryAction?: EmptyStateAction
  secondaryAction?: { label: React.ReactNode; onClick: () => void }
  actionsOrientation?: "horizontal" | "vertical"
  cards?: EmptyStateCard[]
  hideIcon?: boolean
  cardClassName?: string
  iconClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  actionsClassName?: string
}

// ─── Config ───────────────────────────────────────────────
const ICON_SIZE_MAP = {
  sm: 48,
  md: 64,
  lg: 80,
} as const

// ─── Icon Resolver ────────────────────────────────────────
function resolveIcon(
  icon: React.ReactNode | "location" | "custom" | undefined,
  size: number
): React.ReactNode {
  if (icon === "location") {
    return <MapPin style={{ width: size, height: size }} />
  }
  if (!icon || icon === "custom") {
    return <FileQuestion style={{ width: size, height: size }} />
  }
  return icon
}

// ─── Actions Row ──────────────────────────────────────────
function ActionsRow({
  primaryAction,
  secondaryAction,
  orientation = "horizontal",
  className,
}: {
  primaryAction?: EmptyStateAction
  secondaryAction?: { label: React.ReactNode; onClick: () => void }
  orientation?: "horizontal" | "vertical"
  className?: string
}) {
  if (!primaryAction && !secondaryAction) return null

  return (
    <div
      className={cn(
        "flex",
        orientation === "vertical" ? "flex-col" : "flex-row",
        className
      )}
      style={{
        gap: "var(--space-12)",
        alignItems: orientation === "vertical" ? "stretch" : "center",
        justifyContent: "center",
      }}
    >
      {primaryAction && (
        <Button size="sm" onClick={primaryAction.onClick}>
          {primaryAction.icon && (
            <span className="flex items-center" style={{ marginRight: "var(--space-4)" }}>
              {primaryAction.icon}
            </span>
          )}
          {primaryAction.label}
        </Button>
      )}
      {secondaryAction && (
        <Button size="sm" variant="outline" onClick={secondaryAction.onClick}>
          {secondaryAction.label}
        </Button>
      )}
    </div>
  )
}

// ─── Single Variant ───────────────────────────────────────
const SingleVariant = React.memo(function SingleVariant({
  icon,
  iconSize,
  title,
  description,
  titleAs: TitleTag = "h3",
  primaryAction,
  secondaryAction,
  actionsOrientation,
  hideIcon,
  iconClassName,
  titleClassName,
  descriptionClassName,
  actionsClassName,
}: EmptyStateProps) {
  const pixelSize = ICON_SIZE_MAP[iconSize ?? "md"]

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "var(--space-48) var(--space-24)",
        gap: "var(--space-16)",
      }}
    >
      {!hideIcon && (
        <div
          className={iconClassName}
          style={{ color: "var(--primary-50)" }}
        >
          {resolveIcon(icon, pixelSize)}
        </div>
      )}
      {title && (
        <TitleTag
          className={titleClassName}
          style={{
            fontSize: "var(--font-size-xl)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            lineHeight: "var(--line-height-l)",
            margin: 0,
          }}
        >
          {title}
        </TitleTag>
      )}
      {description && (
        <p
          className={descriptionClassName}
          style={{
            fontSize: "var(--font-size-m)",
            color: "var(--text-subdued-1)",
            lineHeight: "var(--line-height-m)",
            maxWidth: 400,
            margin: 0,
          }}
        >
          {description}
        </p>
      )}
      <ActionsRow
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        orientation={actionsOrientation}
        className={actionsClassName}
      />
    </div>
  )
})

// ─── Triple Variant ───────────────────────────────────────
const TripleVariant = React.memo(function TripleVariant({
  cards,
  cardClassName,
}: EmptyStateProps) {
  if (!cards || cards.length === 0) return null

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3"
      style={{ gap: "var(--space-16)" }}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          className={cardClassName}
          style={{
            backgroundColor: "var(--surface-0)",
            borderRadius: "var(--radius-16)",
            padding: "var(--space-24)",
            border: "1px solid var(--grey-40)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "var(--space-12)",
          }}
        >
          {card.title && (
            <h4
              style={{
                fontSize: "var(--font-size-l)",
                fontWeight: "var(--font-weight-heading)",
                color: "var(--text-default)",
                lineHeight: "var(--line-height-l)",
                margin: 0,
              }}
            >
              {card.title}
            </h4>
          )}
          {card.description && (
            <p
              style={{
                fontSize: "var(--font-size-m)",
                color: "var(--text-subdued-1)",
                lineHeight: "var(--line-height-m)",
                margin: 0,
              }}
            >
              {card.description}
            </p>
          )}
          {(card.primaryAction || card.secondaryAction) && (
            <div style={{ display: "flex", gap: "var(--space-8)", marginTop: "var(--space-4)" }}>
              {card.primaryAction && (
                <Button size="sm" onClick={card.primaryAction.onClick}>
                  {card.primaryAction.label}
                </Button>
              )}
              {card.secondaryAction && (
                <Button size="sm" variant="outline" onClick={card.secondaryAction.onClick}>
                  {card.secondaryAction.label}
                </Button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
})

// ─── Text-Only Variant ────────────────────────────────────
const TextOnlyVariant = React.memo(function TextOnlyVariant({
  icon,
  title,
  description,
  primaryAction,
  hideIcon,
  iconClassName,
  titleClassName,
  descriptionClassName,
  actionsClassName,
}: EmptyStateProps) {
  return (
    <div
      className="flex items-center"
      style={{
        padding: "var(--space-16) var(--space-24)",
        gap: "var(--space-16)",
        borderRadius: "var(--radius-12)",
        border: "1px solid var(--grey-40)",
        backgroundColor: "var(--surface-0)",
      }}
    >
      {!hideIcon && (
        <div
          className={cn("shrink-0", iconClassName)}
          style={{ color: "var(--primary-50)" }}
        >
          {resolveIcon(icon, 24)}
        </div>
      )}
      <div className="flex-1" style={{ minWidth: 0 }}>
        {title && (
          <p
            className={titleClassName}
            style={{
              fontSize: "var(--font-size-m)",
              fontWeight: "var(--font-weight-heading)",
              color: "var(--text-default)",
              lineHeight: "var(--line-height-m)",
              margin: 0,
            }}
          >
            {title}
          </p>
        )}
        {description && (
          <p
            className={descriptionClassName}
            style={{
              fontSize: "var(--font-size-s)",
              color: "var(--text-subdued-1)",
              lineHeight: "var(--line-height-s)",
              margin: 0,
              marginTop: "var(--space-2)",
            }}
          >
            {description}
          </p>
        )}
      </div>
      {primaryAction && (
        <div className={cn("shrink-0", actionsClassName)}>
          <Button size="sm" onClick={primaryAction.onClick}>
            {primaryAction.icon && (
              <span className="flex items-center" style={{ marginRight: "var(--space-4)" }}>
                {primaryAction.icon}
              </span>
            )}
            {primaryAction.label}
          </Button>
        </div>
      )}
    </div>
  )
})

// ─── Main Component ───────────────────────────────────────
const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ variant = "single", className, icon, iconSize, title, description, titleAs, primaryAction, secondaryAction, actionsOrientation, cards, hideIcon, cardClassName, iconClassName, titleClassName, descriptionClassName, actionsClassName, ...htmlProps }, ref) => {
    const variantProps = { variant, icon, iconSize, title, description, titleAs, primaryAction, secondaryAction, actionsOrientation, cards, hideIcon, cardClassName, iconClassName, titleClassName, descriptionClassName, actionsClassName }
    return (
      <div ref={ref} className={cn(className)} {...htmlProps}>
        {variant === "single" && <SingleVariant {...variantProps} />}
        {variant === "triple" && <TripleVariant {...variantProps} />}
        {variant === "text-only" && <TextOnlyVariant {...variantProps} />}
      </div>
    )
  }
)
EmptyState.displayName = "EmptyState"

export { EmptyState, type EmptyStateProps }
