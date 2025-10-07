import * as React from "react"

import { cn } from "@/lib/utils"
import Background from "@/components/elements/background"
import Column from "@/components/elements/column"
import Container from "@/components/elements/container"
import Section from "@/components/elements/section"
import { TextReveal } from "@/components/magicui/text-reveal"

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
            <h2>
              <TextReveal
                className={cn("**:text-foreground **:font-semibold", {
                  "**:justify-start": align === "start",
                  "**:justify-center": align === "center",
                  "**:justify-end": align === "end",
                })}
              >
                {title}
              </TextReveal>
            </h2>
          )}
          {description && (
            <p className="not-first:mt-[-100vh]">
              <TextReveal
                className={cn(
                  "**:text-muted-foreground **:!mx-px **:text-xl **:font-normal",
                  {
                    "**:justify-start": align === "start",
                    "**:justify-center": align === "center",
                    "**:justify-end": align === "end",
                  }
                )}
              >
                {description}
              </TextReveal>
            </p>
          )}
        </Column>
      </Container>
    </Section>
  )
}
