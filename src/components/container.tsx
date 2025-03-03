import { cn, hasChildren } from '@/lib/utils'
import React from 'react'

interface ContainerProps extends React.ComponentProps<'div'> {
  align?: 'start' | 'center' | 'end'
}

function Container({ className, children, ...props }: ContainerProps) {
  return hasChildren(children) ? (
    <div
      className={cn(
        'mx-auto w-full max-w-screen-xl px-4 lg:px-8',
        {
          'flex flex-col': 'align' in props,
          'items-start': props.align === 'start',
          'items-center': props.align === 'center',
          'items-end': props.align === 'end',
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
