import * as React from "react"

import { cn } from "@/lib/utils"
import { Channels } from "@/components/channels"
import { Container } from "@/components/container"
import { Form } from "@/components/form"
import { Section } from "@/components/section"
import { Writeup } from "@/components/writeup"

interface Props extends React.ComponentProps<typeof Section> {
  level?: React.ComponentProps<typeof Writeup>["level"]
  size?: React.ComponentProps<typeof Writeup>["size"]
  align?: React.ComponentProps<typeof Writeup>["align"]
  title?: React.ComponentProps<typeof Writeup>["title"]
  description?: React.ComponentProps<typeof Writeup>["description"]
  channels?: React.ComponentProps<typeof Channels>
  form?: React.ComponentProps<typeof Form>
  children?: React.ReactNode
}

function Contact1({
  level,
  size,
  align,
  title,
  description,
  channels,
  form,
  children,
  className,
  ...props
}: Props) {
  return (
    <Section className={cn("contact contact-1", className)} {...props}>
      <Container className="gap-8" size="sm" align={align}>
        <Writeup
          level={level}
          size={size}
          align={align}
          title={title}
          description={description}
        >
          {children}
        </Writeup>
        <Channels {...channels} />
        <Form className="mt-8 first:mt-0" {...form} />
      </Container>
    </Section>
  )
}

export { Contact1 }
