import { memo, useCallback } from "react";
import {
  Handle,
  Position,
  useReactFlow,
  type NodeProps,
  type Node,
} from "@xyflow/react";
import { GitBranch } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Input,
} from "@repo/ui";
import type { ConditionNodeData, ConditionOperator } from "../types";

const FIELDS = [
  { id: "email", name: "Email" },
  { id: "name", name: "Name" },
  { id: "company", name: "Company" },
  { id: "deal_value", name: "Deal Value" },
  { id: "stage", name: "Stage" },
  { id: "status", name: "Status" },
];

const OPERATORS: { value: ConditionOperator; label: string }[] = [
  { value: "equals", label: "Equals" },
  { value: "not_equals", label: "Not Equals" },
  { value: "greater", label: "Greater Than" },
  { value: "less", label: "Less Than" },
  { value: "contains", label: "Contains" },
];

function ConditionNodeComponent({
  id,
  data,
  selected,
}: NodeProps<Node<ConditionNodeData>>) {
  const { updateNodeData } = useReactFlow();

  const handleFieldChange = useCallback(
    (value: string) => {
      updateNodeData(id, { field: value });
    },
    [id, updateNodeData],
  );

  const handleOperatorChange = useCallback(
    (value: string) => {
      updateNodeData(id, { operator: value as ConditionOperator });
    },
    [id, updateNodeData],
  );

  const handleValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateNodeData(id, { value: e.target.value });
    },
    [id, updateNodeData],
  );

  return (
    <div
      style={{
        backgroundColor: "var(--surface-0)",
        border: `2px solid ${selected ? "var(--warning-50)" : "var(--grey-40)"}`,
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
          backgroundColor: "var(--warning-50)",
          border: "2px solid var(--surface-0)",
          top: -6,
        }}
      />

      {/* Header */}
      <div
        className="flex items-center gap-2"
        style={{
          padding: "var(--space-8) var(--space-12)",
          backgroundColor: "var(--warning-10)",
          borderBottom: "1px solid var(--warning-30)",
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: 24,
            height: 24,
            borderRadius: "var(--radius-6)",
            backgroundColor: "var(--warning-50)",
            color: "var(--surface-0)",
          }}
        >
          <GitBranch size={14} />
        </div>
        <span
          style={{
            fontSize: "var(--font-size-s)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--warning-70)",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Condition
        </span>
      </div>

      {/* Content */}
      <div
        className="flex flex-col"
        style={{ padding: "var(--space-12)", gap: "var(--space-8)" }}
      >
        <Select value={data.field} onValueChange={handleFieldChange}>
          <SelectTrigger style={{ fontSize: "var(--font-size-s)" }}>
            <SelectValue placeholder="Select field" />
          </SelectTrigger>
          <SelectContent>
            {FIELDS.map((f) => (
              <SelectItem key={f.id} value={f.id}>
                {f.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={data.operator} onValueChange={handleOperatorChange}>
          <SelectTrigger style={{ fontSize: "var(--font-size-s)" }}>
            <SelectValue placeholder="Operator" />
          </SelectTrigger>
          <SelectContent>
            {OPERATORS.map((op) => (
              <SelectItem key={op.value} value={op.value}>
                {op.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          value={data.value}
          onChange={handleValueChange}
          placeholder="Enter value..."
          style={{
            fontSize: "var(--font-size-s)",
            backgroundColor: "var(--surface-0)",
            border: "1px solid var(--grey-40)",
          }}
        />
      </div>

      {/* Yes handle (bottom-left) */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="yes"
        style={{
          width: 12,
          height: 12,
          backgroundColor: "var(--success-50)",
          border: "2px solid var(--surface-0)",
          bottom: -6,
          left: "30%",
        }}
      />

      {/* No handle (bottom-right) */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="no"
        style={{
          width: 12,
          height: 12,
          backgroundColor: "var(--error-50)",
          border: "2px solid var(--surface-0)",
          bottom: -6,
          left: "70%",
        }}
      />

      {/* Labels for Yes/No handles */}
      <div
        className="flex justify-between"
        style={{
          padding: "0 var(--space-12) var(--space-8)",
          marginTop: "calc(-1 * var(--space-4))",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            color: "var(--success-60)",
            fontWeight: 600,
            paddingLeft: "var(--space-12)",
          }}
        >
          Yes
        </span>
        <span
          style={{
            fontSize: "10px",
            color: "var(--error-60)",
            fontWeight: 600,
            paddingRight: "var(--space-12)",
          }}
        >
          No
        </span>
      </div>
    </div>
  );
}

export const ConditionNode = memo(ConditionNodeComponent);
