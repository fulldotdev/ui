import * as React from "react"

import { cn } from "@/lib/utils"
import Background from "@/components/elements/background"
import Column from "@/components/elements/column"
import Container from "@/components/elements/container"
import Links from "@/components/elements/links"
import Section from "@/components/elements/section"
import Writeup from "@/components/elements/writeup"

interface Props extends React.ComponentProps<typeof Section> {
  links?: React.ComponentProps<typeof Links>["links"]
  background?: React.ComponentProps<typeof Background>["variant"]
}

export default function ({
  className,
  align,
  size,
  background,
  links,
  children,
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
          <Writeup
            className="text-balance not-first:mt-6"
            size={size}
            align={align}
          >
            {children}
          </Writeup>
          <Links
            className="gap-2 not-first:mt-8"
            size={size}
            links={links}
            align={align}
          />
        </Column>
      </Container>
    </Section>
  )
}
