import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export default function ButtonPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Button</h1>
        <p className="text-muted-foreground mt-2">
          Displays a button or a component that looks like a button.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon"><Mail className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">With Icon</h2>
        <div className="flex flex-wrap gap-4">
          <Button>
            <Mail className="mr-2 h-4 w-4" /> Login with Email
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Loading</h2>
        <div className="flex flex-wrap gap-4">
          <Button disabled>
            <span className="mr-2 h-4 w-4 animate-spin">⏳</span>
            Please wait
          </Button>
        </div>
      </div>
    </div>
  )
}
