import type { BlockSchema } from "@/schemas/block"
import { Accordion } from "@/components/accordion"
import { Buttons } from "@/components/buttons"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Faqs2({
  className,
  level = 2,
  title,
  description,
  buttons,
  items,
}: BlockSchema) {
  return (
    <Section className={className}>
      <Container className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col items-start">
          <Title size="4xl" level={level}>
            {title}
          </Title>
          <Description className="not-first:mt-4">{description}</Description>
          <Buttons className="not-first:mt-8" buttons={buttons} />
        </div>
        <Accordion level={level + 1} type="single" collapsible items={items} />
      </Container>
    </Section>
  )
}

export { Faqs2 }
