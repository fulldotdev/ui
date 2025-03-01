import {
  AccordionContent,
  AccordionItem,
  Accordion as AccordionRoot,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

interface Props {
  className?: string
  type?: ComponentProps<typeof AccordionRoot>['type']
  collapsible?: boolean
  items?: {
    title?: string
    description?: string
  }[]
}

export default function Accordion({ items, type = 'single', collapsible = true, className }: Props) {
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
