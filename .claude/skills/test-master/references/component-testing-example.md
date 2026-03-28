# Component Testing Example

This example shows how to write comprehensive tests for React components with 90%+ coverage.

## Test Setup

### File: `vitest.config.ts`

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/mockData",
        "dist/",
      ],
      lines: 90,
      functions: 90,
      branches: 90,
      statements: 90,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

### File: `apps/web/src/test/setup.ts`

```typescript
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
```

## Example: Testing a Button Component

### File: `src/components/ui/button.test.tsx`

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { Button } from "./button";

expect.extend(toHaveNoViolations);

describe("Button", () => {
  describe("Rendering", () => {
    it("renders children correctly", () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole("button")).toHaveTextContent("Click me");
    });

    it("renders with custom className", () => {
      render(<Button className="custom-class">Button</Button>);
      expect(screen.getByRole("button")).toHaveClass("custom-class");
    });
  });

  describe("Variants", () => {
    it("renders primary variant by default", () => {
      render(<Button>Primary</Button>);
      expect(screen.getByRole("button")).toHaveClass("bg-primary-50");
    });

    it("renders secondary variant", () => {
      render(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByRole("button")).toHaveClass("border-grey-40");
    });

    it("renders tertiary variant", () => {
      render(<Button variant="tertiary">Tertiary</Button>);
      expect(screen.getByRole("button")).toHaveClass("text-primary-60");
    });
  });

  describe("Sizes", () => {
    it("renders medium size by default", () => {
      render(<Button>Medium</Button>);
      expect(screen.getByRole("button")).toHaveClass("h-10");
    });

    it("renders all size variants", () => {
      const { rerender } = render(<Button size="xs">XS</Button>);
      expect(screen.getByRole("button")).toHaveClass("h-6");

      rerender(<Button size="s">S</Button>);
      expect(screen.getByRole("button")).toHaveClass("h-8");

      rerender(<Button size="l">L</Button>);
      expect(screen.getByRole("button")).toHaveClass("h-12");

      rerender(<Button size="xl">XL</Button>);
      expect(screen.getByRole("button")).toHaveClass("h-16");
    });
  });

  describe("States", () => {
    it("handles disabled state", () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveClass("opacity-30");
    });

    it("handles loading state", () => {
      render(<Button isLoading>Loading</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("aria-busy", "true");
      expect(
        screen.getByRole("button").querySelector("svg"),
      ).toBeInTheDocument();
    });

    it("disables button when loading even if not explicitly disabled", () => {
      render(<Button isLoading>Loading</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });
  });

  describe("Interactions", () => {
    it("handles click events", () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", () => {
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} disabled>
          Click me
        </Button>,
      );

      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("does not call onClick when loading", () => {
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} isLoading>
          Click me
        </Button>,
      );

      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("has no accessibility violations", async () => {
      const { container } = render(<Button>Accessible Button</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has proper role", () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("sets aria-busy when loading", () => {
      render(<Button isLoading>Loading</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
    });
  });

  describe("Ref forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = vi.fn();
      render(<Button ref={ref}>Button</Button>);
      expect(ref).toHaveBeenCalled();
    });
  });

  describe("HTML attributes", () => {
    it("passes through native button attributes", () => {
      render(
        <Button type="submit" name="submit-btn">
          Submit
        </Button>,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
      expect(button).toHaveAttribute("name", "submit-btn");
    });
  });
});
```

## Example: Testing a Form Component

### File: `src/components/ui/input.test.tsx`

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./input";

describe("Input", () => {
  it("renders with placeholder", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("handles value changes", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Input onChange={handleChange} />);
    const input = screen.getByRole("textbox");

    await user.type(input, "Hello");
    expect(handleChange).toHaveBeenCalledTimes(5); // Once per character
  });

  it("shows error state", () => {
    render(<Input error="This field is required" />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      "This field is required",
    );
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("handles disabled state", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("handles required attribute", () => {
    render(<Input required />);
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-required",
      "true",
    );
  });
});
```

## Example: Testing a Component with API

### File: `apps/web/src/features/users/components/user-list.test.tsx`

```tsx
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserList } from "./user-list";
import { server } from "@/test/mocks/server";
import { http, HttpResponse } from "msw";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("UserList", () => {
  beforeEach(() => {
    // Reset query cache before each test
    new QueryClient().clear();
  });

  it("shows loading state initially", () => {
    render(<UserList />, { wrapper: createWrapper() });
    expect(screen.getByText("Loading users...")).toBeInTheDocument();
  });

  it("renders users after loading", async () => {
    render(<UserList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });
  });

  it("shows error message on failure", async () => {
    // Mock API error
    server.use(
      http.get("/api/users", () => {
        return HttpResponse.json({ message: "Server error" }, { status: 500 });
      }),
    );

    render(<UserList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText(/Error loading users/i)).toBeInTheDocument();
    });
  });

  it("shows empty state when no users", async () => {
    server.use(
      http.get("/api/users", () => {
        return HttpResponse.json([]);
      }),
    );

    render(<UserList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText("No users found")).toBeInTheDocument();
    });
  });
});
```

## MSW Setup for API Mocking

### File: `apps/web/src/test/mocks/handlers.ts`

```typescript
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/users", () => {
    return HttpResponse.json([
      { id: "1", name: "John Doe", email: "john@example.com" },
      { id: "2", name: "Jane Smith", email: "jane@example.com" },
    ]);
  }),

  http.get("/api/users/:id", ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      name: "John Doe",
      email: "john@example.com",
    });
  }),

  http.post("/api/users", async ({ request }) => {
    const data = await request.json();
    return HttpResponse.json({ id: "3", ...data }, { status: 201 });
  }),
];
```

### File: `apps/web/src/test/mocks/server.ts`

```typescript
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
```

### File: `apps/web/src/test/setup.ts` (updated)

```typescript
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, afterAll } from "vitest";
import { server } from "./mocks/server";

// Start MSW server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Reset handlers after each test
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

// Close MSW server after all tests
afterAll(() => server.close());
```

## Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test button.test.tsx

# Run tests matching pattern
yarn test --grep "Button"
```

## Coverage Requirements

Target: **90%+ coverage** across all metrics

```
File                  | % Stmts | % Branch | % Funcs | % Lines |
button.tsx            |   95.23 |    91.66 |   100.0 |   95.23 |
input.tsx             |   92.85 |    88.88 |   100.0 |   92.85 |
user-list.tsx         |   90.00 |    85.71 |   100.0 |   90.00 |
------------------------+----------+----------+---------+---------+
All files             |   92.69 |    88.75 |   100.0 |   92.69 |
```

## Best Practices

✅ **Test behavior, not implementation**
✅ **Use screen queries (getByRole, getByText)**
✅ **Mock API calls with MSW**
✅ **Test accessibility with jest-axe**
✅ **Test all variants and states**
✅ **Test user interactions**
✅ **Test error scenarios**
✅ **90%+ coverage target**
