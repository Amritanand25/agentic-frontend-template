import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function LabelPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Label</h1>
        <p className="text-muted-foreground mt-2">
          Renders an accessible label associated with controls.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Example</h2>
        <div className="max-w-md space-y-2">
          <Label htmlFor="email">Your email address</Label>
          <Input type="email" id="email" placeholder="email@example.com" />
        </div>
      </div>
    </div>
  )
}
