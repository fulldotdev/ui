import * as React from "react"

import type { BlockProps } from "@/lib/types"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import {
  Section,
  SectionContainer,
  SectionContent,
} from "@/components/ui/section"

export default function ({ children, images, title, description }: BlockProps) {
  const [api1, setApi1] = React.useState<CarouselApi>()
  const [api2, setApi2] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  const onThumbClick = (index: number) => {
    setCurrent(index)
    api1?.scrollTo(index)
    api2?.scrollTo(index - 2)
  }

  return (
    <Section className="from-primary/5 bg-radial-[at_0%_0%] via-transparent">
      {images?.[0]?.src && (
        <img
          {...images?.[0]}
          className="mask-linear absolute top-0 left-0 -z-10 h-auto max-h-[400px] w-full mask-b-from-black/30 mask-b-to-transparent object-cover"
        />
      )}
      <SectionContainer>
        {(title || description) && (
          <SectionContent className="mx-auto text-center" size="lg">
            {title && <h1>{title}</h1>}
            {description && <p>{description}</p>}
          </SectionContent>
        )}
        <div className="flex w-full flex-col gap-2 not-first:mt-16">
          <Carousel setApi={setApi2} className="mx-auto max-w-md">
            <CarouselContent className="ml-0 items-end">
              {images?.map((image, i) => (
                <CarouselItem
                  className="basis-1/5 p-2"
                  key={i}
                  onClick={() => onThumbClick(i)}
                >
                  <img
                    className={`max-h-[94px] rounded-md object-contain ${i === current ? "ring-offset-background ring-2 ring-offset-4" : ""}`}
                    {...image}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
          <Carousel setApi={setApi1}>
            <CarouselContent className="max-h-[70vh] items-start">
              {images?.map((image, i) => (
                <CarouselItem key={i}>
                  <img
                    className="mx-auto h-full w-auto rounded-md object-contain"
                    {...image}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        {children && (
          <SectionContent className="mx-auto not-first:mt-16">
            {children}
          </SectionContent>
        )}
      </SectionContainer>
    </Section>
  )
}
