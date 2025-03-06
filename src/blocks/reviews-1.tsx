import * as React from "react"
import { v4 as uuidv4 } from "uuid"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Abstract } from "@/components/abstract"
import { Buttons } from "@/components/buttons"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Masonry } from "@/components/masonry"
import { Rating } from "@/components/rating"
import { Section } from "@/components/section"
import { Title } from "@/components/title"
import { Writeup } from "@/components/writeup"

interface Props extends React.ComponentProps<typeof Section> {
  level?: React.ComponentProps<typeof Title>["level"]
  size?: React.ComponentProps<typeof Title>["size"]
  align?: React.ComponentProps<typeof Title>["align"]
  title?: React.ComponentProps<typeof Title>["text"]
  description?: React.ComponentProps<typeof Description>["text"]
  buttons?: React.ComponentProps<typeof Buttons>["buttons"]
  reviews?: {
    rating?: React.ComponentProps<typeof Rating>["score"]
    title?: React.ComponentProps<typeof Title>["text"]
    description?: string
  }[]
}

function Reviews1({
  level = 2,
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
      <Container className="gap-8">
        <Column align={align}>
          <Title level={level} size={size} align={align} text={title} />
          <Description
            className="not-first:mt-4"
            size={size}
            align={align}
            text={description}
          />
          <Buttons buttons={buttons} />
          <Masonry className="mt-8 gap-x-4 gap-y-8 first:mt-0">
            {reviews?.map(({ rating, title, description }) => (
              <div
                className="flex flex-col gap-3 rounded-lg border p-6"
                key={uuidv4()}
              >
                <Rating score={rating} />
                <Title level={level + 1} size={size} align={align} />
                <Description
                  className="not-first:mt-4"
                  size={size}
                  align={align}
                />
              </div>
            ))}
          </Masonry>
        </Column>
      </Container>
    </Section>
  )
}

export { Reviews1 }
