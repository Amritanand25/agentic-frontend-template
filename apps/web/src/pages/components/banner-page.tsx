import { useState } from "react"
import { CheckCircle, Info, ShieldAlert } from "lucide-react"
import { Banner } from "@repo/ui"

export default function BannerPage() {
  const [controlledVisible, setControlledVisible] = useState(true)

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
          Banner
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-m)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-8)",
          }}
        >
          A notification banner for displaying important messages with optional actions and dismiss functionality.
        </p>
      </div>

      {/* All Variants */}
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
          Variants
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-16)",
          }}
        >
          <Banner
            variant="primary"
            title="Information"
            description="This is a primary banner used for general information and updates."
          />
          <Banner
            variant="success"
            title="Success"
            description="Your changes have been saved successfully."
            icon={<CheckCircle style={{ width: 20, height: 20, color: "var(--success-50)", flexShrink: 0 }} />}
          />
          <Banner
            variant="error"
            title="Error"
            description="Something went wrong. Please try again later."
          />
          <Banner
            variant="warning"
            title="Warning"
            description="Your session will expire in 5 minutes. Please save your work."
          />
          <Banner
            variant="neutral"
            title="Neutral"
            description="This is a neutral banner for general notices."
            icon={<Info style={{ width: 20, height: 20, color: "var(--primary-50)", flexShrink: 0 }} />}
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
          <Banner
            variant="primary"
            title="New version available"
            description="A new version of the application is available. Update now to get the latest features."
            actions={[
              { label: "Update now", onClick: () => {}, variant: "default" },
              { label: "Later", onClick: () => {} },
            ]}
          />
          <Banner
            variant="error"
            title="Payment failed"
            description="We couldn't process your payment. Please update your payment method."
            actions={[
              { label: "Update payment", onClick: () => {}, variant: "default" },
              { label: "Contact support", onClick: () => {} },
            ]}
            onClose={() => {}}
          />
        </div>
      </div>

      {/* Dismissible */}
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
          Dismissible (Uncontrolled)
        </h2>
        <p
          style={{
            fontSize: "var(--font-size-m)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
          }}
        >
          Click the close button to dismiss. Refresh the page to see them again.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-16)",
          }}
        >
          <Banner
            variant="warning"
            title="Cookie notice"
            description="This site uses cookies for analytics. Dismiss to accept."
            onClose={() => {}}
          />
          <Banner
            variant="success"
            title="Welcome back!"
            description="You have 3 unread notifications."
            icon={<CheckCircle style={{ width: 20, height: 20, color: "var(--success-50)", flexShrink: 0 }} />}
            onClose={() => {}}
          />
        </div>
      </div>

      {/* Controlled Visibility */}
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
          Controlled Visibility
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-16)",
          }}
        >
          <Banner
            variant="primary"
            title="Controlled banner"
            description="This banner's visibility is controlled externally. Use the button below to toggle it."
            showBanner={controlledVisible}
            onClose={() => setControlledVisible(false)}
          />
          {!controlledVisible && (
            <button
              type="button"
              onClick={() => setControlledVisible(true)}
              style={{
                fontSize: "var(--font-size-m)",
                fontWeight: "var(--font-weight-prominent)",
                color: "var(--primary-50)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                fontFamily: "var(--font-sans)",
                textDecoration: "underline",
                textUnderlineOffset: 4,
              }}
            >
              Show banner again
            </button>
          )}
        </div>
      </div>

      {/* Single-Line Layout */}
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
          Single-Line Layout
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-16)",
          }}
        >
          <Banner
            variant="primary"
            isSingleLine
            description="A concise single-line information message."
            onClose={() => {}}
          />
          <Banner
            variant="success"
            isSingleLine
            description="File uploaded successfully."
            icon={<CheckCircle style={{ width: 20, height: 20, color: "var(--success-50)", flexShrink: 0 }} />}
          />
          <Banner
            variant="error"
            isSingleLine
            description="Failed to save changes."
            actions={[{ label: "Retry", onClick: () => {}, variant: "outline" }]}
            onClose={() => {}}
          />
          <Banner
            variant="warning"
            isSingleLine
            description="Your storage is almost full."
            icon={<ShieldAlert style={{ width: 20, height: 20, color: "var(--warning-50)", flexShrink: 0 }} />}
            actions={[{ label: "Upgrade", onClick: () => {}, variant: "default" }]}
          />
          <Banner
            variant="neutral"
            isSingleLine
            description="Maintenance scheduled for tonight at 10 PM."
          />
        </div>
      </div>

      {/* Full-Width Layout */}
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
          Full-Width Layout
        </h2>
        <p
          style={{
            fontSize: "var(--font-size-m)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
          }}
        >
          Full-width banners span the entire container width with no border-radius.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-16)",
            marginLeft: "calc(-1 * var(--space-24))",
            marginRight: "calc(-1 * var(--space-24))",
          }}
        >
          <Banner
            variant="primary"
            isFullWidth
            description="This is a full-width primary banner."
            onClose={() => {}}
          />
          <Banner
            variant="error"
            isFullWidth
            description="Critical system error detected."
            actions={[{ label: "View details", onClick: () => {} }]}
            onClose={() => {}}
          />
          <Banner
            variant="warning"
            isFullWidth
            description="API rate limit approaching. Consider upgrading your plan."
            actions={[
              { label: "Upgrade", onClick: () => {}, variant: "default" },
              { label: "Dismiss", onClick: () => {} },
            ]}
          />
        </div>
      </div>

      {/* Loading State */}
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
          Loading State
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-16)",
          }}
        >
          <Banner
            variant="primary"
            isLoading
            title="Processing"
            description="Your request is being processed. This may take a moment."
          />
          <Banner
            variant="success"
            isLoading
            isSingleLine
            description="Uploading files..."
          />
          <Banner
            variant="neutral"
            isLoading
            title="Syncing data"
            description="Please wait while we synchronize your data across all devices."
            onClose={() => {}}
          />
        </div>
      </div>

      {/* Custom Icon */}
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
          Custom Icons
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-16)",
          }}
        >
          <Banner
            variant="primary"
            title="Tip of the day"
            description="Use keyboard shortcuts to navigate faster. Press ? to see all shortcuts."
            icon={<Info style={{ width: 20, height: 20, color: "var(--primary-50)", flexShrink: 0 }} />}
          />
          <Banner
            variant="warning"
            title="Security alert"
            description="We detected a login from a new device. Was this you?"
            icon={<ShieldAlert style={{ width: 20, height: 20, color: "var(--warning-50)", flexShrink: 0 }} />}
            actions={[
              { label: "Yes, it was me", onClick: () => {}, variant: "default" },
              { label: "Secure account", onClick: () => {}, variant: "outline" },
            ]}
          />
        </div>
      </div>
    </div>
  )
}
