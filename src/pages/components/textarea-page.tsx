import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function TextareaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Textarea</h1>
        <p className="text-muted-foreground mt-2">
          Displays a form textarea or a component that looks like a textarea.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Example</h2>
        <div className="max-w-md space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message">Your message</Label>
            <Textarea id="message" placeholder="Type your message here." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="disabled">Disabled</Label>
            <Textarea id="disabled" placeholder="Disabled textarea" disabled />
          </div>
        </div>
      </div>
    </div>
  )
}
