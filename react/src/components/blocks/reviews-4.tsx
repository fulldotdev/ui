import * as React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
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

function Reviews4({
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
    rating: number
    ratingLabel: string
    quote: string
    image?: string
    initials: string
    name: string
    role: string
  }[]
}) {
  const half = Math.ceil(reviews.length / 2)
  const rows = [reviews.slice(0, half), reviews.slice(half)]

  return (
    <Section {...props}>
      <SectionContainer className="flex flex-col items-center gap-4 text-center">
        <SectionTitle>{title}</SectionTitle>
        <SectionDescription className="max-w-2xl">
          {description}
        </SectionDescription>
      </SectionContainer>
      <Marquee className="flex flex-col gap-6">
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
                  <Card className="w-[22rem]">
                    <CardContent className="flex flex-1 flex-col">
                      <figure className="flex flex-1 flex-col gap-3">
                        <Rating
                          value={item.rating}
                          aria-label={item.ratingLabel}
                        />
                        <blockquote className="text-sm leading-relaxed text-muted-foreground">
                          <p>{item.quote}</p>
                        </blockquote>
                        <figcaption className="mt-auto flex items-center gap-3 pt-1">
                          <Avatar aria-hidden="true">
                            <AvatarImage src={item.image} alt="" />
                            <AvatarFallback>{item.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {item.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {item.role}
                            </p>
                          </div>
                        </figcaption>
                      </figure>
                    </CardContent>
                  </Card>
                </MarqueeItem>
              ))}
            </MarqueeContent>
          ))}
      </Marquee>
    </Section>
  )
}

export { Reviews4 }
