import * as React from "react"

import { cn } from "@/lib/utils"
import { Channels } from "@/components/channels"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Form } from "@/components/form"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

interface Props extends React.ComponentProps<typeof Section> {
  level?: React.ComponentProps<typeof Title>["level"]
  size?: React.ComponentProps<typeof Title>["size"]
  align?: React.ComponentProps<typeof Title>["align"]
  title?: React.ComponentProps<typeof Title>["text"]
  description?: React.ComponentProps<typeof Description>["text"]
  channels?: React.ComponentProps<typeof Channels>
  form?: React.ComponentProps<typeof Form>
}

function Contact1({
  level = 2,
  size,
  align,
  title,
  description,
  channels,
  form,
  className,
  ...props
}: Props) {
  return (
    <Section className={cn(className)} {...props}>
      <Container size="sm">
        <Column align={align}>
          <Title level={level} size={size} align={align} text={title} />
          <Description
            className="not-first:mt-4"
            size={size}
            align={align}
            text={description}
          />
          <Channels align={align} {...channels} />
          <Form className="not-first:mt-16" {...form} />
        </Column>
      </Container>
    </Section>
  )
}

export { Contact1 }
