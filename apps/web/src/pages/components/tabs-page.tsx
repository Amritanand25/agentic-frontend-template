import { User, Heart, Settings } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui"

function DemoContent({ label }: { label: string }) {
  return (
    <div
      style={{
        padding: "var(--space-16)",
        borderRadius: "var(--radius-8)",
        border: "1px solid var(--grey-30)",
        backgroundColor: "var(--surface-0)",
        color: "var(--text-subdued-1)",
        fontSize: "var(--font-size-m)",
      }}
    >
      {label} content goes here.
    </div>
  )
}

function CountBadge({ count }: { count: number }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 20,
        height: 20,
        padding: "0 6px",
        borderRadius: "var(--radius-full)",
        backgroundColor: "var(--primary-20)",
        color: "var(--primary-60)",
        fontSize: "var(--font-size-xs, 11px)",
        fontWeight: "var(--font-weight-prominent)",
        lineHeight: 1,
      }}
    >
      {count}
    </span>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-16)" }}>
      <h2 style={{ fontSize: "var(--font-size-xl)", fontWeight: "var(--font-weight-heading)", color: "var(--text-default)" }}>
        {title}
      </h2>
      <div style={{ padding: "var(--space-24)", borderRadius: "var(--radius-12)", border: "1px solid var(--grey-30)", backgroundColor: "var(--surface-0)" }}>
        {children}
      </div>
    </div>
  )
}

export default function TabsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-48)" }}>
      <div>
        <h1 style={{ fontSize: "var(--font-size-2xl)", fontWeight: "var(--font-weight-heading)", color: "var(--text-default)" }}>
          Tabs
        </h1>
        <p style={{ color: "var(--text-subdued-1)", marginTop: "var(--space-8)" }}>
          Layered sections of content displayed one at a time. Available in underline and subtab variants, with optional icons and count badges.
        </p>
      </div>

      {/* Small */}
      <Section title="Small">
        <Tabs defaultValue="account">
          <TabsList variant="underline" size="sm">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account"><DemoContent label="Account" /></TabsContent>
          <TabsContent value="password"><DemoContent label="Password" /></TabsContent>
          <TabsContent value="settings"><DemoContent label="Settings" /></TabsContent>
        </Tabs>
      </Section>

      {/* Large */}
      <Section title="Large">
        <Tabs defaultValue="account">
          <TabsList variant="underline" size="lg">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account"><DemoContent label="Account" /></TabsContent>
          <TabsContent value="password"><DemoContent label="Password" /></TabsContent>
          <TabsContent value="settings"><DemoContent label="Settings" /></TabsContent>
        </Tabs>
      </Section>

      {/* With Icons */}
      <Section title="With Icons">
        <Tabs defaultValue="account">
          <TabsList variant="underline" size="sm">
            <TabsTrigger value="account"><User size={16} /> Account</TabsTrigger>
            <TabsTrigger value="password"><Heart size={16} /> Password</TabsTrigger>
            <TabsTrigger value="settings"><Settings size={16} /> Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account"><DemoContent label="Account" /></TabsContent>
          <TabsContent value="password"><DemoContent label="Password" /></TabsContent>
          <TabsContent value="settings"><DemoContent label="Settings" /></TabsContent>
        </Tabs>
      </Section>

      {/* With Counts */}
      <Section title="With Counts">
        <Tabs defaultValue="account">
          <TabsList variant="underline" size="sm">
            <TabsTrigger value="account">Account <CountBadge count={5} /></TabsTrigger>
            <TabsTrigger value="password">Password <CountBadge count={10} /></TabsTrigger>
            <TabsTrigger value="settings">Settings <CountBadge count={3} /></TabsTrigger>
          </TabsList>
          <TabsContent value="account"><DemoContent label="Account" /></TabsContent>
          <TabsContent value="password"><DemoContent label="Password" /></TabsContent>
          <TabsContent value="settings"><DemoContent label="Settings" /></TabsContent>
        </Tabs>
      </Section>

      {/* With Icons And Counts */}
      <Section title="With Icons And Counts">
        <Tabs defaultValue="account">
          <TabsList variant="underline" size="sm">
            <TabsTrigger value="account"><User size={16} /> Account <CountBadge count={5} /></TabsTrigger>
            <TabsTrigger value="password"><Heart size={16} /> Password <CountBadge count={10} /></TabsTrigger>
            <TabsTrigger value="settings"><Settings size={16} /> Settings <CountBadge count={3} /></TabsTrigger>
          </TabsList>
          <TabsContent value="account"><DemoContent label="Account" /></TabsContent>
          <TabsContent value="password"><DemoContent label="Password" /></TabsContent>
          <TabsContent value="settings"><DemoContent label="Settings" /></TabsContent>
        </Tabs>
      </Section>

      {/* SubTab Small */}
      <Section title="SubTab Small">
        <Tabs defaultValue="account">
          <TabsList variant="subtab" size="sm">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account"><DemoContent label="Account" /></TabsContent>
          <TabsContent value="password"><DemoContent label="Password" /></TabsContent>
          <TabsContent value="settings"><DemoContent label="Settings" /></TabsContent>
        </Tabs>
      </Section>

      {/* SubTab Medium */}
      <Section title="SubTab Medium">
        <Tabs defaultValue="account">
          <TabsList variant="subtab" size="lg">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account"><DemoContent label="Account" /></TabsContent>
          <TabsContent value="password"><DemoContent label="Password" /></TabsContent>
          <TabsContent value="settings"><DemoContent label="Settings" /></TabsContent>
        </Tabs>
      </Section>

      {/* SubTab Small with Icons */}
      <Section title="SubTab Small with Icons">
        <Tabs defaultValue="account">
          <TabsList variant="subtab" size="sm">
            <TabsTrigger value="account"><User size={14} /> Account</TabsTrigger>
            <TabsTrigger value="password"><Heart size={14} /> Password</TabsTrigger>
            <TabsTrigger value="settings"><Settings size={14} /> Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account"><DemoContent label="Account" /></TabsContent>
          <TabsContent value="password"><DemoContent label="Password" /></TabsContent>
          <TabsContent value="settings"><DemoContent label="Settings" /></TabsContent>
        </Tabs>
      </Section>

      {/* SubTab Medium with Icons */}
      <Section title="SubTab Medium with Icons">
        <Tabs defaultValue="account">
          <TabsList variant="subtab" size="lg">
            <TabsTrigger value="account"><User size={16} /> Account</TabsTrigger>
            <TabsTrigger value="password"><Heart size={16} /> Password</TabsTrigger>
            <TabsTrigger value="settings"><Settings size={16} /> Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account"><DemoContent label="Account" /></TabsContent>
          <TabsContent value="password"><DemoContent label="Password" /></TabsContent>
          <TabsContent value="settings"><DemoContent label="Settings" /></TabsContent>
        </Tabs>
      </Section>

      {/* SubTab with Icons And Counts */}
      <Section title="SubTab with Icons And Counts">
        <Tabs defaultValue="account">
          <TabsList variant="subtab" size="lg">
            <TabsTrigger value="account"><User size={16} /> Account <CountBadge count={5} /></TabsTrigger>
            <TabsTrigger value="password"><Heart size={16} /> Password <CountBadge count={10} /></TabsTrigger>
            <TabsTrigger value="settings"><Settings size={16} /> Settings <CountBadge count={3} /></TabsTrigger>
          </TabsList>
          <TabsContent value="account"><DemoContent label="Account" /></TabsContent>
          <TabsContent value="password"><DemoContent label="Password" /></TabsContent>
          <TabsContent value="settings"><DemoContent label="Settings" /></TabsContent>
        </Tabs>
      </Section>
    </div>
  )
}
