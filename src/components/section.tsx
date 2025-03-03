import { cn } from '@/lib/utils'
import React from 'react'

function Section({ className, ...props }: React.ComponentProps<'section'>) {
  return React.Children.count(props.children) > 0 ? (
    <section
      className={cn('section relative w-full py-16', className)}
      {...props}
    ></section>
  ) : null
}

export { Section }
