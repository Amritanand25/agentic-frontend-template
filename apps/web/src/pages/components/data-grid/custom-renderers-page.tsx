import { useMemo } from "react"
import { DataGrid, type Column } from "react-data-grid"
import "react-data-grid/lib/styles.css"
import "./data-grid-theme.css"
import { sampleRows, type Employee } from "./sample-data"

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

function SalaryCell({ row }: { row: Employee }) {
  const color = row.salary >= 80000
    ? "var(--success-50)"
    : row.salary >= 60000
    ? "var(--text-default)"
    : "var(--warning-50)"
  return (
    <span style={{ fontWeight: "var(--font-weight-prominent)", color }}>
      ${row.salary.toLocaleString()}
    </span>
  )
}

const columns: Column<Employee>[] = [
  { key: "id", name: "ID", width: 60 },
  {
    key: "name",
    name: "Employee",
    width: 200,
    renderCell: ({ row }) => <AvatarCell row={row} />,
  },
  { key: "email", name: "Email", width: 220 },
  { key: "department", name: "Department" },
  {
    key: "status",
    name: "Status",
    width: 110,
    renderCell: ({ row }) => <StatusCell row={row} />,
  },
  {
    key: "salary",
    name: "Salary",
    width: 130,
    renderCell: ({ row }) => <SalaryCell row={row} />,
  },
  {
    key: "progress",
    name: "Progress",
    width: 160,
    renderCell: ({ row }) => <ProgressCell row={row} />,
  },
]

export default function CustomRenderersGridPage() {
  const rows = useMemo(() => sampleRows.slice(0, 30), [])

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-32)" }}>
      <div>
        <h1 style={{ fontSize: "var(--font-size-2xl)", fontWeight: "var(--font-weight-heading)", color: "var(--text-default)" }}>
          Custom Cell Renderers
        </h1>
        <p style={{ color: "var(--text-subdued-1)", marginTop: "var(--space-8)" }}>
          Custom renderers for avatars, status badges, progress bars, and color-coded salary cells using design system tokens.
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
