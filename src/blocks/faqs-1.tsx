import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Description } from "@/components/description"
import { Title } from "@/components/title"

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
      <div className="mx-auto w-full max-w-screen-md px-4 md:px-12">
        <div className="flex flex-col">
          <Title size="4xl" level={level}>
            {title}
          </Title>
          {description && (
            <Description className="mt-4">{description}</Description>
          )}
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
      </div>
    </section>
  )
}

export { Faqs1 }
