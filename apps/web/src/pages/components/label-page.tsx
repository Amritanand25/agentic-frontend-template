import { InputLabel, Input } from "@repo/ui"
export default function LabelPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1
          style={{
            fontSize: "var(--font-size-heading)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
          }}
        >
          Label
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-m)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-8)",
          }}
        >
          Accessible label component with required indicator and helper tooltip.
        </p>
      </div>

      {/* Default Label */}
      <div
        style={{
          border: "1px solid var(--grey-40)",
          borderRadius: "var(--radius-12)",
          padding: "var(--space-24)",
        }}
      >
        <h2
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-prominent)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Default
        </h2>
        <div style={{ maxWidth: 400, display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <InputLabel>Email address</InputLabel>
          <Input type="email" placeholder="email@example.com" />
        </div>
      </div>

      {/* Required Label */}
      <div
        style={{
          border: "1px solid var(--grey-40)",
          borderRadius: "var(--radius-12)",
          padding: "var(--space-24)",
        }}
      >
        <h2
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-prominent)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Required
        </h2>
        <div style={{ maxWidth: 400, display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <InputLabel required>Full name</InputLabel>
          <Input placeholder="John Doe" />
        </div>
      </div>

      {/* With Helper Tooltip */}
      <div
        style={{
          border: "1px solid var(--grey-40)",
          borderRadius: "var(--radius-12)",
          padding: "var(--space-24)",
        }}
      >
        <h2
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-prominent)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          With Helper Tooltip
        </h2>
        <div style={{ maxWidth: 400, display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <InputLabel helperText="We'll never share your email with anyone else.">
            Email
          </InputLabel>
          <Input type="email" placeholder="email@example.com" />
        </div>
      </div>

      {/* Required + Helper */}
      <div
        style={{
          border: "1px solid var(--grey-40)",
          borderRadius: "var(--radius-12)",
          padding: "var(--space-24)",
        }}
      >
        <h2
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-prominent)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Required + Helper
        </h2>
        <div style={{ maxWidth: 400, display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <InputLabel required helperText="Must be at least 8 characters with one uppercase letter and one number.">
            Password
          </InputLabel>
          <Input type="password" placeholder="Enter password" />
        </div>
      </div>

      {/* Disabled */}
      <div
        style={{
          border: "1px solid var(--grey-40)",
          borderRadius: "var(--radius-12)",
          padding: "var(--space-24)",
        }}
      >
        <h2
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-prominent)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Disabled
        </h2>
        <div style={{ maxWidth: 400, display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <InputLabel disabled required helperText="This field is not editable.">
            Organization
          </InputLabel>
          <Input disabled placeholder="Acme Inc." value="Acme Inc." />
        </div>
      </div>

      {/* Multiple Labels Together */}
      <div
        style={{
          border: "1px solid var(--grey-40)",
          borderRadius: "var(--radius-12)",
          padding: "var(--space-24)",
        }}
      >
        <h2
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-prominent)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Form Example
        </h2>
        <div style={{ maxWidth: 400, display: "flex", flexDirection: "column", gap: "var(--space-16)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <InputLabel required>First name</InputLabel>
            <Input placeholder="John" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <InputLabel required>Last name</InputLabel>
            <Input placeholder="Doe" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <InputLabel required helperText="We use this for account recovery.">
              Email
            </InputLabel>
            <Input type="email" placeholder="john@example.com" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <InputLabel helperText="Optional. Used for shipping updates.">
              Phone number
            </InputLabel>
            <Input type="tel" placeholder="+1 (555) 000-0000" />
          </div>
        </div>
      </div>
    </div>
  )
}
