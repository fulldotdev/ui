import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Writeup } from "@/components/ui/writeup"

export interface Faqs1Props extends React.ComponentProps<"section"> {
  items: {
    title: string
    description: string
  }[]
}

function Faqs1({ className, children, items, ...props }: Faqs1Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto flex w-full max-w-screen-md flex-col px-4 md:px-12">
        <Writeup size="4xl">{children}</Writeup>
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
