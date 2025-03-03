import { Container } from '@/components/container'
import { cn } from '@/lib/utils'
import * as React from 'react'

interface Props extends React.HTMLAttributes<HTMLElement> {
  text?: string
}

function Banner({ text, className, ...props }: Props) {
  return text ? (
    <header
      className={cn('banner bg-primary text-primary-foreground py-1 text-center text-sm font-medium', className)}
      {...props}
    >
      <Container>{text}</Container>
    </header>
  ) : null
}

export { Banner }
