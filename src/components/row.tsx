import { cn, hasChildren } from '@/lib/utils'
import React from 'react'

interface Props extends React.ComponentProps<'div'> {
  align?: 'start' | 'center' | 'end'
}

function Row({ align = 'center', className, children, ...props }: Props) {
  return hasChildren(children) ? (
    <div
      className={cn(
        'row flex flex-row w-full justify-between gap-8',
        {
          'items-start': align === 'start',
          'items-center': align === 'center',
          'items-end': align === 'end',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  ) : null
}

export { Row }
