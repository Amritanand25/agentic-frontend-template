import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  DataGrid,
  TablePagination,
  Badge,
  Input,
  Tabs,
  TabsList,
  TabsTrigger,
  type Column,
} from "@repo/ui";
import { Search } from "lucide-react";
import { GranaryFilterBar } from "@/features/granary/components/global-filter-bar";
import { ExportButton } from "@/features/granary/components/export-button";
import { mockRequests } from "@/features/granary/mock-data/requests-mock";
import type { DelistRequest } from "@/features/granary/types";

type StatusTab = "all" | "Pending" | "Approved" | "Rejected";

function formatDateTime(iso: string): string {
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

const columns: Column<DelistRequest>[] = [
  { key: "requestId", name: "Request ID", width: 180 },
  {
    key: "requestTime",
    name: "Request Time",
    width: 140,
    renderCell: ({ row }) => <span>{formatDateTime(row.requestTime)}</span>,
  },
  { key: "requestedBy", name: "Requested By", width: 200 },
  {
    key: "requestType",
    name: "Request Type",
    width: 100,
    renderCell: ({ row }) => <Badge variant="outline">{row.requestType}</Badge>,
  },
  { key: "category", name: "Category", width: 160 },
  { key: "storeCount", name: "Store Count", width: 100 },
  { key: "productCount", name: "Product Count", width: 120 },
  { key: "reason", name: "Reason" },
];

export default function RequestsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<StatusTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredRows = useMemo(() => {
    let rows = mockRequests;

    // Filter by status tab
    if (activeTab !== "all") {
      rows = rows.filter((r) => r.status === activeTab);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.requestId.toLowerCase().includes(q) ||
          r.requestedBy.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.reason.toLowerCase().includes(q),
      );
    }

    return rows;
  }, [activeTab, searchQuery]);

  const totalRows = filteredRows.length;
  const paginatedRows = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredRows.slice(start, start + rowsPerPage);
  }, [filteredRows, page, rowsPerPage]);

  function handleRowClick(row: DelistRequest) {
    navigate(`/granary/assortment/requests/${row.requestId}`);
  }

  return (
    <div className="flex flex-col gap-[var(--space-8)]">
      <h1
        style={{
          margin: 0,
          fontSize: "var(--font-size-xl)",
          fontWeight: "var(--font-weight-heading)",
          color: "var(--text-default)",
        }}
      >
        Requests
      </h1>

      {/* Single surface container */}
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
        {/* Row 1: Tabs + Search + Export */}
        <div className="flex items-center justify-between">
          <Tabs
            value={activeTab}
            onValueChange={(v) => {
              setActiveTab(v as StatusTab);
              setPage(1);
            }}
          >
            <TabsList variant="subtab">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Pending">Pending</TabsTrigger>
              <TabsTrigger value="Approved">Approved</TabsTrigger>
              <TabsTrigger value="Rejected">Rejected</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center" style={{ gap: "var(--space-12)" }}>
            <div className="relative" style={{ width: 240 }}>
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
                placeholder="Search requests..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                style={{
                  paddingLeft: "var(--space-36)",
                  height: 36,
                }}
              />
            </div>
            <ExportButton />
          </div>
        </div>

        {/* Row 2: Filters */}
        <GranaryFilterBar
          visibleFilters={[
            "zone",
            "format",
            "state",
            "city",
            "store",
            "category",
          ]}
        />

        {/* Row 3: DataGrid */}
        <DataGrid
          className="rdg-inline"
          columns={columns}
          rows={paginatedRows}
          rowKeyGetter={(row) => row.requestId}
          onCellClick={({ row }) => handleRowClick(row)}
          style={{ cursor: "pointer" }}
        />

        {/* Row 4: Pagination */}
        <TablePagination
          totalRows={totalRows}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={(rpp) => {
            setRowsPerPage(rpp);
            setPage(1);
          }}
        />
      </div>
    </div>
  );
}
