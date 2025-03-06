import * as React from "react"

import { cn } from "@/lib/utils"
import { Buttons } from "@/components/buttons"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Section } from "@/components/section"
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

function Hero3({
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
    <Section
      className={cn(
        "hero hero-3 bg-background -mt-header mb-16 flex items-center md:py-32",
        className
      )}
      {...props}
    >
      <Image
        className="absolute top-0 left-0 size-full object-cover opacity-40"
        {...image}
      />
      <Container
        className="pt-header relative h-full justify-center"
        align={align}
      >
        <Title level={level} size={size} align={align} title={title}>
          {title}
        </Title>
        <Description className="not-first:mt-4" size={size} align={align}>
          {description}
        </Description>
        <Buttons
          className="not-first:mt-8"
          size={size}
          align={align}
          buttons={buttons}
        />
      </Container>
    </Section>
  )
}

export { Hero3 }
