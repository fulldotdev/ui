import * as React from "react"

import type { BlockSchema } from "@/schemas/block"
import { cn } from "@/lib/utils"
import { Writeup } from "@/components/ui/writeup"
import { Channels } from "@/components/channels"
import { Form } from "@/components/form"

function Contact1({
  className,
  children,
  channels,
  form,
  ...props
}: BlockSchema & React.ComponentProps<"section">) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto flex w-full max-w-screen-md flex-col px-4 lg:px-8">
        {children && <Writeup size="4xl">{children}</Writeup>}
        {channels && <Channels className="not-first:mt-8" {...channels} />}
        {form && <Form className="not-first:mt-16" {...form} />}
      </div>
    </section>
  )
}

export { Contact1 }
