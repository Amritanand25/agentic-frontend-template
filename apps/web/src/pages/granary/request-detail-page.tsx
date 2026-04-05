import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TitleBar,
  Badge,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  ScrollArea,
  DataGrid,
  Input,
  type Column,
} from "@repo/ui";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { mockRequestDetail } from "@/features/granary/mock-data/requests-mock";
import type { RequestArticle, StoreInfo } from "@/features/granary/types";

function formatDate(iso: string): string {
  const d = new Date(iso);
  const day = d.getDate().toString().padStart(2, "0");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const mon = months[d.getMonth()];
  const year = d.getFullYear();
  const hours = d.getHours().toString().padStart(2, "0");
  const mins = d.getMinutes().toString().padStart(2, "0");
  return `${day} ${mon} ${year} ${hours}:${mins}`;
}

const storeColumns: Column<StoreInfo>[] = [
  { key: "name", name: "Store", width: 200 },
  { key: "code", name: "Store Code", width: 120 },
  { key: "state", name: "State", width: 100 },
  { key: "city", name: "City" },
];

interface MetadataFieldProps {
  label: string;
  children: React.ReactNode;
}

function MetadataField({ label, children }: MetadataFieldProps) {
  return (
    <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
      <span
        style={{
          fontSize: "var(--font-size-xs)",
          color: "var(--text-subdued-1)",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: "var(--font-size-s)",
          color: "var(--text-default)",
        }}
      >
        {children}
      </span>
    </div>
  );
}

export default function RequestDetailPage() {
  const navigate = useNavigate();
  const { requestId } = useParams<{ requestId: string }>();
  const detail = mockRequestDetail;

  const [detailsOpen, setDetailsOpen] = useState(true);
  const [selectedArticleIndex, setSelectedArticleIndex] = useState(0);
  const [storePreviewOpen, setStorePreviewOpen] = useState(true);
  const [storeSearch, setStoreSearch] = useState("");

  const selectedArticle = detail.articles[selectedArticleIndex];

  const filteredStores = useMemo(() => {
    if (!selectedArticle) return [];
    if (!storeSearch.trim()) return selectedArticle.stores;
    const q = storeSearch.toLowerCase();
    return selectedArticle.stores.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q) ||
        s.state.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q),
    );
  }, [selectedArticle, storeSearch]);

  return (
    <div className="flex flex-col gap-[var(--space-8)]">
      {/* Title Bar */}
      <TitleBar
        title={`Request ID: ${requestId ?? detail.requestId}`}
        onBack={() => navigate("/granary/assortment/requests")}
        actions={<Badge variant="secondary">{detail.status}</Badge>}
        style={{
          padding: "var(--space-12) 0",
          backgroundColor: "transparent",
          borderBottom: "none",
        }}
      />

      {/* Collapsible Request Details */}
      <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
        <div
          style={{
            backgroundColor: "var(--surface-0)",
            borderRadius: "var(--radius-8)",
            padding: "var(--space-16)",
          }}
        >
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="flex w-full items-center"
              style={{
                gap: "var(--space-8)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                color: "var(--text-default)",
                fontSize: "var(--font-size-m)",
                fontWeight: "var(--font-weight-heading)",
              }}
            >
              {detailsOpen ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
              Request Details
            </button>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div
              className="grid grid-cols-4"
              style={{
                gap: "var(--space-16)",
                marginTop: "var(--space-16)",
              }}
            >
              <MetadataField label="Category">{detail.category}</MetadataField>
              <MetadataField label="Sub Category">
                {detail.subCategory}
              </MetadataField>
              <MetadataField label="Format">{detail.format}</MetadataField>
              <MetadataField label="Zone">{detail.zone}</MetadataField>
              <MetadataField label="State">{detail.state}</MetadataField>
              <MetadataField label="Request Type">
                <Badge variant="outline">{detail.requestType}</Badge>
              </MetadataField>
              <MetadataField label="Raised on">
                {formatDate(detail.raisedOn)}
              </MetadataField>
              <MetadataField label="Raised by">{detail.raisedBy}</MetadataField>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Two-column layout: Article Selection + Selection Overview */}
      <div className="flex" style={{ gap: "var(--space-8)" }}>
        {/* Left: Article Selection */}
        <div
          style={{
            width: 300,
            minWidth: 300,
            backgroundColor: "var(--surface-0)",
            borderRadius: "var(--radius-8)",
            padding: "var(--space-16)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-12)",
          }}
        >
          <div className="flex items-center" style={{ gap: "var(--space-8)" }}>
            <span
              style={{
                fontSize: "var(--font-size-m)",
                fontWeight: "var(--font-weight-heading)",
                color: "var(--text-default)",
              }}
            >
              Article Selection
            </span>
            <Badge variant="secondary">{detail.articles.length}</Badge>
          </div>

          <ScrollArea
            style={{
              maxHeight: "calc(100vh - 400px)",
            }}
          >
            <div className="flex flex-col" style={{ gap: "var(--space-8)" }}>
              {detail.articles.map((article: RequestArticle, index: number) => {
                const isActive = index === selectedArticleIndex;
                return (
                  <button
                    key={article.articleCode}
                    type="button"
                    onClick={() => {
                      setSelectedArticleIndex(index);
                      setStoreSearch("");
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--space-8)",
                      padding: "var(--space-12)",
                      borderRadius: "var(--radius-8)",
                      border: isActive
                        ? "1px solid var(--primary-50)"
                        : "1px solid var(--grey-20)",
                      backgroundColor: isActive
                        ? "var(--primary-10)"
                        : "var(--surface-0)",
                      cursor: "pointer",
                      textAlign: "left",
                      width: "100%",
                    }}
                  >
                    <Badge
                      variant="outline"
                      style={{ alignSelf: "flex-start" }}
                    >
                      {article.subCategory}
                    </Badge>
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
                    <span
                      style={{
                        fontSize: "var(--font-size-xs)",
                        color: "var(--text-subdued-1)",
                      }}
                    >
                      Affected ({article.affectedStores}/{article.totalStores})
                    </span>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Right: Selection Overview */}
        <div
          style={{
            flex: 1,
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
            Selection Overview
          </span>

          {selectedArticle && (
            <>
              {/* Delist Reason */}
              <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
                <span
                  style={{
                    fontSize: "var(--font-size-xs)",
                    color: "var(--text-subdued-1)",
                  }}
                >
                  Delist Reason
                </span>
                <span
                  style={{
                    fontSize: "var(--font-size-s)",
                    color: "var(--text-default)",
                  }}
                >
                  {selectedArticle.reason ?? detail.reason}
                </span>
              </div>

              {/* Delist from count */}
              <span
                style={{
                  fontSize: "var(--font-size-s)",
                  color: "var(--text-default)",
                  fontWeight: "var(--font-weight-prominent)",
                }}
              >
                Delist from: {selectedArticle.stores.length} Stores
              </span>

              {/* Collapsible Selected Store Preview */}
              <Collapsible
                open={storePreviewOpen}
                onOpenChange={setStorePreviewOpen}
              >
                <CollapsibleTrigger asChild>
                  <button
                    type="button"
                    className="flex w-full items-center"
                    style={{
                      gap: "var(--space-8)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      color: "var(--text-default)",
                      fontSize: "var(--font-size-s)",
                      fontWeight: "var(--font-weight-prominent)",
                    }}
                  >
                    {storePreviewOpen ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                    Selected Store Preview
                  </button>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div
                    className="flex flex-col"
                    style={{
                      gap: "var(--space-8)",
                      marginTop: "var(--space-8)",
                    }}
                  >
                    {/* Store Search */}
                    <div className="relative" style={{ maxWidth: 280 }}>
                      <Search
                        size={16}
                        style={{
                          position: "absolute",
                          left: "var(--space-12)",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "var(--text-subdued-2)",
                          pointerEvents: "none",
                        }}
                      />
                      <Input
                        placeholder="Search stores..."
                        value={storeSearch}
                        onChange={(e) => setStoreSearch(e.target.value)}
                        style={{
                          paddingLeft: "var(--space-36)",
                          height: 36,
                        }}
                      />
                    </div>

                    {/* Store DataGrid */}
                    <DataGrid
                      className="rdg-inline"
                      columns={storeColumns}
                      rows={filteredStores}
                      rowKeyGetter={(row) => row.code}
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
