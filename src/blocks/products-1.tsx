import * as React from "react"
import type { BlockSchema } from "@/schemas/block"
import { v4 as uuidv4 } from "uuid"

import { cn } from "@/lib/utils"
import { Buttons } from "@/components/buttons"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Grid } from "@/components/grid"
import { Image } from "@/components/image"
import { Link } from "@/components/link"
import { Price } from "@/components/price"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Products1({
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
        <Title level={level} size="4xl" align={align} text={title} />
        <Description
          className="not-first:mt-4"
          align={align}
          text={description}
        />
        <Buttons
          className="not-first:mt-8 max-sm:hidden"
          align={align}
          buttons={buttons}
        />
        <Grid className="gap-x-4 gap-y-8 not-first:mt-16">
          {items?.map(({ href, title, image, price }) => (
            <Link
              className="group flex flex-col gap-4"
              key={uuidv4()}
              href={href}
            >
              <Image
                className="bg-muted ring-muted aspect-square rounded-md object-contain p-4 ring-1 transition-opacity group-hover:opacity-75"
                {...image}
              />
              <Title
                className="text-sm"
                level={level + 1}
                size="xl"
                align={align}
                text={title}
              />
              <Price className="text-muted-foreground text-sm" {...price} />
            </Link>
          ))}
        </Grid>
        <Buttons className="sm:hidden" buttons={buttons} />
      </Container>
    </Section>
  )
}

export { Products1 }
