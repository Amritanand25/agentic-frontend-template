"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Scatter, ScatterChart, XAxis, YAxis, ZAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@repo/ui"
const scatterData = [
  { x: 10, y: 30 },
  { x: 30, y: 180 },
  { x: 45, y: 100 },
  { x: 50, y: 250 },
  { x: 70, y: 200 },
  { x: 100, y: 400 },
  { x: 25, y: 90 },
  { x: 60, y: 150 },
  { x: 80, y: 320 },
  { x: 35, y: 220 },
]

const groupAData = [
  { x: 10, y: 30, z: 100 },
  { x: 30, y: 180, z: 200 },
  { x: 45, y: 100, z: 150 },
  { x: 50, y: 250, z: 300 },
  { x: 70, y: 200, z: 180 },
]

const groupBData = [
  { x: 20, y: 80, z: 120 },
  { x: 40, y: 150, z: 250 },
  { x: 55, y: 130, z: 170 },
  { x: 65, y: 300, z: 220 },
  { x: 85, y: 350, z: 280 },
]

const chartConfig = {
  x: {
    label: "Weight (kg)",
    color: "var(--primary-50)",
  },
  y: {
    label: "Height (cm)",
    color: "var(--primary-50)",
  },
} satisfies ChartConfig

const multiConfig = {
  groupA: {
    label: "Group A",
    color: "var(--primary-50)",
  },
  groupB: {
    label: "Group B",
    color: "var(--secondary-50)",
  },
} satisfies ChartConfig

export default function ScatterChartPage() {
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
          Scatter Chart
        </h1>
        <p style={{ color: "var(--text-subdued-1)", marginTop: "var(--space-8)" }}>
          Two-axis plot showing correlation between variables, with optional size encoding.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-24)" }}>
        {/* Simple Scatter */}
        <Card>
          <CardHeader>
            <CardTitle>Simple Scatter Plot</CardTitle>
            <CardDescription>Weight vs Height correlation</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
              <ScatterChart accessibilityLayer>
                <CartesianGrid />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Weight"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Height"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Scatter
                  data={scatterData}
                  fill="var(--primary-50)"
                  fillOpacity={0.7}
                />
              </ScatterChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Positive correlation detected <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none" style={{ color: "var(--text-subdued-1)" }}>
              10 data points plotted
            </div>
          </CardFooter>
        </Card>

        {/* Multi-Group Scatter */}
        <Card>
          <CardHeader>
            <CardTitle>Multi-Group Scatter</CardTitle>
            <CardDescription>Two groups with bubble sizes</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={multiConfig} className="min-h-[300px] w-full">
              <ScatterChart accessibilityLayer>
                <CartesianGrid />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Weight"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Height"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ZAxis type="number" dataKey="z" range={[40, 300]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Scatter
                  name="groupA"
                  data={groupAData}
                  fill="var(--color-groupA)"
                  fillOpacity={0.7}
                />
                <Scatter
                  name="groupB"
                  data={groupBData}
                  fill="var(--color-groupB)"
                  fillOpacity={0.7}
                />
              </ScatterChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
