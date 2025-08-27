import type { BlockProps } from "@/lib/types"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionSplit,
} from "@/components/ui/section"

export default function ({ children, items }: BlockProps) {
  return (
    <Section>
      <SectionContainer>
        <SectionSplit>
          {children && <SectionContent>{children}</SectionContent>}
          <Accordion className="w-full max-w-2xl" type="single" collapsible>
            {items?.map(({ title, description }, i) => (
              <AccordionItem key={i} value={`${i}. ${title}`}>
                <AccordionTrigger>{title}</AccordionTrigger>
                <AccordionContent>{description}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SectionSplit>
      </SectionContainer>
    </Section>
  )
}
