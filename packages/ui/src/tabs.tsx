import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@repo/utils"

const Tabs = TabsPrimitive.Root

/* ----------------------------------------------------------------
   TabsList — container for triggers
   ---------------------------------------------------------------- */
const tabsListVariants = cva(
  "inline-flex items-center text-muted-foreground",
  {
    variants: {
      variant: {
        underline: "gap-[var(--space-24)] border-b border-[var(--grey-30)]",
        subtab: "gap-[var(--space-8)]",
      },
      size: {
        sm: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "underline",
      size: "sm",
    },
  }
)

type TabsListVariantProps = VariantProps<typeof tabsListVariants>

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    TabsListVariantProps {}

const TabsListContext = React.createContext<TabsListVariantProps>({
  variant: "underline",
  size: "sm",
})

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, size, ...props }, ref) => (
  <TabsListContext.Provider value={{ variant, size }}>
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabsListVariants({ variant, size }), className)}
      {...props}
    />
  </TabsListContext.Provider>
))
TabsList.displayName = TabsPrimitive.List.displayName

/* ----------------------------------------------------------------
   TabsTrigger — individual tab button
   ---------------------------------------------------------------- */
const underlineTriggerBase =
  "relative pb-[var(--space-8)] font-[var(--font-weight-prominent)] transition-colors cursor-pointer text-[var(--text-subdued-1)] hover:text-[var(--text-default)] data-[state=active]:text-[var(--text-default)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:rounded-full after:bg-transparent after:transition-colors data-[state=active]:after:bg-[var(--primary-50)]"

const subtabTriggerBase =
  "rounded-full border font-[var(--font-weight-prominent)] transition-colors cursor-pointer border-[var(--grey-40)] text-[var(--text-subdued-1)] hover:border-[var(--grey-60)] hover:text-[var(--text-default)] data-[state=active]:border-[var(--primary-50)] data-[state=active]:text-[var(--primary-60)] data-[state=active]:bg-[var(--primary-10)]"

const triggerSizes = {
  underline: {
    sm: "text-[length:var(--font-size-m)]",
    lg: "text-[length:var(--font-size-l)]",
  },
  subtab: {
    sm: "h-[var(--height-s)] px-[var(--space-16)] text-[length:var(--font-size-s)]",
    lg: "h-[var(--height-m)] px-[var(--space-20)] text-[length:var(--font-size-m)]",
  },
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const { variant = "underline", size = "sm" } = React.useContext(TabsListContext)

  const base = variant === "subtab" ? subtabTriggerBase : underlineTriggerBase
  const sizeClass = triggerSizes[variant ?? "underline"][size ?? "sm"]

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-[var(--space-8)] whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
        base,
        sizeClass,
        className
      )}
      {...props}
    />
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

/* ----------------------------------------------------------------
   TabsContent
   ---------------------------------------------------------------- */
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-[var(--space-16)] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
