# Simple Button Component Example

This example shows how to build a production-ready button component using the Component Builder skill.

## File: `packages/ui/src/button.tsx`

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@repo/utils";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";

// CVA Variants - defines all button styles
const buttonVariants = cva(
  // Base styles (always applied)
  "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-60 disabled:pointer-events-none disabled:opacity-30 rounded-full",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-50 text-white hover:bg-primary-40 active:bg-primary-60",
        secondary:
          "border border-grey-40 text-primary-60 hover:bg-primary-20 active:bg-primary-30",
        tertiary:
          "text-primary-60 hover:underline hover:text-primary-50 active:text-primary-70",
      },
      size: {
        xs: "h-6 px-2 text-xs gap-1",
        s: "h-8 px-3 text-sm gap-1",
        m: "h-10 px-4 text-sm gap-2",
        l: "h-12 px-5 text-base gap-2",
        xl: "h-16 px-8 text-2xl gap-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "m",
    },
  },
);

// TypeScript interface
export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

// Component implementation
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant, size, isLoading, children, className, disabled, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
```

## Usage Examples

```tsx
import { Button } from "@repo/ui";
import { Save, Trash } from "lucide-react";

function MyPage() {
  return (
    <div>
      {/* Primary button - default */}
      <Button>Click me</Button>

      {/* Secondary variant, large size */}
      <Button variant="secondary" size="l">
        Cancel
      </Button>

      {/* With icon */}
      <Button>
        <Save className="h-4 w-4" />
        Save Changes
      </Button>

      {/* Loading state */}
      <Button isLoading>Saving...</Button>

      {/* Disabled */}
      <Button disabled>Not Available</Button>

      {/* Custom className */}
      <Button className="w-full">Full Width</Button>

      {/* Click handler */}
      <Button onClick={() => alert("Clicked!")}>Alert</Button>
    </div>
  );
}
```

## Key Patterns Used

1. **CVA (Class Variance Authority)** - Type-safe variants
2. **Design Tokens** - `var(--primary-50)`, `var(--space-*)` in Tailwind config
3. **forwardRef** - For ref support
4. **Accessibility** - `aria-busy` for loading state
5. **Loading State** - Built-in spinner from Lucide
6. **TypeScript** - Full type safety with `VariantProps`

## Test Example

```tsx
// button.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("shows loading state", () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("applies variants correctly", () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-primary-50");

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole("button")).toHaveClass("border-grey-40");
  });
});
```

## When to Use This Pattern

- ✅ Creating any button component
- ✅ Need multiple variants (primary, secondary, tertiary)
- ✅ Need multiple sizes (xs, s, m, l, xl)
- ✅ Need loading states
- ✅ Need consistent styling across the app
- ✅ Want type-safe props

## Related Patterns

- For icon-only buttons, create an `IconButton` variant
- For button groups, wrap in a `ButtonGroup` component
- For split buttons, combine with `Dropdown` component
