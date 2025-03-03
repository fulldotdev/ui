import { Container } from '@/components/container'
import { Image } from '@/components/image'
import { Prose } from '@/components/prose'
import { Section } from '@/components/section'
import * as React from 'react'

interface Props extends React.ComponentProps<typeof Section> {
  title?: string
  description?: string
  image?: React.ComponentProps<typeof Image>
}

function Article1({ title, description, image, children }: Props) {
  return (
    <Section>
      <Container className="flex flex-col">
        <Prose>
          {title ? <h1>{title}</h1> : null}
          {description ? <p>{description}</p> : null}
          <Image
            className="rounded-lg"
            {...image}
          />
          {children}
        </Prose>
      </Container>
    </Section>
  )
}

export { Article1 }
