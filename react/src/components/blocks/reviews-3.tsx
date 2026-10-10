import * as React from "react"
import { QuoteIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Rating } from "@/components/ui/rating"
import {
  Section,
  SectionContainer,
  SectionDescription,
  SectionTitle,
} from "@/components/ui/section"

function Reviews3({
  title,
  description,
  labels,
  reviews,
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  description: string
  labels: {
    previous: string
    next: string
    carousel: string
    slide: string
  }
  reviews: {
    rating: number
    ratingLabel: string
    quote: string
    image?: string
    initials: string
    name: string
    role: string
  }[]
}) {
  return (
    <Section {...props}>
      <SectionContainer className="flex flex-col items-center gap-4 text-center">
        <SectionTitle>{title}</SectionTitle>
        <SectionDescription className="max-w-2xl">
          {description}
        </SectionDescription>
      </SectionContainer>
      <SectionContainer>
        <Carousel
          aria-label={title}
          aria-roledescription={labels.carousel}
          opts={{ loop: true }}
          className="mx-auto w-[calc(100%-6rem)] max-w-3xl"
        >
          <CarouselContent>
            {reviews.map((item) => (
              <CarouselItem
                key={item.name + item.quote}
                aria-roledescription={labels.slide}
              >
                <figure className="flex flex-col items-center gap-6 px-4 py-8 text-center">
                  <QuoteIcon className="size-10 text-primary" />
                  <Rating value={item.rating} aria-label={item.ratingLabel} />
                  <blockquote className="text-xl leading-relaxed font-medium text-balance text-foreground sm:text-2xl">
                    <p>{item.quote}</p>
                  </blockquote>
                  <figcaption className="flex items-center gap-3 pt-2">
                    <Avatar size="lg" aria-hidden="true">
                      <AvatarImage src={item.image} alt="" />
                      <AvatarFallback>{item.initials}</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.role}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious aria-label={labels.previous} />
          <CarouselNext aria-label={labels.next} />
        </Carousel>
      </SectionContainer>
    </Section>
  )
}

export { Reviews3 }
