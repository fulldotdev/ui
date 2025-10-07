import * as React from "react"

import { cn } from "@/lib/utils"
import Column from "@/components/elements/column"
import Container from "@/components/elements/container"
import Date from "@/components/elements/date"
import Image from "@/components/elements/image"
import Person from "@/components/elements/person"
import Prose from "@/components/elements/prose"
import Section from "@/components/elements/section"
import Writeup from "@/components/elements/writeup"

interface Props extends React.ComponentProps<typeof Section> {
  title?: React.ComponentProps<typeof Writeup>["title"]
  description?: React.ComponentProps<typeof Writeup>["description"]
  published?: React.ComponentProps<typeof Date>["date"]
  person?: React.ComponentProps<typeof Person>
  image?: React.ComponentProps<typeof Image>
}

export default function ({
  className,
  align,
  size,
  title,
  description,
  image,
  person,
  published,
  children,
  ...props
}: Props) {
  return (
    <Section className={cn("", className)} size={size} align={align} {...props}>
      <Container className="flex max-w-screen-lg flex-col">
        <Column align={align}>
          <Date date={published} />
          <Writeup
            className="not-first:mt-8"
            size={size}
            align={align}
            title={title}
            description={description}
          />
          <Person className="not-first:mt-8" {...person} />
        </Column>
        <Image className="rounded-lg not-first:mt-16" {...image} />
        <Prose className="mx-auto not-first:mt-16" size={size}>
          {children}
        </Prose>
      </Container>
    </Section>
  )
}
