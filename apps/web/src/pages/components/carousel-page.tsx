import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, Card, CardContent } from "@repo/ui"
export default function CarouselPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Carousel</h1>
        <p className="text-muted-foreground mt-2">
          A carousel with motion and swipe built using Embla.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Example</h2>
        <Carousel className="w-full max-w-xs mx-auto">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">{index + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}
