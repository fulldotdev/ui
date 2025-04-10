import type { BlockSchema } from "@/schemas/block"
import { Channels } from "@/components/channels"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Form } from "@/components/form"
import { Section } from "@/components/section"
import { Split } from "@/components/split"
import { Title } from "@/components/title"

function Contact2({
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
      <Container className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col items-start">
          <Title size="4xl" level={level}>
            {title}
          </Title>
          <Description className="not-first:mt-4">{description}</Description>
          <Channels className="items-start not-first:mt-8" {...channels} />
        </div>
        <Form {...form} />
      </Container>
    </Section>
  )
}

export { Contact2 }
