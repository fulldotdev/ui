import * as React from "react"

import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Prose } from "@/components/prose"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

interface Props extends React.ComponentProps<typeof Section> {
  level?: React.ComponentProps<typeof Title>["level"]
  title?: React.ComponentProps<typeof Title>["text"]
  description?: string
  image?: React.ComponentProps<typeof Image>
}

function Post1({ level = 1, title, description, image, children }: Props) {
  return (
    <Section>
      <Container className="flex flex-col" size="sm">
        <Prose>
          {title ? <Title level={level} text={title} /> : null}
          {description ? <Description text={description} /> : null}
          <Image className="rounded-lg" {...image} />
          {children}
        </Prose>
      </Container>
    </Section>
  )
}

export { Post1 }
