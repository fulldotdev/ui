import { Box } from '@/components/box'
import { Channels } from '@/components/channels'
import { Container } from '@/components/container'
import { Form } from '@/components/form'
import { Section } from '@/components/section'
import { Split } from '@/components/split'
import { Writeup } from '@/components/writeup'
import * as React from 'react'

interface Props {
  channels?: React.ComponentProps<typeof Channels>
  form?: React.ComponentProps<typeof Form>
  children?: React.ReactNode
}

function Contact2({ channels, form, children }: Props) {
  return (
    <Section className="contact contact-2">
      <Container>
        <Split>
          <Box>
            <Writeup>{children}</Writeup>
            <Channels {...channels} />
          </Box>
          <Form {...form} />
        </Split>
      </Container>
    </Section>
  )
}

export { Contact2 }
