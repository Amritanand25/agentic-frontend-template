import * as React from "react"
import { HelpCircle } from "lucide-react"
import { cn } from "@repo/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip.tsx"

export interface InputLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
  helperText?: string
  disabled?: boolean
}

const InputLabel = React.forwardRef<HTMLLabelElement, InputLabelProps>(
  ({ children, required, helperText, disabled, className, ...props }, ref) => {
    if (!children) return null

    return (
      <div className={cn("inline-flex items-center", className)} style={{ gap: "var(--space-4)" }}>
        <label
          ref={ref}
          style={{
            fontSize: "var(--font-size-m)",
            fontWeight: "var(--font-weight-prominent)",
            color: disabled ? "var(--text-subdued-2)" : "var(--text-default)",
            lineHeight: "var(--line-height-m)",
          }}
          {...props}
        >
          {children}
          {required && (
            <span style={{ color: "var(--error-50)", marginLeft: 2 }}>*</span>
          )}
        </label>
        {helperText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle
                  size={16}
                  className="cursor-help shrink-0"
                  style={{ color: "var(--text-subdued-2)" }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{helperText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    )
  }
)
InputLabel.displayName = "InputLabel"

export { InputLabel }
