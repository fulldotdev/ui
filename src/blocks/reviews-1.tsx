import { Buttons } from '@/components/buttons'
import { Column } from '@/components/column'
import { Container } from '@/components/container'
import { Heading } from '@/components/heading'
import { Masonry } from '@/components/masonry'
import { Paragraph } from '@/components/paragraph'
import { Rating } from '@/components/rating'
import { Section } from '@/components/section'
import { Card } from '@/components/ui/card'
import { Writeup } from '@/components/writeup'
import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  align?: 'start' | 'center' | 'end'
  title?: React.ComponentProps<typeof Writeup>['title']
  description?: React.ComponentProps<typeof Writeup>['description']
  buttons?: React.ComponentProps<typeof Buttons>['buttons']
  reviews?: {
    rating?: React.ComponentProps<typeof Rating>['score']
    title?: string
    description?: string
  }[]
  children?: React.ReactNode
}

function Reviews1({ align = 'center', title, description, buttons, reviews, children }: Props) {
  return (
    <Section className="reviews reviews-1">
      <Container
        align={align}
        className="flex flex-col items-center gap-12"
      >
        <Column align={align}>
          <Writeup
            title={title}
            description={description}
            align={align}
          >
            {children}
          </Writeup>
          <Buttons buttons={buttons} />
        </Column>
        <Masonry length={reviews?.length}>
          {reviews?.map(({ rating, title, description }) => (
            <Card
              className="flex flex-col"
              key={uuidv4()}
            >
              <Rating score={rating} />
              <Heading as="h3">{title}</Heading>
              <Paragraph>{description}</Paragraph>
            </Card>
          ))}
        </Masonry>
      </Container>
    </Section>
  )
}

export { Reviews1 }
