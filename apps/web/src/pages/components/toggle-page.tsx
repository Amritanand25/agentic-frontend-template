import { Bold, Italic, Underline } from "lucide-react"
import { Toggle } from "@repo/ui"

export default function TogglePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Toggle</h1>
        <p className="text-muted-foreground mt-2">
          A two-state button that can be either on or off.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Example</h2>
        <div className="flex gap-2">
          <Toggle aria-label="Toggle bold">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle aria-label="Toggle italic">
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle aria-label="Toggle underline">
            <Underline className="h-4 w-4" />
          </Toggle>
        </div>
      </div>
    </div>
  )
}
