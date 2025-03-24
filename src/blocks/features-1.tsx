import * as React from "react"
import type { BlockSchema } from "@/schemas/block"
import { Check } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

import { cn } from "@/lib/utils"
import { Buttons } from "@/components/buttons"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Grid } from "@/components/grid"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Features1({
  level = 2,
  align,
  title,
  description,
  buttons,
  items,
  className,
  ...props
}: BlockSchema & React.ComponentProps<typeof Section>) {
  return (
    <Section className={cn(className)} {...props}>
      <Container>
        <Column align={align}>
          <Title size="4xl" level={level} align={align} text={title} />
          <Description
            className="not-first:mt-4"
            align={align}
            text={description}
          />
          <Buttons className="not-first:mt-8" align={align} buttons={buttons} />
          <Grid className="gap-x-4 gap-y-8 not-first:mt-16">
            {items?.map(({ title, description }) => (
              <Column key={uuidv4()} align={align}>
                <div className="bg-muted text-muted-foreground inline-flex size-9 items-center justify-center rounded-md">
                  <Check />
                </div>
                <Title
                  className="not-first:mt-4"
                  size="xl"
                  level={level + 1}
                  align={align}
                  text={title}
                />
                <Description
                  className="not-first:mt-2"
                  align={align}
                  text={description}
                />
              </Column>
            ))}
          </Grid>
        </Column>
      </Container>
    </Section>
  )
}

export { Features1 }
