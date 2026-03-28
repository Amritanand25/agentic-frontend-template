"use client"

import { TrendingUp } from "lucide-react"
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@repo/ui"
const simpleData = [
  { name: "Progress", value: 73, fill: "var(--color-progress)" },
]

const simpleConfig = {
  progress: {
    label: "Progress",
    color: "var(--primary-50)",
  },
} satisfies ChartConfig

const stackedData = [
  { name: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { name: "safari", visitors: 200, fill: "var(--color-safari)" },
  { name: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { name: "edge", visitors: 173, fill: "var(--color-edge)" },
]

const stackedConfig = {
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
} satisfies ChartConfig

export default function RadialBarChartPage() {
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
          Radial Bar Chart
        </h1>
        <p style={{ color: "var(--text-subdued-1)", marginTop: "var(--space-8)" }}>
          Circular progress and gauge visualizations for displaying completion or comparison metrics.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-24)" }}>
        {/* Simple Radial (Gauge) */}
        <Card>
          <CardHeader>
            <CardTitle>Radial Gauge</CardTitle>
            <CardDescription>Single metric progress indicator</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={simpleConfig} className="mx-auto min-h-[250px] w-full max-w-[300px]">
              <RadialBarChart
                data={simpleData}
                startAngle={90}
                endAngle={90 - 360 * (73 / 100)}
                innerRadius={80}
                outerRadius={110}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}
                />
                <RadialBar
                  dataKey="value"
                  cornerRadius={4}
                  fill="var(--color-progress)"
                  background={{ fill: "var(--grey-20)" }}
                />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  <tspan
                    style={{
                      fontSize: "var(--font-size-2xl)",
                      fontWeight: "var(--font-weight-heading)",
                      fill: "var(--text-default)",
                    }}
                  >
                    73%
                  </tspan>
                </text>
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              On track to reach target <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none" style={{ color: "var(--text-subdued-1)" }}>
              73% of monthly goal achieved
            </div>
          </CardFooter>
        </Card>

        {/* Stacked Radial Bars */}
        <Card>
          <CardHeader>
            <CardTitle>Stacked Radial Bars</CardTitle>
            <CardDescription>Multiple rings for comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={stackedConfig} className="mx-auto min-h-[300px] w-full max-w-[400px]">
              <RadialBarChart
                data={stackedData}
                innerRadius={30}
                outerRadius={110}
                startAngle={90}
                endAngle={-270}
              >
                <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                <RadialBar
                  dataKey="visitors"
                  cornerRadius={4}
                  background={{ fill: "var(--grey-20)" }}
                />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
