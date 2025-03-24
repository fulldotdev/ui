import * as React from "react"
import type { BlockSchema } from "@/schemas/block"

import { cn } from "@/lib/utils"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Prose } from "@/components/prose"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Post1({
  level = 1,
  title,
  description,
  image,
  children,
  className,
  ...props
}: BlockSchema & React.ComponentProps<typeof Section>) {
  return (
    <Section className={cn(className)} {...props}>
      <Container className="flex flex-col" size="sm">
        <Prose>
          {title ? <Title level={level} text={title} /> : null}
          {description ? <Description text={description} /> : null}
          {image ? <Image className="rounded-lg" {...image} /> : null}
          {children}
        </Prose>
      </Container>
    </Section>
  )
}

export { Post1 }
