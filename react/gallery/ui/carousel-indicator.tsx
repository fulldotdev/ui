import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { CarouselIndicator } from "@/components/ui/carousel-indicator"

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <Carousel aria-label="Product images" className="w-full max-w-xs">
        <CarouselContent>
          {[1, 2, 3].map((number) => (
            <CarouselItem key={number}>
              <div className="flex aspect-square items-center justify-center rounded-lg bg-muted text-4xl font-semibold">
                {number}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-3 flex gap-2">
          {[1, 2, 3].map((number, index) => (
            <CarouselIndicator
              key={number}
              index={index}
              aria-label={`Show image ${number}`}
              className="flex size-14 items-center justify-center text-sm font-medium"
            >
              {number}
            </CarouselIndicator>
          ))}
        </div>
      </Carousel>
    </div>
  )
}
