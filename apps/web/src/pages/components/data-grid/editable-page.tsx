import { useState, useRef } from "react";
import { DataGrid, type Column, type RenderEditCellProps } from "@repo/ui";
import { sampleRows, type Employee } from "./sample-data";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function autoFocusAndSelect(input: HTMLInputElement | null) {
  input?.focus();
  input?.select();
}

function TextEditorWithPlaceholder({
  row,
  column,
  onRowChange,
  onClose,
  placeholder,
}: RenderEditCellProps<Employee> & { placeholder?: string }) {
  return (
    <input
      className="rdg-text-editor"
      ref={autoFocusAndSelect}
      value={row[column.key as keyof Employee] as string}
      placeholder={
        placeholder ??
        `Enter ${typeof column.name === "string" ? column.name.toLowerCase() : "value"}...`
      }
      onChange={(e) => onRowChange({ ...row, [column.key]: e.target.value })}
      onBlur={() => onClose(true, false)}
    />
  );
}

function EmailEditor({
  row,
  column,
  onRowChange,
  onClose,
}: RenderEditCellProps<Employee>) {
  const [value, setValue] = useState(row.email);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setValue(val);
    if (val && !EMAIL_REGEX.test(val)) {
      setError("Invalid email format");
    } else {
      setError("");
    }
  }

  function commit() {
    if (value && !EMAIL_REGEX.test(value)) {
      inputRef.current?.focus();
      return;
    }
    onRowChange({ ...row, [column.key]: value }, true);
  }

  return (
    <div className={`rdg-email-editor${error ? " rdg-email-invalid" : ""}`}>
      <input
        ref={inputRef}
        value={value}
        placeholder="name@example.com"
        onChange={handleChange}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") onClose();
        }}
        autoFocus
      />
      {error && <span className="rdg-email-error">{error}</span>}
    </div>
  );
}

const columns: Column<Employee>[] = [
  { key: "id", name: "ID", width: 60 },
  {
    key: "firstName",
    name: "First Name",
    renderEditCell: (props) => (
      <TextEditorWithPlaceholder {...props} placeholder="Enter first name..." />
    ),
  },
  {
    key: "lastName",
    name: "Last Name",
    renderEditCell: (props) => (
      <TextEditorWithPlaceholder {...props} placeholder="Enter last name..." />
    ),
  },
  {
    key: "email",
    name: "Email",
    width: 220,
    renderEditCell: (props) => <EmailEditor {...props} />,
  },
  {
    key: "department",
    name: "Department",
    renderEditCell: (props) => (
      <TextEditorWithPlaceholder {...props} placeholder="Enter department..." />
    ),
  },
  {
    key: "role",
    name: "Role",
    renderEditCell: (props) => (
      <TextEditorWithPlaceholder {...props} placeholder="Enter role..." />
    ),
  },
  {
    key: "salary",
    name: "Salary",
    width: 120,
    renderEditCell: (props) => (
      <TextEditorWithPlaceholder {...props} placeholder="Enter salary..." />
    ),
    renderCell: ({ row }) => `$${row.salary.toLocaleString()}`,
  },
];

export default function EditableGridPage() {
  const [rows, setRows] = useState(() => sampleRows.slice(0, 20));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-32)",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "var(--font-size-2xl)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
          }}
        >
          Editable Grid
        </h1>
        <p
          style={{
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-8)",
          }}
        >
          Double-click any cell to edit inline. Press Enter to commit, Escape to
          cancel. Email column validates format.
        </p>
      </div>

      <DataGrid
        columns={columns}
        rows={rows}
        rowKeyGetter={(row) => row.id}
        onRowsChange={setRows}
        rowHeight={48}
        headerRowHeight={40}
        className="rdg-theme"
      />

      <p
        style={{
          fontSize: "var(--font-size-s)",
          color: "var(--text-subdued-2)",
        }}
      >
        Editable columns: First Name, Last Name, Email (with validation),
        Department, Role, Salary
      </p>
    </div>
  );
}
