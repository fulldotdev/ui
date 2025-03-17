import * as React from "react"
import type { HeroProps } from "@/schemas/blocks/hero"

import { cn } from "@/lib/utils"
import { Buttons } from "@/components/buttons"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Hero2({
  level = 1,
  align,
  title,
  description,
  buttons,
  image,
  className,
  ...props
}: HeroProps & React.ComponentProps<typeof Section>) {
  return (
    <Section className={cn(className)} {...props}>
      <Container>
        <Column align={align}>
          <Title size="6xl" level={level} align={align} text={title} />
          <Description
            className="not-first:mt-4"
            size="xl"
            align={align}
            text={description}
          />
          <Buttons className="not-first:mt-8" size="lg" buttons={buttons} />
          <Image className="rounded-lg not-first:mt-16" {...image} />
        </Column>
      </Container>
    </Section>
  )
}

export { Hero2 }
