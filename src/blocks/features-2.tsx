import { Check } from "lucide-react"

import type { BlockSchema } from "@/schemas/block"
import { Buttons } from "@/components/buttons"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Grid } from "@/components/grid"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Features2({
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
      <Container className="flex flex-col items-center">
        <Title className="text-center" size="4xl" level={level}>
          {title}
        </Title>
        <Description className="text-center not-first:mt-4">
          {description}
        </Description>
        <Buttons className="justify-center not-first:mt-8" buttons={buttons} />
        <Grid className="gap-8 gap-x-16 not-first:mt-16">
          {items?.map(({ title, description }) => (
            <div key={title} className="flex flex-col items-center">
              <div className="bg-muted text-muted-foreground inline-flex size-9 items-center justify-center rounded-md">
                <Check />
              </div>
              <Title
                className="text-center not-first:mt-4"
                size="xl"
                level={level + 1}
              >
                {title}
              </Title>
              <Description className="text-center not-first:mt-2">
                {description}
              </Description>
            </div>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

export { Features2 }
