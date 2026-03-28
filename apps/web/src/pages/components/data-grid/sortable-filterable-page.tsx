import { useMemo, useState } from "react"
import { DataGrid, type Column, type SortColumn } from "react-data-grid"
import "react-data-grid/lib/styles.css"
import "./data-grid-theme.css"
import { sampleRows, type Employee } from "./sample-data"
import { gridRenderers } from "./grid-renderers"

export default function SortableFilterableGridPage() {
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([])

  const columns: Column<Employee>[] = useMemo(
    () => [
      { key: "id", name: "ID", width: 60, sortable: true },
      { key: "firstName", name: "First Name", sortable: true },
      { key: "lastName", name: "Last Name", sortable: true },
      { key: "email", name: "Email", width: 220, sortable: true },
      { key: "department", name: "Department", sortable: true },
      { key: "role", name: "Role", sortable: true },
      {
        key: "salary",
        name: "Salary",
        width: 120,
        sortable: true,
        renderCell: ({ row }) => `$${row.salary.toLocaleString()}`,
      },
    ],
    []
  )

  const sortedRows = useMemo(() => {
    if (sortColumns.length === 0) return sampleRows

    return [...sampleRows].sort((a, b) => {
      for (const { columnKey, direction } of sortColumns) {
        const aVal = a[columnKey as keyof Employee]
        const bVal = b[columnKey as keyof Employee]
        if (aVal < bVal) return direction === "ASC" ? -1 : 1
        if (aVal > bVal) return direction === "ASC" ? 1 : -1
      }
      return 0
    })
  }, [sortColumns])

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-32)" }}>
      <div>
        <h1 style={{ fontSize: "var(--font-size-2xl)", fontWeight: "var(--font-weight-heading)", color: "var(--text-default)" }}>
          Sortable Grid
        </h1>
        <p style={{ color: "var(--text-subdued-1)", marginTop: "var(--space-8)" }}>
          Click column headers to sort. Ctrl+Click for multi-column sort.
        </p>
      </div>

      <DataGrid
        columns={columns}
        rows={sortedRows}
        rowKeyGetter={(row) => row.id}
        sortColumns={sortColumns}
        onSortColumnsChange={setSortColumns}
        renderers={gridRenderers}
        rowHeight={48}
        headerRowHeight={40}
        className="rdg-theme"
      />

      <p style={{ fontSize: "var(--font-size-s)", color: "var(--text-subdued-2)" }}>
        {sortedRows.length} rows
      </p>
    </div>
  )
}
