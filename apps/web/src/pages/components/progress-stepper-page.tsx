import { useState } from "react"
import { ProgressStepper } from "@repo/ui"
import type { ProgressStepConfig } from "@repo/ui"
const mixedSteps: ProgressStepConfig[] = [
  { step: 1, title: "Data Import", description: "Import complete", status: "success" },
  { step: 2, title: "Validation", description: "3 warnings found", status: "warning" },
  { step: 3, title: "Processing", description: "72% complete", status: "default", progress: { percentage: 72 } },
  { step: 4, title: "Export", description: "Not started", status: "default", progress: { percentage: 0 } },
]

const allSuccessSteps: ProgressStepConfig[] = [
  { step: 1, title: "Upload", status: "success" },
  { step: 2, title: "Scan", status: "success" },
  { step: 3, title: "Verify", status: "success" },
  { step: 4, title: "Deploy", status: "success" },
]

const errorFlowSteps: ProgressStepConfig[] = [
  { step: 1, title: "Build", description: "Passed", status: "success" },
  { step: 2, title: "Test", description: "12 tests failed", status: "error" },
  { step: 3, title: "Staging", description: "Blocked", status: "default", progress: { percentage: 0 }, disabled: true },
  { step: 4, title: "Production", description: "Blocked", status: "default", progress: { percentage: 0 }, disabled: true },
]

const verticalProgressSteps: ProgressStepConfig[] = [
  { step: 1, title: "Requirements", description: "All requirements gathered", status: "success" },
  { step: 2, title: "Design", description: "Design review in progress", status: "warning" },
  { step: 3, title: "Development", description: "65% complete", status: "default", progress: { percentage: 65, type: "success" } },
  { step: 4, title: "Testing", description: "Pending development", status: "default", progress: { percentage: 10 } },
  { step: 5, title: "Deployment", description: "Not started", status: "default", progress: { percentage: 0 } },
]

const coloredProgressSteps: ProgressStepConfig[] = [
  { step: 1, title: "Phase 1", status: "default", progress: { percentage: 100, type: "success" } },
  { step: 2, title: "Phase 2", status: "default", progress: { percentage: 75, type: "warning" } },
  { step: 3, title: "Phase 3", status: "default", progress: { percentage: 30, type: "error" } },
  { step: 4, title: "Phase 4", status: "default", progress: { percentage: 0 } },
]

export default function ProgressStepperPage() {
  const [activeStep, setActiveStep] = useState(1)

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
          Progress Stepper
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-m)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-8)",
          }}
        >
          A multi-step workflow indicator with per-step progress circles and status icons
          for success, warning, and error states.
        </p>
      </div>

      {/* Mixed Statuses - Horizontal */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Mixed Statuses
        </p>
        <ProgressStepper
          steps={mixedSteps}
          value={activeStep}
          onValueChange={setActiveStep}
        />
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-16)",
          }}
        >
          Combines status icons (success, warning) with circular progress indicators.
        </p>
      </div>

      {/* All Success */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          All Steps Complete
        </p>
        <ProgressStepper steps={allSuccessSteps} />
      </div>

      {/* Error Flow */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Error with Disabled Steps
        </p>
        <ProgressStepper steps={errorFlowSteps} />
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-16)",
          }}
        >
          When a step fails, subsequent steps are disabled and blocked.
        </p>
      </div>

      {/* Vertical */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Vertical Layout
        </p>
        <div style={{ maxWidth: 400 }}>
          <ProgressStepper steps={verticalProgressSteps} orientation="vertical" />
        </div>
      </div>

      {/* Size Comparison */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Size Comparison
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-24)" }}>
          <div>
            <p
              style={{
                fontSize: "var(--font-size-s)",
                fontWeight: "var(--font-weight-prominent)",
                color: "var(--text-subdued-1)",
                marginBottom: "var(--space-12)",
              }}
            >
              Small (20px indicator)
            </p>
            <ProgressStepper steps={mixedSteps} size="sm" />
          </div>
          <div>
            <p
              style={{
                fontSize: "var(--font-size-s)",
                fontWeight: "var(--font-weight-prominent)",
                color: "var(--text-subdued-1)",
                marginBottom: "var(--space-12)",
              }}
            >
              Medium (24px indicator)
            </p>
            <ProgressStepper steps={mixedSteps} size="md" />
          </div>
        </div>
      </div>

      {/* Colored Progress Types */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Progress Color Types
        </p>
        <ProgressStepper steps={coloredProgressSteps} />
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-16)",
          }}
        >
          Circular progress bars can use success (green), warning (orange), error (red), or default (primary) colors.
        </p>
      </div>

      {/* Custom Stroke Width */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Custom Stroke Width
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-24)" }}>
          <div>
            <p
              style={{
                fontSize: "var(--font-size-s)",
                fontWeight: "var(--font-weight-prominent)",
                color: "var(--text-subdued-1)",
                marginBottom: "var(--space-12)",
              }}
            >
              Stroke width: 2 (default)
            </p>
            <ProgressStepper
              steps={[
                { step: 1, title: "A", status: "default", progress: { percentage: 80 } },
                { step: 2, title: "B", status: "default", progress: { percentage: 50 } },
                { step: 3, title: "C", status: "default", progress: { percentage: 20 } },
              ]}
              circleStrokeWidth={2}
            />
          </div>
          <div>
            <p
              style={{
                fontSize: "var(--font-size-s)",
                fontWeight: "var(--font-weight-prominent)",
                color: "var(--text-subdued-1)",
                marginBottom: "var(--space-12)",
              }}
            >
              Stroke width: 3
            </p>
            <ProgressStepper
              steps={[
                { step: 1, title: "A", status: "default", progress: { percentage: 80 } },
                { step: 2, title: "B", status: "default", progress: { percentage: 50 } },
                { step: 3, title: "C", status: "default", progress: { percentage: 20 } },
              ]}
              circleStrokeWidth={3}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
