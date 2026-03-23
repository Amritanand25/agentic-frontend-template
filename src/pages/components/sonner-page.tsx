import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function SonnerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Sonner</h1>
        <p className="text-muted-foreground mt-2">
          An opinionated toast component for React.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Example</h2>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="outline"
            onClick={() =>
              toast("Event has been created", {
                description: "Sunday, December 03, 2023 at 9:00 AM",
              })
            }
          >
            Show Toast
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.success("Success toast")}
          >
            Success
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.error("Error toast")}
          >
            Error
          </Button>
        </div>
      </div>
    </div>
  )
}
