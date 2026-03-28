import { useState } from "react"
import { DatePicker } from "@repo/ui"
export default function DatePickerPage() {
  const [singleDate, setSingleDate] = useState<Date[]>([new Date()])
  const [rangeDate, setRangeDate] = useState<Date[]>([
    new Date(2026, 2, 10),
    new Date(2026, 2, 20),
  ])
  const [labelDate, setLabelDate] = useState<Date[]>([])
  const [errorDate, setErrorDate] = useState<Date[]>([new Date(2026, 2, 1)])
  const [warningDate, setWarningDate] = useState<Date[]>([new Date(2026, 2, 15)])
  const [successDate, setSuccessDate] = useState<Date[]>([new Date(2026, 2, 25)])

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
          DatePicker
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-m)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-8)",
          }}
        >
          Date selection component with popover calendar. Supports single date
          and date range modes, validation states, and multiple sizes.
        </p>
      </div>

      {/* Single date picker */}
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
            marginBottom: "var(--space-16)",
          }}
        >
          Single Date
        </h2>
        <div style={{ maxWidth: 320 }}>
          <DatePicker
            label="Event Date"
            type="single"
            selectedDates={singleDate}
            onDateChange={setSingleDate}
            supportText="Select a single date"
          />
        </div>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-12)",
          }}
        >
          Selected:{" "}
          <strong>
            {singleDate.length > 0
              ? singleDate[0].toLocaleDateString("en-GB")
              : "None"}
          </strong>
        </p>
      </div>

      {/* Range date picker */}
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
            marginBottom: "var(--space-16)",
          }}
        >
          Date Range
        </h2>
        <div style={{ maxWidth: 400 }}>
          <DatePicker
            label="Travel Dates"
            type="range"
            selectedDates={rangeDate}
            onDateChange={setRangeDate}
            supportText="Select a start and end date"
          />
        </div>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-12)",
          }}
        >
          Selected:{" "}
          <strong>
            {rangeDate.length > 0
              ? `${rangeDate[0].toLocaleDateString("en-GB")}${rangeDate.length > 1 ? ` - ${rangeDate[1].toLocaleDateString("en-GB")}` : ""}`
              : "None"}
          </strong>
        </p>
      </div>

      {/* With label and required */}
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
            marginBottom: "var(--space-16)",
          }}
        >
          With Label & Required
        </h2>
        <div style={{ maxWidth: 320 }}>
          <DatePicker
            label="Birth Date"
            required
            type="single"
            selectedDates={labelDate}
            onDateChange={setLabelDate}
            supportText="This field is required"
          />
        </div>
      </div>

      {/* Validation states */}
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
            marginBottom: "var(--space-16)",
          }}
        >
          Validation States
        </h2>
        <div
          className="grid md:grid-cols-3"
          style={{ gap: "var(--space-24)" }}
        >
          <DatePicker
            label="Error State"
            type="single"
            selectedDates={errorDate}
            onDateChange={setErrorDate}
            validationState="error"
            validationMessage="Date is in the past"
          />
          <DatePicker
            label="Warning State"
            type="single"
            selectedDates={warningDate}
            onDateChange={setWarningDate}
            validationState="warning"
            validationMessage="Date falls on a weekend"
          />
          <DatePicker
            label="Success State"
            type="single"
            selectedDates={successDate}
            onDateChange={setSuccessDate}
            validationState="success"
            validationMessage="Date is available"
          />
        </div>
      </div>

      {/* Sizes */}
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
            marginBottom: "var(--space-16)",
          }}
        >
          Sizes
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-24)",
            maxWidth: 320,
          }}
        >
          <DatePicker
            label="Small (s)"
            size="s"
            type="single"
            selectedDates={[new Date()]}
          />
          <DatePicker
            label="Medium (m) - Default"
            size="m"
            type="single"
            selectedDates={[new Date()]}
          />
          <DatePicker
            label="Large (l)"
            size="l"
            type="single"
            selectedDates={[new Date()]}
          />
        </div>
      </div>

      {/* Disabled */}
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
            marginBottom: "var(--space-16)",
          }}
        >
          Disabled
        </h2>
        <div style={{ maxWidth: 320 }}>
          <DatePicker
            label="Disabled Date"
            type="single"
            selectedDates={[new Date()]}
            disabled
          />
        </div>
      </div>
    </div>
  )
}
