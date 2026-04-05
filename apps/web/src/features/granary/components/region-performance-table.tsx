import { DataGrid, type Column } from "@repo/ui";
import type { RegionPerformance } from "../types";

interface RegionPerformanceTableProps {
  data: RegionPerformance[];
}

const columns: Column<RegionPerformance>[] = [
  {
    key: "region",
    name: "Region",
    width: 120,
  },
  {
    key: "quantity",
    name: "Quantity",
    width: 120,
    renderCell: ({ row }) => (
      <span>{row.quantity.toLocaleString("en-IN")}</span>
    ),
  },
  {
    key: "sales",
    name: "Sales (\u20B9)",
    renderCell: ({ row }) => (
      <span>
        {"\u20B9"}
        {row.sales.toFixed(2)}
      </span>
    ),
  },
];

export function RegionPerformanceTable({ data }: RegionPerformanceTableProps) {
  return (
    <div className="flex flex-col" style={{ gap: "var(--space-8)" }}>
      <h3
        style={{
          margin: 0,
          fontSize: "var(--font-size-m)",
          fontWeight: "var(--font-weight-heading)",
          color: "var(--text-default)",
        }}
      >
        Region Wise Performance
      </h3>
      <DataGrid<RegionPerformance>
        className="rdg-inline"
        columns={columns}
        rows={data}
      />
    </div>
  );
}
