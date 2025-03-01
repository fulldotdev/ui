import { Accordion } from '@/components/accordion'
import { Box } from '@/components/box'
import { Buttons } from '@/components/buttons'
import { Container } from '@/components/container'
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

function Faqs1({ buttons, faqs, children }: Props) {
  return (
    <Section className="faqs faqs-1">
      <Container className="flex flex-col items-center gap-y-16">
        <Box className="flex flex-col items-center gap-8">
          <Writeup className="items-center text-center">{children}</Writeup>
          <Buttons buttons={buttons} />
        </Box>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-xl"
          items={faqs}
        />
      </Container>
    </Section>
  )
}

export { Faqs1 }
