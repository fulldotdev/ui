import {
  AccordionContent,
  AccordionItem,
  Accordion as AccordionRoot,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import * as React from 'react'
import { v4 as uuid } from 'uuid'

type Props = React.ComponentProps<typeof AccordionRoot> & {
  items?: {
    title?: string
    description?: string
  }[]
}

function Accordion({ items, className, ...props }: Props) {
  return items ? (
    <AccordionRoot
      className={cn('accordion w-full max-w-xl', className)}
      {...props}
    >
      {items?.map((item, index) => (
        <AccordionItem
          key={uuid()}
          value={`${index}-${item.title}`}
        >
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.description}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  ) : null
}

export { Accordion }
