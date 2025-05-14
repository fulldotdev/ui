import * as React from "react"

import type { BlockSchema } from "@/schemas/block"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"
import { Writeup } from "@/components/ui/writeup"

function Locations1({
  className,
  children,
  buttons,
  items,
  ...props
}: BlockSchema & React.ComponentProps<"section">) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto flex w-full max-w-screen-md flex-col px-4 lg:px-8">
        {children && (
          <Writeup className="text-center" size="4xl">
            {children}
          </Writeup>
        )}
        {buttons && buttons.length > 0 && (
          <div className="mt-8 inline-flex flex-wrap gap-2">
            {buttons.map(({ href, text, ...button }, i) => (
              <Button
                key={href}
                variant={i === 0 ? "default" : "ghost"}
                asChild
                {...button}
              >
                <a href={href}>{text}</a>
              </Button>
            ))}
          </div>
        )}
        <div className="mt-16 flex flex-col gap-4">
          {items?.map(({ href, title, description }) => (
            <a
              className="hover:bg-muted/50 flex flex-col items-start gap-4 rounded-lg border p-6 transition-colors"
              key={href}
              href={href}
            >
              <Heading as="h3">{title}</Heading>
              <Paragraph>{description}</Paragraph>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Locations1 }
