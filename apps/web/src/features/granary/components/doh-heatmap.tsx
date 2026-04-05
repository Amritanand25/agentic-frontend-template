import { ToggleGroup, ToggleGroupItem } from "@repo/ui";
import type { DOHBlock } from "../types";

type MetricMode = "cost" | "count";

const RISK_COLORS: Record<DOHBlock["riskLevel"], { bg: string; text: string }> =
  {
    optimal: { bg: "var(--success-20)", text: "var(--success-80)" },
    moderate: { bg: "var(--secondary-20)", text: "var(--secondary-70)" },
    critical: { bg: "var(--error-20)", text: "var(--error-80)" },
  };

interface DOHHeatmapProps {
  blocks: DOHBlock[];
  selectedRange: string | null;
  onSelectRange: (range: string | null) => void;
  metricMode: MetricMode;
  onMetricModeChange: (mode: MetricMode) => void;
}

export function DOHHeatmap({
  blocks,
  selectedRange,
  onSelectRange,
  metricMode,
  onMetricModeChange,
}: DOHHeatmapProps) {
  const values = blocks.map((b) =>
    metricMode === "cost" ? b.inventoryCost : b.inventoryCount,
  );
  const maxValue = Math.max(...values, 1);

  return (
    <div className="flex flex-col" style={{ gap: "var(--space-16)" }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div
          style={{
            fontSize: "var(--font-size-m)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
          }}
        >
          DOH Distribution
        </div>
        <ToggleGroup
          type="single"
          value={metricMode}
          onValueChange={(val) => {
            if (val) onMetricModeChange(val as MetricMode);
          }}
        >
          <ToggleGroupItem value="cost" aria-label="Inventory Cost">
            Inventory Cost
          </ToggleGroupItem>
          <ToggleGroupItem value="count" aria-label="Inventory Count">
            Inventory Count
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Treemap grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "var(--space-4)",
        }}
      >
        {blocks.map((block) => {
          const value =
            metricMode === "cost" ? block.inventoryCost : block.inventoryCount;
          const ratio = value / maxValue;
          const minHeight = 60;
          const maxHeight = 140;
          const height = minHeight + ratio * (maxHeight - minHeight);
          const colors = RISK_COLORS[block.riskLevel];
          const isSelected = selectedRange === block.range;

          return (
            <div
              key={block.range}
              role="button"
              tabIndex={0}
              onClick={() => onSelectRange(isSelected ? null : block.range)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectRange(isSelected ? null : block.range);
                }
              }}
              style={{
                backgroundColor: colors.bg,
                borderRadius: "var(--radius-8)",
                padding: "var(--space-8)",
                minHeight: height,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                transition: "box-shadow 150ms ease, outline 150ms ease",
                outline: isSelected
                  ? "2px solid var(--primary-50)"
                  : "2px solid transparent",
                outlineOffset: -2,
              }}
              className="hover:shadow-[var(--shadow-small)]"
              aria-pressed={isSelected}
              aria-label={`${block.range}: ${metricMode === "cost" ? `Rs ${value} Cr` : `${value.toLocaleString()} units`}`}
            >
              <div
                style={{
                  fontSize: "var(--font-size-s)",
                  fontWeight: "var(--font-weight-prominent)",
                  color: colors.text,
                  textAlign: "center",
                }}
              >
                {block.range}
              </div>
              <div
                style={{
                  fontSize: "var(--font-size-l)",
                  fontWeight: "var(--font-weight-heading)",
                  color: colors.text,
                  textAlign: "center",
                }}
              >
                {metricMode === "cost"
                  ? `Rs ${value.toFixed(2)} Cr`
                  : value.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center" style={{ gap: "var(--space-16)" }}>
        {(["optimal", "moderate", "critical"] as const).map((level) => (
          <div
            key={level}
            className="flex items-center"
            style={{ gap: "var(--space-4)" }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: RISK_COLORS[level].bg,
                border: `1px solid ${RISK_COLORS[level].text}`,
              }}
            />
            <span
              style={{
                fontSize: "var(--font-size-s)",
                color: "var(--text-subdued-1)",
                textTransform: "capitalize",
              }}
            >
              {level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
