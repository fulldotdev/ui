import { cn } from '@/lib/utils'
import * as React from 'react'

interface Props extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
}

function Box({ as = 'div', className, children, ...props }: Props) {
  const Component = as
  return React.Children.count(children) > 0 ? (
    <Component
      className={cn('box', className)}
      {...props}
    >
      {children}
    </Component>
  ) : null
}

export { Box }
