import { cn, hasChildren } from '@/lib/utils'
import * as React from 'react'

interface Props extends React.ComponentProps<'div'> {
  size?: 'sm' | 'default' | 'lg' | 'xl'
  align?: 'start' | 'center' | 'end'
}

function Split({ size = 'default', align = 'start', className, children, ...props }: Props) {
  return hasChildren(children) ? (
    <div
      className={cn(
        'split relative grid gap-y-8',
        {
          'md:grid-cols-2 md:gap-x-8 lg:gap-x-16': size === 'default',
          'lg:grid-cols-2 gap-x-16': size === 'lg',
        },
        {
          'items-start': align === 'start',
          'items-center': align === 'center',
          'items-end': align === 'end',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  ) : null
}

export { Split }
