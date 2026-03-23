import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function FormPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Form</h1>
        <p className="text-muted-foreground mt-2">
          Building forms with React Hook Form and Zod.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Example</h2>
        <form className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="shadcn" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  )
}
