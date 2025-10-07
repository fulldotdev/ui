import * as React from "react"

import { cn } from "@/lib/utils"
import Column from "@/components/elements/column"
import Container from "@/components/elements/container"
import Links from "@/components/elements/links"
import Section from "@/components/elements/section"
import Split from "@/components/elements/split"
import Writeup from "@/components/elements/writeup"

interface Props extends React.ComponentProps<typeof Section> {
  links?: React.ComponentProps<typeof Links>["links"]
  src?: string
}

export default function ({
  className,
  align,
  size,
  links,
  src,
  children,
  ...props
}: Props) {
  return (
    <Section className={cn("", className)} size={size} align={align} {...props}>
      <Container className="container">
        <Split align={align}>
          <Column align="start">
            <Writeup size={size}>{children}</Writeup>
            <Links className="not-first:mt-8" size={size} links={links} />
          </Column>
          <iframe
            src={src}
            width="640"
            height="480"
            className="bg-muted aspect-video h-full w-full overflow-hidden rounded-lg"
          ></iframe>
        </Split>
      </Container>
    </Section>
  )
}
