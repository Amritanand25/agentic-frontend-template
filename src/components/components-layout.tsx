import { Outlet } from "react-router-dom"
import { SidebarNav } from "./sidebar-nav"
import { ThemeToggle } from "./theme-toggle"

const sidebarNavItems = [
  {
    title: "Accordion",
    href: "/components/accordion",
  },
  {
    title: "Alert",
    href: "/components/alert",
  },
  {
    title: "Alert Dialog",
    href: "/components/alert-dialog",
  },
  {
    title: "Aspect Ratio",
    href: "/components/aspect-ratio",
  },
  {
    title: "Avatar",
    href: "/components/avatar",
  },
  {
    title: "Badge",
    href: "/components/badge",
  },
  {
    title: "Breadcrumb",
    href: "/components/breadcrumb",
  },
  {
    title: "Button",
    href: "/components/button",
  },
  {
    title: "Calendar",
    href: "/components/calendar",
  },
  {
    title: "Card",
    href: "/components/card",
  },
  {
    title: "Carousel",
    href: "/components/carousel",
  },
  {
    title: "Checkbox",
    href: "/components/checkbox",
  },
  {
    title: "Collapsible",
    href: "/components/collapsible",
  },
  {
    title: "Command",
    href: "/components/command",
  },
  {
    title: "Context Menu",
    href: "/components/context-menu",
  },
  {
    title: "Dialog",
    href: "/components/dialog",
  },
  {
    title: "Drawer",
    href: "/components/drawer",
  },
  {
    title: "Dropdown Menu",
    href: "/components/dropdown-menu",
  },
  {
    title: "Form",
    href: "/components/form",
  },
  {
    title: "Hover Card",
    href: "/components/hover-card",
  },
  {
    title: "Input",
    href: "/components/input",
  },
  {
    title: "Input OTP",
    href: "/components/input-otp",
  },
  {
    title: "Label",
    href: "/components/label",
  },
  {
    title: "Menubar",
    href: "/components/menubar",
  },
  {
    title: "Navigation Menu",
    href: "/components/navigation-menu",
  },
  {
    title: "Pagination",
    href: "/components/pagination",
  },
  {
    title: "Popover",
    href: "/components/popover",
  },
  {
    title: "Progress",
    href: "/components/progress",
  },
  {
    title: "Radio Group",
    href: "/components/radio-group",
  },
  {
    title: "Resizable",
    href: "/components/resizable",
  },
  {
    title: "Scroll Area",
    href: "/components/scroll-area",
  },
  {
    title: "Select",
    href: "/components/select",
  },
  {
    title: "Separator",
    href: "/components/separator",
  },
  {
    title: "Sheet",
    href: "/components/sheet",
  },
  {
    title: "Skeleton",
    href: "/components/skeleton",
  },
  {
    title: "Slider",
    href: "/components/slider",
  },
  {
    title: "Sonner",
    href: "/components/sonner",
  },
  {
    title: "Switch",
    href: "/components/switch",
  },
  {
    title: "Table",
    href: "/components/table",
  },
  {
    title: "Tabs",
    href: "/components/tabs",
  },
  {
    title: "Textarea",
    href: "/components/textarea",
  },
  {
    title: "Toggle",
    href: "/components/toggle",
  },
  {
    title: "Toggle Group",
    href: "/components/toggle-group",
  },
  {
    title: "Tooltip",
    href: "/components/tooltip",
  },
]

export function ComponentsLayout() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <h2 className="text-lg font-semibold">shadcn/ui Components</h2>
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-full shrink-0 md:sticky md:block">
          <div className="h-full py-6 pl-6 pr-6 lg:py-8">
            <SidebarNav items={sidebarNavItems} />
          </div>
        </aside>
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid">
          <div className="mx-auto w-full min-w-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
