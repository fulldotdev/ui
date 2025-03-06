import * as React from "react"

import { cn } from "@/lib/utils"
import { Buttons } from "@/components/buttons"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Grid } from "@/components/grid"
import { Image } from "@/components/image"
import { Section } from "@/components/section"
import { Split } from "@/components/split"
import { Title } from "@/components/title"
import { Writeup } from "@/components/writeup"

interface Props extends React.ComponentProps<typeof Section> {
  level?: React.ComponentProps<typeof Writeup>["level"]
  size?: React.ComponentProps<typeof Writeup>["size"]
  align?: React.ComponentProps<typeof Writeup>["align"]
  title?: React.ComponentProps<typeof Writeup>["title"]
  description?: React.ComponentProps<typeof Writeup>["description"]
  buttons?: React.ComponentProps<typeof Buttons>["buttons"]
  image?: React.ComponentProps<typeof Image>
}
function Hero2({
  level = 1,
  size = "xl",
  align,
  title,
  description,
  buttons,
  image,
  className,
  ...props
}: Props) {
  return (
    <Section className={cn("content content-1", className)} {...props}>
      <Container>
        <Split align={align}>
          <Title level={level} size={size} align={align}>
            {title}
          </Title>
          <Description className="not-first:mt-4" size={size} align={align}>
            {description}
          </Description>
          <Buttons className="not-first:mt-8" size={size} buttons={buttons} />
          <Image className="rounded-lg not-first:mt-16" {...image} />
        </Split>
      </Container>
    </Section>
  )
}

export { Hero2 }
