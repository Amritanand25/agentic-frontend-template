import { useState, useMemo } from "react"
import { DataGrid, type Column } from "react-data-grid"
import { Pencil, Check, X } from "lucide-react"
import "react-data-grid/lib/styles.css"
import "./data-grid-theme.css"
import { sampleRows, type Employee } from "./sample-data"

type Permission = "admin" | "editor" | "viewer"

const permissionConfig: Record<Permission, { canEdit: boolean; label: string }> = {
  admin: { canEdit: true, label: "Admin" },
  editor: { canEdit: true, label: "Editor" },
  viewer: { canEdit: false, label: "Viewer" },
}

function InlineInput({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (val: string) => void
  placeholder?: string
}) {
  return (
    <input
      className="row-edit-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoFocus={false}
    />
  )
}

export default function RowEditModePage() {
  const [rows, setRows] = useState(() => sampleRows.slice(0, 15))
  const [editingRowId, setEditingRowId] = useState<number | null>(null)
  const [editDraft, setEditDraft] = useState<Employee | null>(null)
  const [permission, setPermission] = useState<Permission>("admin")

  const canEdit = permissionConfig[permission].canEdit

  function startEdit(row: Employee) {
    setEditingRowId(row.id)
    setEditDraft({ ...row })
  }

  function cancelEdit() {
    setEditingRowId(null)
    setEditDraft(null)
  }

  function saveEdit() {
    if (!editDraft) return
    setRows((prev) => prev.map((r) => (r.id === editDraft.id ? editDraft : r)))
    setEditingRowId(null)
    setEditDraft(null)
  }

  function updateDraft(key: keyof Employee, value: string) {
    if (!editDraft) return
    setEditDraft({ ...editDraft, [key]: key === "salary" ? Number(value) || 0 : value })
  }

  const columns: Column<Employee>[] = useMemo(
    () => [
      {
        key: "actions",
        name: "",
        width: 80,
        minWidth: 80,
        maxWidth: 80,
        renderCell: ({ row }) => {
          if (!canEdit) return null

          if (editingRowId === row.id) {
            return (
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
                <button className="row-edit-action-btn row-edit-save" onClick={saveEdit} title="Save">
                  <Check size={15} />
                </button>
                <button className="row-edit-action-btn row-edit-cancel" onClick={cancelEdit} title="Cancel">
                  <X size={15} />
                </button>
              </div>
            )
          }

          return (
            <button
              className="row-edit-action-btn row-edit-trigger"
              onClick={() => startEdit(row)}
              disabled={editingRowId !== null}
              title="Edit row"
            >
              <Pencil size={14} />
            </button>
          )
        },
      },
      {
        key: "id",
        name: "ID",
        width: 60,
      },
      {
        key: "firstName",
        name: "First Name",
        renderCell: ({ row }) => {
          if (editingRowId === row.id && editDraft) {
            return <InlineInput value={editDraft.firstName} onChange={(v) => updateDraft("firstName", v)} placeholder="First name" />
          }
          return row.firstName
        },
      },
      {
        key: "lastName",
        name: "Last Name",
        renderCell: ({ row }) => {
          if (editingRowId === row.id && editDraft) {
            return <InlineInput value={editDraft.lastName} onChange={(v) => updateDraft("lastName", v)} placeholder="Last name" />
          }
          return row.lastName
        },
      },
      {
        key: "email",
        name: "Email",
        width: 220,
        renderCell: ({ row }) => {
          if (editingRowId === row.id && editDraft) {
            return <InlineInput value={editDraft.email} onChange={(v) => updateDraft("email", v)} placeholder="Email" />
          }
          return row.email
        },
      },
      {
        key: "department",
        name: "Department",
        renderCell: ({ row }) => {
          if (editingRowId === row.id && editDraft) {
            return <InlineInput value={editDraft.department} onChange={(v) => updateDraft("department", v)} placeholder="Department" />
          }
          return row.department
        },
      },
      {
        key: "role",
        name: "Role",
        renderCell: ({ row }) => {
          if (editingRowId === row.id && editDraft) {
            return <InlineInput value={editDraft.role} onChange={(v) => updateDraft("role", v)} placeholder="Role" />
          }
          return row.role
        },
      },
      {
        key: "salary",
        name: "Salary",
        width: 120,
        renderCell: ({ row }) => {
          if (editingRowId === row.id && editDraft) {
            return <InlineInput value={String(editDraft.salary)} onChange={(v) => updateDraft("salary", v)} placeholder="Salary" />
          }
          return `$${row.salary.toLocaleString()}`
        },
      },
    ],
    [editingRowId, editDraft, canEdit]
  )

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-32)" }}>
      <div>
        <h1 style={{ fontSize: "var(--font-size-2xl)", fontWeight: "var(--font-weight-heading)", color: "var(--text-default)" }}>
          Row Edit Mode
        </h1>
        <p style={{ color: "var(--text-subdued-1)", marginTop: "var(--space-8)" }}>
          Click the edit button to make an entire row editable. Save or cancel to commit or discard changes. Edit button visibility is permission-based.
        </p>
      </div>

      {/* Permission toggle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-12)",
          padding: "var(--space-12) var(--space-16)",
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-8)",
          border: "1px solid var(--grey-30)",
        }}
      >
        <span style={{ fontSize: "var(--font-size-s)", fontWeight: "var(--font-weight-prominent)", color: "var(--text-subdued-1)" }}>
          Simulate Permission:
        </span>
        {(Object.keys(permissionConfig) as Permission[]).map((p) => (
          <button
            key={p}
            onClick={() => { setPermission(p); cancelEdit() }}
            style={{
              padding: "var(--space-4) var(--space-12)",
              borderRadius: "var(--radius-6)",
              border: "1px solid",
              borderColor: permission === p ? "var(--primary-50)" : "var(--grey-40)",
              backgroundColor: permission === p ? "var(--primary-10)" : "var(--surface-0)",
              color: permission === p ? "var(--primary-60)" : "var(--text-default)",
              fontSize: "var(--font-size-s)",
              fontWeight: "var(--font-weight-prominent)",
              cursor: "pointer",
            }}
          >
            {permissionConfig[p].label}
          </button>
        ))}
        {!canEdit && (
          <span style={{ fontSize: "var(--font-size-s)", color: "var(--text-subdued-2)", marginLeft: "var(--space-8)" }}>
            (Edit button hidden for viewers)
          </span>
        )}
      </div>

      <DataGrid
        columns={columns}
        rows={rows}
        rowKeyGetter={(row) => row.id}
        rowHeight={48}
        headerRowHeight={40}
        className="rdg-theme"
        rowClass={(row) => (editingRowId === row.id ? "rdg-row-editing" : undefined)}
      />

      <p style={{ fontSize: "var(--font-size-s)", color: "var(--text-subdued-2)" }}>
        Role: {permissionConfig[permission].label} — {canEdit ? "Can edit rows" : "Read-only"}
      </p>
    </div>
  )
}
