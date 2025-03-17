import * as React from "react"
import type { MediaProps } from "@/schemas/blocks/media"

import { cn } from "@/lib/utils"
import { Buttons } from "@/components/buttons"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Section } from "@/components/section"
import { Split } from "@/components/split"
import { Title } from "@/components/title"

function Media2({
  level = 2,
  align,
  title,
  description,
  buttons,
  image,
  className,
  ...props
}: MediaProps & React.ComponentProps<typeof Section>) {
  return (
    <Section className={cn(className)} {...props}>
      <Container>
        <Split align={align}>
          <Column>
            <Title size="4xl" level={level} text={title} />
            <Description className="not-first:mt-4" text={description} />
            <Buttons className="not-first:mt-8" buttons={buttons} />
          </Column>
          <Image className="rounded-lg" {...image} />
        </Split>
      </Container>
    </Section>
  )
}

export { Media2 }
