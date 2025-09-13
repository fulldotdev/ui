import type { ContactProps } from "@/schemas/blocks/contact"
import { cn } from "@/lib/utils"
import { Form } from "@/components/elements/form"
import { Writeup } from "@/components/elements/writeup"

export default function ({ children, form, size, align }: ContactProps) {
  return (
    <section className="py-16" id="contact">
      <div
        className={cn("container", {
          "items-start": align === "start",
          "items-center": align === "center",
          "items-end": align === "end",
        })}
      >
        <Writeup size={size}>{children}</Writeup>
        <Form className="not-first:mt-16" {...form} />
      </div>
    </section>
  )
}
