import * as React from "react"

import type { BlockSchema } from "@/schemas/block"
import { cn } from "@/lib/utils"
import { Writeup } from "@/components/ui/writeup"
import { Channels } from "@/components/channels"
import { Form } from "@/components/form"

function Contact2({
  className,
  children,
  channels,
  form,
  ...props
}: BlockSchema & React.ComponentProps<"section">) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto grid w-full max-w-screen-xl gap-8 px-4 md:grid-cols-2 lg:px-8">
        <div className="flex flex-col items-start">
          {children && <Writeup size="4xl">{children}</Writeup>}
          {channels && (
            <Channels className="items-start not-first:mt-8" {...channels} />
          )}
        </div>
        {form && <Form {...form} />}
      </div>
    </section>
  )
}

export { Contact2 }
