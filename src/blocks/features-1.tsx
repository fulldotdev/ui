import * as React from "react"
import { Check } from "lucide-react"

import type { BlockSchema } from "@/schemas/block"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"
import { Writeup } from "@/components/ui/writeup"

function Features1({
  className,
  children,
  buttons,
  items,
  ...props
}: BlockSchema & React.ComponentProps<"section">) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto flex w-full max-w-screen-xl flex-col px-4 lg:px-8">
        {children && (
          <Writeup className="max-w-3xl" size="4xl">
            {children}
          </Writeup>
        )}
        {buttons && buttons.length > 0 && (
          <div className="mt-8 inline-flex flex-wrap gap-2">
            {buttons.map(({ text, href, ...button }, i) => (
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
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-16 not-first:mt-16">
          {items?.map(({ title, description }) => (
            <div key={title} className="flex max-w-md flex-col">
              <div className="bg-muted text-muted-foreground inline-flex size-9 items-center justify-center rounded-md">
                <Check className="text-primary" />
              </div>
              <Heading className="mt-4" size="lg" as="h3">
                {title}
              </Heading>
              {description && (
                <Paragraph className="mt-2">{description}</Paragraph>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Features1 }
