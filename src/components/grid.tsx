import { Box } from '@/components/box'
import { cn } from '@/lib/utils'
import * as React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'default' | 'lg' | 'xl'
  align?: 'default' | 'start' | 'center' | 'end'
}

function Grid({ size = 'default', align = 'default', className, children, ...props }: Props) {
  const count = React.Children.count(children)
  return (
    <Box
      className={cn(
        'relative grid gap-x-4 gap-y-8',
        {
          'sm:grid-cols-2': size === 'default',
          'md:grid-cols-3': size === 'default' && count === 3,
          'lg:grid-cols-4': size === 'default' && count === 4,
          'md:grid-cols-3 xl:grid-cols-5': size === 'default' && count === 5,
          'lg:grid-cols-3': size === 'default' && count === 6,
          'md:grid-cols-3 lg:grid-cols-4': size === 'default' && count > 6,
        },
        {
          'md:grid-cols-2': size === 'lg',
          'md:grid-cols-3': size === 'lg' && count === 3,
          'xl:grid-cols-4': size === 'lg' && count === 4,
          'lg:grid-cols-3': size === 'lg' && count > 4,
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
    </Box>
  )
}

export { Grid }
