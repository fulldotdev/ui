import { Container } from '@/components/container'
import { Heading } from '@/components/heading'
import { Image } from '@/components/image'
import { Paragraph } from '@/components/paragraph'
import { Prose } from '@/components/prose'
import { Section } from '@/components/section'
import * as React from 'react'

interface Props {
  title?: string
  description?: string
  image?: React.ComponentProps<typeof Image>
  children?: React.ReactNode
}

function Article1({ title, description, image, children }: Props) {
  return (
    <Section>
      <Container className="flex flex-col">
        <Prose>
          <Heading as="h1">{title}</Heading>
          <Paragraph>{description}</Paragraph>
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
