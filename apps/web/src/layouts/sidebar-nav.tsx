import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ChevronDown } from "lucide-react"
import { cn } from "@repo/utils"
import { ScrollArea } from "@repo/ui"

export type SidebarNavItem =
  | { href: string; title: string; icon?: React.ReactNode }
  | {
      group: string
      icon?: React.ReactNode
      children: { href: string; title: string; icon?: React.ReactNode }[]
    }

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: SidebarNavItem[]
}

function NavLink({
  href,
  title,
  icon,
  isActive,
}: {
  href: string
  title: string
  icon?: React.ReactNode
  isActive: boolean
}) {
  return (
    <Link
      to={href}
      className="flex items-center transition-colors"
      style={{
        padding: "var(--space-8) var(--space-12)",
        borderRadius: "var(--radius-8)",
        fontSize: "var(--font-size-m)",
        fontWeight: isActive
          ? "var(--font-weight-prominent)"
          : "var(--font-weight-regular)",
        color: isActive ? "var(--primary-60)" : "var(--text-default)",
        backgroundColor: isActive ? "var(--primary-10)" : "transparent",
        lineHeight: "var(--line-height-m)",
        gap: "var(--space-8)",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = "var(--primary-10)"
          e.currentTarget.style.color = "var(--primary-60)"
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = "transparent"
          e.currentTarget.style.color = "var(--text-default)"
        }
      }}
    >
      {icon && (
        <span
          className="flex shrink-0 items-center justify-center"
          style={{ width: 20, height: 20, color: "inherit" }}
        >
          {icon}
        </span>
      )}
      {title}
    </Link>
  )
}

function NavGroup({
  group,
  icon,
  children,
  pathname,
}: {
  group: string
  icon?: React.ReactNode
  children: { href: string; title: string; icon?: React.ReactNode }[]
  pathname: string
}) {
  const hasActiveChild = children.some((child) => pathname === child.href)
  const [open, setOpen] = useState(hasActiveChild)

  return (
    <div>
      {/* Group header — styled same as NavLink */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center transition-colors"
        style={{
          padding: "var(--space-8) var(--space-12)",
          borderRadius: "var(--radius-8)",
          fontSize: "var(--font-size-m)",
          fontWeight: hasActiveChild
            ? "var(--font-weight-prominent)"
            : "var(--font-weight-regular)",
          color: hasActiveChild ? "var(--primary-60)" : "var(--text-default)",
          backgroundColor: "transparent",
          lineHeight: "var(--line-height-m)",
          border: "none",
          cursor: "pointer",
          gap: "var(--space-8)",
        }}
        onMouseEnter={(e) => {
          if (!hasActiveChild) {
            e.currentTarget.style.backgroundColor = "var(--primary-10)"
            e.currentTarget.style.color = "var(--primary-60)"
          }
        }}
        onMouseLeave={(e) => {
          if (!hasActiveChild) {
            e.currentTarget.style.backgroundColor = "transparent"
            e.currentTarget.style.color = "var(--text-default)"
          }
        }}
      >
        {icon && (
          <span
            className="flex shrink-0 items-center justify-center"
            style={{ width: 20, height: 20, color: "inherit" }}
          >
            {icon}
          </span>
        )}
        <span className="flex-1 text-left">{group}</span>
        <ChevronDown
          size={14}
          className="shrink-0 transition-transform duration-200"
          style={{
            transform: open ? "rotate(0deg)" : "rotate(-90deg)",
            color: "inherit",
            opacity: 0.6,
          }}
        />
      </button>

      {/* Children with left border */}
      {open && (
        <div
          style={{
            marginLeft: icon ? "20px" : "var(--space-12)",
            paddingLeft: "var(--space-12)",
            borderLeft: "1px solid var(--grey-40)",
            marginTop: "var(--space-4)",
          }}
        >
          <div className="flex flex-col" style={{ gap: "var(--space-2)" }}>
            {children.map((child) => (
              <NavLink
                key={child.href}
                href={child.href}
                title={child.title}
                icon={child.icon}
                isActive={pathname === child.href}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <nav className={cn("flex flex-col", className)} {...props}>
      <ScrollArea className="h-[calc(100vh-8rem)] sidebar-scroll">
        <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
          {items.map((item) => {
            if ("group" in item) {
              return (
                <NavGroup
                  key={item.group}
                  group={item.group}
                  icon={item.icon}
                  children={item.children}
                  pathname={pathname}
                />
              )
            }

            return (
              <NavLink
                key={item.href}
                href={item.href}
                title={item.title}
                icon={item.icon}
                isActive={pathname === item.href}
              />
            )
          })}
        </div>
      </ScrollArea>
    </nav>
  )
}
