import { Box } from '@/components/box'
import { cn } from '@/lib/utils'
import * as React from 'react'

interface Props extends React.ComponentProps<typeof Box> {}

function Panel({ className, children, ...props }: Props) {
  return (
    <Box
      className={cn(
        'panel color-card-foreground relative w-full overflow-hidden rounded-lg border bg-card px-4 py-16 md:px-8 xl:px-16',
        className
      )}
      {...props}
    >
      {children}
    </Box>
  )
}

export { Panel }
