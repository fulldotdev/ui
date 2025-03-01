import { Box } from '@/components/box'

import { cn } from '@/lib/utils'
import React from 'react'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {}

function Section({ className, children, ...props }: SectionProps) {
  return (
    <Box
      className={cn('section relative w-full py-16', className)}
      as="section"
      {...props}
    >
      {children}
    </Box>
  )
}

export { Section }
