import {
  AccordionContent,
  AccordionItem,
  Accordion as AccordionRoot,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import * as React from 'react'

type Props = React.ComponentProps<typeof AccordionRoot> & {
  items?: {
    title?: string
    description?: string
  }[]
}

function Accordion({ items, className, ...props }: Props) {
  return (
    items && (
      <AccordionRoot
        className={cn('w-full max-w-xl', className)}
        {...props}
      >
        {items?.map((item, index) => (
          <AccordionItem
            value={`item-${index}`}
            key={`item-${index}`}
          >
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.description}</AccordionContent>
          </AccordionItem>
        ))}
      </AccordionRoot>
    )
  )
}

export { Accordion }
