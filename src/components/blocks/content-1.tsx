import * as React from "react"

import { cn } from "@/lib/utils"
import Column from "@/components/elements/column"
import Container from "@/components/elements/container"
import Image from "@/components/elements/image"
import Links from "@/components/elements/links"
import Prose from "@/components/elements/prose"
import Section from "@/components/elements/section"

interface Props extends React.ComponentProps<typeof Section> {
  links?: React.ComponentProps<typeof Links>["links"]
  image?: React.ComponentProps<typeof Image>
}

export default function ({
  className,
  align,
  size,
  links,
  image,
  children,
  ...props
}: Props) {
  return (
    <Section className={cn("", className)} size={size} align={align} {...props}>
      <Container className="flex max-w-screen-lg flex-col items-center">
        <Image className="rounded-lg" {...image} />
        <Column align={align} className="not-first:mt-16">
          <Prose size={size} align={align}>
            {children}
          </Prose>
          <Links
            className="not-first:mt-8"
            size={size}
            links={links}
            align={align}
          />
        </Column>
      </Container>
    </Section>
  )
}
