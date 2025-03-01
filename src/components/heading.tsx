import { Box } from '@/components/box'
import { cn } from '@/lib/utils'
import * as React from 'react'

interface Props extends React.ComponentProps<typeof Box> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

function Heading({ as = 'h1', className, children, ...props }: Props) {
  return (
    <Box
      className={cn('text-foreground font-medium tracking-tight text-pretty', className)}
      as={as}
      {...props}
    >
      {children}
    </Box>
  )
}

export { Heading }
