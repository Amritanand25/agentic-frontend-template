import { useState } from "react"
import { Star, Rocket, Flag } from "lucide-react"
import { StepperFlow } from "@repo/ui"
import type { StepConfig } from "@repo/ui"

const basicSteps: StepConfig[] = [
  { step: 1, title: "Account", description: "Create your account" },
  { step: 2, title: "Profile", description: "Set up your profile" },
  { step: 3, title: "Settings", description: "Configure settings" },
  { step: 4, title: "Review", description: "Review & confirm" },
]

const stateSteps: StepConfig[] = [
  { step: 1, title: "Completed", description: "This step is done", stepState: "completed" },
  { step: 2, title: "Current", description: "You are here", stepState: "current" },
  { step: 3, title: "Error", description: "Something went wrong", stepState: "error" },
  { step: 4, title: "Upcoming", description: "Not started yet", stepState: "upcoming" },
  { step: 5, title: "Loading", description: "Processing...", stepState: "loading" },
  { step: 6, title: "Disabled", description: "Cannot proceed", stepState: "disabled" },
]

const verticalSteps: StepConfig[] = [
  { step: 1, title: "Order Placed", description: "Your order has been confirmed", stepState: "completed" },
  { step: 2, title: "Payment Processed", description: "Payment received successfully", stepState: "completed" },
  { step: 3, title: "Shipping", description: "Package is on its way", stepState: "current" },
  { step: 4, title: "Delivery", description: "Estimated arrival in 2 days", stepState: "upcoming" },
]

const dottedSteps: StepConfig[] = [
  { step: 1, title: "Draft", stepState: "completed" },
  { step: 2, title: "Review", stepState: "completed" },
  { step: 3, title: "Approval", stepState: "current" },
  { step: 4, title: "Published" },
]

const customIconSteps: StepConfig[] = [
  { step: 1, title: "Kickoff", stepIcon: <Star style={{ width: 14, height: 14 }} />, stepState: "completed" },
  { step: 2, title: "In Progress", stepIcon: <Rocket style={{ width: 14, height: 14 }} />, stepState: "current" },
  { step: 3, title: "Finish", stepIcon: <Flag style={{ width: 14, height: 14 }} /> },
]

const coloredDividerSteps: StepConfig[] = [
  { step: 1, title: "Step 1", stepState: "completed", dividerColor: "var(--success-50)" },
  { step: 2, title: "Step 2", stepState: "completed", dividerColor: "var(--success-50)" },
  { step: 3, title: "Step 3", stepState: "error", dividerColor: "var(--error-50)" },
  { step: 4, title: "Step 4", stepState: "upcoming" },
]

export default function StepperFlowPage() {
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
          Stepper Flow
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-m)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-8)",
          }}
        >
          A configurable multi-step workflow indicator with support for multiple states,
          orientations, and custom icons.
        </p>
      </div>

      {/* Interactive Example */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",

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
          Interactive (click steps)
        </p>
        <StepperFlow
          steps={basicSteps.map((s) => ({
            ...s,
            stepState:
              s.step < activeStep
                ? "completed"
                : s.step === activeStep
                  ? "current"
                  : "upcoming",
            dividerColor:
              s.step < activeStep ? "var(--success-50)" : undefined,
          }))}
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
          Active step: {activeStep}
        </p>
        <div className="flex flex-wrap" style={{ gap: "var(--space-8)", marginTop: "var(--space-12)" }}>
          {basicSteps.map((s) => (
            <button
              key={s.step}
              type="button"
              onClick={() => setActiveStep(s.step)}
              style={{
                fontSize: "var(--font-size-s)",
                fontWeight: "var(--font-weight-prominent)",
                color: activeStep === s.step ? "var(--surface-0)" : "var(--primary-50)",
                backgroundColor: activeStep === s.step ? "var(--primary-50)" : "var(--primary-10)",
                border: "none",
                borderRadius: "var(--radius-8)",
                padding: "var(--space-4) var(--space-12)",
                cursor: "pointer",
              }}
            >
              Step {s.step}
            </button>
          ))}
        </div>
      </div>

      {/* Step States */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",

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
          All Step States
        </p>
        <StepperFlow steps={stateSteps} />
      </div>

      {/* Vertical */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",

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
          Vertical Orientation
        </p>
        <div style={{ maxWidth: 360 }}>
          <StepperFlow steps={verticalSteps} orientation="vertical" />
        </div>
      </div>

      {/* Dotted Separator */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",

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
          Dotted Separators
        </p>
        <StepperFlow steps={dottedSteps} dottedSeparator />
      </div>

      {/* Custom Icons */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",

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
          Custom Icons
        </p>
        <StepperFlow steps={customIconSteps} indicatorSize={40} />
      </div>

      {/* Colored Dividers */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",

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
          Colored Dividers
        </p>
        <StepperFlow steps={coloredDividerSteps} />
      </div>

      {/* No Border */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",

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
          Without Bordered Icon
        </p>
        <StepperFlow
          steps={[
            { step: 1, title: "Plan", stepState: "completed" },
            { step: 2, title: "Design", stepState: "current" },
            { step: 3, title: "Build" },
            { step: 4, title: "Deploy" },
          ]}
          borderedIcon={false}
        />
      </div>
    </div>
  )
}
