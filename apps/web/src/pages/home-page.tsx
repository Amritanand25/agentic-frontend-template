import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@repo/ui";
import { Palette, Database, Wheat, ArrowRight } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--surface-10)] flex flex-col items-center justify-center p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1
          className="text-5xl font-semibold mb-4"
          style={{ color: "var(--text-default)" }}
        >
          Welcome to the Platform
        </h1>
        <p className="text-lg" style={{ color: "var(--text-subdued-1)" }}>
          Choose your destination
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {/* Design System Card */}
        <Card
          className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group"
          onClick={() => navigate("/components")}
          style={{
            backgroundColor: "var(--surface-0)",
            border: "1px solid var(--grey-40)",
          }}
        >
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: "var(--primary-10)" }}
              >
                <Palette size={32} style={{ color: "var(--primary-50)" }} />
              </div>
            </div>
            <CardTitle
              className="text-2xl"
              style={{ color: "var(--text-default)" }}
            >
              Design System
            </CardTitle>
            <CardDescription style={{ color: "var(--text-subdued-1)" }}>
              Explore 61+ UI components, data grids, and charts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div
                className="flex items-center gap-2"
                style={{ color: "var(--text-subdued-1)" }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--primary-50)" }}
                />
                <span className="text-sm">shadcn/ui components</span>
              </div>
              <div
                className="flex items-center gap-2"
                style={{ color: "var(--text-subdued-1)" }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--primary-50)" }}
                />
                <span className="text-sm">Data grids & tables</span>
              </div>
              <div
                className="flex items-center gap-2"
                style={{ color: "var(--text-subdued-1)" }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--primary-50)" }}
                />
                <span className="text-sm">Chart visualizations</span>
              </div>
              <div
                className="flex items-center gap-2"
                style={{ color: "var(--text-subdued-1)" }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--primary-50)" }}
                />
                <span className="text-sm">Design tokens & themes</span>
              </div>
            </div>
            <div
              className="mt-6 flex items-center gap-2 font-medium group-hover:gap-3 transition-all"
              style={{ color: "var(--primary-50)" }}
            >
              <span>Explore Components</span>
              <ArrowRight size={16} />
            </div>
          </CardContent>
        </Card>

        {/* Relio CRM Card */}
        <Card
          className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group"
          onClick={() => navigate("/login")}
          style={{
            backgroundColor: "var(--surface-0)",
            border: "1px solid var(--grey-40)",
          }}
        >
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: "var(--secondary-10)" }}
              >
                <Database size={32} style={{ color: "var(--secondary-50)" }} />
              </div>
            </div>
            <CardTitle
              className="text-2xl"
              style={{ color: "var(--text-default)" }}
            >
              Relio CRM
            </CardTitle>
            <CardDescription style={{ color: "var(--text-subdued-1)" }}>
              Modern, customizable CRM platform with flexible data models
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div
                className="flex items-center gap-2"
                style={{ color: "var(--text-subdued-1)" }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--secondary-50)" }}
                />
                <span className="text-sm">Custom database builder</span>
              </div>
              <div
                className="flex items-center gap-2"
                style={{ color: "var(--text-subdued-1)" }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--secondary-50)" }}
                />
                <span className="text-sm">Unified conversations</span>
              </div>
              <div
                className="flex items-center gap-2"
                style={{ color: "var(--text-subdued-1)" }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--secondary-50)" }}
                />
                <span className="text-sm">Visual workflow automation</span>
              </div>
              <div
                className="flex items-center gap-2"
                style={{ color: "var(--text-subdued-1)" }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--secondary-50)" }}
                />
                <span className="text-sm">Multi-tenant architecture</span>
              </div>
            </div>
            <div
              className="mt-6 flex items-center gap-2 font-medium group-hover:gap-3 transition-all"
              style={{ color: "var(--secondary-50)" }}
            >
              <span>Launch Relio</span>
              <ArrowRight size={16} />
            </div>
          </CardContent>
        </Card>
        {/* Granary Card */}
        <Card
          className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group"
          onClick={() => navigate("/granary/home")}
          style={{
            backgroundColor: "var(--surface-0)",
            border: "1px solid var(--grey-40)",
          }}
        >
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: "var(--tertiary-10)" }}
              >
                <Wheat size={32} style={{ color: "var(--tertiary-50)" }} />
              </div>
            </div>
            <CardTitle
              className="text-2xl"
              style={{ color: "var(--text-default)" }}
            >
              Granary
            </CardTitle>
            <CardDescription style={{ color: "var(--text-subdued-1)" }}>
              Grocery planning dashboard with assortment intelligence and
              forecasting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div
                className="flex items-center gap-2"
                style={{ color: "var(--text-subdued-1)" }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--tertiary-50)" }}
                />
                <span className="text-sm">Assortment Intelligence</span>
              </div>
              <div
                className="flex items-center gap-2"
                style={{ color: "var(--text-subdued-1)" }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--tertiary-50)" }}
                />
                <span className="text-sm">Demand Forecasting</span>
              </div>
              <div
                className="flex items-center gap-2"
                style={{ color: "var(--text-subdued-1)" }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--tertiary-50)" }}
                />
                <span className="text-sm">Inventory Planning</span>
              </div>
              <div
                className="flex items-center gap-2"
                style={{ color: "var(--text-subdued-1)" }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--tertiary-50)" }}
                />
                <span className="text-sm">Performance Dashboard</span>
              </div>
            </div>
            <div
              className="mt-6 flex items-center gap-2 font-medium group-hover:gap-3 transition-all"
              style={{ color: "var(--tertiary-50)" }}
            >
              <span>Launch Granary</span>
              <ArrowRight size={16} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="mt-16 text-center">
        <p className="text-sm" style={{ color: "var(--text-subdued-2)" }}>
          Built with React 19 + TypeScript + Vite + Tailwind v4
        </p>
      </div>
    </div>
  );
}
