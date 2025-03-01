import { Box } from '@/components/box'
import { Container } from '@/components/container'
import { Section } from '@/components/section'
import { Writeup } from '@/components/writeup'
import React from 'react'

interface Props {
  children?: React.ReactNode
}

function Intro({ children }: Props) {
  return (
    <Section className="intro intro-1 py-0">
      <Container>
        <Box className="border-b py-12">
          <Writeup size="sm">{children}</Writeup>
        </Box>
      </Container>
    </Section>
  )
}

export default Intro
