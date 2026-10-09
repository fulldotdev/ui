import * as React from "react"

import { placeholderImage } from "@/lib/placeholder-image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
  type CarouselApi,
} from "@/components/ui/carousel"

function Example({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </section>
  )
}

const slides = [1, 2, 3, 4, 5]

function Slide({ number }: { number: number }) {
  return (
    <Card>
      <CardContent className="flex aspect-square items-center justify-center">
        <span className="text-4xl font-semibold">{number}</span>
      </CardContent>
    </Card>
  )
}

function ApiCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    const update = () => {
      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap() + 1)
    }
    update()
    api.on("select", update)
    api.on("reInit", update)
    return () => {
      api.off("select", update)
      api.off("reInit", update)
    }
  }, [api])

  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-2">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {slides.map((number) => (
            <CarouselItem key={number}>
              <Slide number={number} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <p className="text-sm text-muted-foreground">
        Slide {current} of {count}
      </p>
    </div>
  )
}

function CarouselControls() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()

  return (
    <div className="mt-3 flex justify-center gap-2">
      <Button
        size="sm"
        variant="outline"
        disabled={!canScrollPrev}
        onClick={scrollPrev}
      >
        Back
      </Button>
      <Button
        size="sm"
        variant="outline"
        disabled={!canScrollNext}
        onClick={scrollNext}
      >
        Forward
      </Button>
    </div>
  )
}

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Default">
        <div className="w-full max-w-xs px-12">
          <Carousel>
            <CarouselContent>
              {slides.map((number) => (
                <CarouselItem key={number}>
                  <Slide number={number} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </Example>
      <Example title="Several per view, looping">
        <div className="w-full max-w-md px-12">
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {slides.map((number) => (
                <CarouselItem key={number} className="basis-1/2 sm:basis-1/3">
                  <img
                    src={placeholderImage.src}
                    alt={`Gallery photo ${number}`}
                    className="aspect-square w-full rounded-lg object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </Example>
      <Example title="Vertical">
        <div className="w-full max-w-xs py-12">
          <Carousel orientation="vertical" opts={{ align: "start" }}>
            <CarouselContent className="h-48">
              {slides.map((number) => (
                <CarouselItem key={number} className="basis-1/2">
                  <Card>
                    <CardContent className="flex items-center justify-center">
                      <span className="text-2xl font-semibold">{number}</span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </Example>
      <Example title="Slide count through setApi">
        <div className="w-full max-w-xs px-12">
          <ApiCarousel />
        </div>
      </Example>
      <Example title="Custom controls with useCarousel">
        <div className="w-full max-w-xs">
          <Carousel>
            <CarouselContent>
              {slides.map((number) => (
                <CarouselItem key={number}>
                  <Slide number={number} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselControls />
          </Carousel>
        </div>
      </Example>
    </div>
  )
}
