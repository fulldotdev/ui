"use client"

import { useEffect, useState } from "react"

import type { BlockProps } from "@/lib/types"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Column } from "@/components/elements/column"
import { Container } from "@/components/elements/container"
import { Link } from "@/components/elements/link"
import { Section } from "@/components/elements/section"
import { Typography } from "@/components/elements/typography"
import { Wrap } from "@/components/elements/wrap"

export default function ({ images, children, links, size }: BlockProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <Section className="overflow-hidden">
      <Container>
        <Column align="center">
          {children && (
            <Typography
              className="text-balance not-first:mt-6"
              align="center"
              size={size}
            >
              {children}
            </Typography>
          )}
          {links && links.length > 0 && (
            <Wrap className="gap-2 not-first:mt-8" align="center">
              {links.map((link, i) => (
                <Link
                  key={i}
                  variant={i === 0 ? "default" : "outline"}
                  size={size}
                  {...link}
                />
              ))}
            </Wrap>
          )}
          <Carousel
            className="mx-auto w-full max-w-[50rem] not-first:mt-16 [&>div:nth-child(1)]:md:overflow-visible"
            setApi={setApi}
            opts={{
              startIndex: 1,
            }}
          >
            <CarouselContent>
              {images?.map((image, i) => (
                <CarouselItem key={i}>
                  <div
                    className={`overflow-hidden rounded-xl transition-all duration-300 ${
                      current === i + 1
                        ? "scale-100 opacity-100"
                        : "scale-70 opacity-40"
                    }`}
                  >
                    <img
                      className="block size-full object-cover object-center"
                      {...image}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-4 hidden md:block">
              <CarouselPrevious
                className="size-10 max-md:static max-md:translate-y-0 md:left-[-6.25rem]"
                variant="default"
              />
              <CarouselNext
                className="size-10 max-md:static max-md:translate-y-0 md:right-[-6.25rem]"
                variant="default"
              />
            </div>
          </Carousel>
          <div className="mx-auto mt-10 flex w-full max-w-[33.9375rem] items-center justify-center">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                className="p-2"
                onClick={() => {
                  api?.scrollTo(i)
                }}
              >
                <div
                  className={`size-3 rounded-full ${current === i + 1 ? "bg-black" : "bg-black/10"}`}
                />
              </button>
            ))}
          </div>
        </Column>
      </Container>
    </Section>
  )
}
