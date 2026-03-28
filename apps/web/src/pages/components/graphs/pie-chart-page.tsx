"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@repo/ui"
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--primary-50)",
  },
  safari: {
    label: "Safari",
    color: "var(--secondary-50)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--tertiary-50)",
  },
  edge: {
    label: "Edge",
    color: "var(--success-50)",
  },
  other: {
    label: "Other",
    color: "var(--warning-50)",
  },
} satisfies ChartConfig

export default function PieChartPage() {
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
          Pie Chart
        </h1>
        <p style={{ color: "var(--text-subdued-1)", marginTop: "var(--space-8)" }}>
          Circular chart showing proportional data distribution across categories.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-24)" }}>
        {/* Simple Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Simple Pie Chart</CardTitle>
            <CardDescription>Browser market share</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="mx-auto min-h-[250px] w-full max-w-[400px]">
              <PieChart accessibilityLayer>
                <ChartTooltip content={<ChartTooltipContent nameKey="browser" />} />
                <Pie
                  data={chartData}
                  dataKey="visitors"
                  nameKey="browser"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  strokeWidth={2}
                  stroke="var(--surface-0)"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Chrome dominates with 30% share <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none" style={{ color: "var(--text-subdued-1)" }}>
              Browser distribution for current month
            </div>
          </CardFooter>
        </Card>

        {/* Pie Chart with Legend */}
        <Card>
          <CardHeader>
            <CardTitle>Pie Chart with Legend</CardTitle>
            <CardDescription>Includes legend for category identification</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="mx-auto min-h-[300px] w-full max-w-[400px]">
              <PieChart accessibilityLayer>
                <ChartTooltip content={<ChartTooltipContent nameKey="browser" />} />
                <ChartLegend content={<ChartLegendContent nameKey="browser" />} />
                <Pie
                  data={chartData}
                  dataKey="visitors"
                  nameKey="browser"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  strokeWidth={2}
                  stroke="var(--surface-0)"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Pie Chart with Labels */}
        <Card>
          <CardHeader>
            <CardTitle>Pie Chart with Labels</CardTitle>
            <CardDescription>Values displayed on each slice</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="mx-auto min-h-[300px] w-full max-w-[400px]">
              <PieChart accessibilityLayer>
                <ChartTooltip content={<ChartTooltipContent nameKey="browser" />} />
                <Pie
                  data={chartData}
                  dataKey="visitors"
                  nameKey="browser"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  strokeWidth={2}
                  stroke="var(--surface-0)"
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
