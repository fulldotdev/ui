import { cn, hasChildren } from '@/lib/utils'
import * as React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'default' | 'lg'
  length?: number
}

function Masonry({ size = 'default', children, length = React.Children.count(children), className, ...props }: Props) {
  return hasChildren(children) ? (
    <div
      className={cn(
        'masonry relative w-full space-y-4 gap-x-4',
        {
          'sm:columns-2': size === 'default',
          'md:columns-3': size === 'default' && length === 3,
          'lg:columns-4': size === 'default' && length === 4,
          'md:columns-3 xl:columns-5': size === 'default' && length === 5,
          'lg:columns-3': size === 'default' && length === 6,
          'md:columns-3 lg:columns-4': size === 'default' && length > 6,
        },
        {
          'md:columns-2': size === 'lg',
          'md:columns-3': size === 'lg' && length === 3,
          'xl:columns-4': size === 'lg' && length === 4,
          'lg:columns-3': size === 'lg' && length > 4,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  ) : null
}

export { Masonry }
