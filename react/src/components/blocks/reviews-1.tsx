import * as React from "react"
import { QuoteIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Rating } from "@/components/ui/rating"
import {
  Section,
  SectionContainer,
  SectionDescription,
  SectionTitle,
} from "@/components/ui/section"

function Reviews1({
  title,
  description,
  reviews,
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  description: string
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
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((item) => (
            <Card key={item.name + item.quote}>
              <CardContent className="flex flex-1 flex-col">
                <figure className="flex flex-1 flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <Rating value={item.rating} aria-label={item.ratingLabel} />
                    <QuoteIcon className="size-6 text-muted-foreground/20" />
                  </div>
                  <blockquote className="text-sm leading-relaxed text-muted-foreground">
                    <p>{item.quote}</p>
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-3 pt-2">
                    <Avatar size="lg" aria-hidden="true">
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
          ))}
        </div>
      </SectionContainer>
    </Section>
  )
}

export { Reviews1 }
