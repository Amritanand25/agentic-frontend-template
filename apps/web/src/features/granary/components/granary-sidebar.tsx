import { useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@repo/ui";
import {
  Home,
  BarChart3,
  TrendingUp,
  LayoutGrid,
  ChevronDown,
} from "lucide-react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@repo/ui";

interface NavItem {
  label: string;
  path?: string;
  icon: React.ElementType;
  children?: { label: string; path: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/granary/home", icon: Home },
  { label: "Dashboard", path: "/granary/dashboard", icon: BarChart3 },
  {
    label: "Forecasting",
    icon: TrendingUp,
    children: [
      { label: "Baseline Forecast", path: "/granary/forecasting/baseline" },
    ],
  },
  {
    label: "Assortment Intelligence",
    icon: LayoutGrid,
    children: [
      { label: "Category Overview", path: "/granary/assortment/category" },
      { label: "Range Review", path: "/granary/assortment/range-review" },
      { label: "Requests", path: "/granary/assortment/requests" },
    ],
  },
];

export function GranarySidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isGroupActive = (item: NavItem) =>
    item.children?.some((c) => location.pathname.startsWith(c.path)) ?? false;

  return (
    <Sidebar
      collapsible="none"
      style={
        {
          "--sidebar-width": "240px",
          backgroundColor: "var(--surface-0)",
          borderRight: "1px solid var(--grey-20)",
        } as React.CSSProperties
      }
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {NAV_ITEMS.map((item) => {
              // Standalone nav item (no children)
              if (item.path) {
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      isActive={isActive(item.path)}
                      onClick={() => navigate(item.path!)}
                      tooltip={item.label}
                    >
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }

              // Group item with children (expandable)
              const groupActive = isGroupActive(item);
              return (
                <Collapsible
                  key={item.label}
                  defaultOpen={groupActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.label}>
                        <item.icon size={18} />
                        <span>{item.label}</span>
                        <ChevronDown
                          size={16}
                          className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-0 group-data-[state=closed]/collapsible:-rotate-90"
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.children!.map((child) => (
                          <SidebarMenuSubItem key={child.path}>
                            <SidebarMenuSubButton
                              isActive={isActive(child.path)}
                              onClick={() => navigate(child.path)}
                              asChild={false}
                            >
                              <span>{child.label}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
