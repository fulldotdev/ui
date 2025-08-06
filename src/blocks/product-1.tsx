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
  SectionSplit,
} from "@/components/ui/section"
import { AutoForm } from "@/components/auto-form"

export default function ({
  children,
  images,
  title,
  description,
  list,
  form,
}: BlockProps) {
  const [api1, setApi1] = React.useState<CarouselApi>()
  const [api2, setApi2] = React.useState<CarouselApi>()

  const onThumbClick = (index: number) => {
    console.log("clicked", index)
    api1?.scrollTo(index - 2)
    api2?.scrollTo(index - 2)
  }

  return (
    <Section className="from-primary/5 bg-radial-[at_0%_0%] via-transparent">
      <SectionContainer>
        <SectionSplit className="items-start">
          <div className="col-span-3 flex w-full flex-col gap-2">
            <Carousel setApi={setApi1}>
              <CarouselContent>
                {images?.map((image, i) => (
                  <CarouselItem key={i}>
                    <img className="rounded-md" {...image} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <Carousel setApi={setApi2}>
              <CarouselContent className="-ml-2">
                {images?.map((image, i) => (
                  <CarouselItem
                    className="basis-1/5 pl-2"
                    key={i}
                    onClick={() => onThumbClick(i)}
                  >
                    <img className="rounded-md" {...image} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>
          <div className="col-span-2 flex flex-col items-start">
            <SectionContent className="animate-fade-1 text-balance not-first:mt-5">
              <h1>{title}</h1>
              {description && <p>{description}</p>}
              {list && (
                <ul>
                  {list.map((item) => (
                    <li>{item}</li>
                  ))}
                </ul>
              )}
              {children}
            </SectionContent>
            {form && <AutoForm className="mt-8" {...form} />}
          </div>
        </SectionSplit>
      </SectionContainer>
    </Section>
  )
}
