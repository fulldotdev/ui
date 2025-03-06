import * as React from "react"
import { v4 as uuid } from "uuid"

import { cn } from "@/lib/utils"
import {
  AccordionContent,
  AccordionItem,
  Accordion as AccordionRoot,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Title } from "@/components/title"

type Props = React.ComponentProps<typeof AccordionRoot> & {
  level: React.ComponentProps<typeof Title>["level"]
  items?: {
    title?: string
    description?: string
  }[]
}

function Accordion({ level, items, className, ...props }: Props) {
  return items ? (
    <AccordionRoot
      className={cn("accordion w-full max-w-2xl", className)}
      {...props}
    >
      {items?.map((item, index) => (
        <AccordionItem key={uuid()} value={`${index}-${item.title}`}>
          <AccordionTrigger asChild>
            {/* <Title level={level}>{item.title}</Title> */}
            {item.title}
          </AccordionTrigger>
          <AccordionContent>{item.description}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  ) : null
}

export { Accordion }
