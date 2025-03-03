import { cn } from '@/lib/utils'
import * as React from 'react'

function Panel({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'panel color-card-foreground relative w-full overflow-hidden rounded-lg border bg-card px-4 py-16 md:px-8 xl:px-16',
        className
      )}
      {...props}
    ></div>
  )
}

export { Panel }
