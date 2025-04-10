import type { BlockSchema } from "@/schemas/block"
import { Buttons } from "@/components/buttons"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Panel } from "@/components/panel"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Cta1({
  className,
  id,
  level = 2,
  title,
  description,
  buttons,
}: BlockSchema) {
  return (
    <Section className={className} id={id}>
      <Container>
        <Panel className="flex flex-col">
          <Title size="5xl" level={level}>
            {title}
          </Title>
          <Description className="not-first:mt-4" size="lg">
            {description}
          </Description>
          <Buttons className="not-first:mt-8" size="lg" buttons={buttons} />
        </Panel>
      </Container>
    </Section>
  )
}

export { Cta1 }
