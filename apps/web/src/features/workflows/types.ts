import type { Node, Edge } from "@xyflow/react";

// ─── Trigger Types ─────────────────────────────────────────
export type TriggerType = "record_created" | "record_updated" | "scheduled";

export interface TriggerNodeData {
  label: string;
  triggerType: TriggerType;
  objectId: string;
  field?: string;
  frequency?: "daily" | "weekly" | "monthly";
  [key: string]: unknown;
}

// ─── Condition Types ───────────────────────────────────────
export type ConditionOperator =
  | "equals"
  | "not_equals"
  | "greater"
  | "less"
  | "contains";

export interface ConditionNodeData {
  label: string;
  field: string;
  operator: ConditionOperator;
  value: string;
  [key: string]: unknown;
}

// ─── Action Types ──────────────────────────────────────────
export type ActionType =
  | "send_email"
  | "update_record"
  | "create_task"
  | "send_notification"
  | "delay";

export interface ActionNodeData {
  label: string;
  actionType: ActionType;
  config: Record<string, string>;
  [key: string]: unknown;
}

// ─── Node Type Union ───────────────────────────────────────
export type WorkflowNodeType = "trigger" | "condition" | "action";

export type WorkflowNode =
  | Node<TriggerNodeData, "trigger">
  | Node<ConditionNodeData, "condition">
  | Node<ActionNodeData, "action">;

export type WorkflowEdge = Edge;

// ─── Sidebar drag data ────────────────────────────────────
export interface SidebarNodeItem {
  type: WorkflowNodeType;
  subType: string;
  label: string;
  description: string;
  icon: string;
  accent: string;
}

// ─── Workflow ──────────────────────────────────────────────
export interface Workflow {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  createdAt: string;
  updatedAt: string;
}
