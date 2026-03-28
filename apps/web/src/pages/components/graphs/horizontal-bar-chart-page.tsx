"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@repo/ui"
const chartData = [
  { browser: "Chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "Safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "Firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "Edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "Other", visitors: 90, fill: "var(--color-other)" },
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

export default function HorizontalBarChartPage() {
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
          Horizontal Bar Chart
        </h1>
        <p style={{ color: "var(--text-subdued-1)", marginTop: "var(--space-8)" }}>
          Horizontal bars ideal for ranked or categorical data with long labels.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-24)" }}>
        {/* Simple Horizontal Bar */}
        <Card>
          <CardHeader>
            <CardTitle>Horizontal Bar Chart</CardTitle>
            <CardDescription>Browser usage by visitors</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{ left: 16 }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="browser"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="visitors" fill="var(--color-chrome)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Chrome leads with 275 visitors <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none" style={{ color: "var(--text-subdued-1)" }}>
              Top 5 browsers by visitor count
            </div>
          </CardFooter>
        </Card>

        {/* Multi-colored Horizontal Bar */}
        <Card>
          <CardHeader>
            <CardTitle>Multi-colored Horizontal Bar</CardTitle>
            <CardDescription>Each bar colored by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{ left: 16 }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="browser"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value}
                />
                <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip
                  content={<ChartTooltipContent nameKey="browser" />}
                />
                <Bar dataKey="visitors" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry) => (
                    <rect key={entry.browser} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
