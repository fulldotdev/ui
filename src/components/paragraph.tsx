import { cn, hasChildren } from '@/lib/utils'
import * as React from 'react'

interface Props extends React.ComponentProps<'p'> {}

function Paragraph({ className, children, ...props }: Props) {
  return hasChildren(children) ? (
    <p
      className={cn('paragraph text-foreground leading-[1.8] text-balance', className)}
      {...props}
    >
      {children}
    </p>
  ) : null
}

export { Paragraph }
