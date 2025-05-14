import * as React from "react"

import type { BlockSchema } from "@/schemas/block"
import { cn } from "@/lib/utils"
import { Heading } from "@/components/ui/heading"
import { Writeup } from "@/components/ui/writeup"

function Collections1({
  className,
  children,
  items,
  ...props
}: BlockSchema & React.ComponentProps<"section">) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto flex w-full max-w-screen-xl flex-col px-4 lg:px-8">
        {children && <Writeup size="2xl">{children}</Writeup>}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 not-first:mt-16">
          {items?.map(({ href, title, image }) => (
            <a className="group flex flex-col" key={href} href={href}>
              <img
                className="rounded-md transition-opacity group-hover:opacity-75"
                {...image}
              />
              <Heading size="lg" className="mt-4" as="h3">
                {title}
              </Heading>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Collections1 }
