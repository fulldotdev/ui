import * as React from "react"

import { cn } from "@/lib/utils"
import Column from "@/components/elements/column"
import Container from "@/components/elements/container"
import Links from "@/components/elements/links"
import Masonry from "@/components/elements/masonry"
import Person from "@/components/elements/person"
import Rating from "@/components/elements/rating"
import Section from "@/components/elements/section"
import Writeup from "@/components/elements/writeup"

interface Props extends React.ComponentProps<typeof Section> {
  links?: React.ComponentProps<typeof Links>["links"]
  reviews?: {
    title?: string
    description?: string
    rating?: number
    image?: React.ComponentProps<typeof Person>["image"]
    tagline?: string
  }[]
}

export default function ({
  className,
  align = "center",
  size,
  links,
  reviews,
  children,
  ...props
}: Props) {
  return (
    <Section className={cn("", className)} size={size} align={align} {...props}>
      <Container>
        <Column align={align}>
          <Writeup className="not-first:mt-4" size={size} align={align}>
            {children}
          </Writeup>
          <Links
            className="not-first:mt-8"
            size={size}
            links={links}
            align={align}
          />
          <Masonry className="not-first:mt-16">
            {reviews?.map(
              ({ title, description, rating, image, tagline }, i) => (
                <div
                  className="flex break-inside-avoid flex-col items-start overflow-hidden rounded-lg border p-6 text-start"
                  key={i}
                >
                  <Person image={image} title={title} tagline={tagline} />
                  <Rating className="not-first:mt-4" rating={rating} />
                  {description && (
                    <p className="text-muted-foreground text-base leading-7 not-first:mt-4">
                      {description}
                    </p>
                  )}
                </div>
              )
            )}
          </Masonry>
        </Column>
      </Container>
    </Section>
  )
}
