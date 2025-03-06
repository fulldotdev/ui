import * as React from "react"
import { Check } from "lucide-react"
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
import { Section } from "@/components/section"
import { Title } from "@/components/title"

interface Props extends React.ComponentProps<typeof Section> {
  level?: React.ComponentProps<typeof Title>["level"]
  size?: React.ComponentProps<typeof Title>["size"]
  align?: React.ComponentProps<typeof Title>["align"]
  title?: React.ComponentProps<typeof Title>["text"]
  description?: React.ComponentProps<typeof Description>["text"]
  buttons?: React.ComponentProps<typeof Buttons>["buttons"]
  locations?: {
    href?: string
    title?: React.ComponentProps<typeof Title>["text"]
    description?: string
  }[]
}

function Locations1({
  level = 2,
  size,
  align,
  title,
  description,
  buttons,
  locations,
  className,
  ...props
}: Props) {
  return (
    <Section className={cn(className)} {...props}>
      <Container size="sm">
        <Column align={align}>
          <Title level={level} size={size} align={align} text={title} />
          <Description
            className="not-first:mt-4"
            size={size}
            align={align}
            text={description}
          />
          <Buttons className="not-first:mt-8" buttons={buttons} />
          <Column className="gap-x-4 gap-y-4 not-first:mt-16">
            {locations?.map(({ href, title, description }) => (
              <Card
                className="flex flex-col items-start gap-4 p-6"
                key={uuidv4()}
              >
                <Title level={level + 1} align={align} />
                <Description align={align}>{description}</Description>
                <Button variant="secondary" size="sm" href={href}>
                  Bekijk locatie
                </Button>
              </Card>
            ))}
          </Column>
        </Column>
      </Container>
    </Section>
  )
}

export { Locations1 }
