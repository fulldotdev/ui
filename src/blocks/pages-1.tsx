import * as React from "react"
import type { BlockSchema } from "@/schemas/block"
import { v4 as uuidv4 } from "uuid"

import { cn } from "@/lib/utils"
import { Buttons } from "@/components/buttons"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Grid } from "@/components/grid"
import { Image } from "@/components/image"
import { Link } from "@/components/link"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Pages1({
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
          <Buttons className="not-first:mt-8" buttons={buttons} />
          <Grid className="gap-x-4 gap-y-8 not-first:mt-16">
            {items?.map(({ href, title, description, image }) => (
              <Link
                key={uuidv4()}
                className="group flex flex-col gap-4"
                href={href}
              >
                <Image
                  className="rounded-lg transition-opacity group-hover:opacity-75"
                  {...image}
                />
                <Title size="lg" level={level} align={align} text={title} />
                <Description
                  className="not-first:mt-4"
                  align={align}
                  text={description}
                />
              </Link>
            ))}
          </Grid>
          <Buttons className="not-first:mt-8" buttons={buttons} />
        </Column>
      </Container>
    </Section>
  )
}

export { Pages1 }
