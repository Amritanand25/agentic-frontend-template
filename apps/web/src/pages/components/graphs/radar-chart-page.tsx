"use client"

import { TrendingUp } from "lucide-react"
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
} from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@repo/ui"
const chartData = [
  { attribute: "Speed", A: 120, B: 98 },
  { attribute: "Power", A: 98, B: 130 },
  { attribute: "Agility", A: 86, B: 110 },
  { attribute: "Defense", A: 99, B: 85 },
  { attribute: "Stamina", A: 85, B: 90 },
  { attribute: "Range", A: 65, B: 105 },
]

const chartConfig = {
  A: {
    label: "Player A",
    color: "var(--primary-50)",
  },
  B: {
    label: "Player B",
    color: "var(--secondary-50)",
  },
} satisfies ChartConfig

export default function RadarChartPage() {
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
          Radar Chart
        </h1>
        <p style={{ color: "var(--text-subdued-1)", marginTop: "var(--space-8)" }}>
          Multi-axis chart for comparing multiple attributes across categories.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-24)" }}>
        {/* Simple Radar */}
        <Card>
          <CardHeader>
            <CardTitle>Simple Radar Chart</CardTitle>
            <CardDescription>Single player attribute comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="mx-auto min-h-[300px] w-full max-w-[500px]">
              <RadarChart accessibilityLayer data={chartData}>
                <ChartTooltip content={<ChartTooltipContent />} />
                <PolarGrid stroke="var(--grey-40)" strokeOpacity={0.4} />
                <PolarAngleAxis dataKey="attribute" />
                <Radar
                  dataKey="A"
                  fill="var(--color-A)"
                  fillOpacity={0.3}
                  stroke="var(--color-A)"
                  strokeWidth={2}
                />
              </RadarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Speed is the strongest attribute <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none" style={{ color: "var(--text-subdued-1)" }}>
              Player A attribute profile
            </div>
          </CardFooter>
        </Card>

        {/* Multi-Series Radar */}
        <Card>
          <CardHeader>
            <CardTitle>Multi-Series Radar</CardTitle>
            <CardDescription>Comparing two players side by side</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="mx-auto min-h-[300px] w-full max-w-[500px]">
              <RadarChart accessibilityLayer data={chartData}>
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <PolarGrid stroke="var(--grey-40)" strokeOpacity={0.4} />
                <PolarAngleAxis dataKey="attribute" />
                <Radar
                  dataKey="A"
                  fill="var(--color-A)"
                  fillOpacity={0.3}
                  stroke="var(--color-A)"
                  strokeWidth={2}
                />
                <Radar
                  dataKey="B"
                  fill="var(--color-B)"
                  fillOpacity={0.3}
                  stroke="var(--color-B)"
                  strokeWidth={2}
                />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Radar with Dots */}
        <Card>
          <CardHeader>
            <CardTitle>Radar with Dots</CardTitle>
            <CardDescription>Data points visible at each vertex</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="mx-auto min-h-[300px] w-full max-w-[500px]">
              <RadarChart accessibilityLayer data={chartData}>
                <ChartTooltip content={<ChartTooltipContent />} />
                <PolarGrid stroke="var(--grey-40)" strokeOpacity={0.4} />
                <PolarAngleAxis dataKey="attribute" />
                <Radar
                  dataKey="A"
                  fill="var(--color-A)"
                  fillOpacity={0.2}
                  stroke="var(--color-A)"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "var(--color-A)" }}
                />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
