import { useMemo } from "react"
import { DataGrid, type ColumnOrColumnGroup } from "react-data-grid"
import "react-data-grid/lib/styles.css"
import "./data-grid-theme.css"
import { sampleRows, type Employee } from "./sample-data"

const columns: ColumnOrColumnGroup<Employee>[] = [
  { key: "id", name: "ID", width: 60 },
  {
    name: "Personal Info",
    children: [
      { key: "firstName", name: "First Name", resizable: true },
      { key: "lastName", name: "Last Name", resizable: true },
      { key: "email", name: "Email", width: 220, resizable: true },
    ],
  },
  {
    name: "Work",
    children: [
      { key: "department", name: "Department", resizable: true },
      { key: "role", name: "Role", resizable: true },
      {
        key: "salary",
        name: "Salary",
        width: 120,
        resizable: true,
        renderCell: ({ row }) => `$${row.salary.toLocaleString()}`,
      },
    ],
  },
  {
    name: "Location",
    children: [
      { key: "country", name: "Country", resizable: true },
      { key: "city", name: "City", resizable: true },
    ],
  },
]

export default function ColumnGroupingGridPage() {
  const rows = useMemo(() => sampleRows.slice(0, 30), [])

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-32)" }}>
      <div>
        <h1 style={{ fontSize: "var(--font-size-2xl)", fontWeight: "var(--font-weight-heading)", color: "var(--text-default)" }}>
          Column Grouping Grid
        </h1>
        <p style={{ color: "var(--text-subdued-1)", marginTop: "var(--space-8)" }}>
          Columns grouped under "Personal Info", "Work", and "Location" header groups.
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
  )
}
