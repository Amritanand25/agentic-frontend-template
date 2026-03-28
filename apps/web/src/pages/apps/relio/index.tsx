import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
} from "@repo/ui";
import {
  Database,
  LayoutDashboard,
  MessageSquare,
  Workflow,
  Search,
  Users,
  Shield,
} from "lucide-react";

export default function RelioHomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--surface-10)]">
      {/* Header */}
      <header
        className="border-b sticky top-0 z-10"
        style={{
          backgroundColor: "var(--surface-0)",
          borderColor: "var(--grey-40)",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: "var(--secondary-10)" }}
            >
              <Database size={24} style={{ color: "var(--secondary-50)" }} />
            </div>
            <div>
              <h1
                className="text-xl font-semibold"
                style={{ color: "var(--text-default)" }}
              >
                Relio CRM
              </h1>
              <p className="text-xs" style={{ color: "var(--text-subdued-1)" }}>
                Modern, customizable CRM platform
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              Documentation
            </Button>
            <Button size="sm" onClick={() => navigate("/login")}>
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h2
            className="text-4xl font-semibold mb-4"
            style={{ color: "var(--text-default)" }}
          >
            Welcome to Relio CRM
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-subdued-1)" }}
          >
            A flexible, data-first CRM that adapts to your business model.
            Create custom databases, manage conversations, and automate
            workflows — all without writing code.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Data Table */}
          <Card
            style={{
              backgroundColor: "var(--surface-0)",
              border: "1px solid var(--grey-40)",
            }}
          >
            <CardHeader>
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: "var(--primary-10)" }}
              >
                <LayoutDashboard
                  size={24}
                  style={{ color: "var(--primary-50)" }}
                />
              </div>
              <CardTitle style={{ color: "var(--text-default)" }}>
                Data Tables
              </CardTitle>
              <CardDescription style={{ color: "var(--text-subdued-1)" }}>
                Virtualized, editable tables with 12+ field types, inline
                editing, and advanced filtering
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Database Builder */}
          <Card
            style={{
              backgroundColor: "var(--surface-0)",
              border: "1px solid var(--grey-40)",
            }}
          >
            <CardHeader>
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: "var(--secondary-10)" }}
              >
                <Database size={24} style={{ color: "var(--secondary-50)" }} />
              </div>
              <CardTitle style={{ color: "var(--text-default)" }}>
                Database Builder
              </CardTitle>
              <CardDescription style={{ color: "var(--text-subdued-1)" }}>
                Create custom objects and fields with drag-and-drop. Build your
                perfect data model
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Conversations */}
          <Card
            style={{
              backgroundColor: "var(--surface-0)",
              border: "1px solid var(--grey-40)",
            }}
          >
            <CardHeader>
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: "var(--tertiary-10)" }}
              >
                <MessageSquare
                  size={24}
                  style={{ color: "var(--tertiary-50)" }}
                />
              </div>
              <CardTitle style={{ color: "var(--text-default)" }}>
                Conversations
              </CardTitle>
              <CardDescription style={{ color: "var(--text-subdued-1)" }}>
                Unified inbox for WhatsApp, Email, and Instagram with real-time
                updates
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Workflow Automation */}
          <Card
            style={{
              backgroundColor: "var(--surface-0)",
              border: "1px solid var(--grey-40)",
            }}
          >
            <CardHeader>
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: "var(--success-10)" }}
              >
                <Workflow size={24} style={{ color: "var(--success-50)" }} />
              </div>
              <CardTitle style={{ color: "var(--text-default)" }}>
                Workflows
              </CardTitle>
              <CardDescription style={{ color: "var(--text-subdued-1)" }}>
                Visual automation builder with triggers, conditions, and actions
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Search & Filters */}
          <Card
            style={{
              backgroundColor: "var(--surface-0)",
              border: "1px solid var(--grey-40)",
            }}
          >
            <CardHeader>
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: "var(--warning-10)" }}
              >
                <Search size={24} style={{ color: "var(--warning-50)" }} />
              </div>
              <CardTitle style={{ color: "var(--text-default)" }}>
                Search & Filters
              </CardTitle>
              <CardDescription style={{ color: "var(--text-subdued-1)" }}>
                Global search (⌘K), advanced filters, and saved views
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Collaboration */}
          <Card
            style={{
              backgroundColor: "var(--surface-0)",
              border: "1px solid var(--grey-40)",
            }}
          >
            <CardHeader>
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: "var(--primary-10)" }}
              >
                <Users size={24} style={{ color: "var(--primary-50)" }} />
              </div>
              <CardTitle style={{ color: "var(--text-default)" }}>
                Collaboration
              </CardTitle>
              <CardDescription style={{ color: "var(--text-subdued-1)" }}>
                Comments, @mentions, activity timeline, and team collaboration
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Coming Soon Banner */}
        <Card
          className="border-2"
          style={{
            backgroundColor: "var(--primary-10)",
            borderColor: "var(--primary-50)",
          }}
        >
          <CardContent className="py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--primary-50)" }}
                >
                  <Shield size={32} style={{ color: "var(--text-inverse)" }} />
                </div>
                <div>
                  <h3
                    className="text-xl font-semibold mb-1"
                    style={{ color: "var(--text-default)" }}
                  >
                    Coming Soon
                  </h3>
                  <p style={{ color: "var(--text-subdued-1)" }}>
                    Relio CRM is currently under development. Check out the{" "}
                    <a
                      href="/docs/specs/relio"
                      className="underline font-medium"
                      style={{ color: "var(--primary-50)" }}
                    >
                      detailed specs
                    </a>{" "}
                    to see what we're building.
                  </p>
                </div>
              </div>
              <Button size="lg">View Specs</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer
        className="border-t mt-16"
        style={{
          backgroundColor: "var(--surface-0)",
          borderColor: "var(--grey-40)",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4
                className="font-semibold mb-3"
                style={{ color: "var(--text-default)" }}
              >
                About Relio
              </h4>
              <p className="text-sm" style={{ color: "var(--text-subdued-1)" }}>
                Modern, customizable CRM platform built with React 19,
                TypeScript, and Tailwind CSS v4.
              </p>
            </div>
            <div>
              <h4
                className="font-semibold mb-3"
                style={{ color: "var(--text-default)" }}
              >
                Resources
              </h4>
              <ul
                className="space-y-2 text-sm"
                style={{ color: "var(--text-subdued-1)" }}
              >
                <li>
                  <a href="#" className="hover:underline">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Specifications
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Design System
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4
                className="font-semibold mb-3"
                style={{ color: "var(--text-default)" }}
              >
                Tech Stack
              </h4>
              <ul
                className="space-y-2 text-sm"
                style={{ color: "var(--text-subdued-1)" }}
              >
                <li>React 19 + TypeScript</li>
                <li>Vite 8 + Tailwind v4</li>
                <li>Zustand + TanStack Query</li>
                <li>shadcn/ui (61+ components)</li>
              </ul>
            </div>
          </div>
          <div
            className="mt-8 pt-8 text-center text-sm border-t"
            style={{
              borderColor: "var(--grey-40)",
              color: "var(--text-subdued-2)",
            }}
          >
            © 2026 Relio CRM. Built with ❤️ using the component library.
          </div>
        </div>
      </footer>
    </div>
  );
}
