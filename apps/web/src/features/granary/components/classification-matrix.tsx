import { Tooltip, TooltipTrigger, TooltipContent } from "@repo/ui";
import { HelpCircle, ArrowUp, ArrowRight } from "lucide-react";
import type { ClassificationCell } from "../types";

interface ClassificationMatrixProps {
  data: ClassificationCell[];
}

const SKU_TYPE_COLORS: Record<ClassificationCell["skuType"], string> = {
  strategic: "var(--success-10)",
  regular: "var(--secondary-10)",
  review: "var(--error-10)",
};

const REVENUE_LABELS = ["A", "B", "C"] as const;
const STABILITY_LABELS = ["X", "Y", "Z"] as const;

export function ClassificationMatrix({ data }: ClassificationMatrixProps) {
  const cellMap = new Map(data.map((cell) => [cell.code, cell]));

  return (
    <div className="flex" style={{ gap: "var(--space-8)" }}>
      {/* Y-axis label */}
      <div
        className="flex flex-col items-center justify-center"
        style={{ gap: "var(--space-4)", minWidth: 20 }}
      >
        <ArrowUp size={14} style={{ color: "var(--text-subdued-1)" }} />
        <span
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontSize: "var(--font-size-xs)",
            color: "var(--text-subdued-1)",
            fontWeight: "var(--font-weight-heading)",
            letterSpacing: "0.05em",
          }}
        >
          Revenue
        </span>
      </div>

      <div className="flex flex-col flex-1" style={{ gap: "var(--space-4)" }}>
        {/* Grid body */}
        <div className="flex flex-1" style={{ gap: "var(--space-4)" }}>
          {/* Row labels */}
          <div
            className="flex flex-col justify-around"
            style={{ minWidth: 20 }}
          >
            {REVENUE_LABELS.map((label) => (
              <span
                key={label}
                style={{
                  fontSize: "var(--font-size-s)",
                  fontWeight: "var(--font-weight-heading)",
                  color: "var(--text-default)",
                  textAlign: "center",
                }}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Matrix grid */}
          <div
            className="grid flex-1"
            style={{
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(3, 1fr)",
              gap: "var(--space-4)",
            }}
          >
            {REVENUE_LABELS.map((rev) =>
              STABILITY_LABELS.map((stab) => {
                const code = `${rev}${stab}`;
                const cell = cellMap.get(code);
                if (!cell) return null;

                return (
                  <div
                    key={code}
                    style={{
                      backgroundColor: SKU_TYPE_COLORS[cell.skuType],
                      borderRadius: "var(--radius-8)",
                      padding: "var(--space-16)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--space-4)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        style={{
                          fontSize: "var(--font-size-s)",
                          fontWeight: "var(--font-weight-heading)",
                          color: "var(--text-default)",
                        }}
                      >
                        {cell.code}
                      </span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span
                            className="inline-flex cursor-help"
                            style={{ color: "var(--text-subdued-2)" }}
                          >
                            <HelpCircle size={14} />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          {cell.code}: {cell.skuType} SKU ({cell.percentage}%)
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <span
                      style={{
                        fontSize: "var(--font-size-m)",
                        fontWeight: "var(--font-weight-heading)",
                        color: "var(--text-default)",
                      }}
                    >
                      {cell.percentage}%
                    </span>
                  </div>
                );
              }),
            )}
          </div>
        </div>

        {/* X-axis labels */}
        <div
          className="flex items-center"
          style={{
            marginLeft: 24,
            gap: "var(--space-4)",
          }}
        >
          <div
            className="grid flex-1"
            style={{
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "var(--space-4)",
            }}
          >
            {STABILITY_LABELS.map((label) => (
              <span
                key={label}
                style={{
                  fontSize: "var(--font-size-s)",
                  fontWeight: "var(--font-weight-heading)",
                  color: "var(--text-default)",
                  textAlign: "center",
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* X-axis title */}
        <div
          className="flex items-center justify-center"
          style={{ gap: "var(--space-4)", marginLeft: 24 }}
        >
          <span
            style={{
              fontSize: "var(--font-size-xs)",
              color: "var(--text-subdued-1)",
              fontWeight: "var(--font-weight-heading)",
              letterSpacing: "0.05em",
            }}
          >
            Demand Stability
          </span>
          <ArrowRight size={14} style={{ color: "var(--text-subdued-1)" }} />
        </div>
      </div>
    </div>
  );
}
