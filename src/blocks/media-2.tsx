import * as React from "react"

import { cn } from "@/lib/utils"
import { Buttons } from "@/components/buttons"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Grid } from "@/components/grid"
import { Image } from "@/components/image"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

interface Props extends React.ComponentProps<typeof Section> {
  level?: React.ComponentProps<typeof Title>["level"]
  size?: React.ComponentProps<typeof Title>["size"]
  align?: React.ComponentProps<typeof Title>["align"]
  title?: React.ComponentProps<typeof Title>["text"]
  description?: React.ComponentProps<typeof Description>["text"]
  buttons?: React.ComponentProps<typeof Buttons>["buttons"]
  image?: React.ComponentProps<typeof Image>
}

function Media2({
  level = 2,
  size,
  align,
  title,
  description,
  buttons,
  image,
  children,
  className,
  ...props
}: Props) {
  return (
    <Section className={cn("content content-1", className)} {...props}>
      <Container>
        <Grid className="gap-16" align={align}>
          <Column className="gap-8">
            <Title level={level} size={size} align={align} text={title} />
            <Description
              className="not-first:mt-4"
              size={size}
              align={align}
              text={description}
            />
            <Buttons size={size} buttons={buttons} />
          </Column>
          <Image className="rounded-lg" {...image} />
        </Grid>
      </Container>
    </Section>
  )
}

export { Media2 }
