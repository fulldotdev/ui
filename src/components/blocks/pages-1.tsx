import * as React from "react"

import { cn } from "@/lib/utils"
import Abstract from "@/components/elements/abstract"
import Column from "@/components/elements/column"
import Container from "@/components/elements/container"
import Grid from "@/components/elements/grid"
import Image from "@/components/elements/image"
import Links from "@/components/elements/links"
import Section from "@/components/elements/section"
import Writeup from "@/components/elements/writeup"

interface Props extends React.ComponentProps<typeof Section> {
  links?: React.ComponentProps<typeof Links>["links"]
  services?: {
    href?: string
    title?: string
    description?: string
    image?: React.ComponentProps<typeof Image>
  }[]
}

export default function ({
  className,
  align,
  size,
  links,
  services,
  children,
  ...props
}: Props) {
  return (
    <Section className={cn("", className)} size={size} align={align} {...props}>
      <Container>
        <Column align={align}>
          <Writeup className="not-first:mt-4" size={size}>
            {children}
          </Writeup>
          <Links
            className="not-first:mt-8 not-last:mb-4"
            size={size}
            links={links}
          />
          <Grid className="gap-4 not-first:mt-16">
            {services?.map(({ title, description, image, href }, i) => (
              <a
                href={href}
                className="group flex flex-col items-start"
                key={i}
              >
                <Image
                  className="aspect-4/3 rounded-lg object-cover transition-opacity group-hover:opacity-75"
                  sizes="200px"
                  {...image}
                />
                <Abstract
                  className="not-first:mt-4"
                  size={size}
                  align={align}
                  title={title}
                  description={description}
                />
              </a>
            ))}
          </Grid>
        </Column>
      </Container>
    </Section>
  )
}
