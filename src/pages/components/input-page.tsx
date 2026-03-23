import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function InputPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Input</h1>
        <p className="text-muted-foreground mt-2">
          Displays a form input field or a component that looks like an input field.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Example</h2>
        <div className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="disabled">Disabled</Label>
            <Input id="disabled" disabled placeholder="Disabled input" />
          </div>
        </div>
      </div>
    </div>
  )
}
