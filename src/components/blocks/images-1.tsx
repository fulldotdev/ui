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
import { Abstract } from "@/components/elements/abstract"
import { Column } from "@/components/elements/column"
import { Container } from "@/components/elements/container"
import { Link } from "@/components/elements/link"
import { Section } from "@/components/elements/section"
import { Tile } from "@/components/elements/tile"
import { Wrap } from "@/components/elements/wrap"
import { Writeup } from "@/components/elements/writeup"

const items = [
  {
    title: "Image 1",
    description: "Description 1",
    href: "/image-1",
    image: {
      src: "https://placehold.co/600x400",
      alt: "Image 1",
    },
  },
  {
    title: "Image 2",
    description: "Description 2",
    href: "/image-2",
    image: {
      src: "https://placehold.co/600x400",
      alt: "Image 2",
    },
  },
  {
    title: "Image 3",
    description: "Description 3",
    href: "/image-3",
    image: {
      src: "https://placehold.co/600x400",
      alt: "Image 3",
    },
  },
  {
    title: "Image 4",
    description: "Description 4",
    href: "/image-4",
    image: {
      src: "https://placehold.co/600x400",
      alt: "Image 4",
    },
  },
  {
    title: "Image 5",
    description: "Description 5",
    href: "/image-5",
    image: {
      src: "https://placehold.co/600x400",
      alt: "Image 5",
    },
  },
  {
    title: "Image 6",
    description: "Description 6",
    href: "/image-6",
    image: {
      src: "https://placehold.co/600x400",
      alt: "Image 6",
    },
  },
]

export default function ({ children, links, size }: BlockProps) {
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
            <Writeup
              className="text-balance not-first:mt-6"
              align="center"
              size={size}
            >
              {children}
            </Writeup>
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
            className="mx-auto w-full max-w-[50rem] not-first:mt-12 [&>div:nth-child(1)]:md:overflow-visible"
            setApi={setApi}
            opts={{
              startIndex: 1,
            }}
          >
            <CarouselContent>
              {items?.map(({ image, title, href, description }, i) => (
                <CarouselItem key={i}>
                  <Tile
                    href={href}
                    className={`overflow-hidden rounded-xl transition-all duration-300 ${
                      current === i + 1
                        ? "scale-100 opacity-100"
                        : "scale-70 opacity-40"
                    }`}
                  >
                    <img
                      className="block size-full rounded-xl object-cover object-center"
                      {...image}
                    />
                    {(title || description) && (
                      <Abstract
                        align="center"
                        className="mx-auto not-first:mt-5"
                      >
                        {title && <h3>{title}</h3>}
                        {description && <p>{description}</p>}
                      </Abstract>
                    )}
                  </Tile>
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
