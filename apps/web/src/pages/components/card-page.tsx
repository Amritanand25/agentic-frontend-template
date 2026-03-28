import { useState } from "react"
import { HelpCircle, Search } from "lucide-react"
import { Card, Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui"
// --- Shared card heading + divider style ---
const cardHeaderStyle: React.CSSProperties = {
  padding: "var(--space-16) var(--space-20)",
  paddingBottom: "var(--space-12)",
}

const cardDividerStyle: React.CSSProperties = {
  height: 1,
  backgroundColor: "var(--grey-40)",
  margin: "0",
}

const cardBodyStyle: React.CSSProperties = {
  padding: "var(--space-16) var(--space-20)",
}

const headingTextStyle: React.CSSProperties = {
  fontSize: "var(--font-size-l)",
  fontWeight: "var(--font-weight-heading)",
  color: "var(--text-default)",
  lineHeight: "var(--line-height-l)",
}

const subTextStyle: React.CSSProperties = {
  fontSize: "var(--font-size-s)",
  color: "var(--text-subdued-1)",
  lineHeight: "var(--line-height-s)",
  marginTop: "var(--space-4)",
}

// --- KPI metric data ---
const kpiMetrics = [
  { label: "Total Sales", value: "₹0.67 Cr", tooltip: "Total sales value for the selected period" },
  { label: "Sales Quantity", value: "1.10 L", tooltip: "Total units sold" },
  { label: "Markdown", value: "₹0.00 Cr", tooltip: "Total markdown amount" },
  { label: "Active SKUs (90 days)", value: "4,336", tooltip: "Number of active SKUs in the last 90 days" },
  { label: "Average ROS (90 days)", value: "2.27", tooltip: "Average rate of sale over the last 90 days" },
  { label: "Average DOH (90 days)", value: "15 days", tooltip: "Average days on hand over the last 90 days" },
  { label: "Availability (90 days)", value: "83.55%", tooltip: "Product availability percentage over the last 90 days" },
]

// --- Performance data ---
const performanceMetrics = [
  { label: "Total Net Sales", currentValue: "₹9.29 Cr", previousValue: "₹1.03 Cr", percentage: 85 },
  { label: "Category Contribution", currentValue: "₹9.29 Cr", previousValue: "₹1.03 Cr", percentage: 78 },
]

// --- Brand table data ---
const brandData = [
  { id: "06688", name: "LOOSE", cySales: "₹24.44 L", cyMargin: "8.01%", lySales: "₹17.34 L", lyMargin: "10.23%" },
  { id: "A989", name: "Good Life", cySales: "₹16.18 L", cyMargin: "3.34%", lySales: "₹18.20 L", lyMargin: "9.24%" },
  { id: "02010", name: "AMUL", cySales: "₹7.88 L", cyMargin: "6.52%", lySales: "₹7.21 L", lyMargin: "0.64%" },
  { id: "02265", name: "FORTUNE", cySales: "₹7.27 L", cyMargin: "8.43%", lySales: "₹3.74 L", lyMargin: "9.70%" },
  { id: "02251", name: "PRIYA", cySales: "₹6.30 L", cyMargin: "0.22%", lySales: "₹3.28 L", lyMargin: "5.03%" },
  { id: "06515", name: "LOOSE", cySales: "₹4.71 L", cyMargin: "10.69%", lySales: "₹2.58 L", lyMargin: "18.93%" },
]

export default function CardPage() {
  const [brandSearch, setBrandSearch] = useState("")

  const filteredBrands = brandData.filter(
    (b) =>
      b.name.toLowerCase().includes(brandSearch.toLowerCase()) ||
      b.id.toLowerCase().includes(brandSearch.toLowerCase())
  )

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-32)" }}>
      {/* Header */}
      <div>
        <h1
          style={{
            fontSize: "var(--font-size-2xl)",
            fontWeight: "var(--font-weight-heading)",
            lineHeight: "var(--line-height-xl)",
            color: "var(--text-default)",
          }}
        >
          Card
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-l)",
            lineHeight: "var(--line-height-l)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-8)",
          }}
        >
          Displays a card with header, content, and optional footer. Some cards
          use a divider after the header, some don't. Cards are flat with a subtle
          border and no shadow.
        </p>
      </div>

      {/* Basic Card */}
      <section>
        <p
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Basic
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "var(--space-16)" }}>
          <Card>
            <div style={{ padding: "var(--space-20)" }}>
              <p style={headingTextStyle}>Card Title</p>
              <p style={subTextStyle}>Card Description</p>
              <p style={{ fontSize: "var(--font-size-m)", color: "var(--text-subdued-1)", marginTop: "var(--space-12)" }}>
                Card Content
              </p>
              <div style={{ marginTop: "var(--space-16)" }}>
                <Button>Action</Button>
              </div>
            </div>
          </Card>

          <Card>
            <div style={{ padding: "var(--space-20)" }}>
              <p style={headingTextStyle}>Notifications</p>
              <p style={subTextStyle}>You have 3 unread messages.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)", marginTop: "var(--space-12)" }}>
                <div className="flex items-center" style={{ gap: "var(--space-8)" }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "var(--radius-full)",
                      backgroundColor: "var(--primary-50)",
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <p style={{ fontSize: "var(--font-size-m)", fontWeight: "var(--font-weight-prominent)", color: "var(--text-default)" }}>
                      Your call has been confirmed.
                    </p>
                    <p style={{ fontSize: "var(--font-size-s)", color: "var(--text-subdued-1)" }}>
                      5 min ago
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "var(--space-16)" }}>
                <Button className="w-full">Mark all as read</Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* KPI / Metric Cards */}
      <section>
        <p
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          KPI / Metric Cards
        </p>
        <TooltipProvider>
          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ gap: "var(--space-12)" }}
          >
            {kpiMetrics.map((kpi) => (
              <Card key={kpi.label}>
                <div style={{ padding: "var(--space-16) var(--space-20)" }}>
                  <div className="flex items-center" style={{ gap: "var(--space-6)", marginBottom: "var(--space-8)" }}>
                    <span
                      style={{
                        fontSize: "var(--font-size-s)",
                        color: "var(--text-subdued-1)",
                        lineHeight: "var(--line-height-s)",
                      }}
                    >
                      {kpi.label}
                    </span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle
                          size={14}
                          className="cursor-help"
                          style={{ color: "var(--text-subdued-2)", flexShrink: 0 }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{kpi.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p
                    style={{
                      fontSize: "var(--font-size-xl)",
                      fontWeight: "var(--font-weight-heading)",
                      color: "var(--text-default)",
                      lineHeight: "var(--line-height-l)",
                    }}
                  >
                    {kpi.value}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </TooltipProvider>
      </section>

      {/* Performance Comparison + Data Table side by side */}
      <section>
        <p
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Dashboard Cards
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "var(--space-16)" }}>
          {/* Performance Comparison Card */}
          <Card>
            <div style={cardHeaderStyle}>
              <p style={headingTextStyle}>Overall Performance</p>
              <p style={subTextStyle}>Current year vs Last year</p>
            </div>
            <div style={cardDividerStyle} />
            <div style={cardBodyStyle}>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-24)" }}>
                {performanceMetrics.map((metric) => (
                  <div key={metric.label}>
                    <div
                      className="flex items-center justify-between"
                      style={{ marginBottom: "var(--space-8)" }}
                    >
                      <span
                        style={{
                          fontSize: "var(--font-size-m)",
                          fontWeight: "var(--font-weight-prominent)",
                          color: "var(--text-default)",
                        }}
                      >
                        {metric.label}
                      </span>
                      <div className="flex items-center" style={{ gap: "var(--space-8)" }}>
                        <span
                          style={{
                            fontSize: "var(--font-size-m)",
                            fontWeight: "var(--font-weight-heading)",
                            color: "var(--text-default)",
                          }}
                        >
                          {metric.currentValue}
                        </span>
                        <span
                          style={{
                            fontSize: "var(--font-size-s)",
                            color: "var(--text-subdued-1)",
                          }}
                        >
                          vs {metric.previousValue}
                        </span>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div
                      style={{
                        height: 6,
                        backgroundColor: "var(--grey-20)",
                        borderRadius: "var(--radius-full)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${metric.percentage}%`,
                          backgroundColor: "var(--primary-50)",
                          borderRadius: "var(--radius-full)",
                          transition: "width 500ms ease",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Data Table Card */}
          <Card>
            <div
              className="flex items-center justify-between"
              style={{ ...cardHeaderStyle, gap: "var(--space-16)" }}
            >
              <p style={{ ...headingTextStyle, whiteSpace: "nowrap" }}>
                Brand Performance (Top 50)
              </p>
              <div
                className="flex items-center"
                style={{
                  border: "1px solid var(--grey-40)",
                  borderRadius: "var(--radius-8)",
                  padding: "0 var(--space-8)",
                  height: 36,
                  gap: "var(--space-4)",
                  minWidth: 180,
                }}
              >
                <Search size={14} style={{ color: "var(--text-subdued-2)", flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder="Search by brand name or ID"
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="w-full bg-transparent border-none outline-none"
                  style={{
                    fontSize: "var(--font-size-s)",
                    color: "var(--text-default)",
                    lineHeight: "var(--line-height-s)",
                  }}
                />
              </div>
            </div>
            <div style={cardDividerStyle} />
            <div style={{ padding: "var(--space-4) 0" }}>
              {/* Table */}
              <div style={{ overflow: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr
                      style={{
                        borderBottom: "1px solid var(--grey-40)",
                      }}
                    >
                      {["Brand ID", "Brand Name", "CY Sales", "CY Margin", "LY Sales", "LY Margin"].map(
                        (col) => (
                          <th
                            key={col}
                            style={{
                              padding: "var(--space-8) var(--space-12)",
                              fontSize: "var(--font-size-s)",
                              fontWeight: "var(--font-weight-prominent)",
                              color: "var(--text-subdued-1)",
                              textAlign: "left",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {col}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBrands.map((brand) => (
                      <tr
                        key={brand.id}
                        style={{ borderBottom: "1px solid var(--grey-20)" }}
                      >
                        <td
                          style={{
                            padding: "var(--space-12)",
                            fontSize: "var(--font-size-m)",
                            color: "var(--text-subdued-1)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {brand.id}
                        </td>
                        <td
                          style={{
                            padding: "var(--space-12)",
                            fontSize: "var(--font-size-m)",
                            color: "var(--text-default)",
                            fontWeight: "var(--font-weight-prominent)",
                          }}
                        >
                          {brand.name}
                        </td>
                        <td
                          style={{
                            padding: "var(--space-12)",
                            fontSize: "var(--font-size-m)",
                            color: "var(--text-default)",
                            textAlign: "right",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {brand.cySales}
                        </td>
                        <td
                          style={{
                            padding: "var(--space-12)",
                            fontSize: "var(--font-size-m)",
                            color: "var(--text-default)",
                            textAlign: "right",
                          }}
                        >
                          {brand.cyMargin}
                        </td>
                        <td
                          style={{
                            padding: "var(--space-12)",
                            fontSize: "var(--font-size-m)",
                            color: "var(--text-subdued-1)",
                            textAlign: "right",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {brand.lySales}
                        </td>
                        <td
                          style={{
                            padding: "var(--space-12)",
                            fontSize: "var(--font-size-m)",
                            color: "var(--text-subdued-1)",
                            textAlign: "right",
                          }}
                        >
                          {brand.lyMargin}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Stat Card with Change Indicator */}
      <section>
        <p
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Stat Cards with Change Indicators
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "var(--space-12)" }}>
          <Card>
            <div style={{ padding: "var(--space-20)" }}>
              <span
                style={{
                  fontSize: "var(--font-size-s)",
                  color: "var(--text-subdued-1)",
                  lineHeight: "var(--line-height-s)",
                }}
              >
                Revenue
              </span>
              <div className="flex items-end" style={{ gap: "var(--space-8)", marginTop: "var(--space-4)" }}>
                <span
                  style={{
                    fontSize: "var(--font-size-2xl)",
                    fontWeight: "var(--font-weight-heading)",
                    color: "var(--text-default)",
                    lineHeight: 1,
                  }}
                >
                  ₹12.4 Cr
                </span>
                <span
                  style={{
                    fontSize: "var(--font-size-s)",
                    color: "var(--success-50)",
                    fontWeight: "var(--font-weight-prominent)",
                  }}
                >
                  +12.5%
                </span>
              </div>
              <span
                style={{
                  fontSize: "var(--font-size-xs)",
                  color: "var(--text-subdued-2)",
                  marginTop: "var(--space-4)",
                  display: "block",
                }}
              >
                vs ₹11.0 Cr last year
              </span>
            </div>
          </Card>

          <Card>
            <div style={{ padding: "var(--space-20)" }}>
              <span
                style={{
                  fontSize: "var(--font-size-s)",
                  color: "var(--text-subdued-1)",
                  lineHeight: "var(--line-height-s)",
                }}
              >
                Orders
              </span>
              <div className="flex items-end" style={{ gap: "var(--space-8)", marginTop: "var(--space-4)" }}>
                <span
                  style={{
                    fontSize: "var(--font-size-2xl)",
                    fontWeight: "var(--font-weight-heading)",
                    color: "var(--text-default)",
                    lineHeight: 1,
                  }}
                >
                  8,642
                </span>
                <span
                  style={{
                    fontSize: "var(--font-size-s)",
                    color: "var(--error-50)",
                    fontWeight: "var(--font-weight-prominent)",
                  }}
                >
                  -3.2%
                </span>
              </div>
              <span
                style={{
                  fontSize: "var(--font-size-xs)",
                  color: "var(--text-subdued-2)",
                  marginTop: "var(--space-4)",
                  display: "block",
                }}
              >
                vs 8,928 last year
              </span>
            </div>
          </Card>

          <Card>
            <div style={{ padding: "var(--space-20)" }}>
              <span
                style={{
                  fontSize: "var(--font-size-s)",
                  color: "var(--text-subdued-1)",
                  lineHeight: "var(--line-height-s)",
                }}
              >
                Avg. Basket Size
              </span>
              <div className="flex items-end" style={{ gap: "var(--space-8)", marginTop: "var(--space-4)" }}>
                <span
                  style={{
                    fontSize: "var(--font-size-2xl)",
                    fontWeight: "var(--font-weight-heading)",
                    color: "var(--text-default)",
                    lineHeight: 1,
                  }}
                >
                  ₹1,435
                </span>
                <span
                  style={{
                    fontSize: "var(--font-size-s)",
                    color: "var(--success-50)",
                    fontWeight: "var(--font-weight-prominent)",
                  }}
                >
                  +5.8%
                </span>
              </div>
              <span
                style={{
                  fontSize: "var(--font-size-xs)",
                  color: "var(--text-subdued-2)",
                  marginTop: "var(--space-4)",
                  display: "block",
                }}
              >
                vs ₹1,356 last year
              </span>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
