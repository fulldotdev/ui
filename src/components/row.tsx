import { Box } from '@/components/box'
import { cn } from '@/lib/utils'
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLElement> {
  align?: 'start' | 'center' | 'end'
}

function Row({ align = 'center', className, children, ...props }: Props) {
  return (
    <Box
      className={cn(
        'row flex flex-row w-full justify-between gap-8',
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

export { Row }
