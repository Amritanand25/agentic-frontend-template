import { useMemo } from "react";
import { DataGrid, type Column } from "@repo/ui";
import { sampleRows, type Employee } from "./sample-data";

interface SummaryRow {
  id: string;
  totalCount: number;
  avgSalary: number;
  avgProgress: number;
}

const columns: Column<Employee, SummaryRow>[] = [
  {
    key: "id",
    name: "ID",
    width: 60,
    renderSummaryCell: ({ row }) => <strong>{row.id}</strong>,
  },
  {
    key: "firstName",
    name: "First Name",
    renderSummaryCell: ({ row }) => <strong>{row.totalCount} employees</strong>,
  },
  { key: "lastName", name: "Last Name" },
  { key: "email", name: "Email", width: 220 },
  { key: "department", name: "Department" },
  { key: "role", name: "Role" },
  {
    key: "salary",
    name: "Salary",
    width: 130,
    renderCell: ({ row }) => `$${row.salary.toLocaleString()}`,
    renderSummaryCell: ({ row }) => (
      <strong>Avg: ${Math.round(row.avgSalary).toLocaleString()}</strong>
    ),
  },
  {
    key: "progress",
    name: "Progress",
    width: 120,
    renderCell: ({ row }) => `${row.progress}%`,
    renderSummaryCell: ({ row }) => (
      <strong>Avg: {Math.round(row.avgProgress)}%</strong>
    ),
  },
];

export default function SummaryRowsGridPage() {
  const rows = useMemo(() => sampleRows.slice(0, 30), []);

  const summaryRows = useMemo<SummaryRow[]>(() => {
    const totalCount = rows.length;
    const avgSalary = rows.reduce((sum, r) => sum + r.salary, 0) / totalCount;
    const avgProgress =
      rows.reduce((sum, r) => sum + r.progress, 0) / totalCount;

    return [
      {
        id: "Summary",
        totalCount,
        avgSalary,
        avgProgress,
      },
    ];
  }, [rows]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-32)",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "var(--font-size-2xl)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
          }}
        >
          Summary Rows Grid
        </h1>
        <p
          style={{
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-8)",
          }}
        >
          Pinned summary row at the bottom showing total count, average salary,
          and average progress.
        </p>
      </div>

      <DataGrid
        columns={columns}
        rows={rows}
        rowKeyGetter={(row) => row.id}
        bottomSummaryRows={summaryRows}
        rowHeight={48}
        headerRowHeight={40}
        className="rdg-theme"
      />
    </div>
  );
}
