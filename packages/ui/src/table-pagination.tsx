import * as React from "react"
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"

interface TablePaginationProps {
  totalRows: number
  page: number
  rowsPerPage: number
  rowsPerPageOptions?: number[]
  onPageChange: (page: number) => void
  onRowsPerPageChange?: (rowsPerPage: number) => void
}

export function TablePagination({
  totalRows,
  page,
  rowsPerPage,
  rowsPerPageOptions = [10, 25, 50, 100],
  onPageChange,
  onRowsPerPageChange,
}: TablePaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage))
  const rangeStart = Math.min((page - 1) * rowsPerPage + 1, totalRows)
  const rangeEnd = Math.min(page * rowsPerPage, totalRows)

  const [pageInput, setPageInput] = React.useState(String(page))
  const [rppOpen, setRppOpen] = React.useState(false)
  const rppRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setPageInput(String(page))
  }, [page])

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (rppRef.current && !rppRef.current.contains(e.target as Node)) {
        setRppOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  function commitPage() {
    const n = parseInt(pageInput, 10)
    if (!isNaN(n) && n >= 1 && n <= totalPages) {
      onPageChange(n)
    } else {
      setPageInput(String(page))
    }
  }

  const canPrev = page > 1
  const canNext = page < totalPages

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "var(--space-12) var(--space-16)",
        borderRadius: "var(--radius-12)",
        border: "1px solid var(--grey-30)",
        backgroundColor: "var(--surface-0)",
        fontSize: "var(--font-size-m)",
        color: "var(--text-default)",
        fontFamily: "var(--font-sans)",
        gap: "var(--space-16)",
        flexWrap: "wrap",
      }}
    >
      {/* Left: Rows per page */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-8)" }}>
        <span style={{ color: "var(--text-subdued-1)", fontSize: "var(--font-size-m)" }}>
          Rows per page
        </span>
        <div ref={rppRef} style={{ position: "relative" }}>
          <button
            onClick={() => setRppOpen((o) => !o)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-4)",
              padding: "var(--space-4) var(--space-8)",
              borderRadius: "var(--radius-6)",
              border: "1px solid var(--grey-40)",
              backgroundColor: "var(--surface-0)",
              color: "var(--text-default)",
              fontWeight: "var(--font-weight-prominent)",
              fontSize: "var(--font-size-m)",
              cursor: "pointer",
              minWidth: 52,
              justifyContent: "space-between",
            }}
          >
            {rowsPerPage}
            <ChevronDown size={14} style={{ color: "var(--text-subdued-1)" }} />
          </button>
          {rppOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                marginTop: "var(--space-4)",
                minWidth: "100%",
                borderRadius: "var(--radius-8)",
                border: "1px solid var(--grey-30)",
                backgroundColor: "var(--surface-0)",
                boxShadow: "var(--shadow-small)",
                zIndex: 10,
                overflow: "hidden",
              }}
            >
              {rowsPerPageOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    onRowsPerPageChange?.(opt)
                    onPageChange(1)
                    setRppOpen(false)
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "var(--space-8) var(--space-12)",
                    textAlign: "left",
                    border: "none",
                    backgroundColor: opt === rowsPerPage ? "var(--primary-10)" : "transparent",
                    color: opt === rowsPerPage ? "var(--primary-60)" : "var(--text-default)",
                    fontSize: "var(--font-size-m)",
                    cursor: "pointer",
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right section */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-16)" }}>
        {/* Range */}
        <span style={{ color: "var(--text-subdued-1)", fontSize: "var(--font-size-m)" }}>
          {rangeStart}–{rangeEnd} of {totalRows}
        </span>

        {/* Divider */}
        <div style={{ width: 1, height: 24, backgroundColor: "var(--grey-40)" }} />

        {/* Page input */}
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-8)" }}>
          <span style={{ color: "var(--text-subdued-1)", fontSize: "var(--font-size-m)" }}>Page</span>
          <input
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
            onBlur={commitPage}
            onKeyDown={(e) => { if (e.key === "Enter") commitPage() }}
            style={{
              width: 48,
              height: 32,
              textAlign: "center",
              border: "1px solid var(--grey-40)",
              borderRadius: "var(--radius-6)",
              backgroundColor: "var(--surface-0)",
              color: "var(--text-default)",
              fontSize: "var(--font-size-m)",
              fontFamily: "var(--font-sans)",
              outline: "none",
            }}
          />
          <span style={{ color: "var(--text-subdued-1)", fontSize: "var(--font-size-m)" }}>
            of {totalPages}
          </span>
        </div>

        {/* Prev / Next */}
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          <button
            disabled={!canPrev}
            onClick={() => onPageChange(page - 1)}
            aria-label="Previous page"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: "var(--radius-6)",
              border: "1px solid var(--grey-40)",
              backgroundColor: "var(--surface-0)",
              color: canPrev ? "var(--text-default)" : "var(--text-subdued-2)",
              cursor: canPrev ? "pointer" : "not-allowed",
              opacity: canPrev ? 1 : 0.5,
            }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            disabled={!canNext}
            onClick={() => onPageChange(page + 1)}
            aria-label="Next page"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: "var(--radius-6)",
              border: "1px solid var(--grey-40)",
              backgroundColor: "var(--surface-0)",
              color: canNext ? "var(--text-default)" : "var(--text-subdued-2)",
              cursor: canNext ? "pointer" : "not-allowed",
              opacity: canNext ? 1 : 0.5,
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
