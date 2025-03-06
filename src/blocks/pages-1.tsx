import * as React from "react"
import { v4 as uuidv4 } from "uuid"

import { cn } from "@/lib/utils"
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
  pages?: {
    href?: string
    title?: React.ComponentProps<typeof Title>["text"]
    description?: string
    image?: React.ComponentProps<typeof Image>
  }[]
}

function Pages1({
  level = 2,
  size,
  align,
  title,
  description,
  buttons,
  pages,
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
          <Buttons className="not-first:mt-8" buttons={buttons} />
          <Grid className="gap-x-4 gap-y-8 not-first:mt-16">
            {pages?.map(({ href, title, description, image }) => (
              <Link
                key={uuidv4()}
                className="group flex flex-col gap-4"
                href={href}
              >
                <Image
                  className="rounded-lg transition-opacity group-hover:opacity-75"
                  {...image}
                />
                <Title
                  className="text-2xl"
                  level={level}
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
              </Link>
            ))}
          </Grid>
          <Buttons className="not-first:mt-8" buttons={buttons} />
        </Column>
      </Container>
    </Section>
  )
}

export { Pages1 }
