import { Heading } from '@/components/heading'
import { Link } from '@/components/link'
import { cn } from '@/lib/utils'
import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Props extends React.ComponentProps<'div'> {
  heading?: string
  links?: {
    text?: string
    href?: string
  }[]
}

function Menu({ heading, links, className, ...props }: Props) {
  return heading && links?.length ? (
    <div
      className={cn('menu text-foreground flex flex-col items-start gap-2', className)}
      {...props}
    >
      <Heading as="h6">{heading}</Heading>
      <menu className="flex w-full flex-col gap-2">
        {links?.map(({ text, href }) => (
          <Link
            key={uuidv4()}
            className="text-muted-foreground hover:text-foreground font-normal transition-colors"
            href={href}
          >
            {text}
          </Link>
        ))}
      </menu>
    </div>
  ) : null
}

export { Menu }
