import { useState } from "react"
import { TimePicker } from "@repo/ui"
export default function TimePickerPage() {
  const [time12, setTime12] = useState("09:30 AM")
  const [time24, setTime24] = useState("14:45")
  const [timeLabel, setTimeLabel] = useState("")
  const [timeError, setTimeError] = useState("02:00 PM")
  const [timeWarning, setTimeWarning] = useState("11:30 AM")
  const [timeSuccess, setTimeSuccess] = useState("08:00 AM")

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
          TimePicker
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-m)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-8)",
          }}
        >
          Time selection component with hour/minute selects and AM/PM toggle.
          Supports 12-hour and 24-hour formats, validation states, and
          multiple sizes.
        </p>
      </div>

      {/* 12-hour format */}
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
          12-Hour Format
        </h2>
        <div style={{ maxWidth: 320 }}>
          <TimePicker
            label="Start Time"
            value={time12}
            onChange={setTime12}
            supportText="Select a time in 12-hour format"
          />
        </div>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-12)",
          }}
        >
          Selected: <strong>{time12 || "None"}</strong>
        </p>
      </div>

      {/* 24-hour format */}
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
          24-Hour Format
        </h2>
        <div style={{ maxWidth: 320 }}>
          <TimePicker
            label="Meeting Time"
            value={time24}
            onChange={setTime24}
            time24Format
            supportText="Select a time in 24-hour format"
          />
        </div>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-12)",
          }}
        >
          Selected: <strong>{time24 || "None"}</strong>
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
          <TimePicker
            label="Appointment Time"
            required
            value={timeLabel}
            onChange={setTimeLabel}
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
          <TimePicker
            label="Error State"
            value={timeError}
            onChange={setTimeError}
            validationState="error"
            validationMessage="Time conflicts with another event"
          />
          <TimePicker
            label="Warning State"
            value={timeWarning}
            onChange={setTimeWarning}
            validationState="warning"
            validationMessage="Outside of business hours"
          />
          <TimePicker
            label="Success State"
            value={timeSuccess}
            onChange={setTimeSuccess}
            validationState="success"
            validationMessage="Time slot is available"
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
          }}
        >
          <TimePicker
            label="Small (s)"
            size="s"
            value="10:00 AM"
          />
          <TimePicker
            label="Medium (m) - Default"
            size="m"
            value="10:00 AM"
          />
          <TimePicker
            label="Large (l)"
            size="l"
            value="10:00 AM"
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
          <TimePicker
            label="Disabled Time"
            value="03:15 PM"
            disabled
          />
        </div>
      </div>
    </div>
  )
}
