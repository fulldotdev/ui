import type { BlockProps } from "@/lib/types"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Container } from "@/components/elements/container"
import { Section } from "@/components/elements/section"
import { Writeup } from "@/components/elements/writeup"

export default function ({ children, items, size, align }: BlockProps) {
  return (
    <Section>
      <Container className="max-w-screen-md lg:px-12">
        {children && (
          <Writeup size={size} align={align}>
            {children}
          </Writeup>
        )}
        <Accordion
          className="w-full max-w-2xl not-first:mt-12"
          type="single"
          collapsible
        >
          {items?.map(({ title, description }, i) => (
            <AccordionItem key={i} value={`${i}. ${title}`}>
              <AccordionTrigger>{title}</AccordionTrigger>
              <AccordionContent>{description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  )
}
