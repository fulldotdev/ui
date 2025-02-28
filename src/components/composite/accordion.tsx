import {
  AccordionContent,
  AccordionItem,
  Accordion as AccordionRoot,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface Props {
  items?:
    | {
        title?: string | null
        description?: string | null
      }[]
    | null
}

export function Accordion({ items }: Props) {
  return (
    items && (
      <AccordionRoot
        type="single"
        collapsible
        className="w-full max-w-xl"
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
