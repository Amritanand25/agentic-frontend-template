import { useState } from "react";
import { DataGrid, TablePagination } from "@repo/ui";
import type { Column } from "@repo/ui";
import { Sparkles } from "lucide-react";
import { GranaryFilterBar } from "@/features/granary/components/global-filter-bar";
import { ExceptionCards } from "@/features/granary/components/exception-cards";
import { DOHHeatmap } from "@/features/granary/components/doh-heatmap";
import { DOHBreakdownPanel } from "@/features/granary/components/doh-breakdown-panel";
import {
  mockExceptions,
  mockDOHBlocks,
  mockSKUDetails,
} from "@/features/granary/mock-data/home-mock";
import type { DOHBlock } from "@/features/granary/types";

interface SKUDetailRow {
  site: string;
  article: string;
  category: string;
  subCategory: string;
  doh: number;
  inventoryCount: number;
  salesQty: number;
  inventoryCost: number;
}

const skuColumns: Column<SKUDetailRow>[] = [
  { key: "site", name: "Site", width: 80 },
  { key: "article", name: "Article", minWidth: 200 },
  { key: "category", name: "Category", width: 120 },
  { key: "subCategory", name: "Sub-Category", width: 130 },
  { key: "doh", name: "DOH", width: 80 },
  {
    key: "inventoryCount",
    name: "Inventory Count",
    width: 140,
    renderCell: ({ row }) => <span>{row.inventoryCount.toLocaleString()}</span>,
  },
  { key: "salesQty", name: "Sales Qty", width: 100 },
  {
    key: "inventoryCost",
    name: "Inventory Cost",
    width: 130,
    renderCell: ({ row }) => <span>Rs {row.inventoryCost.toFixed(2)} Cr</span>,
  },
];

export default function GranaryHomePage() {
  const [selectedRange, setSelectedRange] = useState<string | null>(null);
  const [metricMode, setMetricMode] = useState<"cost" | "count">("cost");
  const [skuPage, setSkuPage] = useState(1);
  const [skuRowsPerPage, setSkuRowsPerPage] = useState(10);

  const selectedBlock: DOHBlock | null =
    mockDOHBlocks.find((b) => b.range === selectedRange) ?? null;

  const skuPaginatedRows = mockSKUDetails.slice(
    (skuPage - 1) * skuRowsPerPage,
    skuPage * skuRowsPerPage,
  );

  return (
    <div className="flex flex-col gap-[var(--space-8)]">
      {/* Page Title */}
      <h1
        style={{
          fontSize: "var(--font-size-xl)",
          fontWeight: "var(--font-weight-heading)",
          color: "var(--text-default)",
          margin: 0,
        }}
      >
        Home
      </h1>

      {/* Global Filter Bar */}
      <GranaryFilterBar
        visibleFilters={[
          "zone",
          "format",
          "state",
          "city",
          "store",
          "segment",
          "category",
          "period",
        ]}
      />

      {/* Exceptions Section */}
      <div className="flex flex-col" style={{ gap: "var(--space-8)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center" style={{ gap: "var(--space-8)" }}>
            <Sparkles size={18} style={{ color: "var(--primary-50)" }} />
            <span
              style={{
                fontSize: "var(--font-size-m)",
                fontWeight: "var(--font-weight-heading)",
                color: "var(--text-default)",
              }}
            >
              Exceptions
            </span>
          </div>
          <span
            style={{
              fontSize: "var(--font-size-s)",
              color: "var(--text-subdued-1)",
            }}
          >
            Total: {mockExceptions.length}
          </span>
        </div>

        <ExceptionCards exceptions={mockExceptions} />
      </div>

      {/* DOH Distribution Heatmap Section */}
      <div className="grid grid-cols-2" style={{ gap: "var(--space-8)" }}>
        {/* Left: Heatmap */}
        <div
          style={{
            backgroundColor: "var(--surface-0)",
            borderRadius: "var(--radius-12)",
            padding: "var(--space-16)",
          }}
        >
          <DOHHeatmap
            blocks={mockDOHBlocks}
            selectedRange={selectedRange}
            onSelectRange={setSelectedRange}
            metricMode={metricMode}
            onMetricModeChange={setMetricMode}
          />
        </div>

        {/* Right: Breakdown Panel */}
        <DOHBreakdownPanel selectedBlock={selectedBlock} />
      </div>

      {/* Detailed SKU View — appears when a DOH block is selected */}
      {selectedBlock && (
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
          <div
            style={{
              fontSize: "var(--font-size-m)",
              fontWeight: "var(--font-weight-heading)",
              color: "var(--text-default)",
            }}
          >
            Detailed SKU View - {selectedBlock.range}
          </div>

          <DataGrid
            className="rdg-inline"
            columns={skuColumns}
            rows={skuPaginatedRows}
          />

          <TablePagination
            totalRows={mockSKUDetails.length}
            page={skuPage}
            rowsPerPage={skuRowsPerPage}
            onPageChange={setSkuPage}
            onRowsPerPageChange={(rpp) => {
              setSkuRowsPerPage(rpp);
              setSkuPage(1);
            }}
          />
        </div>
      )}
    </div>
  );
}
