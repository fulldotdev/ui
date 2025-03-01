import { Box } from '@/components/box'
import { cn } from '@/lib/utils'
import * as React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  length?: number | undefined
  size?: 'sm' | 'default' | 'lg'
}

function Grid({ length = 3, size = 'default', className, children, ...props }: Props) {
  return (
    <Box
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
        className
      )}
      {...props}
    >
      {children}
    </Box>
  )
}

export { Grid }
