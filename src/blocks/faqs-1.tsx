import * as React from "react"
import type { BlockSchema } from "@/schemas/block"

import { cn } from "@/lib/utils"
import { Accordion } from "@/components/accordion"
import { Buttons } from "@/components/buttons"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Faqs1({
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
      <Container size="sm">
        <Column align={align}>
          <Title size="4xl" level={level} align={align} text={title} />
          <Description
            className="not-first:mt-4"
            align={align}
            text={description}
          />
          <Buttons className="not-first:mt-8" align={align} buttons={buttons} />
          <Accordion
            className="not-first:mt-16"
            type="single"
            collapsible
            items={items}
          />
        </Column>
      </Container>
    </Section>
  )
}

export { Faqs1 }
