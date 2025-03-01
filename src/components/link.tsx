import { cn } from '@/lib/utils'
import * as React from 'react'

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

function Link({ href, target, className, children, ...props }: Props) {
  const linkTarget = href?.startsWith('http') ? '_blank' : target

  return React.Children.count(children) > 0 ? (
    <a
      className={cn('link text-muted-foreground hover:text-foreground transition-colors', className)}
      href={href}
      target={linkTarget}
      {...props}
    >
      {children}
    </a>
  ) : null
}

export { Link }
