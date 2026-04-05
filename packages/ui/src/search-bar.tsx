import * as React from "react";
import { cn } from "@repo/utils";
import { Search, X } from "lucide-react";

interface SearchBarProps extends Omit<
  React.ComponentProps<"input">,
  "type" | "onChange"
> {
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
}

function SearchBar({
  className,
  value,
  onChange,
  onClear,
  placeholder = "Search...",
  ...props
}: SearchBarProps) {
  const hasValue = value !== undefined ? value.length > 0 : false;

  return (
    <div
      className={cn("relative inline-flex items-center", className)}
      style={{ minWidth: 200 }}
    >
      <Search
        size={16}
        style={{
          position: "absolute",
          left: "var(--space-12)",
          color: "var(--text-subdued-2)",
          pointerEvents: "none",
        }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full"
        style={{
          height: "var(--height-s)",
          paddingLeft: "var(--space-32)",
          paddingRight: hasValue ? "var(--space-32)" : "var(--space-12)",
          fontSize: "var(--font-size-s)",
          fontFamily: "var(--font-sans)",
          color: "var(--text-default)",
          backgroundColor: "var(--surface-0)",
          border: "1px solid var(--grey-40)",
          borderRadius: "var(--radius-8)",
          outline: "none",
          transition: "border-color 150ms ease, box-shadow 150ms ease",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--primary-50)";
          e.currentTarget.style.boxShadow = "0 0 0 3px var(--primary-20)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--grey-40)";
          e.currentTarget.style.boxShadow = "none";
        }}
        {...props}
      />
      {hasValue && (
        <button
          type="button"
          onClick={() => {
            onChange?.("");
            onClear?.();
          }}
          style={{
            position: "absolute",
            right: "var(--space-8)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 20,
            height: 20,
            borderRadius: "var(--radius-full)",
            border: "none",
            background: "var(--grey-20)",
            color: "var(--text-subdued-1)",
            cursor: "pointer",
            transition: "background-color 150ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--grey-30)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--grey-20)";
          }}
          aria-label="Clear search"
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
}

export { SearchBar };
export type { SearchBarProps };
