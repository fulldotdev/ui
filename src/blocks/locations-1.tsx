import * as React from "react"
import type { LocationsProps } from "@/schemas/blocks/locations"
import { v4 as uuidv4 } from "uuid"

import { getHref } from "@/lib/get-href"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/button"
import { Buttons } from "@/components/buttons"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Grid } from "@/components/grid"
import { Link } from "@/components/link"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Locations1({
  level = 2,
  align,
  title,
  description,
  buttons,
  locations,
  className,
  ...props
}: LocationsProps & React.ComponentProps<typeof Section>) {
  return (
    <Section className={cn(className)} {...props}>
      <Container size="sm">
        <Column align={align}>
          <Title size="4xl" level={level} align={align} text={title} />
          <Description
            className="not-first:mt-4"
            align={align}
            text={description}
          />
          <Buttons className="not-first:mt-8" buttons={buttons} />
          <Column className="gap-x-4 gap-y-4 not-first:mt-16">
            {locations?.map(({ href, title, description }) => (
              <Link
                href={href}
                className="flex flex-col items-start gap-4 rounded-lg border p-6"
                key={uuidv4()}
              >
                <Title level={level + 1} align={align} text={title} />
                <Description align={align} text={description} />
              </Link>
            ))}
          </Column>
        </Column>
      </Container>
    </Section>
  )
}

export { Locations1 }
