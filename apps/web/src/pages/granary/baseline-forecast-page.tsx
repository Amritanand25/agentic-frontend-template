import { useState, useMemo } from "react";
import { DataGrid, TablePagination, Input } from "@repo/ui";
import type { Column } from "@repo/ui";
import { Search } from "lucide-react";
import { GranaryFilterBar } from "@/features/granary/components/global-filter-bar";
import { ExportButton } from "@/features/granary/components/export-button";
import {
  mockForecastDates,
  mockForecastRows,
  mockForecastPagination,
} from "@/features/granary/mock-data/forecast-mock";
import type { ForecastEntry } from "@/features/granary/types";

type ForecastRow = ForecastEntry & { rowKey: string };

function formatDateHeader(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BaselineForecastPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(
    mockForecastPagination.rowsPerPage,
  );

  const rows: ForecastRow[] = useMemo(
    () =>
      mockForecastRows.map((row) => ({
        ...row,
        rowKey: `${row.site}-${row.articleId}`,
      })),
    [],
  );

  const filteredRows = useMemo(() => {
    if (!searchQuery.trim()) return rows;
    const query = searchQuery.toLowerCase();
    return rows.filter(
      (row) =>
        row.site.toLowerCase().includes(query) ||
        row.articleId.toLowerCase().includes(query) ||
        row.description.toLowerCase().includes(query),
    );
  }, [rows, searchQuery]);

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredRows.slice(start, start + rowsPerPage);
  }, [filteredRows, page, rowsPerPage]);

  const totalRows = searchQuery.trim()
    ? filteredRows.length
    : mockForecastPagination.totalRows;

  const columns: Column<ForecastRow>[] = useMemo(() => {
    const fixedColumns: Column<ForecastRow>[] = [
      {
        key: "site",
        name: "Site",
        width: 80,
        frozen: true,
        resizable: true,
      },
      {
        key: "articleId",
        name: "Article Id",
        width: 120,
        frozen: true,
        resizable: true,
      },
      {
        key: "description",
        name: "Article Description",
        width: 280,
        frozen: true,
        resizable: true,
      },
    ];

    const dateColumns: Column<ForecastRow>[] = mockForecastDates.map(
      ({ date, weekLabel }) => ({
        key: date,
        name: date,
        width: 100,
        resizable: true,
        renderHeaderCell: () => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              lineHeight: 1.3,
            }}
          >
            <span
              style={{
                fontSize: "var(--font-size-s)",
                color: "var(--text-default)",
                fontWeight: "var(--font-weight-prominent)",
              }}
            >
              {formatDateHeader(date)}
            </span>
            <span
              style={{
                fontSize: "var(--font-size-xs)",
                color: "var(--text-subdued-1)",
              }}
            >
              {weekLabel}
            </span>
          </div>
        ),
        renderCell: ({ row }: { row: ForecastRow }) => (
          <span>{row.forecasts[date] ?? ""}</span>
        ),
      }),
    );

    return [...fixedColumns, ...dateColumns];
  }, []);

  return (
    <div className="flex flex-col gap-[var(--space-8)]">
      <h1
        style={{
          fontSize: "var(--font-size-2xl)",
          fontWeight: "var(--font-weight-heading)",
          color: "var(--text-default)",
        }}
      >
        Baseline Forecast
      </h1>

      <GranaryFilterBar
        visibleFilters={["zone", "format", "state", "city", "store", "segment"]}
      />

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
        {/* Header row: title + search + export */}
        <div className="flex items-center justify-between">
          <span
            style={{
              fontSize: "var(--font-size-l)",
              fontWeight: "var(--font-weight-prominent)",
              color: "var(--text-default)",
            }}
          >
            Article Forecast List
          </span>
          <div className="flex items-center gap-[var(--space-8)]">
            <div className="relative" style={{ width: 240 }}>
              <Search
                size={16}
                style={{
                  position: "absolute",
                  left: "var(--space-8)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-subdued-2)",
                  pointerEvents: "none",
                }}
              />
              <Input
                placeholder="Search site, article..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                style={{ paddingLeft: "var(--space-32)" }}
              />
            </div>
            <ExportButton />
          </div>
        </div>

        {/* DataGrid */}
        <DataGrid
          className="rdg-inline"
          columns={columns}
          rows={paginatedRows}
          rowKeyGetter={(row) => row.rowKey}
          headerRowHeight={52}
        />

        {/* Pagination */}
        <TablePagination
          totalRows={totalRows}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={(rpp) => {
            setRowsPerPage(rpp);
            setPage(1);
          }}
        />
      </div>
    </div>
  );
}
