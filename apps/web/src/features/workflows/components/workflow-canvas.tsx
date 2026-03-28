import { useCallback, useRef, useMemo } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type NodeTypes,
  type OnConnect,
  type ReactFlowInstance,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { TriggerNode } from "./trigger-node";
import { ConditionNode } from "./condition-node";
import { ActionNode } from "./action-node";
import type {
  SidebarNodeItem,
  TriggerNodeData,
  ConditionNodeData,
  ActionNodeData,
} from "../types";

const nodeTypes: NodeTypes = {
  trigger: TriggerNode,
  condition: ConditionNode,
  action: ActionNode,
};

const STARTER_NODES: Node[] = [
  {
    id: "trigger_1",
    type: "trigger",
    position: { x: 400, y: 40 },
    data: {
      label: "Record Created",
      triggerType: "record_created",
      objectId: "contacts",
    },
  },
  {
    id: "condition_1",
    type: "condition",
    position: { x: 400, y: 260 },
    data: {
      label: "If / Else",
      field: "deal_value",
      operator: "greater",
      value: "50000",
    },
  },
  {
    id: "action_1",
    type: "action",
    position: { x: 220, y: 520 },
    data: {
      label: "Send Email",
      actionType: "send_email",
      config: { to: "sales@company.com", subject: "High-value lead!" },
    },
  },
  {
    id: "action_2",
    type: "action",
    position: { x: 580, y: 520 },
    data: {
      label: "Create Task",
      actionType: "create_task",
      config: { title: "Follow up with lead", assignee: "Sales Rep" },
    },
  },
];

const STARTER_EDGES: Edge[] = [
  {
    id: "e_trigger_condition",
    source: "trigger_1",
    target: "condition_1",
    animated: true,
    style: { stroke: "var(--grey-50)", strokeWidth: 2 },
  },
  {
    id: "e_condition_yes",
    source: "condition_1",
    sourceHandle: "yes",
    target: "action_1",
    animated: true,
    style: { stroke: "var(--success-50)", strokeWidth: 2 },
    label: "Yes",
  },
  {
    id: "e_condition_no",
    source: "condition_1",
    sourceHandle: "no",
    target: "action_2",
    animated: true,
    style: { stroke: "var(--error-50)", strokeWidth: 2 },
    label: "No",
  },
];

let nodeId = 100;
function getNextId() {
  nodeId += 1;
  return `node_${nodeId}`;
}

function getDefaultData(
  item: SidebarNodeItem,
): TriggerNodeData | ConditionNodeData | ActionNodeData {
  switch (item.type) {
    case "trigger":
      return {
        label: item.label,
        triggerType: item.subType as TriggerNodeData["triggerType"],
        objectId: "",
      };
    case "condition":
      return {
        label: item.label,
        field: "",
        operator: "equals",
        value: "",
      };
    case "action":
      return {
        label: item.label,
        actionType: item.subType as ActionNodeData["actionType"],
        config: {},
      };
  }
}

interface WorkflowCanvasProps {
  initialNodes?: Node[];
  initialEdges?: Edge[];
}

export function WorkflowCanvas({
  initialNodes = STARTER_NODES,
  initialEdges = STARTER_EDGES,
}: WorkflowCanvasProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            style: {
              stroke: "var(--grey-50)",
              strokeWidth: 2,
            },
            animated: true,
          },
          eds,
        ),
      );
    },
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const data = event.dataTransfer.getData("application/reactflow");
      if (!data || !reactFlowInstance.current) return;

      const item: SidebarNodeItem = JSON.parse(data);
      const position = reactFlowInstance.current.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: getNextId(),
        type: item.type,
        position,
        data: getDefaultData(item),
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes],
  );

  const onInit = useCallback((instance: ReactFlowInstance) => {
    reactFlowInstance.current = instance;
  }, []);

  const defaultEdgeOptions = useMemo(
    () => ({
      style: { stroke: "var(--grey-50)", strokeWidth: 2 },
      animated: true,
    }),
    [],
  );

  return (
    <div ref={reactFlowWrapper} className="flex-1 h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        deleteKeyCode={["Backspace", "Delete"]}
        style={{ backgroundColor: "var(--surface-10)" }}
      >
        <Controls
          style={{
            backgroundColor: "var(--surface-0)",
            border: "1px solid var(--grey-40)",
            borderRadius: "var(--radius-8)",
          }}
        />
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="var(--grey-40)"
        />
      </ReactFlow>
    </div>
  );
}
