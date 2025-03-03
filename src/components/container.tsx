import { cn, hasChildren } from '@/lib/utils'
import React from 'react'

interface ContainerProps extends React.ComponentProps<'div'> {
  align?: 'start' | 'center' | 'end'
  size?: 'sm' | 'default' | 'lg'
}

function Container({ size, className, children, ...props }: ContainerProps) {
  return hasChildren(children) ? (
    <div
      className={cn(
        'mx-auto w-full max-w-screen-xl px-4',
        {
          'flex flex-col': 'align' in props,
          'items-start': props.align === 'start',
          'items-center': props.align === 'center',
          'items-end': props.align === 'end',
        },
        {
          'max-w-screen-md md:px-12': size === 'sm',
          'max-w-screen-xl lg:px-8': size === 'default',
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
