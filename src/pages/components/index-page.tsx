export default function ComponentsIndexPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Components</h1>
        <p className="text-muted-foreground mt-2">
          Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Browse Components</h2>
        <p className="text-muted-foreground">
          Select a component from the sidebar to view examples and documentation.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">44+ Components</h3>
          <p className="text-sm text-muted-foreground mt-2">
            A growing collection of UI components
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Fully Customizable</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Built with Tailwind CSS and Radix UI
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Dark Mode</h3>
          <p className="text-sm text-muted-foreground mt-2">
            All components support light and dark themes
          </p>
        </div>
      </div>
    </div>
  )
}
