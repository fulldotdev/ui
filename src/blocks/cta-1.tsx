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
}

function Cta1({ level, size, align, title, description, buttons, children, className, ...props }: Props) {
  return (
    <Section
      className={cn('cta cta-1', className)}
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
      </Container>
    </Section>
  )
}

export { Cta1 }
