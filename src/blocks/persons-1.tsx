import * as React from "react"
import type { PersonsProps } from "@/schemas/blocks/persons"
import { v4 as uuidv4 } from "uuid"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Buttons } from "@/components/buttons"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Grid } from "@/components/grid"
import { Image } from "@/components/image"
import { Link } from "@/components/link"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Persons1({
  level = 2,
  align,
  title,
  description,
  buttons,
  persons,
  className,
  ...props
}: PersonsProps & React.ComponentProps<typeof Section>) {
  return (
    <Section className={cn(className)} {...props}>
      <Container>
        <Column align={align}>
          <Title level={level} size="4xl" align={align} text={title} />
          <Description
            className="not-first:mt-4"
            align={align}
            text={description}
          />
          <Buttons className="not-first:mt-8" align={align} buttons={buttons} />
          <Grid className="gap-16 not-first:mt-16">
            {persons?.map(({ href, image, title, description }) => (
              <Link className="group max-w-md" key={uuidv4()} href={href}>
                <Image
                  className="aspect-square w-full max-w-60 rounded-full object-cover transition-opacity group-hover:opacity-75"
                  {...image}
                />
                <Title
                  className="text-xl not-first:mt-4"
                  level={level + 1}
                  align={align}
                  text={title}
                />
                <Description
                  className="not-first:mt-1"
                  align={align}
                  text={description}
                />
              </Link>
            ))}
          </Grid>
        </Column>
      </Container>
    </Section>
  )
}

export { Persons1 }
