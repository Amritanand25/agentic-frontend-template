import { useState } from "react";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  ScrollArea,
  Separator,
  Skeleton,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ChevronRight,
  ChevronsUpDown,
  Command,
  Frame,
  GalleryVerticalEnd,
  Home,
  Inbox,
  LogOut,
  Map,
  PanelLeft,
  PieChart,
  Search,
  Settings2,
  Sparkles,
  SquareTerminal,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Demo Data
// ---------------------------------------------------------------------------

const data = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "",
  },
  teams: [
    { name: "Acme Inc", logo: GalleryVerticalEnd, plan: "Enterprise" },
    { name: "Acme Corp.", logo: AudioWaveform, plan: "Startup" },
    { name: "Evil Corp.", logo: Command, plan: "Free" },
  ],
  navMain: [
    {
      title: "Playground",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "History", isActive: true },
        { title: "Starred" },
        { title: "Settings" },
      ],
    },
    {
      title: "Models",
      icon: Bot,
      items: [
        { title: "Genesis" },
        { title: "Explorer" },
        { title: "Quantum" },
      ],
    },
    {
      title: "Documentation",
      icon: BookOpen,
      items: [
        { title: "Introduction" },
        { title: "Get Started" },
        { title: "Tutorials" },
        { title: "Changelog" },
      ],
    },
    {
      title: "Settings",
      icon: Settings2,
      items: [
        { title: "General" },
        { title: "Team" },
        { title: "Billing" },
        { title: "Limits" },
      ],
    },
  ],
  navSecondary: [
    { title: "Search", icon: Search },
    { title: "Inbox", icon: Inbox, badge: "12" },
    { title: "Sparkles", icon: Sparkles },
  ],
  projects: [
    { name: "Design Engineering", icon: Frame },
    { name: "Sales & Marketing", icon: PieChart },
    { name: "Travel", icon: Map },
  ],
};

// ---------------------------------------------------------------------------
// Sidebar Demo — uses direct flex layout (no fixed positioning)
// ---------------------------------------------------------------------------

function SidebarDemo() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTeam] = useState(data.teams[0]);
  const [activeItem, setActiveItem] = useState("History");
  const sidebarWidth = collapsed ? 52 : 256;

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className="flex rounded-lg overflow-hidden"
        style={{ height: 680, backgroundColor: "var(--surface-10)" }}
      >
        {/* Sidebar panel */}
        <div
          className="flex flex-col shrink-0 overflow-hidden"
          style={{
            width: sidebarWidth,
            backgroundColor: "var(--surface-0)",
            transition: "width 200ms ease-in-out",
          }}
        >
          {/* Header — Workspace switcher */}
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                {collapsed ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="flex items-center justify-center rounded-lg size-8 mx-auto cursor-pointer text-sidebar-primary-foreground"
                        style={{ backgroundColor: "var(--sidebar-primary)" }}
                      >
                        <activeTeam.logo className="size-4" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {activeTeam.name}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <SidebarMenuButton size="lg">
                    <div
                      className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground"
                      style={{ backgroundColor: "var(--sidebar-primary)" }}
                    >
                      <activeTeam.logo className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {activeTeam.name}
                      </span>
                      <span className="truncate text-xs">
                        {activeTeam.plan}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarSeparator />

          {/* Content — scrollable nav */}
          <SidebarContent className="flex-1">
            {/* Platform group */}
            <SidebarGroup>
              {!collapsed && <SidebarGroupLabel>Platform</SidebarGroupLabel>}
              <SidebarGroupContent>
                <SidebarMenu>
                  {data.navMain.map((item) =>
                    collapsed ? (
                      <SidebarMenuItem key={item.title}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton className="!size-8 !p-2">
                              <item.icon />
                            </SidebarMenuButton>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            {item.title}
                          </TooltipContent>
                        </Tooltip>
                      </SidebarMenuItem>
                    ) : (
                      <Collapsible
                        key={item.title}
                        asChild
                        defaultOpen={item.isActive}
                        className="group/collapsible"
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton>
                              <item.icon />
                              <span>{item.title}</span>
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.items?.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                    isActive={activeItem === subItem.title}
                                    onClick={() => setActiveItem(subItem.title)}
                                    className="cursor-pointer"
                                  >
                                    <span>{subItem.title}</span>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    ),
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Projects group */}
            <SidebarGroup>
              {!collapsed && <SidebarGroupLabel>Projects</SidebarGroupLabel>}
              <SidebarGroupContent>
                <SidebarMenu>
                  {data.projects.map((project) => (
                    <SidebarMenuItem key={project.name}>
                      {collapsed ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton
                              className="!size-8 !p-2"
                              isActive={activeItem === project.name}
                              onClick={() => setActiveItem(project.name)}
                            >
                              <project.icon />
                            </SidebarMenuButton>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            {project.name}
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <SidebarMenuButton
                          isActive={activeItem === project.name}
                          onClick={() => setActiveItem(project.name)}
                          className="cursor-pointer"
                        >
                          <project.icon />
                          <span>{project.name}</span>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Secondary nav with badges */}
            <SidebarGroup className="mt-auto">
              <SidebarGroupContent>
                <SidebarMenu>
                  {data.navSecondary.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      {collapsed ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton
                              className="!size-8 !p-2"
                              isActive={activeItem === item.title}
                              onClick={() => setActiveItem(item.title)}
                            >
                              <item.icon />
                            </SidebarMenuButton>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            {item.title}
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <>
                          <SidebarMenuButton
                            isActive={activeItem === item.title}
                            onClick={() => setActiveItem(item.title)}
                            className="cursor-pointer"
                          >
                            <item.icon />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                          {item.badge && (
                            <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                          )}
                        </>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarSeparator />

          {/* Footer — User profile */}
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                {collapsed ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-center p-1 cursor-pointer">
                        <Avatar className="h-8 w-8 rounded-lg">
                          <AvatarFallback className="rounded-lg">
                            JD
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {data.user.name}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <SidebarMenuButton size="lg">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={data.user.avatar}
                        alt={data.user.name}
                      />
                      <AvatarFallback className="rounded-lg">JD</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {data.user.name}
                      </span>
                      <span className="truncate text-xs">
                        {data.user.email}
                      </span>
                    </div>
                    <LogOut className="ml-auto size-4" />
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </div>

        {/* Right side — Header + Content */}
        <div className="flex flex-1 min-w-0 flex-col">
          {/* Top header */}
          <header
            className="flex h-12 shrink-0 items-center gap-2 px-4"
            style={{
              borderBottom: "1px solid var(--sidebar-border)",
              backgroundColor: "var(--surface-0)",
            }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setCollapsed((prev) => !prev)}
            >
              <PanelLeft />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
            <Separator orientation="vertical" className="mr-2 h-4" />
            <span
              className="text-sm font-medium"
              style={{ color: "var(--text-default)" }}
            >
              Dashboard
            </span>
            <div className="ml-auto flex items-center gap-2">
              <span
                className="text-xs"
                style={{ color: "var(--text-subdued-2)" }}
              >
                Click{" "}
                <PanelLeft
                  className="inline size-3"
                  style={{ verticalAlign: "middle" }}
                />{" "}
                to toggle sidebar
              </span>
            </div>
          </header>

          {/* Placeholder content */}
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-4 p-4">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-xl"
                    style={{
                      aspectRatio: "16/9",
                      backgroundColor: "var(--surface-20)",
                    }}
                  />
                ))}
              </div>
              <div
                className="min-h-[200px] rounded-xl"
                style={{ backgroundColor: "var(--surface-20)" }}
              />
            </div>
          </ScrollArea>
        </div>
      </div>
    </TooltipProvider>
  );
}

// ---------------------------------------------------------------------------
// Header + Sidebar Demo — full-width header on top, sidebar below left
// ---------------------------------------------------------------------------

function HeaderSidebarDemo() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("Overview");
  const sidebarWidth = collapsed ? 52 : 240;

  const navItems = [
    { title: "Home", icon: Home },
    { title: "Dashboard", icon: SquareTerminal },
    {
      title: "Analytics",
      icon: Bot,
      children: [{ title: "Overview" }, { title: "Reports" }],
    },
    {
      title: "Management",
      icon: BookOpen,
      children: [
        { title: "Categories" },
        { title: "Settings" },
        { title: "Requests" },
      ],
    },
  ];

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className="flex flex-col rounded-lg overflow-hidden"
        style={{ height: 600, backgroundColor: "var(--surface-10)" }}
      >
        {/* Full-width top header */}
        <header
          className="flex h-12 shrink-0 items-center justify-between px-4"
          style={{
            backgroundColor: "var(--surface-0)",
            borderBottom: "1px solid var(--sidebar-border)",
          }}
        >
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setCollapsed((prev) => !prev)}
            >
              <PanelLeft />
            </Button>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-2">
              <div
                className="flex size-6 items-center justify-center rounded"
                style={{ backgroundColor: "var(--sidebar-primary)" }}
              >
                <GalleryVerticalEnd
                  className="size-3.5"
                  style={{ color: "var(--sidebar-primary-foreground)" }}
                />
              </div>
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--text-default)" }}
              >
                Product Name
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Settings2
              className="size-4 cursor-pointer"
              style={{ color: "var(--text-subdued-1)" }}
            />
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-xs">UN</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p
                  className="text-xs font-medium leading-none"
                  style={{ color: "var(--text-default)" }}
                >
                  Workspace
                </p>
                <p
                  className="text-xs leading-none mt-0.5"
                  style={{ color: "var(--text-subdued-2)" }}
                >
                  User Name
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Below header: sidebar + content */}
        <div className="flex flex-1 min-h-0">
          {/* Left sidebar */}
          <div
            className="flex flex-col shrink-0 overflow-hidden"
            style={{
              width: sidebarWidth,
              backgroundColor: "var(--surface-0)",
              transition: "width 200ms ease-in-out",
            }}
          >
            <SidebarContent className="flex-1">
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {navItems.map((item) =>
                      item.children ? (
                        <Collapsible
                          key={item.title}
                          asChild
                          defaultOpen={item.children.some(
                            (c) => c.title === activeItem,
                          )}
                          className="group/collapsible"
                        >
                          <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                              {collapsed ? (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <SidebarMenuButton className="!size-8 !p-2">
                                      <item.icon />
                                    </SidebarMenuButton>
                                  </TooltipTrigger>
                                  <TooltipContent side="right">
                                    {item.title}
                                  </TooltipContent>
                                </Tooltip>
                              ) : (
                                <SidebarMenuButton>
                                  <item.icon />
                                  <span>{item.title}</span>
                                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuButton>
                              )}
                            </CollapsibleTrigger>
                            {!collapsed && (
                              <CollapsibleContent>
                                <SidebarMenuSub>
                                  {item.children.map((child) => (
                                    <SidebarMenuSubItem key={child.title}>
                                      <SidebarMenuSubButton
                                        isActive={activeItem === child.title}
                                        onClick={() =>
                                          setActiveItem(child.title)
                                        }
                                        className="cursor-pointer"
                                      >
                                        <span>{child.title}</span>
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  ))}
                                </SidebarMenuSub>
                              </CollapsibleContent>
                            )}
                          </SidebarMenuItem>
                        </Collapsible>
                      ) : (
                        <SidebarMenuItem key={item.title}>
                          {collapsed ? (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <SidebarMenuButton
                                  className="!size-8 !p-2"
                                  isActive={activeItem === item.title}
                                  onClick={() => setActiveItem(item.title)}
                                >
                                  <item.icon />
                                </SidebarMenuButton>
                              </TooltipTrigger>
                              <TooltipContent side="right">
                                {item.title}
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            <SidebarMenuButton
                              isActive={activeItem === item.title}
                              onClick={() => setActiveItem(item.title)}
                              className="cursor-pointer"
                            >
                              <item.icon />
                              <span>{item.title}</span>
                            </SidebarMenuButton>
                          )}
                        </SidebarMenuItem>
                      ),
                    )}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </div>

          {/* Right content body */}
          <div className="flex flex-1 min-w-0 flex-col">
            <ScrollArea className="flex-1">
              <div className="p-4 flex flex-col gap-4">
                {/* Page title skeleton */}
                <Skeleton className="h-6 w-32" />

                {/* Content card skeleton */}
                <div
                  className="rounded-xl p-4 flex flex-col gap-4"
                  style={{ backgroundColor: "var(--surface-0)" }}
                >
                  {/* Tabs skeleton */}
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-18" />
                    <Skeleton className="h-4 w-16" />
                  </div>

                  {/* Filter pills skeleton */}
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-18 rounded-full" />
                    <Skeleton className="h-6 w-14 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>

                  {/* Table header skeleton */}
                  <div className="flex gap-4 py-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-3 w-14" />
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-12" />
                  </div>

                  {/* Table rows skeleton */}
                  {[1, 2, 3, 4, 5].map((row) => (
                    <div
                      key={row}
                      className="flex gap-4 py-2"
                      style={{
                        borderBottom: "1px solid var(--surface-10)",
                      }}
                    >
                      <Skeleton className="h-3.5 w-28" />
                      <Skeleton className="h-3.5 w-20" />
                      <Skeleton className="h-3.5 w-32" />
                      <Skeleton className="h-3.5 w-14" />
                      <Skeleton className="h-3.5 w-24" />
                      <Skeleton className="h-3.5 w-10" />
                    </div>
                  ))}

                  {/* Pagination skeleton */}
                  <div className="flex items-center justify-between pt-2">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-3 w-36" />
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function SidebarPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-24)",
      }}
    >
      {/* Header */}
      <div>
        <h1
          style={{
            fontSize: "var(--font-size-2xl)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-8)",
          }}
        >
          Sidebar
        </h1>
        <p
          style={{
            color: "var(--text-subdued-1)",
            fontSize: "var(--font-size-m)",
          }}
        >
          A composable, collapsible sidebar component with workspace switcher,
          nested navigation, badges, tooltips, and user footer. Supports
          <code style={{ color: "var(--primary-50)" }}> icon</code>,
          <code style={{ color: "var(--primary-50)" }}> offcanvas</code>, and
          <code style={{ color: "var(--primary-50)" }}> none</code> collapsible
          modes.
        </p>
      </div>

      <Separator />

      {/* Interactive Demo — Left sidebar + top header + content */}
      <div>
        <h2
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Interactive Demo
        </h2>
        <SidebarDemo />
      </div>

      <Separator />

      {/* Variant 2: Full-width header + sidebar + content */}
      <div>
        <h2
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-8)",
          }}
        >
          Header + Sidebar Layout
        </h2>
        <p
          className="mb-4"
          style={{
            color: "var(--text-subdued-1)",
            fontSize: "var(--font-size-s)",
          }}
        >
          Full-width header on top, collapsible sidebar below on the left,
          content body on the right.
        </p>
        <HeaderSidebarDemo />
      </div>

      <Separator />

      {/* Skeleton demo */}
      <div>
        <h2
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Menu Skeleton
        </h2>
        <div
          className="rounded-lg p-4"
          style={{
            backgroundColor: "var(--surface-0)",
            maxWidth: 280,
          }}
        >
          <p
            className="text-sm font-medium mb-3"
            style={{ color: "var(--text-default)" }}
          >
            Loading skeleton
          </p>
          <div className="flex flex-col gap-1">
            <SidebarMenuSkeleton showIcon />
            <SidebarMenuSkeleton showIcon />
            <SidebarMenuSkeleton />
            <SidebarMenuSkeleton />
            <SidebarMenuSkeleton showIcon />
          </div>
        </div>
      </div>

      <Separator />

      {/* Sub-components reference */}
      <div>
        <h2
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Sub-components
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              name: "SidebarProvider",
              desc: "Context provider — wraps sidebar + content",
            },
            {
              name: "Sidebar",
              desc: "Main container (variant, side, collapsible)",
            },
            {
              name: "SidebarTrigger",
              desc: "Toggle button for open/collapse",
            },
            {
              name: "SidebarInset",
              desc: "Main content wrapper for inset variant",
            },
            {
              name: "SidebarHeader",
              desc: "Sticky top section (logo, branding)",
            },
            { name: "SidebarContent", desc: "Scrollable middle section" },
            {
              name: "SidebarFooter",
              desc: "Sticky bottom section (user profile)",
            },
            {
              name: "SidebarGroup",
              desc: "Section container within content",
            },
            {
              name: "SidebarGroupLabel",
              desc: "Section heading with asChild support",
            },
            {
              name: "SidebarGroupAction",
              desc: "Action button in group header",
            },
            {
              name: "SidebarGroupContent",
              desc: "Container for group items",
            },
            { name: "SidebarMenu", desc: "List container for menu items" },
            { name: "SidebarMenuItem", desc: "Individual menu item wrapper" },
            {
              name: "SidebarMenuButton",
              desc: "Menu button with variants & tooltip",
            },
            {
              name: "SidebarMenuAction",
              desc: "Action overlay on menu items",
            },
            { name: "SidebarMenuBadge", desc: "Badge/count indicator" },
            {
              name: "SidebarMenuSkeleton",
              desc: "Loading skeleton for menu items",
            },
            { name: "SidebarMenuSub", desc: "Nested submenu container" },
            { name: "SidebarMenuSubItem", desc: "Submenu item wrapper" },
            {
              name: "SidebarMenuSubButton",
              desc: "Submenu button with size variants",
            },
            { name: "SidebarRail", desc: "Visual rail / drag handle" },
            { name: "SidebarSeparator", desc: "Separator within sidebar" },
            { name: "SidebarInput", desc: "Search input within sidebar" },
            {
              name: "useSidebar",
              desc: "Hook for open, state, toggleSidebar",
            },
          ].map((comp) => (
            <div
              key={comp.name}
              className="rounded-lg p-3"
              style={{
                backgroundColor: "var(--surface-0)",
              }}
            >
              <p
                className="text-sm font-medium"
                style={{ color: "var(--text-default)" }}
              >
                {comp.name}
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "var(--text-subdued-1)" }}
              >
                {comp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
