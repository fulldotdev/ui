import * as React from "react"
import type { CollectionsProps } from "@/schemas/blocks/collections"
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

function Collections1({
  level = 2,
  align,
  title,
  description,
  buttons,
  collections,
  className,
  ...props
}: CollectionsProps & React.ComponentProps<typeof Section>) {
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
          <Buttons
            className="not-first:mt-8 max-lg:hidden"
            align={align}
            buttons={buttons}
          />
          <Grid className="not-first:mt-16 first:mt-0">
            {collections?.map(({ href, title, image }) => (
              <Link
                className="group flex flex-col gap-4"
                key={uuidv4()}
                href={href}
              >
                <Image
                  className="aspect-square rounded-lg transition-opacity group-hover:opacity-75"
                  {...image}
                />
                <Title className="font-medium" level={level + 1} text={title} />
              </Link>
            ))}
          </Grid>
          <Buttons className="not-first:mt-8 lg:hidden" buttons={buttons} />
        </Column>
      </Container>
    </Section>
  )
}

export { Collections1 }
