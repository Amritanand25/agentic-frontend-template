import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@repo/ui";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { SalesTrendData } from "../types";

interface SalesTrendChartProps {
  data: SalesTrendData;
}

export function SalesTrendChart({ data }: SalesTrendChartProps) {
  const [toggle, setToggle] = useState<"sales" | "quantity">("sales");

  const chartData = data.weeks.map((week, index) => ({
    week,
    lastYear: data.lastYear[index] ?? 0,
    current: data.current[index] ?? 0,
  }));

  return (
    <div
      style={{
        backgroundColor: "var(--surface-0)",
        borderRadius: "var(--radius-8)",
        padding: "var(--space-16)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-16)",
      }}
    >
      <div className="flex items-center justify-between">
        <span
          style={{
            fontSize: "var(--font-size-m)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
          }}
        >
          Sales Trend Analysis
        </span>
        <ToggleGroup
          type="single"
          value={toggle}
          onValueChange={(val) => {
            if (val === "sales" || val === "quantity") {
              setToggle(val);
            }
          }}
          variant="outline"
          size="sm"
        >
          <ToggleGroupItem value="sales">Sales</ToggleGroupItem>
          <ToggleGroupItem value="quantity">Quantity</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--grey-40)"
            vertical={false}
          />
          <XAxis
            dataKey="week"
            tick={{
              fontSize: "var(--font-size-xs)",
              fill: "var(--text-subdued-1)",
            }}
            axisLine={{ stroke: "var(--grey-40)" }}
            tickLine={false}
          />
          <YAxis
            tick={{
              fontSize: "var(--font-size-xs)",
              fill: "var(--text-subdued-1)",
            }}
            axisLine={false}
            tickLine={false}
          />
          <RechartsTooltip
            contentStyle={{
              backgroundColor: "var(--surface-0)",
              borderRadius: "var(--radius-8)",
              fontSize: "var(--font-size-s)",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
          <Legend
            wrapperStyle={{
              fontSize: "var(--font-size-s)",
              color: "var(--text-subdued-1)",
            }}
          />
          <Line
            type="monotone"
            dataKey="lastYear"
            name={`Last Year ${toggle === "sales" ? "Sales" : "Quantity"}`}
            stroke="var(--tertiary-40)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="current"
            name={`Current ${toggle === "sales" ? "Sales" : "Quantity"}`}
            stroke="var(--primary-50)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
