import { useState, useMemo } from "react"
import { DataGrid, type Column } from "react-data-grid"
import { ChevronRight } from "lucide-react"
import "react-data-grid/lib/styles.css"
import "./data-grid-theme.css"

interface Department {
  id: number
  name: string
  type: "parent"
}

interface DetailRow {
  id: string
  parentId: number
  type: "detail"
}

type Row = Department | DetailRow

interface Product {
  id: number
  product: string
  description: string
  price: number
}

const departments: Department[] = [
  { id: 1, name: "Computers", type: "parent" },
  { id: 2, name: "Shoes", type: "parent" },
  { id: 3, name: "Industrial", type: "parent" },
  { id: 4, name: "Beauty", type: "parent" },
  { id: 5, name: "Beauty", type: "parent" },
  { id: 6, name: "Shoes", type: "parent" },
  { id: 7, name: "Games", type: "parent" },
  { id: 8, name: "Movies", type: "parent" },
  { id: 9, name: "Industrial", type: "parent" },
  { id: 10, name: "Tools", type: "parent" },
]

const productNames = [
  "Elegant Cotton Car", "Incredible Silk Soap", "Tasty Cotton Salad",
  "Unbranded Silk Sausages", "Ergonomic Wooden Cheese", "Luxurious Silk Keyboard",
  "Practical Bronze Shirt", "Generic Metal Table", "Handmade Rubber Pants",
]

const descriptions = [
  "Introducing the Palestine-inspired Chair, blending rare style with local craftsmanship",
  "Savor the savory essence in our Cheese, designed for pertinent culinary adventures",
  "Our peacock-friendly Shirt ensures unripe comfort for your pets",
  "The Phased full-range structure Towels offers reliable performance and diligent design",
  "New Pizza model with 70 GB RAM, 902 GB storage, and sparse features",
  "Discover the impassioned new Soap with an exciting mix of Wooden ingredients",
  "Experience the reimagined Computer with enhanced portability and sleek design",
  "A classic Table with modern materials, built to last through any challenge",
  "Innovative Pants designed for maximum flexibility and day-long comfort",
]

const DETAIL_GRID_MAX_HEIGHT = 220

function generateProducts(departmentId: number): Product[] {
  const count = 6 + (departmentId % 4) * 3
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    product: productNames[(departmentId + i) % productNames.length],
    description: descriptions[(departmentId + i) % descriptions.length],
    price: Math.round((50 + Math.random() * 800) * 100) / 100,
  }))
}

const detailColumns: Column<Product>[] = [
  { key: "id", name: "ID", width: 60 },
  { key: "product", name: "Product", width: 200 },
  { key: "description", name: "Description" },
  {
    key: "price",
    name: "Price",
    width: 100,
    renderCell: ({ row }) => `$${row.price.toFixed(2)}`,
  },
]

function DetailPanel({ parentId }: { parentId: number }) {
  const products = useMemo(() => generateProducts(parentId), [parentId])

  return (
    <div style={{ padding: "var(--space-12) var(--space-16)", width: "100%", height: "100%", boxSizing: "border-box" }}>
      <DataGrid
        columns={detailColumns}
        rows={products}
        rowKeyGetter={(row) => row.id}
        rowHeight={40}
        headerRowHeight={36}
        className="rdg-theme rdg-detail-grid"
        style={{ blockSize: "100%" }}
      />
    </div>
  )
}

export default function MasterDetailPage() {
  const [expandedIds, setExpandedIds] = useState<Set<number>>(() => new Set())

  function toggleExpand(id: number) {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const rows = useMemo<Row[]>(() => {
    const result: Row[] = []
    for (const dept of departments) {
      result.push(dept)
      if (expandedIds.has(dept.id)) {
        result.push({ id: `detail-${dept.id}`, parentId: dept.id, type: "detail" })
      }
    }
    return result
  }, [expandedIds])

  const columns: Column<Row>[] = useMemo(
    () => [
      {
        key: "expand",
        name: "",
        width: 50,
        minWidth: 50,
        maxWidth: 50,
        renderCell: ({ row }) => {
          if (row.type === "detail") return <DetailPanel parentId={row.parentId} />
          const isExpanded = expandedIds.has(row.id)
          return (
            <div
              style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", width: "100%" }}
              onClick={() => toggleExpand(row.id)}
            >
              <ChevronRight
                size={16}
                style={{
                  transition: "transform 150ms ease",
                  transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                  color: "var(--text-subdued-1)",
                }}
              />
            </div>
          )
        },
        colSpan: (args) => {
          if (args.type === "ROW" && args.row.type === "detail") return 3
          return undefined
        },
      },
      {
        key: "id",
        name: "ID",
        width: 80,
        renderCell: ({ row }) => (row.type === "parent" ? row.id : null),
      },
      {
        key: "name",
        name: "Department",
        renderCell: ({ row }) => {
          if (row.type === "detail") return null
          return <span style={{ fontWeight: "var(--font-weight-prominent)" }}>{row.name}</span>
        },
      },
    ],
    [expandedIds]
  )

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-32)" }}>
      <div>
        <h1 style={{ fontSize: "var(--font-size-2xl)", fontWeight: "var(--font-weight-heading)", color: "var(--text-default)" }}>
          Master-Detail Grid
        </h1>
        <p style={{ color: "var(--text-subdued-1)", marginTop: "var(--space-8)" }}>
          Click the chevron to expand a row and reveal a nested detail table. Detail data can come from APIs.
        </p>
      </div>

      <DataGrid
        columns={columns}
        rows={rows}
        rowKeyGetter={(row) => (row.type === "parent" ? row.id : row.id)}
        rowHeight={(row) => (row.type === "detail" ? getDetailHeight(row.parentId) : 48)}
        headerRowHeight={40}
        className="rdg-theme"
        style={{ blockSize: 600 }}
      />

      <p style={{ fontSize: "var(--font-size-s)", color: "var(--text-subdued-2)" }}>
        {expandedIds.size} row{expandedIds.size !== 1 ? "s" : ""} expanded
      </p>
    </div>
  )
}

function getDetailHeight(_parentId: number): number {
  return DETAIL_GRID_MAX_HEIGHT + 24 // grid max height + padding top (12) + bottom (12)
}
