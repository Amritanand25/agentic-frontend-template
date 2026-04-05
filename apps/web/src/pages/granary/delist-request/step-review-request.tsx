import { useState } from "react";
import {
  Badge,
  Button,
  DataGrid,
  Input,
  TablePagination,
  type Column,
} from "@repo/ui";
import { Pencil } from "lucide-react";
import { useDelistWizard } from "./delist-wizard-context";

interface ReviewRow {
  articleCode: string;
  articleName: string;
  reason: string;
  targetingMode: string;
  storeCount: number;
}

export function StepReviewRequest() {
  const {
    selectedArticles,
    articleReasons,
    storeTargetingMode,
    setCurrentStep,
  } = useDelistWizard();

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const reviewRows: ReviewRow[] = selectedArticles
    .filter((a) => {
      if (!searchTerm) return true;
      const q = searchTerm.toLowerCase();
      return (
        a.articleCode.toLowerCase().includes(q) ||
        a.articleName.toLowerCase().includes(q)
      );
    })
    .map((a) => {
      const mode = storeTargetingMode[a.articleCode] ?? "ranged";
      const count = mode === "affected" ? a.affectedCount : a.rangedCount;
      return {
        articleCode: a.articleCode,
        articleName: a.articleName,
        reason: articleReasons[a.articleCode] ?? "Not specified",
        targetingMode: mode,
        storeCount: count,
      };
    });

  const paginatedRows = reviewRows.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage,
  );

  const reviewColumns: Column<ReviewRow>[] = [
    {
      key: "articleName",
      name: "Article",
      renderCell: ({ row }) => (
        <div className="flex flex-col">
          <span
            style={{
              fontSize: "var(--font-size-s)",
              fontWeight: "var(--font-weight-prominent)",
              color: "var(--text-default)",
            }}
          >
            {row.articleName}
          </span>
        </div>
      ),
    },
    {
      key: "articleCode",
      name: "Article Code",
      width: 140,
      renderCell: ({ row }) => (
        <span
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-default)",
          }}
        >
          {row.articleCode}
        </span>
      ),
    },
    {
      key: "reason",
      name: "Reason",
      width: 260,
      renderCell: ({ row }) => (
        <Badge
          variant={row.reason === "Not specified" ? "outline" : "secondary"}
        >
          {row.reason}
        </Badge>
      ),
    },
    {
      key: "targetingMode",
      name: "Targeting Mode",
      width: 200,
      renderCell: ({ row }) => (
        <Badge variant="default">
          {row.targetingMode.charAt(0).toUpperCase() +
            row.targetingMode.slice(1)}{" "}
          ({row.storeCount} stores)
        </Badge>
      ),
    },
    {
      key: "edit",
      name: "Edit",
      width: 80,
      renderCell: () => (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentStep(1)}
          aria-label="Edit selection"
        >
          <Pencil size={16} style={{ color: "var(--text-subdued-1)" }} />
        </Button>
      ),
    },
  ];

  return (
    <div
      className="flex flex-col gap-[var(--space-8)]"
      style={{ maxWidth: 1100, margin: "0 auto" }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-24)",
          padding: "var(--space-16)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-8)",
        }}
      >
        <div className="flex items-center justify-between">
          <span
            style={{
              fontSize: "var(--font-size-m)",
              fontWeight: "var(--font-weight-heading)",
              color: "var(--text-default)",
            }}
          >
            Selection Summary
          </span>
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 240 }}
          />
        </div>

        <DataGrid
          className="rdg-inline"
          columns={reviewColumns}
          rows={paginatedRows}
        />

        <TablePagination
          totalRows={reviewRows.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
