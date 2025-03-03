import { Accordion } from '@/components/accordion'
import { Box } from '@/components/box'
import { Buttons } from '@/components/buttons'
import { Container } from '@/components/container'
import { Grid } from '@/components/grid'
import { Section } from '@/components/section'
import { Writeup } from '@/components/writeup'
import * as React from 'react'

interface Props {
  buttons?: React.ComponentProps<typeof Buttons>['buttons']
  faqs?: {
    title?: string
    description?: string
  }[]
  children?: React.ReactNode
}

function Faqs2({ buttons, faqs, children }: Props) {
  return (
    <Section className="faqs faqs-2">
      <Container>
        <Grid size="xl">
          <Box className="flex flex-col items-center gap-8">
            <Writeup>{children}</Writeup>
            <Buttons buttons={buttons} />
          </Box>
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
