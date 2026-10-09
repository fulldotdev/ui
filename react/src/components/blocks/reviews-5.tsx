import * as React from "react"
import { QuoteIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Marquee,
  MarqueeContent,
  MarqueeItem,
  MarqueeToggle,
} from "@/components/ui/marquee"
import { Rating } from "@/components/ui/rating"
import {
  Section,
  SectionContainer,
  SectionDescription,
  SectionTitle,
} from "@/components/ui/section"

function Reviews5({
  title,
  description,
  labels,
  reviews,
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  description: string
  labels: {
    play: string
    pause: string
  }
  reviews: {
    quote: string
    image?: string
    initials: string
    name: string
    role: string
    rating: number
    ratingLabel: string
  }[]
}) {
  const third = Math.ceil(reviews.length / 3)
  const rows = [
    reviews.slice(0, third),
    reviews.slice(third, third * 2),
    reviews.slice(third * 2),
  ]

  return (
    <Section {...props}>
      <SectionContainer className="flex flex-col items-center gap-4 text-center">
        <SectionTitle>{title}</SectionTitle>
        <SectionDescription className="max-w-2xl">
          {description}
        </SectionDescription>
      </SectionContainer>
      <Marquee className="flex flex-col gap-5">
        <SectionContainer className="flex justify-end">
          <MarqueeToggle playLabel={labels.play} pauseLabel={labels.pause} />
        </SectionContainer>
        {rows
          .filter((row) => row.length > 0)
          .map((row, index) => (
            <MarqueeContent
              key={index}
              reverse={index % 2 === 1}
              className="py-1"
            >
              {row.map((item) => (
                <MarqueeItem key={item.name + item.quote} className="flex">
                  <figure className="flex w-[26rem] flex-col gap-4 rounded-2xl bg-muted/50 p-6">
                    <figcaption className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Avatar size="lg" aria-hidden="true">
                          <AvatarImage src={item.image} alt="" />
                          <AvatarFallback>{item.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.role}
                          </p>
                        </div>
                      </div>
                      <Rating
                        value={item.rating}
                        aria-label={item.ratingLabel}
                      />
                    </figcaption>
                    <div className="flex gap-2.5">
                      <QuoteIcon className="mt-0.5 size-5 shrink-0 text-primary/30" />
                      <blockquote className="text-sm leading-relaxed text-foreground/80">
                        <p>{item.quote}</p>
                      </blockquote>
                    </div>
                  </figure>
                </MarqueeItem>
              ))}
            </MarqueeContent>
          ))}
      </Marquee>
    </Section>
  )
}

export { Reviews5 }
