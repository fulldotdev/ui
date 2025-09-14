import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface Props {
  className?: string
  items?: {
    title?: string
    description?: string
  }[]
}

export default function ({ className, items }: Props) {
  if (!items || !items.length) return null
  return (
    <Accordion type="single" collapsible className={cn(className)}>
      {items?.map(({ title, description }, i) => {
        if (!title && !description) return null
        return (
          <AccordionItem key={i} value={`${i}. ${title}`}>
            <AccordionTrigger>{title}</AccordionTrigger>
            <AccordionContent>{description}</AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
