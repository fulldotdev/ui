import { Box } from '@/components/box'
import { Buttons } from '@/components/buttons'
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
  buttons?: React.ComponentProps<typeof Buttons>['buttons']
  reviews?: {
    rating?: React.ComponentProps<typeof Rating>['score']
    title?: string
    description?: string
  }[]
  children?: React.ReactNode
}

function Reviews1({ buttons, reviews, children }: Props) {
  return (
    <Section className="reviews reviews-1">
      <Container className="flex flex-col items-center gap-12">
        <Box className="flex flex-col items-center gap-8">
          <Writeup className="items-center text-center">{children}</Writeup>
          <Buttons buttons={buttons} />
        </Box>
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
