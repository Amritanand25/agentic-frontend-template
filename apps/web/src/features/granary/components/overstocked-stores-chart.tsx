import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { OverstockedStore } from "../types";

interface OverstockedStoresChartProps {
  data: OverstockedStore[];
}

export function OverstockedStoresChart({ data }: OverstockedStoresChartProps) {
  const chartData = data.map((store) => ({
    label: `${store.code} - ${store.name}`,
    value: store.value,
  }));

  return (
    <div className="flex flex-col" style={{ gap: "var(--space-8)" }}>
      <h3
        style={{
          margin: 0,
          fontSize: "var(--font-size-m)",
          fontWeight: "var(--font-weight-heading)",
          color: "var(--text-default)",
        }}
      >
        Overstocked Stores
      </h3>
      <ResponsiveContainer
        width="100%"
        height={Math.max(200, data.length * 56)}
      >
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 8, right: 16, left: 8, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--grey-20)"
            horizontal={false}
          />
          <XAxis
            type="number"
            tick={{ fontSize: 12, fill: "var(--text-subdued-1)" }}
            axisLine={{ stroke: "var(--grey-20)" }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="label"
            width={200}
            tick={{ fontSize: 12, fill: "var(--text-subdued-1)" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--surface-0)",
              borderRadius: "var(--radius-8)",
              border: "1px solid var(--grey-20)",
              fontSize: "var(--font-size-s)",
            }}
          />
          <Bar
            dataKey="value"
            fill="var(--secondary-50)"
            radius={[0, 4, 4, 0]}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
