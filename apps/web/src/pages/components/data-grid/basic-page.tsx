import { useMemo } from "react"
import { DataGrid, type Column } from "react-data-grid"
import "react-data-grid/lib/styles.css"
import "./data-grid-theme.css"
import { sampleRows, type Employee } from "./sample-data"

const columns: Column<Employee>[] = [
  { key: "id", name: "ID", width: 60, resizable: true },
  { key: "firstName", name: "First Name", resizable: true },
  { key: "lastName", name: "Last Name", resizable: true },
  { key: "email", name: "Email", width: 220, resizable: true },
  { key: "department", name: "Department", resizable: true },
  { key: "role", name: "Role", resizable: true },
  { key: "country", name: "Country", resizable: true },
  { key: "city", name: "City", resizable: true },
]

export default function BasicGridPage() {
  const rows = useMemo(() => sampleRows, [])

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-32)" }}>
      <div>
        <h1 style={{ fontSize: "var(--font-size-2xl)", fontWeight: "var(--font-weight-heading)", color: "var(--text-default)" }}>
          Basic Grid
        </h1>
        <p style={{ color: "var(--text-subdued-1)", marginTop: "var(--space-8)" }}>
          Simple read-only data grid with resizable columns and virtual scrolling. Renders 50 rows efficiently.
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
