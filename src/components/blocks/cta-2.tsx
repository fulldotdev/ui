import * as React from "react"

import { cn } from "@/lib/utils"
import Background from "@/components/elements/background"
import Column from "@/components/elements/column"
import Container from "@/components/elements/container"
import Links from "@/components/elements/links"
import Panel from "@/components/elements/panel"
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
  links,
  background,
  children,
  ...props
}: Props) {
  return (
    <Section className={cn("", className)} size={size} align={align} {...props}>
      <Container>
        <Panel>
          <Background
            className="mask-y-from-white mask-y-from-75% mask-y-to-transparent"
            variant={background}
          />
          <Column align={align}>
            <Writeup className="max-w-3xl" size={size} align={align}>
              {children}
            </Writeup>
            <Links
              className="not-first:mt-8"
              size={size}
              links={links}
              align={align}
            />
          </Column>
        </Panel>
      </Container>
    </Section>
  )
}
