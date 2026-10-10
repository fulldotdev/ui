import * as React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Section,
  SectionContainer,
  SectionTitle,
} from "@/components/ui/section"

function Faqs4({
  title,
  faqs,
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  faqs: {
    id: string
    question: string
    answer: string
  }[]
}) {
  return (
    <Section {...props}>
      <SectionContainer className="flex flex-col items-center gap-8">
        <div className="mx-auto w-full max-w-3xl">
          <SectionTitle>{title}</SectionTitle>
          <div className="mt-10">
            <Accordion>
              {faqs.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </SectionContainer>
    </Section>
  )
}

export { Faqs4 }
