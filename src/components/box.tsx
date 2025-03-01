import { cn } from '@/lib/utils'
import * as React from 'react'

interface Props extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  href?: string
  target?: string
}

function Box({ as = 'div', href, target, className, children, ...props }: Props) {
  const Component = href ? 'a' : as
  const linkTarget = href?.startsWith('http') ? '_blank' : target
  const hasChildren = React.Children.count(children) > 0

  return hasChildren ? (
    <Component
      className={cn('box', className)}
      href={href}
      target={linkTarget}
      {...props}
    >
      {children}
    </Component>
  ) : null
}

export { Box }
