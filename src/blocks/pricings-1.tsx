import * as React from "react"
import type { BlockSchema } from "@/schemas/block"
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

function Pricings1({
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
            size="xl"
            align={align}
            text={description}
          />
          <Grid className="gap-x-4 gap-y-8 not-first:mt-16">
            {items?.map(({ title, description, price, list, button }) => (
              <Card className="flex flex-col gap-4 px-6 text-lg" key={uuidv4()}>
                <Title level={level + 1} size="xl" align={align} text={title} />
                <Description
                  className="not-first:mt-4"
                  size="xl"
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
