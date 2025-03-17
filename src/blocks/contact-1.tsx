import type { ContactProps } from "@/schemas/blocks/contact"

import { cn } from "@/lib/utils"
import { Channels } from "@/components/channels"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Form } from "@/components/form"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Contact1({
  level = 2,
  align,
  title,
  description,
  channels,
  form,
  className,
  ...props
}: ContactProps & React.ComponentProps<typeof Section>) {
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
          <Channels align={align} {...channels} />
          <Form className="not-first:mt-16" {...form} />
        </Column>
      </Container>
    </Section>
  )
}

export { Contact1 }
