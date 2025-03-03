import { Accordion } from '@/components/accordion'
import { Buttons } from '@/components/buttons'
import { Container } from '@/components/container'
import { Section } from '@/components/section'
import { Writeup } from '@/components/writeup'
import { cn } from '@/lib/utils'
import * as React from 'react'

interface Props extends React.ComponentProps<typeof Section> {
  level?: React.ComponentProps<typeof Writeup>['level']
  size?: React.ComponentProps<typeof Writeup>['size']
  align?: React.ComponentProps<typeof Writeup>['align']
  title?: React.ComponentProps<typeof Writeup>['title']
  description?: React.ComponentProps<typeof Writeup>['description']
  buttons?: React.ComponentProps<typeof Buttons>['buttons']
  faqs?: {
    title?: string
    description?: string
  }[]
}

function Faqs1({ level, size, align, title, description, buttons, faqs, children, className, ...props }: Props) {
  return (
    <Section
      className={cn('faqs faqs-1', className)}
      {...props}
    >
      <Container
        className="gap-8"
        align={align}
      >
        <Writeup
          level={level}
          size={size}
          align={align}
          title={title}
          description={description}
        >
          {children}
        </Writeup>
        <Buttons
          size={size}
          align={align}
          buttons={buttons}
        />
        <Accordion
          className="w-full max-w-xl mt-8 first:mt-0"
          type="single"
          collapsible
          items={faqs}
        />
      </Container>
    </Section>
  )
}

export { Faqs1 }
