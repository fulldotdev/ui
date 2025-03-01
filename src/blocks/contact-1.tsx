import { Channels } from '@/components/channels'
import { Container } from '@/components/container'
import { Form } from '@/components/form'
import { Section } from '@/components/section'
import { Writeup } from '@/components/writeup'
import * as React from 'react'

interface Props {
  channels?: React.ComponentProps<typeof Channels>
  form?: React.ComponentProps<typeof Form>
  children?: React.ReactNode
}

function Contact1({ channels, form, children }: Props) {
  return (
    <Section className="contact contact-1">
      <Container className="flex flex-col items-center gap-16">
        <Writeup
          className="items-center text-center"
          size="lg"
        >
          {children}
        </Writeup>
        <Channels {...channels} />
        <Form {...form} />
      </Container>
    </Section>
  )
}

export { Contact1 }
