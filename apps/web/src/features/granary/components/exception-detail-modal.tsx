import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Input,
  DataGrid,
  TablePagination,
} from "@repo/ui";
import type { Column } from "@repo/ui";
import { Search, Download } from "lucide-react";
import type { ExceptionAlert } from "../types";
import { mockNegativeInventoryProducts } from "../mock-data/home-mock";

interface NegativeInventoryRow {
  site: string;
  productCode: string;
  product: string;
  rateOfSale: number;
  daysOnHand: number;
  inventory: number;
}

const columns: Column<NegativeInventoryRow>[] = [
  { key: "site", name: "Site", width: 80 },
  { key: "productCode", name: "Product Code", width: 130 },
  { key: "product", name: "Product", minWidth: 200 },
  {
    key: "rateOfSale",
    name: "Rate of Sale",
    width: 120,
    renderCell: ({ row }) => <span>{row.rateOfSale.toFixed(1)}</span>,
  },
  { key: "daysOnHand", name: "Days on Hand", width: 120 },
  {
    key: "inventory",
    name: "Inventory",
    width: 100,
    renderCell: ({ row }) => (
      <span
        style={{
          color: row.inventory < 0 ? "var(--error-50)" : "var(--text-default)",
        }}
      >
        {row.inventory}
      </span>
    ),
  },
];

interface ExceptionDetailModalProps {
  alert: ExceptionAlert | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExceptionDetailModal({
  alert,
  open,
  onOpenChange,
}: ExceptionDetailModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  if (!alert) return null;

  const filteredRows = mockNegativeInventoryProducts.filter((row) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      row.site.toLowerCase().includes(query) ||
      row.productCode.toLowerCase().includes(query) ||
      row.product.toLowerCase().includes(query)
    );
  });

  const totalRows = filteredRows.length;
  const paginatedRows = filteredRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl"
        style={{ maxHeight: "85vh", display: "flex", flexDirection: "column" }}
      >
        <DialogHeader>
          <DialogTitle>Details for {alert.label}</DialogTitle>
          <DialogDescription>
            {alert.siteSkuCount.toLocaleString()} Site-SKU combinations
          </DialogDescription>
        </DialogHeader>

        <div
          className="flex items-center"
          style={{ gap: "var(--space-8)", paddingBottom: "var(--space-8)" }}
        >
          <div className="relative flex-1">
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
              placeholder="Search by site, product code, or product..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              style={{ paddingLeft: "var(--space-40)" }}
            />
          </div>
        </div>

        <div className="flex-1" style={{ minHeight: 0 }}>
          <DataGrid
            className="rdg-inline"
            columns={columns}
            rows={paginatedRows}
          />
        </div>

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

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button variant="outline">
            <Download size={16} style={{ marginRight: "var(--space-4)" }} />
            Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
