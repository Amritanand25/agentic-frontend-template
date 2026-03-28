import { useState } from "react"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, TablePagination } from "@repo/ui"
function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-16)" }}>
      <div>
        <h2 style={{ fontSize: "var(--font-size-xl)", fontWeight: "var(--font-weight-heading)", color: "var(--text-default)" }}>
          {title}
        </h2>
        {description && (
          <p style={{ color: "var(--text-subdued-1)", marginTop: "var(--space-4)", fontSize: "var(--font-size-m)" }}>
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  )
}

function BottomMultiPage() {
  const [page, setPage] = useState(1)
  const [rpp, setRpp] = useState(10)
  return (
    <TablePagination
      totalRows={250}
      page={page}
      rowsPerPage={rpp}
      onPageChange={setPage}
      onRowsPerPageChange={setRpp}
    />
  )
}

function BottomSinglePage() {
  const [page, setPage] = useState(1)
  const [rpp, setRpp] = useState(10)
  return (
    <TablePagination
      totalRows={8}
      page={page}
      rowsPerPage={rpp}
      onPageChange={setPage}
      onRowsPerPageChange={setRpp}
    />
  )
}

export default function PaginationPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-48)" }}>
      <div>
        <h1 style={{ fontSize: "var(--font-size-2xl)", fontWeight: "var(--font-weight-heading)", color: "var(--text-default)" }}>
          Pagination
        </h1>
        <p style={{ color: "var(--text-subdued-1)", marginTop: "var(--space-8)" }}>
          Table pagination with rows-per-page selector, range display, editable page input, and prev/next navigation.
        </p>
      </div>

      {/* Bottom Multi Page */}
      <Section
        title="Bottom Multi Page"
        description="Bottom pagination (default) showing multiple pages. Displays rows per page selector and editable page input."
      >
        <BottomMultiPage />
      </Section>

      {/* Bottom Single Page */}
      <Section
        title="Bottom Single Page"
        description="Bottom pagination showing a single page (pagination controls are disabled)."
      >
        <BottomSinglePage />
      </Section>

      {/* Top Multi Page */}
      <Section
        title="Top Multi Page"
        description="Top pagination showing multiple pages. Same component, positioned above the table."
      >
        <BottomMultiPage />
      </Section>

      {/* Top Single Page */}
      <Section
        title="Top Single Page"
        description="Top pagination showing a single page (pagination controls are disabled)."
      >
        <BottomSinglePage />
      </Section>

      {/* Classic Pagination */}
      <Section
        title="Classic Pagination"
        description="Page number navigation with previous/next links and ellipsis."
      >
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Section>
    </div>
  )
}
