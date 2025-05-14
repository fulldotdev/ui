import * as React from "react"

import type { BlockSchema } from "@/schemas/block"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Writeup } from "@/components/ui/writeup"

function Faqs1({
  className,
  children,
  items,
  ...props
}: BlockSchema & React.ComponentProps<"section">) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto flex w-full max-w-screen-md flex-col px-4 md:px-12">
        <Writeup size="4xl">{children}</Writeup>
        <Accordion
          className="w-full max-w-2xl not-first:mt-16"
          type="single"
          collapsible
        >
          {items?.map((item) => (
            <AccordionItem
              key={JSON.stringify(item)}
              value={JSON.stringify(item)}
            >
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>{item.description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export { Faqs1 }
