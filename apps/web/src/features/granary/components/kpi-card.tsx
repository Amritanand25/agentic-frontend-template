import { Tooltip, TooltipTrigger, TooltipContent } from "@repo/ui";
import { HelpCircle } from "lucide-react";
import type { DashboardKPI } from "../types";

interface KPICardProps {
  kpi: DashboardKPI;
}

export function KPICard({ kpi }: KPICardProps) {
  const formattedValue =
    kpi.value % 1 === 0
      ? kpi.value.toLocaleString("en-IN")
      : kpi.value.toFixed(2);

  return (
    <div
      style={{
        backgroundColor: "var(--surface-0)",
        borderRadius: "var(--radius-8)",
        padding: "var(--space-16)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-8)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-4)",
          fontSize: "var(--font-size-xs)",
          color: "var(--text-subdued-1)",
          lineHeight: "var(--line-height-xs)",
        }}
      >
        <span>
          {kpi.label}
          {kpi.period ? ` (${kpi.period})` : ""}
        </span>
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              style={{
                display: "inline-flex",
                cursor: "help",
                color: "var(--text-subdued-2)",
              }}
            >
              <HelpCircle size={12} />
            </span>
          </TooltipTrigger>
          <TooltipContent>{kpi.tooltip}</TooltipContent>
        </Tooltip>
      </div>
      <div
        style={{
          fontSize: "var(--font-size-xl)",
          fontWeight: "var(--font-weight-heading)",
          color: "var(--text-default)",
          lineHeight: "var(--line-height-xl)",
        }}
      >
        {kpi.prefix ?? ""}
        {formattedValue}
        {kpi.unit ? ` ${kpi.unit}` : ""}
      </div>
    </div>
  );
}
