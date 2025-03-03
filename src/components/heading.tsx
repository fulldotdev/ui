import { cn, hasChildren } from '@/lib/utils'
import * as React from 'react'

function Heading({
  as,
  className,
  children,
  ...props
}: React.ComponentProps<'h1'> & {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}) {
  const Comp = as
  return hasChildren(children) ? (
    <Comp
      className={cn('text-foreground font-medium tracking-tight text-pretty', className)}
      {...props}
    >
      {children}
    </Comp>
  ) : null
}

export { Heading }
