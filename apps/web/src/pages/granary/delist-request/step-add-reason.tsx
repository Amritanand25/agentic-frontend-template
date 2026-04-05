import { useState } from "react";
import {
  Badge,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DataGrid,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  type Column,
} from "@repo/ui";
import { ChevronDown, ChevronUp } from "lucide-react";
import { mockDelistReasons } from "@/features/granary/mock-data/delist-mock";
import { useDelistWizard } from "./delist-wizard-context";

interface ArticleReasonRow {
  articleCode: string;
  articleName: string;
  reason: string;
}

export function StepAddReason() {
  const {
    selectedArticles,
    globalReason,
    setGlobalReason,
    articleReasons,
    setArticleReason,
    applyGlobalReason,
  } = useDelistWizard();

  const [searchTerm, setSearchTerm] = useState("");
  const [isArticleReasonsOpen, setIsArticleReasonsOpen] = useState(true);

  const filteredArticles = selectedArticles.filter((a) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      a.articleCode.toLowerCase().includes(q) ||
      a.articleName.toLowerCase().includes(q)
    );
  });

  const articleRows: ArticleReasonRow[] = filteredArticles.map((a) => ({
    articleCode: a.articleCode,
    articleName: a.articleName,
    reason: articleReasons[a.articleCode] ?? "",
  }));

  const reasonColumns: Column<ArticleReasonRow>[] = [
    {
      key: "articleCode",
      name: "Article Code",
      width: 140,
      renderCell: ({ row }) => (
        <span
          style={{
            fontSize: "var(--font-size-s)",
            fontWeight: "var(--font-weight-prominent)",
            color: "var(--text-default)",
          }}
        >
          {row.articleCode}
        </span>
      ),
    },
    {
      key: "articleName",
      name: "Article Name",
      renderCell: ({ row }) => (
        <span
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-default)",
          }}
        >
          {row.articleName}
        </span>
      ),
    },
    {
      key: "reason",
      name: "Reason",
      width: 320,
      renderCell: ({ row }) => (
        <Select
          value={row.reason || undefined}
          onValueChange={(val) => setArticleReason(row.articleCode, val)}
        >
          <SelectTrigger
            style={{ width: "100%", height: 32 }}
            aria-label={`Reason for ${row.articleCode}`}
          >
            <SelectValue placeholder="Select reason" />
          </SelectTrigger>
          <SelectContent>
            {mockDelistReasons.map((reason) => (
              <SelectItem key={reason} value={reason}>
                {reason}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ),
    },
  ];

  return (
    <div
      className="flex flex-col gap-[var(--space-16)]"
      style={{ maxWidth: 960, margin: "0 auto" }}
    >
      {/* Global Reason Section */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-8)",
          padding: "var(--space-16)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-12)",
        }}
      >
        <span
          style={{
            fontSize: "var(--font-size-m)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
          }}
        >
          Global Reason
        </span>
        <span
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
          }}
        >
          Select a reason to apply across all articles in this delist request.
        </span>
        <div className="flex items-end gap-[var(--space-12)]">
          <div
            className="flex flex-col gap-[var(--space-4)]"
            style={{ flex: 1 }}
          >
            <Label
              htmlFor="global-reason"
              style={{ fontSize: "var(--font-size-s)" }}
            >
              Reason
            </Label>
            <Select
              value={globalReason || undefined}
              onValueChange={setGlobalReason}
            >
              <SelectTrigger id="global-reason" style={{ width: "100%" }}>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {mockDelistReasons.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="default"
            onClick={applyGlobalReason}
            disabled={!globalReason}
          >
            Apply to all
          </Button>
        </div>
      </div>

      {/* OR Separator */}
      <div className="flex items-center gap-[var(--space-16)]">
        <Separator style={{ flex: 1 }} />
        <Badge variant="outline">OR</Badge>
        <Separator style={{ flex: 1 }} />
      </div>

      {/* Article Specific Reasons */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-8)",
          padding: "var(--space-16)",
        }}
      >
        <Collapsible
          open={isArticleReasonsOpen}
          onOpenChange={setIsArticleReasonsOpen}
        >
          <div className="flex items-center justify-between">
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-[var(--space-8)]"
                style={{ padding: 0 }}
              >
                <span
                  style={{
                    fontSize: "var(--font-size-m)",
                    fontWeight: "var(--font-weight-heading)",
                    color: "var(--text-default)",
                  }}
                >
                  Article Specific Reason
                </span>
                {isArticleReasonsOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </Button>
            </CollapsibleTrigger>
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 240 }}
            />
          </div>

          <CollapsibleContent>
            <div style={{ marginTop: "var(--space-12)" }}>
              <DataGrid
                className="rdg-inline"
                columns={reasonColumns}
                rows={articleRows}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
