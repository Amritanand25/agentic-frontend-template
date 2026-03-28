import { useTheme } from "@/contexts/theme-context"
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Zap,
  Layers,
  Paintbrush,
  Type,
  Box,
  ArrowRight,
} from "lucide-react"
import { Button, Badge, Input, Label, Switch, Progress } from "@repo/ui"

const primaryShades = [10, 20, 30, 40, 50, 60, 70, 80] as const
const feedbackColors = [
  { name: "Success", token: "success", icon: CheckCircle },
  { name: "Warning", token: "warning", icon: AlertTriangle },
  { name: "Error", token: "error", icon: XCircle },
] as const

const typographyScale = [
  { name: "Display XS", size: "var(--font-size-3xl)", lineHeight: "var(--line-height-3xl)", weight: "var(--font-weight-prominent)", letterSpacing: "var(--letter-spacing-comfy)" },
  { name: "Heading 2XL", size: "var(--font-size-2xl)", lineHeight: "var(--line-height-xl)", weight: "var(--font-weight-heading)", letterSpacing: "var(--letter-spacing-baggy)" },
  { name: "Heading XL", size: "var(--font-size-xl)", lineHeight: "var(--line-height-l)", weight: "var(--font-weight-heading)", letterSpacing: "var(--letter-spacing-baggy)" },
  { name: "Heading L", size: "var(--font-size-l)", lineHeight: "var(--line-height-l)", weight: "var(--font-weight-heading)", letterSpacing: "var(--letter-spacing-baggy)" },
  { name: "Body L", size: "var(--font-size-l)", lineHeight: "var(--line-height-l)", weight: "var(--font-weight-regular)", letterSpacing: "var(--letter-spacing-baggy)" },
  { name: "Body M", size: "var(--font-size-m)", lineHeight: "var(--line-height-m)", weight: "var(--font-weight-regular)", letterSpacing: "var(--letter-spacing-baggy)" },
  { name: "Body S", size: "var(--font-size-s)", lineHeight: "var(--line-height-s)", weight: "var(--font-weight-regular)", letterSpacing: "var(--letter-spacing-baggy)" },
  { name: "Body XS", size: "var(--font-size-xs)", lineHeight: "var(--line-height-xs)", weight: "var(--font-weight-regular)", letterSpacing: "var(--letter-spacing-baggy)" },
] as const

const surfaces = [
  { name: "Surface 0", token: "--surface-0", desc: "Cards, modals, popovers" },
  { name: "Surface 10", token: "--surface-10", desc: "Main content area" },
  { name: "Surface 20", token: "--surface-20", desc: "Sidebar, panels" },
  { name: "Surface 30", token: "--surface-30", desc: "Page background" },
] as const

function SectionCard({
  title,
  icon: Icon,
  children,
}: {
  title: string
  icon: React.ElementType
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        backgroundColor: "var(--surface-0)",
        borderRadius: "var(--radius-16)",
        padding: "var(--space-24)",
        border: "1px solid var(--grey-40)",
      }}
    >
      <div
        className="flex items-center"
        style={{
          gap: "var(--space-8)",
          marginBottom: "var(--space-24)",
        }}
      >
        <Icon
          style={{
            width: 20,
            height: 20,
            color: "var(--primary-50)",
          }}
        />
        <h2
          style={{
            fontSize: "var(--font-size-xl)",
            fontWeight: "var(--font-weight-heading)",
            lineHeight: "var(--line-height-l)",
            color: "var(--text-default)",
          }}
        >
          {title}
        </h2>
      </div>
      {children}
    </div>
  )
}

export default function ComponentsIndexPage() {
  const { theme, mode } = useTheme()

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-32)" }}>
      {/* Hero */}
      <div>
        <div
          className="flex items-center"
          style={{ gap: "var(--space-8)", marginBottom: "var(--space-8)" }}
        >
          <Badge
            style={{
              backgroundColor: "var(--primary-10)",
              color: "var(--primary-60)",
              border: "none",
              fontSize: "var(--font-size-s)",
              fontWeight: "var(--font-weight-prominent)",
              borderRadius: "var(--radius-full)",
              padding: "var(--space-2) var(--space-12)",
            }}
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)} / {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </Badge>
        </div>
        <h1
          style={{
            fontSize: "var(--font-size-3xl)",
            fontWeight: "var(--font-weight-prominent)",
            lineHeight: "var(--line-height-3xl)",
            letterSpacing: "var(--letter-spacing-comfy)",
            color: "var(--text-default)",
            fontFamily: "var(--font-display)",
          }}
        >
          Design System
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-l)",
            lineHeight: "var(--line-height-l)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-8)",
            maxWidth: 600,
          }}
        >
          Token-driven, multi-theme component library. 3 themes, 2 modes, 44+ components
          — all powered by design tokens.
        </p>
      </div>

      {/* Quick stats */}
      <div
        className="grid md:grid-cols-3"
        style={{ gap: "var(--space-16)" }}
      >
        {[
          { label: "Themes", value: "3", desc: "Falcon, Phoenix, Jarvis" },
          { label: "Modes", value: "2", desc: "Light & Dark" },
          { label: "Components", value: "44+", desc: "Ready to use" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              backgroundColor: "var(--surface-0)",
              borderRadius: "var(--radius-16)",
              padding: "var(--space-24)",
              border: "1px solid var(--grey-40)",
            }}
          >
            <p
              style={{
                fontSize: "var(--font-size-3xl)",
                fontWeight: "var(--font-weight-prominent)",
                lineHeight: "var(--line-height-3xl)",
                letterSpacing: "var(--letter-spacing-comfy)",
                color: "var(--primary-50)",
                fontFamily: "var(--font-display)",
              }}
            >
              {stat.value}
            </p>
            <p
              style={{
                fontSize: "var(--font-size-l)",
                fontWeight: "var(--font-weight-heading)",
                lineHeight: "var(--line-height-l)",
                color: "var(--text-default)",
                marginTop: "var(--space-4)",
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                fontSize: "var(--font-size-s)",
                lineHeight: "var(--line-height-s)",
                color: "var(--text-subdued-1)",
                marginTop: "var(--space-2)",
              }}
            >
              {stat.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Primary Color Palette */}
      <SectionCard title="Primary Palette" icon={Paintbrush}>
        <div
          className="grid grid-cols-4 md:grid-cols-8"
          style={{ gap: "var(--space-8)" }}
        >
          {primaryShades.map((shade) => (
            <div key={shade} className="text-center">
              <div
                style={{
                  backgroundColor: `var(--primary-${shade})`,
                  borderRadius: "var(--radius-12)",
                  height: 48,
                  width: "100%",
                  border: "1px solid var(--grey-40)",
                }}
              />
              <p
                style={{
                  fontSize: "var(--font-size-xs)",
                  color: "var(--text-subdued-2)",
                  marginTop: "var(--space-4)",
                  lineHeight: "var(--line-height-xs)",
                }}
              >
                {shade}
              </p>
            </div>
          ))}
        </div>

        {/* Secondary + Tertiary */}
        <div
          className="grid md:grid-cols-2"
          style={{ gap: "var(--space-24)", marginTop: "var(--space-24)" }}
        >
          <div>
            <p
              style={{
                fontSize: "var(--font-size-m)",
                fontWeight: "var(--font-weight-heading)",
                color: "var(--text-default)",
                marginBottom: "var(--space-8)",
              }}
            >
              Secondary (Marigold)
            </p>
            <div className="flex" style={{ gap: "var(--space-4)" }}>
              {[20, 40, 50, 60, 80].map((s) => (
                <div
                  key={s}
                  style={{
                    backgroundColor: `var(--secondary-${s})`,
                    borderRadius: "var(--radius-8)",
                    height: 32,
                    flex: 1,
                  }}
                />
              ))}
            </div>
          </div>
          <div>
            <p
              style={{
                fontSize: "var(--font-size-m)",
                fontWeight: "var(--font-weight-heading)",
                color: "var(--text-default)",
                marginBottom: "var(--space-8)",
              }}
            >
              Tertiary (Teal)
            </p>
            <div className="flex" style={{ gap: "var(--space-4)" }}>
              {[20, 40, 50, 60, 80].map((s) => (
                <div
                  key={s}
                  style={{
                    backgroundColor: `var(--tertiary-${s})`,
                    borderRadius: "var(--radius-8)",
                    height: 32,
                    flex: 1,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Feedback Colors */}
      <SectionCard title="Feedback Colors" icon={Zap}>
        <div
          className="grid md:grid-cols-3"
          style={{ gap: "var(--space-16)" }}
        >
          {feedbackColors.map(({ name, token, icon: FeedbackIcon }) => (
            <div
              key={name}
              style={{
                backgroundColor: `var(--${token}-20)`,
                borderRadius: "var(--radius-12)",
                padding: "var(--space-16)",
                border: `1px solid var(--${token}-50)`,
              }}
            >
              <div
                className="flex items-center"
                style={{ gap: "var(--space-8)" }}
              >
                <FeedbackIcon
                  style={{
                    width: 16,
                    height: 16,
                    color: `var(--${token}-50)`,
                  }}
                />
                <span
                  style={{
                    fontSize: "var(--font-size-m)",
                    fontWeight: "var(--font-weight-prominent)",
                    color: `var(--${token}-80)`,
                  }}
                >
                  {name}
                </span>
              </div>
              <p
                style={{
                  fontSize: "var(--font-size-s)",
                  color: `var(--${token}-80)`,
                  marginTop: "var(--space-4)",
                  lineHeight: "var(--line-height-s)",
                }}
              >
                {name} feedback message with icon pairing.
              </p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Surface Layering */}
      <SectionCard title="Surface Layering" icon={Layers}>
        <div
          className="grid md:grid-cols-4"
          style={{ gap: "var(--space-12)" }}
        >
          {surfaces.map((surface) => (
            <div key={surface.name}>
              <div
                style={{
                  backgroundColor: `var(${surface.token})`,
                  borderRadius: "var(--radius-12)",
                  height: 80,
                  border: "1px solid var(--grey-40)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "var(--font-size-s)",
                    fontWeight: "var(--font-weight-prominent)",
                    color: "var(--text-default)",
                  }}
                >
                  {surface.name}
                </span>
              </div>
              <p
                style={{
                  fontSize: "var(--font-size-xs)",
                  color: "var(--text-subdued-2)",
                  marginTop: "var(--space-4)",
                  lineHeight: "var(--line-height-xs)",
                }}
              >
                {surface.desc}
              </p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Typography Scale */}
      <SectionCard title="Typography" icon={Type}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-16)" }}>
          {typographyScale.map((preset) => (
            <div
              key={preset.name}
              className="flex items-baseline justify-between"
              style={{
                paddingBottom: "var(--space-12)",
                borderBottom: "1px solid var(--grey-40)",
              }}
            >
              <span
                style={{
                  fontSize: preset.size,
                  fontWeight: preset.weight,
                  lineHeight: preset.lineHeight,
                  letterSpacing: preset.letterSpacing,
                  color: "var(--text-default)",
                }}
              >
                {preset.name}
              </span>
              <span
                style={{
                  fontSize: "var(--font-size-xs)",
                  color: "var(--text-subdued-2)",
                  lineHeight: "var(--line-height-xs)",
                  flexShrink: 0,
                  marginLeft: "var(--space-16)",
                }}
              >
                {preset.size.replace("var(--font-size-", "").replace(")", "")}
              </span>
            </div>
          ))}
        </div>

        {/* Text hierarchy */}
        <div style={{ marginTop: "var(--space-24)" }}>
          <p
            style={{
              fontSize: "var(--font-size-m)",
              fontWeight: "var(--font-weight-heading)",
              color: "var(--text-default)",
              marginBottom: "var(--space-12)",
            }}
          >
            Text Hierarchy
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <p style={{ color: "var(--text-default)", fontSize: "var(--font-size-m)" }}>
              Default — Primary text, headings, labels
            </p>
            <p style={{ color: "var(--text-subdued-1)", fontSize: "var(--font-size-m)" }}>
              Subdued-1 — Secondary text, descriptions
            </p>
            <p style={{ color: "var(--text-subdued-2)", fontSize: "var(--font-size-m)" }}>
              Subdued-2 — Placeholder, disabled, captions
            </p>
          </div>
        </div>
      </SectionCard>

      {/* Component Examples */}
      <SectionCard title="Component Tokens" icon={Box}>
        {/* Buttons */}
        <div style={{ marginBottom: "var(--space-24)" }}>
          <p
            style={{
              fontSize: "var(--font-size-m)",
              fontWeight: "var(--font-weight-heading)",
              color: "var(--text-default)",
              marginBottom: "var(--space-12)",
            }}
          >
            Buttons
          </p>
          <div className="flex flex-wrap items-center" style={{ gap: "var(--space-12)" }}>
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>

        {/* Sizes */}
        <div style={{ marginBottom: "var(--space-24)" }}>
          <p
            style={{
              fontSize: "var(--font-size-m)",
              fontWeight: "var(--font-weight-heading)",
              color: "var(--text-default)",
              marginBottom: "var(--space-12)",
            }}
          >
            Button Sizes
          </p>
          <div className="flex flex-wrap items-center" style={{ gap: "var(--space-12)" }}>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon"><ArrowRight className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Form Elements */}
        <div style={{ marginBottom: "var(--space-24)" }}>
          <p
            style={{
              fontSize: "var(--font-size-m)",
              fontWeight: "var(--font-weight-heading)",
              color: "var(--text-default)",
              marginBottom: "var(--space-12)",
            }}
          >
            Form Elements
          </p>
          <div
            className="grid md:grid-cols-2"
            style={{ gap: "var(--space-16)", maxWidth: 600 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <Label
                style={{
                  fontSize: "var(--font-size-m)",
                  fontWeight: "var(--font-weight-prominent)",
                }}
              >
                Email
              </Label>
              <Input type="email" placeholder="you@example.com" />
              <span
                style={{
                  fontSize: "var(--font-size-s)",
                  color: "var(--text-subdued-1)",
                  lineHeight: "var(--line-height-s)",
                }}
              >
                We'll never share your email.
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <Label
                style={{
                  fontSize: "var(--font-size-m)",
                  fontWeight: "var(--font-weight-prominent)",
                }}
              >
                Password
              </Label>
              <Input type="password" placeholder="Enter password" />
            </div>
          </div>
        </div>

        {/* Switch + Progress */}
        <div className="grid md:grid-cols-2" style={{ gap: "var(--space-24)" }}>
          <div>
            <p
              style={{
                fontSize: "var(--font-size-m)",
                fontWeight: "var(--font-weight-heading)",
                color: "var(--text-default)",
                marginBottom: "var(--space-12)",
              }}
            >
              Toggle
            </p>
            <div className="flex items-center" style={{ gap: "var(--space-8)" }}>
              <Switch defaultChecked />
              <Label
                style={{
                  fontSize: "var(--font-size-m)",
                  color: "var(--text-default)",
                }}
              >
                Enable notifications
              </Label>
            </div>
          </div>
          <div>
            <p
              style={{
                fontSize: "var(--font-size-m)",
                fontWeight: "var(--font-weight-heading)",
                color: "var(--text-default)",
                marginBottom: "var(--space-12)",
              }}
            >
              Progress
            </p>
            <Progress value={66} />
            <p
              style={{
                fontSize: "var(--font-size-s)",
                color: "var(--text-subdued-1)",
                marginTop: "var(--space-4)",
              }}
            >
              66% complete
            </p>
          </div>
        </div>
      </SectionCard>

      {/* Spacing Scale */}
      <SectionCard title="Spacing Scale" icon={Box}>
        <div className="flex flex-wrap items-end" style={{ gap: "var(--space-12)" }}>
          {[4, 8, 12, 16, 20, 24, 32, 40, 48, 64].map((s) => (
            <div key={s} className="text-center">
              <div
                style={{
                  width: s,
                  height: s,
                  backgroundColor: "var(--primary-30)",
                  borderRadius: "var(--radius-4)",
                }}
              />
              <p
                style={{
                  fontSize: "var(--font-size-xs)",
                  color: "var(--text-subdued-2)",
                  marginTop: "var(--space-4)",
                }}
              >
                {s}
              </p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Border Radius */}
      <SectionCard title="Border Radius" icon={Box}>
        <div className="flex flex-wrap items-center" style={{ gap: "var(--space-16)" }}>
          {[
            { name: "4", value: "var(--radius-4)" },
            { name: "6", value: "var(--radius-6)" },
            { name: "8", value: "var(--radius-8)" },
            { name: "12", value: "var(--radius-12)" },
            { name: "16", value: "var(--radius-16)" },
            { name: "24", value: "var(--radius-24)" },
            { name: "Full", value: "var(--radius-full)" },
          ].map((r) => (
            <div key={r.name} className="text-center">
              <div
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: "var(--primary-20)",
                  border: "2px solid var(--primary-50)",
                  borderRadius: r.value,
                }}
              />
              <p
                style={{
                  fontSize: "var(--font-size-xs)",
                  color: "var(--text-subdued-2)",
                  marginTop: "var(--space-4)",
                }}
              >
                {r.name}
              </p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Shadows */}
      <SectionCard title="Shadows" icon={Layers}>
        <div
          className="grid md:grid-cols-3"
          style={{ gap: "var(--space-16)" }}
        >
          {[
            { name: "Small", shadow: "var(--shadow-small)", desc: "Tooltips, small cards" },
            { name: "Medium", shadow: "var(--shadow-medium)", desc: "Dropdowns, popovers" },
            { name: "Large", shadow: "var(--shadow-large)", desc: "Modals, dialogs" },
          ].map((s) => (
            <div
              key={s.name}
              style={{
                backgroundColor: "var(--surface-0)",
                borderRadius: "var(--radius-12)",
                padding: "var(--space-24)",
                boxShadow: s.shadow,
              }}
            >
              <p
                style={{
                  fontSize: "var(--font-size-m)",
                  fontWeight: "var(--font-weight-prominent)",
                  color: "var(--text-default)",
                }}
              >
                {s.name}
              </p>
              <p
                style={{
                  fontSize: "var(--font-size-s)",
                  color: "var(--text-subdued-1)",
                  marginTop: "var(--space-4)",
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}
