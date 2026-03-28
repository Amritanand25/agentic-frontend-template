import type { RenderCheckboxProps, RenderSortStatusProps, Renderers } from "react-data-grid"
import { ArrowDown, ArrowUp } from "lucide-react"
import { Checkbox } from "@repo/ui"

function renderCheckbox({ onChange, indeterminate, ...props }: RenderCheckboxProps) {
  const checked = indeterminate ? "indeterminate" : props.checked ?? false

  return (
    <Checkbox
      {...props}
      checked={checked}
      onCheckedChange={(val) => {
        onChange(val === true, false)
      }}
    />
  )
}

function renderSortStatus({ sortDirection, priority }: RenderSortStatusProps) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 1, marginLeft: "var(--space-4)", verticalAlign: "middle" }}>
      <ArrowDown
        size={13}
        strokeWidth={2.2}
        style={{
          color: sortDirection === "DESC" ? "var(--text-default)" : "var(--text-subdued-2)",
          transition: "color 150ms ease",
          display: "block",
        }}
      />
      <ArrowUp
        size={13}
        strokeWidth={2.2}
        style={{
          color: sortDirection === "ASC" ? "var(--text-default)" : "var(--text-subdued-2)",
          transition: "color 150ms ease",
          display: "block",
        }}
      />
      {priority !== undefined && (
        <span style={{ fontSize: "var(--font-size-xs, 11px)", color: "var(--text-subdued-2)", marginLeft: 2 }}>
          {priority}
        </span>
      )}
    </span>
  )
}

export const gridRenderers: Renderers<any, any> = {
  renderCheckbox,
  renderSortStatus,
}
