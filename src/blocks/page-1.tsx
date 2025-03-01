import { Container } from '@/components/container'
import { Prose } from '@/components/prose'
import { Section } from '@/components/section'
import { cn } from '@/lib/utils'
import * as React from 'react'

interface Props extends React.ComponentProps<typeof Section> {
  children?: React.ReactNode
  className?: string
}

function Page1({ children, className = '', ...props }: Props) {
  return (
    <Section
      className={cn('page page-1', className)}
      {...props}
    >
      <Container className="flex flex-col">
        <Prose>{children}</Prose>
      </Container>
    </Section>
  )
}

export { Page1 }
