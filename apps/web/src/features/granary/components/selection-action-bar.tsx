import { Button } from "@repo/ui";
import { X, Download } from "lucide-react";

interface SelectionActionBarProps {
  selectedCount: number;
  totalCount: number;
  onClear: () => void;
  onSelectAll: () => void;
  onDelist: () => void;
  onExport: () => void;
}

export function SelectionActionBar({
  selectedCount,
  totalCount,
  onClear,
  onSelectAll,
  onDelist,
  onExport,
}: SelectionActionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "var(--space-16)",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        backgroundColor: "var(--grey-90)",
        color: "var(--surface-0)",
        borderRadius: "var(--radius-8)",
        padding: "var(--space-12) var(--space-16)",
        display: "flex",
        alignItems: "center",
        gap: "var(--space-16)",
        maxWidth: 600,
        width: "max-content",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.24)",
      }}
    >
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClear}
        style={{ color: "var(--surface-0)" }}
        aria-label="Clear selection"
      >
        <X size={16} />
      </Button>

      {/* Selection text */}
      <span
        style={{
          fontSize: "var(--font-size-s)",
          whiteSpace: "nowrap",
        }}
      >
        {selectedCount} of {totalCount} selected
      </span>

      {/* Select All link */}
      <Button
        variant="link"
        size="sm"
        onClick={onSelectAll}
        style={{
          color: "var(--primary-30)",
          fontSize: "var(--font-size-s)",
          padding: 0,
          height: "auto",
        }}
      >
        Select All
      </Button>

      {/* Delist button */}
      <Button variant="destructive" size="sm" onClick={onDelist}>
        Delist
      </Button>

      {/* Export button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onExport}
        style={{
          color: "var(--surface-0)",
          borderColor: "var(--grey-60)",
        }}
      >
        <Download size={14} style={{ marginRight: "var(--space-4)" }} />
        Export ({selectedCount})
      </Button>
    </div>
  );
}
