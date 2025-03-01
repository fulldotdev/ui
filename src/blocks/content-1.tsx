import { Box } from '@/components/box'
import Buttons from '@/components/buttons'
import { Container } from '@/components/container'
import { Image } from '@/components/image'
import { Section } from '@/components/section'
import { Split } from '@/components/split'
import { Writeup } from '@/components/writeup'
import * as React from 'react'

interface Props {
  buttons?: React.ComponentProps<typeof Buttons>['buttons']
  image?: React.ComponentProps<typeof Image>
  children?: React.ReactNode
}

function Content1({ buttons, image, children }: Props) {
  return (
    <Section className="content content-1">
      <Container>
        <Split className="items-center">
          <Box className="flex flex-col gap-8">
            <Writeup>{children}</Writeup>
            <Buttons buttons={buttons} />
          </Box>
          <Image
            className="rounded-lg"
            {...image}
          />
        </Split>
      </Container>
    </Section>
  )
}

export { Content1 }
