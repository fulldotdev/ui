import { Channels } from '@/components/channels'
import { Column } from '@/components/column'
import { Container } from '@/components/container'
import { Form } from '@/components/form'
import { Section } from '@/components/section'
import { Split } from '@/components/split'
import { Writeup } from '@/components/writeup'
import { cn } from '@/lib/utils'
import * as React from 'react'

interface Props extends React.ComponentProps<typeof Section> {
  level?: React.ComponentProps<typeof Writeup>['level']
  size?: React.ComponentProps<typeof Writeup>['size']
  align?: React.ComponentProps<typeof Writeup>['align']
  title?: React.ComponentProps<typeof Writeup>['title']
  description?: React.ComponentProps<typeof Writeup>['description']
  channels?: React.ComponentProps<typeof Channels>
  form?: React.ComponentProps<typeof Form>
  children?: React.ReactNode
}

function Contact2({ level, size, align, title, description, channels, form, children, className, ...props }: Props) {
  return (
    <Section
      className={cn('contact contact-2', className)}
      {...props}
    >
      <Container>
        <Split
          className="gap-x-0"
          align={align}
        >
          <Column className="gap-8">
            <Writeup
              level={level}
              size={size}
              align={align}
              title={title}
              description={description}
            >
              {children}
            </Writeup>
            <Channels {...channels} />
          </Column>
          <Form {...form} />
        </Split>
      </Container>
    </Section>
  )
}

export { Contact2 }
