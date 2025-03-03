import { Box } from '@/components/box'
import { cn } from '@/lib/utils'
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLElement> {
  align?: 'start' | 'center' | 'end' | 'default'
}

function Column({ align = 'default', className, children, ...props }: Props) {
  return (
    <Box
      className={cn(
        'column flex flex-col gap-8',
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

export { Column }
