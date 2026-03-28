"use client"

import { Treemap } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, type ChartConfig, ChartContainer } from "@repo/ui"
const treemapData = [
  {
    name: "Chrome",
    size: 275,
    fill: "var(--primary-50)",
  },
  {
    name: "Safari",
    size: 200,
    fill: "var(--secondary-50)",
  },
  {
    name: "Firefox",
    size: 187,
    fill: "var(--tertiary-50)",
  },
  {
    name: "Edge",
    size: 173,
    fill: "var(--success-50)",
  },
  {
    name: "Opera",
    size: 80,
    fill: "var(--warning-50)",
  },
  {
    name: "Brave",
    size: 60,
    fill: "var(--primary-40)",
  },
  {
    name: "Vivaldi",
    size: 30,
    fill: "var(--secondary-40)",
  },
]

const nestedData = [
  {
    name: "Desktop",
    children: [
      { name: "Chrome", size: 275, fill: "var(--primary-50)" },
      { name: "Firefox", size: 187, fill: "var(--primary-40)" },
      { name: "Edge", size: 173, fill: "var(--primary-30)" },
    ],
  },
  {
    name: "Mobile",
    children: [
      { name: "Safari", size: 200, fill: "var(--secondary-50)" },
      { name: "Chrome Mobile", size: 150, fill: "var(--secondary-40)" },
      { name: "Samsung", size: 90, fill: "var(--secondary-30)" },
    ],
  },
]

const chartConfig = {
  size: {
    label: "Visitors",
  },
} satisfies ChartConfig

interface TreemapContentProps {
  x?: number
  y?: number
  width?: number
  height?: number
  name?: string
  size?: number
  fill?: string
  root?: unknown
  depth?: number
  index?: number
}

function CustomTreemapContent({ x = 0, y = 0, width = 0, height = 0, name, size, fill, depth }: TreemapContentProps) {
  const showLabel = width > 50 && height > 30

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill || "var(--primary-50)"}
        stroke="var(--surface-0)"
        strokeWidth={2}
        rx={4}
        ry={4}
        style={{ opacity: depth === 1 ? 1 : 0.8 }}
      />
      {showLabel && (
        <>
          <text
            x={x + width / 2}
            y={y + height / 2 - 6}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fontSize: width > 80 ? "var(--font-size-s)" : "10px",
              fontWeight: "var(--font-weight-prominent)",
              fill: "white",
            }}
          >
            {name}
          </text>
          {height > 45 && (
            <text
              x={x + width / 2}
              y={y + height / 2 + 10}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: "10px",
                fill: "rgba(255,255,255,0.8)",
              }}
            >
              {size}
            </text>
          )}
        </>
      )}
    </g>
  )
}

export default function TreemapPage() {
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
          Treemap
        </h1>
        <p style={{ color: "var(--text-subdued-1)", marginTop: "var(--space-8)" }}>
          Hierarchical data displayed as nested rectangles, where size represents value.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-24)" }}>
        {/* Simple Treemap */}
        <Card>
          <CardHeader>
            <CardTitle>Simple Treemap</CardTitle>
            <CardDescription>Browser market share by visitors</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
              <Treemap
                data={treemapData}
                dataKey="size"
                nameKey="name"
                aspectRatio={4 / 3}
                content={<CustomTreemapContent />}
              />
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="leading-none" style={{ color: "var(--text-subdued-1)" }}>
              Rectangle size proportional to visitor count
            </div>
          </CardFooter>
        </Card>

        {/* Nested Treemap */}
        <Card>
          <CardHeader>
            <CardTitle>Nested Treemap</CardTitle>
            <CardDescription>Hierarchical data with desktop and mobile categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
              <Treemap
                data={nestedData}
                dataKey="size"
                nameKey="name"
                aspectRatio={4 / 3}
                content={<CustomTreemapContent />}
              />
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
