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
  SectionDescription,
  SectionTitle,
} from "@/components/ui/section"

function Faqs1({
  title,
  description,
  faqs,
  defaultItem,
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
  defaultItem?: string
  buttons?: {
    label: string
    href: string
  }[]
}) {
  return (
    <Section {...props}>
      <SectionContainer className="flex flex-col items-center gap-8 text-center">
        <div className="flex max-w-2xl flex-col items-center gap-5">
          <SectionTitle>{title}</SectionTitle>
          <SectionDescription>{description}</SectionDescription>
        </div>
        {buttons && buttons.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3">
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
        )}
      </SectionContainer>
      <SectionContainer>
        <div className="mx-auto w-full max-w-3xl">
          <Accordion defaultValue={defaultItem ? [defaultItem] : undefined}>
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

export { Faqs1 }
