import { cn, hasChildren } from '@/lib/utils'
import * as React from 'react'

interface Props extends React.ComponentProps<'h1'> {
  level: 1 | 2 | 3 | 4 | 5
}

function Subheading({ level, className, children, ...props }: Props) {
  const Comp = `h${(level + 1) as 2 | 3 | 4 | 5 | 6}` as const
  return hasChildren(children) ? (
    <Comp
      className={cn('text-foreground font-medium tracking-tight text-pretty', className)}
      {...props}
    >
      {children}
    </Comp>
  ) : null
}

export { Subheading }
