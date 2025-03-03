import { cn } from '@/lib/utils'
import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

type Props = React.ComponentProps<'ul'> &
  React.ComponentProps<'ol'> & {
    as?: 'ul' | 'ol'
    items?: string[]
  }

function List({ as = 'ul', items, className, ...props }: Props) {
  const Comp = as
  return items ? (
    <Comp
      className={cn('list ml-4 list-disc space-y-2', className)}
      {...props}
    >
      {items?.map((item) => <li key={uuidv4()}>{item}</li>)}
    </Comp>
  ) : null
}

export { List }
