import {
  DataGrid as RDG,
  TreeDataGrid as RDGTree,
  SelectColumn,
  type DataGridProps,
  type Column,
  type ColumnOrColumnGroup,
  type SortColumn,
  type RenderCellProps,
  type RenderEditCellProps,
  type RenderCheckboxProps,
  type RenderSortStatusProps,
  type RenderGroupCellProps,
  type Renderers,
  renderTextEditor,
} from "react-data-grid";
import "react-data-grid/lib/styles.css";
import "./data-grid-theme.css";
import { Checkbox } from "./checkbox";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@repo/utils";
import { useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

function renderCheckbox({
  onChange,
  indeterminate,
  ...props
}: RenderCheckboxProps) {
  const checked = indeterminate ? "indeterminate" : (props.checked ?? false);
  return (
    <Checkbox
      {...props}
      checked={checked}
      onCheckedChange={(val) => {
        onChange(val === true, false);
      }}
    />
  );
}

function renderSortStatus({ sortDirection, priority }: RenderSortStatusProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        marginLeft: "var(--space-4)",
        verticalAlign: "middle",
      }}
    >
      <ArrowDown
        size={13}
        strokeWidth={2.2}
        style={{
          color:
            sortDirection === "DESC"
              ? "var(--text-default)"
              : "var(--text-subdued-2)",
          transition: "color 150ms ease",
          display: "block",
        }}
      />
      <ArrowUp
        size={13}
        strokeWidth={2.2}
        style={{
          color:
            sortDirection === "ASC"
              ? "var(--text-default)"
              : "var(--text-subdued-2)",
          transition: "color 150ms ease",
          display: "block",
        }}
      />
      {priority !== undefined && (
        <span
          style={{
            fontSize: "var(--font-size-xs, 11px)",
            color: "var(--text-subdued-2)",
            marginLeft: 2,
          }}
        >
          {priority}
        </span>
      )}
    </span>
  );
}

const gridRenderers: Renderers<any, any> = {
  renderCheckbox,
  renderSortStatus,
};

/* ------------------------------------------------------------------ */
/* CellWithTooltip — truncates text with ellipsis, shows tooltip on   */
/* hover when content overflows.                                       */
/* ------------------------------------------------------------------ */

interface TooltipState {
  text: string;
  x: number;
  y: number;
}

function CellTooltipPortal({ text, x, y }: TooltipState) {
  return createPortal(
    <div className="rdg-cell-tooltip" style={{ left: x, top: y }}>
      {text}
    </div>,
    document.body,
  );
}

function CellWithTooltip({ children }: { children: React.ReactNode }) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleMouseEnter = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    // Only show tooltip when text is actually truncated
    if (el.scrollWidth <= el.clientWidth) return;

    timerRef.current = setTimeout(() => {
      const rect = el.getBoundingClientRect();
      setTooltip({
        text: el.textContent ?? "",
        x: rect.left,
        y: rect.bottom + 4,
      });
    }, 400);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setTooltip(null);
  }, []);

  return (
    <>
      <span
        ref={ref}
        className="rdg-cell-truncate"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </span>
      {tooltip && <CellTooltipPortal {...tooltip} />}
    </>
  );
}

function DataGrid<R, SR = unknown>({
  className,
  rowHeight = 48,
  headerRowHeight = 40,
  renderers,
  ...props
}: DataGridProps<R, SR>) {
  return (
    <RDG<R, SR>
      className={cn("rdg-theme", className)}
      rowHeight={rowHeight}
      headerRowHeight={headerRowHeight}
      renderers={{ ...gridRenderers, ...renderers }}
      {...props}
    />
  );
}

function TreeDataGrid<R, SR = unknown>({
  className,
  rowHeight = 48,
  headerRowHeight = 40,
  renderers,
  ...props
}: React.ComponentProps<typeof RDGTree<R, SR>>) {
  return (
    <RDGTree<R, SR>
      className={cn("rdg-theme", className)}
      rowHeight={rowHeight}
      headerRowHeight={headerRowHeight}
      renderers={{ ...gridRenderers, ...renderers }}
      {...props}
    />
  );
}

export {
  DataGrid,
  TreeDataGrid,
  SelectColumn,
  gridRenderers,
  renderTextEditor,
  renderCheckbox,
  renderSortStatus,
  CellWithTooltip,
};

export type {
  DataGridProps,
  Column,
  ColumnOrColumnGroup,
  SortColumn,
  RenderCellProps,
  RenderEditCellProps,
  RenderCheckboxProps,
  RenderSortStatusProps,
  RenderGroupCellProps,
  Renderers,
};
