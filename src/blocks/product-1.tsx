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
import { Link } from "@/components/ui/link"
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
  price,
}: BlockProps) {
  const [api1, setApi1] = React.useState<CarouselApi>()
  const [api2, setApi2] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  const onThumbClick = (index: number) => {
    setCurrent(index)
    api1?.scrollTo(index)
    api2?.scrollTo(index - 2)
  }

  return (
    <Section className="from-primary/5 bg-radial-[at_0%_0%] via-transparent max-lg:pt-8">
      <SectionContainer>
        <SectionSplit className="items-start">
          <div className="flex w-full flex-col gap-2 lg:col-span-3">
            <Carousel setApi={setApi1}>
              <CarouselContent className="max-h-[calc(min(500px,70vh))] items-center">
                {images?.map((image, i) => (
                  <CarouselItem key={i}>
                    <img
                      className="w-full rounded-md object-contain"
                      {...image}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <Carousel setApi={setApi2}>
              <CarouselContent className="ml-0 items-center">
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
          </div>
          <div className="flex flex-col items-start lg:col-span-2">
            <SectionContent className="animate-fade-1 text-balance not-first:mt-5">
              <h1>{title}</h1>
              {typeof price === "string" && (
                <p className="!text-2xl font-semibold">
                  <span>€{price}</span>
                  <span className="ml-2 text-sm">(ex. btw)</span>
                </p>
              )}
              {description && <p>{description}</p>}
              {list && (
                <ul className="not-first:mt-4">
                  {list.map((item) => (
                    <li>{item}</li>
                  ))}
                </ul>
              )}
              <br />
              {children}
            </SectionContent>
            <Link className="mt-8 w-full" size="lg" href="/contact/">
              Neem contact op
            </Link>
            {form && <AutoForm className="not-first:mt-8" {...form} />}
          </div>
        </SectionSplit>
      </SectionContainer>
    </Section>
  )
}
