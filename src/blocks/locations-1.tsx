import * as React from "react"
import type { BlockSchema } from "@/schemas/block"
import { v4 as uuidv4 } from "uuid"

import { cn } from "@/lib/utils"
import { Buttons } from "@/components/buttons"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Link } from "@/components/link"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Locations1({
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
            {items?.map(({ href, title, description }) => (
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
