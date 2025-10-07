import * as React from "react"

import { cn } from "@/lib/utils"
import Column from "@/components/elements/column"
import Container from "@/components/elements/container"
import Date from "@/components/elements/date"
import Links from "@/components/elements/links"
import List from "@/components/elements/list"
import Prose from "@/components/elements/prose"
import Section from "@/components/elements/section"
import Writeup from "@/components/elements/writeup"

interface Props extends React.ComponentProps<typeof Section> {
  published?: React.ComponentProps<typeof Date>["date"]
  title?: string
  description?: string
  location?: string
  salary?: string
  hours?: string
  links?: React.ComponentProps<typeof Links>["links"]
}

export default function ({
  className,
  align,
  size,
  title,
  description,
  location,
  salary,
  hours,
  published,
  links,
  children,
  ...props
}: Props) {
  return (
    <Section className={cn("", className)} size={size} align={align} {...props}>
      <Container className="max-w-screen-md">
        <Column align={align}>
          <Date date={published} />
          <Writeup className="not-first:mt-6" size={size} align={align}>
            {title && <h1>{title}</h1>}
            {description && <p>{description}</p>}
          </Writeup>
          <List className="not-first:mt-6" list={[location, salary, hours]} />
          <Links className="not-first:mt-6" size={size} links={links} />
          <Prose className="not-first:mt-16" size={size}>
            {children}
          </Prose>
        </Column>
      </Container>
    </Section>
  )
}
