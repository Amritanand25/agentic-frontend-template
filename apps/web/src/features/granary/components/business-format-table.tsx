import { DataGrid, type Column } from "@repo/ui";
import { ExportButton } from "./export-button";
import type { CategoryFormat } from "../types";

interface BusinessFormatTableProps {
  data: CategoryFormat[];
}

const columns: Column<CategoryFormat>[] = [
  {
    key: "formatName",
    name: "Format Name",
    width: 180,
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
    key: "locationCount",
    name: "No. of Locations",
    width: 140,
    renderCell: ({ row }) => (
      <span>{row.locationCount.toLocaleString("en-IN")}</span>
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
    key: "grossMargin",
    name: "Gross Margin (\u20B9)",
    width: 150,
    renderCell: ({ row }) => (
      <span>
        {"\u20B9"}
        {row.grossMargin.toFixed(2)}
      </span>
    ),
  },
  {
    key: "grossMarginPct",
    name: "Gross Margin %",
    width: 130,
    renderCell: ({ row }) => <span>{row.grossMarginPct.toFixed(1)}%</span>,
  },
];

export function BusinessFormatTable({ data }: BusinessFormatTableProps) {
  return (
    <div className="flex flex-col" style={{ gap: "var(--space-8)" }}>
      <div className="flex items-center justify-between">
        <h3
          style={{
            margin: 0,
            fontSize: "var(--font-size-m)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
          }}
        >
          Business Format Sales
        </h3>
        <ExportButton />
      </div>
      <DataGrid<CategoryFormat>
        className="rdg-inline"
        columns={columns}
        rows={data}
      />
    </div>
  );
}
