import * as React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

function Example({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </section>
  )
}

const faqs = [
  {
    value: "shipping",
    question: "How long does shipping take?",
    answer:
      "Orders ship within two business days. Delivery inside the EU takes three to five days.",
  },
  {
    value: "returns",
    question: "Can I return a product?",
    answer:
      "Yes. Send it back within 30 days in its original packaging and we refund the full amount.",
  },
  {
    value: "support",
    question: "How do I reach support?",
    answer: "Email support@example.com and we reply within one business day.",
  },
]

function ControlledAccordion() {
  const [value, setValue] = React.useState<string[]>(["returns"])

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant="outline" onClick={() => setValue([])}>
          Close all
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setValue(["shipping"])}
        >
          Open shipping
        </Button>
        <span className="text-sm text-muted-foreground">
          Open: {value.length ? value.join(", ") : "none"}
        </span>
      </div>
      <Accordion value={value} onValueChange={setValue}>
        {faqs.map((faq) => (
          <AccordionItem key={faq.value} value={faq.value}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>
              <p>{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Single, first item open">
        <Accordion defaultValue={["shipping"]} className="max-w-md">
          {faqs.map((faq) => (
            <AccordionItem key={faq.value} value={faq.value}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Example>
      <Example title="Multiple open at once">
        <Accordion
          multiple
          defaultValue={["shipping", "returns"]}
          className="max-w-md"
        >
          {faqs.map((faq) => (
            <AccordionItem key={faq.value} value={faq.value}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Example>
      <Example title="Disabled item and rich content">
        <Accordion className="max-w-md">
          <AccordionItem value="account">
            <AccordionTrigger>Account settings</AccordionTrigger>
            <AccordionContent>
              <p>Change your name, email address and password.</p>
              <p>
                Read the <a href="#/ui/accordion">account guide</a> for more.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="billing" disabled>
            <AccordionTrigger>Billing (owners only)</AccordionTrigger>
            <AccordionContent>
              <p>Invoices and payment methods.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Example>
      <Example title="Controlled">
        <ControlledAccordion />
      </Example>
    </div>
  )
}
