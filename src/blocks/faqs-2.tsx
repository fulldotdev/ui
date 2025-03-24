import * as React from "react"
import type { BlockSchema } from "@/schemas/block"

import { cn } from "@/lib/utils"
import { Accordion } from "@/components/accordion"
import { Buttons } from "@/components/buttons"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Section } from "@/components/section"
import { Split } from "@/components/split"
import { Title } from "@/components/title"

function Faqs2({
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
      <Container>
        <Split align={align}>
          <Column>
            <Title size="4xl" level={level} text={title} />
            <Description className="not-first:mt-4" text={description} />
            <Buttons className="not-first:mt-8" buttons={buttons} />
          </Column>
          <Accordion
            level={level + 1}
            type="single"
            collapsible
            items={items}
          />
        </Split>
      </Container>
    </Section>
  )
}

export { Faqs2 }
