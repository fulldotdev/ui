import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLElement> {
  align?: 'start' | 'center' | 'end'
}

export const rowVariants = cva('row flex flex-row w-full justify-between gap-8', {
  variants: {
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
    },
  },
})

function Row({ align, className, children, ...props }: React.ComponentProps<'div'> & VariantProps<typeof rowVariants>) {
  return (
    <div
      className={cn(rowVariants({ align, className }))}
      {...props}
    >
      {children}
    </div>
  )
}

export { Row }
