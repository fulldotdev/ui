import { cn, hasChildren } from '@/lib/utils'
import React from 'react'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'center' | 'end'
}

function Container({ align, className, children, ...props }: ContainerProps) {
  return hasChildren(children) ? (
    <div
      className={cn(
        'mx-auto w-full max-w-screen-xl px-4 lg:px-8',
        {
          'flex flex-col gap-16 items-start': align === 'start',
          'flex flex-col gap-16 items-center': align === 'center',
          'flex flex-col gap-16 items-end': align === 'end',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  ) : null
}

export { Container }
