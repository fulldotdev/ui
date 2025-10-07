import * as React from "react"

import { cn } from "@/lib/utils"
import Container from "@/components/elements/container"
import Image from "@/components/elements/image"
import Links from "@/components/elements/links"
import Prose from "@/components/elements/prose"
import Section from "@/components/elements/section"
import Split from "@/components/elements/split"

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
      <Container>
        <Split align={align}>
          <div className="flex w-full flex-col items-start">
            <Prose size={size}>{children}</Prose>
            <Links className="not-first:mt-8" size={size} links={links} />
          </div>
          <Image className="rounded-lg" {...image} />
        </Split>
      </Container>
    </Section>
  )
}
