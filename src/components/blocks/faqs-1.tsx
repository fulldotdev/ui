import type { FaqsProps } from "@/schemas/blocks/faqs"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Links } from "@/components/elements/links"
import { Writeup } from "@/components/elements/writeup"

export default function ({
  align = "center",
  children,
  faqs,
  size,
  links,
}: FaqsProps) {
  return (
    <section className="py-16">
      <div
        className={cn("container max-w-screen-md lg:px-12", {
          "items-start text-start": align === "start",
          "items-center text-center": align === "center",
          "items-end text-end": align === "end",
        })}
      >
        <Writeup size={size}>{children}</Writeup>
        <Links size={size} links={links} />
        <Accordion
          className="w-full max-w-2xl not-first:mt-12"
          type="single"
          collapsible
        >
          {faqs?.map(({ question, answer }, i) => (
            <AccordionItem key={i} value={`${i}. ${question}`}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
