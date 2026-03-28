import { useState, useMemo, useEffect } from "react"
import { DataGrid, type Column } from "react-data-grid"
import "react-data-grid/lib/styles.css"
import "./data-grid-theme.css"
import { sampleRows, type Employee } from "./sample-data"

function ShimmerCell({ width }: { width?: string }) {
  return (
    <div className="shimmer-cell" style={{ width: width ?? `${50 + Math.random() * 40}%` }}>
      <div className="shimmer-bar" />
    </div>
  )
}

interface SkeletonRow {
  id: number
  type: "skeleton"
}

type GridRow = (Employee & { type: "data" }) | SkeletonRow

function isDataRow(row: GridRow): row is Employee & { type: "data" } {
  return row.type === "data"
}

const skeletonRows: SkeletonRow[] = Array.from({ length: 10 }, (_, i) => ({
  id: -(i + 1),
  type: "skeleton" as const,
}))

function makeSkeletonColumn(
  key: string,
  name: string,
  dataRender: (row: Employee) => React.ReactNode,
  opts?: Partial<Column<GridRow>>
): Column<GridRow> {
  return {
    key,
    name,
    ...opts,
    renderCell: ({ row }) => {
      if (!isDataRow(row)) return <ShimmerCell />
      return dataRender(row)
    },
  }
}

const columns: Column<GridRow>[] = [
  makeSkeletonColumn("id", "ID", (row) => row.id, { width: 60 }),
  makeSkeletonColumn("firstName", "First Name", (row) => row.firstName),
  makeSkeletonColumn("lastName", "Last Name", (row) => row.lastName),
  makeSkeletonColumn("email", "Email", (row) => row.email, { width: 220 }),
  makeSkeletonColumn("department", "Department", (row) => row.department),
  makeSkeletonColumn("role", "Role", (row) => row.role),
  makeSkeletonColumn(
    "salary",
    "Salary",
    (row) => `$${row.salary.toLocaleString()}`,
    { width: 120 }
  ),
]

export default function ShimmerLoadingPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const rows = useMemo<GridRow[]>(() => {
    if (loading) return skeletonRows
    return sampleRows.slice(0, 20).map((r) => ({ ...r, type: "data" as const }))
  }, [loading])

  function reload() {
    setLoading(true)
    setTimeout(() => setLoading(false), 3000)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-32)" }}>
      <div>
        <h1 style={{ fontSize: "var(--font-size-2xl)", fontWeight: "var(--font-weight-heading)", color: "var(--text-default)" }}>
          Shimmer Loading
        </h1>
        <p style={{ color: "var(--text-subdued-1)", marginTop: "var(--space-8)" }}>
          Skeleton shimmer effect while data is loading. Cells show animated placeholders until the real data arrives.
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

      <button
        onClick={reload}
        style={{
          alignSelf: "flex-start",
          padding: "var(--space-8) var(--space-16)",
          borderRadius: "var(--radius-8)",
          border: "1px solid var(--grey-40)",
          backgroundColor: "var(--surface-0)",
          color: "var(--text-default)",
          fontSize: "var(--font-size-m)",
          cursor: "pointer",
        }}
      >
        Reload Data
      </button>
    </div>
  )
}
