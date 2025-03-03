import { Channels } from '@/components/channels'
import { Column } from '@/components/column'
import { Container } from '@/components/container'
import { Form } from '@/components/form'
import { Grid } from '@/components/grid'
import { Section } from '@/components/section'
import { Writeup } from '@/components/writeup'
import * as React from 'react'

interface Props {
  align?: 'start' | 'center' | 'end'
  channels?: React.ComponentProps<typeof Channels>
  form?: React.ComponentProps<typeof Form>
  children?: React.ReactNode
}

function Contact2({ align = 'start', channels, form, children }: Props) {
  return (
    <Section className="contact contact-2">
      <Container align={align}>
        <Grid size="lg">
          <Column>
            <Writeup>{children}</Writeup>
            <Channels {...channels} />
          </Column>
          <Form {...form} />
        </Grid>
      </Container>
    </Section>
  )
}

export { Contact2 }
