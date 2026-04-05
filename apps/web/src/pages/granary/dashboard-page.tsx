import { useState } from "react";
import {
  DataGrid,
  Input,
  ProgressBar,
  ScrollArea,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  type Column,
} from "@repo/ui";
import { Search } from "lucide-react";
import { GranaryFilterBar } from "@/features/granary/components/global-filter-bar";
import { KPICard } from "@/features/granary/components/kpi-card";
import { SalesTrendChart } from "@/features/granary/components/sales-trend-chart";
import {
  mockKPIs,
  mockOverallPerformance,
  mockBrandPerformance,
  mockSalesTrend,
} from "@/features/granary/mock-data/dashboard-mock";
import type { BrandPerformance } from "@/features/granary/types";

const ALL_FILTERS = [
  "zone",
  "format",
  "state",
  "city",
  "store",
  "segment",
  "category",
  "period",
] as const;

const brandColumns: Column<BrandPerformance>[] = [
  { key: "brandId", name: "Brand ID", width: 90 },
  { key: "brandName", name: "Brand Name", minWidth: 120 },
  {
    key: "cySales",
    name: "CY Sales (\u20B9L)",
    width: 110,
    renderCell: ({ row }) => <span>{row.cySales.toFixed(2)}</span>,
  },
  {
    key: "cyMargin",
    name: "CY Margin (%)",
    width: 120,
    renderCell: ({ row }) => (
      <span
        style={{
          color: row.cyMargin < 0 ? "var(--error-50)" : "var(--text-default)",
        }}
      >
        {row.cyMargin.toFixed(2)}
      </span>
    ),
  },
  {
    key: "lySales",
    name: "LY Sales (\u20B9L)",
    width: 110,
    renderCell: ({ row }) => <span>{row.lySales.toFixed(2)}</span>,
  },
];

function OverallPerformanceCard() {
  const { totalNetSales, categoryContribution } = mockOverallPerformance;

  const salesMax = Math.max(totalNetSales.current, totalNetSales.lastYear) || 1;
  const contribMax =
    Math.max(categoryContribution.current, categoryContribution.lastYear) || 1;

  return (
    <div
      style={{
        backgroundColor: "var(--surface-0)",
        borderRadius: "var(--radius-8)",
        padding: "var(--space-16)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-16)",
      }}
    >
      <span
        style={{
          fontSize: "var(--font-size-m)",
          fontWeight: "var(--font-weight-heading)",
          color: "var(--text-default)",
        }}
      >
        Overall Performance (Current year vs Last year)
      </span>

      {/* Total Net Sales */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-8)",
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
          }}
        >
          <span>Total Net Sales</span>
          <span>
            {"\u20B9"}
            {totalNetSales.current.toFixed(2)} vs {"\u20B9"}
            {totalNetSales.lastYear.toFixed(2)} {totalNetSales.unit}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
          }}
        >
          <ProgressBar
            value={totalNetSales.current}
            max={salesMax}
            color="default"
            size="sm"
            label="Current Year"
            showLabel
            showValue={false}
          />
          <ProgressBar
            value={totalNetSales.lastYear}
            max={salesMax}
            color="warning"
            size="sm"
            label="Last Year"
            showLabel
            showValue={false}
          />
        </div>
      </div>

      {/* Category Contribution */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-8)",
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
          }}
        >
          <span>Category Contribution</span>
          <span>
            {"\u20B9"}
            {categoryContribution.current.toFixed(2)} vs {"\u20B9"}
            {categoryContribution.lastYear.toFixed(2)}{" "}
            {categoryContribution.unit}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
          }}
        >
          <ProgressBar
            value={categoryContribution.current}
            max={contribMax}
            color="default"
            size="sm"
            label="Current Year"
            showLabel
            showValue={false}
          />
          <ProgressBar
            value={categoryContribution.lastYear}
            max={contribMax}
            color="warning"
            size="sm"
            label="Last Year"
            showLabel
            showValue={false}
          />
        </div>
      </div>
    </div>
  );
}

function BrandPerformanceCard() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBrands = mockBrandPerformance.filter(
    (brand) =>
      brand.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.brandId.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      style={{
        backgroundColor: "var(--surface-0)",
        borderRadius: "var(--radius-8)",
        padding: "var(--space-16)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-12)",
      }}
    >
      <div className="flex items-center justify-between">
        <span
          style={{
            fontSize: "var(--font-size-m)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
          }}
        >
          Brand Performance (Top 50)
        </span>
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              style={{
                display: "inline-flex",
                cursor: "help",
                color: "var(--text-subdued-2)",
              }}
            >
              <Search size={14} />
            </span>
          </TooltipTrigger>
          <TooltipContent>Search brands by name or ID</TooltipContent>
        </Tooltip>
      </div>

      <div style={{ maxWidth: 240 }}>
        <Input
          placeholder="Search brands..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ScrollArea style={{ maxHeight: 280 }}>
        <DataGrid
          className="rdg-inline"
          columns={brandColumns}
          rows={filteredBrands}
        />
      </ScrollArea>
    </div>
  );
}

export default function GranaryDashboardPage() {
  return (
    <div className="flex flex-col gap-[var(--space-8)]">
      {/* Title row */}
      <div className="flex items-center justify-between">
        <h1
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            margin: 0,
          }}
        >
          Dashboard
        </h1>
        <span
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
          }}
        >
          Mar 30, 2026 - Apr 3, 2026
        </span>
      </div>

      {/* Filters */}
      <GranaryFilterBar visibleFilters={[...ALL_FILTERS]} />

      {/* KPI Cards — 4 cols first row, 3 cols second row */}
      <div className="grid grid-cols-4 gap-[var(--space-8)]">
        {mockKPIs.slice(0, 4).map((kpi) => (
          <KPICard key={kpi.label} kpi={kpi} />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-[var(--space-8)]">
        {mockKPIs.slice(4).map((kpi) => (
          <KPICard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      {/* Two-column: Overall Performance + Brand Performance */}
      <div className="grid grid-cols-2 gap-[var(--space-8)]">
        <OverallPerformanceCard />
        <BrandPerformanceCard />
      </div>

      {/* Sales Trend Analysis — full width */}
      <SalesTrendChart data={mockSalesTrend} />
    </div>
  );
}
