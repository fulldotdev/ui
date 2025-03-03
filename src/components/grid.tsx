import { cn, hasChildren } from '@/lib/utils'
import * as React from 'react'

interface Props extends React.ComponentProps<'div'> {
  size?: 'sm' | 'default' | 'lg' | 'xl'
  align?: 'start' | 'center' | 'end'
  length?: number
}

function Grid({
  className,
  size = 'default',
  align,
  children,
  length = React.Children.count(children),
  ...props
}: Props) {
  return hasChildren(children) ? (
    <div
      className={cn(
        'relative grid gap-x-4 gap-y-8',
        {
          'sm:grid-cols-2': size === 'default',
          'md:grid-cols-3': size === 'default' && length === 3,
          'lg:grid-cols-4': size === 'default' && length === 4,
          'md:grid-cols-3 xl:grid-cols-5': size === 'default' && length === 5,
          'lg:grid-cols-3': size === 'default' && length === 6,
          'md:grid-cols-3 lg:grid-cols-4': size === 'default' && length > 6,
        },
        {
          'md:grid-cols-2': size === 'lg',
          'md:grid-cols-3': size === 'lg' && length === 3,
          'xl:grid-cols-4': size === 'lg' && length === 4,
          'lg:grid-cols-3': size === 'lg' && length > 4,
        },
        {
          'lg:grid-cols-2 grid gap-8 xl:gap-x-16': size === 'xl',
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

export { Grid }
