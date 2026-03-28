import * as React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronDown, X, Search } from "lucide-react"
import { cn } from "@repo/utils"
import { Popover, PopoverTrigger, PopoverContent } from "./popover.tsx"
import { Checkbox } from "./checkbox.tsx"
import { ScrollArea } from "./scroll-area.tsx"
import { useVirtualizer } from "@tanstack/react-virtual"

export interface FilterPillOption {
  label: string
  value: string
}

export interface FilterPillProps {
  options: FilterPillOption[]
  selectedValues: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  variant?: "multi-checkbox" | "single-radio" | "single"
  className?: string
  disabled?: boolean
  enableVirtualization?: boolean
  virtualizationThreshold?: number
  virtualizedHeight?: number
  estimateItemSize?: number
  overscan?: number
}

function VirtualizedFilterList({
  filteredOptions,
  variant,
  tempSelected,
  selectedValues,
  handleToggleCheckbox,
  handleRadioSelect,
  handleSingleSelect,
  virtualizedHeight = 250,
  estimateItemSize = 28,
  overscan = 5,
}: {
  filteredOptions: FilterPillOption[]
  variant: "multi-checkbox" | "single-radio" | "single"
  tempSelected: string[]
  selectedValues: string[]
  handleToggleCheckbox: (value: string) => void
  handleRadioSelect: (value: string) => void
  handleSingleSelect: (value: string) => void
  virtualizedHeight: number
  estimateItemSize: number
  overscan: number
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [scrollElement, setScrollElement] = useState<Element | null>(null)

  useEffect(() => {
    if (rootRef.current) {
      const viewport = rootRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      )
      setScrollElement(viewport)
    }
  }, [])

  const rowVirtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => scrollElement,
    estimateSize: () => estimateItemSize,
    overscan,
  })

  const computedHeight = Math.min(
    virtualizedHeight,
    filteredOptions.length * estimateItemSize
  )

  return (
    <ScrollArea ref={rootRef} style={{ height: computedHeight }}>
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
          padding: "0 var(--space-4)",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          const option = filteredOptions[virtualItem.index]

          if (variant === "multi-checkbox") {
            const isChecked = tempSelected.includes(option.value)
            return (
              <label
                key={option.value}
                className="flex items-center cursor-pointer transition-colors"
                style={{
                  position: "absolute",
                  top: 0,
                  left: "var(--space-4)",
                  right: "var(--space-4)",
                  transform: `translateY(${virtualItem.start}px)`,
                  height: `${virtualItem.size}px`,
                  padding: "var(--space-4) var(--space-8)",
                  borderRadius: "var(--radius-4)",
                  gap: "var(--space-8)",
                  fontSize: "var(--font-size-s)",
                  color: "var(--text-default)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--surface-10)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                }}
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => handleToggleCheckbox(option.value)}
                  className="shrink-0"
                />
                <span className="truncate">{option.label}</span>
              </label>
            )
          }

          if (variant === "single-radio") {
            const isChecked = tempSelected.includes(option.value)
            return (
              <label
                key={option.value}
                className="flex items-center cursor-pointer transition-colors"
                style={{
                  position: "absolute",
                  top: 0,
                  left: "var(--space-4)",
                  right: "var(--space-4)",
                  transform: `translateY(${virtualItem.start}px)`,
                  height: `${virtualItem.size}px`,
                  padding: "var(--space-4) var(--space-8)",
                  borderRadius: "var(--radius-4)",
                  gap: "var(--space-8)",
                  fontSize: "var(--font-size-s)",
                  color: "var(--text-default)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--surface-10)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                }}
                onClick={() => handleRadioSelect(option.value)}
              >
                <span
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "var(--radius-full)",
                    border: `2px solid ${isChecked ? "var(--primary-50)" : "var(--grey-40)"}`,
                    backgroundColor: isChecked ? "var(--primary-50)" : "transparent",
                    transition: "all 150ms ease",
                  }}
                >
                  {isChecked && (
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "var(--radius-full)",
                        backgroundColor: "var(--primary-inverse)",
                      }}
                    />
                  )}
                </span>
                <span className="truncate">{option.label}</span>
              </label>
            )
          }

          // single variant
          const isSelected = selectedValues.includes(option.value)
          return (
            <button
              key={option.value}
              type="button"
              className="flex items-center w-full text-left cursor-pointer transition-colors"
              style={{
                position: "absolute",
                top: 0,
                left: "var(--space-4)",
                right: "var(--space-4)",
                transform: `translateY(${virtualItem.start}px)`,
                height: `${virtualItem.size}px`,
                padding: "var(--space-4) var(--space-8)",
                borderRadius: "var(--radius-4)",
                fontSize: "var(--font-size-s)",
                color: isSelected ? "var(--primary-50)" : "var(--text-default)",
                backgroundColor: isSelected ? "var(--primary-20)" : "transparent",
                border: "none",
                fontWeight: isSelected
                  ? "var(--font-weight-prominent)"
                  : "var(--font-weight-regular)",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = "var(--surface-10)"
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = "transparent"
                }
              }}
              onClick={() => handleSingleSelect(option.value)}
            >
              <span className="truncate">{option.label}</span>
            </button>
          )
        })}
      </div>
    </ScrollArea>
  )
}

export function FilterPill({
  options,
  selectedValues,
  onChange,
  placeholder = "Select",
  variant = "multi-checkbox",
  className,
  disabled = false,
  enableVirtualization = false,
  virtualizationThreshold = 100,
  virtualizedHeight = 250,
  estimateItemSize = 28,
  overscan = 5,
}: FilterPillProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [tempSelected, setTempSelected] = useState<string[]>(selectedValues)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [debouncedQuery, setDebouncedQuery] = useState("")

  // Sync temp selections when popover opens
  useEffect(() => {
    if (open) {
      setTempSelected(selectedValues)
      setSearchQuery("")
      setDebouncedQuery("")
    }
  }, [open, selectedValues])

  // 300ms debounce for search
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(value)
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

  const hasSelection = selectedValues.length > 0

  // Build trigger label
  const triggerLabel = (() => {
    if (!hasSelection) return placeholder
    if (variant === "single" || variant === "single-radio") {
      const found = options.find((o) => o.value === selectedValues[0])
      return found?.label ?? placeholder
    }
    if (selectedValues.length === 1) {
      const found = options.find((o) => o.value === selectedValues[0])
      return found?.label ?? "1 selected"
    }
    const firstName = options.find((o) => o.value === selectedValues[0])?.label ?? selectedValues[0]
    return `${firstName} +${selectedValues.length - 1} more`
  })()

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange([])
  }

  const handleToggleCheckbox = (value: string) => {
    setTempSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  const handleRadioSelect = (value: string) => {
    setTempSelected([value])
  }

  const handleSingleSelect = (value: string) => {
    onChange([value])
    setOpen(false)
  }

  const handleApply = () => {
    onChange(tempSelected)
    setOpen(false)
  }

  const handleClearAll = () => {
    setTempSelected([])
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border transition-colors cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          style={{
            height: 24,
            padding: "0 var(--space-8)",
            fontSize: "var(--font-size-s)",
            lineHeight: "var(--line-height-s)",
            backgroundColor: hasSelection ? "var(--primary-10)" : "var(--surface-0)",
            borderColor: hasSelection ? "var(--primary-50)" : "var(--grey-40)",
            color: hasSelection ? "var(--text-default)" : "var(--text-subdued-1)",
          }}
          onMouseEnter={(e) => {
            if (!disabled && !hasSelection) {
              e.currentTarget.style.backgroundColor = "var(--surface-10)"
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled && !hasSelection) {
              e.currentTarget.style.backgroundColor = "var(--surface-0)"
            }
          }}
        >
          <span className="truncate max-w-[120px]">{triggerLabel}</span>
          {hasSelection ? (
            <X
              size={12}
              onClick={handleClear}
              className="shrink-0 cursor-pointer"
              style={{ color: "var(--text-subdued-1)" }}
            />
          ) : (
            <ChevronDown
              size={12}
              className="shrink-0"
              style={{ color: "var(--text-subdued-1)" }}
            />
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="p-0"
        style={{
          width: 240,
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-8)",
          border: "1px solid var(--grey-40)",
          boxShadow: "var(--shadow-medium)",
        }}
      >
        {/* Search input */}
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

        {/* Options list */}
        {enableVirtualization && filteredOptions.length >= virtualizationThreshold ? (
          <VirtualizedFilterList
            filteredOptions={filteredOptions}
            variant={variant}
            tempSelected={tempSelected}
            selectedValues={selectedValues}
            handleToggleCheckbox={handleToggleCheckbox}
            handleRadioSelect={handleRadioSelect}
            handleSingleSelect={handleSingleSelect}
            virtualizedHeight={virtualizedHeight}
            estimateItemSize={estimateItemSize}
            overscan={overscan}
          />
        ) : (
        <ScrollArea viewportClassName="max-h-[250px]">
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
              filteredOptions.map((option) => {
                if (variant === "multi-checkbox") {
                  const isChecked = tempSelected.includes(option.value)
                  return (
                    <label
                      key={option.value}
                      className="flex items-center cursor-pointer transition-colors"
                      style={{
                        padding: "var(--space-4) var(--space-8)",
                        borderRadius: "var(--radius-4)",
                        gap: "var(--space-8)",
                        fontSize: "var(--font-size-s)",
                        color: "var(--text-default)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "var(--surface-10)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent"
                      }}
                    >
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() => handleToggleCheckbox(option.value)}
                        className="shrink-0"
                      />
                      <span className="truncate">{option.label}</span>
                    </label>
                  )
                }

                if (variant === "single-radio") {
                  const isChecked = tempSelected.includes(option.value)
                  return (
                    <label
                      key={option.value}
                      className="flex items-center cursor-pointer transition-colors"
                      style={{
                        padding: "var(--space-4) var(--space-8)",
                        borderRadius: "var(--radius-4)",
                        gap: "var(--space-8)",
                        fontSize: "var(--font-size-s)",
                        color: "var(--text-default)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "var(--surface-10)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent"
                      }}
                      onClick={() => handleRadioSelect(option.value)}
                    >
                      {/* Custom radio circle */}
                      <span
                        className="flex items-center justify-center shrink-0"
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: "var(--radius-full)",
                          border: `2px solid ${isChecked ? "var(--primary-50)" : "var(--grey-40)"}`,
                          backgroundColor: isChecked ? "var(--primary-50)" : "transparent",
                          transition: "all 150ms ease",
                        }}
                      >
                        {isChecked && (
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "var(--radius-full)",
                              backgroundColor: "var(--primary-inverse)",
                            }}
                          />
                        )}
                      </span>
                      <span className="truncate">{option.label}</span>
                    </label>
                  )
                }

                // single variant
                const isSelected = selectedValues.includes(option.value)
                return (
                  <button
                    key={option.value}
                    type="button"
                    className="flex items-center w-full text-left cursor-pointer transition-colors"
                    style={{
                      padding: "var(--space-4) var(--space-8)",
                      borderRadius: "var(--radius-4)",
                      fontSize: "var(--font-size-s)",
                      color: isSelected ? "var(--primary-50)" : "var(--text-default)",
                      backgroundColor: isSelected ? "var(--primary-20)" : "transparent",
                      border: "none",
                      fontWeight: isSelected ? "var(--font-weight-prominent)" : "var(--font-weight-regular)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = "var(--surface-10)"
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = "transparent"
                      }
                    }}
                    onClick={() => handleSingleSelect(option.value)}
                  >
                    <span className="truncate">{option.label}</span>
                  </button>
                )
              })
            )}
          </div>
        </ScrollArea>
        )}

        {/* Footer for multi-checkbox and single-radio */}
        {(variant === "multi-checkbox" || variant === "single-radio") && (
          <div
            className="flex items-center justify-between"
            style={{
              padding: "var(--space-8)",
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
                padding: "var(--space-2) var(--space-12)",
                height: 24,
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
  )
}
