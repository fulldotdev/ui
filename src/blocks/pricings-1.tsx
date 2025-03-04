import * as React from "react"
import { v4 as uuidv4 } from "uuid"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Abstract } from "@/components/abstract"
import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { Grid } from "@/components/grid"
import { List } from "@/components/list"
import { Price } from "@/components/price"
import { Section } from "@/components/section"
import { Writeup } from "@/components/writeup"

interface Props extends React.ComponentProps<typeof Section> {
  level?: React.ComponentProps<typeof Writeup>["level"]
  size?: React.ComponentProps<typeof Writeup>["size"]
  align?: React.ComponentProps<typeof Writeup>["align"]
  title?: React.ComponentProps<typeof Writeup>["title"]
  description?: React.ComponentProps<typeof Writeup>["description"]
  pricings?: {
    title?: string
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
  children,
  className,
  ...props
}: Props) {
  return (
    <Section className={cn("pricings pricings-1", className)} {...props}>
      <Container className="gap-8" align={align}>
        <Writeup
          level={level}
          size={size}
          align={align}
          title={title}
          description={description}
        >
          {children}
        </Writeup>
        <Grid className="mt-8 gap-x-4 gap-y-8 first:mt-0">
          {pricings?.map(({ title, description, price, list, button }) => (
            <Card className="flex flex-col gap-4 text-lg" key={uuidv4()}>
              <Abstract
                level={level}
                size={size}
                title={title}
                description={description}
              />
              <Price className="text-2xl font-medium" {...price} />
              <List className="mt-8" items={list} />
              <Button className="mt-8" {...button} />
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

export { Pricings1 }
