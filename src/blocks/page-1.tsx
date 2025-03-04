import * as React from "react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/container"
import { Prose } from "@/components/prose"
import { Section } from "@/components/section"

function Page1({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Section>) {
  return React.Children.count(children) > 0 ? (
    <Section className={cn("page page-1", className)} {...props}>
      <Container size="sm">
        <Prose>{children}</Prose>
      </Container>
    </Section>
  ) : null
}

export { Page1 }
