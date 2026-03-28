import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, Button, Switch, Separator } from "@repo/ui";
import {
  Plus,
  Zap,
  Clock,
  Play,
  Pause,
  MoreVertical,
  Calendar,
  RefreshCw,
  Activity,
  ChevronRight,
  Search,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

type TriggerType = "record_created" | "record_updated" | "scheduled";
type WorkflowStatus = "active" | "paused";

interface WorkflowItem {
  id: string;
  name: string;
  description: string;
  trigger: TriggerType;
  status: WorkflowStatus;
  lastRun: string;
  runCount: number;
  actionCount: number;
  updatedAt: string;
}

// ─── Mock Data ──────────────────────────────────────────────────────────────

const mockWorkflows: WorkflowItem[] = [
  {
    id: "wf_1",
    name: "Lead Nurture Sequence",
    description:
      "Automatically send welcome emails and assign to sales team when a new lead is created",
    trigger: "record_created",
    status: "active",
    lastRun: "2 min ago",
    runCount: 234,
    actionCount: 4,
    updatedAt: "Mar 28, 2026",
  },
  {
    id: "wf_2",
    name: "Deal Stage Alert",
    description:
      "Notify team leads when deal value exceeds $50K or stage changes to Negotiation",
    trigger: "record_updated",
    status: "active",
    lastRun: "15 min ago",
    runCount: 89,
    actionCount: 2,
    updatedAt: "Mar 27, 2026",
  },
  {
    id: "wf_3",
    name: "Weekly Pipeline Report",
    description:
      "Generate and email pipeline summary to leadership team every Monday at 9am",
    trigger: "scheduled",
    status: "active",
    lastRun: "2 days ago",
    runCount: 12,
    actionCount: 3,
    updatedAt: "Mar 25, 2026",
  },
  {
    id: "wf_4",
    name: "Follow-up Reminder",
    description: "Create reminder task when deal has no activity for 7 days",
    trigger: "record_updated",
    status: "paused",
    lastRun: "5 days ago",
    runCount: 45,
    actionCount: 2,
    updatedAt: "Mar 23, 2026",
  },
  {
    id: "wf_5",
    name: "Welcome Email",
    description:
      "Send personalized welcome email and create onboarding tasks for new customers",
    trigger: "record_created",
    status: "active",
    lastRun: "1 hour ago",
    runCount: 567,
    actionCount: 5,
    updatedAt: "Mar 28, 2026",
  },
  {
    id: "wf_6",
    name: "Churn Risk Detection",
    description:
      "Flag accounts with declining engagement and alert account manager",
    trigger: "scheduled",
    status: "paused",
    lastRun: "1 week ago",
    runCount: 23,
    actionCount: 3,
    updatedAt: "Mar 20, 2026",
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

function getTriggerLabel(trigger: TriggerType): string {
  const labels: Record<TriggerType, string> = {
    record_created: "Record Created",
    record_updated: "Record Updated",
    scheduled: "Scheduled",
  };
  return labels[trigger];
}

function getTriggerIcon(trigger: TriggerType): React.ReactNode {
  const icons: Record<TriggerType, React.ReactNode> = {
    record_created: <Zap size={14} />,
    record_updated: <RefreshCw size={14} />,
    scheduled: <Calendar size={14} />,
  };
  return icons[trigger];
}

function getTriggerColor(trigger: TriggerType): {
  bg: string;
  text: string;
  border: string;
} {
  const colors: Record<
    TriggerType,
    { bg: string; text: string; border: string }
  > = {
    record_created: {
      bg: "var(--success-10)",
      text: "var(--success-60)",
      border: "var(--success-30)",
    },
    record_updated: {
      bg: "var(--warning-10)",
      text: "var(--warning-60)",
      border: "var(--warning-30)",
    },
    scheduled: {
      bg: "var(--primary-10)",
      text: "var(--primary-60)",
      border: "var(--primary-30)",
    },
  };
  return colors[trigger];
}

// ─── Stat Card ──────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Card
      style={{
        backgroundColor: "var(--surface-0)",
        border: "1px solid var(--grey-40)",
      }}
    >
      <CardContent className="py-4 px-5">
        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-xs font-medium uppercase tracking-wide"
              style={{ color: "var(--text-subdued-2)" }}
            >
              {label}
            </p>
            <p
              className="text-2xl font-bold mt-1 tabular-nums"
              style={{ color: "var(--text-default)" }}
            >
              {value}
            </p>
          </div>
          <div
            className="p-2.5 rounded-lg"
            style={{
              backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
              color,
            }}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Workflow Card ──────────────────────────────────────────────────────────

function WorkflowCard({
  workflow,
  onToggle,
}: {
  workflow: WorkflowItem;
  onToggle: (id: string) => void;
}) {
  const triggerColors = getTriggerColor(workflow.trigger);
  const isActive = workflow.status === "active";

  return (
    <Card
      className="transition-all duration-200 cursor-pointer group"
      style={{
        backgroundColor: "var(--surface-0)",
        border: "1px solid var(--grey-40)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--grey-50)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 2px 8px rgba(0,0,0,0.06)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--grey-40)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          {/* Status indicator */}
          <div
            className="mt-1 w-2.5 h-2.5 rounded-full shrink-0"
            style={{
              backgroundColor: isActive
                ? "var(--success-50)"
                : "var(--grey-50)",
            }}
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3
                  className="text-sm font-semibold truncate"
                  style={{ color: "var(--text-default)" }}
                >
                  {workflow.name}
                </h3>
                <p
                  className="text-xs mt-1 line-clamp-2"
                  style={{ color: "var(--text-subdued-1)" }}
                >
                  {workflow.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Switch
                  checked={isActive}
                  onCheckedChange={() => onToggle(workflow.id)}
                  aria-label={`Toggle ${workflow.name}`}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="More options"
                  style={{ color: "var(--text-subdued-1)" }}
                >
                  <MoreVertical size={16} />
                </Button>
              </div>
            </div>

            {/* Meta info */}
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              {/* Trigger badge */}
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-medium rounded-full px-2.5 py-1"
                style={{
                  backgroundColor: triggerColors.bg,
                  color: triggerColors.text,
                  border: `1px solid ${triggerColors.border}`,
                }}
              >
                {getTriggerIcon(workflow.trigger)}
                {getTriggerLabel(workflow.trigger)}
              </span>

              {/* Actions count */}
              <span
                className="inline-flex items-center gap-1 text-xs"
                style={{ color: "var(--text-subdued-2)" }}
              >
                <Activity size={12} />
                {workflow.actionCount} actions
              </span>

              <Separator
                orientation="vertical"
                className="h-3"
                style={{ backgroundColor: "var(--grey-40)" }}
              />

              {/* Run stats */}
              <span
                className="inline-flex items-center gap-1 text-xs"
                style={{ color: "var(--text-subdued-2)" }}
              >
                <Play size={12} />
                {workflow.runCount.toLocaleString()} runs
              </span>

              {/* Last run */}
              <span
                className="inline-flex items-center gap-1 text-xs"
                style={{ color: "var(--text-subdued-2)" }}
              >
                <Clock size={12} />
                Last run: {workflow.lastRun}
              </span>
            </div>
          </div>

          {/* Arrow */}
          <ChevronRight
            size={18}
            className="shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: "var(--text-subdued-2)" }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Workflows Page ─────────────────────────────────────────────────────────

export default function WorkflowsPage() {
  const navigate = useNavigate();
  const { orgSlug, tenantSlug } = useParams();
  const [workflows, setWorkflows] = useState(mockWorkflows);
  const [searchQuery, setSearchQuery] = useState("");

  const totalWorkflows = workflows.length;
  const activeCount = workflows.filter((w) => w.status === "active").length;
  const pausedCount = workflows.filter((w) => w.status === "paused").length;

  const handleToggle = (id: string) => {
    setWorkflows((prev) =>
      prev.map((wf) =>
        wf.id === id
          ? {
              ...wf,
              status: (wf.status === "active"
                ? "paused"
                : "active") as WorkflowStatus,
            }
          : wf,
      ),
    );
  };

  const filteredWorkflows = workflows.filter(
    (wf) =>
      !searchQuery ||
      wf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wf.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-semibold"
            style={{ color: "var(--text-default)" }}
          >
            Workflows
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-subdued-1)" }}
          >
            Automate your business processes with visual workflows
          </p>
        </div>

        <Button
          size="sm"
          onClick={() =>
            navigate(`/${orgSlug}/${tenantSlug}/app/workflows/new`)
          }
          style={{
            backgroundColor: "var(--primary-50)",
            color: "var(--text-inverse)",
          }}
        >
          <Plus size={16} className="mr-2" />
          New Workflow
        </Button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Workflows"
          value={totalWorkflows}
          icon={<Zap size={20} />}
          color="var(--primary-50)"
        />
        <StatCard
          label="Active"
          value={activeCount}
          icon={<Play size={20} />}
          color="var(--success-50)"
        />
        <StatCard
          label="Paused"
          value={pausedCount}
          icon={<Pause size={20} />}
          color="var(--warning-50)"
        />
      </div>

      {/* Search and filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--text-subdued-2)" }}
          />
          <input
            type="text"
            placeholder="Search workflows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg text-sm"
            style={{
              backgroundColor: "var(--surface-0)",
              border: "1px solid var(--grey-40)",
              color: "var(--text-default)",
              outline: "none",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--primary-50)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--grey-40)";
            }}
            aria-label="Search workflows"
          />
        </div>
      </div>

      {/* Workflow list */}
      <div className="space-y-3">
        {filteredWorkflows.map((workflow) => (
          <WorkflowCard
            key={workflow.id}
            workflow={workflow}
            onToggle={handleToggle}
          />
        ))}
        {filteredWorkflows.length === 0 && (
          <Card
            style={{
              backgroundColor: "var(--surface-0)",
              border: "1px solid var(--grey-40)",
            }}
          >
            <CardContent className="py-12">
              <div className="flex flex-col items-center justify-center text-center">
                <div
                  className="p-4 rounded-full mb-4"
                  style={{ backgroundColor: "var(--surface-10)" }}
                >
                  <Zap size={24} style={{ color: "var(--text-subdued-2)" }} />
                </div>
                <h3
                  className="text-base font-semibold mb-1"
                  style={{ color: "var(--text-default)" }}
                >
                  No workflows found
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-subdued-1)" }}
                >
                  Try adjusting your search or create a new workflow
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
