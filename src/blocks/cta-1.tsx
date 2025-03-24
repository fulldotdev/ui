import type { BlockSchema } from "@/schemas/block"

import { cn } from "@/lib/utils"
import { Buttons } from "@/components/buttons"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Panel } from "@/components/panel"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Cta1({
  id,
  level = 2,
  align,
  title,
  description,
  buttons,
  className,
}: BlockSchema) {
  return (
    <Section id={id} className={cn(className)}>
      <Container>
        <Panel>
          <Column align={align}>
            <Title size="5xl" level={level} align={align} text={title} />
            <Description
              className="not-first:mt-4"
              size="lg"
              align={align}
              text={description}
            />
            <Buttons
              className="not-first:mt-8"
              size="lg"
              align={align}
              buttons={buttons}
            />
          </Column>
        </Panel>
      </Container>
    </Section>
  )
}

export { Cta1 }
