import type { BlockSchema } from "@/schemas/block"
import { Accordion } from "@/components/accordion"
import { Buttons } from "@/components/buttons"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Faqs1({
  className,
  id,
  level = 2,
  title,
  description,
  buttons,
  items,
}: BlockSchema) {
  return (
    <Section className={className} id={id}>
      <Container className="flex flex-col" size="sm">
        <Title size="4xl" level={level}>
          {title}
        </Title>
        <Description className="not-first:mt-4">{description}</Description>
        <Buttons className="not-first:mt-8" buttons={buttons} />
        <Accordion
          className="not-first:mt-16"
          type="single"
          collapsible
          items={items}
        />
      </Container>
    </Section>
  )
}

export { Faqs1 }
