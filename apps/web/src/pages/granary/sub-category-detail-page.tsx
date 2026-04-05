import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  DataGrid,
  TitleBar,
  ToggleGroup,
  ToggleGroupItem,
  EmptyState,
  TablePagination,
  type Column,
} from "@repo/ui";
import { GranaryFilterBar } from "@/features/granary/components/global-filter-bar";
import { ExportButton } from "@/features/granary/components/export-button";
import { BusinessFormatTable } from "@/features/granary/components/business-format-table";
import { SalesTrendChart } from "@/features/granary/components/sales-trend-chart";
import { GrossMarginChart } from "@/features/granary/components/gross-margin-chart";
import { RegionPerformanceTable } from "@/features/granary/components/region-performance-table";
import { OverstockedStoresChart } from "@/features/granary/components/overstocked-stores-chart";
import {
  mockBusinessFormats,
  mockCategorySalesTrend,
  mockGrossMarginData,
  mockRegionPerformance,
  mockOverstockedStores,
  mockBrickPerformance,
} from "@/features/granary/mock-data/category-mock";
import type { BrickPerformance } from "@/features/granary/types";

type BrickFilter = "all" | "top10" | "bottom10" | "new";

const brickColumns: Column<BrickPerformance>[] = [
  {
    key: "brickCode",
    name: "Brick Code",
    width: 120,
  },
  {
    key: "brickName",
    name: "Brick Name",
    width: 200,
  },
  {
    key: "firstSalesDate",
    name: "First Sales Date",
    width: 150,
  },
  {
    key: "salesContribution",
    name: "Sales Contribution",
    width: 150,
    renderCell: ({ row }) => <span>{row.salesContribution.toFixed(2)}%</span>,
  },
  {
    key: "totalSales",
    name: "Total Sales (\u20B9)",
    width: 140,
    renderCell: ({ row }) => (
      <span>
        {"\u20B9"}
        {row.totalSales.toFixed(2)}
      </span>
    ),
  },
  {
    key: "salesQty",
    name: "Sales Qty",
    width: 120,
    renderCell: ({ row }) => (
      <span>{row.salesQty.toLocaleString("en-IN")}</span>
    ),
  },
];

export default function SubCategoryDetailPage() {
  const { subCategoryName } = useParams<{ subCategoryName: string }>();
  const navigate = useNavigate();
  const [brickFilter, setBrickFilter] = useState<BrickFilter>("all");
  const [brickPage, setBrickPage] = useState(1);
  const [brickRowsPerPage, setBrickRowsPerPage] = useState(10);

  const displayName = decodeURIComponent(subCategoryName ?? "").toUpperCase();

  const filteredBricks = useMemo(() => {
    // With real data, filtering would apply here based on brickFilter
    return mockBrickPerformance;
  }, [brickFilter]);

  const paginatedBricks = useMemo(() => {
    const start = (brickPage - 1) * brickRowsPerPage;
    return filteredBricks.slice(start, start + brickRowsPerPage);
  }, [filteredBricks, brickPage, brickRowsPerPage]);

  return (
    <div className="flex flex-col gap-[var(--space-8)]">
      {/* Title Bar with Back Button */}
      <TitleBar
        title={`Sub Category: ${displayName}`}
        onBack={() => navigate("/granary/assortment/category")}
        style={{
          backgroundColor: "transparent",
          padding: 0,
          borderBottom: "none",
        }}
      />

      {/* Filter Bar */}
      <GranaryFilterBar
        visibleFilters={[
          "zone",
          "format",
          "state",
          "city",
          "store",
          "segment",
          "period",
        ]}
      />

      {/* Business Format Sales Section */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-8)",
          padding: "var(--space-16)",
        }}
      >
        <BusinessFormatTable data={mockBusinessFormats} />
      </div>

      {/* Charts Row: Sales Trend + Gross Margin */}
      <div className="grid grid-cols-2 gap-[var(--space-8)]">
        <SalesTrendChart data={mockCategorySalesTrend} />
        <div
          style={{
            backgroundColor: "var(--surface-0)",
            borderRadius: "var(--radius-8)",
            padding: "var(--space-16)",
          }}
        >
          <GrossMarginChart data={mockGrossMarginData} />
        </div>
      </div>

      {/* Bottom Row: Region Performance + Overstocked Stores */}
      <div className="grid grid-cols-2 gap-[var(--space-8)]">
        <div
          style={{
            backgroundColor: "var(--surface-0)",
            borderRadius: "var(--radius-8)",
            padding: "var(--space-16)",
          }}
        >
          <RegionPerformanceTable data={mockRegionPerformance} />
        </div>
        <div
          style={{
            backgroundColor: "var(--surface-0)",
            borderRadius: "var(--radius-8)",
            padding: "var(--space-16)",
          }}
        >
          <OverstockedStoresChart data={mockOverstockedStores} />
        </div>
      </div>

      {/* Brick Performance Section */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-24)",
          padding: "var(--space-16)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-8)",
        }}
      >
        <div className="flex items-center justify-between">
          <h3
            style={{
              margin: 0,
              fontSize: "var(--font-size-m)",
              fontWeight: "var(--font-weight-heading)",
              color: "var(--text-default)",
            }}
          >
            Brick Performance
          </h3>
          <div className="flex items-center" style={{ gap: "var(--space-12)" }}>
            <ToggleGroup
              type="single"
              value={brickFilter}
              onValueChange={(val) => {
                if (val) {
                  setBrickFilter(val as BrickFilter);
                  setBrickPage(1);
                }
              }}
              variant="outline"
              size="sm"
            >
              <ToggleGroupItem value="all">All</ToggleGroupItem>
              <ToggleGroupItem value="top10">Top 10</ToggleGroupItem>
              <ToggleGroupItem value="bottom10">Bottom 10</ToggleGroupItem>
              <ToggleGroupItem value="new">New</ToggleGroupItem>
            </ToggleGroup>
            <ExportButton />
          </div>
        </div>

        {filteredBricks.length === 0 ? (
          <EmptyState
            title="No Brick Performance Data"
            description="There is no brick performance data available for this sub-category yet."
            variant="single"
            iconSize="md"
          />
        ) : (
          <>
            <DataGrid<BrickPerformance>
              className="rdg-inline"
              columns={brickColumns}
              rows={paginatedBricks}
            />
            <TablePagination
              totalRows={filteredBricks.length}
              page={brickPage}
              rowsPerPage={brickRowsPerPage}
              onPageChange={setBrickPage}
              onRowsPerPageChange={(rpp) => {
                setBrickRowsPerPage(rpp);
                setBrickPage(1);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
