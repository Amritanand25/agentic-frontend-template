import { FolderOpen, Search, Upload, Plus, Inbox, CloudOff } from "lucide-react"
import { EmptyState } from "@repo/ui"

export default function EmptyStatePage() {
  const noop = () => {}

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-32)" }}>
      {/* Header */}
      <div>
        <h1
          style={{
            fontSize: "var(--font-size-2xl)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
          }}
        >
          Empty State
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-m)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-8)",
          }}
        >
          Placeholder components for empty or no-data states, available in single, triple,
          and text-only layout variants.
        </p>
      </div>

      {/* Single Variant — Default */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <h2
          style={{
            fontSize: "var(--font-size-xl)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-24)",
          }}
        >
          Single Variant — Default
        </h2>
        <div
          style={{
            border: "1px dashed var(--grey-40)",
            borderRadius: "var(--radius-12)",
          }}
        >
          <EmptyState
            title="No results found"
            description="We couldn't find any items matching your criteria. Try adjusting your filters or create a new item."
            primaryAction={{ label: "Create Item", onClick: noop, icon: <Plus size={16} /> }}
            secondaryAction={{ label: "Clear Filters", onClick: noop }}
          />
        </div>
      </div>

      {/* Single Variant — Location Icon */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <h2
          style={{
            fontSize: "var(--font-size-xl)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-24)",
          }}
        >
          Single Variant — Location Icon
        </h2>
        <div
          style={{
            border: "1px dashed var(--grey-40)",
            borderRadius: "var(--radius-12)",
          }}
        >
          <EmptyState
            icon="location"
            iconSize="lg"
            title="No locations saved"
            description="You haven't saved any locations yet. Add your first location to get started."
            primaryAction={{ label: "Add Location", onClick: noop }}
          />
        </div>
      </div>

      {/* Single Variant — Custom Icon, Vertical Actions */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <h2
          style={{
            fontSize: "var(--font-size-xl)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-24)",
          }}
        >
          Single Variant — Custom Icon, Vertical Actions
        </h2>
        <div
          style={{
            border: "1px dashed var(--grey-40)",
            borderRadius: "var(--radius-12)",
          }}
        >
          <EmptyState
            icon={<Inbox style={{ width: 64, height: 64 }} />}
            title="Your inbox is empty"
            description="All caught up! New messages will appear here when they arrive."
            primaryAction={{ label: "Compose Message", onClick: noop }}
            secondaryAction={{ label: "View Archive", onClick: noop }}
            actionsOrientation="vertical"
          />
        </div>
      </div>

      {/* Single Variant — No Icon */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <h2
          style={{
            fontSize: "var(--font-size-xl)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-24)",
          }}
        >
          Single Variant — Hidden Icon
        </h2>
        <div
          style={{
            border: "1px dashed var(--grey-40)",
            borderRadius: "var(--radius-12)",
          }}
        >
          <EmptyState
            hideIcon
            title="No data available"
            description="There is no data to display at this time. Please check back later."
          />
        </div>
      </div>

      {/* Triple Variant */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <h2
          style={{
            fontSize: "var(--font-size-xl)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-24)",
          }}
        >
          Triple Variant
        </h2>
        <EmptyState
          variant="triple"
          cards={[
            {
              title: "Upload Files",
              description: "Drag and drop files here, or click to browse your computer.",
              primaryAction: { label: "Browse Files", onClick: noop },
            },
            {
              title: "Connect Service",
              description: "Link an external service to automatically import your data.",
              primaryAction: { label: "Connect", onClick: noop },
              secondaryAction: { label: "Learn More", onClick: noop },
            },
            {
              title: "Use Template",
              description: "Start with a pre-built template and customize it to your needs.",
              primaryAction: { label: "View Templates", onClick: noop },
            },
          ]}
        />
      </div>

      {/* Text-Only Variant */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <h2
          style={{
            fontSize: "var(--font-size-xl)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-24)",
          }}
        >
          Text-Only Variant
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-16)" }}>
          <EmptyState
            variant="text-only"
            title="No search results"
            description="Try using different keywords or removing some filters."
            icon={<Search style={{ width: 24, height: 24 }} />}
            primaryAction={{ label: "Clear Search", onClick: noop }}
          />
          <EmptyState
            variant="text-only"
            title="No files in this folder"
            description="Upload or move files to this folder to see them here."
            icon={<FolderOpen style={{ width: 24, height: 24 }} />}
            primaryAction={{ label: "Upload", onClick: noop, icon: <Upload size={14} /> }}
          />
          <EmptyState
            variant="text-only"
            title="You're offline"
            description="Check your internet connection and try again."
            icon={<CloudOff style={{ width: 24, height: 24 }} />}
            hideIcon={false}
          />
        </div>
      </div>

      {/* Icon Sizes */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <h2
          style={{
            fontSize: "var(--font-size-xl)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-24)",
          }}
        >
          Icon Sizes
        </h2>
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: "var(--space-16)" }}
        >
          {(["sm", "md", "lg"] as const).map((size) => (
            <div
              key={size}
              style={{
                border: "1px dashed var(--grey-40)",
                borderRadius: "var(--radius-12)",
              }}
            >
              <EmptyState
                iconSize={size}
                title={`Icon Size: ${size}`}
                description={`${size === "sm" ? "48px" : size === "md" ? "64px" : "80px"} icon`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
