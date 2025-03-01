import { Box } from '@/components/box'
import { cn } from '@/lib/utils'
import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Props extends React.ComponentProps<typeof Box> {
  as?: 'ul' | 'ol'
  items?: string[]
}

function List({ as = 'ul', items, className, children, ...props }: Props) {
  return (
    <Box
      className={cn('list ml-4 list-disc space-y-2', className)}
      as={as}
      {...props}
    >
      {items?.map((item) => (
        <Box
          as="li"
          key={uuidv4()}
        >
          {item}
        </Box>
      ))}
      {children}
    </Box>
  )
}

export { List }
