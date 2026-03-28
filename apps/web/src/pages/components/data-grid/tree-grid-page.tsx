import { useState, useMemo } from "react"
import { TreeDataGrid, type Column, type RenderGroupCellProps } from "react-data-grid"
import { ChevronRight } from "lucide-react"
import "react-data-grid/lib/styles.css"
import "./data-grid-theme.css"
import { sampleRows, type Employee } from "./sample-data"

const columns: Column<Employee>[] = [
  {
    key: "country",
    name: "Country / City",
    width: 260,
    renderGroupCell: GroupCell,
  },
  { key: "firstName", name: "First Name" },
  { key: "lastName", name: "Last Name" },
  { key: "department", name: "Department" },
  { key: "role", name: "Role" },
  {
    key: "salary",
    name: "Salary",
    width: 120,
    renderCell: ({ row }) => `$${row.salary.toLocaleString()}`,
  },
]

function GroupCell({ groupKey, isExpanded, toggleGroup, childRows }: RenderGroupCellProps<Employee>) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-8)",
        cursor: "pointer",
        width: "100%",
        paddingLeft: "var(--space-4)",
      }}
      onClick={toggleGroup}
    >
      <ChevronRight
        size={16}
        style={{
          transition: "transform 150ms ease",
          transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
          flexShrink: 0,
          color: "var(--text-subdued-1)",
        }}
      />
      <span style={{ fontWeight: "var(--font-weight-prominent)", color: "var(--text-default)" }}>
        {String(groupKey)}
      </span>
      <span style={{ fontSize: "var(--font-size-s)", color: "var(--text-subdued-2)", marginLeft: "auto" }}>
        {childRows.length} {childRows.length === 1 ? "employee" : "employees"}
      </span>
    </div>
  )
}

function rowGrouper(rows: readonly Employee[], columnKey: string): Record<string, readonly Employee[]> {
  const groups: Record<string, Employee[]> = {}
  for (const row of rows) {
    const key = String(row[columnKey as keyof Employee])
    if (!groups[key]) groups[key] = []
    groups[key].push(row)
  }
  return groups
}

export default function TreeGridPage() {
  const [expandedGroupIds, setExpandedGroupIds] = useState<ReadonlySet<unknown>>(
    () => new Set(["United States", "Germany"])
  )

  const rows = useMemo(() => sampleRows, [])

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-32)" }}>
      <div>
        <h1 style={{ fontSize: "var(--font-size-2xl)", fontWeight: "var(--font-weight-heading)", color: "var(--text-default)" }}>
          Tree / Grouped Grid
        </h1>
        <p style={{ color: "var(--text-subdued-1)", marginTop: "var(--space-8)" }}>
          Rows grouped by Country with expand/collapse. Click the chevron or use arrow keys to toggle groups.
        </p>
      </div>

      <TreeDataGrid
        columns={columns}
        rows={rows}
        rowKeyGetter={(row) => row.id}
        groupBy={["country"]}
        rowGrouper={rowGrouper}
        expandedGroupIds={expandedGroupIds}
        onExpandedGroupIdsChange={setExpandedGroupIds}
        rowHeight={48}
        headerRowHeight={40}
        className="rdg-theme"
      />
    </div>
  )
}
