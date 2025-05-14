import * as React from "react"

import type { BlockSchema } from "@/schemas/block"
import { cn } from "@/lib/utils"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"
import { Prose } from "@/components/ui/prose"

function Post1({
  className,
  title,
  description,
  image,
  children,
  ...props
}: BlockSchema & React.ComponentProps<"section">) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto flex w-full max-w-screen-md flex-col px-4 md:px-12">
        <Prose>
          <Heading as="h1">{title}</Heading>
          {description && <Paragraph>{description}</Paragraph>}
          {image && <img className="rounded-lg" {...image} />}
          {children}
        </Prose>
      </div>
    </section>
  )
}

export { Post1 }
