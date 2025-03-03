import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

export const writeupVariants = cva(
  [
    'writeup',
    'text-foreground flex w-full max-w-screen-md flex-col text-left',
    'headings:scroll-mt-20 headings:text-pretty headings:font-semibold headings:tracking-tight headings:text-foreground',
    'p:max-w-[85%] p:text-pretty p:leading-[1.75]',
    'lead:leading-[1.75]',
    'list:my-6 list:ml-4 ul:list-disc list:li:mt-2',
  ],
  {
    variants: {
      size: {
        sm: 'text-sm',
        default: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
      },
      align: {
        start: 'text-left',
        center: 'text-center',
        end: 'text-right',
      },
    },
    defaultVariants: {
      size: 'default',
      align: 'start',
    },
  }
)

function Writeup({
  className,
  size,
  align,
  title,
  description,
  children,
  ...props
}: React.ComponentProps<'div'> &
  VariantProps<typeof writeupVariants> & {
    title?: string
    description?: string
  }) {
  return title || description || React.Children.count(children) > 0 ? (
    <div
      className={cn(writeupVariants({ size, align, className }))}
      {...props}
    >
      {title && <h1>{title}</h1>}
      {description && <p>{description}</p>}
      {children}
    </div>
  ) : null
}

export { Writeup }
