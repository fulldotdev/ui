import * as React from "react"
import type { BlockSchema } from "@/schemas/block"
import { v4 as uuidv4 } from "uuid"

import { cn } from "@/lib/utils"
import { Buttons } from "@/components/buttons"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Masonry } from "@/components/masonry"
import { Rating } from "@/components/rating"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Reviews1({
  level = 2,
  align,
  title,
  description,
  buttons,
  items,
  className,
  ...props
}: BlockSchema & React.ComponentProps<typeof Section>) {
  return (
    <Section className={cn(className)} {...props}>
      <Container className="gap-8">
        <Column align={align}>
          <Title level={level} size="4xl" align={align} text={title} />
          <Description
            className="not-first:mt-4"
            align={align}
            text={description}
          />
          <Buttons className="not-first:mt-8" buttons={buttons} />
          <Masonry className="gap-x-4 gap-y-8 not-first:mt-16">
            {items?.map(({ rating, title, description }) => (
              <div
                className="flex flex-col rounded-lg border p-6"
                key={uuidv4()}
              >
                <Rating score={rating} />
                <Title
                  className="text-lg not-first:mt-4"
                  level={level + 1}
                  text={title}
                />
                <Description className="not-first:mt-1" text={description} />
              </div>
            ))}
          </Masonry>
        </Column>
      </Container>
    </Section>
  )
}

export { Reviews1 }
