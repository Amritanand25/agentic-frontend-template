import { Checkbox, Label } from "@repo/ui"
export default function CheckboxPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Checkbox</h1>
        <p className="text-muted-foreground mt-2">
          A control that allows the user to toggle between checked and not checked.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Example</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms2" defaultChecked />
            <Label htmlFor="terms2">Checked by default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms3" disabled />
            <Label htmlFor="terms3">Disabled</Label>
          </div>
        </div>
      </div>
    </div>
  )
}
