import { Column } from '@/components/column'
import { Container } from '@/components/container'
import { Grid } from '@/components/grid'
import { Heading } from '@/components/heading'
import { Image } from '@/components/image'
import { Paragraph } from '@/components/paragraph'
import { Section } from '@/components/section'
import { Writeup } from '@/components/writeup'
import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  persons?: {
    title?: string
    description?: string
    image?: React.ComponentProps<typeof Image>
  }[]
  children?: React.ReactNode
}

function Persons1({ persons, children }: Props) {
  return (
    <Section className="features features-1">
      <Container className="flex flex-col items-center gap-16">
        <Writeup className="items-center text-center">{children}</Writeup>
        <Grid className="gap-16">
          {persons?.map(({ image, title, description }) => (
            <Column
              className="flex max-w-md flex-col items-center gap-6"
              key={uuidv4()}
            >
              <Image
                className="aspect-square w-full max-w-60 rounded-full object-cover"
                {...image}
              />
              <Heading as="h3">{title}</Heading>
              <Paragraph>{description}</Paragraph>
            </Column>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

export { Persons1 }
