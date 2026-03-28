"use client"

import { TrendingUp } from "lucide-react"
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@repo/ui"
const chartData = [
  { month: "January", revenue: 18600, growth: 4.2 },
  { month: "February", revenue: 30500, growth: 6.8 },
  { month: "March", revenue: 23700, growth: 5.1 },
  { month: "April", revenue: 7300, growth: 2.3 },
  { month: "May", revenue: 20900, growth: 5.5 },
  { month: "June", revenue: 21400, growth: 5.7 },
]

const chartConfig = {
  revenue: {
    label: "Revenue ($)",
    color: "var(--primary-50)",
  },
  growth: {
    label: "Growth (%)",
    color: "var(--secondary-50)",
  },
} satisfies ChartConfig

const dualAxisData = [
  { month: "January", visitors: 186, conversion: 12.5 },
  { month: "February", visitors: 305, conversion: 15.2 },
  { month: "March", visitors: 237, conversion: 14.1 },
  { month: "April", visitors: 73, conversion: 8.3 },
  { month: "May", visitors: 209, conversion: 13.7 },
  { month: "June", visitors: 214, conversion: 14.0 },
]

const dualAxisConfig = {
  visitors: {
    label: "Visitors",
    color: "var(--primary-50)",
  },
  conversion: {
    label: "Conversion (%)",
    color: "var(--tertiary-50)",
  },
} satisfies ChartConfig

export default function ComboChartPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-32)" }}>
      <div>
        <h1
          style={{
            fontSize: "var(--font-size-2xl)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
          }}
        >
          Combo Chart
        </h1>
        <p style={{ color: "var(--text-subdued-1)", marginTop: "var(--space-8)" }}>
          Mixed bar and line chart for comparing two different metrics with different scales.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-24)" }}>
        {/* Bar + Line */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Growth</CardTitle>
            <CardDescription>Bar chart with line overlay</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
              <ComposedChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                  yAxisId="left"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `${value}%`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                  yAxisId="left"
                  dataKey="revenue"
                  fill="var(--color-revenue)"
                  radius={[4, 4, 0, 0]}
                  barSize={32}
                />
                <Line
                  yAxisId="right"
                  dataKey="growth"
                  type="natural"
                  stroke="var(--color-growth)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-growth)", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </ComposedChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Revenue and growth trending together <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none" style={{ color: "var(--text-subdued-1)" }}>
              Revenue on left axis, growth rate on right axis
            </div>
          </CardFooter>
        </Card>

        {/* Dual Y-axis: Visitors + Conversion */}
        <Card>
          <CardHeader>
            <CardTitle>Visitors & Conversion Rate</CardTitle>
            <CardDescription>Dual Y-axis comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={dualAxisConfig} className="min-h-[300px] w-full">
              <ComposedChart accessibilityLayer data={dualAxisData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                  yAxisId="left"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `${value}%`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                  yAxisId="left"
                  dataKey="visitors"
                  fill="var(--color-visitors)"
                  radius={[4, 4, 0, 0]}
                  barSize={32}
                />
                <Line
                  yAxisId="right"
                  dataKey="conversion"
                  type="natural"
                  stroke="var(--color-conversion)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-conversion)", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </ComposedChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
