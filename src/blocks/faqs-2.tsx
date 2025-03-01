import { Accordion } from '@/components/accordion'
import { Box } from '@/components/box'
import { Buttons } from '@/components/buttons'
import { Container } from '@/components/container'
import { Section } from '@/components/section'
import { Split } from '@/components/split'
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
        <Split>
          <Box className="flex flex-col items-center gap-8">
            <Writeup>{children}</Writeup>
            <Buttons buttons={buttons} />
          </Box>
          <Accordion
            type="single"
            collapsible
            items={faqs}
          />
        </Split>
      </Container>
    </Section>
  )
}

export { Faqs2 }
