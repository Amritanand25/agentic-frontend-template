import { useState, useMemo } from "react";
import {
  DataGrid,
  Checkbox,
  Input,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  ToggleGroup,
  ToggleGroupItem,
  EmptyState,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  type Column,
} from "@repo/ui";
import { Search, Info } from "lucide-react";
import { GranaryFilterBar } from "@/features/granary/components/global-filter-bar";
import { ExportButton } from "@/features/granary/components/export-button";
import { ClassificationMatrix } from "@/features/granary/components/classification-matrix";
import { NOBVolumeCards } from "@/features/granary/components/nob-volume-cards";
import { SelectionActionBar } from "@/features/granary/components/selection-action-bar";
import {
  mockClassificationMatrix,
  mockNOBCategories,
  mockRangedArticles,
} from "@/features/granary/mock-data/range-review-mock";
import type { RangedArticle } from "@/features/granary/types";

const RANGED_SUB_FILTERS = [
  { value: "all", label: "All" },
  { value: "local-gems", label: "Local Gems" },
  { value: "visibility", label: "Visibility" },
  { value: "basket-builder", label: "Basket Builder" },
  { value: "delist", label: "Delist" },
] as const;

export default function RangeReviewPage() {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(
    () => new Set(),
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [rangedFilter, setRangedFilter] = useState("all");

  const filteredRows = useMemo(() => {
    if (!searchQuery.trim()) return mockRangedArticles;
    const query = searchQuery.toLowerCase();
    return mockRangedArticles.filter(
      (row) =>
        row.articleCode.toLowerCase().includes(query) ||
        row.articleName.toLowerCase().includes(query) ||
        row.subCategory.toLowerCase().includes(query) ||
        row.brick.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const allSelected =
    filteredRows.length > 0 && selectedRows.size === filteredRows.length;
  const someSelected =
    selectedRows.size > 0 && selectedRows.size < filteredRows.length;

  function handleSelectAll() {
    if (allSelected) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredRows.map((r) => r.articleCode)));
    }
  }

  function handleRowSelect(articleCode: string) {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(articleCode)) {
        next.delete(articleCode);
      } else {
        next.add(articleCode);
      }
      return next;
    });
  }

  const columns: Column<RangedArticle>[] = [
    {
      key: "select",
      name: "",
      width: 48,
      minWidth: 48,
      maxWidth: 48,
      frozen: true,
      renderHeaderCell: () => (
        <div
          className="flex items-center justify-center"
          style={{ width: "100%" }}
        >
          <Checkbox
            checked={
              allSelected ? true : someSelected ? "indeterminate" : false
            }
            onCheckedChange={handleSelectAll}
            aria-label="Select all rows"
          />
        </div>
      ),
      renderCell: ({ row }: { row: RangedArticle }) => (
        <div
          className="flex items-center justify-center"
          style={{ width: "100%" }}
        >
          <Checkbox
            checked={selectedRows.has(row.articleCode)}
            onCheckedChange={() => handleRowSelect(row.articleCode)}
            aria-label={`Select ${row.articleName}`}
          />
        </div>
      ),
    },
    {
      key: "articleCode",
      name: "Article Code",
      width: 140,
    },
    {
      key: "articleName",
      name: "Article Name",
      minWidth: 280,
    },
    {
      key: "storeCount",
      name: "Store Count",
      width: 130,
      renderHeaderCell: () => (
        <div className="flex items-center" style={{ gap: "var(--space-4)" }}>
          <span>Store Count</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className="inline-flex cursor-help"
                style={{ color: "var(--text-subdued-2)" }}
              >
                <Info size={14} />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              Number of stores where this article is ranged
            </TooltipContent>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "subCategory",
      name: "Sub Category",
      width: 160,
    },
    {
      key: "brick",
      name: "Brick",
      width: 140,
    },
    {
      key: "classification",
      name: "Classification",
      width: 120,
    },
  ];

  return (
    <div className="flex flex-col gap-[var(--space-8)]">
      {/* Page title */}
      <h1
        style={{
          fontSize: "var(--font-size-2xl)",
          fontWeight: "var(--font-weight-heading)",
          color: "var(--text-default)",
          margin: 0,
        }}
      >
        Range Review
      </h1>

      {/* Global filters */}
      <GranaryFilterBar
        visibleFilters={[
          "zone",
          "format",
          "state",
          "city",
          "store",
          "segment",
          "category",
        ]}
      />

      {/* Two-column section: Classification Matrix + NOB Volume */}
      <div className="grid grid-cols-2" style={{ gap: "var(--space-8)" }}>
        {/* Classification Matrix card */}
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
          <h2
            style={{
              fontSize: "var(--font-size-l)",
              fontWeight: "var(--font-weight-heading)",
              color: "var(--text-default)",
              margin: 0,
            }}
          >
            Classification Matrix
          </h2>
          <ClassificationMatrix data={mockClassificationMatrix} />
        </div>

        {/* NOB vs Volume card */}
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
          <h2
            style={{
              fontSize: "var(--font-size-l)",
              fontWeight: "var(--font-weight-heading)",
              color: "var(--text-default)",
              margin: 0,
            }}
          >
            NOB vs Volume
          </h2>
          <NOBVolumeCards data={mockNOBCategories} />
        </div>
      </div>

      {/* Legend row */}
      <div className="flex items-center" style={{ gap: "var(--space-16)" }}>
        <LegendDot color="var(--success-50)" label="Strategic SKU's" />
        <LegendDot color="var(--secondary-50)" label="Regular SKU's" />
        <LegendDot color="var(--error-50)" label="Review SKU's" />
      </div>

      {/* Tabbed table section */}
      <Tabs defaultValue="ranged">
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
          {/* Primary tabs row */}
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="ranged">Ranged</TabsTrigger>
              <TabsTrigger value="unranged">Unranged</TabsTrigger>
              <TabsTrigger value="unlisted">Unlisted</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
          </div>

          {/* Ranged tab content */}
          <TabsContent value="ranged" style={{ margin: 0 }}>
            <div className="flex flex-col" style={{ gap: "var(--space-8)" }}>
              {/* Sub-filter toggles + search + export */}
              <div className="flex items-center justify-between">
                <ToggleGroup
                  type="single"
                  value={rangedFilter}
                  onValueChange={(val) => {
                    if (val) setRangedFilter(val);
                  }}
                  size="sm"
                  variant="outline"
                >
                  {RANGED_SUB_FILTERS.map((filter) => (
                    <ToggleGroupItem key={filter.value} value={filter.value}>
                      {filter.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>

                <div
                  className="flex items-center"
                  style={{ gap: "var(--space-8)" }}
                >
                  <div className="relative">
                    <Search
                      size={16}
                      style={{
                        position: "absolute",
                        left: "var(--space-8)",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--text-subdued-2)",
                        pointerEvents: "none",
                      }}
                    />
                    <Input
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        paddingLeft: "var(--space-32)",
                        width: 240,
                      }}
                    />
                  </div>
                  <ExportButton />
                </div>
              </div>

              {/* DataGrid */}
              <DataGrid
                className="rdg-inline"
                columns={columns}
                rows={filteredRows}
                rowKeyGetter={(row) => row.articleCode}
              />
            </div>
          </TabsContent>

          {/* Other tabs - empty state */}
          <TabsContent value="unranged" style={{ margin: 0 }}>
            <EmptyState
              title="No data available"
              description="Unranged articles will appear here once data is available."
            />
          </TabsContent>

          <TabsContent value="unlisted" style={{ margin: 0 }}>
            <EmptyState
              title="No data available"
              description="Unlisted articles will appear here once data is available."
            />
          </TabsContent>

          <TabsContent value="pending" style={{ margin: 0 }}>
            <EmptyState
              title="No data available"
              description="Pending articles will appear here once data is available."
            />
          </TabsContent>
        </div>
      </Tabs>

      {/* Selection action bar */}
      <SelectionActionBar
        selectedCount={selectedRows.size}
        totalCount={filteredRows.length}
        onClear={() => setSelectedRows(new Set())}
        onSelectAll={() =>
          setSelectedRows(new Set(filteredRows.map((r) => r.articleCode)))
        }
        onDelist={() => {
          /* TODO: delist flow */
        }}
        onExport={() => {
          /* TODO: export flow */
        }}
      />
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center" style={{ gap: "var(--space-4)" }}>
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: color,
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: "var(--font-size-s)",
          color: "var(--text-subdued-1)",
        }}
      >
        {label}
      </span>
    </div>
  );
}
