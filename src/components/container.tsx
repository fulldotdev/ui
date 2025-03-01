import { Box } from '@/components/box'
import { cn } from '@/lib/utils'
import React from 'react'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

function Container({ className, children, ...props }: ContainerProps) {
  return (
    <Box
      className={cn('mx-auto w-full max-w-screen-xl px-4 lg:px-8', className)}
      {...props}
    >
      {children}
    </Box>
  )
}

export { Container }
