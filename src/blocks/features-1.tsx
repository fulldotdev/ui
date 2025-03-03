import { Column } from '@/components/column'
import { Container } from '@/components/container'
import { Grid } from '@/components/grid'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Section } from '@/components/section'
import { Writeup } from '@/components/writeup'
import { Check } from 'lucide-react'
import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Props extends React.ComponentProps<typeof Section> {
  align?: 'start' | 'center' | 'end'
  title?: React.ComponentProps<typeof Writeup>['title']
  description?: React.ComponentProps<typeof Writeup>['description']
  features?: {
    title?: string
    description?: string
  }[]
}

function Features1({ align = 'center', title, description, features, children }: Props) {
  return (
    <Section className="features features-1">
      <Container align={align}>
        <Writeup
          title={title}
          description={description}
          align={align}
        >
          {children}
        </Writeup>
        <Grid>
          {features?.map(({ title, description }) => (
            <Column
              className="gap-4"
              key={uuidv4()}
              align={align}
            >
              <div className="bg-muted text-muted-foreground inline-flex size-9 items-center justify-center rounded-md">
                <Check />
              </div>
              <Heading as="h3">{title}</Heading>
              <Paragraph>{description}</Paragraph>
            </Column>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

export { Features1 }
