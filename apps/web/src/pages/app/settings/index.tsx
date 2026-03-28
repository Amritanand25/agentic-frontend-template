import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Separator,
  Avatar,
  AvatarFallback,
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@repo/ui";
import { cn } from "@repo/utils";
import {
  Settings,
  Users,
  CreditCard,
  Plug,
  Code,
  Shield,
  Trash2,
  UserPlus,
  Mail,
  MoreVertical,
  Palette,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useTheme, type Theme } from "@/contexts/theme-context";

// ─── Types ──────────────────────────────────────────────────────────────────

type SettingsSection =
  | "general"
  | "members"
  | "billing"
  | "integrations"
  | "api";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: "admin" | "member" | "viewer";
  avatarColor: string;
  lastActive: string;
}

interface SideNavItem {
  id: SettingsSection;
  label: string;
  icon: React.ReactNode;
  description: string;
}

// ─── Mock Data ──────────────────────────────────────────────────────────────

const sideNavItems: SideNavItem[] = [
  {
    id: "general",
    label: "General",
    icon: <Settings size={18} />,
    description: "Workspace settings",
  },
  {
    id: "members",
    label: "Members",
    icon: <Users size={18} />,
    description: "Team management",
  },
  {
    id: "billing",
    label: "Billing",
    icon: <CreditCard size={18} />,
    description: "Plans and payments",
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: <Plug size={18} />,
    description: "Connected apps",
  },
  {
    id: "api",
    label: "API",
    icon: <Code size={18} />,
    description: "API keys and webhooks",
  },
];

const teamMembers: TeamMember[] = [
  {
    id: "user_1",
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    initials: "SC",
    role: "admin",
    avatarColor: "var(--primary-50)",
    lastActive: "Active now",
  },
  {
    id: "user_2",
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    initials: "MJ",
    role: "member",
    avatarColor: "var(--success-50)",
    lastActive: "2 hours ago",
  },
  {
    id: "user_3",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    initials: "ED",
    role: "member",
    avatarColor: "var(--warning-50)",
    lastActive: "1 day ago",
  },
  {
    id: "user_4",
    name: "James Wilson",
    email: "james.wilson@company.com",
    initials: "JW",
    role: "viewer",
    avatarColor: "var(--tertiary-50)",
    lastActive: "3 days ago",
  },
];

const themes = [
  {
    id: "falcon",
    name: "Falcon",
    color: "var(--primary-50)",
    description: "Blue theme",
  },
  {
    id: "phoenix",
    name: "Phoenix",
    color: "#8B5CF6",
    description: "Purple theme",
  },
  { id: "jarvis", name: "Jarvis", color: "#14B8A6", description: "Teal theme" },
];

const timezones = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Asia/Kolkata",
  "Australia/Sydney",
];

// ─── Helpers ────────────────────────────────────────────────────────────────

function getRoleColor(role: TeamMember["role"]): {
  bg: string;
  text: string;
  border: string;
} {
  const colors: Record<
    TeamMember["role"],
    { bg: string; text: string; border: string }
  > = {
    admin: {
      bg: "var(--primary-10)",
      text: "var(--primary-60)",
      border: "var(--primary-30)",
    },
    member: {
      bg: "var(--success-10)",
      text: "var(--success-60)",
      border: "var(--success-30)",
    },
    viewer: {
      bg: "var(--surface-10)",
      text: "var(--text-subdued-1)",
      border: "var(--grey-40)",
    },
  };
  return colors[role];
}

function getRoleLabel(role: TeamMember["role"]): string {
  return role.charAt(0).toUpperCase() + role.slice(1);
}

// ─── General Section ────────────────────────────────────────────────────────

function GeneralSection() {
  const [workspaceName, setWorkspaceName] = useState("Sales Team");
  const { theme: selectedTheme, setTheme } = useTheme();
  const [selectedTimezone, setSelectedTimezone] = useState("America/New_York");

  return (
    <div className="space-y-8">
      {/* Workspace Info */}
      <Card
        style={{
          backgroundColor: "var(--surface-0)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <CardHeader>
          <CardTitle
            className="text-base font-semibold"
            style={{ color: "var(--text-default)" }}
          >
            Workspace Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Workspace name */}
          <div className="space-y-2">
            <Label
              className="text-sm font-medium"
              style={{ color: "var(--text-default)" }}
            >
              Workspace Name
            </Label>
            <Input
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              style={{
                backgroundColor: "var(--surface-0)",
                border: "1px solid var(--grey-40)",
                color: "var(--text-default)",
              }}
              aria-label="Workspace name"
            />
          </div>

          {/* Workspace URL */}
          <div className="space-y-2">
            <Label
              className="text-sm font-medium"
              style={{ color: "var(--text-default)" }}
            >
              Workspace URL
            </Label>
            <div
              className="flex items-center rounded-md overflow-hidden"
              style={{ border: "1px solid var(--grey-40)" }}
            >
              <span
                className="px-3 py-2 text-sm shrink-0"
                style={{
                  backgroundColor: "var(--surface-10)",
                  color: "var(--text-subdued-1)",
                  borderRight: "1px solid var(--grey-40)",
                }}
              >
                app.relio.com/
              </span>
              <input
                type="text"
                value="sales-team"
                readOnly
                className="flex-1 px-3 py-2 text-sm bg-transparent outline-none"
                style={{ color: "var(--text-default)" }}
                aria-label="Workspace URL slug"
              />
            </div>
            <p className="text-xs" style={{ color: "var(--text-subdued-2)" }}>
              This is your workspace URL slug. Changing it will update all
              shared links.
            </p>
          </div>

          <Button
            size="sm"
            style={{
              backgroundColor: "var(--primary-50)",
              color: "var(--text-inverse)",
            }}
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Theme */}
      <Card
        style={{
          backgroundColor: "var(--surface-0)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette size={18} style={{ color: "var(--text-subdued-1)" }} />
            <CardTitle
              className="text-base font-semibold"
              style={{ color: "var(--text-default)" }}
            >
              Theme
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setTheme(theme.id as Theme)}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-lg transition-all duration-200",
                )}
                style={{
                  border:
                    selectedTheme === theme.id
                      ? `2px solid ${theme.color}`
                      : "2px solid var(--grey-40)",
                  backgroundColor:
                    selectedTheme === theme.id
                      ? `color-mix(in srgb, ${theme.color} 8%, transparent)`
                      : "var(--surface-0)",
                  cursor: "pointer",
                }}
                aria-pressed={selectedTheme === theme.id}
              >
                <div
                  className="w-8 h-8 rounded-full shrink-0"
                  style={{ backgroundColor: theme.color }}
                />
                <div className="text-left">
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--text-default)" }}
                  >
                    {theme.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-subdued-2)" }}
                  >
                    {theme.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timezone */}
      <Card
        style={{
          backgroundColor: "var(--surface-0)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock size={18} style={{ color: "var(--text-subdued-1)" }} />
            <CardTitle
              className="text-base font-semibold"
              style={{ color: "var(--text-default)" }}
            >
              Timezone
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label
              className="text-sm font-medium"
              style={{ color: "var(--text-default)" }}
            >
              Default Timezone
            </Label>
            <Select
              value={selectedTimezone}
              onValueChange={setSelectedTimezone}
            >
              <SelectTrigger
                className="w-full max-w-sm"
                style={{
                  backgroundColor: "var(--surface-0)",
                  border: "1px solid var(--grey-40)",
                  color: "var(--text-default)",
                }}
                aria-label="Select timezone"
              >
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz.replace(/_/g, " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs" style={{ color: "var(--text-subdued-2)" }}>
              All dates and times in the workspace will use this timezone
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card
        style={{
          backgroundColor: "var(--surface-0)",
          border: "1px solid var(--error-30)",
        }}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield size={18} style={{ color: "var(--error-50)" }} />
            <CardTitle
              className="text-base font-semibold"
              style={{ color: "var(--error-50)" }}
            >
              Danger Zone
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--text-default)" }}
              >
                Delete Workspace
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "var(--text-subdued-1)" }}
              >
                Permanently delete this workspace and all associated data. This
                action cannot be undone.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              style={{
                borderColor: "var(--error-40)",
                color: "var(--error-50)",
              }}
            >
              <Trash2 size={14} className="mr-2" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Members Section ────────────────────────────────────────────────────────

function MembersSection() {
  return (
    <div className="space-y-6">
      {/* Header with invite button */}
      <Card
        style={{
          backgroundColor: "var(--surface-0)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle
                className="text-base font-semibold"
                style={{ color: "var(--text-default)" }}
              >
                Team Members
              </CardTitle>
              <p
                className="text-sm mt-1"
                style={{ color: "var(--text-subdued-1)" }}
              >
                Manage who has access to this workspace
              </p>
            </div>
            <Button
              size="sm"
              style={{
                backgroundColor: "var(--primary-50)",
                color: "var(--text-inverse)",
              }}
            >
              <UserPlus size={14} className="mr-2" />
              Invite Member
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Invite by email */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "var(--text-subdued-2)" }}
              />
              <Input
                placeholder="Enter email addresses..."
                className="pl-9"
                style={{
                  backgroundColor: "var(--surface-0)",
                  border: "1px solid var(--grey-40)",
                  color: "var(--text-default)",
                }}
                aria-label="Invite by email"
              />
            </div>
            <Select defaultValue="member">
              <SelectTrigger
                className="h-9 w-[120px] shrink-0"
                style={{
                  backgroundColor: "var(--surface-0)",
                  border: "1px solid var(--grey-40)",
                  color: "var(--text-default)",
                }}
                aria-label="Select role for invite"
              >
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              Send Invite
            </Button>
          </div>

          <Separator style={{ backgroundColor: "var(--grey-30)" }} />

          {/* Members list */}
          <div className="mt-4 space-y-1">
            {teamMembers.map((member, index) => {
              const roleColors = getRoleColor(member.role);
              return (
                <div key={member.id}>
                  <div className="flex items-center gap-4 py-3">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarFallback
                        style={{
                          backgroundColor: member.avatarColor,
                          color: "white",
                          fontSize: "13px",
                          fontWeight: 600,
                        }}
                      >
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p
                          className="text-sm font-medium truncate"
                          style={{ color: "var(--text-default)" }}
                        >
                          {member.name}
                        </p>
                        {member.role === "admin" && (
                          <Shield
                            size={12}
                            style={{ color: "var(--primary-50)" }}
                          />
                        )}
                      </div>
                      <p
                        className="text-xs truncate"
                        style={{ color: "var(--text-subdued-1)" }}
                      >
                        {member.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs shrink-0"
                        style={{ color: "var(--text-subdued-2)" }}
                      >
                        {member.lastActive}
                      </span>
                      <span
                        className="inline-flex items-center text-[11px] font-medium rounded-full px-2.5 py-0.5"
                        style={{
                          backgroundColor: roleColors.bg,
                          color: roleColors.text,
                          border: `1px solid ${roleColors.border}`,
                        }}
                      >
                        {getRoleLabel(member.role)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label={`More options for ${member.name}`}
                        style={{ color: "var(--text-subdued-1)" }}
                      >
                        <MoreVertical size={16} />
                      </Button>
                    </div>
                  </div>
                  {index < teamMembers.length - 1 && (
                    <Separator style={{ backgroundColor: "var(--grey-30)" }} />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Roles & Permissions info */}
      <Card
        style={{
          backgroundColor: "var(--surface-0)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <CardHeader>
          <CardTitle
            className="text-base font-semibold"
            style={{ color: "var(--text-default)" }}
          >
            Roles & Permissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                role: "Admin" as const,
                desc: "Full access to workspace settings, billing, member management, and all data",
                badge: "admin" as const,
              },
              {
                role: "Member" as const,
                desc: "Can create, edit, and delete records. Cannot manage workspace settings or billing",
                badge: "member" as const,
              },
              {
                role: "Viewer" as const,
                desc: "Read-only access to records and reports. Cannot create, edit, or delete data",
                badge: "viewer" as const,
              },
            ].map((item) => {
              const colors = getRoleColor(item.badge);
              return (
                <div
                  key={item.role}
                  className="flex items-start gap-3 p-3 rounded-lg"
                  style={{ backgroundColor: "var(--surface-10)" }}
                >
                  <span
                    className="inline-flex items-center text-[11px] font-medium rounded-full px-2.5 py-0.5 shrink-0 mt-0.5"
                    style={{
                      backgroundColor: colors.bg,
                      color: colors.text,
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    {item.role}
                  </span>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--text-subdued-1)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Placeholder Section ────────────────────────────────────────────────────

function PlaceholderSection({ section }: { section: SideNavItem }) {
  return (
    <Card
      style={{
        backgroundColor: "var(--surface-0)",
        border: "1px solid var(--grey-40)",
      }}
    >
      <CardContent className="py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <div
            className="p-4 rounded-full mb-4"
            style={{ backgroundColor: "var(--surface-10)" }}
          >
            <span style={{ color: "var(--text-subdued-2)" }}>
              {section.icon}
            </span>
          </div>
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: "var(--text-default)" }}
          >
            {section.label}
          </h3>
          <p
            className="text-sm max-w-md"
            style={{ color: "var(--text-subdued-1)" }}
          >
            {section.description} configuration will be available here. This
            section is currently being built.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Settings Page ──────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("general");

  const currentNav = sideNavItems.find((item) => item.id === activeSection);

  const renderContent = () => {
    switch (activeSection) {
      case "general":
        return <GeneralSection />;
      case "members":
        return <MembersSection />;
      default:
        return currentNav ? <PlaceholderSection section={currentNav} /> : null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1
          className="text-2xl font-semibold"
          style={{ color: "var(--text-default)" }}
        >
          Settings
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-subdued-1)" }}>
          Manage your workspace settings and preferences
        </p>
      </div>

      {/* Settings layout: sidebar + content */}
      <div className="flex gap-6" style={{ minHeight: "calc(100vh - 220px)" }}>
        {/* Settings sidebar */}
        <nav
          className="shrink-0 space-y-1"
          style={{ width: 240 }}
          aria-label="Settings navigation"
        >
          {sideNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "flex items-center gap-3 w-full rounded-lg transition-colors duration-200 text-left",
              )}
              style={{
                padding: "10px 12px",
                backgroundColor:
                  activeSection === item.id
                    ? "var(--primary-10)"
                    : "transparent",
                color:
                  activeSection === item.id
                    ? "var(--primary-50)"
                    : "var(--text-subdued-1)",
                fontWeight: activeSection === item.id ? 500 : 400,
                fontSize: "14px",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                if (activeSection !== item.id) {
                  e.currentTarget.style.backgroundColor = "var(--surface-10)";
                  e.currentTarget.style.color = "var(--text-default)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== item.id) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--text-subdued-1)";
                }
              }}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              <span className="shrink-0">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {activeSection === item.id && (
                <ChevronRight
                  size={14}
                  style={{ color: "var(--primary-40)" }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Content area */}
        <div className="flex-1 min-w-0">{renderContent()}</div>
      </div>
    </div>
  );
}
