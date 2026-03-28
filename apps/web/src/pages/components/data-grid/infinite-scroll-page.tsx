import { useState, useCallback, useRef, useMemo } from "react"
import { DataGrid, type Column } from "react-data-grid"
import "react-data-grid/lib/styles.css"
import "./data-grid-theme.css"
import { generateRows, type Employee } from "./sample-data"

const PAGE_SIZE = 30
const SHIMMER_COUNT = 5
const MAX_ROWS = 300

interface ShimmerRow {
  id: number
  type: "shimmer"
}

type GridRow = (Employee & { type: "data" }) | ShimmerRow

function ShimmerCell() {
  return (
    <div className="shimmer-cell">
      <div className="shimmer-bar" />
    </div>
  )
}

function makeColumn(
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
      if (row.type === "shimmer") return <ShimmerCell />
      return dataRender(row)
    },
  }
}

const columns: Column<GridRow>[] = [
  makeColumn("id", "ID", (r) => r.id, { width: 60 }),
  makeColumn("firstName", "First Name", (r) => r.firstName),
  makeColumn("lastName", "Last Name", (r) => r.lastName),
  makeColumn("email", "Email", (r) => r.email, { width: 220 }),
  makeColumn("department", "Department", (r) => r.department),
  makeColumn("role", "Role", (r) => r.role),
  makeColumn("salary", "Salary", (r) => `$${r.salary.toLocaleString()}`, { width: 120 }),
  makeColumn("country", "Country", (r) => r.country),
  makeColumn("city", "City", (r) => r.city),
]

const shimmerRows: ShimmerRow[] = Array.from({ length: SHIMMER_COUNT }, (_, i) => ({
  id: -(i + 1),
  type: "shimmer" as const,
}))

export default function InfiniteScrollPage() {
  const [dataRows, setDataRows] = useState<Employee[]>(() => generateRows(PAGE_SIZE))
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const loadingRef = useRef(false)

  const rows = useMemo<GridRow[]>(() => {
    const mapped: GridRow[] = dataRows.map((r) => ({ ...r, type: "data" as const }))
    if (loading) return [...mapped, ...shimmerRows]
    return mapped
  }, [dataRows, loading])

  const loadMore = useCallback(() => {
    if (loadingRef.current || !hasMore) return
    loadingRef.current = true
    setLoading(true)

    setTimeout(() => {
      setDataRows((prev) => {
        const newRows = generateRows(PAGE_SIZE).map((row, i) => ({
          ...row,
          id: prev.length + i + 1,
          email: `user${prev.length + i + 1}@company.com`,
        }))
        const combined = [...prev, ...newRows]
        if (combined.length >= MAX_ROWS) setHasMore(false)
        return combined
      })
      setLoading(false)
      loadingRef.current = false
    }, 1500)
  }, [hasMore])

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
      if (scrollHeight - scrollTop - clientHeight < 100) {
        loadMore()
      }
    },
    [loadMore]
  )

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-32)" }}>
      <div>
        <h1 style={{ fontSize: "var(--font-size-2xl)", fontWeight: "var(--font-weight-heading)", color: "var(--text-default)" }}>
          Infinite Scroll
        </h1>
        <p style={{ color: "var(--text-subdued-1)", marginTop: "var(--space-8)" }}>
          Scroll to the bottom to load more rows. Shimmer skeleton rows appear while the next batch is fetching.
        </p>
      </div>

      <DataGrid
        columns={columns}
        rows={rows}
        rowKeyGetter={(row) => row.id}
        onScroll={handleScroll}
        rowHeight={48}
        headerRowHeight={40}
        className="rdg-theme"
        style={{ blockSize: 500 }}
      />

      <div
        style={{
          display: "flex",
          gap: "var(--space-16)",
          fontSize: "var(--font-size-s)",
          color: "var(--text-subdued-1)",
        }}
      >
        <span>Loaded: {dataRows.length} rows</span>
        <span>{hasMore ? `Scroll for more (max ${MAX_ROWS})` : "All rows loaded"}</span>
      </div>
    </div>
  )
}
