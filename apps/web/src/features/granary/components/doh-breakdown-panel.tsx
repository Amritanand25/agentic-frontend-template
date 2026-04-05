import { Card, Tabs, TabsList, TabsTrigger, TabsContent } from "@repo/ui";
import type { DOHBlock } from "../types";
import { mockTopCategories, mockTopSites } from "../mock-data/home-mock";

interface DOHBreakdownPanelProps {
  selectedBlock: DOHBlock | null;
}

interface TopItem {
  name: string;
  skuCount: number;
  cost: number;
}

function TopItemCard({ item }: { item: TopItem }) {
  return (
    <div
      style={{
        backgroundColor: "var(--surface-10)",
        borderRadius: "var(--radius-8)",
        padding: "var(--space-12)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
      }}
    >
      <div
        style={{
          fontSize: "var(--font-size-m)",
          fontWeight: "var(--font-weight-prominent)",
          color: "var(--text-default)",
        }}
      >
        {item.name}
      </div>
      <div className="flex items-center justify-between">
        <span
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
          }}
        >
          {item.skuCount.toLocaleString()} SKUs
        </span>
        <span
          style={{
            fontSize: "var(--font-size-s)",
            fontWeight: "var(--font-weight-prominent)",
            color: "var(--text-default)",
          }}
        >
          Rs {item.cost.toFixed(2)} Cr
        </span>
      </div>
    </div>
  );
}

export function DOHBreakdownPanel({ selectedBlock }: DOHBreakdownPanelProps) {
  if (!selectedBlock) {
    return (
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-12)",
          padding: "var(--space-16)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 300,
        }}
      >
        <span
          style={{
            fontSize: "var(--font-size-m)",
            color: "var(--text-subdued-2)",
          }}
        >
          Select a DOH block to view breakdown
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "var(--surface-0)",
        borderRadius: "var(--radius-12)",
        padding: "var(--space-16)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-16)",
      }}
    >
      {/* Header */}
      <div
        style={{
          fontSize: "var(--font-size-m)",
          fontWeight: "var(--font-weight-heading)",
          color: "var(--text-default)",
        }}
      >
        Detailed Breakdown: {selectedBlock.range}
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2" style={{ gap: "var(--space-8)" }}>
        <Card
          style={{
            backgroundColor: "var(--surface-10)",
            borderRadius: "var(--radius-8)",
            padding: "var(--space-16)",
          }}
        >
          <div
            style={{
              fontSize: "var(--font-size-xs)",
              color: "var(--text-subdued-1)",
            }}
          >
            SKU Count
          </div>
          <div
            style={{
              fontSize: "var(--font-size-xl)",
              fontWeight: "var(--font-weight-heading)",
              color: "var(--text-default)",
            }}
          >
            {selectedBlock.inventoryCount.toLocaleString()}
          </div>
        </Card>

        <Card
          style={{
            backgroundColor: "var(--surface-10)",
            borderRadius: "var(--radius-8)",
            padding: "var(--space-16)",
          }}
        >
          <div
            style={{
              fontSize: "var(--font-size-xs)",
              color: "var(--text-subdued-1)",
            }}
          >
            Inventory Cost
          </div>
          <div
            style={{
              fontSize: "var(--font-size-xl)",
              fontWeight: "var(--font-weight-heading)",
              color: "var(--text-default)",
            }}
          >
            Rs {selectedBlock.inventoryCost.toFixed(2)} Cr
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="categories">
        <TabsList>
          <TabsTrigger value="categories">Top Categories</TabsTrigger>
          <TabsTrigger value="sites">Top Sites</TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <div
            className="flex flex-col"
            style={{ gap: "var(--space-8)", paddingTop: "var(--space-8)" }}
          >
            {mockTopCategories.map((cat) => (
              <TopItemCard key={cat.name} item={cat} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sites">
          <div
            className="flex flex-col"
            style={{ gap: "var(--space-8)", paddingTop: "var(--space-8)" }}
          >
            {mockTopSites.map((site) => (
              <TopItemCard key={site.name} item={site} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
