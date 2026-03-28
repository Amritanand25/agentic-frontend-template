"use client"

import { useMemo } from "react"
import { TrendingUp } from "lucide-react"
import { Pie, PieChart, Label } from "recharts"
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

export default function DonutChartPage() {
  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

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
          Donut Chart
        </h1>
        <p style={{ color: "var(--text-subdued-1)", marginTop: "var(--space-8)" }}>
          A pie chart with a center cutout, perfect for displaying a summary metric in the middle.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-24)" }}>
        {/* Donut with Center Label */}
        <Card>
          <CardHeader>
            <CardTitle>Donut with Center Label</CardTitle>
            <CardDescription>Total visitors displayed in center</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="mx-auto min-h-[250px] w-full max-w-[400px]">
              <PieChart accessibilityLayer>
                <ChartTooltip content={<ChartTooltipContent nameKey="browser" hideLabel />} />
                <Pie
                  data={chartData}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius={60}
                  outerRadius={100}
                  strokeWidth={2}
                  stroke="var(--surface-0)"
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              style={{
                                fontSize: "var(--font-size-2xl)",
                                fontWeight: "var(--font-weight-heading)",
                                fill: "var(--text-default)",
                              }}
                            >
                              {totalVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              style={{
                                fontSize: "var(--font-size-s)",
                                fill: "var(--text-subdued-1)",
                              }}
                            >
                              Visitors
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none" style={{ color: "var(--text-subdued-1)" }}>
              Showing total visitors across all browsers
            </div>
          </CardFooter>
        </Card>

        {/* Donut with Legend */}
        <Card>
          <CardHeader>
            <CardTitle>Donut with Legend</CardTitle>
            <CardDescription>Category breakdown with legend</CardDescription>
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
                  innerRadius={60}
                  outerRadius={100}
                  strokeWidth={2}
                  stroke="var(--surface-0)"
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              style={{
                                fontSize: "var(--font-size-2xl)",
                                fontWeight: "var(--font-weight-heading)",
                                fill: "var(--text-default)",
                              }}
                            >
                              {totalVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              style={{
                                fontSize: "var(--font-size-s)",
                                fill: "var(--text-subdued-1)",
                              }}
                            >
                              Visitors
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
