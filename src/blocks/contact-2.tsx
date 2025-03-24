import * as React from "react"
import type { BlockSchema } from "@/schemas/block"

import { cn } from "@/lib/utils"
import { Channels } from "@/components/channels"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Form } from "@/components/form"
import { Section } from "@/components/section"
import { Split } from "@/components/split"
import { Title } from "@/components/title"

function Contact2({
  level = 2,
  align,
  title,
  description,
  channels,
  form,
  className,
  ...props
}: BlockSchema & React.ComponentProps<typeof Section>) {
  return (
    <Section className={cn(className)} {...props}>
      <Container>
        <Split className="gap-x-0" align={align}>
          <Column className="items-start">
            <Title size="4xl" level={level} text={title} />
            <Description className="not-first:mt-4" text={description} />
            <Channels className="items-start not-first:mt-8" {...channels} />
          </Column>
          <Form {...form} />
        </Split>
      </Container>
    </Section>
  )
}

export { Contact2 }
