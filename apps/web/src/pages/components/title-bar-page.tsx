import { useNavigate } from "react-router-dom"
import { Ellipsis, Download, Plus, Settings, Share2 } from "lucide-react"
import { TitleBar, Button } from "@repo/ui"

export default function TitleBarPage() {
  const navigate = useNavigate()

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
          Title Bar
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-m)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-8)",
          }}
        >
          A reusable page header with optional back navigation, title, subtitle, and action buttons.
        </p>
      </div>

      {/* Default — title only */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
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
          Title Only
        </h2>
        <div
          style={{
            border: "1px solid var(--grey-40)",
            borderRadius: "var(--radius-12)",
            overflow: "hidden",
          }}
        >
          <TitleBar title="Page Title" />
        </div>
      </div>

      {/* With Back Button */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
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
          With Back Button
        </h2>
        <div
          style={{
            border: "1px solid var(--grey-40)",
            borderRadius: "var(--radius-12)",
            overflow: "hidden",
          }}
        >
          <TitleBar
            title="Page Title"
            onBack={() => navigate(-1)}
          />
        </div>
      </div>

      {/* With Actions */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
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
          With Actions
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-16)",
          }}
        >
          <div
            style={{
              border: "1px solid var(--grey-40)",
              borderRadius: "var(--radius-12)",
              overflow: "hidden",
            }}
          >
            <TitleBar
              title="Page Title"
              onBack={() => navigate(-1)}
              actions={
                <>
                  <Button variant="ghost" size="sm">
                    <Ellipsis />
                  </Button>
                  <Button variant="outline" size="sm">Button</Button>
                  <Button size="sm">Button</Button>
                </>
              }
            />
          </div>
        </div>
      </div>

      {/* With Subtitle */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
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
          With Subtitle
        </h2>
        <div
          style={{
            border: "1px solid var(--grey-40)",
            borderRadius: "var(--radius-12)",
            overflow: "hidden",
          }}
        >
          <TitleBar
            title="User Management"
            subtitle="Manage team members and their permissions"
            onBack={() => navigate(-1)}
            actions={
              <>
                <Button variant="outline" size="sm">
                  <Settings size={14} />
                  Settings
                </Button>
                <Button size="sm">
                  <Plus size={14} />
                  Add User
                </Button>
              </>
            }
          />
        </div>
      </div>

      {/* Real-world Examples */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
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
          Real-world Examples
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-16)",
          }}
        >
          {/* Report page */}
          <div
            style={{
              border: "1px solid var(--grey-40)",
              borderRadius: "var(--radius-12)",
              overflow: "hidden",
            }}
          >
            <TitleBar
              title="Monthly Sales Report"
              subtitle="March 2026"
              onBack={() => navigate(-1)}
              actions={
                <>
                  <Button variant="ghost" size="sm">
                    <Share2 />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download size={14} />
                    Export
                  </Button>
                </>
              }
            />
          </div>

          {/* Dashboard — no back button */}
          <div
            style={{
              border: "1px solid var(--grey-40)",
              borderRadius: "var(--radius-12)",
              overflow: "hidden",
            }}
          >
            <TitleBar
              title="Dashboard"
              actions={
                <>
                  <Button variant="ghost" size="sm">
                    <Ellipsis />
                  </Button>
                  <Button size="sm">
                    <Plus size={14} />
                    New Widget
                  </Button>
                </>
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}
