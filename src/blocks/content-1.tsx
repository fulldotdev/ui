import * as React from "react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Prose } from "@/components/prose"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

interface Props extends React.ComponentProps<typeof Section> {
  level: React.ComponentProps<typeof Title>["level"]
  size?: React.ComponentProps<typeof Title>["size"]
  align?: React.ComponentProps<typeof Title>["align"]
  title?: React.ComponentProps<typeof Title>["text"]
  description?: React.ComponentProps<typeof Description>["text"]
  image?: React.ComponentProps<typeof Image>
}

function Content1({
  title,
  description,
  image,
  children,
  className,
  ...props
}: Props) {
  return (
    <Section className={cn(className)} {...props}>
      <Container className="flex flex-col">
        <Prose>
          {title ? <Title level={1}>{title}</Title> : null}
          {description ? <Description>{description}</Description> : null}
          <Image className="rounded-lg" {...image} />
          {children}
        </Prose>
      </Container>
    </Section>
  )
}

export { Content1 }
