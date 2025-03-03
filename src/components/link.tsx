import { cn, hasChildren } from '@/lib/utils'
import * as React from 'react'

interface Props extends React.ComponentProps<'a'> {}

function Link({ className, href, target, children, ...props }: Props) {
  const linkTarget = href?.startsWith('http') ? '_blank' : target

  return hasChildren(children) ? (
    <a
      className={cn('link', className)}
      href={href}
      target={linkTarget}
      {...props}
    >
      {children}
    </a>
  ) : null
}

export { Link }
