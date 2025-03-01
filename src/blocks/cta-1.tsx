import { Box } from '@/components/box'
import Buttons from '@/components/buttons'
import { Container } from '@/components/container'
import { Section } from '@/components/section'
import { Writeup } from '@/components/writeup'
import * as React from 'react'

interface Props {
  buttons?: React.ComponentProps<typeof Buttons>['buttons']
  children?: React.ReactNode
}

function Cta1({ buttons, children }: Props) {
  return (
    <Section className="cta cta-1">
      <Container>
        <Box className="flex flex-col items-center gap-8">
          <Writeup
            className="items-center text-center"
            size="lg"
          >
            {children}
          </Writeup>
          <Buttons
            className="justify-center"
            size="lg"
            buttons={buttons}
          />
        </Box>
      </Container>
    </Section>
  )
}

export { Cta1 }
