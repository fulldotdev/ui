import * as React from "react"

import { cn } from "@/lib/utils"
import Column from "@/components/elements/column"
import Container from "@/components/elements/container"
import Grid from "@/components/elements/grid"
import Links from "@/components/elements/links"
import Section from "@/components/elements/section"
import Writeup from "@/components/elements/writeup"

interface Props extends React.ComponentProps<typeof Section> {
  links?: React.ComponentProps<typeof Links>["links"]
  blocks?: {
    title?: string
    href?: string
  }[]
}

export default function ({
  className,
  align,
  size,
  links,
  blocks,
  children,
  ...props
}: Props) {
  return (
    <Section className={cn("", className)} size={size} align={align} {...props}>
      <Container>
        <Column align={align}>
          <Writeup className="not-first:mt-4" size={size} align={align}>
            {children}
          </Writeup>
          <Links
            className="not-first:mt-8"
            size={size}
            links={links}
            align={align}
          />
          {blocks && blocks.length > 0 && (
            <Grid size="sm" className="gap-x-16 gap-y-8 not-first:mt-16">
              {blocks?.map(({ title, href }, i) => (
                <a
                  className="text-foreground text-xl hover:underline"
                  key={i}
                  href={href}
                >
                  {title}
                </a>
              ))}
            </Grid>
          )}
        </Column>
      </Container>
    </Section>
  )
}
