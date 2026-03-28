import { useState, useMemo } from "react"
import { DataGrid,
  type Column,
  type SortColumn,
  SelectColumn,
  renderTextEditor as textEditor,
} from "react-data-grid"
import "react-data-grid/lib/styles.css"
import "./data-grid-theme.css"
import { sampleRows, type Employee } from "./sample-data"
import { gridRenderers } from "./grid-renderers"

interface SummaryRow {
  id: string
  totalCount: number
  selectedCount: number
  avgSalary: number
}

function StatusCell({ row }: { row: Employee }) {
  return (
    <span className={`status-badge status-badge--${row.status}`}>
      {row.status === "active" && "Active"}
      {row.status === "idle" && "Idle"}
      {row.status === "error" && "Error"}
    </span>
  )
}

function ProgressCell({ row }: { row: Employee }) {
  return (
    <div className="progress-cell">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${row.progress}%` }} />
      </div>
      <span className="progress-label">{row.progress}%</span>
    </div>
  )
}

function AvatarCell({ row }: { row: Employee }) {
  const initials = `${row.firstName[0]}${row.lastName[0]}`
  return (
    <div className="avatar-cell">
      <div className="avatar-circle">{initials}</div>
      <span>{row.firstName} {row.lastName}</span>
    </div>
  )
}

export default function FullFeaturedGridPage() {
  const [rows, setRows] = useState(() => sampleRows.slice(0, 40))
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(() => new Set())
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([])

  const columns: Column<Employee, SummaryRow>[] = useMemo(
    () => [
      SelectColumn as Column<Employee, SummaryRow>,
      { key: "id", name: "ID", width: 60, frozen: true, sortable: true },
      {
        key: "name",
        name: "Employee",
        width: 200,
        frozen: true,
        renderCell: ({ row }) => <AvatarCell row={row} />,
      },
      {
        key: "email",
        name: "Email",
        width: 220,
        resizable: true,
        renderEditCell: textEditor,
      },
      {
        key: "department",
        name: "Department",
        resizable: true,
        sortable: true,
        renderEditCell: textEditor,
      },
      {
        key: "role",
        name: "Role",
        resizable: true,
        sortable: true,
        renderEditCell: textEditor,
      },
      {
        key: "status",
        name: "Status",
        width: 110,
        sortable: true,
        renderCell: ({ row }) => <StatusCell row={row} />,
      },
      {
        key: "salary",
        name: "Salary",
        width: 130,
        resizable: true,
        sortable: true,
        renderCell: ({ row }) => (
          <span style={{ fontWeight: "var(--font-weight-prominent)" }}>
            ${row.salary.toLocaleString()}
          </span>
        ),
        renderSummaryCell: ({ row }) => (
          <strong>Avg: ${Math.round(row.avgSalary).toLocaleString()}</strong>
        ),
      },
      {
        key: "progress",
        name: "Progress",
        width: 160,
        resizable: true,
        sortable: true,
        renderCell: ({ row }) => <ProgressCell row={row} />,
      },
      { key: "country", name: "Country", resizable: true, sortable: true },
      { key: "city", name: "City", resizable: true, sortable: true },
      { key: "startDate", name: "Start Date", width: 130, resizable: true, sortable: true },
    ],
    []
  )

  const sortedRows = useMemo(() => {
    if (sortColumns.length === 0) return rows

    return [...rows].sort((a, b) => {
      for (const { columnKey, direction } of sortColumns) {
        const aVal = a[columnKey as keyof Employee]
        const bVal = b[columnKey as keyof Employee]
        if (aVal < bVal) return direction === "ASC" ? -1 : 1
        if (aVal > bVal) return direction === "ASC" ? 1 : -1
      }
      return 0
    })
  }, [rows, sortColumns])

  const summaryRows = useMemo<SummaryRow[]>(
    () => [
      {
        id: "Summary",
        totalCount: rows.length,
        selectedCount: selectedRows.size,
        avgSalary: rows.reduce((sum, r) => sum + r.salary, 0) / rows.length,
      },
    ],
    [rows, selectedRows.size]
  )

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-32)" }}>
      <div>
        <h1 style={{ fontSize: "var(--font-size-2xl)", fontWeight: "var(--font-weight-heading)", color: "var(--text-default)" }}>
          Full-Featured Grid
        </h1>
        <p style={{ color: "var(--text-subdued-1)", marginTop: "var(--space-8)" }}>
          All features combined: sorting, selection, inline editing, frozen columns, custom renderers, and summary rows.
        </p>
      </div>

      <DataGrid
        columns={columns}
        rows={sortedRows}
        rowKeyGetter={(row) => row.id}
        onRowsChange={setRows}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        sortColumns={sortColumns}
        onSortColumnsChange={setSortColumns}
        bottomSummaryRows={summaryRows}
        renderers={gridRenderers}
        rowHeight={48}
        headerRowHeight={40}
        className="rdg-theme"
      />

      <div
        style={{
          display: "flex",
          gap: "var(--space-16)",
          flexWrap: "wrap",
          fontSize: "var(--font-size-s)",
          color: "var(--text-subdued-1)",
        }}
      >
        <span>Rows: {rows.length}</span>
        <span>Selected: {selectedRows.size}</span>
        <span>Frozen: ID, Employee</span>
        <span>Editable: Email, Department, Role</span>
        <span>Sortable: Click headers (Ctrl+Click for multi)</span>
      </div>
    </div>
  )
}
