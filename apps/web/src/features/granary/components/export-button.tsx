import { Button } from "@repo/ui";
import { Download } from "lucide-react";

interface ExportButtonProps {
  label?: string;
  onClick?: () => void;
}

export function ExportButton({ label = "Export", onClick }: ExportButtonProps) {
  return (
    <Button variant="outline" size="sm" onClick={onClick}>
      <Download size={16} style={{ marginRight: "var(--space-4)" }} />
      {label}
    </Button>
  );
}
