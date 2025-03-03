import { Accordion } from '@/components/accordion'
import { Buttons } from '@/components/buttons'
import { Column } from '@/components/column'
import { Container } from '@/components/container'
import { Grid } from '@/components/grid'
import { Section } from '@/components/section'
import { Writeup } from '@/components/writeup'
import * as React from 'react'

interface Props extends React.ComponentProps<typeof Section> {
  align?: 'start' | 'center' | 'end'
  title?: React.ComponentProps<typeof Writeup>['title']
  description?: React.ComponentProps<typeof Writeup>['description']
  buttons?: React.ComponentProps<typeof Buttons>['buttons']
  faqs?: {
    title?: string
    description?: string
  }[]
}

function Faqs2({ align = 'center', title, description, buttons, faqs, children }: Props) {
  return (
    <Section className="faqs faqs-2">
      <Container>
        <Grid
          align={align}
          size="xl"
        >
          <Column align={align}>
            <Writeup
              title={title}
              description={description}
            >
              {children}
            </Writeup>
            <Buttons buttons={buttons} />
          </Column>
          <Accordion
            type="single"
            collapsible
            items={faqs}
          />
        </Grid>
      </Container>
    </Section>
  )
}

export { Faqs2 }
