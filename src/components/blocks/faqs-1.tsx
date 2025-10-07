import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Column from "@/components/elements/column"
import Container from "@/components/elements/container"
import Links from "@/components/elements/links"
import Section from "@/components/elements/section"
import Writeup from "@/components/elements/writeup"

interface Props extends React.ComponentProps<typeof Section> {
  links?: React.ComponentProps<typeof Links>["links"]
  faqs?: {
    question?: string
    answer?: string
  }[]
}

export default function ({
  className,
  align,
  size,
  links,
  faqs,
  children,
  ...props
}: Props) {
  return (
    <Section className={cn("", className)} size={size} align={align} {...props}>
      <Container className="max-w-screen-md">
        <Column align={align}>
          <Writeup size={size} align={align}>
            {children}
          </Writeup>
          <Links
            className="not-first:mt-8"
            size={size}
            links={links}
            align={align}
          />
          {faqs && faqs.length > 0 && (
            <Accordion
              className="w-full max-w-2xl not-first:mt-12"
              type="single"
              collapsible
            >
              {faqs?.map(({ question, answer }, i) => {
                if (!question && !answer) return null
                return (
                  <AccordionItem key={i} value={`${i}. ${question}`}>
                    <AccordionTrigger>{question}</AccordionTrigger>
                    <AccordionContent>{answer}</AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          )}
        </Column>
      </Container>
    </Section>
  )
}
