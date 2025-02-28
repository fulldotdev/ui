import {
  AccordionContent,
  AccordionItem,
  Accordion as AccordionRoot,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

interface Props {
  type?: ComponentProps<typeof AccordionRoot>['type']
  collapsible?: boolean
  class?: string
  items?: {
    title?: string
    description?: string
  }[]
}

export function Accordion({ items, class: className, type = 'single', collapsible = true }: Props) {
  return (
    items && (
      <AccordionRoot
        type={type}
        collapsible={collapsible}
        className={cn('w-full max-w-xl', className)}
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
