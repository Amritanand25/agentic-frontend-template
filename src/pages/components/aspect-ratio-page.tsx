import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function AspectRatioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Aspect Ratio</h1>
        <p className="text-muted-foreground mt-2">
          Displays content within a desired ratio.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Example</h2>
        <div className="w-full max-w-md">
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
              alt="Photo"
              className="rounded-md object-cover w-full h-full"
            />
          </AspectRatio>
        </div>
      </div>
    </div>
  )
}
