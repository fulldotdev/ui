import { Box } from '@/components/box'
import { Container } from '@/components/container'
import { Grid } from '@/components/grid'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Section } from '@/components/section'
import { Writeup } from '@/components/writeup'
import { Check } from 'lucide-react'
import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  features?: {
    title?: string
    description?: string
  }[]
  children?: React.ReactNode
}

function Features1({ features, children }: Props) {
  return (
    <Section className="features features-1">
      <Container className="flex flex-col items-center gap-16">
        <Writeup className="flex flex-col items-center text-center">{children}</Writeup>
        <Grid length={features?.length}>
          {features?.map(({ title, description }) => (
            <Box
              key={uuidv4()}
              className="flex flex-col items-center gap-4 text-center"
            >
              <Box className="bg-muted text-muted-foreground inline-flex size-9 items-center justify-center rounded-md">
                <Check />
              </Box>
              <Heading as="h3">{title}</Heading>
              <Paragraph>{description}</Paragraph>
            </Box>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

export { Features1 }
