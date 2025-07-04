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
} from "@/components/ui/section"

export default function ({ children, items }: BlockProps) {
  return (
    <Section>
      <SectionContainer className="max-w-screen-md lg:px-12">
        {children && <SectionContent size="4xl">{children}</SectionContent>}
        <Accordion
          className="w-full max-w-2xl not-first:mt-16"
          type="single"
          collapsible
        >
          {items?.map(({ title, description }) => (
            <AccordionItem key={title} value={title ?? ""}>
              <AccordionTrigger>{title}</AccordionTrigger>
              <AccordionContent>{description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SectionContainer>
    </Section>
  )
}
