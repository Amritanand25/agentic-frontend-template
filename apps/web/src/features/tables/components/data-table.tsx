import { useState, useMemo, useRef, useEffect } from "react";
import {
  DataGrid,
  type Column,
  type SortColumn,
  SelectColumn,
  type RenderCellProps,
  type Renderers,
  type RenderCheckboxProps,
  type RenderSortStatusProps,
} from "react-data-grid";
import "react-data-grid/lib/styles.css";
import "./data-grid-theme.css";
import { Badge, Checkbox } from "@repo/ui";
import {
  ExternalLink,
  Mail,
  Check,
  Minus,
  ArrowDown,
  ArrowUp,
  Plus,
  Type,
  Hash,
  AtSign,
  Phone,
  Link,
  Calendar,
  ToggleLeft,
  List,
  ListChecks,
} from "lucide-react";
import type { Field, FieldType } from "@/stores/schema-store";
import type { TableRecord } from "../types";
import {
  formatCurrency,
  formatNumber,
  formatDate,
  formatPhone,
  truncateUrl,
} from "../utils/cell-formatters";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface DataTableProps {
  fields: Field[];
  records: TableRecord[];
  searchQuery: string;
  /** Explicit height for the table container (e.g. "600px", "calc(100vh - 220px)") */
  height?: string;
  /** Callback when user adds a new column via the "+" button */
  onAddColumn?: (name: string, type: FieldType) => void;
}

/* ------------------------------------------------------------------ */
/*  Field type options for the add-column dropdown                     */
/* ------------------------------------------------------------------ */

const FIELD_TYPE_OPTIONS: {
  type: FieldType;
  label: string;
  icon: React.ReactNode;
}[] = [
  { type: "text", label: "Text", icon: <Type size={14} /> },
  { type: "number", label: "Number", icon: <Hash size={14} /> },
  { type: "email", label: "Email", icon: <AtSign size={14} /> },
  { type: "phone", label: "Phone", icon: <Phone size={14} /> },
  { type: "url", label: "URL", icon: <Link size={14} /> },
  { type: "date", label: "Date", icon: <Calendar size={14} /> },
  { type: "boolean", label: "Checkbox", icon: <ToggleLeft size={14} /> },
  { type: "select", label: "Select", icon: <List size={14} /> },
  {
    type: "multiselect",
    label: "Multi-Select",
    icon: <ListChecks size={14} />,
  },
];

/* ------------------------------------------------------------------ */
/*  Badge color mapping                                                */
/* ------------------------------------------------------------------ */

const BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  Active: {
    bg: "var(--success-10, #dcfce7)",
    text: "var(--success-50, #16a34a)",
  },
  Lead: {
    bg: "var(--warning-10, #fef9c3)",
    text: "var(--warning-50, #ca8a04)",
  },
  Churned: { bg: "var(--error-10, #fecaca)", text: "var(--error-50, #dc2626)" },
  "Closed Won": {
    bg: "var(--success-10, #dcfce7)",
    text: "var(--success-50, #16a34a)",
  },
  "Closed Lost": {
    bg: "var(--error-10, #fecaca)",
    text: "var(--error-50, #dc2626)",
  },
  Prospecting: {
    bg: "var(--info-10, #dbeafe)",
    text: "var(--info-50, #2563eb)",
  },
  Qualification: {
    bg: "var(--warning-10, #fef9c3)",
    text: "var(--warning-50, #ca8a04)",
  },
  Proposal: { bg: "var(--primary-10)", text: "var(--primary-50)" },
  Negotiation: {
    bg: "var(--secondary-10, #f3e8ff)",
    text: "var(--secondary-50, #9333ea)",
  },
  "B2B SaaS": { bg: "var(--primary-10)", text: "var(--primary-50)" },
  "E-commerce": {
    bg: "var(--info-10, #dbeafe)",
    text: "var(--info-50, #2563eb)",
  },
  Fintech: {
    bg: "var(--success-10, #dcfce7)",
    text: "var(--success-50, #16a34a)",
  },
  Healthcare: {
    bg: "var(--error-10, #fecaca)",
    text: "var(--error-50, #dc2626)",
  },
  EdTech: {
    bg: "var(--warning-10, #fef9c3)",
    text: "var(--warning-50, #ca8a04)",
  },
  Enterprise: { bg: "var(--primary-10)", text: "var(--primary-50)" },
  Startup: {
    bg: "var(--success-10, #dcfce7)",
    text: "var(--success-50, #16a34a)",
  },
  "Mid-market": {
    bg: "var(--info-10, #dbeafe)",
    text: "var(--info-50, #2563eb)",
  },
  SMB: { bg: "var(--warning-10, #fef9c3)", text: "var(--warning-50, #ca8a04)" },
  "Decision Maker": {
    bg: "var(--error-10, #fecaca)",
    text: "var(--error-50, #dc2626)",
  },
  Champion: {
    bg: "var(--success-10, #dcfce7)",
    text: "var(--success-50, #16a34a)",
  },
  Influencer: { bg: "var(--primary-10)", text: "var(--primary-50)" },
  "End User": {
    bg: "var(--info-10, #dbeafe)",
    text: "var(--info-50, #2563eb)",
  },
};

function getBadgeColor(value: string) {
  return (
    BADGE_COLORS[value] ?? {
      bg: "var(--surface-10)",
      text: "var(--text-default)",
    }
  );
}

/* ------------------------------------------------------------------ */
/*  Row type — flat key-value for react-data-grid                      */
/* ------------------------------------------------------------------ */

interface GridRow {
  __id: string;
  [fieldId: string]: unknown;
}

/* ------------------------------------------------------------------ */
/*  Cell renderers per field type                                      */
/* ------------------------------------------------------------------ */

function renderEmptyCell() {
  return <span className="rdg-cell-empty">--</span>;
}

function renderCellByType(field: Field, value: unknown) {
  if (value === null || value === undefined || value === "") {
    return renderEmptyCell();
  }

  switch (field.type) {
    case "text":
      return <span>{String(value)}</span>;

    case "number": {
      const nameLower = field.name.toLowerCase();
      if (nameLower.includes("revenue") || nameLower.includes("value")) {
        return <span className="rdg-cell-number">{formatCurrency(value)}</span>;
      }
      if (nameLower.includes("probability")) {
        return <span className="rdg-cell-number">{formatNumber(value)}%</span>;
      }
      return <span className="rdg-cell-number">{formatNumber(value)}</span>;
    }

    case "email":
      return (
        <a
          href={`mailto:${String(value)}`}
          className="rdg-cell-link"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Send email to ${String(value)}`}
        >
          <Mail size={14} style={{ flexShrink: 0 }} />
          {String(value)}
        </a>
      );

    case "phone":
      return <span className="rdg-cell-number">{formatPhone(value)}</span>;

    case "url": {
      const displayUrl = truncateUrl(value);
      return (
        <a
          href={String(value)}
          target="_blank"
          rel="noopener noreferrer"
          className="rdg-cell-link"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Open ${displayUrl} in new tab`}
        >
          {displayUrl}
          <ExternalLink size={12} style={{ flexShrink: 0 }} />
        </a>
      );
    }

    case "date":
    case "datetime":
      return <span>{formatDate(value)}</span>;

    case "boolean":
      return value ? (
        <div
          className="rdg-boolean-cell rdg-boolean-cell--true"
          role="img"
          aria-label="Yes"
        >
          <Check size={14} />
        </div>
      ) : (
        <div
          className="rdg-boolean-cell rdg-boolean-cell--false"
          role="img"
          aria-label="No"
        >
          <Minus size={14} />
        </div>
      );

    case "select": {
      const strValue = String(value);
      const colors = getBadgeColor(strValue);
      return (
        <Badge
          className="rdg-cell-badge"
          style={{
            backgroundColor: colors.bg,
            color: colors.text,
            border: "none",
          }}
        >
          {strValue}
        </Badge>
      );
    }

    case "multiselect": {
      const items = Array.isArray(value) ? value : [];
      if (items.length === 0) return renderEmptyCell();
      return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {items.map((item) => {
            const strItem = String(item);
            const colors = getBadgeColor(strItem);
            return (
              <Badge
                key={strItem}
                className="rdg-cell-badge"
                style={{
                  backgroundColor: colors.bg,
                  color: colors.text,
                  border: "none",
                  fontSize: 11,
                  padding: "1px 6px",
                }}
              >
                {strItem}
              </Badge>
            );
          })}
        </div>
      );
    }

    default:
      return <span>{String(value)}</span>;
  }
}

/* ------------------------------------------------------------------ */
/*  Custom renderers for checkbox + sort icons                         */
/* ------------------------------------------------------------------ */

function renderCheckbox({
  onChange,
  indeterminate,
  ...props
}: RenderCheckboxProps) {
  const checked = indeterminate
    ? ("indeterminate" as const)
    : (props.checked ?? false);
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

const gridRenderers: Renderers<GridRow, unknown> = {
  renderCheckbox,
  renderSortStatus,
};

/* ------------------------------------------------------------------ */
/*  Column width heuristics per field type                             */
/* ------------------------------------------------------------------ */

function getColumnWidth(field: Field): number | string {
  switch (field.type) {
    case "email":
      return 220;
    case "url":
      return 180;
    case "phone":
      return 160;
    case "date":
    case "datetime":
      return 140;
    case "boolean":
      return 100;
    case "number":
      return 130;
    case "select":
      return 140;
    case "multiselect":
      return 200;
    default:
      return "auto";
  }
}

/* ------------------------------------------------------------------ */
/*  DataTable component                                                */
/* ------------------------------------------------------------------ */

export function DataTable({
  fields,
  records,
  searchQuery,
  height = "calc(100vh - 160px)",
  onAddColumn,
}: DataTableProps) {
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
  const [addColumnOpen, setAddColumnOpen] = useState(false);
  const addColumnRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!addColumnOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        addColumnRef.current &&
        !addColumnRef.current.contains(e.target as Node)
      ) {
        setAddColumnOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [addColumnOpen]);

  function handleAddColumn(type: FieldType) {
    const label =
      FIELD_TYPE_OPTIONS.find((o) => o.type === type)?.label ?? "Field";
    const name = `New ${label}`;
    onAddColumn?.(name, type);
    setAddColumnOpen(false);
  }

  // Sort fields by position
  const sortedFields = useMemo(
    () => [...fields].sort((a, b) => a.position - b.position),
    [fields],
  );

  // Build react-data-grid columns from field definitions
  const columns = useMemo<Column<GridRow>[]>(() => {
    const fieldColumns: Column<GridRow>[] = sortedFields.map((field, index) => {
      const width = getColumnWidth(field);
      return {
        key: field.id,
        name: field.name,
        width: typeof width === "number" ? width : undefined,
        resizable: true,
        sortable: true,
        frozen: index === 0, // Freeze the first field column (name)
        renderCell: ({ row }: RenderCellProps<GridRow>) =>
          renderCellByType(field, row[field.id]),
      };
    });

    const cols: Column<GridRow>[] = [
      SelectColumn as Column<GridRow>,
      ...fieldColumns,
    ];

    // Add "+" column at the end if onAddColumn is provided
    if (onAddColumn) {
      cols.push({
        key: "__add_column",
        name: "+",
        width: 48,
        resizable: false,
        sortable: false,
        renderCell: () => null,
        renderHeaderCell: () => (
          <button
            onClick={() => setAddColumnOpen((prev) => !prev)}
            className="flex items-center justify-center w-full h-full"
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "var(--text-subdued-2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--primary-50)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-subdued-2)";
            }}
            aria-label="Add column"
          >
            <Plus size={16} />
          </button>
        ),
      });
    }

    return cols;
  }, [sortedFields, onAddColumn, addColumnOpen]);

  // Convert records to flat rows
  const allRows = useMemo<GridRow[]>(
    () =>
      records.map((record) => ({
        __id: record.id,
        ...record.data,
      })),
    [records],
  );

  // Filter by search query
  const filteredRows = useMemo(() => {
    if (!searchQuery.trim()) return allRows;
    const query = searchQuery.toLowerCase();
    return allRows.filter((row) =>
      sortedFields.some((field) => {
        const val = row[field.id];
        if (val === null || val === undefined) return false;
        if (Array.isArray(val)) {
          return val.some((item) => String(item).toLowerCase().includes(query));
        }
        return String(val).toLowerCase().includes(query);
      }),
    );
  }, [allRows, searchQuery, sortedFields]);

  // Sort rows
  const sortedRows = useMemo(() => {
    if (sortColumns.length === 0) return filteredRows;
    return [...filteredRows].sort((a, b) => {
      for (const { columnKey, direction } of sortColumns) {
        const aVal = a[columnKey];
        const bVal = b[columnKey];

        // Handle nulls
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;

        let comparison = 0;
        if (typeof aVal === "number" && typeof bVal === "number") {
          comparison = aVal - bVal;
        } else {
          comparison = String(aVal).localeCompare(String(bVal));
        }
        if (comparison !== 0) {
          return direction === "ASC" ? comparison : -comparison;
        }
      }
      return 0;
    });
  }, [filteredRows, sortColumns]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height,
        maxHeight: height,
        overflow: "hidden",
        border: "1px solid var(--grey-30)",
        borderRadius: "var(--radius-12)",
        position: "relative",
      }}
    >
      {/* Grid container fills remaining space */}
      <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
        <DataGrid
          columns={columns}
          rows={sortedRows}
          rowKeyGetter={(row: GridRow) => row.__id}
          selectedRows={selectedRows}
          onSelectedRowsChange={setSelectedRows}
          sortColumns={sortColumns}
          onSortColumnsChange={setSortColumns}
          renderers={gridRenderers}
          rowHeight={48}
          headerRowHeight={40}
          className="rdg-theme"
          aria-label="Records table"
        />
      </div>

      {/* Add Column Dropdown */}
      {addColumnOpen && (
        <div
          ref={addColumnRef}
          style={{
            position: "absolute",
            top: 44,
            right: 8,
            width: 200,
            backgroundColor: "var(--surface-0)",
            border: "1px solid var(--grey-30)",
            borderRadius: "var(--radius-8, 8px)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
            zIndex: 50,
            padding: "4px",
          }}
          role="menu"
          aria-label="Select column type"
        >
          <div
            style={{
              padding: "8px 12px 6px",
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--text-subdued-2)",
            }}
          >
            Select field type
          </div>
          {FIELD_TYPE_OPTIONS.map((option) => (
            <button
              key={option.type}
              onClick={() => handleAddColumn(option.type)}
              className="flex items-center gap-3 w-full rounded-md transition-colors duration-150"
              style={{
                padding: "8px 12px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "var(--text-default)",
                fontSize: "13px",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--surface-10)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              role="menuitem"
            >
              <span
                className="flex items-center justify-center shrink-0"
                style={{ color: "var(--text-subdued-1)" }}
              >
                {option.icon}
              </span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderTop: "1px solid var(--grey-30)",
          backgroundColor: "var(--surface-0)",
          fontSize: "var(--font-size-s)",
          color: "var(--text-subdued-1)",
          flexShrink: 0,
        }}
      >
        <span>
          {selectedRows.size > 0
            ? `${selectedRows.size} of ${sortedRows.length} record${sortedRows.length === 1 ? "" : "s"} selected`
            : `Showing ${sortedRows.length} record${sortedRows.length === 1 ? "" : "s"}`}
        </span>
      </div>
    </div>
  );
}
