import * as React from "react"

import { cn } from "@/lib/utils"
import Abstract from "@/components/elements/abstract"
import Column from "@/components/elements/column"
import Container from "@/components/elements/container"
import Grid from "@/components/elements/grid"
import Image from "@/components/elements/image"
import Linkbox from "@/components/elements/linkbox"
import Links from "@/components/elements/links"
import Section from "@/components/elements/section"
import Writeup from "@/components/elements/writeup"

interface Props extends React.ComponentProps<typeof Section> {
  links?: React.ComponentProps<typeof Links>["links"]
  persons?: {
    title?: string
    description?: string
    image?: React.ComponentProps<typeof Image>
    href?: string
    [key: string]: any
  }[]
}

export default function ({
  className,
  align,
  size,
  links,
  persons,
  children,
  ...props
}: Props) {
  return (
    <Section className={cn("", className)} size={size} align={align} {...props}>
      <Container className="container">
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
          {persons && persons.length > 0 && (
            <Grid size={size} className="not-first:mt-16">
              {persons?.map(({ title, tagline, image, href }, i) => (
                <Linkbox key={i} href={href}>
                  <Column align="center">
                    <Image
                      className="aspect-square h-full w-full max-w-56 overflow-hidden rounded-full object-cover"
                      sizes="200px"
                      {...image}
                    />
                    <Abstract
                      className="not-first:mt-6"
                      size={size}
                      align="center"
                    >
                      {title && <h3>{title}</h3>}
                      {tagline && <p>{tagline}</p>}
                    </Abstract>
                  </Column>
                </Linkbox>
              ))}
            </Grid>
          )}
        </Column>
      </Container>
    </Section>
  )
}
