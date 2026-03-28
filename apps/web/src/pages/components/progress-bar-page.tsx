import { useState } from "react"
import { ProgressBar } from "@repo/ui"
const sizes = ["xs", "sm", "md", "lg"] as const
const colors = ["default", "success", "error", "warning"] as const

export default function ProgressBarPage() {
  const [animatedValue, setAnimatedValue] = useState(65)

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
          Progress Bar
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-m)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-8)",
          }}
        >
          A progress indicator supporting line (horizontal bar) and circle (SVG ring) variants,
          with multiple sizes and color options.
        </p>
      </div>

      {/* Line Variant — All Sizes */}
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
          Line Variant — Sizes
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-24)", maxWidth: 480 }}>
          {sizes.map((size) => (
            <div key={size}>
              <p
                style={{
                  fontSize: "var(--font-size-s)",
                  color: "var(--text-subdued-2)",
                  marginBottom: "var(--space-8)",
                  textTransform: "uppercase",
                  fontWeight: "var(--font-weight-prominent)",
                  letterSpacing: "0.5px",
                }}
              >
                {size}
              </p>
              <ProgressBar
                value={65}
                size={size}
                label={`Size ${size}`}
                style={{ width: "100%" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Line Variant — All Colors */}
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
          Line Variant — Colors
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-20)", maxWidth: 480 }}>
          {colors.map((color) => (
            <ProgressBar
              key={color}
              value={72}
              color={color}
              label={color.charAt(0).toUpperCase() + color.slice(1)}
              style={{ width: "100%" }}
            />
          ))}
        </div>
      </div>

      {/* Line Variant — Without Labels */}
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
          Line Variant — Without Labels / Values
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-16)", maxWidth: 480 }}>
          <div>
            <p
              style={{
                fontSize: "var(--font-size-s)",
                color: "var(--text-subdued-2)",
                marginBottom: "var(--space-8)",
              }}
            >
              No label, no value
            </p>
            <ProgressBar value={50} showLabel={false} showValue={false} style={{ width: "100%" }} />
          </div>
          <div>
            <p
              style={{
                fontSize: "var(--font-size-s)",
                color: "var(--text-subdued-2)",
                marginBottom: "var(--space-8)",
              }}
            >
              Value only (no label)
            </p>
            <ProgressBar value={75} showLabel={false} showValue={true} style={{ width: "100%" }} />
          </div>
          <div>
            <p
              style={{
                fontSize: "var(--font-size-s)",
                color: "var(--text-subdued-2)",
                marginBottom: "var(--space-8)",
              }}
            >
              Label only (no value)
            </p>
            <ProgressBar value={40} label="Uploading..." showValue={false} style={{ width: "100%" }} />
          </div>
        </div>
      </div>

      {/* Circle Variant — All Sizes */}
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
          Circle Variant — Sizes
        </h2>
        <div className="flex flex-wrap items-end" style={{ gap: "var(--space-32)" }}>
          {sizes.map((size) => (
            <div key={size} className="text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-8)" }}>
              <ProgressBar value={72} variant="circle" size={size} />
              <p
                style={{
                  fontSize: "var(--font-size-s)",
                  color: "var(--text-subdued-2)",
                  textTransform: "uppercase",
                  fontWeight: "var(--font-weight-prominent)",
                  letterSpacing: "0.5px",
                }}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Circle Variant — All Colors */}
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
          Circle Variant — Colors
        </h2>
        <div className="flex flex-wrap items-center" style={{ gap: "var(--space-32)" }}>
          {colors.map((color) => (
            <div key={color} className="text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-8)" }}>
              <ProgressBar value={65} variant="circle" size="lg" color={color} />
              <p
                style={{
                  fontSize: "var(--font-size-s)",
                  color: "var(--text-subdued-2)",
                  fontWeight: "var(--font-weight-prominent)",
                }}
              >
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Demo */}
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
          Interactive
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-16)", maxWidth: 480 }}>
          <input
            type="range"
            min={0}
            max={100}
            value={animatedValue}
            onChange={(e) => setAnimatedValue(Number(e.target.value))}
            style={{ width: "100%", accentColor: "var(--primary-50)" }}
          />
          <ProgressBar value={animatedValue} label="Upload Progress" style={{ width: "100%" }} />
          <div className="flex items-center" style={{ gap: "var(--space-24)" }}>
            <ProgressBar value={animatedValue} variant="circle" size="lg" color="success" />
            <ProgressBar value={animatedValue} variant="circle" size="md" color="warning" />
            <ProgressBar value={animatedValue} variant="circle" size="sm" color="error" />
          </div>
        </div>
      </div>
    </div>
  )
}
