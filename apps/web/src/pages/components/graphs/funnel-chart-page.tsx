"use client"

import { TrendingUp } from "lucide-react"
import { Funnel, FunnelChart, LabelList } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@repo/ui"
const funnelData = [
  { name: "Visitors", value: 10000, fill: "var(--color-visitors)" },
  { name: "Signups", value: 7500, fill: "var(--color-signups)" },
  { name: "Active", value: 5000, fill: "var(--color-active)" },
  { name: "Paid", value: 2500, fill: "var(--color-paid)" },
  { name: "Enterprise", value: 1000, fill: "var(--color-enterprise)" },
]

const chartConfig = {
  value: {
    label: "Count",
  },
  visitors: {
    label: "Visitors",
    color: "var(--primary-50)",
  },
  signups: {
    label: "Signups",
    color: "var(--primary-40)",
  },
  active: {
    label: "Active Users",
    color: "var(--primary-30)",
  },
  paid: {
    label: "Paid Users",
    color: "var(--secondary-50)",
  },
  enterprise: {
    label: "Enterprise",
    color: "var(--secondary-40)",
  },
} satisfies ChartConfig

const percentData = funnelData.map((item, index) => ({
  ...item,
  percentage: index === 0 ? 100 : Math.round((item.value / funnelData[0].value) * 100),
}))

export default function FunnelChartPage() {
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
          Funnel Chart
        </h1>
        <p style={{ color: "var(--text-subdued-1)", marginTop: "var(--space-8)" }}>
          Stage-based conversion visualization, showing how values decrease through sequential stages.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-24)" }}>
        {/* Simple Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>User journey from visitors to enterprise</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
              <FunnelChart accessibilityLayer>
                <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                <Funnel
                  data={funnelData}
                  dataKey="value"
                  nameKey="name"
                  isAnimationActive
                >
                  <LabelList
                    position="right"
                    dataKey="name"
                    fill="var(--text-default)"
                    stroke="none"
                    style={{ fontSize: "var(--font-size-m)", fontWeight: "var(--font-weight-prominent)" }}
                  />
                  <LabelList
                    position="right"
                    dataKey="value"
                    fill="var(--text-subdued-1)"
                    stroke="none"
                    offset={20}
                    style={{ fontSize: "var(--font-size-s)" }}
                    formatter={(value: number) => value.toLocaleString()}
                  />
                </Funnel>
              </FunnelChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              10% overall conversion rate <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none" style={{ color: "var(--text-subdued-1)" }}>
              1,000 enterprise customers from 10,000 visitors
            </div>
          </CardFooter>
        </Card>

        {/* Funnel with Percentages */}
        <Card>
          <CardHeader>
            <CardTitle>Funnel with Percentages</CardTitle>
            <CardDescription>Conversion rates at each stage</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
              <FunnelChart accessibilityLayer>
                <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                <Funnel
                  data={percentData}
                  dataKey="value"
                  nameKey="name"
                  isAnimationActive
                >
                  <LabelList
                    position="right"
                    dataKey="name"
                    fill="var(--text-default)"
                    stroke="none"
                    style={{ fontSize: "var(--font-size-m)", fontWeight: "var(--font-weight-prominent)" }}
                  />
                  <LabelList
                    position="right"
                    dataKey="percentage"
                    fill="var(--text-subdued-1)"
                    stroke="none"
                    offset={20}
                    style={{ fontSize: "var(--font-size-s)" }}
                    formatter={(value: number) => `${value}%`}
                  />
                </Funnel>
              </FunnelChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
