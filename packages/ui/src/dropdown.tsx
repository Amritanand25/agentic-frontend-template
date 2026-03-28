import * as React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronDown, X, Search, Check, AlertCircle, AlertTriangle, CheckCircle } from "lucide-react"
import { cn } from "@repo/utils"
import { Popover, PopoverTrigger, PopoverContent } from "./popover.tsx"
import { Checkbox } from "./checkbox.tsx"
import { ScrollArea } from "./scroll-area.tsx"
import { useVirtualizer } from "@tanstack/react-virtual"
import { InputLabel } from "./input-label.tsx"

export interface DropdownOption {
  id: string | number
  label: string
  value: string | number
  groupId?: string | number
  disabled?: boolean
  helpText?: string
  icon?: React.ReactNode
}

export interface DropdownGroup {
  id: string | number
  label?: string
}

export interface DropdownProps {
  options: DropdownOption[]
  value?: DropdownOption[]
  onChange?: (selected: DropdownOption[], current?: DropdownOption) => void
  placeholder?: string
  label?: string
  helperText?: string
  disabled?: boolean
  required?: boolean
  searchable?: boolean
  isMultiSelect?: boolean
  isRadioSelect?: boolean
  validationState?: "default" | "error" | "warning" | "success"
  validationMessage?: string
  supportText?: string
  size?: "s" | "m" | "l"
  groups?: DropdownGroup[]
  className?: string
  /** Enable virtualized rendering for large lists */
  enableVirtualization?: boolean
  /** Minimum items before virtualization activates (default 100) */
  virtualizationThreshold?: number
  /** Height of the virtualized list container in px (default 320) */
  virtualizedHeight?: number
  /** Estimated height per item in px (auto-calculated from size if omitted) */
  estimateItemSize?: number
  /** Number of extra items rendered outside the viewport (default 5) */
  overscan?: number
}

const sizeConfig = {
  s: { height: 32, fontSize: "var(--font-size-s)", padding: "0 var(--space-8)" },
  m: { height: 36, fontSize: "var(--font-size-m)", padding: "0 var(--space-12)" },
  l: { height: 40, fontSize: "var(--font-size-m)", padding: "0 var(--space-12)" },
}

const validationConfig = {
  default: { borderColor: "var(--grey-40)", icon: null, color: "var(--text-subdued-1)" },
  error: { borderColor: "var(--error-50)", icon: AlertCircle, color: "var(--error-50)" },
  warning: { borderColor: "var(--warning-50)", icon: AlertTriangle, color: "var(--warning-50)" },
  success: { borderColor: "var(--success-50)", icon: CheckCircle, color: "var(--success-50)" },
}

// --- Extracted option item for reuse in regular + virtualized lists ---

interface OptionItemProps {
  option: DropdownOption
  selected: boolean
  isMultiSelect: boolean
  isRadioSelect: boolean
  onSingleSelect: (option: DropdownOption) => void
  onMultiToggle: (option: DropdownOption) => void
  onRadioSelect: (option: DropdownOption) => void
  style?: React.CSSProperties
}

const OptionItem = React.memo(function OptionItem({
  option,
  selected,
  isMultiSelect,
  isRadioSelect,
  onSingleSelect,
  onMultiToggle,
  onRadioSelect,
  style: outerStyle,
}: OptionItemProps) {
  if (isMultiSelect) {
    return (
      <label
        className={cn(
          "flex items-center cursor-pointer transition-colors",
          option.disabled && "opacity-50 cursor-not-allowed"
        )}
        style={{
          padding: "var(--space-4) var(--space-8)",
          borderRadius: "var(--radius-4)",
          gap: "var(--space-8)",
          fontSize: "var(--font-size-m)",
          color: "var(--text-default)",
          ...outerStyle,
        }}
        onMouseEnter={(e) => {
          if (!option.disabled) e.currentTarget.style.backgroundColor = "var(--surface-10)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent"
        }}
      >
        <Checkbox
          checked={selected}
          onCheckedChange={() => onMultiToggle(option)}
          disabled={option.disabled}
          className="shrink-0"
        />
        {option.icon && (
          <span className="shrink-0 flex items-center" style={{ color: "var(--text-subdued-1)" }}>
            {option.icon}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <span className="truncate block">{option.label}</span>
          {option.helpText && (
            <span className="block truncate" style={{ fontSize: "var(--font-size-xs)", color: "var(--text-subdued-2)", lineHeight: "var(--line-height-xs)" }}>
              {option.helpText}
            </span>
          )}
        </div>
      </label>
    )
  }

  if (isRadioSelect) {
    return (
      <label
        className={cn(
          "flex items-center cursor-pointer transition-colors",
          option.disabled && "opacity-50 cursor-not-allowed"
        )}
        style={{
          padding: "var(--space-4) var(--space-8)",
          borderRadius: "var(--radius-4)",
          gap: "var(--space-8)",
          fontSize: "var(--font-size-m)",
          color: "var(--text-default)",
          ...outerStyle,
        }}
        onMouseEnter={(e) => {
          if (!option.disabled) e.currentTarget.style.backgroundColor = "var(--surface-10)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent"
        }}
        onClick={() => !option.disabled && onRadioSelect(option)}
      >
        <span
          className="flex items-center justify-center shrink-0"
          style={{
            width: 16, height: 16,
            borderRadius: "var(--radius-full)",
            border: `2px solid ${selected ? "var(--primary-50)" : "var(--grey-40)"}`,
            backgroundColor: selected ? "var(--primary-50)" : "transparent",
            transition: "all 150ms ease",
          }}
        >
          {selected && <span style={{ width: 6, height: 6, borderRadius: "var(--radius-full)", backgroundColor: "var(--primary-inverse)" }} />}
        </span>
        {option.icon && (
          <span className="shrink-0 flex items-center" style={{ color: "var(--text-subdued-1)" }}>{option.icon}</span>
        )}
        <div className="flex-1 min-w-0">
          <span className="truncate block">{option.label}</span>
          {option.helpText && (
            <span className="block truncate" style={{ fontSize: "var(--font-size-xs)", color: "var(--text-subdued-2)", lineHeight: "var(--line-height-xs)" }}>
              {option.helpText}
            </span>
          )}
        </div>
      </label>
    )
  }

  // Single select
  return (
    <button
      type="button"
      disabled={option.disabled}
      className={cn(
        "flex items-center w-full text-left cursor-pointer transition-colors",
        option.disabled && "opacity-50 cursor-not-allowed"
      )}
      style={{
        padding: "var(--space-4) var(--space-8)",
        borderRadius: "var(--radius-4)",
        gap: "var(--space-8)",
        fontSize: "var(--font-size-m)",
        color: selected ? "var(--primary-50)" : "var(--text-default)",
        backgroundColor: selected ? "var(--primary-20)" : "transparent",
        border: "none",
        fontWeight: selected ? "var(--font-weight-prominent)" : "var(--font-weight-regular)",
        ...outerStyle,
      }}
      onMouseEnter={(e) => {
        if (!option.disabled && !selected) e.currentTarget.style.backgroundColor = "var(--surface-10)"
      }}
      onMouseLeave={(e) => {
        if (!option.disabled && !selected) e.currentTarget.style.backgroundColor = "transparent"
      }}
      onClick={() => onSingleSelect(option)}
    >
      {option.icon && <span className="shrink-0 flex items-center">{option.icon}</span>}
      <div className="flex-1 min-w-0">
        <span className="truncate block">{option.label}</span>
        {option.helpText && (
          <span className="block truncate" style={{ fontSize: "var(--font-size-xs)", color: selected ? "var(--primary-50)" : "var(--text-subdued-2)", lineHeight: "var(--line-height-xs)" }}>
            {option.helpText}
          </span>
        )}
      </div>
      {selected && <Check size={16} className="shrink-0" style={{ color: "var(--primary-50)" }} />}
    </button>
  )
})

// --- Virtualized option list ---

interface VirtualizedOptionListProps {
  options: DropdownOption[]
  isMultiSelect: boolean
  isRadioSelect: boolean
  isOptionSelected: (option: DropdownOption) => boolean
  handleSingleSelect: (option: DropdownOption) => void
  handleMultiToggle: (option: DropdownOption) => void
  handleRadioSelect: (option: DropdownOption) => void
  height: number
  itemHeight: number
  overscan: number
}

function VirtualizedOptionList({
  options,
  isMultiSelect,
  isRadioSelect,
  isOptionSelected,
  handleSingleSelect,
  handleMultiToggle,
  handleRadioSelect,
  height,
  itemHeight,
  overscan,
}: VirtualizedOptionListProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: options.length,
    getScrollElement: () =>
      rootRef.current?.querySelector("[data-radix-scroll-area-viewport]") as HTMLElement | null,
    estimateSize: () => itemHeight,
    overscan,
  })

  if (options.length === 0) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ padding: "var(--space-16)", fontSize: "var(--font-size-s)", color: "var(--text-subdued-2)" }}
      >
        No options found
      </div>
    )
  }

  return (
    <ScrollArea
      ref={rootRef}
      style={{ height: Math.min(height, options.length * itemHeight) }}
    >
      <div style={{ height: virtualizer.getTotalSize(), width: "100%", position: "relative", padding: "0 var(--space-4)" }}>
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const option = options[virtualItem.index]
          return (
            <div
              key={option.id}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: virtualItem.size,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <OptionItem
                option={option}
                selected={isOptionSelected(option)}
                isMultiSelect={isMultiSelect}
                isRadioSelect={isRadioSelect}
                onSingleSelect={handleSingleSelect}
                onMultiToggle={handleMultiToggle}
                onRadioSelect={handleRadioSelect}
              />
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}

// --- Main Dropdown component ---

export const Dropdown = React.forwardRef<HTMLButtonElement, DropdownProps>(
  (
    {
      options,
      value = [],
      onChange,
      placeholder = "Select an option",
      label,
      helperText,
      disabled = false,
      required = false,
      searchable = false,
      isMultiSelect = false,
      isRadioSelect = false,
      validationState = "default",
      validationMessage,
      supportText,
      size = "m",
      groups,
      className,
      enableVirtualization = false,
      virtualizationThreshold = 100,
      virtualizedHeight = 320,
      estimateItemSize,
      overscan = 5,
    },
    ref
  ) => {
    const [open, setOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [tempSelected, setTempSelected] = useState<DropdownOption[]>(value)
    const [isHovered, setIsHovered] = useState(false)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const [debouncedQuery, setDebouncedQuery] = useState("")

    const sizeStyles = sizeConfig[size]
    const validation = validationConfig[validationState]
    const ValidationIcon = validation.icon

    // Sync temp selections when popover opens
    useEffect(() => {
      if (open) {
        setTempSelected(value)
        setSearchQuery("")
        setDebouncedQuery("")
      }
    }, [open, value])

    const handleSearchChange = useCallback((val: string) => {
      setSearchQuery(val)
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        setDebouncedQuery(val)
      }, 300)
    }, [])

    useEffect(() => {
      return () => {
        if (debounceRef.current) clearTimeout(debounceRef.current)
      }
    }, [])

    const filteredOptions = options.filter((opt) =>
      opt.label.toLowerCase().includes(debouncedQuery.toLowerCase())
    )

    // Group options
    const groupedOptions = (() => {
      if (!groups || groups.length === 0) {
        return [{ group: null as DropdownGroup | null, items: filteredOptions }]
      }
      const result: { group: DropdownGroup | null; items: DropdownOption[] }[] = []
      const ungrouped = filteredOptions.filter((o) => !o.groupId)
      if (ungrouped.length > 0) {
        result.push({ group: null, items: ungrouped })
      }
      for (const group of groups) {
        const items = filteredOptions.filter((o) => o.groupId === group.id)
        if (items.length > 0) {
          result.push({ group, items })
        }
      }
      return result
    })()

    const hasValue = value.length > 0

    // Build trigger display
    const triggerDisplay = (() => {
      if (!hasValue) return placeholder
      if (isMultiSelect) {
        if (value.length === 1) return value[0].label
        return `${value.length} selected`
      }
      return value[0].label
    })()

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      onChange?.([], undefined)
    }

    const handleSingleSelect = (option: DropdownOption) => {
      if (option.disabled) return
      onChange?.([option], option)
      setOpen(false)
    }

    const handleRadioSelect = (option: DropdownOption) => {
      if (option.disabled) return
      setTempSelected([option])
    }

    const handleMultiToggle = (option: DropdownOption) => {
      if (option.disabled) return
      setTempSelected((prev) => {
        const exists = prev.some((o) => o.id === option.id)
        if (exists) return prev.filter((o) => o.id !== option.id)
        return [...prev, option]
      })
    }

    const handleApply = () => {
      onChange?.(tempSelected, tempSelected[tempSelected.length - 1])
      setOpen(false)
    }

    const handleClearAll = () => {
      setTempSelected([])
    }

    const isOptionSelected = (option: DropdownOption) => {
      if (isMultiSelect || isRadioSelect) {
        return tempSelected.some((o) => o.id === option.id)
      }
      return value.some((o) => o.id === option.id)
    }

    // Determine if virtualization should be active
    const shouldVirtualize = enableVirtualization && filteredOptions.length >= virtualizationThreshold

    // Compute item height from size if not provided
    const itemHeight = estimateItemSize ?? (size === "s" ? 28 : 32)

    return (
      <div className={cn("flex flex-col", className)} style={{ gap: "var(--space-4)" }}>
        {/* Label */}
        <InputLabel required={required} helperText={helperText} disabled={disabled}>
          {label}
        </InputLabel>

        {/* Support text */}
        {supportText && (
          <p
            style={{
              fontSize: "var(--font-size-s)",
              color: "var(--text-subdued-1)",
              lineHeight: "var(--line-height-s)",
            }}
          >
            {supportText}
          </p>
        )}

        {/* Trigger */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild disabled={disabled}>
            <button
              ref={ref}
              type="button"
              disabled={disabled}
              className={cn(
                "flex items-center w-full border transition-all cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "disabled:cursor-not-allowed"
              )}
              style={{
                height: sizeStyles.height,
                padding: sizeStyles.padding,
                fontSize: sizeStyles.fontSize,
                borderRadius: "var(--radius-8)",
                borderColor: open ? "var(--primary-50)" : validation.borderColor,
                backgroundColor: disabled ? "var(--grey-20)" : "var(--surface-0)",
                color: hasValue ? "var(--text-default)" : "var(--text-subdued-2)",
                gap: "var(--space-8)",
                opacity: disabled ? 0.6 : 1,
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Selected value icon (single select) */}
              {hasValue && !isMultiSelect && value[0].icon && (
                <span className="shrink-0 flex items-center" style={{ color: "var(--text-default)" }}>
                  {value[0].icon}
                </span>
              )}

              {/* Display text */}
              <span className="flex-1 text-left truncate">
                {triggerDisplay}
              </span>

              {/* Multi-select count badge */}
              {isMultiSelect && value.length > 1 && (
                <span
                  className="shrink-0 inline-flex items-center justify-center"
                  style={{
                    backgroundColor: "var(--primary-50)",
                    color: "var(--primary-inverse)",
                    fontSize: "var(--font-size-xs)",
                    fontWeight: "var(--font-weight-prominent)",
                    borderRadius: "var(--radius-full)",
                    minWidth: 20,
                    height: 20,
                    padding: "0 var(--space-4)",
                  }}
                >
                  {value.length}
                </span>
              )}

              {/* Clear button (on hover when has value) */}
              {hasValue && isHovered && !disabled && (
                <span
                  onClick={handleClear}
                  className="shrink-0 flex items-center justify-center cursor-pointer"
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "var(--radius-full)",
                    color: "var(--text-subdued-1)",
                  }}
                >
                  <X size={14} />
                </span>
              )}

              {/* Chevron */}
              <ChevronDown
                size={16}
                className="shrink-0 transition-transform duration-200"
                style={{
                  transform: open ? "rotate(180deg)" : "rotate(0deg)",
                  color: "var(--text-subdued-1)",
                }}
              />
            </button>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            className="p-0"
            style={{
              width: "var(--radix-popover-trigger-width)",
              minWidth: 200,
              backgroundColor: "var(--surface-0)",
              borderRadius: "var(--radius-8)",
              border: "1px solid var(--grey-40)",
              boxShadow: "var(--shadow-medium)",
            }}
          >
            {/* Search */}
            {searchable && (
              <div
                style={{
                  padding: "var(--space-8)",
                  borderBottom: "1px solid var(--grey-40)",
                }}
              >
                <div
                  className="flex items-center"
                  style={{
                    backgroundColor: "var(--surface-10)",
                    borderRadius: "var(--radius-4)",
                    padding: "0 var(--space-8)",
                    height: 32,
                    gap: "var(--space-4)",
                  }}
                >
                  <Search size={14} style={{ color: "var(--text-subdued-2)", flexShrink: 0 }} />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full bg-transparent border-none outline-none"
                    style={{
                      fontSize: "var(--font-size-s)",
                      color: "var(--text-default)",
                      lineHeight: "var(--line-height-s)",
                    }}
                  />
                </div>
              </div>
            )}

            {/* Options */}
            {shouldVirtualize ? (
              <VirtualizedOptionList
                options={filteredOptions}
                isMultiSelect={isMultiSelect}
                isRadioSelect={isRadioSelect}
                isOptionSelected={isOptionSelected}
                handleSingleSelect={handleSingleSelect}
                handleMultiToggle={handleMultiToggle}
                handleRadioSelect={handleRadioSelect}
                height={virtualizedHeight}
                itemHeight={itemHeight}
                overscan={overscan}
              />
            ) : (
              <ScrollArea viewportClassName="max-h-[320px]">
                <div style={{ padding: "var(--space-4)" }}>
                  {filteredOptions.length === 0 ? (
                    <div
                      className="flex items-center justify-center"
                      style={{
                        padding: "var(--space-16)",
                        fontSize: "var(--font-size-s)",
                        color: "var(--text-subdued-2)",
                      }}
                    >
                      No options found
                    </div>
                  ) : (
                    groupedOptions.map((section, sectionIdx) => (
                      <div key={section.group?.id ?? "ungrouped"}>
                        {section.group?.label && (
                          <div
                            style={{
                              padding: "var(--space-8) var(--space-8) var(--space-4)",
                              fontSize: "var(--font-size-xs)",
                              fontWeight: "var(--font-weight-prominent)",
                              color: "var(--text-subdued-2)",
                              textTransform: "uppercase" as const,
                              letterSpacing: "0.5px",
                            }}
                          >
                            {section.group.label}
                          </div>
                        )}
                        {sectionIdx > 0 && !section.group?.label && (
                          <div
                            style={{
                              height: 1,
                              backgroundColor: "var(--grey-40)",
                              margin: "var(--space-4) var(--space-8)",
                            }}
                          />
                        )}
                        {section.items.map((option) => (
                          <OptionItem
                            key={option.id}
                            option={option}
                            selected={isOptionSelected(option)}
                            isMultiSelect={isMultiSelect}
                            isRadioSelect={isRadioSelect}
                            onSingleSelect={handleSingleSelect}
                            onMultiToggle={handleMultiToggle}
                            onRadioSelect={handleRadioSelect}
                          />
                        ))}
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            )}

            {/* Footer for multi-select and radio */}
            {(isMultiSelect || isRadioSelect) && (
              <div
                className="flex items-center justify-between"
                style={{
                  padding: "var(--space-8) var(--space-12)",
                  borderTop: "1px solid var(--grey-40)",
                }}
              >
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="cursor-pointer"
                  style={{
                    fontSize: "var(--font-size-s)",
                    color: "var(--text-subdued-1)",
                    background: "none",
                    border: "none",
                    padding: "var(--space-2) var(--space-4)",
                    fontWeight: "var(--font-weight-regular)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--text-default)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-subdued-1)"
                  }}
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={handleApply}
                  className="cursor-pointer"
                  style={{
                    fontSize: "var(--font-size-s)",
                    fontWeight: "var(--font-weight-prominent)",
                    color: "var(--primary-inverse)",
                    backgroundColor: "var(--primary-50)",
                    border: "none",
                    borderRadius: "var(--radius-full)",
                    padding: "var(--space-4) var(--space-16)",
                    height: 28,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--primary-60)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--primary-50)"
                  }}
                >
                  Apply
                </button>
              </div>
            )}
          </PopoverContent>
        </Popover>

        {/* Validation message */}
        {validationMessage && validationState !== "default" && (
          <div
            className="flex items-start"
            style={{
              gap: "var(--space-4)",
              marginTop: "var(--space-2)",
            }}
          >
            {ValidationIcon && (
              <ValidationIcon
                size={14}
                className="shrink-0"
                style={{ color: validation.color, marginTop: 1 }}
              />
            )}
            <span
              style={{
                fontSize: "var(--font-size-s)",
                color: validation.color,
                lineHeight: "var(--line-height-s)",
              }}
            >
              {validationMessage}
            </span>
          </div>
        )}
      </div>
    )
  }
)

Dropdown.displayName = "Dropdown"
