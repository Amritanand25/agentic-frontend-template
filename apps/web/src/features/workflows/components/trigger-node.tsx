import { memo, useCallback } from "react";
import {
  Handle,
  Position,
  useReactFlow,
  type NodeProps,
  type Node,
} from "@xyflow/react";
import { Zap, RefreshCw, Calendar } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@repo/ui";
import type { TriggerNodeData, TriggerType } from "../types";

const TRIGGER_OPTIONS: {
  value: TriggerType;
  label: string;
  icon: React.ReactNode;
}[] = [
  { value: "record_created", label: "Record Created", icon: <Zap size={14} /> },
  {
    value: "record_updated",
    label: "Record Updated",
    icon: <RefreshCw size={14} />,
  },
  { value: "scheduled", label: "Scheduled", icon: <Calendar size={14} /> },
];

const OBJECTS = [
  { id: "contacts", name: "Contacts" },
  { id: "companies", name: "Companies" },
  { id: "deals", name: "Deals" },
];

const FREQUENCIES = [
  { id: "daily", name: "Daily" },
  { id: "weekly", name: "Weekly" },
  { id: "monthly", name: "Monthly" },
];

function TriggerNodeComponent({
  id,
  data,
  selected,
}: NodeProps<Node<TriggerNodeData>>) {
  const { updateNodeData } = useReactFlow();

  const handleTriggerChange = useCallback(
    (value: string) => {
      updateNodeData(id, { triggerType: value as TriggerType });
    },
    [id, updateNodeData],
  );

  const handleObjectChange = useCallback(
    (value: string) => {
      updateNodeData(id, { objectId: value });
    },
    [id, updateNodeData],
  );

  const handleFrequencyChange = useCallback(
    (value: string) => {
      updateNodeData(id, { frequency: value });
    },
    [id, updateNodeData],
  );

  const currentTrigger = TRIGGER_OPTIONS.find(
    (t) => t.value === data.triggerType,
  );

  return (
    <div
      style={{
        backgroundColor: "var(--surface-0)",
        border: `2px solid ${selected ? "var(--success-50)" : "var(--grey-40)"}`,
        borderRadius: "var(--radius-12)",
        boxShadow: "var(--shadow-medium)",
        width: 280,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2"
        style={{
          padding: "var(--space-8) var(--space-12)",
          backgroundColor: "var(--success-10)",
          borderBottom: "1px solid var(--success-30)",
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: 24,
            height: 24,
            borderRadius: "var(--radius-6)",
            backgroundColor: "var(--success-50)",
            color: "var(--surface-0)",
          }}
        >
          {currentTrigger?.icon ?? <Zap size={14} />}
        </div>
        <span
          style={{
            fontSize: "var(--font-size-s)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--success-70)",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Trigger
        </span>
      </div>

      {/* Content */}
      <div
        className="flex flex-col"
        style={{ padding: "var(--space-12)", gap: "var(--space-8)" }}
      >
        <Select value={data.triggerType} onValueChange={handleTriggerChange}>
          <SelectTrigger style={{ fontSize: "var(--font-size-s)" }}>
            <SelectValue placeholder="Select trigger" />
          </SelectTrigger>
          <SelectContent>
            {TRIGGER_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                <span className="flex items-center gap-2">
                  {opt.icon}
                  {opt.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {data.triggerType !== "scheduled" && (
          <Select value={data.objectId} onValueChange={handleObjectChange}>
            <SelectTrigger style={{ fontSize: "var(--font-size-s)" }}>
              <SelectValue placeholder="Select object" />
            </SelectTrigger>
            <SelectContent>
              {OBJECTS.map((obj) => (
                <SelectItem key={obj.id} value={obj.id}>
                  {obj.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {data.triggerType === "scheduled" && (
          <Select
            value={data.frequency ?? ""}
            onValueChange={handleFrequencyChange}
          >
            <SelectTrigger style={{ fontSize: "var(--font-size-s)" }}>
              <SelectValue placeholder="Frequency" />
            </SelectTrigger>
            <SelectContent>
              {FREQUENCIES.map((f) => (
                <SelectItem key={f.id} value={f.id}>
                  {f.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Source handle (bottom) */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          width: 12,
          height: 12,
          backgroundColor: "var(--success-50)",
          border: "2px solid var(--surface-0)",
          bottom: -6,
        }}
      />
    </div>
  );
}

export const TriggerNode = memo(TriggerNodeComponent);
