import { useState, useCallback, useEffect } from "react";
import { Outlet, useNavigate, useLocation, useParams } from "react-router-dom";
import {
  LayoutDashboard,
  Database,
  MessageSquare,
  Workflow,
  ChevronDown,
  LogOut,
  Settings,
  ChevronsUpDown,
  User,
  Building2,
  Users,
  DollarSign,
  Search,
  Plus,
  Star,
  PanelLeftClose,
  PanelLeft,
  FileText,
  Zap,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  ScrollArea,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@repo/ui";
import { cn } from "@repo/utils";
import { useAuthStore } from "@/stores/auth-store";
import { useSchemaStore } from "@/stores/schema-store";

const SIDEBAR_WIDTH = 260;
const SIDEBAR_COLLAPSED_WIDTH = 64;

/** Map icon name strings from schema to Lucide components */
const OBJECT_ICON_MAP: Record<
  string,
  React.ComponentType<{ size?: number }>
> = {
  Building2,
  Users,
  DollarSign,
  Database,
  FileText,
};

/** Mock favorites for the sidebar */
interface FavoriteItem {
  id: string;
  label: string;
  path: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return count.toString();
}

// ─── Sidebar Nav Button ───────────────────────────────────────────────────────

interface NavButtonProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  collapsed: boolean;
  onClick: () => void;
  badge?: React.ReactNode;
  indent?: boolean;
}

function NavButton({
  label,
  icon,
  isActive,
  collapsed,
  onClick,
  badge,
  indent = false,
}: NavButtonProps) {
  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            className={cn(
              "flex items-center justify-center w-10 h-9 rounded-lg transition-colors duration-200 mx-auto relative",
            )}
            style={{
              backgroundColor: isActive ? "var(--primary-10)" : "transparent",
              color: isActive ? "var(--primary-50)" : "var(--text-subdued-1)",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = "var(--surface-10)";
                e.currentTarget.style.color = "var(--text-default)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--text-subdued-1)";
              }
            }}
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
          >
            {icon}
            {badge && (
              <span
                className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[16px] h-4 rounded-full text-[10px] font-semibold leading-none px-1"
                style={{
                  backgroundColor: "var(--primary-50)",
                  color: "var(--surface-0)",
                }}
              >
                {badge}
              </span>
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg transition-colors duration-200 w-full",
      )}
      style={{
        padding: "8px 12px",
        paddingLeft: indent ? "28px" : "12px",
        backgroundColor: isActive ? "var(--primary-10)" : "transparent",
        color: isActive ? "var(--primary-50)" : "var(--text-subdued-1)",
        fontWeight: isActive ? 500 : 400,
        fontSize: indent ? "13px" : "14px",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = "var(--surface-10)";
          e.currentTarget.style.color = "var(--text-default)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "var(--text-subdued-1)";
        }
      }}
      aria-current={isActive ? "page" : undefined}
    >
      <span
        className="shrink-0"
        style={{
          width: 18,
          height: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </span>
      <span className="flex-1 truncate">{label}</span>
      {badge && (
        <span
          className="shrink-0 text-xs font-medium tabular-nums"
          style={{ color: "var(--text-subdued-2)" }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

// ─── Sidebar Separator ────────────────────────────────────────────────────────

function SidebarDivider() {
  return (
    <div
      style={{
        height: 1,
        margin: "12px 12px 0",
        backgroundColor: "var(--grey-40)",
      }}
    />
  );
}

// ─── Main Layout ──────────────────────────────────────────────────────────────

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(true);
  const [objectsOpen, setObjectsOpen] = useState(true);
  const [commandOpen, setCommandOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { orgSlug, tenantSlug } = useParams();
  const { user, currentOrg, currentTenant, logout, organizations } =
    useAuthStore();
  const { loadSchema, getObjectsList } = useSchemaStore();

  const basePath = `/${orgSlug}/${tenantSlug}/app`;

  // ⌘K keyboard shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Load schema on mount (seeds default objects if empty)
  useEffect(() => {
    if (currentTenant?.id) {
      loadSchema(currentTenant.id);
    }
  }, [currentTenant?.id, loadSchema]);

  const objectsList = getObjectsList();

  // Mock favorites
  const favorites: FavoriteItem[] = [
    {
      id: "fav_1",
      label: "Active Enterprise Clients",
      path: `${basePath}/objects/obj_companies`,
    },
    {
      id: "fav_2",
      label: "Hot Deals > $50K",
      path: `${basePath}/objects/obj_deals`,
    },
  ];

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  const handleSwitchOrg = useCallback(() => {
    navigate("/select-org");
  }, [navigate]);

  const handleSwitchTenant = useCallback(() => {
    if (currentOrg) {
      navigate(`/${currentOrg.slug}/select-tenant`);
    }
  }, [navigate, currentOrg]);

  const isActiveRoute = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;

  /** Get the Lucide icon component for a schema object */
  const getObjectIcon = (iconName: string, size = 18) => {
    const IconComponent = OBJECT_ICON_MAP[iconName] ?? Database;
    return <IconComponent size={size} />;
  };

  // Mock unread count for inbox
  const unreadCount = 5;

  return (
    <TooltipProvider delayDuration={200}>
      <div
        className="min-h-screen flex"
        style={{ backgroundColor: "var(--surface-10)" }}
      >
        {/* Sidebar */}
        <aside
          className="fixed top-0 left-0 z-30 h-screen flex flex-col transition-all duration-200 ease-in-out"
          style={{
            width: sidebarWidth,
            backgroundColor: "var(--surface-0)",
            borderRight: "1px solid var(--grey-40)",
          }}
          aria-label="Application sidebar"
        >
          {/* ── Workspace Header ────────────────────────────────────── */}
          <div
            className="flex items-center shrink-0"
            style={{
              height: 56,
              padding: collapsed ? "0 12px" : "0 12px",
              borderBottom: "1px solid var(--grey-40)",
            }}
          >
            {collapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleSwitchTenant}
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 mx-auto"
                    style={{
                      backgroundColor: "var(--primary-10)",
                      color: "var(--primary-50)",
                      border: "none",
                      cursor: "pointer",
                    }}
                    aria-label="Switch workspace"
                  >
                    <Building2 size={20} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>
                    {currentOrg?.name} / {currentTenant?.name}
                  </p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center gap-3 w-full rounded-lg transition-colors duration-200"
                    style={{
                      padding: "8px",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "var(--surface-10)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                    aria-label="Switch organization or workspace"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm font-semibold"
                      style={{
                        backgroundColor: "var(--primary-10)",
                        color: "var(--primary-50)",
                      }}
                    >
                      {currentOrg?.icon || "O"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-sm font-medium truncate"
                        style={{ color: "var(--text-default)" }}
                      >
                        {currentOrg?.name || "Organization"}
                      </div>
                      <div
                        className="text-xs truncate"
                        style={{ color: "var(--text-subdued-1)" }}
                      >
                        {currentTenant?.name || "Workspace"}
                      </div>
                    </div>
                    <ChevronsUpDown
                      size={14}
                      style={{ color: "var(--text-subdued-2)", flexShrink: 0 }}
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuLabel
                    className="text-xs"
                    style={{ color: "var(--text-subdued-2)" }}
                  >
                    Organization
                  </DropdownMenuLabel>
                  {organizations.length > 1 && (
                    <>
                      <DropdownMenuItem onClick={handleSwitchOrg}>
                        <Building2 size={16} className="mr-2" />
                        Switch Organization
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuLabel
                    className="text-xs"
                    style={{ color: "var(--text-subdued-2)" }}
                  >
                    Workspace
                  </DropdownMenuLabel>
                  <DropdownMenuItem onClick={handleSwitchTenant}>
                    <ChevronsUpDown size={16} className="mr-2" />
                    Switch Workspace
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* ── Scrollable navigation area ──────────────────────────── */}
          <ScrollArea className="flex-1">
            <div
              className="flex flex-col"
              style={{ padding: collapsed ? "8px" : "8px" }}
            >
              {/* ── Search ──────────────────────────────────────────── */}
              {collapsed ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setCommandOpen(true)}
                      className="flex items-center justify-center w-10 h-9 rounded-lg transition-colors duration-200 mx-auto"
                      style={{
                        backgroundColor: "transparent",
                        color: "var(--text-subdued-1)",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "var(--surface-10)";
                        e.currentTarget.style.color = "var(--text-default)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "var(--text-subdued-1)";
                      }}
                      aria-label="Search (Command+K)"
                    >
                      <Search size={18} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Search</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <button
                  onClick={() => setCommandOpen(true)}
                  className="flex items-center gap-2 rounded-lg transition-colors duration-200 w-full"
                  style={{
                    padding: "6px 10px",
                    height: 36,
                    backgroundColor: "var(--surface-10)",
                    color: "var(--text-subdued-2)",
                    fontSize: "13px",
                    border: "1px solid var(--grey-30)",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--surface-20)";
                    e.currentTarget.style.borderColor = "var(--grey-50)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--surface-10)";
                    e.currentTarget.style.borderColor = "var(--grey-30)";
                  }}
                  aria-label="Search (Command+K)"
                >
                  <Search size={14} style={{ flexShrink: 0 }} />
                  <span className="flex-1">Search...</span>
                  <kbd
                    className="text-[10px] font-medium rounded px-1.5 py-0.5"
                    style={{
                      backgroundColor: "var(--surface-0)",
                      color: "var(--text-subdued-2)",
                      border: "1px solid var(--grey-30)",
                    }}
                  >
                    {"\u2318"}K
                  </kbd>
                </button>
              )}

              {/* ── Quick Actions ───────────────────────────────────── */}
              <div style={{ marginTop: "8px" }}>
                {collapsed ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            className="flex items-center justify-center w-10 h-9 rounded-lg transition-colors duration-200 mx-auto"
                            style={{
                              backgroundColor: "transparent",
                              color: "var(--text-subdued-1)",
                              border: "none",
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "var(--primary-10)";
                              e.currentTarget.style.color = "var(--primary-50)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                              e.currentTarget.style.color =
                                "var(--text-subdued-1)";
                            }}
                            aria-label="Create new"
                          >
                            <Plus size={18} />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          side="right"
                          align="start"
                          className="w-48"
                        >
                          <DropdownMenuItem>
                            <FileText size={16} className="mr-2" />
                            New Record
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Database size={16} className="mr-2" />
                            New Object
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Zap size={16} className="mr-2" />
                            New Workflow
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Create New</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="flex items-center gap-2 rounded-lg transition-colors duration-200 w-full"
                        style={{
                          padding: "8px 12px",
                          backgroundColor: "transparent",
                          color: "var(--text-subdued-1)",
                          fontSize: "14px",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "var(--primary-10)";
                          e.currentTarget.style.color = "var(--primary-50)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "var(--text-subdued-1)";
                        }}
                        aria-label="Create new"
                      >
                        <Plus size={18} style={{ flexShrink: 0 }} />
                        <span>Create New</span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      <DropdownMenuItem>
                        <FileText size={16} className="mr-2" />
                        New Record
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Database size={16} className="mr-2" />
                        New Object
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Zap size={16} className="mr-2" />
                        New Workflow
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              <SidebarDivider />

              {/* ── Favorites ───────────────────────────────────────── */}
              {!collapsed && favorites.length > 0 && (
                <div style={{ marginTop: "12px" }}>
                  <Collapsible
                    open={favoritesOpen}
                    onOpenChange={setFavoritesOpen}
                  >
                    <CollapsibleTrigger asChild>
                      <button
                        className="flex items-center justify-between w-full group"
                        style={{
                          padding: "4px 12px",
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                        }}
                        aria-label={
                          favoritesOpen
                            ? "Collapse favorites"
                            : "Expand favorites"
                        }
                      >
                        <span
                          className="text-[11px] font-semibold uppercase tracking-wide select-none"
                          style={{
                            color: "var(--text-subdued-2)",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Favorites
                        </span>
                        <ChevronDown
                          size={14}
                          className={cn(
                            "transition-transform duration-200",
                            !favoritesOpen && "-rotate-90",
                          )}
                          style={{ color: "var(--text-subdued-2)" }}
                        />
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div
                        className="flex flex-col"
                        style={{ gap: "2px", marginTop: "4px" }}
                      >
                        {favorites.map((fav) => (
                          <button
                            key={fav.id}
                            onClick={() => navigate(fav.path)}
                            className="flex items-center gap-3 rounded-lg transition-colors duration-200 w-full"
                            style={{
                              padding: "6px 12px",
                              paddingLeft: "14px",
                              backgroundColor: "transparent",
                              color: "var(--text-subdued-1)",
                              fontSize: "13px",
                              border: "none",
                              cursor: "pointer",
                              textAlign: "left",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "var(--surface-10)";
                              e.currentTarget.style.color =
                                "var(--text-default)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                              e.currentTarget.style.color =
                                "var(--text-subdued-1)";
                            }}
                            aria-label={fav.label}
                          >
                            <Star size={14} style={{ flexShrink: 0 }} />
                            <span className="truncate">{fav.label}</span>
                          </button>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              )}

              <SidebarDivider />

              {/* ── Main Navigation ─────────────────────────────────── */}
              <nav
                className="flex flex-col"
                style={{ gap: "2px", marginTop: "12px" }}
                aria-label="Main navigation"
              >
                {/* Dashboard */}
                <NavButton
                  label="Dashboard"
                  icon={<LayoutDashboard size={18} />}
                  isActive={isActiveRoute(`${basePath}/dashboard`)}
                  collapsed={collapsed}
                  onClick={() => navigate(`${basePath}/dashboard`)}
                />

                {/* Inbox */}
                <NavButton
                  label="Inbox"
                  icon={<MessageSquare size={18} />}
                  isActive={isActiveRoute(`${basePath}/conversations`)}
                  collapsed={collapsed}
                  onClick={() => navigate(`${basePath}/conversations`)}
                  badge={unreadCount > 0 ? unreadCount : undefined}
                />
              </nav>

              <SidebarDivider />

              {/* ── Objects Section ──────────────────────────────────── */}
              <div style={{ marginTop: "12px" }}>
                {collapsed ? (
                  /* Collapsed: just show the Database icon */
                  <NavButton
                    label="Objects"
                    icon={<Database size={18} />}
                    isActive={isActiveRoute(`${basePath}/objects`)}
                    collapsed
                    onClick={() => navigate(`${basePath}/objects`)}
                  />
                ) : (
                  <Collapsible open={objectsOpen} onOpenChange={setObjectsOpen}>
                    <div
                      className="flex items-center justify-between"
                      style={{ padding: "0 12px" }}
                    >
                      <CollapsibleTrigger asChild>
                        <button
                          className="flex items-center gap-1 group"
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            cursor: "pointer",
                            padding: "4px 0",
                          }}
                          aria-label={
                            objectsOpen ? "Collapse objects" : "Expand objects"
                          }
                        >
                          <ChevronDown
                            size={14}
                            className={cn(
                              "transition-transform duration-200",
                              !objectsOpen && "-rotate-90",
                            )}
                            style={{ color: "var(--text-subdued-2)" }}
                          />
                          <span
                            className="text-[11px] font-semibold uppercase tracking-wide select-none"
                            style={{
                              color: "var(--text-subdued-2)",
                              letterSpacing: "0.5px",
                            }}
                          >
                            Objects
                          </span>
                        </button>
                      </CollapsibleTrigger>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            className="flex items-center justify-center w-5 h-5 rounded transition-colors duration-200"
                            style={{
                              backgroundColor: "transparent",
                              color: "var(--text-subdued-2)",
                              border: "none",
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "var(--surface-10)";
                              e.currentTarget.style.color =
                                "var(--text-default)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                              e.currentTarget.style.color =
                                "var(--text-subdued-2)";
                            }}
                            aria-label="Create new object"
                          >
                            <Plus size={14} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>Create new object</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <CollapsibleContent>
                      <div
                        className="flex flex-col"
                        style={{ gap: "2px", marginTop: "4px" }}
                      >
                        {objectsList.map((obj) => (
                          <NavButton
                            key={obj.id}
                            label={obj.name}
                            icon={getObjectIcon(obj.icon)}
                            isActive={isActiveRoute(
                              `${basePath}/objects/${obj.id}`,
                            )}
                            collapsed={collapsed}
                            onClick={() =>
                              navigate(`${basePath}/objects/${obj.id}`)
                            }
                            badge={formatCount(obj.recordCount)}
                            indent
                          />
                        ))}
                        {/* Add Object link */}
                        <button
                          onClick={() => navigate(`${basePath}/objects`)}
                          className="flex items-center gap-3 rounded-lg transition-colors duration-200 w-full"
                          style={{
                            padding: "6px 12px",
                            paddingLeft: "28px",
                            backgroundColor: "transparent",
                            color: "var(--text-subdued-2)",
                            fontSize: "13px",
                            border: "none",
                            cursor: "pointer",
                            textAlign: "left",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "var(--surface-10)";
                            e.currentTarget.style.color = "var(--primary-50)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                            e.currentTarget.style.color =
                              "var(--text-subdued-2)";
                          }}
                          aria-label="Add a new object"
                        >
                          <Plus size={14} style={{ flexShrink: 0 }} />
                          <span>Add Object</span>
                        </button>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </div>

              <SidebarDivider />

              {/* ── Workflows ───────────────────────────────────────── */}
              <div style={{ marginTop: "12px" }}>
                <NavButton
                  label="Workflows"
                  icon={<Workflow size={18} />}
                  isActive={isActiveRoute(`${basePath}/workflows`)}
                  collapsed={collapsed}
                  onClick={() => navigate(`${basePath}/workflows`)}
                />
              </div>
            </div>
          </ScrollArea>

          {/* ── Bottom Section ──────────────────────────────────────── */}
          <div
            className="shrink-0"
            style={{ borderTop: "1px solid var(--grey-40)" }}
          >
            {/* Settings */}
            <div style={{ padding: collapsed ? "8px" : "8px" }}>
              <NavButton
                label="Settings"
                icon={<Settings size={18} />}
                isActive={isActiveRoute(`${basePath}/settings`)}
                collapsed={collapsed}
                onClick={() => navigate(`${basePath}/settings`)}
              />
            </div>

            {/* Collapse toggle */}
            <div
              className="flex items-center"
              style={{ padding: collapsed ? "0 8px 8px" : "0 8px 8px" }}
            >
              {collapsed ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setCollapsed(false)}
                      className="flex items-center justify-center w-10 h-9 rounded-lg transition-colors duration-200 mx-auto"
                      style={{
                        backgroundColor: "transparent",
                        color: "var(--text-subdued-1)",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "var(--surface-10)";
                        e.currentTarget.style.color = "var(--text-default)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "var(--text-subdued-1)";
                      }}
                      aria-label="Expand sidebar"
                    >
                      <PanelLeft size={18} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Expand sidebar</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <button
                  onClick={() => setCollapsed(true)}
                  className="flex items-center gap-3 rounded-lg transition-colors duration-200 w-full"
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "transparent",
                    color: "var(--text-subdued-2)",
                    fontSize: "13px",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--surface-10)";
                    e.currentTarget.style.color = "var(--text-default)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--text-subdued-2)";
                  }}
                  aria-label="Collapse sidebar"
                >
                  <PanelLeftClose size={18} style={{ flexShrink: 0 }} />
                  <span>Collapse</span>
                </button>
              )}
            </div>

            {/* User profile */}
            <div
              style={{
                padding: collapsed ? "8px" : "8px 12px",
                borderTop: "1px solid var(--grey-40)",
              }}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {collapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className="flex items-center justify-center mx-auto"
                          style={{
                            border: "none",
                            cursor: "pointer",
                            backgroundColor: "transparent",
                            padding: "4px",
                          }}
                          aria-label="User menu"
                        >
                          <Avatar className="h-8 w-8">
                            {user?.avatarUrl && (
                              <AvatarImage src={user.avatarUrl} />
                            )}
                            <AvatarFallback
                              style={{
                                backgroundColor: "var(--primary-10)",
                                color: "var(--primary-50)",
                                fontSize: "12px",
                                fontWeight: 600,
                              }}
                            >
                              {user ? getInitials(user.name) : "U"}
                            </AvatarFallback>
                          </Avatar>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{user?.name || "User"}</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <button
                      className="flex items-center gap-3 w-full rounded-lg transition-colors duration-200"
                      style={{
                        padding: "8px",
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "var(--surface-10)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                      aria-label="User menu"
                    >
                      <Avatar className="h-8 w-8">
                        {user?.avatarUrl && (
                          <AvatarImage src={user.avatarUrl} />
                        )}
                        <AvatarFallback
                          style={{
                            backgroundColor: "var(--primary-10)",
                            color: "var(--primary-50)",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}
                        >
                          {user ? getInitials(user.name) : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-sm font-medium truncate"
                          style={{ color: "var(--text-default)" }}
                        >
                          {user?.name || "User"}
                        </div>
                        <div
                          className="text-xs truncate"
                          style={{ color: "var(--text-subdued-1)" }}
                        >
                          {user?.email || "user@example.com"}
                        </div>
                      </div>
                    </button>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align={collapsed ? "center" : "start"}
                  side="top"
                  className="w-56"
                >
                  <div
                    className="px-3 py-2"
                    style={{ color: "var(--text-subdued-1)" }}
                  >
                    <p
                      className="text-sm font-medium"
                      style={{ color: "var(--text-default)" }}
                    >
                      {user?.name}
                    </p>
                    <p className="text-xs">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User size={16} className="mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate(`${basePath}/settings`)}
                  >
                    <Settings size={16} className="mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut size={16} className="mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </aside>

        {/* Main content area */}
        <div
          className="flex flex-col transition-all duration-200 ease-in-out"
          style={{
            marginLeft: sidebarWidth,
            width: `calc(100vw - ${sidebarWidth}px)`,
            height: "100vh",
            overflow: "hidden",
          }}
        >
          {/* Top header bar */}
          <header
            className="shrink-0 flex items-center justify-between"
            style={{
              height: 56,
              padding: "0 24px",
              backgroundColor: "var(--surface-0)",
              borderBottom: "1px solid var(--grey-40)",
            }}
          >
            <div>{/* Breadcrumb area */}</div>
            <div className="flex items-center gap-3">
              {/* Placeholder for notifications, etc. */}
            </div>
          </header>

          {/* Page content */}
          <main
            className="flex-1 min-h-0"
            style={{
              padding: "24px",
              overflow: "auto",
            }}
            id="main-content"
          >
            <Outlet />
          </main>
        </div>
      </div>

      {/* ── Command Palette (⌘K) ────────────────────────────── */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Search pages, objects, actions..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem
              onSelect={() => {
                navigate(`${basePath}/dashboard`);
                setCommandOpen(false);
              }}
            >
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                navigate(`${basePath}/conversations`);
                setCommandOpen(false);
              }}
            >
              <MessageSquare size={16} />
              <span>Inbox</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                navigate(`${basePath}/workflows`);
                setCommandOpen(false);
              }}
            >
              <Workflow size={16} />
              <span>Workflows</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                navigate(`${basePath}/settings`);
                setCommandOpen(false);
              }}
            >
              <Settings size={16} />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Objects">
            {objectsList.map((obj) => (
              <CommandItem
                key={obj.id}
                onSelect={() => {
                  navigate(`${basePath}/objects/${obj.id}`);
                  setCommandOpen(false);
                }}
              >
                {getObjectIcon(obj.icon, 16)}
                <span>{obj.name}</span>
                <span
                  className="ml-auto text-xs"
                  style={{ color: "var(--text-subdued-2)" }}
                >
                  {formatCount(obj.recordCount)} records
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </TooltipProvider>
  );
}
