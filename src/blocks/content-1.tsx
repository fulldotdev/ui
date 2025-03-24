import * as React from "react"
import type { BlockSchema } from "@/schemas/block"

import { cn } from "@/lib/utils"
import { Buttons } from "@/components/buttons"
import { Container } from "@/components/container"
import { Prose } from "@/components/prose"
import { Section } from "@/components/section"

function Content1({
  level = 2,
  align,
  title,
  description,
  buttons,
  image,
  children,
  className,
  ...props
}: BlockSchema & React.ComponentProps<typeof Section>) {
  return (
    <Section className={cn(className)} {...props}>
      <Container className="flex flex-col">
        <Prose>
          {children}
          <Buttons className="not-first:mt-8" align={align} buttons={buttons} />
        </Prose>
      </Container>
    </Section>
  )
}

export { Content1 }
