import { useState, useMemo } from "react"
import { DataGrid, type Column, SelectColumn } from "react-data-grid"
import "react-data-grid/lib/styles.css"
import "./data-grid-theme.css"
import { sampleRows, type Employee } from "./sample-data"
import { gridRenderers } from "./grid-renderers"

const columns: Column<Employee>[] = [
  SelectColumn,
  { key: "id", name: "ID", width: 60 },
  { key: "firstName", name: "First Name" },
  { key: "lastName", name: "Last Name" },
  { key: "email", name: "Email", width: 220 },
  { key: "department", name: "Department" },
  { key: "role", name: "Role" },
  {
    key: "salary",
    name: "Salary",
    width: 120,
    renderCell: ({ row }) => `$${row.salary.toLocaleString()}`,
  },
]

export default function RowSelectionGridPage() {
  const rows = useMemo(() => sampleRows.slice(0, 30), [])
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(() => new Set())

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-32)" }}>
      <div>
        <h1 style={{ fontSize: "var(--font-size-2xl)", fontWeight: "var(--font-weight-heading)", color: "var(--text-default)" }}>
          Row Selection Grid
        </h1>
        <p style={{ color: "var(--text-subdued-1)", marginTop: "var(--space-8)" }}>
          Checkbox column for row selection. Header checkbox selects/deselects all. Shift+Click for range select.
        </p>
      </div>

      <DataGrid
        columns={columns}
        rows={rows}
        rowKeyGetter={(row) => row.id}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        renderers={gridRenderers}
        rowHeight={48}
        headerRowHeight={40}
        className="rdg-theme"
      />

      <div
        style={{
          padding: "var(--space-12) var(--space-16)",
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-8)",
          border: "1px solid var(--grey-40)",
          fontSize: "var(--font-size-m)",
          color: "var(--text-default)",
        }}
      >
        <strong>{selectedRows.size}</strong> row{selectedRows.size !== 1 ? "s" : ""} selected
        {selectedRows.size > 0 && (
          <span style={{ color: "var(--text-subdued-1)", marginLeft: "var(--space-8)" }}>
            (IDs: {[...selectedRows].sort((a, b) => a - b).join(", ")})
          </span>
        )}
      </div>
    </div>
  )
}
