import * as React from "react"
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

interface Props extends React.ComponentProps<typeof Section> {
  level?: React.ComponentProps<typeof Title>["level"]
  size?: React.ComponentProps<typeof Title>["size"]
  align?: React.ComponentProps<typeof Title>["align"]
  title?: React.ComponentProps<typeof Title>["text"]
  description?: React.ComponentProps<typeof Description>["text"]
  buttons?: React.ComponentProps<typeof Buttons>["buttons"]
  persons?: {
    href?: string
    title?: React.ComponentProps<typeof Title>["text"]
    description?: string
    image?: React.ComponentProps<typeof Image>
  }[]
}

function Persons1({
  level = 2,
  size,
  align,
  title,
  description,
  buttons,
  persons,
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
          <Buttons
            className="not-first:mt-8"
            size={size}
            align={align}
            buttons={buttons}
          />
          <Grid className="gap-16 not-first:mt-16">
            {persons?.map(({ href, image, title, description }) => (
              <Link className="max-w-md" key={uuidv4()} href={href}>
                <Column className="gap-6" align={align}>
                  <Image
                    className="aspect-square w-full max-w-60 rounded-full object-cover"
                    {...image}
                  />
                  <Title
                    level={level + 1}
                    size={size}
                    align={align}
                    text={title}
                  />
                  <Description size={size} align={align} text={description} />
                </Column>
              </Link>
            ))}
          </Grid>
        </Column>
      </Container>
    </Section>
  )
}

export { Persons1 }
