import * as React from "react"

import { cn } from "@/lib/utils"
import Abstract from "@/components/elements/abstract"
import Column from "@/components/elements/column"
import Container from "@/components/elements/container"
import Form from "@/components/elements/form"
import Grid from "@/components/elements/grid"
import Section from "@/components/elements/section"
import Social from "@/components/elements/social"
import Writeup from "@/components/elements/writeup"

interface Props extends React.ComponentProps<typeof Section> {
  form?: any
  channels?: {
    text?: string
    href?: string
    icon?: string
  }[]
}

export default function ({
  className,
  align,
  size,
  form,
  channels,
  children,
  ...props
}: Props) {
  return (
    <Section className={cn("", className)} size={size} align={align} {...props}>
      <Container className="max-w-screen-md">
        <Column align={align}>
          <Writeup size={size} align={align}>
            {children}
          </Writeup>
          {channels && channels.length > 0 && (
            <Grid size="sm" className="not-first:mt-16">
              {channels?.map(({ text, href }, i) => (
                <Column key={i} align={align}>
                  <Social variant="secondary" size={size} href={href} />
                  <Abstract
                    className="not-first:mt-4"
                    size={size}
                    align={align}
                  >
                    {text}
                  </Abstract>
                </Column>
              ))}
            </Grid>
          )}
          <Form className="not-first:mt-16" {...form} />
        </Column>
      </Container>
    </Section>
  )
}
