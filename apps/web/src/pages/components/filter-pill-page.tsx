import { useState } from "react"
import { FilterPill, type FilterPillOption } from "@repo/ui"
const countryOptions = [
  { label: "United States", value: "us" },
  { label: "United Kingdom", value: "uk" },
  { label: "Canada", value: "ca" },
  { label: "Germany", value: "de" },
  { label: "France", value: "fr" },
  { label: "Japan", value: "jp" },
  { label: "Australia", value: "au" },
  { label: "Brazil", value: "br" },
  { label: "India", value: "in" },
  { label: "South Korea", value: "kr" },
]

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Pending", value: "pending" },
  { label: "Inactive", value: "inactive" },
  { label: "Suspended", value: "suspended" },
  { label: "Archived", value: "archived" },
]

const categoryOptions = [
  { label: "Electronics", value: "electronics" },
  { label: "Clothing", value: "clothing" },
  { label: "Books", value: "books" },
  { label: "Home & Garden", value: "home" },
  { label: "Sports", value: "sports" },
  { label: "Toys", value: "toys" },
  { label: "Automotive", value: "automotive" },
]

function generateLargeOptions(count: number): FilterPillOption[] {
  const cities = ["New York", "London", "Tokyo", "Paris", "Berlin", "Sydney", "Toronto", "Mumbai", "Shanghai", "São Paulo", "Mexico City", "Cairo"]
  return Array.from({ length: count }, (_, i) => ({
    label: `${cities[i % cities.length]} #${i + 1}`,
    value: `city-${i}`,
  }))
}
const LARGE_OPTIONS = generateLargeOptions(10_000)

export default function FilterPillPage() {
  const [multiValues, setMultiValues] = useState<string[]>([])
  const [radioValue, setRadioValue] = useState<string[]>([])
  const [singleValue, setSingleValue] = useState<string[]>([])
  const [preselectedMulti, setPreselectedMulti] = useState<string[]>(["us", "uk", "de"])
  const [virtualValues, setVirtualValues] = useState<string[]>([])

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-32)" }}>
      {/* Header */}
      <div>
        <h1
          style={{
            fontSize: "var(--font-size-2xl)",
            fontWeight: "var(--font-weight-heading)",
            lineHeight: "var(--line-height-xl)",
            color: "var(--text-default)",
          }}
        >
          FilterPill
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-l)",
            lineHeight: "var(--line-height-l)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-8)",
          }}
        >
          A pill-shaped filter trigger with dropdown popover. Supports multi-checkbox,
          single-radio, and single select variants.
        </p>
      </div>

      {/* Multi-checkbox variant */}
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
            fontSize: "var(--font-size-m)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-4)",
          }}
        >
          Multi-Checkbox (Default)
        </p>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
            lineHeight: "var(--line-height-s)",
          }}
        >
          Select multiple countries. Includes search, checkboxes, and an Apply/Clear All footer.
        </p>
        <div className="flex flex-wrap items-center" style={{ gap: "var(--space-8)" }}>
          <FilterPill
            options={countryOptions}
            selectedValues={multiValues}
            onChange={setMultiValues}
            placeholder="Country"
            variant="multi-checkbox"
          />
          {multiValues.length > 0 && (
            <span
              style={{
                fontSize: "var(--font-size-s)",
                color: "var(--text-subdued-1)",
              }}
            >
              Selected: {multiValues.map((v) => countryOptions.find((o) => o.value === v)?.label).join(", ")}
            </span>
          )}
        </div>
      </div>

      {/* Single-radio variant */}
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
            fontSize: "var(--font-size-m)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-4)",
          }}
        >
          Single-Radio
        </p>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
            lineHeight: "var(--line-height-s)",
          }}
        >
          Select a single status with radio buttons. Has Apply/Clear All footer.
        </p>
        <div className="flex flex-wrap items-center" style={{ gap: "var(--space-8)" }}>
          <FilterPill
            options={statusOptions}
            selectedValues={radioValue}
            onChange={setRadioValue}
            placeholder="Status"
            variant="single-radio"
          />
          {radioValue.length > 0 && (
            <span
              style={{
                fontSize: "var(--font-size-s)",
                color: "var(--text-subdued-1)",
              }}
            >
              Selected: {statusOptions.find((o) => o.value === radioValue[0])?.label}
            </span>
          )}
        </div>
      </div>

      {/* Single variant */}
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
            fontSize: "var(--font-size-m)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-4)",
          }}
        >
          Single Select
        </p>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
            lineHeight: "var(--line-height-s)",
          }}
        >
          Plain text options. Closes on select, no footer. Selected item is highlighted.
        </p>
        <div className="flex flex-wrap items-center" style={{ gap: "var(--space-8)" }}>
          <FilterPill
            options={categoryOptions}
            selectedValues={singleValue}
            onChange={setSingleValue}
            placeholder="Category"
            variant="single"
          />
          {singleValue.length > 0 && (
            <span
              style={{
                fontSize: "var(--font-size-s)",
                color: "var(--text-subdued-1)",
              }}
            >
              Selected: {categoryOptions.find((o) => o.value === singleValue[0])?.label}
            </span>
          )}
        </div>
      </div>

      {/* Combined usage */}
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
            fontSize: "var(--font-size-m)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-4)",
          }}
        >
          Combined Usage
        </p>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
            lineHeight: "var(--line-height-s)",
          }}
        >
          Multiple filter pills used together, like a toolbar. The first has pre-selected values.
        </p>
        <div className="flex flex-wrap items-center" style={{ gap: "var(--space-8)" }}>
          <FilterPill
            options={countryOptions}
            selectedValues={preselectedMulti}
            onChange={setPreselectedMulti}
            placeholder="Country"
            variant="multi-checkbox"
          />
          <FilterPill
            options={statusOptions}
            selectedValues={radioValue}
            onChange={setRadioValue}
            placeholder="Status"
            variant="single-radio"
          />
          <FilterPill
            options={categoryOptions}
            selectedValues={singleValue}
            onChange={setSingleValue}
            placeholder="Category"
            variant="single"
          />
        </div>
      </div>

      {/* Virtualized (10,000 items) */}
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
            fontSize: "var(--font-size-m)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-4)",
          }}
        >
          Virtualized (10,000 items)
        </p>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
            lineHeight: "var(--line-height-s)",
          }}
        >
          Uses @tanstack/react-virtual to efficiently render 10,000 options. Only visible items are rendered in the DOM.
        </p>
        <div className="flex flex-wrap items-center" style={{ gap: "var(--space-8)" }}>
          <FilterPill
            options={LARGE_OPTIONS}
            selectedValues={virtualValues}
            onChange={setVirtualValues}
            placeholder="City"
            variant="multi-checkbox"
            enableVirtualization
            virtualizationThreshold={50}
          />
          {virtualValues.length > 0 && (
            <span
              style={{
                fontSize: "var(--font-size-s)",
                color: "var(--text-subdued-1)",
              }}
            >
              Selected: {virtualValues.length} cities
            </span>
          )}
        </div>
      </div>

      {/* Disabled state */}
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
            fontSize: "var(--font-size-m)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-4)",
          }}
        >
          Disabled State
        </p>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
            lineHeight: "var(--line-height-s)",
          }}
        >
          Filter pills in their disabled state.
        </p>
        <div className="flex flex-wrap items-center" style={{ gap: "var(--space-8)" }}>
          <FilterPill
            options={countryOptions}
            selectedValues={[]}
            onChange={() => {}}
            placeholder="Disabled"
            disabled
          />
          <FilterPill
            options={countryOptions}
            selectedValues={["us"]}
            onChange={() => {}}
            placeholder="Disabled"
            disabled
          />
        </div>
      </div>
    </div>
  )
}
