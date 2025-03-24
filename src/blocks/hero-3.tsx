import * as React from "react"
import type { BlockSchema } from "@/schemas/block"

import { cn } from "@/lib/utils"
import { Buttons } from "@/components/buttons"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Hero3({
  level = 1,
  align,
  title,
  description,
  buttons,
  image,
  className,
  ...props
}: BlockSchema & React.ComponentProps<typeof Section>) {
  return (
    <Section
      className={cn(
        "bg-background -mt-header mb-16 flex items-center md:py-32",
        className
      )}
      {...props}
    >
      <Image
        className="absolute top-0 left-0 size-full object-cover opacity-40"
        {...image}
      />
      <Container className="pt-header relative h-full justify-center">
        <Column align={align}>
          <Title size="6xl" level={level} align={align} text={title} />
          <Description
            className="not-first:mt-4"
            size="xl"
            align={align}
            text={description}
          />
          <Buttons
            className="not-first:mt-8"
            size="lg"
            align={align}
            buttons={buttons}
          />
        </Column>
      </Container>
    </Section>
  )
}

export { Hero3 }
