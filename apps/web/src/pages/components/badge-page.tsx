import { Badge } from "@repo/ui"
export default function BadgePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Badge</h1>
        <p className="text-muted-foreground mt-2">
          Displays a badge or a component that looks like a badge.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </div>
    </div>
  )
}
