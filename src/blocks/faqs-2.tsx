import { Accordion } from '@/components/accordion'
import { Buttons } from '@/components/buttons'
import { Column } from '@/components/column'
import { Container } from '@/components/container'
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
  buttons?: React.ComponentProps<typeof Buttons>['buttons']
  faqs?: {
    title?: string
    description?: string
  }[]
}

function Faqs2({ level, size, align, title, description, buttons, faqs, children, className, ...props }: Props) {
  return (
    <Section
      className={cn('faqs faqs-2', className)}
      {...props}
    >
      <Container>
        <Split className="gap-16 items-start">
          <Column>
            <Writeup
              level={level}
              size={size}
              title={title}
              description={description}
            >
              {children}
            </Writeup>
            <Buttons
              size={size}
              buttons={buttons}
            />
          </Column>
          <Accordion
            type="single"
            collapsible
            items={faqs}
          />
        </Split>
      </Container>
    </Section>
  )
}

export { Faqs2 }
