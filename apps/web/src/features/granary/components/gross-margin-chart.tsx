import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@repo/ui";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { GrossMarginData } from "../types";

interface GrossMarginChartProps {
  data: GrossMarginData;
}

export function GrossMarginChart({ data }: GrossMarginChartProps) {
  const [toggle, setToggle] = useState<"value" | "percentage">("value");

  const chartData = data.weeks.map((week, idx) => ({
    week,
    lastYear: data.lastYear[idx] ?? 0,
    current: data.current[idx] ?? 0,
  }));

  return (
    <div className="flex flex-col" style={{ gap: "var(--space-12)" }}>
      <div className="flex items-center justify-between">
        <h3
          style={{
            margin: 0,
            fontSize: "var(--font-size-m)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
          }}
        >
          Gross Margin Performance
        </h3>
        <ToggleGroup
          type="single"
          value={toggle}
          onValueChange={(val) => {
            if (val === "value" || val === "percentage") {
              setToggle(val);
            }
          }}
          size="sm"
          variant="outline"
        >
          <ToggleGroupItem value="value">Value</ToggleGroupItem>
          <ToggleGroupItem value="percentage">Percentage</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={chartData}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--grey-20)"
            vertical={false}
          />
          <XAxis
            dataKey="week"
            tick={{ fontSize: 12, fill: "var(--text-subdued-1)" }}
            axisLine={{ stroke: "var(--grey-20)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "var(--text-subdued-1)" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(val: number) =>
              toggle === "percentage" ? `${val}%` : `${val}`
            }
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--surface-0)",
              borderRadius: "var(--radius-8)",
              border: "1px solid var(--grey-20)",
              fontSize: "var(--font-size-s)",
            }}
            formatter={(value: number) =>
              toggle === "percentage" ? `${value}%` : value.toFixed(2)
            }
          />
          <Legend
            wrapperStyle={{ fontSize: "var(--font-size-s)", paddingTop: 8 }}
          />
          <Bar
            dataKey="lastYear"
            name="Last Year"
            fill="var(--tertiary-40)"
            radius={[2, 2, 0, 0]}
            barSize={14}
          />
          <Bar
            dataKey="current"
            name="Current Year"
            fill="var(--primary-50)"
            radius={[2, 2, 0, 0]}
            barSize={14}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
