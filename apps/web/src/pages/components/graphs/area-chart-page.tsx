"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@repo/ui"
const chartData = [
  
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary-50)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--secondary-50)",
  },
} satisfies ChartConfig

export default function AreaChartPage() {
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
          Area Chart
        </h1>
        <p style={{ color: "var(--text-subdued-1)", marginTop: "var(--space-8)" }}>
          A line chart with the area below filled, ideal for showing trends and volume over time.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-24)" }}>
        {/* Simple Area Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Simple Area Chart</CardTitle>
            <CardDescription>Single series with gradient fill</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <AreaChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <defs>
                  <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="url(#fillDesktop)"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none" style={{ color: "var(--text-subdued-1)" }}>
              Showing desktop visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>

        {/* Stacked Area Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Stacked Area Chart</CardTitle>
            <CardDescription>Multiple series stacked with gradient fills</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <AreaChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <defs>
                  <linearGradient id="fillDesktopStacked" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="fillMobileStacked" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="mobile"
                  type="natural"
                  fill="url(#fillMobileStacked)"
                  stroke="var(--color-mobile)"
                  strokeWidth={2}
                  stackId="a"
                />
                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="url(#fillDesktopStacked)"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="leading-none" style={{ color: "var(--text-subdued-1)" }}>
              Showing total visitors (desktop + mobile) for the last 6 months
            </div>
          </CardFooter>
        </Card>

        {/* Step Area Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Step Area Chart</CardTitle>
            <CardDescription>Area chart with step interpolation</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <AreaChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <defs>
                  <linearGradient id="fillDesktopStep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="desktop"
                  type="step"
                  fill="url(#fillDesktopStep)"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
