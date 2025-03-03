import { Buttons } from '@/components/buttons'
import { Column } from '@/components/column'
import { Container } from '@/components/container'
import { Section } from '@/components/section'
import { Writeup } from '@/components/writeup'
import * as React from 'react'

interface Props extends React.ComponentProps<typeof Section> {
  align?: 'start' | 'center' | 'end'
  buttons?: React.ComponentProps<typeof Buttons>['buttons']
}

function Cta1({ align = 'center', buttons, children }: Props) {
  return (
    <Section className="cta cta-1">
      <Container>
        <Column align={align}>
          <Writeup
            className="items-center text-center"
            size="lg"
          >
            {children}
          </Writeup>
          <Buttons
            buttons={buttons}
            align={align}
            size="lg"
          />
        </Column>
      </Container>
    </Section>
  )
}

export { Cta1 }
