import { useState } from "react";
import { Badge } from "@repo/ui";
import { CalendarX2, PackageMinus, Clock } from "lucide-react";
import type { ExceptionAlert } from "../types";
import { ExceptionDetailModal } from "./exception-detail-modal";

const EXCEPTION_ICONS: Record<ExceptionAlert["type"], React.ReactNode> = {
  zero_sales: <CalendarX2 size={20} style={{ color: "var(--error-50)" }} />,
  negative_inventory: (
    <PackageMinus size={20} style={{ color: "var(--error-50)" }} />
  ),
  high_doh: <Clock size={20} style={{ color: "var(--error-50)" }} />,
};

interface ExceptionCardsProps {
  exceptions: ExceptionAlert[];
}

export function ExceptionCards({ exceptions }: ExceptionCardsProps) {
  const [selectedAlert, setSelectedAlert] = useState<ExceptionAlert | null>(
    null,
  );

  return (
    <>
      <div className="grid grid-cols-3" style={{ gap: "var(--space-8)" }}>
        {exceptions.map((alert) => (
          <div
            key={alert.id}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedAlert(alert)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedAlert(alert);
              }
            }}
            style={{
              backgroundColor: "var(--surface-0)",
              borderRadius: "var(--radius-12)",
              padding: "var(--space-16)",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-8)",
              transition: "box-shadow 150ms ease",
            }}
            className="hover:shadow-[var(--shadow-small)]"
          >
            <div className="flex items-center justify-between">
              <div
                className="flex items-center"
                style={{ gap: "var(--space-8)" }}
              >
                {EXCEPTION_ICONS[alert.type]}
                <Badge variant="destructive">High Priority</Badge>
              </div>
            </div>

            <div
              style={{
                fontSize: "var(--font-size-m)",
                fontWeight: "var(--font-weight-heading)",
                color: "var(--text-default)",
              }}
            >
              {alert.label}
            </div>

            <div
              style={{
                fontSize: "var(--font-size-s)",
                color: "var(--text-subdued-1)",
              }}
            >
              {alert.siteSkuCount.toLocaleString()} Site-SKU combinations
            </div>
          </div>
        ))}
      </div>

      <ExceptionDetailModal
        alert={selectedAlert}
        open={selectedAlert !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedAlert(null);
        }}
      />
    </>
  );
}
