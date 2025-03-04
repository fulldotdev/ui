import { cn, hasChildren } from '@/lib/utils'
import React from 'react'

interface ContainerProps extends React.ComponentProps<'div'> {
  align?: 'start' | 'center' | 'end'
  size?: 'sm' | 'default' | 'lg'
}

function Container({ size, className, children, ...props }: ContainerProps) {
  const { align, ...restProps } = props
  return hasChildren(children) ? (
    <div
      className={cn(
        'mx-auto w-full max-w-screen-xl px-4',
        {
          'flex flex-col': 'align' in props,
          'items-start': align === 'start',
          'items-center': align === 'center',
          'items-end': align === 'end',
        },
        {
          'max-w-screen-md md:px-12': size === 'sm',
          'max-w-screen-xl lg:px-8': size === 'default',
        },
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  ) : null
}

export { Container }
