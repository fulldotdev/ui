import * as React from "react"

import { cn } from "@/lib/utils"
import { Accordion } from "@/components/accordion"
import { Buttons } from "@/components/buttons"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Section } from "@/components/section"
import { Split } from "@/components/split"
import { Title } from "@/components/title"

interface Props extends React.ComponentProps<typeof Section> {
  level?: React.ComponentProps<typeof Title>["level"]
  size?: React.ComponentProps<typeof Title>["size"]
  align?: React.ComponentProps<typeof Title>["align"]
  title?: React.ComponentProps<typeof Title>["text"]
  description?: React.ComponentProps<typeof Description>["text"]
  buttons?: React.ComponentProps<typeof Buttons>["buttons"]
  faqs?: {
    title?: React.ComponentProps<typeof Title>["text"]
    description?: string
  }[]
}

function Faqs2({
  level = 2,
  size,
  align,
  title,
  description,
  buttons,
  faqs,
  className,
  ...props
}: Props) {
  return (
    <Section className={cn(className)} {...props}>
      <Container>
        <Split align={align}>
          <Column>
            <Title level={level} size={size} text={title} />
            <Description
              className="not-first:mt-4"
              size={size}
              text={description}
            />
            <Buttons className="not-first:mt-8" size={size} buttons={buttons} />
          </Column>
          <Accordion level={level + 1} type="single" collapsible items={faqs} />
        </Split>
      </Container>
    </Section>
  )
}

export { Faqs2 }
