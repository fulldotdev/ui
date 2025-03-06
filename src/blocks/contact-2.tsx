import * as React from "react"

import { cn } from "@/lib/utils"
import { Buttons } from "@/components/buttons"
import { Channels } from "@/components/channels"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Form } from "@/components/form"
import { Section } from "@/components/section"
import { Split } from "@/components/split"
import { Title } from "@/components/title"

interface Props extends React.ComponentProps<typeof Section> {
  level: React.ComponentProps<typeof Title>["level"]
  size?: React.ComponentProps<typeof Title>["size"]
  align?: React.ComponentProps<typeof Title>["align"]
  title?: React.ComponentProps<typeof Title>["text"]
  description?: React.ComponentProps<typeof Description>["text"]
  channels?: React.ComponentProps<typeof Channels>
  form?: React.ComponentProps<typeof Form>
  buttons?: React.ComponentProps<typeof Buttons>["buttons"]
}

function Contact2({
  level,
  size,
  align,
  title,
  description,
  channels,
  form,
  className,
  buttons,
  ...props
}: Props) {
  return (
    <Section className={cn(className)} {...props}>
      <Container>
        <Split className="gap-x-0" align={align}>
          <Column className="gap-8">
            <Title level={level} size={size} align={align} text={title} />
            <Description
              className="not-first:mt-4"
              size={size}
              align={align}
              text={description}
            />
            <Channels {...channels} />
            <Buttons className="not-first:mt-8" size={size} buttons={buttons} />
          </Column>
          <Form {...form} />
        </Split>
      </Container>
    </Section>
  )
}

export { Contact2 }
