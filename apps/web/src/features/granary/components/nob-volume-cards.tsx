import type { NOBCategory } from "../types";

interface NOBVolumeCardsProps {
  data: NOBCategory[];
}

export function NOBVolumeCards({ data }: NOBVolumeCardsProps) {
  return (
    <div className="flex flex-col" style={{ gap: "var(--space-8)" }}>
      {data.map((category) => (
        <div
          key={category.name}
          style={{
            backgroundColor: "var(--surface-0)",
            borderRadius: "var(--radius-8)",
            padding: "var(--space-16)",
            borderLeft: `4px solid ${category.color}`,
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-12)",
          }}
        >
          {/* Name + Description */}
          <div>
            <div
              style={{
                fontSize: "var(--font-size-m)",
                fontWeight: "var(--font-weight-heading)",
                color: "var(--text-default)",
              }}
            >
              {category.name}
            </div>
            <div
              style={{
                fontSize: "var(--font-size-xs)",
                color: "var(--text-subdued-1)",
                marginTop: "var(--space-2)",
              }}
            >
              {category.description}
            </div>
          </div>

          {/* Metrics row */}
          <div className="grid grid-cols-4" style={{ gap: "var(--space-8)" }}>
            <MetricItem
              label="No. of SKUs"
              value={category.skuCount.toLocaleString()}
            />
            <MetricItem
              label="% of Bills"
              value={`${category.billsPct.toFixed(2)}%`}
            />
            <MetricItem
              label="% of Volume"
              value={`${category.volumePct.toFixed(2)}%`}
            />
            <MetricItem label="Avg UPB" value={category.avgUPB.toFixed(2)} />
          </div>
        </div>
      ))}
    </div>
  );
}

function MetricItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        style={{
          fontSize: "var(--font-size-xs)",
          color: "var(--text-subdued-1)",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "var(--font-size-m)",
          fontWeight: "var(--font-weight-heading)",
          color: "var(--text-default)",
          marginTop: "var(--space-2)",
        }}
      >
        {value}
      </div>
    </div>
  );
}
