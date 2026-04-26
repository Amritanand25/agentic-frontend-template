---
name: test-master
description: Testing with 90%+ coverage using Vitest + React Testing Library + MSW. Use after writing code or when coverage drops.
allowed-tools: Read Edit Write Bash Grep Glob
paths:
  - "**/*.test.ts"
  - "**/*.test.tsx"
  - "**/__tests__/**/*"
---

# Test Master

## Coverage Targets

| Code Type   | Target   |
| ----------- | -------- |
| Features    | 90%+     |
| Utils       | 90%+     |
| Hooks       | 85%+     |
| Components  | 80%+     |
| Pages       | 70%+     |
| **Overall** | **90%+** |

**Test pyramid:** 60% unit, 30% component, 10% integration

## File Structure

```
features/{name}/
├── __tests__/
│   ├── api.test.ts          # API calls
│   ├── hooks.test.ts        # Custom hooks
│   ├── {component}.test.tsx # Components
│   └── integration.test.tsx # Feature flows
```

## Key Patterns

- **Hooks:** `renderHook` + QueryClient wrapper with `retry: false`
- **Components:** `render` + `screen.getByRole`/`getByText` + `fireEvent`/`userEvent`
- **API mocking:** MSW handlers in `test/mocks/handlers.ts`, override per test with `server.use()`
- **Accessibility:** `expect(await axe(container)).toHaveNoViolations()`
- **Naming:** `it('renders user information correctly')` — descriptive, behavior-focused

> See [references/component-testing-example.md](./references/component-testing-example.md) for setup + examples

## Commands

```bash
yarn test              # Run all
yarn test:coverage     # Coverage report
yarn test:watch        # Watch mode
```
