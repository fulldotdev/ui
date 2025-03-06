import * as React from "react"
import { Check } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

import { getHref } from "@/lib/get-href"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Abstract } from "@/components/abstract"
import { Button } from "@/components/button"
import { Buttons } from "@/components/buttons"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Grid } from "@/components/grid"
import { Section } from "@/components/section"
import { Writeup } from "@/components/writeup"

interface Props extends React.ComponentProps<typeof Section> {
  level?: React.ComponentProps<typeof Writeup>["level"]
  size?: React.ComponentProps<typeof Writeup>["size"]
  align?: React.ComponentProps<typeof Writeup>["align"]
  title?: React.ComponentProps<typeof Writeup>["title"]
  description?: React.ComponentProps<typeof Writeup>["description"]
  buttons?: React.ComponentProps<typeof Buttons>["buttons"]
  features?: {
    title?: string
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
  children,
  className,
  ...props
}: Props) {
  return (
    <Section className={cn("features features-1", className)} {...props}>
      <Container className="gap-16" size="sm">
        <Writeup
          level={level}
          size={size}
          align={align}
          title={title}
          description={description}
        >
          {children}
        </Writeup>
        <Buttons buttons={buttons} />
        <Column className="mt-16 gap-x-4 gap-y-4">
          {locations?.map(({ href, title, description }) => (
            <Card
              className="flex flex-col items-start gap-4 p-6"
              key={uuidv4()}
            >
              <Abstract
                level={level}
                align={align}
                title={title}
                description={description}
              />
              <Button variant="secondary" size="sm" href={href}>
                Bekijk locatie
              </Button>
            </Card>
          ))}
        </Column>
      </Container>
    </Section>
  )
}

export { Locations1 }
