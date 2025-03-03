import { cn, hasChildren } from '@/lib/utils'
import React from 'react'

interface Props extends React.ComponentProps<'div'> {
  level?: 1 | 2 | 3
  size?: '2xs' | 'xs' | 'sm' | 'default' | 'lg' | 'xl' | '2xl'
  align?: 'start' | 'center' | 'end'
  title?: string
  description?: string
}

function Abstract({
  level = 2,
  size = 'default',
  align = 'start',
  title,
  description,
  children,
  className,
  ...props
}: Props) {
  const Heading = `h${level + 1}` as 'h2' | 'h3' | 'h4'
  return title || description || hasChildren(children) ? (
    <div
      className={cn(
        'abstract',
        'text-foreground flex w-full max-w-screen-md flex-col',
        'headings:scroll-mt-20 headings:text-pretty headings:font-semibold headings:tracking-tight headings:text-foreground',
        'p:max-w-[85%] p:text-pretty p:leading-[1.75]',
        {
          'text-sm gap-1': size === 'xs',
          'headings:text-lg text-sm gap-2': size === 'sm',
          'headings:text-xl text-base gap-3': size === 'default',
          'headings:text-2xl text-lg gap-4': size === 'lg',
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
      {title ? <Heading>{title}</Heading> : null}
      {description ? <p>{description}</p> : null}
      {children}
    </div>
  ) : null
}

export { Abstract }
