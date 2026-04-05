import { Button, StepperFlow, notify, type StepConfig } from "@repo/ui";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DelistWizardProvider, useDelistWizard } from "./delist-wizard-context";
import { StepStoreSelection } from "./step-store-selection";
import { StepAddReason } from "./step-add-reason";
import { StepReviewRequest } from "./step-review-request";

function DelistWizardContent() {
  const navigate = useNavigate();
  const { currentStep, setCurrentStep } = useDelistWizard();

  const steps: StepConfig[] = [
    {
      step: 1,
      title: "Store Selection",
      stepState:
        currentStep > 1
          ? "completed"
          : currentStep === 1
            ? "current"
            : "upcoming",
    },
    {
      step: 2,
      title: "Add Reason",
      stepState:
        currentStep > 2
          ? "completed"
          : currentStep === 2
            ? "current"
            : "upcoming",
    },
    {
      step: 3,
      title: "Review Request",
      stepState: currentStep === 3 ? "current" : "upcoming",
    },
  ];

  function handleNext() {
    if (currentStep < 3) {
      setCurrentStep((currentStep + 1) as 1 | 2 | 3);
    }
  }

  function handlePrevious() {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as 1 | 2 | 3);
    }
  }

  function handleSubmit() {
    notify({
      title: "Delist request submitted",
      variant: "success",
    });
    navigate("/granary/assortment/requests");
  }

  function handleBack() {
    navigate("/granary/assortment/requests");
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "var(--surface-10)",
      }}
    >
      {/* Header */}
      <div
        style={{
          height: 64,
          flexShrink: 0,
          backgroundColor: "var(--surface-0)",
          display: "flex",
          alignItems: "center",
          padding: "0 var(--space-16)",
          gap: "var(--space-16)",
          borderBottom: "1px solid var(--grey-20)",
        }}
      >
        <Button
          variant="ghost"
          onClick={handleBack}
          className="flex items-center gap-[var(--space-4)]"
          style={{ flexShrink: 0 }}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </Button>

        <span
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            flexShrink: 0,
          }}
        >
          Delist Request
        </span>

        <div style={{ flex: 1, maxWidth: 480, margin: "0 auto" }}>
          <StepperFlow steps={steps} value={currentStep} />
        </div>

        <div
          className="flex items-center gap-[var(--space-8)]"
          style={{ flexShrink: 0 }}
        >
          <Button variant="outline">Save</Button>
          <Button
            variant="default"
            disabled={currentStep !== 3}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: "var(--space-16)",
          overflow: "hidden",
        }}
      >
        {currentStep === 1 && <StepStoreSelection />}
        {currentStep === 2 && <StepAddReason />}
        {currentStep === 3 && <StepReviewRequest />}
      </div>

      {/* Footer */}
      <div
        style={{
          flexShrink: 0,
          backgroundColor: "var(--surface-0)",
          padding: "var(--space-12) var(--space-16)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid var(--grey-20)",
        }}
      >
        <Button
          variant="ghost"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        {currentStep < 3 ? (
          <Button variant="default" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button variant="default" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}

export default function DelistRequestPage() {
  return (
    <DelistWizardProvider>
      <DelistWizardContent />
    </DelistWizardProvider>
  );
}
