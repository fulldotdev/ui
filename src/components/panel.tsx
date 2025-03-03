import { cn, hasChildren } from '@/lib/utils'
import * as React from 'react'

interface Props extends React.ComponentProps<'div'> {}

function Panel({ className, children, ...props }: Props) {
  return hasChildren(children) ? (
    <div
      className={cn(
        'panel color-card-foreground relative w-full overflow-hidden rounded-lg border bg-card px-4 py-16 md:px-8 xl:px-16',
        className
      )}
      {...props}
    >
      {children}
    </div>
  ) : null
}

export { Panel }
