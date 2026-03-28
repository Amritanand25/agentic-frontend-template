# Complex Dropdown Component Example

This example shows how to build a complex dropdown using compound components pattern.

## File: `packages/ui/src/dropdown.tsx`

```tsx
import {
  createContext,
  useContext,
  useState,
  useMemo,
  memo,
  useRef,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@repo/utils";

// Context for shared state between compound components
interface DropdownContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string | null;
  setValue: (value: string) => void;
}

const DropdownContext = createContext<DropdownContextType | null>(null);

function useDropdownContext() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown components must be used within Dropdown");
  }
  return context;
}

// Main Dropdown component
interface DropdownProps {
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function Dropdown({
  children,
  defaultValue,
  value: controlledValue,
  onChange,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | null>(
    defaultValue ?? null,
  );

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleSetValue = (newValue: string) => {
    if (!isControlled) setInternalValue(newValue);
    onChange?.(newValue);
  };

  const contextValue = useMemo(
    () => ({ open, setOpen, value, setValue: handleSetValue }),
    [open, value],
  );

  return (
    <DropdownContext.Provider value={contextValue}>
      <div className="relative w-full">{children}</div>
    </DropdownContext.Provider>
  );
}

// Trigger button
Dropdown.Trigger = memo(function DropdownTrigger({
  children,
  placeholder = "Select...",
}: {
  children?: React.ReactNode;
  placeholder?: string;
}) {
  const { open, setOpen, value } = useDropdownContext();
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => setOpen(!open)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen(!open);
        }
      }}
      aria-expanded={open}
      aria-haspopup="listbox"
      className={cn(
        "flex items-center justify-between w-full gap-2",
        "h-10 px-3 rounded-lg border transition-colors",
        "bg-surface-0",
        open ? "border-primary-60" : "border-grey-40 hover:border-grey-60",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-60",
      )}
    >
      <span className={cn(!value && "text-text-subdued-1")}>
        {children || value || placeholder}
      </span>
      <ChevronDown
        className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
      />
    </button>
  );
});

// Menu/List container
Dropdown.Menu = memo(function DropdownMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open, setOpen } = useDropdownContext();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, setOpen]);

  if (!open) return null;

  return createPortal(
    <div
      ref={menuRef}
      role="listbox"
      className={cn(
        "absolute z-50 mt-1",
        "min-w-[200px] max-h-[300px] overflow-y-auto",
        "rounded-lg bg-surface-0 shadow-lg border border-grey-40",
        "p-1",
      )}
    >
      {children}
    </div>,
    document.body,
  );
});

// Individual menu item
interface DropdownItemProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
}

Dropdown.Item = memo(function DropdownItem({
  value,
  children,
  disabled,
}: DropdownItemProps) {
  const { setValue, setOpen, value: selectedValue } = useDropdownContext();
  const isSelected = value === selectedValue;

  const handleSelect = () => {
    if (disabled) return;
    setValue(value);
    setOpen(false);
  };

  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled}
      onClick={handleSelect}
      disabled={disabled}
      className={cn(
        "w-full flex items-center justify-between px-3 py-2 text-left rounded-lg transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-60",
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-primary-20 cursor-pointer",
        isSelected && "bg-primary-10 text-primary-60",
      )}
    >
      {children}
      {isSelected && <Check className="h-4 w-4 text-primary-60" />}
    </button>
  );
});
```

## Usage Examples

```tsx
import { Dropdown } from "@repo/ui";

// Uncontrolled dropdown
function UncontrolledExample() {
  return (
    <Dropdown defaultValue="option1">
      <Dropdown.Trigger>Select option</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item value="option1">Option 1</Dropdown.Item>
        <Dropdown.Item value="option2">Option 2</Dropdown.Item>
        <Dropdown.Item value="option3">Option 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

// Controlled dropdown
function ControlledExample() {
  const [value, setValue] = useState("");

  return (
    <Dropdown value={value} onChange={setValue}>
      <Dropdown.Trigger>{value || "Choose..."}</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item value="red">Red</Dropdown.Item>
        <Dropdown.Item value="green">Green</Dropdown.Item>
        <Dropdown.Item value="blue">Blue</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

// With disabled items
function WithDisabledItems() {
  return (
    <Dropdown>
      <Dropdown.Trigger placeholder="Select status" />
      <Dropdown.Menu>
        <Dropdown.Item value="active">Active</Dropdown.Item>
        <Dropdown.Item value="pending" disabled>
          Pending (Coming Soon)
        </Dropdown.Item>
        <Dropdown.Item value="inactive">Inactive</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

// Dynamic options from API
function DynamicDropdown() {
  const { data: users, isLoading } = useUsers();

  if (isLoading) return <div>Loading...</div>;

  return (
    <Dropdown>
      <Dropdown.Trigger placeholder="Select user" />
      <Dropdown.Menu>
        {users?.map((user) => (
          <Dropdown.Item key={user.id} value={user.id}>
            {user.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
```

## Key Patterns Used

1. **Compound Components** - Related components share state via context
2. **Controlled & Uncontrolled** - Supports both modes
3. **Portal** - Menu renders in `document.body` to avoid z-index issues
4. **Focus Management** - Keyboard navigation (Enter, Space, Escape)
5. **Click Outside** - Closes menu when clicking outside
6. **Accessibility** - Full ARIA support (role, aria-expanded, aria-selected)
7. **Memoization** - `memo()` to prevent unnecessary re-renders

## When to Use Compound Components

- ✅ Component has multiple related parts (Trigger, Menu, Item)
- ✅ Parts need to share state (open/closed, selected value)
- ✅ Want flexible composition
- ✅ Want to avoid prop drilling

## Examples: Other Components Using This Pattern

- **Tabs**: `<Tabs>`, `<Tabs.List>`, `<Tabs.Trigger>`, `<Tabs.Content>`
- **Accordion**: `<Accordion>`, `<Accordion.Item>`, `<Accordion.Trigger>`, `<Accordion.Content>`
- **Dialog/Modal**: `<Dialog>`, `<Dialog.Trigger>`, `<Dialog.Content>`, `<Dialog.Close>`
- **Radio Group**: `<RadioGroup>`, `<RadioGroup.Item>`
