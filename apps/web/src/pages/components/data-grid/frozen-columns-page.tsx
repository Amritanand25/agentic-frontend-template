import { useMemo } from "react";
import { DataGrid, type Column } from "@repo/ui";
import { sampleRows, type Employee } from "./sample-data";

const columns: Column<Employee>[] = [
  { key: "id", name: "ID", width: 60, frozen: true },
  { key: "firstName", name: "First Name", width: 130, frozen: true },
  { key: "lastName", name: "Last Name", width: 130, frozen: true },
  { key: "email", name: "Email", width: 240, resizable: true },
  { key: "department", name: "Department", width: 150, resizable: true },
  { key: "role", name: "Role", width: 140, resizable: true },
  { key: "country", name: "Country", width: 160, resizable: true },
  { key: "city", name: "City", width: 150, resizable: true },
  {
    key: "salary",
    name: "Salary",
    width: 120,
    resizable: true,
    renderCell: ({ row }) => `$${row.salary.toLocaleString()}`,
  },
  { key: "startDate", name: "Start Date", width: 130, resizable: true },
  {
    key: "progress",
    name: "Progress",
    width: 120,
    resizable: true,
    renderCell: ({ row }) => `${row.progress}%`,
  },
];

export default function FrozenColumnsGridPage() {
  const rows = useMemo(() => sampleRows, []);

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
          Frozen Columns Grid
        </h1>
        <p
          style={{
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-8)",
          }}
        >
          ID, First Name, and Last Name columns are frozen (pinned left). Scroll
          horizontally to see the effect.
        </p>
      </div>

      <DataGrid
        columns={columns}
        rows={rows}
        rowKeyGetter={(row) => row.id}
        rowHeight={48}
        headerRowHeight={40}
        className="rdg-theme"
      />
    </div>
  );
}
