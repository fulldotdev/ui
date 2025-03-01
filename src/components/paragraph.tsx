import { Box } from '@/components/box'
import { cn } from '@/lib/utils'
import * as React from 'react'

interface Props extends React.ComponentProps<typeof Box> {}

function Paragraph({ className, children, ...props }: Props) {
  return (
    <Box
      className={cn('paragraph text-foreground leading-[1.8] text-balance', className)}
      as="p"
      {...props}
    >
      {children}
    </Box>
  )
}

export { Paragraph }
