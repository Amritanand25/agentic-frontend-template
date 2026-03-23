import { Progress } from "@/components/ui/progress"

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Progress</h1>
        <p className="text-muted-foreground mt-2">
          Displays an indicator showing the completion progress of a task.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Example</h2>
        <div className="max-w-md space-y-4">
          <Progress value={33} />
          <Progress value={66} />
          <Progress value={100} />
        </div>
      </div>
    </div>
  )
}
