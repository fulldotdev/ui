import { Box } from '@/components/box'
import { cn } from '@/lib/utils'
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  reverse?: boolean
}

function Split({ className, children, reverse, ...props }: Props) {
  return (
    <Box
      className={cn(
        'split grid items-start gap-8 md:grid-cols-2 md:gap-16',
        { 'md:[&>*:first-child]:order-2': reverse },
        className
      )}
      {...props}
    >
      {children}
    </Box>
  )
}

export { Split }
