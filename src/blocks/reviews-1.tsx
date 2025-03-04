import * as React from "react"
import { v4 as uuidv4 } from "uuid"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Abstract } from "@/components/abstract"
import { Buttons } from "@/components/buttons"
import { Container } from "@/components/container"
import { Masonry } from "@/components/masonry"
import { Rating } from "@/components/rating"
import { Section } from "@/components/section"
import { Writeup } from "@/components/writeup"

interface Props extends React.ComponentProps<typeof Section> {
  level?: React.ComponentProps<typeof Writeup>["level"]
  size?: React.ComponentProps<typeof Writeup>["size"]
  align?: React.ComponentProps<typeof Writeup>["align"]
  title?: React.ComponentProps<typeof Writeup>["title"]
  description?: React.ComponentProps<typeof Writeup>["description"]
  buttons?: React.ComponentProps<typeof Buttons>["buttons"]
  reviews?: {
    rating?: React.ComponentProps<typeof Rating>["score"]
    title?: string
    description?: string
  }[]
}

function Reviews1({
  level,
  size,
  align,
  title,
  description,
  buttons,
  reviews,
  children,
  className,
  ...props
}: Props) {
  return (
    <Section className={cn("reviews reviews-1", className)} {...props}>
      <Container align={align} className="gap-8">
        <Writeup
          level={level}
          size={size}
          align={align}
          title={title}
          description={description}
        >
          {children}
        </Writeup>
        <Buttons buttons={buttons} />
        <Masonry className="mt-8 gap-x-4 gap-y-8 first:mt-0">
          {reviews?.map(({ rating, title, description }) => (
            <Card className="flex flex-col" key={uuidv4()}>
              <Rating score={rating} />
              <Abstract
                level={level}
                size={size}
                title={title}
                description={description}
              />
            </Card>
          ))}
        </Masonry>
      </Container>
    </Section>
  )
}

export { Reviews1 }
