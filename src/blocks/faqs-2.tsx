import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Writeup } from "@/components/ui/writeup"

export interface Faqs2Props extends React.ComponentProps<"section"> {
  items: {
    title: string
    description: string
  }[]
}

function Faqs2({ className, children, items, ...props }: Faqs2Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto grid w-full max-w-screen-xl gap-8 px-4 md:grid-cols-2 lg:px-8">
        <div className="flex flex-col items-start">
          <Writeup size="4xl">{children}</Writeup>
        </div>
        <Accordion className="w-full max-w-2xl" type="single" collapsible>
          {items.map(({ title, description }) => (
            <AccordionItem key={title} value={title}>
              <AccordionTrigger>{title}</AccordionTrigger>
              <AccordionContent>{description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export { Faqs2 }
