import { cn, hasChildren } from '@/lib/utils'
import React from 'react'

interface Props extends React.ComponentProps<'section'> {}

function Section({ className, children, ...props }: Props) {
  return hasChildren(children) ? (
    <section
      className={cn('section relative w-full py-16', className)}
      {...props}
    >
      {children}
    </section>
  ) : null
}

export { Section }
