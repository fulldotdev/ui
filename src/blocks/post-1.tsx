import * as React from "react"

import type { BlockSchema } from "@/schemas/block"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Prose } from "@/components/prose"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Post1({
  className,
  id,
  level = 1,
  title,
  description,
  image,
  children,
}: BlockSchema & {
  children: React.ReactNode
}) {
  return (
    <Section className={className} id={id}>
      <Container className="flex flex-col" size="sm">
        <Prose>
          {title ? <Title level={level}>{title}</Title> : null}
          {description ? <Description>{description}</Description> : null}
          {image ? <Image className="rounded-lg" {...image} /> : null}
          {children}
        </Prose>
      </Container>
    </Section>
  )
}

export { Post1 }
