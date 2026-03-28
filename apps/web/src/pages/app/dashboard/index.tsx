import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Avatar,
  AvatarFallback,
  Separator,
} from "@repo/ui";
import { cn } from "@repo/utils";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  BarChart3,
  Calendar,
  ArrowUpRight,
  FileText,
  Handshake,
  UserPlus,
  Clock,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

type DateRange = "today" | "7d" | "30d" | "90d";

interface KPIData {
  id: string;
  label: string;
  value: string;
  trend: "up" | "down";
  trendValue: string;
  comparisonText: string;
  icon: React.ReactNode;
}

interface DealStage {
  name: string;
  count: number;
  value: string;
  color: string;
  percentage: number;
}

interface RevenueMonth {
  month: string;
  value: number;
}

interface ActivityItem {
  id: string;
  user: string;
  initials: string;
  action: string;
  target: string;
  timestamp: string;
  icon: React.ReactNode;
  iconColor: string;
  iconBg: string;
}

// ─── Mock Data ──────────────────────────────────────────────────────────────

const mockKPIs: KPIData[] = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: "$1.2M",
    trend: "up",
    trendValue: "+12%",
    comparisonText: "vs last month",
    icon: <DollarSign size={20} />,
  },
  {
    id: "deals",
    label: "Active Deals",
    value: "45",
    trend: "down",
    trendValue: "-3",
    comparisonText: "vs last month",
    icon: <Target size={20} />,
  },
  {
    id: "leads",
    label: "New Leads",
    value: "128",
    trend: "up",
    trendValue: "+24",
    comparisonText: "vs last month",
    icon: <Users size={20} />,
  },
  {
    id: "conversion",
    label: "Win Rate",
    value: "68%",
    trend: "up",
    trendValue: "+5%",
    comparisonText: "vs last quarter",
    icon: <BarChart3 size={20} />,
  },
];

const dealStages: DealStage[] = [
  {
    name: "Qualification",
    count: 12,
    value: "$180K",
    color: "var(--primary-50)",
    percentage: 100,
  },
  {
    name: "Proposal",
    count: 8,
    value: "$320K",
    color: "var(--primary-40)",
    percentage: 75,
  },
  {
    name: "Negotiation",
    count: 6,
    value: "$450K",
    color: "var(--warning-50)",
    percentage: 55,
  },
  {
    name: "Closed Won",
    count: 15,
    value: "$890K",
    color: "var(--success-50)",
    percentage: 45,
  },
  {
    name: "Closed Lost",
    count: 4,
    value: "$120K",
    color: "var(--error-50)",
    percentage: 20,
  },
];

const revenueData: RevenueMonth[] = [
  { month: "Oct", value: 65000 },
  { month: "Nov", value: 78000 },
  { month: "Dec", value: 92000 },
  { month: "Jan", value: 85000 },
  { month: "Feb", value: 110000 },
  { month: "Mar", value: 125000 },
];

const recentActivities: ActivityItem[] = [
  {
    id: "a1",
    user: "Sarah Chen",
    initials: "SC",
    action: "created contact",
    target: "Acme Inc",
    timestamp: "2 min ago",
    icon: <UserPlus size={14} />,
    iconColor: "var(--success-50)",
    iconBg: "var(--success-10)",
  },
  {
    id: "a2",
    user: "Mike Johnson",
    initials: "MJ",
    action: "closed deal",
    target: "Enterprise Plan - $50K",
    timestamp: "15 min ago",
    icon: <Handshake size={14} />,
    iconColor: "var(--primary-50)",
    iconBg: "var(--primary-10)",
  },
  {
    id: "a3",
    user: "Emily Davis",
    initials: "ED",
    action: "sent proposal to",
    target: "TechCorp Solutions",
    timestamp: "1 hour ago",
    icon: <FileText size={14} />,
    iconColor: "var(--warning-50)",
    iconBg: "var(--warning-10)",
  },
  {
    id: "a4",
    user: "James Wilson",
    initials: "JW",
    action: "scheduled meeting with",
    target: "GlobalTech CEO",
    timestamp: "2 hours ago",
    icon: <Calendar size={14} />,
    iconColor: "var(--tertiary-50)",
    iconBg: "var(--tertiary-10)",
  },
  {
    id: "a5",
    user: "Sarah Chen",
    initials: "SC",
    action: "moved deal to Negotiation",
    target: "Startup XYZ - $25K",
    timestamp: "3 hours ago",
    icon: <ArrowUpRight size={14} />,
    iconColor: "var(--primary-50)",
    iconBg: "var(--primary-10)",
  },
  {
    id: "a6",
    user: "Mike Johnson",
    initials: "MJ",
    action: "added note on",
    target: "InnovateCo",
    timestamp: "5 hours ago",
    icon: <FileText size={14} />,
    iconColor: "var(--text-subdued-1)",
    iconBg: "var(--surface-10)",
  },
];

// ─── KPI Card Component ─────────────────────────────────────────────────────

function KPICard({ kpi }: { kpi: KPIData }) {
  return (
    <Card
      style={{
        backgroundColor: "var(--surface-0)",
        border: "1px solid var(--grey-40)",
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle
          className="text-sm font-medium"
          style={{ color: "var(--text-subdued-1)" }}
        >
          {kpi.label}
        </CardTitle>
        <div
          className="p-2 rounded-lg"
          style={{
            backgroundColor: "var(--primary-10)",
            color: "var(--primary-50)",
          }}
        >
          {kpi.icon}
        </div>
      </CardHeader>
      <CardContent>
        <div
          className="text-3xl font-bold tracking-tight"
          style={{ color: "var(--text-default)" }}
        >
          {kpi.value}
        </div>
        <div className="flex items-center gap-1 mt-2">
          {kpi.trend === "up" ? (
            <TrendingUp size={14} style={{ color: "var(--success-50)" }} />
          ) : (
            <TrendingDown size={14} style={{ color: "var(--error-50)" }} />
          )}
          <span
            className="text-sm font-semibold"
            style={{
              color:
                kpi.trend === "up" ? "var(--success-50)" : "var(--error-50)",
            }}
          >
            {kpi.trendValue}
          </span>
          <span className="text-xs" style={{ color: "var(--text-subdued-2)" }}>
            {kpi.comparisonText}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Revenue Trend Chart ────────────────────────────────────────────────────

function RevenueTrendChart({ data }: { data: RevenueMonth[] }) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <Card
      style={{
        backgroundColor: "var(--surface-0)",
        border: "1px solid var(--grey-40)",
      }}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle
            className="text-base font-semibold"
            style={{ color: "var(--text-default)" }}
          >
            Revenue Trend
          </CardTitle>
          <Badge variant="secondary" className="font-normal">
            Last 6 months
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-3" style={{ height: 200 }}>
          {data.map((item) => {
            const heightPercent = (item.value / maxValue) * 100;
            return (
              <div
                key={item.month}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--text-subdued-1)" }}
                >
                  ${(item.value / 1000).toFixed(0)}K
                </span>
                <div
                  className="w-full rounded-t-md transition-all duration-300"
                  style={{
                    height: `${heightPercent}%`,
                    minHeight: 8,
                    background: `linear-gradient(to top, var(--primary-50), var(--primary-30))`,
                    opacity: 0.9,
                  }}
                  role="img"
                  aria-label={`${item.month}: $${item.value.toLocaleString()}`}
                />
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--text-subdued-2)" }}
                >
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Deals by Stage ─────────────────────────────────────────────────────────

function DealsByStage({ stages }: { stages: DealStage[] }) {
  return (
    <Card
      style={{
        backgroundColor: "var(--surface-0)",
        border: "1px solid var(--grey-40)",
      }}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle
            className="text-base font-semibold"
            style={{ color: "var(--text-default)" }}
          >
            Deals by Stage
          </CardTitle>
          <Badge variant="secondary" className="font-normal">
            45 total
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stages.map((stage) => (
            <div key={stage.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: stage.color }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--text-default)" }}
                  >
                    {stage.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="text-sm font-semibold tabular-nums"
                    style={{ color: "var(--text-default)" }}
                  >
                    {stage.value}
                  </span>
                  <span
                    className="text-xs tabular-nums"
                    style={{
                      color: "var(--text-subdued-2)",
                      minWidth: 28,
                      textAlign: "right",
                    }}
                  >
                    {stage.count}
                  </span>
                </div>
              </div>
              <div
                className="h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: "var(--surface-10)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${stage.percentage}%`,
                    backgroundColor: stage.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Recent Activity ────────────────────────────────────────────────────────

function RecentActivity({ activities }: { activities: ActivityItem[] }) {
  return (
    <Card
      style={{
        backgroundColor: "var(--surface-0)",
        border: "1px solid var(--grey-40)",
      }}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle
            className="text-base font-semibold"
            style={{ color: "var(--text-default)" }}
          >
            Recent Activity
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            style={{ color: "var(--primary-50)" }}
          >
            View all
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {activities.map((activity, index) => (
            <div key={activity.id}>
              <div className="flex items-start gap-3 py-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback
                    style={{
                      backgroundColor: "var(--primary-10)",
                      color: "var(--primary-50)",
                      fontSize: "11px",
                      fontWeight: 600,
                    }}
                  >
                    {activity.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-default)" }}
                  >
                    <span className="font-semibold">{activity.user}</span>{" "}
                    <span style={{ color: "var(--text-subdued-1)" }}>
                      {activity.action}
                    </span>{" "}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock
                      size={12}
                      style={{ color: "var(--text-subdued-2)" }}
                    />
                    <span
                      className="text-xs"
                      style={{ color: "var(--text-subdued-2)" }}
                    >
                      {activity.timestamp}
                    </span>
                  </div>
                </div>
                <div
                  className="p-1.5 rounded-md shrink-0"
                  style={{
                    backgroundColor: activity.iconBg,
                    color: activity.iconColor,
                  }}
                >
                  {activity.icon}
                </div>
              </div>
              {index < activities.length - 1 && (
                <Separator style={{ backgroundColor: "var(--grey-30)" }} />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Dashboard Page ─────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState<DateRange>("30d");

  const dateRanges: { value: DateRange; label: string }[] = [
    { value: "today", label: "Today" },
    { value: "7d", label: "7D" },
    { value: "30d", label: "30D" },
    { value: "90d", label: "90D" },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-semibold"
            style={{ color: "var(--text-default)" }}
          >
            Dashboard
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-subdued-1)" }}
          >
            Overview of your workspace performance
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Date range selector */}
          <div
            className="flex items-center rounded-lg overflow-hidden"
            style={{
              border: "1px solid var(--grey-40)",
              backgroundColor: "var(--surface-0)",
            }}
            role="group"
            aria-label="Date range"
          >
            {dateRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setDateRange(range.value)}
                className={cn(
                  "text-sm font-medium transition-colors px-4 py-1.5",
                )}
                style={{
                  backgroundColor:
                    dateRange === range.value
                      ? "var(--primary-50)"
                      : "transparent",
                  color:
                    dateRange === range.value
                      ? "var(--text-inverse)"
                      : "var(--text-subdued-1)",
                  border: "none",
                  cursor: "pointer",
                }}
                aria-pressed={dateRange === range.value}
              >
                {range.label}
              </button>
            ))}
          </div>

          <Button variant="outline" size="sm">
            <Calendar size={14} className="mr-2" />
            Custom
          </Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        {mockKPIs.map((kpi) => (
          <KPICard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueTrendChart data={revenueData} />
        <DealsByStage stages={dealStages} />
      </div>

      {/* Recent Activity */}
      <RecentActivity activities={recentActivities} />
    </div>
  );
}
