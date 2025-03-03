import { Container } from '@/components/container'
import { Prose } from '@/components/prose'
import { Section } from '@/components/section'
import { cn } from '@/lib/utils'
import * as React from 'react'

function Page1({ className, children, ...props }: React.ComponentProps<typeof Section>) {
  return React.Children.count(children) > 0 ? (
    <Section
      className={cn('page page-1', className)}
      {...props}
    >
      <Container className="flex flex-col">
        <Prose>{children}</Prose>
      </Container>
    </Section>
  ) : null
}

export { Page1 }
