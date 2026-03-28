# Design System Monorepo

Multi-theme, PWA-enabled design system built with React 19, Tailwind CSS v4, and shadcn/ui. Uses Turborepo + Yarn workspaces for scalable team development.

## Tech Stack

- **React 19.2+** / TypeScript 5.9 / Vite 8
- **Tailwind CSS v4** with CSS-based `@theme` config
- **shadcn/ui** + Radix UI primitives
- **Turborepo** + Yarn workspaces (monorepo)
- **PWA** via vite-plugin-pwa + Workbox (offline support, installable)
- **3 themes**: Falcon, Phoenix, Jarvis (light/dark modes)

## Monorepo Structure

```
root/
├── apps/
│   └── web/                  # Main web app (PWA)
│       ├── src/
│       │   ├── App.tsx       # Routes
│       │   ├── main.tsx      # Entry point
│       │   ├── index.css     # App-specific CSS
│       │   ├── pages/        # 80+ component demo pages
│       │   └── components/   # App layout components
│       ├── index.html
│       ├── vite.config.ts
│       └── package.json
├── packages/
│   ├── ui/                   # 61 shared UI components (@repo/ui)
│   │   ├── src/
│   │   │   ├── button.tsx, card.tsx, ...
│   │   │   └── index.ts     # Barrel export
│   │   └── package.json
│   ├── theme/                # Design tokens CSS (@repo/theme)
│   │   ├── src/tokens.css
│   │   └── package.json
│   └── utils/                # Shared utilities (@repo/utils)
│       ├── src/cn.ts
│       └── package.json
├── scripts/
│   └── check-package.cjs     # Package security checker
├── turbo.json
├── tsconfig.base.json
└── package.json              # Workspace root
```

## Prerequisites

- **Node.js** >= 18
- **Yarn** 1.22.x (`npm install -g yarn` if not installed)

## Setup

```bash
# Clone the repo
git clone <repo-url>
cd agentic-frontend-template

# Install all workspace dependencies
yarn install
```

## Development

```bash
# Start dev server (runs through Turborepo)
yarn dev

# Build all packages + app
yarn build

# Lint all packages
yarn lint

# Check a package before installing
node scripts/check-package.cjs <package-name>
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Package Imports

```tsx
// UI components (barrel import)
import { Button, Card, Input, Dialog } from "@repo/ui"

// Type-only imports (required for interfaces)
import type { DropdownOption } from "@repo/ui"

// Utilities
import { cn } from "@repo/utils"

// Theme tokens (CSS import)
@import "@repo/theme/tokens.css";
```

## Adding a New Package

1. Create directory under `packages/`
2. Add `package.json` with `"name": "@repo/<name>"`
3. Export via `"exports"` field in package.json
4. Add as dependency in consuming packages: `"@repo/<name>": "*"`
5. Run `yarn install` from root

## Adding UI Components

```bash
# Add a shadcn/ui component (run from apps/web)
cd apps/web
npx shadcn@latest add <component-name>
# Then move the generated file to packages/ui/src/
# Update packages/ui/src/index.ts barrel export
```

## PWA

The app is a Progressive Web App with:
- Offline support via Workbox service worker
- Auto-update with reload prompt
- Installable on desktop and mobile
- Google Fonts caching

PWA config is in `apps/web/vite.config.ts` (VitePWA plugin).

## Design Tokens

Three themes (Falcon, Phoenix, Jarvis) with light/dark modes. Tokens are CSS custom properties defined in `packages/theme/src/tokens.css`:

```css
var(--primary-50)     /* Primary brand color */
var(--surface-0)      /* Background surface */
var(--text-default)   /* Default text color */
var(--space-16)       /* Spacing scale */
var(--radius-8)       /* Border radius */
```

## License

MIT
