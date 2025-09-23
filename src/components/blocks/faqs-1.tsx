import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Links from "@/components/elements/links"
import Writeup from "@/components/elements/writeup"
import Column from "@/components/structures/column"
import Container from "@/components/structures/container"
import Section from "@/components/structures/section"

interface Props {
  size?: "sm" | "default" | "lg"
  align?: "start" | "center" | "end"
  children?: React.ReactNode
  links?: React.ComponentProps<typeof Links>["links"]
  faqs?: {
    question?: string
    answer?: string
  }[]
}

export default function ({
  align = "center",
  children,
  faqs,
  size,
  links,
}: Props) {
  return (
    <Section>
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
