import { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Play, Save } from "lucide-react";
import { Button, Input } from "@repo/ui";
import { NodeSidebar, WorkflowCanvas } from "@/features/workflows";

export default function WorkflowBuilderPage() {
  const navigate = useNavigate();
  const { orgSlug, tenantSlug, workflowId } = useParams();
  const [workflowName, setWorkflowName] = useState(
    workflowId ? "Untitled Workflow" : "New Workflow",
  );

  const handleBack = useCallback(() => {
    navigate(`/${orgSlug}/${tenantSlug}/app/workflows`);
  }, [navigate, orgSlug, tenantSlug]);

  return (
    <div
      className="flex flex-col h-screen"
      style={{ backgroundColor: "var(--surface-10)" }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between shrink-0"
        style={{
          height: 56,
          padding: "0 var(--space-16)",
          backgroundColor: "var(--surface-0)",
          borderBottom: "1px solid var(--grey-40)",
        }}
      >
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            style={{ color: "var(--text-subdued-1)" }}
          >
            <ArrowLeft size={18} />
          </Button>

          <div
            style={{
              width: 1,
              height: 24,
              backgroundColor: "var(--grey-40)",
            }}
          />

          <Input
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            className="border-none shadow-none font-semibold text-sm focus-visible:ring-0"
            style={{
              color: "var(--text-default)",
              backgroundColor: "transparent",
              width: 260,
              padding: "var(--space-4) var(--space-8)",
            }}
            aria-label="Workflow name"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            style={{
              borderColor: "var(--grey-40)",
              color: "var(--text-default)",
            }}
          >
            <Play size={14} className="mr-2" />
            Test
          </Button>
          <Button
            size="sm"
            style={{
              backgroundColor: "var(--primary-50)",
              color: "var(--text-inverse)",
            }}
          >
            <Save size={14} className="mr-2" />
            Save Draft
          </Button>
        </div>
      </header>

      {/* Body: sidebar + canvas */}
      <div className="flex flex-1 overflow-hidden">
        <NodeSidebar />
        <WorkflowCanvas />
      </div>
    </div>
  );
}
