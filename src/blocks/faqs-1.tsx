import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"

export interface Faqs1Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  description?: string
  items: {
    title: string
    description: string
  }[]
}

function Faqs1({
  className,
  level = 2,
  title,
  description,
  items,
  ...props
}: Faqs1Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto flex w-full max-w-screen-md flex-col px-4 md:px-12">
        <Heading size="4xl" level={level}>
          {title}
        </Heading>
        {description && <Paragraph className="mt-4">{description}</Paragraph>}
        <Accordion
          className="w-full max-w-2xl not-first:mt-16"
          type="single"
          collapsible
        >
          {items.map(({ title, description }) => (
            <AccordionItem key={title} value={title}>
              <AccordionTrigger>{title}</AccordionTrigger>
              <AccordionContent>{description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export { Faqs1 }
