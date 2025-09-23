import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Links from "@/components/elements/links"
import Writeup from "@/components/elements/writeup"

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
      </div>
    </section>
  )
}
