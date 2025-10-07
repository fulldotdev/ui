import * as React from "react"

import { cn } from "@/lib/utils"
import Background from "@/components/elements/background"
import Column from "@/components/elements/column"
import Container from "@/components/elements/container"
import Section from "@/components/elements/section"
import { TextAnimate } from "@/components/magicui/text-animate"

interface Props extends React.ComponentProps<typeof Section> {
  title?: string
  description?: string
  background?: React.ComponentProps<typeof Background>["variant"]
}

export default function ({
  className,
  align,
  size,
  background,
  title,
  description,
  ...props
}: Props) {
  return (
    <Section className={cn("", className)} size={size} align={align} {...props}>
      <Background
        className="mask-y-from-white mask-y-from-75% mask-y-to-transparent"
        variant={background}
      />
      <Container>
        <Column align={align}>
          {title && (
            <h2 className="text-4xl font-semibold">
              <TextAnimate by="word">{title}</TextAnimate>
            </h2>
          )}
          {description && (
            <p className="text-muted-foreground mt-4 text-lg">
              <TextAnimate by="word" delay={0.4}>
                {description}
              </TextAnimate>
            </p>
          )}
        </Column>
      </Container>
    </Section>
  )
}
