import { cn, hasChildren } from '@/lib/utils'
import * as React from 'react'

interface Props extends React.ComponentProps<'h1'> {
  parentLevel?: 1 | 2 | 3 | 4 | 5 | 6
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

function Heading({ parentLevel, level = 1, className, children, ...props }: Props) {
  const Comp = `h${level}` as const
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
