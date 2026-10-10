import * as React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  Section,
  SectionContainer,
  SectionTitle,
} from "@/components/ui/section"

function Faqs3({
  badge,
  title,
  description,
  faqs,
  ...props
}: React.ComponentProps<"section"> & {
  badge: string
  title: string
  description: string
  faqs: {
    id: string
    question: string
    answer: string
  }[]
}) {
  return (
    <Section {...props}>
      <SectionContainer className="flex flex-col items-center gap-8 text-center">
        <div className="flex max-w-2xl flex-col items-center gap-5">
          <Badge variant="secondary">{badge}</Badge>
          <SectionTitle>{title}</SectionTitle>
          <p className="text-base leading-relaxed text-balance text-muted-foreground">
            {description}
          </p>
        </div>
      </SectionContainer>
      <SectionContainer>
        <div className="mx-auto w-full max-w-3xl rounded-xl border px-6 py-2">
          <Accordion>
            {faqs.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SectionContainer>
    </Section>
  )
}

export { Faqs3 }
