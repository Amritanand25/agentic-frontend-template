import { useState } from "react";
import {
  Badge,
  Button,
  Checkbox,
  DataGrid,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  ScrollArea,
  type Column,
} from "@repo/ui";
import { Minus } from "lucide-react";
import type { StoreInfo } from "@/features/granary/types";
import { mockStoresByArticle } from "@/features/granary/mock-data/delist-mock";
import { useDelistWizard } from "./delist-wizard-context";

interface StoreRow extends StoreInfo {
  selected: boolean;
}

export function StepStoreSelection() {
  const {
    selectedArticles,
    activeArticleCode,
    setActiveArticleCode,
    removeArticle,
    storeTargetingMode,
    setStoreTargetingMode,
  } = useDelistWizard();

  const [searchTerm, setSearchTerm] = useState("");

  const activeMode = storeTargetingMode[activeArticleCode] ?? "ranged";

  const allStores = mockStoresByArticle[activeArticleCode] ?? [];
  const activeArticle = selectedArticles.find(
    (a) => a.articleCode === activeArticleCode,
  );

  const displayStores: StoreRow[] = allStores
    .filter((s) => {
      if (!searchTerm) return true;
      const q = searchTerm.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q)
      );
    })
    .map((s) => ({ ...s, selected: true }));

  const storeColumns: Column<StoreRow>[] = [
    {
      key: "selected",
      name: "",
      width: 48,
      renderCell: () => (
        <Checkbox
          checked={true}
          disabled={activeMode !== "custom"}
          aria-label="Select store"
        />
      ),
    },
    {
      key: "name",
      name: "Store",
      width: 180,
      renderCell: ({ row }) => (
        <div className="flex flex-col">
          <span
            style={{
              fontSize: "var(--font-size-s)",
              fontWeight: "var(--font-weight-prominent)",
              color: "var(--text-default)",
            }}
          >
            {row.name}
          </span>
          <span
            style={{
              fontSize: "var(--font-size-xs)",
              color: "var(--text-subdued-1)",
            }}
          >
            {row.code}
          </span>
        </div>
      ),
    },
    { key: "state", name: "State", width: 80 },
    { key: "city", name: "City", width: 120 },
    {
      key: "classificationMatrix",
      name: "Classification Matrix",
      width: 160,
      renderCell: ({ row }) => (
        <Badge variant="secondary">{row.classificationMatrix}</Badge>
      ),
    },
    {
      key: "salesVelocity",
      name: "Sales Velocity",
      width: 120,
      renderCell: ({ row }) => (
        <span style={{ color: "var(--text-default)" }}>
          {row.salesVelocity?.toFixed(1)}
        </span>
      ),
    },
    {
      key: "revenueContribution",
      name: "Revenue Contribution %",
      width: 160,
      renderCell: ({ row }) => (
        <span style={{ color: "var(--text-default)" }}>
          {row.revenueContribution}%
        </span>
      ),
    },
  ];

  const radioOptions: {
    value: "affected" | "ranged" | "custom";
    label: string;
    description: string;
  }[] = [
    {
      value: "affected",
      label: "Affected Stores",
      description: `${activeArticle?.affectedCount ?? 0} stores with active impact`,
    },
    {
      value: "ranged",
      label: "Ranged Stores",
      description: `${activeArticle?.rangedCount ?? 0} stores where article is ranged`,
    },
    {
      value: "custom",
      label: "Custom List",
      description: "Select specific stores manually",
    },
  ];

  return (
    <div
      className="flex gap-[var(--space-16)]"
      style={{ height: "calc(100vh - 200px)" }}
    >
      {/* Left panel: Article list */}
      <div
        style={{
          width: 280,
          flexShrink: 0,
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-8)",
          padding: "var(--space-12)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-8)",
        }}
      >
        <span
          style={{
            fontSize: "var(--font-size-s)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
          }}
        >
          Articles ({selectedArticles.length})
        </span>

        <ScrollArea style={{ flex: 1 }}>
          <div className="flex flex-col gap-[var(--space-8)]">
            {selectedArticles.map((article) => {
              const isActive = article.articleCode === activeArticleCode;
              return (
                <div
                  key={article.articleCode}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveArticleCode(article.articleCode)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveArticleCode(article.articleCode);
                    }
                  }}
                  style={{
                    padding: "var(--space-12)",
                    borderRadius: "var(--radius-8)",
                    cursor: "pointer",
                    backgroundColor: isActive
                      ? "var(--primary-10)"
                      : "var(--surface-10)",
                    border: isActive
                      ? "1px dashed var(--primary-50)"
                      : "1px solid transparent",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-[var(--space-4)]">
                      <Badge variant="secondary">{article.subCategory}</Badge>
                      <span
                        style={{
                          fontSize: "var(--font-size-s)",
                          fontWeight: "var(--font-weight-prominent)",
                          color: "var(--text-default)",
                          lineHeight: "var(--line-height-s)",
                        }}
                      >
                        {article.articleName}
                      </span>
                      <span
                        style={{
                          fontSize: "var(--font-size-xs)",
                          color: "var(--text-subdued-1)",
                        }}
                      >
                        {article.articleCode}
                      </span>
                      <div
                        className="flex gap-[var(--space-12)]"
                        style={{
                          fontSize: "var(--font-size-xs)",
                          color: "var(--text-subdued-1)",
                        }}
                      >
                        <span>Affected: {article.affectedCount}</span>
                        <span>Ranged: {article.rangedCount}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeArticle(article.articleCode);
                      }}
                      aria-label={`Remove ${article.articleName}`}
                      style={{ flexShrink: 0 }}
                    >
                      <Minus size={16} style={{ color: "var(--error-50)" }} />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Right panel: Store targeting */}
      <div
        style={{
          flex: 1,
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-8)",
          padding: "var(--space-16)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-16)",
        }}
      >
        {/* Store Targeting Mode */}
        <div className="flex flex-col gap-[var(--space-8)]">
          <span
            style={{
              fontSize: "var(--font-size-m)",
              fontWeight: "var(--font-weight-heading)",
              color: "var(--text-default)",
            }}
          >
            Store Targeting Mode
          </span>

          <RadioGroup
            value={activeMode}
            onValueChange={(val) =>
              setStoreTargetingMode(
                activeArticleCode,
                val as "affected" | "ranged" | "custom",
              )
            }
            className="flex gap-[var(--space-8)]"
          >
            {radioOptions.map((option) => (
              <div
                key={option.value}
                style={{
                  flex: 1,
                  padding: "var(--space-12)",
                  borderRadius: "var(--radius-8)",
                  backgroundColor:
                    activeMode === option.value
                      ? "var(--primary-10)"
                      : "var(--surface-10)",
                  border:
                    activeMode === option.value
                      ? "1px solid var(--primary-50)"
                      : "1px solid var(--grey-30)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
                onClick={() =>
                  setStoreTargetingMode(activeArticleCode, option.value)
                }
                role="presentation"
              >
                <div className="flex items-start gap-[var(--space-8)]">
                  <RadioGroupItem
                    value={option.value}
                    id={`mode-${option.value}`}
                  />
                  <div className="flex flex-col gap-[var(--space-2)]">
                    <Label
                      htmlFor={`mode-${option.value}`}
                      style={{
                        fontSize: "var(--font-size-s)",
                        fontWeight: "var(--font-weight-prominent)",
                        color: "var(--text-default)",
                        cursor: "pointer",
                      }}
                    >
                      {option.label}
                    </Label>
                    <span
                      style={{
                        fontSize: "var(--font-size-xs)",
                        color: "var(--text-subdued-1)",
                      }}
                    >
                      {option.description}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Selected Store Preview */}
        <div className="flex flex-col gap-[var(--space-8)]" style={{ flex: 1 }}>
          <div className="flex items-center justify-between">
            <span
              style={{
                fontSize: "var(--font-size-m)",
                fontWeight: "var(--font-weight-heading)",
                color: "var(--text-default)",
              }}
            >
              Selected Store Preview
            </span>
            <Input
              placeholder="Search stores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 240 }}
            />
          </div>

          <DataGrid
            className="rdg-inline"
            columns={storeColumns}
            rows={displayStores}
          />
        </div>
      </div>
    </div>
  );
}
