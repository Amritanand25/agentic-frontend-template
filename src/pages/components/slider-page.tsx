import { Slider } from "@/components/ui/slider"

export default function SliderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Slider</h1>
        <p className="text-muted-foreground mt-2">
          An input where the user selects a value from within a given range.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Example</h2>
        <div className="max-w-md space-y-8">
          <div>
            <p className="text-sm text-muted-foreground mb-4">Default</p>
            <Slider defaultValue={[50]} max={100} step={1} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-4">Range</p>
            <Slider defaultValue={[25, 75]} max={100} step={1} />
          </div>
        </div>
      </div>
    </div>
  )
}
