import { useState } from "react"
import { Globe, Zap, Shield, Cpu, Palette } from "lucide-react"
import { Dropdown } from "@repo/ui"
import type { DropdownOption, DropdownGroup } from "@repo/ui"

// Generate 10,000 items for virtualization demo
function generateLargeDataset(count: number): DropdownOption[] {
  const cities = [
    "New York", "London", "Tokyo", "Paris", "Berlin", "Sydney", "Toronto",
    "Mumbai", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Lagos",
    "Istanbul", "Moscow", "Seoul", "Bangkok", "Jakarta", "Lima", "Rome",
    "Madrid", "Vienna", "Prague", "Warsaw", "Amsterdam", "Stockholm",
    "Oslo", "Helsinki", "Dublin", "Lisbon", "Athens", "Budapest",
    "Copenhagen", "Brussels", "Zurich", "Singapore", "Hong Kong", "Dubai",
    "Nairobi", "Johannesburg", "Auckland", "Melbourne", "Vancouver",
    "Montreal", "Chicago", "Houston", "Phoenix", "San Francisco",
  ]
  return Array.from({ length: count }, (_, i) => ({
    id: `item-${i}`,
    label: `${cities[i % cities.length]} #${i + 1}`,
    value: `item-${i}`,
  }))
}

const LARGE_DATASET = generateLargeDataset(10_000)

const fruitOptions: DropdownOption[] = [
  { id: "apple", label: "Apple", value: "apple" },
  { id: "banana", label: "Banana", value: "banana" },
  { id: "cherry", label: "Cherry", value: "cherry" },
  { id: "dragonfruit", label: "Dragonfruit", value: "dragonfruit" },
  { id: "elderberry", label: "Elderberry", value: "elderberry" },
  { id: "fig", label: "Fig", value: "fig" },
  { id: "grape", label: "Grape", value: "grape" },
  { id: "honeydew", label: "Honeydew", value: "honeydew" },
]

const countryOptions: DropdownOption[] = [
  { id: "us", label: "United States", value: "us", icon: <Globe size={16} /> },
  { id: "uk", label: "United Kingdom", value: "uk", icon: <Globe size={16} /> },
  { id: "ca", label: "Canada", value: "ca", icon: <Globe size={16} /> },
  { id: "de", label: "Germany", value: "de", icon: <Globe size={16} /> },
  { id: "fr", label: "France", value: "fr", icon: <Globe size={16} /> },
  { id: "jp", label: "Japan", value: "jp", icon: <Globe size={16} /> },
  { id: "au", label: "Australia", value: "au", icon: <Globe size={16} /> },
  { id: "br", label: "Brazil", value: "br", icon: <Globe size={16} /> },
]

const roleOptions: DropdownOption[] = [
  { id: "admin", label: "Administrator", value: "admin", helpText: "Full access to all features" },
  { id: "editor", label: "Editor", value: "editor", helpText: "Can edit and publish content" },
  { id: "viewer", label: "Viewer", value: "viewer", helpText: "Read-only access" },
  { id: "moderator", label: "Moderator", value: "moderator", helpText: "Can moderate user content" },
  { id: "guest", label: "Guest", value: "guest", helpText: "Limited access", disabled: true },
]

const groupedOptions: DropdownOption[] = [
  { id: "react", label: "React", value: "react", groupId: "frontend", icon: <Zap size={16} /> },
  { id: "vue", label: "Vue.js", value: "vue", groupId: "frontend", icon: <Zap size={16} /> },
  { id: "angular", label: "Angular", value: "angular", groupId: "frontend", icon: <Zap size={16} /> },
  { id: "svelte", label: "Svelte", value: "svelte", groupId: "frontend", icon: <Zap size={16} /> },
  { id: "node", label: "Node.js", value: "node", groupId: "backend", icon: <Cpu size={16} /> },
  { id: "python", label: "Python", value: "python", groupId: "backend", icon: <Cpu size={16} /> },
  { id: "go", label: "Go", value: "go", groupId: "backend", icon: <Cpu size={16} /> },
  { id: "rust", label: "Rust", value: "rust", groupId: "backend", icon: <Shield size={16} /> },
  { id: "figma", label: "Figma", value: "figma", groupId: "design", icon: <Palette size={16} /> },
  { id: "sketch", label: "Sketch", value: "sketch", groupId: "design", icon: <Palette size={16} /> },
]

const techGroups: DropdownGroup[] = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "design", label: "Design" },
]

export default function DropdownPage() {
  const [singleValue, setSingleValue] = useState<DropdownOption[]>([])
  const [multiValue, setMultiValue] = useState<DropdownOption[]>([])
  const [radioValue, setRadioValue] = useState<DropdownOption[]>([])
  const [searchableValue, setSearchableValue] = useState<DropdownOption[]>([])
  const [groupedValue, setGroupedValue] = useState<DropdownOption[]>([])
  const [errorValue, setErrorValue] = useState<DropdownOption[]>([])
  const [warningValue, setWarningValue] = useState<DropdownOption[]>([])
  const [successValue, setSuccessValue] = useState<DropdownOption[]>([])
  const [virtualSingleValue, setVirtualSingleValue] = useState<DropdownOption[]>([])
  const [virtualMultiValue, setVirtualMultiValue] = useState<DropdownOption[]>([])

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
          Dropdown
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-l)",
            lineHeight: "var(--line-height-l)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-8)",
          }}
        >
          A feature-rich custom select dropdown with single, multi-select, and radio modes.
          Supports search, groups, validation, icons, and help text.
        </p>
      </div>

      {/* Single Select */}
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
          Basic single selection. Click an option to select it. Shows a checkmark on the selected item.
        </p>
        <div style={{ maxWidth: 320 }}>
          <Dropdown
            label="Favorite Fruit"
            options={fruitOptions}
            value={singleValue}
            onChange={setSingleValue}
            placeholder="Choose a fruit"
          />
        </div>
      </div>

      {/* Multi Select */}
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
          Multi-Select
        </p>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
            lineHeight: "var(--line-height-s)",
          }}
        >
          Select multiple countries with checkboxes. Includes a count badge and Apply/Clear footer.
        </p>
        <div style={{ maxWidth: 320 }}>
          <Dropdown
            label="Countries"
            options={countryOptions}
            value={multiValue}
            onChange={setMultiValue}
            isMultiSelect
            searchable
            placeholder="Select countries"
          />
        </div>
      </div>

      {/* Radio Select */}
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
          Radio Select
        </p>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
            lineHeight: "var(--line-height-s)",
          }}
        >
          Single selection with radio buttons and help text. One option is disabled.
        </p>
        <div style={{ maxWidth: 320 }}>
          <Dropdown
            label="User Role"
            required
            options={roleOptions}
            value={radioValue}
            onChange={setRadioValue}
            isRadioSelect
            placeholder="Assign a role"
          />
        </div>
      </div>

      {/* Searchable */}
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
          Searchable
        </p>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
            lineHeight: "var(--line-height-s)",
          }}
        >
          Single select with search enabled and icons on each option.
        </p>
        <div style={{ maxWidth: 320 }}>
          <Dropdown
            label="Country"
            options={countryOptions}
            value={searchableValue}
            onChange={setSearchableValue}
            searchable
            placeholder="Search for a country"
            supportText="Start typing to filter the list"
          />
        </div>
      </div>

      {/* With Groups */}
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
          With Groups
        </p>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
            lineHeight: "var(--line-height-s)",
          }}
        >
          Multi-select with grouped options, search, and icons.
        </p>
        <div style={{ maxWidth: 320 }}>
          <Dropdown
            label="Tech Stack"
            options={groupedOptions}
            groups={techGroups}
            value={groupedValue}
            onChange={setGroupedValue}
            isMultiSelect
            searchable
            placeholder="Select technologies"
          />
        </div>
      </div>

      {/* Sizes */}
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
          Sizes
        </p>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
            lineHeight: "var(--line-height-s)",
          }}
        >
          Three size variants: small (32px), medium (40px), and large (48px, default).
        </p>
        <div className="flex flex-col" style={{ gap: "var(--space-16)", maxWidth: 320 }}>
          <Dropdown
            label="Small"
            options={fruitOptions}
            value={[]}
            onChange={() => {}}
            size="s"
            placeholder="Small (32px)"
          />
          <Dropdown
            label="Medium"
            options={fruitOptions}
            value={[]}
            onChange={() => {}}
            size="m"
            placeholder="Medium (40px)"
          />
          <Dropdown
            label="Large (default)"
            options={fruitOptions}
            value={[]}
            onChange={() => {}}
            size="l"
            placeholder="Large (48px)"
          />
        </div>
      </div>

      {/* Validation States */}
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
          Validation States
        </p>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
            lineHeight: "var(--line-height-s)",
          }}
        >
          Error, warning, and success states with validation messages.
        </p>
        <div className="grid md:grid-cols-3" style={{ gap: "var(--space-16)" }}>
          <Dropdown
            label="Category"
            required
            options={fruitOptions}
            value={errorValue}
            onChange={setErrorValue}
            validationState="error"
            validationMessage="This field is required"
            placeholder="Select category"
          />
          <Dropdown
            label="Priority"
            options={fruitOptions}
            value={warningValue}
            onChange={setWarningValue}
            validationState="warning"
            validationMessage="Consider selecting a priority"
            placeholder="Select priority"
          />
          <Dropdown
            label="Status"
            options={fruitOptions}
            value={successValue}
            onChange={setSuccessValue}
            validationState="success"
            validationMessage="Selection confirmed"
            placeholder="Select status"
          />
        </div>
      </div>

      {/* Virtualized — 10,000 items */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <div className="flex items-center" style={{ gap: "var(--space-8)", marginBottom: "var(--space-4)" }}>
          <p
            style={{
              fontSize: "var(--font-size-m)",
              fontWeight: "var(--font-weight-heading)",
              color: "var(--text-default)",
            }}
          >
            Virtualized List
          </p>
          <span
            style={{
              fontSize: "var(--font-size-xs)",
              fontWeight: "var(--font-weight-prominent)",
              color: "var(--primary-inverse)",
              backgroundColor: "var(--primary-50)",
              borderRadius: "var(--radius-full)",
              padding: "2px 8px",
            }}
          >
            10,000 items
          </span>
        </div>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
            lineHeight: "var(--line-height-s)",
          }}
        >
          Uses <code style={{ fontSize: "var(--font-size-xs)", backgroundColor: "var(--surface-20)", padding: "1px 4px", borderRadius: "var(--radius-4)" }}>@tanstack/react-virtual</code> to render only visible items. Only ~15 DOM nodes exist at any time instead of 10,000. Smooth scrolling with 5-item overscan buffer.
        </p>
        <div className="grid md:grid-cols-2" style={{ gap: "var(--space-16)" }}>
          <Dropdown
            label="Single Select (Virtualized)"
            options={LARGE_DATASET}
            value={virtualSingleValue}
            onChange={setVirtualSingleValue}
            searchable
            placeholder="Search 10,000 cities..."
            enableVirtualization
            virtualizationThreshold={50}
            supportText="Try searching for a city name"
          />
          <Dropdown
            label="Multi-Select (Virtualized)"
            options={LARGE_DATASET}
            value={virtualMultiValue}
            onChange={setVirtualMultiValue}
            isMultiSelect
            searchable
            placeholder="Select from 10,000 cities..."
            enableVirtualization
            virtualizationThreshold={50}
            supportText="Checkboxes + Apply/Clear footer with virtualized list"
          />
        </div>
      </div>

      {/* Disabled */}
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
          Dropdown in its disabled state, with and without a pre-selected value.
        </p>
        <div className="flex flex-col md:flex-row" style={{ gap: "var(--space-16)" }}>
          <div style={{ maxWidth: 320, flex: 1 }}>
            <Dropdown
              label="Disabled (empty)"
              options={fruitOptions}
              value={[]}
              onChange={() => {}}
              disabled
              placeholder="Cannot select"
            />
          </div>
          <div style={{ maxWidth: 320, flex: 1 }}>
            <Dropdown
              label="Disabled (with value)"
              options={fruitOptions}
              value={[fruitOptions[0]]}
              onChange={() => {}}
              disabled
              placeholder="Cannot select"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
