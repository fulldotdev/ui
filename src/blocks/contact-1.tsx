import type { BlockSchema } from "@/schemas/block"
import { Channels } from "@/components/channels"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Form } from "@/components/form"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Contact1({
  className,
  id,
  level = 2,
  title,
  description,
  channels,
  form,
}: BlockSchema) {
  return (
    <Section className={className} id={id}>
      <Container className="flex flex-col" size="sm">
        <Title size="4xl" level={level}>
          {title}
        </Title>
        <Description className="not-first:mt-4">{description}</Description>
        <Channels className="not-first:mt-8" {...channels} />
        <Form className="not-first:mt-16" {...form} />
      </Container>
    </Section>
  )
}

export { Contact1 }
