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
  level: React.ComponentProps<typeof Title>["level"]
  size?: React.ComponentProps<typeof Title>["size"]
  align?: React.ComponentProps<typeof Title>["align"]
  title?: React.ComponentProps<typeof Title>["text"]
  description?: React.ComponentProps<typeof Description>["text"]
  buttons?: React.ComponentProps<typeof Buttons>["buttons"]
  collections?: {
    href?: React.ComponentProps<typeof Link>["href"]
    image?: React.ComponentProps<typeof Image>
    title?: React.ComponentProps<typeof Title>["text"]
  }[]
}

function Collections1({
  level,
  size,
  align,
  title,
  description,
  buttons,
  collections,
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
            className="not-first:mt-8 max-lg:hidden"
            align={align}
            buttons={buttons}
          />
          <Grid className="not-first:mt-16 first:mt-0">
            {collections?.map(({ href, title, image }) => (
              <Link
                className="group flex flex-col gap-4"
                key={uuidv4()}
                href={href}
              >
                <Image
                  className="aspect-square rounded-lg transition-opacity group-hover:opacity-75"
                  {...image}
                />
                <Title className="font-medium" level={level + 1} text={title} />
              </Link>
            ))}
          </Grid>
          <Buttons className="not-first:mt-8 lg:hidden" buttons={buttons} />
        </Column>
      </Container>
    </Section>
  )
}

export { Collections1 }
