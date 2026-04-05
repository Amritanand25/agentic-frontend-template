import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, Input, TablePagination, type Column } from "@repo/ui";
import { Eye } from "lucide-react";
import { GranaryFilterBar } from "@/features/granary/components/global-filter-bar";
import { ExportButton } from "@/features/granary/components/export-button";
import { BusinessFormatTable } from "@/features/granary/components/business-format-table";
import { SalesTrendChart } from "@/features/granary/components/sales-trend-chart";
import { GrossMarginChart } from "@/features/granary/components/gross-margin-chart";
import { RegionPerformanceTable } from "@/features/granary/components/region-performance-table";
import { OverstockedStoresChart } from "@/features/granary/components/overstocked-stores-chart";
import {
  mockBusinessFormats,
  mockSubCategories,
  mockCategorySalesTrend,
  mockGrossMarginData,
  mockRegionPerformance,
  mockOverstockedStores,
} from "@/features/granary/mock-data/category-mock";
import type { SubCategory } from "@/features/granary/types";

const subCategoryColumns: Column<SubCategory>[] = [
  {
    key: "name",
    name: "Sub Category",
    width: 200,
  },
  {
    key: "articleCount",
    name: "No. of Articles",
    width: 140,
    renderCell: ({ row }) => (
      <span>{row.articleCount.toLocaleString("en-IN")}</span>
    ),
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
    key: "salesQuantity",
    name: "Sales Quantity",
    width: 140,
    renderCell: ({ row }) => (
      <span>{row.salesQuantity.toLocaleString("en-IN")}</span>
    ),
  },
  {
    key: "grossMarginPct",
    name: "Gross Margin %",
    width: 130,
    renderCell: ({ row }) => <span>{row.grossMarginPct.toFixed(1)}%</span>,
  },
];

export default function CategoryOverviewPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredSubCategories = useMemo(() => {
    if (!search.trim()) return mockSubCategories;
    const term = search.toLowerCase();
    return mockSubCategories.filter((sc) =>
      sc.name.toLowerCase().includes(term),
    );
  }, [search]);

  const paginatedSubCategories = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredSubCategories.slice(start, start + rowsPerPage);
  }, [filteredSubCategories, page, rowsPerPage]);

  const subCategoryColumnsWithAction: Column<SubCategory>[] = useMemo(
    () => [
      ...subCategoryColumns,
      {
        key: "actions",
        name: "",
        width: 120,
        renderCell: ({ row }) => (
          <button
            onClick={() =>
              navigate(
                `/granary/assortment/category/food/sub/${encodeURIComponent(row.name.toLowerCase())}`,
              )
            }
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-4)",
              color: "var(--primary-50)",
              fontSize: "var(--font-size-s)",
              fontWeight: "var(--font-weight-prominent)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <Eye size={14} />
            View Details
          </button>
        ),
      },
    ],
    [navigate],
  );

  return (
    <div className="flex flex-col gap-[var(--space-8)]">
      {/* Page Title */}
      <h1
        style={{
          margin: 0,
          fontSize: "var(--font-size-l)",
          fontWeight: "var(--font-weight-heading)",
          color: "var(--text-default)",
        }}
      >
        Category Overview: Food
      </h1>

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

      {/* Sub-Category List Section */}
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
            Sub-Category List
          </h3>
          <div className="flex items-center" style={{ gap: "var(--space-12)" }}>
            <Input
              placeholder="Search sub-categories..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              style={{ width: 240 }}
            />
            <ExportButton />
          </div>
        </div>

        <DataGrid<SubCategory>
          className="rdg-inline"
          columns={subCategoryColumnsWithAction}
          rows={paginatedSubCategories}
        />

        <TablePagination
          totalRows={filteredSubCategories.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={(rpp) => {
            setRowsPerPage(rpp);
            setPage(1);
          }}
        />
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
    </div>
  );
}
