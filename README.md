# shadcn/ui Components Template

A modern, production-ready React template featuring a complete shadcn/ui component library showcase with dark mode support.

## Features

- ⚡ **Vite** - Fast build tool and dev server
- ⚛️ **React 18** - Latest React with TypeScript
- 🎨 **shadcn/ui** - Beautiful, accessible component library
- 🌗 **Dark Mode** - Built-in theme toggle with system preference detection
- 📱 **Responsive** - Mobile-friendly layout with sidebar navigation
- 🎯 **TypeScript** - Full type safety
- 🎭 **Tailwind CSS** - Utility-first styling
- 🧭 **React Router** - Client-side routing

## Component Library

This template includes all major shadcn/ui components:

- **Layout**: Card, Separator, Aspect Ratio, Resizable
- **Forms**: Input, Textarea, Checkbox, Radio, Select, Switch, Slider
- **Navigation**: Tabs, Breadcrumb, Navigation Menu, Menubar, Pagination
- **Feedback**: Alert, Toast (Sonner), Progress, Skeleton
- **Overlays**: Dialog, Sheet, Drawer, Popover, Tooltip, Hover Card
- **Data Display**: Table, Calendar, Badge, Avatar, Scroll Area
- **Interactive**: Button, Toggle, Accordion, Collapsible, Carousel, Command

## Getting Started

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Start dev server
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) to view the component showcase.

### Build

```bash
# Build for production
npm run build
# or
yarn build
```

### Preview Production Build

```bash
# Preview production build
npm run preview
# or
yarn preview
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── components-layout.tsx
│   ├── sidebar-nav.tsx
│   └── theme-toggle.tsx
├── pages/
│   └── components/      # Component demo pages
├── lib/
│   └── utils.ts         # Utility functions
├── App.tsx              # Router configuration
└── main.tsx             # App entry point
```

## Customization

### Theme Colors

Modify theme colors in [src/index.css](src/index.css):

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  /* ... */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* ... */
}
```

### Adding New Components

```bash
# Add a new shadcn/ui component
npx shadcn@latest add [component-name]
```

## Tech Stack

- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives
- [React Router](https://reactrouter.com/) - Routing
- [Lucide React](https://lucide.dev/) - Icons

## License

MIT
