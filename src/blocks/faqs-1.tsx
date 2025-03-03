import { Accordion } from '@/components/accordion'
import { Buttons } from '@/components/buttons'
import { Column } from '@/components/column'
import { Container } from '@/components/container'
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

function Faqs1({ align = 'center', title, description, buttons, faqs, children }: Props) {
  return (
    <Section className="faqs faqs-1">
      <Container align={align}>
        <Column align={align}>
          <Writeup
            className="items-center text-center"
            title={title}
            description={description}
          >
            {children}
          </Writeup>
          <Buttons
            buttons={buttons}
            align={align}
          />
        </Column>
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
