import { Box } from '@/components/box'
import { Container } from '@/components/container'
import { cn } from '@/lib/utils'
import * as React from 'react'

interface Props extends React.HTMLAttributes<HTMLElement> {
  text?: string
}

function Banner1({ text, className, ...props }: Props) {
  return (
    <Box
      className={cn('banner bg-primary text-primary-foreground py-1 text-center text-sm font-medium', className)}
      as="header"
      {...props}
    >
      <Container>{text}</Container>
    </Box>
  )
}

export { Banner1 }
