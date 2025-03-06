import * as React from "react"
import { v4 as uuidv4 } from "uuid"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/button"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Grid } from "@/components/grid"
import { List } from "@/components/list"
import { Price } from "@/components/price"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

interface Props extends React.ComponentProps<typeof Section> {
  level: React.ComponentProps<typeof Title>["level"]
  size?: React.ComponentProps<typeof Title>["size"]
  align?: React.ComponentProps<typeof Title>["align"]
  title?: React.ComponentProps<typeof Title>["text"]
  description?: React.ComponentProps<typeof Description>["text"]
  pricings?: {
    title?: React.ComponentProps<typeof Title>["text"]
    description?: string
    price?: React.ComponentProps<typeof Price>
    list?: React.ComponentProps<typeof List>["items"]
    button?: React.ComponentProps<typeof Button>
  }[]
}

function Pricings1({
  level,
  size,
  align,
  title,
  description,
  pricings,
  className,
  ...props
}: Props) {
  return (
    <Section className={cn(className)} {...props}>
      <Container>
        <Column align={align}>
          <Title level={level} size={size} align={align} text={title} />
          <Description
            className="not-first:mt-4"
            size={size}
            align={align}
            text={description}
          />
          <Grid className="gap-x-4 gap-y-8 not-first:mt-16">
            {pricings?.map(({ title, description, price, list, button }) => (
              <Card className="flex flex-col gap-4 text-lg" key={uuidv4()}>
                <Title
                  level={level + 1}
                  size={size}
                  align={align}
                  text={title}
                />
                <Description
                  className="not-first:mt-4"
                  size={size}
                  align={align}
                  text={description}
                />
                <Price className="text-2xl font-medium" {...price} />
                <List className="mt-8" items={list} />
                <Button className="mt-8" {...button} />
              </Card>
            ))}
          </Grid>
        </Column>
      </Container>
    </Section>
  )
}

export { Pricings1 }
