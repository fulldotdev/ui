import * as React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { buttonVariants } from "@/components/ui/button"
import {
  Section,
  SectionContainer,
  SectionTitle,
} from "@/components/ui/section"

function Faqs2({
  title,
  description,
  faqs,
  buttons,
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  description: string
  faqs: {
    id: string
    question: string
    answer: string
  }[]
  buttons: {
    label: string
    href: string
  }[]
}) {
  return (
    <Section {...props}>
      <SectionContainer>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionTitle>{title}</SectionTitle>
            <p className="mt-4 text-base leading-relaxed text-balance text-muted-foreground">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {buttons.map(({ href, label }, index) => (
                <a
                  key={href + label}
                  href={href}
                  className={buttonVariants({
                    size: "lg",
                    variant: index === 0 ? "default" : "secondary",
                  })}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div>
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

export { Faqs2 }
