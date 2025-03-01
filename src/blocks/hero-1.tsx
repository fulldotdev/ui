import { Box } from '@/components/box'
import Buttons from '@/components/buttons'
import { Container } from '@/components/container'
import { Image } from '@/components/image'
import { Section } from '@/components/section'
import { Writeup } from '@/components/writeup'
import * as React from 'react'

interface Props {
  buttons?: React.ComponentProps<typeof Buttons>['buttons']
  image?: React.ComponentProps<typeof Image>
  children?: React.ReactNode
}

function Hero1({ buttons, image, children }: Props) {
  return (
    <Section className="hero hero-1">
      <Container className="flex flex-col items-center gap-16">
        <Box className="flex flex-col items-center gap-8">
          <Writeup
            className="items-center text-center"
            size="xl"
          >
            {children}
          </Writeup>
          <Buttons
            className="justify-center"
            size="lg"
            buttons={buttons}
          />
        </Box>
        <Image
          className="rounded-lg"
          {...image}
        />
      </Container>
    </Section>
  )
}

export { Hero1 }
