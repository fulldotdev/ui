import * as React from "react"
import { Check } from "lucide-react"

import type { BlockSchema } from "@/schemas/block"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"
import { Writeup } from "@/components/ui/writeup"

function Features2({
  className,
  children,
  buttons,
  items,
  ...props
}: BlockSchema & React.ComponentProps<"section">) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center px-4 lg:px-8">
        {children && (
          <Writeup className="text-center" size="4xl">
            {children}
          </Writeup>
        )}
        {buttons && buttons.length > 0 && (
          <div className="mt-8 inline-flex flex-wrap justify-center gap-2">
            {buttons.map(({ text, href, ...button }, i) => (
              <Button
                key={href}
                variant={i === 0 ? "default" : "ghost"}
                size="lg"
                asChild
                {...button}
              >
                <a href={href}>{text}</a>
              </Button>
            ))}
          </div>
        )}
        <div className="mt-16 flex flex-wrap justify-center gap-16">
          {items?.map(({ title, description }) => (
            <div
              key={title}
              className="flex max-w-md min-w-2xs grow-1 basis-xs flex-col items-center"
            >
              <div className="bg-muted text-muted-foreground inline-flex size-9 items-center justify-center rounded-md">
                <Check className="text-primary" />
              </div>
              <Heading className="mt-4 text-center" size="xl" as="h3">
                {title}
              </Heading>
              {description && (
                <Paragraph className="mt-2 text-center">
                  {description}
                </Paragraph>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Features2 }
