import { Container } from '@/components/container'
import { cn, hasChildren } from '@/lib/utils'
import * as React from 'react'

interface Props extends React.HTMLAttributes<HTMLElement> {}

function Banner({ children, className, ...props }: Props) {
  return hasChildren(children) ? (
    <header
      className={cn(
        'banner bg-primary relative text-primary-foreground z-10 flex items-center h-8 text-center text-sm font-medium',
        className
      )}
      {...props}
    >
      <Container>{children}</Container>
      <style>
        {`
          :root {
            --banner-height: calc(var(--spacing) * 8);
          }
        `}
      </style>
    </header>
  ) : null
}

export { Banner }
