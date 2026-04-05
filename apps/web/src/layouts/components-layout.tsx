import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeftRight,
  BarChart3,
  Bell,
  BookOpen,
  Calendar,
  CheckCircle,
  CheckSquare,
  ChevronDown,
  ChevronsUpDown,
  CircleDot,
  Clock,
  CreditCard,
  FileText,
  Filter,
  FolderOpen,
  GalleryHorizontal,
  GripVertical,
  Hash,
  Image,
  Keyboard,
  Layers,
  LayoutDashboard,
  LayoutList,
  ListFilter,
  Loader,
  Menu,
  MessageSquare,
  Minus,
  MousePointer,
  MoveHorizontal,
  Navigation,
  Palette,
  PanelLeft,
  PanelRight,
  Pencil,
  Pointer,
  RectangleHorizontal,
  RotateCcw,
  ScrollText,
  Search,
  SlidersHorizontal,
  SquareStack,
  Table2,
  SquareKanban,
  Tag,
  TextCursorInput,
  ToggleLeft,
  ToggleRight,
  Type,
  Upload,
  XCircle,
} from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  ScrollArea,
} from "@repo/ui";
import { SidebarNav, type SidebarNavItem } from "./sidebar-nav";
import { ThemeToggle } from "@/components/theme-toggle";

const I = 16;

const sidebarNavItems: SidebarNavItem[] = [
  {
    group: "Design System",
    icon: <Palette size={I} />,
    children: [
      {
        title: "Theme & Tokens",
        href: "/components",
        icon: <Palette size={I} />,
      },
    ],
  },
  {
    title: "Accordion",
    href: "/components/accordion",
    icon: <ChevronsUpDown size={I} />,
  },
  { title: "Alert", href: "/components/alert", icon: <AlertCircle size={I} /> },
  {
    title: "Alert Dialog",
    href: "/components/alert-dialog",
    icon: <AlertTriangle size={I} />,
  },
  {
    title: "Aspect Ratio",
    href: "/components/aspect-ratio",
    icon: <Image size={I} />,
  },
  { title: "Avatar", href: "/components/avatar", icon: <CircleDot size={I} /> },
  { title: "Badge", href: "/components/badge", icon: <Tag size={I} /> },
  {
    title: "Banner",
    href: "/components/banner",
    icon: <RectangleHorizontal size={I} />,
  },
  {
    title: "Breadcrumb",
    href: "/components/breadcrumb",
    icon: <Navigation size={I} />,
  },
  { title: "Button", href: "/components/button", icon: <Pointer size={I} /> },
  {
    title: "Calendar",
    href: "/components/calendar",
    icon: <Calendar size={I} />,
  },
  { title: "Card", href: "/components/card", icon: <CreditCard size={I} /> },
  {
    title: "Carousel",
    href: "/components/carousel",
    icon: <GalleryHorizontal size={I} />,
  },
  {
    title: "Checkbox",
    href: "/components/checkbox",
    icon: <CheckSquare size={I} />,
  },
  {
    title: "Collapsible",
    href: "/components/collapsible",
    icon: <FolderOpen size={I} />,
  },
  { title: "Command", href: "/components/command", icon: <Search size={I} /> },
  {
    title: "Context Menu",
    href: "/components/context-menu",
    icon: <MousePointer size={I} />,
  },
  {
    title: "Date Picker",
    href: "/components/date-picker",
    icon: <Calendar size={I} />,
  },
  {
    title: "Dialog",
    href: "/components/dialog",
    icon: <MessageSquare size={I} />,
  },
  {
    title: "Drawer",
    href: "/components/drawer",
    icon: <PanelRight size={I} />,
  },
  {
    title: "Dropdown",
    href: "/components/dropdown",
    icon: <ChevronDown size={I} />,
  },
  {
    title: "Dropdown Menu",
    href: "/components/dropdown-menu",
    icon: <ListFilter size={I} />,
  },
  {
    title: "Empty State",
    href: "/components/empty-state",
    icon: <FolderOpen size={I} />,
  },
  {
    title: "Error State",
    href: "/components/error-state",
    icon: <XCircle size={I} />,
  },
  {
    title: "File Upload",
    href: "/components/file-upload",
    icon: <Upload size={I} />,
  },
  {
    title: "Filter Pill",
    href: "/components/filter-pill",
    icon: <Filter size={I} />,
  },
  { title: "Form", href: "/components/form", icon: <FileText size={I} /> },
  {
    title: "Hover Card",
    href: "/components/hover-card",
    icon: <SquareStack size={I} />,
  },
  {
    title: "Input",
    href: "/components/input",
    icon: <TextCursorInput size={I} />,
  },
  {
    title: "Input OTP",
    href: "/components/input-otp",
    icon: <Hash size={I} />,
  },
  { title: "Label", href: "/components/label", icon: <Type size={I} /> },
  { title: "Menubar", href: "/components/menubar", icon: <Menu size={I} /> },
  {
    title: "Navigation Menu",
    href: "/components/navigation-menu",
    icon: <Navigation size={I} />,
  },
  {
    title: "Notification Nudge",
    href: "/components/notification-nudge",
    icon: <Bell size={I} />,
  },
  {
    title: "Pagination",
    href: "/components/pagination",
    icon: <ArrowLeftRight size={I} />,
  },
  {
    title: "Popover",
    href: "/components/popover",
    icon: <MessageSquare size={I} />,
  },
  {
    title: "Progress",
    href: "/components/progress",
    icon: <Loader size={I} />,
  },
  {
    title: "Progress Bar",
    href: "/components/progress-bar",
    icon: <MoveHorizontal size={I} />,
  },
  {
    title: "Progress Stepper",
    href: "/components/progress-stepper",
    icon: <CheckCircle size={I} />,
  },
  {
    title: "Radio Group",
    href: "/components/radio-group",
    icon: <CircleDot size={I} />,
  },
  {
    title: "Resizable",
    href: "/components/resizable",
    icon: <GripVertical size={I} />,
  },
  {
    title: "Scroll Area",
    href: "/components/scroll-area",
    icon: <ScrollText size={I} />,
  },
  {
    title: "Select",
    href: "/components/select",
    icon: <ChevronsUpDown size={I} />,
  },
  {
    title: "Separator",
    href: "/components/separator",
    icon: <Minus size={I} />,
  },
  { title: "Sheet", href: "/components/sheet", icon: <PanelLeft size={I} /> },
  {
    title: "Sidebar",
    href: "/components/sidebar",
    icon: <PanelLeft size={I} />,
  },
  {
    title: "Skeleton",
    href: "/components/skeleton",
    icon: <Layers size={I} />,
  },
  {
    title: "Slider",
    href: "/components/slider",
    icon: <SlidersHorizontal size={I} />,
  },
  { title: "Sonner", href: "/components/sonner", icon: <Bell size={I} /> },
  {
    title: "Spinner",
    href: "/components/spinner",
    icon: <RotateCcw size={I} />,
  },
  {
    title: "Stepper Flow",
    href: "/components/stepper-flow",
    icon: <LayoutList size={I} />,
  },
  {
    title: "Swipe Button",
    href: "/components/swipe-button",
    icon: <MoveHorizontal size={I} />,
  },
  {
    title: "Switch",
    href: "/components/switch",
    icon: <ToggleLeft size={I} />,
  },
  {
    title: "Table",
    href: "/components/table",
    icon: <LayoutDashboard size={I} />,
  },
  { title: "Tabs", href: "/components/tabs", icon: <SquareKanban size={I} /> },
  {
    title: "Textarea",
    href: "/components/textarea",
    icon: <Pencil size={I} />,
  },
  {
    title: "Time Picker",
    href: "/components/time-picker",
    icon: <Clock size={I} />,
  },
  {
    title: "Toggle",
    href: "/components/toggle",
    icon: <ToggleRight size={I} />,
  },
  {
    title: "Toggle Group",
    href: "/components/toggle-group",
    icon: <Keyboard size={I} />,
  },
  {
    title: "Title Bar",
    href: "/components/title-bar",
    icon: <RectangleHorizontal size={I} />,
  },
  {
    title: "Tooltip",
    href: "/components/tooltip",
    icon: <BookOpen size={I} />,
  },
  {
    group: "Data Grid",
    icon: <Table2 size={I} />,
    children: [
      { title: "Basic", href: "/components/data-grid/basic" },
      { title: "Editable", href: "/components/data-grid/editable" },
      {
        title: "Sort & Filter",
        href: "/components/data-grid/sortable-filterable",
      },
      { title: "Row Selection", href: "/components/data-grid/row-selection" },
      { title: "Frozen Columns", href: "/components/data-grid/frozen-columns" },
      {
        title: "Column Grouping",
        href: "/components/data-grid/column-grouping",
      },
      { title: "Tree Grid", href: "/components/data-grid/tree-grid" },
      {
        title: "Custom Renderers",
        href: "/components/data-grid/custom-renderers",
      },
      { title: "Summary Rows", href: "/components/data-grid/summary-rows" },
      { title: "Full-Featured", href: "/components/data-grid/full-featured" },
      { title: "Master-Detail", href: "/components/data-grid/master-detail" },
      {
        title: "Shimmer Loading",
        href: "/components/data-grid/shimmer-loading",
      },
      {
        title: "Infinite Scroll",
        href: "/components/data-grid/infinite-scroll",
      },
      { title: "Row Edit Mode", href: "/components/data-grid/row-edit-mode" },
    ],
  },
  {
    group: "Graphs",
    icon: <BarChart3 size={I} />,
    children: [
      { title: "Area Chart", href: "/components/graphs/area-chart" },
      { title: "Bar Chart", href: "/components/graphs/bar-chart" },
      {
        title: "Horizontal Bar",
        href: "/components/graphs/horizontal-bar-chart",
      },
      { title: "Line Chart", href: "/components/graphs/line-chart" },
      { title: "Pie Chart", href: "/components/graphs/pie-chart" },
      { title: "Donut Chart", href: "/components/graphs/donut-chart" },
      { title: "Radar Chart", href: "/components/graphs/radar-chart" },
      {
        title: "Radial Bar Chart",
        href: "/components/graphs/radial-bar-chart",
      },
      { title: "Scatter Chart", href: "/components/graphs/scatter-chart" },
      { title: "Funnel Chart", href: "/components/graphs/funnel-chart" },
      { title: "Treemap", href: "/components/graphs/treemap" },
      { title: "Combo Chart", href: "/components/graphs/combo-chart" },
    ],
  },
];

// Flatten sidebar items into a searchable list
function flattenNavItems(
  items: SidebarNavItem[],
): { title: string; href: string; group?: string }[] {
  const result: { title: string; href: string; group?: string }[] = [];
  for (const item of items) {
    if ("group" in item) {
      for (const child of item.children) {
        result.push({
          title: child.title,
          href: child.href,
          group: item.group,
        });
      }
    } else {
      result.push({ title: item.title, href: item.href });
    }
  }
  return result;
}

export function ComponentsLayout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    el.classList.remove("route-fade");
    void el.offsetWidth;
    el.classList.add("route-fade");
  }, [location.pathname]);

  const searchableItems = useMemo(() => flattenNavItems(sidebarNavItems), []);

  // Group items: standalone components vs grouped (Data Grid, Graphs, etc.)
  const componentItems = useMemo(
    () => searchableItems.filter((i) => !i.group),
    [searchableItems],
  );
  const groupedItems = useMemo(() => {
    const groups: Record<string, { title: string; href: string }[]> = {};
    for (const item of searchableItems) {
      if (item.group) {
        if (!groups[item.group]) groups[item.group] = [];
        groups[item.group].push(item);
      }
    }
    return groups;
  }, [searchableItems]);

  // Cmd+K / Ctrl+K shortcut
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setSearchOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleSelect = useCallback(
    (href: string) => {
      setSearchOpen(false);
      navigate(href);
    },
    [navigate],
  );

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--surface-30)" }}
    >
      {/* Search Dialog */}
      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Search components..." />
        <CommandList className="max-h-none overflow-visible">
          <ScrollArea className="h-[300px]">
            <CommandEmpty>No components found.</CommandEmpty>
            <CommandGroup heading="Components">
              {componentItems.map((item) => (
                <CommandItem
                  key={item.href}
                  value={item.title}
                  onSelect={() => handleSelect(item.href)}
                >
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
            {Object.entries(groupedItems).map(([group, items]) => (
              <CommandGroup key={group} heading={group}>
                {items.map((item) => (
                  <CommandItem
                    key={item.href}
                    value={`${group} ${item.title}`}
                    onSelect={() => handleSelect(item.href)}
                  >
                    <span
                      style={{
                        color: "var(--text-subdued-2)",
                        fontSize: "var(--font-size-s)",
                      }}
                    >
                      {group}
                    </span>
                    <span
                      style={{
                        color: "var(--text-subdued-2)",
                        fontSize: "var(--font-size-s)",
                      }}
                    >
                      &gt;
                    </span>
                    {item.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </ScrollArea>
        </CommandList>
      </CommandDialog>

      {/* TitleBar — surface-0, sticky */}
      <div
        className="sticky top-0 z-40 border-b"
        style={{
          backgroundColor: "var(--surface-0)",
          borderColor: "var(--grey-40)",
        }}
      >
        <div
          className="flex items-center"
          style={{
            height: "var(--height-xl)",
            paddingLeft: "var(--space-24)",
            paddingRight: "var(--space-24)",
          }}
        >
          <h2
            style={{
              fontSize: "var(--font-size-xl)",
              fontWeight: "var(--font-weight-heading)",
              lineHeight: "var(--line-height-l)",
              color: "var(--text-default)",
              letterSpacing: "var(--letter-spacing-baggy)",
            }}
          >
            Design System
          </h2>
          <div
            className="ml-auto flex items-center"
            style={{ gap: "var(--space-16)" }}
          >
            {/* Search trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex items-center transition-colors"
              style={{
                height: "var(--height-s)",
                padding: "0 var(--space-12)",
                borderRadius: "var(--radius-8)",
                border: "1px solid var(--grey-40)",
                backgroundColor: "var(--surface-10)",
                cursor: "pointer",
                gap: "var(--space-8)",
                color: "var(--text-subdued-2)",
                fontSize: "var(--font-size-s)",
                fontFamily: "var(--font-sans)",
                minWidth: 200,
              }}
            >
              <Search size={14} style={{ flexShrink: 0 }} />
              <span style={{ flex: 1, textAlign: "left" }}>Search...</span>
              <kbd
                style={{
                  fontSize: "var(--font-size-xs)",
                  fontFamily: "var(--font-sans)",
                  backgroundColor: "var(--surface-0)",
                  border: "1px solid var(--grey-40)",
                  borderRadius: "var(--radius-4)",
                  padding: "1px 6px",
                  color: "var(--text-subdued-2)",
                }}
              >
                ⌘K
              </kbd>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)]">
        {/* Sidebar — surface-20 */}
        <aside
          className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-full shrink-0 md:sticky md:block"
          style={{ backgroundColor: "var(--surface-20)" }}
        >
          <div
            style={{
              height: "100%",
              paddingTop: "var(--space-24)",
              paddingBottom: "var(--space-24)",
              paddingLeft: "var(--space-16)",
              paddingRight: "var(--space-12)",
            }}
          >
            <SidebarNav items={sidebarNavItems} />
          </div>
        </aside>

        {/* Main content — surface-10 */}
        <main
          className="relative"
          style={{
            backgroundColor: "var(--surface-10)",
            padding: "var(--space-32) var(--space-24)",
            minHeight: "calc(100vh - 64px)",
          }}
        >
          <div ref={contentRef} className="mx-auto w-full min-w-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
