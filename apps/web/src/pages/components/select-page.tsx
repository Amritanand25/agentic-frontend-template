import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui"
export default function SelectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Select</h1>
        <p className="text-muted-foreground mt-2">
          Displays a list of options for the user to pick from—triggered by a button.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Example</h2>
        <div className="max-w-md">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
              <SelectItem value="grape">Grape</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
