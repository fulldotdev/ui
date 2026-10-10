import * as React from "react"
import { QuoteIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Rating } from "@/components/ui/rating"
import { Section, SectionContainer } from "@/components/ui/section"
import { Separator } from "@/components/ui/separator"

function Reviews2({
  featured,
  reviews,
  ...props
}: React.ComponentProps<"section"> & {
  featured: {
    quote: string
    image?: string
    initials: string
    name: string
    role: string
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
      <SectionContainer className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-start">
        <figure className="flex flex-col gap-6 rounded-xl border p-8">
          <QuoteIcon className="size-8 text-primary" />
          <blockquote className="text-2xl leading-snug font-semibold text-balance text-foreground sm:text-3xl">
            <p>{featured.quote}</p>
          </blockquote>
          <figcaption className="flex items-center gap-3 pt-2">
            <Avatar size="lg" aria-hidden="true">
              <AvatarImage src={featured.image} alt="" />
              <AvatarFallback>{featured.initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-foreground">
                {featured.name}
              </p>
              <p className="text-xs text-muted-foreground">{featured.role}</p>
            </div>
          </figcaption>
        </figure>
        <div className="grid gap-6">
          {reviews.map((item) => (
            <div key={item.name + item.quote} className="flex flex-col">
              <Separator />
              <figure className="flex flex-col gap-3 pt-6">
                <Rating value={item.rating} aria-label={item.ratingLabel} />
                <blockquote className="text-sm leading-relaxed text-muted-foreground">
                  <p>{item.quote}</p>
                </blockquote>
                <figcaption className="flex items-center gap-3 pt-1">
                  <Avatar aria-hidden="true">
                    <AvatarImage src={item.image} alt="" />
                    <AvatarFallback>{item.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </SectionContainer>
    </Section>
  )
}

export { Reviews2 }
