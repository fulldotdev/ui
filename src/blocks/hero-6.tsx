import * as React from "react"

import type { BlockSchema } from "@/schemas/block"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Writeup } from "@/components/ui/writeup"

function Hero6({
  className,
  children,
  buttons,
  image,
  ...props
}: BlockSchema & React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "bg-background relative flex min-h-screen items-center py-32",
        className
      )}
      {...props}
    >
      {image && (
        <img
          className="absolute top-0 left-0 size-full object-cover"
          {...image}
        />
      )}
      <div className="pt-header relative mx-auto flex w-full max-w-screen-xl flex-col items-center justify-center px-4 lg:px-8">
        {children && (
          <Writeup className="text-center" size="8xl">
            {children}
          </Writeup>
        )}
        {buttons && (
          <div className="inline-flex flex-wrap justify-center gap-2 not-first:mt-12">
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
    </section>
  )
}

export { Hero6 }
