import { Check } from "lucide-react"

import type { BlockSchema } from "@/schemas/block"
import { Buttons } from "@/components/buttons"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Features1({
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
      <Container className="flex flex-col">
        <Title size="4xl" level={level}>
          {title}
        </Title>
        <Description className="not-first:mt-4" size="lg">
          {description}
        </Description>
        <Buttons className="not-first:mt-8" buttons={buttons} />
        <div className="grid gap-x-4 gap-y-8 not-first:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {items?.map(({ title, description }) => (
            <div key={title} className="flex flex-col">
              <div className="bg-muted text-muted-foreground inline-flex size-9 items-center justify-center rounded-md">
                <Check />
              </div>
              <Title className="not-first:mt-4" size="xl" level={level + 1}>
                {title}
              </Title>
              <Description className="not-first:mt-2">
                {description}
              </Description>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export { Features1 }
