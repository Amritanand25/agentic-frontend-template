import { Spinner } from "@repo/ui"
export default function SpinnerPage() {
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
          Spinner
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-m)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-8)",
          }}
        >
          An animated loading spinner with configurable size, color, and optional label.
        </p>
      </div>

      {/* All Sizes */}
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
          Sizes
        </h2>
        <div
          className="flex flex-wrap items-end"
          style={{ gap: "var(--space-32)" }}
        >
          {(["xs", "s", "m", "l", "xl"] as const).map((size) => (
            <div key={size} className="text-center">
              <Spinner size={size} />
              <p
                style={{
                  fontSize: "var(--font-size-s)",
                  color: "var(--text-subdued-2)",
                  marginTop: "var(--space-8)",
                }}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* With Labels */}
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
          With Labels
        </h2>
        <div
          className="flex flex-wrap items-start"
          style={{ gap: "var(--space-32)" }}
        >
          <Spinner size="m" label="Loading..." />
          <Spinner size="l" label="Please wait" />
          <Spinner size="s" label="Saving" />
        </div>
      </div>

      {/* Label Positions */}
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
          Label Positions
        </h2>
        <div
          className="flex flex-wrap items-center"
          style={{ gap: "var(--space-48)" }}
        >
          {(["top", "bottom", "left", "right"] as const).map((position) => (
            <div key={position} className="text-center">
              <Spinner size="l" label={`Label ${position}`} labelPosition={position} />
              <p
                style={{
                  fontSize: "var(--font-size-s)",
                  color: "var(--text-subdued-2)",
                  marginTop: "var(--space-12)",
                }}
              >
                {position}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Colors */}
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
          Custom Colors
        </h2>
        <div
          className="flex flex-wrap items-center"
          style={{ gap: "var(--space-32)" }}
        >
          <div className="text-center">
            <Spinner size="l" color="var(--success-50)" label="Success" />
            <p
              style={{
                fontSize: "var(--font-size-s)",
                color: "var(--text-subdued-2)",
                marginTop: "var(--space-8)",
              }}
            >
              Success
            </p>
          </div>
          <div className="text-center">
            <Spinner size="l" color="var(--error-50)" label="Error" />
            <p
              style={{
                fontSize: "var(--font-size-s)",
                color: "var(--text-subdued-2)",
                marginTop: "var(--space-8)",
              }}
            >
              Error
            </p>
          </div>
          <div className="text-center">
            <Spinner size="l" color="var(--warning-50)" label="Warning" />
            <p
              style={{
                
                fontSize: "var(--font-size-s)",
                color: "var(--text-subdued-2)",
                marginTop: "var(--space-8)",
              }}
            >
              Warning
            </p>
          </div>
          <div className="text-center">
            <Spinner
              size="l"
              color="var(--secondary-50)"
              background="var(--secondary-20)"
              label="Secondary"
            />
            <p
              style={{
                fontSize: "var(--font-size-s)",
                color: "var(--text-subdued-2)",
                marginTop: "var(--space-8)",
              }}
            >
              Secondary
            </p>
          </div>
        </div>
      </div>

      {/* On Dark Background */}
      <div
        style={{
          backgroundColor: "var(--primary-60)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",

        }}
      >
        <h2
          style={{
            fontSize: "var(--font-size-xl)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--primary-inverse)",
            marginBottom: "var(--space-24)",
          }}
        >
          On Dark Background
        </h2>
        <div
          className="flex flex-wrap items-center"
          style={{ gap: "var(--space-32)" }}
        >
          <Spinner
            size="l"
            color="var(--primary-inverse)"
            background="var(--primary-40)"
          />
          <Spinner
            size="m"
            color="var(--primary-inverse)"
            background="var(--primary-40)"
            label="Loading..."
            style={{ color: "var(--primary-inverse)" }}
          />
        </div>
      </div>
    </div>
  )
}
