import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { Calendar } from "@repo/ui"

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [rangeDate, setRangeDate] = useState<DateRange | undefined>({
    from: new Date(2025, 1, 3),
    to: new Date(2025, 1, 20),
  })
  const [showRange, setShowRange] = useState(false)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-32)" }}>
      <div>
        <h1
          style={{
            fontSize: "var(--font-size-2xl)",
            fontWeight: "var(--font-weight-heading)",
            lineHeight: "var(--line-height-xl)",
            color: "var(--text-default)",
          }}
        >
          Calendar
        </h1>
        <p
          style={{
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-8)",
            fontSize: "var(--font-size-l)",
            lineHeight: "var(--line-height-l)",
          }}
        >
          A date picker with month and year selection views. Click the month or year
          in the header to switch views.
        </p>
      </div>

      <div
        className="flex flex-col md:flex-row items-start"
        style={{ gap: "var(--space-24)" }}
      >
        {/* Calendar */}
        <div>
          {showRange ? (
            <Calendar
              mode="range"
              selected={rangeDate}
              onSelect={setRangeDate}
              className="rounded-2xl border"
            />
          ) : (
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-2xl border"
            />
          )}
        </div>

        {/* Info panel */}
        <div
          style={{
            backgroundColor: "var(--surface-0)",
            borderRadius: "var(--radius-16)",
            padding: "var(--space-24)",

            width: "100%",
            maxWidth: 320,
          }}
        >
          <p
            style={{
              fontSize: "var(--font-size-m)",
              fontWeight: "var(--font-weight-heading)",
              color: "var(--text-default)",
              marginBottom: "var(--space-8)",
            }}
          >
            {showRange ? "Selected Range" : "Selected Date"}
          </p>
          <p
            style={{
              fontSize: "var(--font-size-l)",
              color: "var(--primary-50)",
              fontWeight: "var(--font-weight-prominent)",
            }}
          >
            {showRange
              ? rangeDate?.from
                ? `${rangeDate.from.toLocaleDateString("en-US", { month: "short", day: "numeric" })}${rangeDate.to ? ` – ${rangeDate.to.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}` : ""}`
                : "Select a range"
              : date
                ? date.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "No date selected"}
          </p>

          <div
            style={{
              marginTop: "var(--space-16)",
              paddingTop: "var(--space-16)",
              borderTop: "1px solid var(--grey-40)",
            }}
          >
            <p
              style={{
                fontSize: "var(--font-size-s)",
                color: "var(--text-subdued-1)",
                lineHeight: "var(--line-height-s)",
                marginBottom: "var(--space-12)",
              }}
            >
              Click the <strong>month name</strong> to pick a month.
              <br />
              Click the <strong>year</strong> to pick a year.
            </p>
            <button
              type="button"
              onClick={() => setShowRange(!showRange)}
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
              {showRange ? "Switch to Single Date" : "Switch to Date Range"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
