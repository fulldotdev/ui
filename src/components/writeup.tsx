import { cn, hasChildren } from '@/lib/utils'
import React from 'react'

interface WriteupProps extends React.ComponentProps<'div'> {
  size?: 'sm' | 'default' | 'lg' | 'xl'
  align?: 'start' | 'center' | 'end'
  title?: string
  description?: string
}

function Writeup({
  size = 'default',
  align = 'start',
  title,
  description,
  className,
  children,
  ...props
}: WriteupProps) {
  return hasChildren(children) ? (
    <div
      className={cn(
        'writeup',
        'text-foreground flex w-full max-w-screen-md flex-col text-left',
        'headings:scroll-mt-20 headings:text-pretty headings:font-semibold headings:tracking-tight headings:text-foreground',
        'p:max-w-[85%] p:text-pretty p:leading-[1.75]',
        'lead:leading-[1.75]',
        'list:my-6 list:ml-4 ul:list-disc list:li:mt-2',
        {
          'headings:text-2xl gap-2 text-sm': size === 'sm',
          'headings:text-4xl gap-4': size === 'default',
          'headings:text-4xl md:headings:text-5xl gap-6 text-lg': size === 'lg',
          'headings:text-5xl md:headings:text-6xl gap-6 text-lg md:text-xl': size === 'xl',
        },
        {
          'items-start text-left': align === 'start',
          'items-center text-center': align === 'center',
          'items-end text-right': align === 'end',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  ) : null
}

export { Writeup }
