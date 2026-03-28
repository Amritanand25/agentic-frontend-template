import { memo, useCallback } from "react";
import {
  Zap,
  RefreshCw,
  Calendar,
  GitBranch,
  Mail,
  CheckSquare,
  Bell,
  Clock,
} from "lucide-react";
import { ScrollArea } from "@repo/ui";
import type { SidebarNodeItem } from "../types";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const NODE_CATEGORIES: {
  title: string;
  items: SidebarNodeItem[];
}[] = [
  {
    title: "Triggers",
    items: [
      {
        type: "trigger",
        subType: "record_created",
        label: "Record Created",
        description: "When a new record is created",
        icon: "zap",
        accent: "var(--success-50)",
      },
      {
        type: "trigger",
        subType: "record_updated",
        label: "Record Updated",
        description: "When a record is modified",
        icon: "refresh",
        accent: "var(--success-50)",
      },
      {
        type: "trigger",
        subType: "scheduled",
        label: "Scheduled",
        description: "Run on a time schedule",
        icon: "calendar",
        accent: "var(--success-50)",
      },
    ],
  },
  {
    title: "Conditions",
    items: [
      {
        type: "condition",
        subType: "if_else",
        label: "If / Else",
        description: "Branch based on conditions",
        icon: "git-branch",
        accent: "var(--warning-50)",
      },
    ],
  },
  {
    title: "Actions",
    items: [
      {
        type: "action",
        subType: "send_email",
        label: "Send Email",
        description: "Send an email notification",
        icon: "mail",
        accent: "var(--primary-50)",
      },
      {
        type: "action",
        subType: "update_record",
        label: "Update Record",
        description: "Modify an existing record",
        icon: "refresh",
        accent: "var(--primary-50)",
      },
      {
        type: "action",
        subType: "create_task",
        label: "Create Task",
        description: "Create a new task",
        icon: "check-square",
        accent: "var(--primary-50)",
      },
      {
        type: "action",
        subType: "send_notification",
        label: "Send Notification",
        description: "Push a notification",
        icon: "bell",
        accent: "var(--primary-50)",
      },
      {
        type: "action",
        subType: "delay",
        label: "Wait / Delay",
        description: "Pause for a duration",
        icon: "clock",
        accent: "var(--primary-50)",
      },
    ],
  },
];

const ICON_MAP: Record<string, React.ReactNode> = {
  zap: <Zap size={14} />,
  refresh: <RefreshCw size={14} />,
  calendar: <Calendar size={14} />,
  "git-branch": <GitBranch size={14} />,
  mail: <Mail size={14} />,
  "check-square": <CheckSquare size={14} />,
  bell: <Bell size={14} />,
  clock: <Clock size={14} />,
};

/* ------------------------------------------------------------------ */
/*  Node Card                                                          */
/* ------------------------------------------------------------------ */

function SidebarNodeCard({ item }: { item: SidebarNodeItem }) {
  const onDragStart = useCallback(
    (event: React.DragEvent) => {
      event.dataTransfer.setData("application/reactflow", JSON.stringify(item));
      event.dataTransfer.effectAllowed = "move";
    },
    [item],
  );

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="group relative flex items-center cursor-grab active:cursor-grabbing"
      style={
        {
          "--_accent": item.accent,
          gap: "var(--space-8)",
          padding: "var(--space-6) var(--space-8)",
          borderRadius: "var(--radius-6)",
          backgroundColor: "transparent",
          transition:
            "background-color 150ms ease, transform 150ms ease, opacity 150ms ease",
        } as React.CSSProperties
      }
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "var(--grey-10)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "scale(0.98)";
        e.currentTarget.style.opacity = "0.85";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.opacity = "1";
      }}
    >
      {/* Left accent bar */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/2 opacity-0 group-hover:opacity-100"
        style={{
          width: "var(--space-2)",
          height: "var(--space-16)",
          borderRadius: "var(--radius-full)",
          backgroundColor: item.accent,
          transform: "translateY(-50%)",
          transition: "opacity 150ms ease",
        }}
      />

      {/* Icon */}
      <div
        className="flex items-center justify-center shrink-0"
        style={{
          width: 28,
          height: 28,
          borderRadius: "var(--radius-6)",
          backgroundColor: `color-mix(in srgb, ${item.accent} 10%, transparent)`,
          color: item.accent,
        }}
      >
        {ICON_MAP[item.icon]}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p
          className="truncate"
          style={{
            fontSize: "var(--font-size-s)",
            lineHeight: "var(--line-height-s)",
            fontWeight: "var(--font-weight-prominent)",
            color: "var(--text-default)",
          }}
        >
          {item.label}
        </p>
        <p
          className="truncate"
          style={{
            fontSize: "var(--font-size-xs)",
            lineHeight: "var(--line-height-xs)",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--text-subdued-2)",
          }}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar                                                            */
/* ------------------------------------------------------------------ */

function NodeSidebarComponent() {
  return (
    <div
      className="flex flex-col h-full"
      style={{
        width: 240,
        backgroundColor: "var(--surface-0)",
        borderRight: "1px solid var(--grey-30)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "var(--space-12) var(--space-12) var(--space-8)",
        }}
      >
        <h2
          style={{
            fontSize: "var(--font-size-s)",
            lineHeight: "var(--line-height-s)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
          }}
        >
          Nodes
        </h2>
        <p
          style={{
            fontSize: "var(--font-size-xs)",
            lineHeight: "var(--line-height-xs)",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--text-subdued-2)",
            marginTop: "var(--space-2)",
          }}
        >
          Drag to canvas
        </p>
      </div>

      {/* Node list */}
      <ScrollArea className="flex-1">
        <div
          style={{
            padding: "var(--space-4) var(--space-8)",
            paddingBottom: "var(--space-16)",
          }}
        >
          {NODE_CATEGORIES.map((category, catIdx) => (
            <div
              key={category.title}
              style={{
                marginTop: catIdx > 0 ? "var(--space-12)" : "0",
              }}
            >
              {/* Category label */}
              <p
                style={{
                  fontSize: "var(--font-size-xs)",
                  lineHeight: "var(--line-height-xs)",
                  fontWeight: "var(--font-weight-prominent)",
                  color: "var(--text-subdued-2)",
                  padding: "var(--space-4) var(--space-8)",
                  letterSpacing: "0.02em",
                }}
              >
                {category.title}
              </p>

              {/* Cards */}
              <div className="flex flex-col" style={{ gap: "var(--space-1)" }}>
                {category.items.map((item) => (
                  <SidebarNodeCard
                    key={`${item.type}-${item.subType}`}
                    item={item}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export const NodeSidebar = memo(NodeSidebarComponent);
