import * as React from "react"

import type { BlockSchema } from "@/schemas/block"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Writeup } from "@/components/ui/writeup"

function Hero2({
  className,
  children,
  buttons,
  image,
  ...props
}: BlockSchema & React.ComponentProps<"section">) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="relative mx-auto grid w-full max-w-screen-xl items-center gap-12 gap-y-8 px-4 md:gap-x-8 lg:grid-cols-2 lg:gap-x-16 lg:px-8">
        <div className="flex flex-col items-start">
          {children && <Writeup size="6xl">{children}</Writeup>}
          {buttons && buttons.length > 0 && (
            <div className="inline-flex flex-wrap gap-2 not-first:mt-8">
              {buttons.map(({ href, text, ...button }, i) => (
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
        </div>
        {image && <img className="rounded-lg" {...image} />}
      </div>
    </section>
  )
}

export { Hero2 }
