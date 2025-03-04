import * as React from "react"

import { cn } from "@/lib/utils"
import { Buttons } from "@/components/buttons"
import { Container } from "@/components/container"
import { Image } from "@/components/image"
import { Section } from "@/components/section"
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

function Hero1({
  level = 1,
  size = "xl",
  align,
  title,
  description,
  buttons,
  image,
  className,
  children,
  ...props
}: Props) {
  return (
    <Section className={cn("hero hero-1", className)} {...props}>
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
        <Buttons size={size} align={align} buttons={buttons} />
        <Image className="mt-8 rounded-lg first:mt-0" {...image} />
      </Container>
    </Section>
  )
}

export { Hero1 }
