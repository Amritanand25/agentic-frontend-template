import { memo, useCallback } from "react";
import {
  Handle,
  Position,
  useReactFlow,
  type NodeProps,
  type Node,
} from "@xyflow/react";
import { Mail, RefreshCw, CheckSquare, Bell, Clock } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Input,
} from "@repo/ui";
import type { ActionNodeData, ActionType } from "../types";

const ACTION_OPTIONS: {
  value: ActionType;
  label: string;
  icon: React.ReactNode;
  configFields: { key: string; placeholder: string }[];
}[] = [
  {
    value: "send_email",
    label: "Send Email",
    icon: <Mail size={14} />,
    configFields: [
      { key: "to", placeholder: "To (email)" },
      { key: "subject", placeholder: "Subject" },
      { key: "body", placeholder: "Email body" },
    ],
  },
  {
    value: "update_record",
    label: "Update Record",
    icon: <RefreshCw size={14} />,
    configFields: [
      { key: "field", placeholder: "Field to update" },
      { key: "value", placeholder: "New value" },
    ],
  },
  {
    value: "create_task",
    label: "Create Task",
    icon: <CheckSquare size={14} />,
    configFields: [
      { key: "title", placeholder: "Task title" },
      { key: "assignee", placeholder: "Assignee" },
    ],
  },
  {
    value: "send_notification",
    label: "Send Notification",
    icon: <Bell size={14} />,
    configFields: [
      { key: "channel", placeholder: "Channel" },
      { key: "message", placeholder: "Message" },
    ],
  },
  {
    value: "delay",
    label: "Wait / Delay",
    icon: <Clock size={14} />,
    configFields: [
      { key: "duration", placeholder: "Duration (e.g. 30)" },
      { key: "unit", placeholder: "Unit (minutes/hours/days)" },
    ],
  },
];

function ActionNodeComponent({
  id,
  data,
  selected,
}: NodeProps<Node<ActionNodeData>>) {
  const { updateNodeData } = useReactFlow();

  const handleActionChange = useCallback(
    (value: string) => {
      updateNodeData(id, { actionType: value as ActionType, config: {} });
    },
    [id, updateNodeData],
  );

  const handleConfigChange = useCallback(
    (key: string, value: string) => {
      updateNodeData(id, {
        config: { ...data.config, [key]: value },
      });
    },
    [id, data.config, updateNodeData],
  );

  const currentAction = ACTION_OPTIONS.find((a) => a.value === data.actionType);

  return (
    <div
      style={{
        backgroundColor: "var(--surface-0)",
        border: `2px solid ${selected ? "var(--primary-50)" : "var(--grey-40)"}`,
        borderRadius: "var(--radius-12)",
        boxShadow: "var(--shadow-medium)",
        width: 280,
        overflow: "hidden",
      }}
    >
      {/* Target handle (top) */}
      <Handle
        type="target"
        position={Position.Top}
        style={{
          width: 12,
          height: 12,
          backgroundColor: "var(--primary-50)",
          border: "2px solid var(--surface-0)",
          top: -6,
        }}
      />

      {/* Header */}
      <div
        className="flex items-center gap-2"
        style={{
          padding: "var(--space-8) var(--space-12)",
          backgroundColor: "var(--primary-10)",
          borderBottom: "1px solid var(--primary-30)",
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: 24,
            height: 24,
            borderRadius: "var(--radius-6)",
            backgroundColor: "var(--primary-50)",
            color: "var(--surface-0)",
          }}
        >
          {currentAction?.icon ?? <Mail size={14} />}
        </div>
        <span
          style={{
            fontSize: "var(--font-size-s)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--primary-70)",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Action
        </span>
      </div>

      {/* Content */}
      <div
        className="flex flex-col"
        style={{ padding: "var(--space-12)", gap: "var(--space-8)" }}
      >
        <Select value={data.actionType} onValueChange={handleActionChange}>
          <SelectTrigger style={{ fontSize: "var(--font-size-s)" }}>
            <SelectValue placeholder="Select action" />
          </SelectTrigger>
          <SelectContent>
            {ACTION_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                <span className="flex items-center gap-2">
                  {opt.icon}
                  {opt.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {currentAction?.configFields.map((field) => (
          <Input
            key={field.key}
            value={data.config[field.key] ?? ""}
            onChange={(e) => handleConfigChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            style={{
              fontSize: "var(--font-size-s)",
              backgroundColor: "var(--surface-0)",
              border: "1px solid var(--grey-40)",
            }}
          />
        ))}
      </div>

      {/* Source handle (bottom) */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          width: 12,
          height: 12,
          backgroundColor: "var(--primary-50)",
          border: "2px solid var(--surface-0)",
          bottom: -6,
        }}
      />
    </div>
  );
}

export const ActionNode = memo(ActionNodeComponent);
